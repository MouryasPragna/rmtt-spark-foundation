// MAPAL services information pattern: titled service blocks, placeholders where no
// approved commitment exists yet. Shared by the Home services section and the
// Technology & services page so both render the same approved copy.
export interface ServiceBlock {
  id: string;
  title: string;
  body: string;
  pending: boolean;
}

export const serviceBlocks: ServiceBlock[] = [
  {
    id: 'engineering',
    title: 'Application engineering',
    body: 'You share the part drawing, material, machine type and cycle requirements. We analyse and design the optimal tool geometry, applying Design for Manufacturability to balance performance and cost.',
    pending: false,
  },
  {
    id: 'custom',
    title: 'Custom solutions',
    body: 'Special machining tasks require special tools — custom tools are individually tailored to the customer’s requirements.',
    pending: false,
  },
  {
    id: 'reconditioning',
    title: 'Regrinding & reconditioning',
    body: '',
    pending: true,
  },
  {
    id: 'quote',
    title: 'Quote & delivery',
    body: '',
    pending: true,
  },
];
