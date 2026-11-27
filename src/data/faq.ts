/*
 * Frequently asked questions. Every answer restates copy already approved and published on this
 * site (source noted per item: productsData.tsx, products.ts, services.ts, equipment.ts,
 * industries.ts, JourneyTimeline.tsx, Contact.tsx, siteConfig.ts). Do not add answers that have no
 * approved source — prices, lead times, minimum order quantities, response times, certifications,
 * tolerances achieved and the regrinding/reconditioning service are all still pending (see
 * src/data/CONTENT_TODO.md). When a pending item is approved, add its question here as well.
 */
import { siteConfig } from '../lib/siteConfig';
import { industryNames } from './industries';

export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
  /** The page the answer comes from, for readers who want the detail. */
  link?: { to: string; label: string };
};
export type FaqGroup = { id: string; title: string; items: FaqItem[] };

const industryList = `${industryNames.slice(0, -1).join(', ')} and ${industryNames[industryNames.length - 1]}`;

export const faqGroups: FaqGroup[] = [
  {
    id: 'products',
    title: 'Products',
    items: [
      {
        id: 'range',
        // productsData.tsx: the four solution areas.
        question: 'What cutting tools does RMTT manufacture?',
        answer: [
          'Four product areas: solid carbide end mills, reamers, drills and step drills; PCD (polycrystalline diamond) tools for drilling, milling, reaming and precision boring; brazed carbide-tipped tools; and specialized solutions — combination, form and stepped tools made to customer requirements.',
        ],
        link: { to: '/products', label: 'See the product range' },
      },
      {
        id: 'custom',
        // services.ts (custom solutions, application engineering); productsData.tsx (specialized).
        question: 'Can you make a special tool to my drawing?',
        answer: [
          'Yes. Special machining tasks require special tools, so custom tools are individually tailored to your requirements. You share the part drawing, material, machine type and cycle requirements; we analyse them and design the tool geometry, applying Design for Manufacturability to balance performance and cost.',
          'Combination tools can consolidate several machining operations into one tool to reduce tool changes and production cost.',
        ],
        link: { to: '/products/specialized', label: 'Specialized solutions' },
      },
      {
        id: 'materials',
        // productsData.tsx: solid carbide intro and materials capability; PCD intro.
        question: 'Which workpiece materials are your tools made for?',
        answer: [
          'Solid carbide tools are made for grey and nodular cast iron, alloyed and stainless steels, titanium, Inconel and aluminium, including geometries for aerospace aluminium alloys.',
          'PCD tools are made for highly productive machining of aluminium parts in automotive and aerospace applications.',
        ],
      },
      {
        id: 'sizes',
        // productsData.tsx: solid carbide features.
        question: 'What size ranges do your solid carbide tools cover?',
        answer: [
          'End mills from 2 to 32 mm diameter with 2, 3, 4, 5 and 6 flutes; reamers from 2 to 32 mm, made to customer-specific bore tolerances including H6 and H7; and drills from 2 to 25 mm, including special step drills.',
        ],
        link: { to: '/products/solid-carbide', label: 'Solid carbide tools' },
      },
      {
        id: 'pcd-vs-carbide',
        // productsData.tsx: PCD capabilities.
        question: 'When is PCD a better choice than solid carbide?',
        answer: [
          'For aluminium. Aluminium can stick to a hot cutting edge and form built-up edge. PCD combines very high hardness, an ultra-fine microstructure and sharp cutting edges, which reduces this effect compared with solid carbide and supports high cutting speeds, feeds and long tool life.',
          'Several operations can also be combined into one PCD tool, reducing tool changes and production costs.',
        ],
        link: { to: '/products/pcd/pcd-technology', label: 'PCD tooling technology' },
      },
      {
        id: 'brazed',
        // productsData.tsx: approved Brazed copy "Solid Performance. Smarter Tooling".
        question: 'What are brazed carbide-tipped tools, and why use them?',
        answer: [
          'Carbide raw material is expensive. Brazed carbide-tipped tools reduce tool cost while giving the same performance as solid carbide tools.',
          'The tool body is high-quality, heat-treated tool steel, fluted and with pockets prepared; the carbide tips are brazed onto it, and the cutting edges are ground on a 5-axis CNC tool grinding machine so the required geometries are achieved in one go.',
        ],
        link: { to: '/products/brazed', label: 'Brazed carbide tools' },
      },
      {
        id: 'coolant',
        // productsData.tsx: solid carbide coolant capability; Brazed solutions list.
        question: 'Are tools available with internal coolant?',
        answer: [
          'Yes. Solid carbide drills are available with internal coolant from 4 mm diameter. Brazed carbide reamers, and lugged carbide drills and reamers, are also made with internal coolant supply.',
        ],
      },
      {
        id: 'coating',
        // equipment.ts: PVD coating solutions.
        question: 'Are the tools coated?',
        answer: [
          'Wear-resistant PVD coatings are applied to solid carbide reamers and drills and to brazed carbide reamers, selected to suit the workpiece material and the application.',
        ],
      },
    ],
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing and quality',
    items: [
      {
        id: 'equipment',
        // equipment.ts.
        question: 'What equipment are the tools made on?',
        answer: [
          'SAACKE UW II and UW ID O 5-axis CNC tool grinding machines grind solid carbide end mills, drills and reamers, and the cutting edges of brazed carbide tools. A VOLLMER QWD wire EDM machine produces PCD cutting edges, which are finished with lapping and grinding.',
        ],
        link: { to: '/services', label: 'Technology and services' },
      },
      {
        id: 'inspection',
        // equipment.ts (Helicheck); Contact.tsx "Inspection & dispatch" step.
        question: 'How are the tools inspected?',
        answer: [
          'Each tool is checked against your drawing on the WALTER HELICHECK PRO measuring machine before dispatch.',
        ],
      },
      {
        id: 'where',
        // JourneyTimeline.tsx (2013, 2017); siteConfig.ts (address).
        question: 'Where are the tools made?',
        answer: [
          `In our manufacturing unit in Bengaluru: ${siteConfig.address.street}, ${siteConfig.address.cityLine}. RMTT started in 2013 as a trading company and has manufactured solid carbide tools there since 2017.`,
        ],
        link: { to: '/about', label: 'About RMTT' },
      },
      {
        id: 'industries',
        // industries.ts.
        question: 'Which industries do you supply?',
        answer: [`${industryList}.`],
      },
    ],
  },
  {
    id: 'ordering',
    title: 'Enquiries and orders',
    items: [
      {
        id: 'enquire',
        // Contact.tsx form fields and behaviour; siteConfig.ts.
        question: 'How do I send an enquiry?',
        answer: [
          `Fill in the enquiry form on the Contact page with your tool type, industry, component material, machine, quantity and a description of the application. Pressing "Enquire now" opens your email app with the enquiry filled in; you can attach a drawing to that email before sending it.`,
          `You can also email ${siteConfig.email}, or call or WhatsApp ${siteConfig.phone}.`,
        ],
        link: { to: '/contact', label: 'Go to the enquiry form' },
      },
      {
        id: 'process',
        // Contact.tsx "What happens next?".
        question: 'What happens after I send an enquiry?',
        answer: [
          'Our engineers review your application requirements and send a technical proposal with the recommended tool design and pricing. Sample tools are then made for your approval before the full production order. Once the sample is approved, your tools are manufactured on SAACKE grinding or VOLLMER EDM, with edge preparation and coating applied, and each tool is checked against your drawing on the Walter Helicheck before dispatch.',
        ],
      },
      {
        id: 'samples',
        // Contact.tsx "Sample & trial".
        question: 'Can I trial a tool before placing a production order?',
        answer: ['Yes. Sample tools are manufactured for your approval before the full production order.'],
      },
    ],
  },
];

export const faqItems = faqGroups.flatMap(group => group.items);
