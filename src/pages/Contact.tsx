import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Send, ArrowUpRight, Download } from 'lucide-react';
import factoryPhoto from '../assets/factory-hero-collage.jpg.asset.json';
import styles from './Contact.module.css';
import { siteConfig } from '../lib/siteConfig';
import { industryNames } from '../data/industries';
import { fieldLimits, rfqSchema, submitRfq, type RfqForm, type RfqResult } from '../lib/rfq';

const fields: { name: keyof typeof fieldLimits; label: string; required?: boolean; type?: string; placeholder?: string }[] = [
  { name: 'name', label: 'Full name', required: true, placeholder: 'Your full name' },
  { name: 'company', label: 'Company', required: true, placeholder: 'Your company name' },
  { name: 'email', label: 'Email', required: true, type: 'email', placeholder: 'you@company.com' },
  { name: 'phone', label: 'Phone / WhatsApp', type: 'tel' },
  { name: 'toolType', label: 'Tool type required' },
  { name: 'industry', label: 'Industry' },
  { name: 'material', label: 'Component material', placeholder: 'Aluminium die casting, Grey CI…' },
];
const industryOptions = industryNames;
const initialForm: RfqForm = { name: '', company: '', email: '', phone: '', toolType: '', industry: '', material: '', machine: '', qty: '', description: '', website: '', consent: false };

export default function Contact() {
  const [form, setForm] = useState<RfqForm>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<RfqResult>();
  const formRef = useRef<HTMLFormElement>(null);
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
    setErrors(nextErrors);
    if (!parsed.success) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setSending(true);
    try {
      const outcome = await submitRfq({ ...parsed.data, tools: [] }, siteConfig.email);
      setResult(outcome);
      if (outcome === 'sent') { setForm(initialForm); setErrors({}); }
      requestAnimationFrame(() => document.getElementById('rfq-result')?.focus());
    }
    catch (error) { setSubmitError(error instanceof Error ? error.message : 'Your request could not be sent. Please contact us directly.'); }
    finally { setSending(false); }
  };
  return <div className={styles.main}>
    <section className={`${styles.pageHero} ${styles.contactHero}`}><img src={factoryPhoto.url} alt="Riddhi precision tool manufacturing facility" className={styles.heroPhoto} /><div className={`container ${styles.heroContent}`}><div className="section-eyebrow">Get in touch</div><h1 className={styles.pageTitle}>Contact us</h1><p className={styles.pageSubtitle}>Share your application details and tooling requirements with our team.</p></div></section>
    <section className={styles.contactOverview}><div className="container">
      <h2 className={`section-heading-title ${styles.overviewTitle}`}>Get in touch</h2>
      <div className={styles.contactCards}>
        <article className={styles.contactCard}><h3>Phone / WhatsApp</h3><a href={siteConfig.phoneHref}><Phone size={18} aria-hidden="true" />{siteConfig.phone}</a></article>
        <article className={styles.contactCard}><h3>Email</h3><a href={`mailto:${siteConfig.email}`}><Mail size={18} aria-hidden="true" />{siteConfig.email}</a></article>
        <article className={styles.contactCard}><h3>Visit us</h3><p>{siteConfig.address.street}, {siteConfig.address.cityLine}</p><a className={styles.directionsLink} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${siteConfig.address.street}, ${siteConfig.address.cityLine}`)}`} target="_blank" rel="noopener noreferrer"><MapPin size={18} aria-hidden="true" />View on Google Maps<ArrowUpRight size={16} aria-hidden="true" /></a></article>
      </div>
    </div></section>
    <section className={`${styles.contactSection} ${styles.enquirySection}`}><div className="container"><div className={styles.contactGrid}>
      <div className={styles.formWrap}>
        <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.honeypot} aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" maxLength={fieldLimits.website} value={form.website} onChange={event => change('website', event.target.value)} /></div>
          <h2 className={`section-heading-title ${styles.formTitle}`}>Send an enquiry</h2>
          <div className={styles.formRow}>
            {fields.map(field => <div className={styles.formField} key={field.name}>
              <label className={styles.label} htmlFor={field.name}>{field.label}{field.required ? ' *' : ''}</label>
              {field.name === 'industry' ? <select id={field.name} name={field.name} className={styles.select} value={form.industry} onChange={event => change('industry', event.target.value)} aria-describedby={errors.industry ? 'industry-error' : undefined} aria-invalid={!!errors.industry}><option value="">— Select industry —</option>{industryOptions.map(value => <option key={value}>{value}</option>)}</select> : <input id={field.name} name={field.name} type={field.type || 'text'} className={styles.input} placeholder={field.placeholder} value={form[field.name]} maxLength={fieldLimits[field.name]} required={field.required} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined} onChange={event => change(field.name, event.target.value)} onBlur={event => change(field.name, event.target.value.trim())} />}
              {errors[field.name] && <p id={`${field.name}-error`} role="alert" className={styles.error}>{errors[field.name]}</p>}
            </div>)}
          </div>
          <div className={styles.formField}><label className={styles.label} htmlFor="description">Application description / challenges *</label><textarea id="description" name="description" required className={styles.textarea} maxLength={fieldLimits.description} placeholder="Describe the machining challenge, current tool and the problem you want to solve…" value={form.description} onChange={event => change('description', event.target.value)} onBlur={event => change('description', event.target.value.trim())} aria-invalid={!!errors.description} aria-describedby={errors.description ? 'description-error' : undefined} />{errors.description && <p id="description-error" role="alert" className={styles.error}>{errors.description}</p>}</div>
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
              : <><strong>Almost done: your email app should have opened with your request.</strong> Press Send there to submit it. If nothing opened, email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or call <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>. Your request has not been sent until you do.</>}
          </div>}
          {submitError && <p role="alert" className={styles.submitError}>{submitError} <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>}
          <button type="submit" className={styles.submitBtn} disabled={sending}><Send size={16} />{sending ? 'Submitting…' : 'Enquire now'}</button>
        </form>
      </div>
      <aside className={styles.sidebar}>
        <section className={`${styles.sideCard} ${styles.noRule}`}>
          <h2 className={`section-heading-title ${styles.sideTitle}`}>What happens next?</h2>
          <ul className={styles.nextSteps}>
            <li className={styles.nextStep}><div><h3 className={styles.nextTitle}>Technical review</h3><p className={styles.nextDesc}>Our engineers analyse your application requirements.</p></div></li>
            <li className={styles.nextStep}><div><h3 className={styles.nextTitle}>Technical proposal</h3><p className={styles.nextDesc}>We send a technical proposal with recommended tool design and pricing.</p></div></li>
            <li className={styles.nextStep}><div><h3 className={styles.nextTitle}>Sample &amp; trial</h3><p className={styles.nextDesc}>Sample tools manufactured for your approval before full production order.</p></div></li>
          </ul>
        </section>
        <div className={styles.toolsPreview}><img src={`${import.meta.env.BASE_URL}image002.png`} alt="Riddhi cutting tool range" width={377} height={86} loading="lazy" className={styles.toolsImg} /></div>
        <section className={styles.sideCard} id="product-catalogue">
          <h2 className={`section-heading-title ${styles.sideTitle}`}>Product catalogue</h2>
          <a href={siteConfig.catalogueUrl} download="rmtt-catalogue.pdf" target="_blank" rel="noopener noreferrer" className={styles.catalogueLink}>
            <span><strong>Download product catalogue</strong><small>PDF · Full product range</small></span>
            <Download size={20} aria-hidden="true" />
          </a>
        </section>
      </aside>
    </div></div></section>
  </div>;
}
