import { z } from 'zod';

export const MAX_DRAWING_BYTES = 10 * 1024 * 1024;
export const fieldLimits = { name: 100, company: 100, email: 255, phone: 40, toolType: 5000, industry: 100, material: 200, machine: 200, qty: 100, description: 2000, website: 200 } as const;
const optionalText = (max: number) => z.string().trim().max(max).refine(value => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value), 'Contains invalid characters.');
export const rfqSchema = z.object({
  name: optionalText(fieldLimits.name).pipe(z.string().min(1, 'Enter your full name.')),
  company: optionalText(fieldLimits.company).pipe(z.string().min(1, 'Enter your company name.')),
  email: optionalText(fieldLimits.email).pipe(z.email('Enter a valid email address.')),
  phone: optionalText(fieldLimits.phone).refine(value => !value || /^[+\d\s().-]+$/.test(value), 'Enter a valid phone number.'),
  toolType: optionalText(fieldLimits.toolType), industry: optionalText(fieldLimits.industry),
  material: optionalText(fieldLimits.material), machine: optionalText(fieldLimits.machine), qty: optionalText(fieldLimits.qty),
  description: optionalText(fieldLimits.description).pipe(z.string().min(1, 'Describe your application.')),
  website: optionalText(fieldLimits.website).pipe(z.string().max(0, 'Unable to submit this request.')),
  consent: z.boolean().refine(value => value, 'Please agree to the use of your details to respond to your enquiry.'),
});
export type RfqForm = z.infer<typeof rfqSchema>;
export type RfqPayload = RfqForm & { tools: string[]; drawing?: File };

export function validateDrawing(file?: Pick<File, 'name' | 'size' | 'type'>): string | undefined {
  if (!file) return;
  if (file.size > MAX_DRAWING_BYTES) return 'Drawing must be 10 MB or smaller.';
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!extension || !['pdf', 'dxf', 'dwg'].includes(extension)) return 'Choose a PDF, DXF or DWG file.';
  const mimeTypes: Record<string, string[]> = {
    pdf: ['application/pdf'],
    dxf: ['application/dxf', 'application/x-dxf', 'image/vnd.dxf', 'image/x-dxf', 'application/acad'],
    dwg: ['application/acad', 'application/x-acad', 'application/dwg', 'application/x-dwg', 'image/vnd.dwg', 'image/x-dwg'],
  };
  if (file.type && file.type !== 'application/octet-stream' && !mimeTypes[extension].includes(file.type)) return 'File type does not match the drawing format.';
}

export type RfqResult = 'sent' | 'draft';
const SUBMIT_TIMEOUT_MS = 20000;

// Builds a pre-filled email for the sales mailbox. Used when no form endpoint is configured.
export function buildRfqMailto(payload: RfqPayload, to: string): string {
  const lines = [
    ['Name', payload.name], ['Company', payload.company], ['Email', payload.email], ['Phone', payload.phone],
    ['Tools', payload.toolType], ['Industry', payload.industry], ['Material', payload.material],
    ['Machine', payload.machine], ['Quantity / month', payload.qty],
  ].filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`);
  const body = `${lines.join('\n')}\n\nApplication:\n${payload.description}\n\n${payload.drawing ? `(Please attach your drawing: ${payload.drawing.name})\n` : ''}`.slice(0, 1500);
  return `mailto:${to}?subject=${encodeURIComponent(`Quote request: ${payload.company}`.slice(0, 120))}&body=${encodeURIComponent(body)}`;
}

// With VITE_RFQ_ENDPOINT set (https only) the request is POSTed as multipart form data and the
// server must re-validate, rate-limit and scan uploads. Without it the visitor's email app is
// opened with a pre-filled message ('draft'): nothing has been sent until they press Send.
export async function submitRfq(payload: RfqPayload, mailTo = 'sales@rmtt.co.in'): Promise<RfqResult> {
  rfqSchema.parse(payload);
  const fileError = validateDrawing(payload.drawing);
  if (fileError) throw new Error(fileError);
  const endpoint = String(import.meta.env?.VITE_RFQ_ENDPOINT || '');
  if (endpoint) {
    if (!/^https:\/\//.test(endpoint)) throw new Error('Quote submission is misconfigured. Please contact us by email or phone.');
    const data = new FormData();
    const { drawing, tools, consent, ...fields } = payload;
    Object.entries(fields).forEach(([key, value]) => data.append(key, String(value)));
    data.append('tools', tools.join(','));
    data.append('consent', String(consent));
    if (drawing) data.append('drawing', drawing, drawing.name);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
    try {
      const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: controller.signal });
      if (!response.ok) throw new Error('rejected');
      return 'sent';
    } catch {
      throw new Error('Your request could not be sent. Please try again or contact us by email or phone.');
    } finally { clearTimeout(timer); }
  }
  if (typeof window !== 'undefined') window.location.href = buildRfqMailto(payload, mailTo);
  return 'draft';
}
