import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Send, Upload, X } from 'lucide-react';
import styles from './Contact.module.css';
import { siteConfig } from '../lib/siteConfig';
import { industryNames } from '../data/industries';
import { useQuote } from '../context/QuoteContext';
import { fieldLimits, rfqSchema, submitRfq, validateDrawing, type RfqForm, type RfqResult } from '../lib/rfq';

const fields: { name: keyof typeof fieldLimits; label: string; required?: boolean; type?: string; placeholder?: string }[] = [
  { name: 'name', label: 'Full name', required: true, placeholder: 'Your full name' },
  { name: 'company', label: 'Company', required: true, placeholder: 'Your company name' },
  { name: 'email', label: 'Email', required: true, type: 'email', placeholder: 'you@company.com' },
  { name: 'phone', label: 'Phone / WhatsApp', type: 'tel' },
  { name: 'toolType', label: 'Tool type required' },
  { name: 'industry', label: 'Industry' },
  { name: 'material', label: 'Component material', placeholder: 'Aluminium die casting, Grey CI…' },
  { name: 'machine', label: 'Machine type', placeholder: 'VMC, HMC, SPM…' },
  { name: 'qty', label: 'Quantity per month (components)', placeholder: 'e.g. 500 components' },
];
const industryOptions = industryNames;
const initialForm: RfqForm = { name: '', company: '', email: '', phone: '', toolType: '', industry: '', material: '', machine: '', qty: '', description: '', website: '', consent: false };

export default function Contact() {
  const { selected, remove } = useQuote();
  const [form, setForm] = useState<RfqForm>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [drawing, setDrawing] = useState<File>();
  const [fileError, setFileError] = useState<string>();
  const [submitError, setSubmitError] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<RfqResult>();
  const formRef = useRef<HTMLFormElement>(null);
  const selectedNames = selected.map(tool => tool.name).join('; ');
  const selectedSlugs = selected.map(tool => tool.slug);
  useEffect(() => { setForm(current => ({ ...current, toolType: selectedNames })); }, [selectedNames]);
  const change = (name: keyof typeof fieldLimits, value: string) => {
    setForm(current => ({ ...current, [name]: value.slice(0, fieldLimits[name]) }));
    setErrors(current => ({ ...current, [name]: '' }));
    setSubmitError('');
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError('');
    const parsed = rfqSchema.safeParse(form);
    const nextErrors: Record<string, string> = {};
    if (!parsed.success) parsed.error.issues.forEach(issue => { const key = String(issue.path[0]); if (!nextErrors[key]) nextErrors[key] = issue.message; });
    const attachmentError = validateDrawing(drawing) || fileError;
    setErrors(nextErrors);
    setFileError(attachmentError);
    if (!parsed.success || attachmentError) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    const toolType = [...new Set([...parsed.data.toolType.split(';').map(value => value.trim()).filter(Boolean), ...selected.map(tool => tool.name)])].join('; ').slice(0, fieldLimits.toolType);
    setForm({ ...parsed.data, toolType });
    setSending(true);
    try {
      const outcome = await submitRfq({ ...parsed.data, toolType, tools: selectedSlugs, drawing }, siteConfig.email);
      setResult(outcome);
      if (outcome === 'sent') { setForm(initialForm); setDrawing(undefined); setErrors({}); }
      requestAnimationFrame(() => document.getElementById('rfq-result')?.focus());
    }
    catch (error) { setSubmitError(error instanceof Error ? error.message : 'Your request could not be sent. Please contact us directly.'); }
    finally { setSending(false); }
  };
  return <div className={styles.main}>
    <section className={styles.pageHero}><div className="container"><div className="section-eyebrow">Get in touch</div><h1 className={styles.pageTitle}>Request a quote</h1><p className={styles.pageSubtitle}>Share your application details to request a technical proposal and pricing.</p></div></section>
    <section className={styles.contactSection}><div className="container"><div className={styles.contactGrid}>
      <div className={styles.formWrap}>
        {selected.length > 0 && <div className={styles.selectedTools}><h2 className={styles.formTitle}>Selected tools</h2><ul>{selected.map(tool => <li key={tool.slug}><Link to={`/products/${tool.slug}`}>{tool.name}</Link><button type="button" onClick={() => remove(tool.slug)} aria-label={`Remove ${tool.name}`}><X size={16} /></button></li>)}</ul></div>}
        <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.honeypot} aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" maxLength={fieldLimits.website} value={form.website} onChange={event => change('website', event.target.value)} /></div>
          <h2 className={styles.formTitle}>Your details</h2>
          <div className={styles.formRow}>
            {fields.map(field => <div className={styles.formField} key={field.name}>
              <label className={styles.label} htmlFor={field.name}>{field.label}{field.required ? ' *' : ''}</label>
              {field.name === 'industry' ? <select id={field.name} name={field.name} className={styles.select} value={form.industry} onChange={event => change('industry', event.target.value)} aria-describedby={errors.industry ? 'industry-error' : undefined} aria-invalid={!!errors.industry}><option value="">— Select industry —</option>{industryOptions.map(value => <option key={value}>{value}</option>)}</select> : <input id={field.name} name={field.name} type={field.type || 'text'} className={styles.input} placeholder={field.placeholder} value={form[field.name]} maxLength={fieldLimits[field.name]} required={field.required} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined} onChange={event => change(field.name, event.target.value)} onBlur={event => change(field.name, event.target.value.trim())} />}
              {errors[field.name] && <p id={`${field.name}-error`} role="alert" className={styles.error}>{errors[field.name]}</p>}
            </div>)}
          </div>
          <div className={styles.formField}><label className={styles.label} htmlFor="description">Application description / challenges *</label><textarea id="description" name="description" required className={styles.textarea} maxLength={fieldLimits.description} placeholder="Describe the machining challenge, current tool and the problem you want to solve…" value={form.description} onChange={event => change('description', event.target.value)} onBlur={event => change('description', event.target.value.trim())} aria-invalid={!!errors.description} aria-describedby={errors.description ? 'description-error' : undefined} />{errors.description && <p id="description-error" role="alert" className={styles.error}>{errors.description}</p>}</div>
          <div className={styles.drawingField}><label htmlFor="drawing" className={styles.uploadTitle}><Upload size={18} />Upload drawing (optional)</label><p id="drawing-help" className={styles.uploadSub}>PDF, DXF, DWG — up to 10 MB</p><input id="drawing" type="file" accept=".pdf,.dxf,.dwg" aria-invalid={!!fileError} aria-describedby={`drawing-help${fileError ? ' drawing-error' : ''}`} onChange={event => {
            const file = event.target.files?.[0]; const error = validateDrawing(file); setFileError(error); setDrawing(error ? undefined : file); setSubmitError(''); if (error) event.target.value = '';
          }} />{fileError && <p id="drawing-error" role="alert" className={styles.error}>{fileError}</p>}</div>
          {errors.website && <p role="alert" className={styles.error}>{errors.website}</p>}
          <p id="consent-help" className={styles.formNote}>By submitting this form you agree that RMTT may use your details to respond to your enquiry, as described in our <Link to="/privacy">privacy policy</Link>.</p>
          <div className={styles.consentField}>
            <label htmlFor="consent"><input id="consent" name="consent" type="checkbox" required checked={form.consent} aria-invalid={!!errors.consent} aria-describedby={`consent-help${errors.consent ? ' consent-error' : ''}`} onChange={event => {
              setForm(current => ({ ...current, consent: event.target.checked }));
              setErrors(current => ({ ...current, consent: '' }));
              setSubmitError('');
            }} />I agree</label>
            {errors.consent && <p id="consent-error" role="alert" className={styles.error}>{errors.consent}</p>}
          </div>
          {result && <div id="rfq-result" tabIndex={-1} role="status" className={styles.notice}>
            {result === 'sent'
              ? <><strong>Thank you. Your request has been sent.</strong> Our team will get back to you shortly.</>
              : <><strong>Almost done: your email app should have opened with your request.</strong> Press Send there to submit it{drawing ? `, and attach your drawing (${drawing.name})` : ''}. If nothing opened, email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or call <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>. Your request has not been sent until you do.</>}
          </div>}
          {submitError && <p role="alert" className={styles.submitError}>{submitError} <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>}
          <button type="submit" className={styles.submitBtn} disabled={sending}><Send size={16} />{sending ? 'Submitting…' : 'Submit request'}</button>
        </form>
      </div>
            {/* Info sidebar */}
            <div className={styles.sidebar}>
              <div className={styles.sideCard}>
                <h2 className={styles.sideTitle}>Contact information</h2>
                <ul className={styles.contactList}>
                  <li className={styles.contactItem}>
                    <MapPin size={16} className={styles.contactIcon} />
                    <div>
                      <div className={styles.contactLabel}>Address</div>
                      <div className={styles.contactValue}>{siteConfig.address.street},<br />{siteConfig.address.cityLine}</div>
                    </div>
                  </li>
                  <li className={styles.contactItem}>
                    <Phone size={16} className={styles.contactIcon} />
                    <div>
                      <div className={styles.contactLabel}>Phone / WhatsApp</div>
                      <a href={siteConfig.phoneHref} className={styles.contactValue}>{siteConfig.phone}</a>
                    </div>
                  </li>
                  <li className={styles.contactItem}>
                    <Mail size={16} className={styles.contactIcon} />
                    <div>
                      <div className={styles.contactLabel}>Email</div>
                      <a href={`mailto:${siteConfig.email}`} className={styles.contactValue}>{siteConfig.email}</a>
                    </div>
                  </li>

                </ul>
              </div>

              <div className={styles.sideCard}>
                <h2 className={styles.sideTitle}>What happens next?</h2>
                <ol className={styles.nextSteps}>
                  <li className={styles.nextStep}>
                    <div className={styles.nextNum}>1</div>
                    <div>
                      <div className={styles.nextTitle}>Technical review</div>
                      <div className={styles.nextDesc}>Our engineers analyse your application requirements.</div>
                    </div>
                  </li>
                  <li className={styles.nextStep}>
                    <div className={styles.nextNum}>2</div>
                    <div>
                      <div className={styles.nextTitle}>Technical proposal</div>
                      <div className={styles.nextDesc}>We send a technical proposal with recommended tool design and pricing.</div>
                    </div>
                  </li>
                  <li className={styles.nextStep}>
                    <div className={styles.nextNum}>3</div>
                    <div>
                      <div className={styles.nextTitle}>Sample & trial</div>
                      <div className={styles.nextDesc}>Sample tools manufactured for your approval before full production order.</div>
                    </div>
                  </li>
                </ol>
              </div>

              <div className={styles.toolsPreview}>
                <img
                  src={`${import.meta.env.BASE_URL}image002.png`}
                  alt="Riddhi cutting tool range"
                  width={377} height={86} loading="lazy" className={styles.toolsImg}
                />
              </div>
            </div>
    </div></div></section>
  </div>;
}
