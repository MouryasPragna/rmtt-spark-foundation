import { products, type Product } from '../data/products';
import { Settings, Gem, Layers, Sparkles } from 'lucide-react';
import solidCarbideOverview from '../assets/solid-carbide-end-mills-range.webp.asset.json';
import pcdOverview from '../assets/home-pcd-boring.webp.asset.json';
import brazedCarbideOverview from '../assets/home-brazed-tslot.webp.asset.json';
import solidCarbideReamers from '../assets/solid-carbide-reamers-range.webp.asset.json';
import specializedOverview from '../assets/brazed-tool-8.webp.asset.json';
import solidCarbideHero from '../assets/sc-hero-group.webp';
import scEndMillsCard from '../assets/sc-end-mills-group-card.webp';
import scReamersCard from '../assets/sc-reamers-group-card.webp';
import scDrillsCard from '../assets/sc-drills-group-card.webp';
import brazedCarbideHero from '../assets/brazed-hero-group.webp';
import pcdHero from '../assets/pcd-hero-group.webp';
import brazedDrawing from '../assets/brazed-drawing-rdh60-00164.webp';
import brazedFinishedTool from '../assets/brazed-tool-rdh60-00164.webp';

export type SubCategory = {
  id: string;
  title: string;
  blurb: string;
  products: Product[];
  /** Photo on the family card (Solid Carbide: studio group shots). */
  cardImage?: string;
  cardImageAlt?: string;
};

/**
 * One "key capabilities" block in the MAPAL information pattern: a titled block of
 * approved copy. `pendingNote` renders a shared ContentPending flag beneath the body
 * when supporting evidence is missing; `pending` alone renders the block as a
 * placeholder without fabricated copy.
 */
export type CapabilityBlock = {
  id: string;
  title: string;
  body: string;
  pendingNote?: string;
  pending?: boolean;
};

export type FeaturedExample = {
  title: string;
  blurb: string;
  image: string;
  imageAlt: string;
  href: string;
};

export type CategoryStory = {
  heading: string;
  lead: string;
  construction: { heading: string; paragraphs: string[] };
  /** Drawing and finished tool for the same model, shown side by side. */
  drawingToTool: { model: string; drawing: string; drawingAlt: string; tool: string; toolAlt: string };
  solutions: { heading: string; items: string[] };
};

export type Category = {
  id: 'solid-carbide' | 'pcd' | 'brazed' | 'specialized';
  icon: typeof Settings;
  color: string;
  bg: string;
  label: string;
  headline: string;
  intro: string;
  intro2?: string;
  image: string;
  imageAlt: string;
  heroImage?: string;
  heroAlt?: string;
  /** The hero and family photos are studio shots on the shared grey backdrop (shown on a matching band). */
  studio?: boolean;
  /** Band gradient when the hero photo's backdrop differs from the shared --studio-backdrop. */
  studioBackdrop?: string;
  /** Single-page categories (Brazed Carbide): approved copy shown in place of product families. */
  story?: CategoryStory;
  features: string[];
  featured: FeaturedExample;
  capabilities: CapabilityBlock[];
  subcategories: SubCategory[];
};

export const categories: Category[] = [
  {
    id: 'solid-carbide',
    icon: Settings,
    color: 'var(--cat-solid)',
    bg: 'var(--cat-solid-bg)',
    label: 'Solid Carbide',
    headline: 'Solid Carbide End Mills, Reamers & Drills',
    intro:
      'High-performance solid carbide tools for demanding machining across grey and nodular cast iron, alloyed and stainless steels, titanium, Inconel and aluminium.',
    intro2:
      'The range includes precision end mills, reamers and drills with application-specific geometries, polished flutes, internal coolant options and wear-resistant PVD coatings — all ground on German CNC equipment in Bengaluru.',
    image: solidCarbideOverview.url,
    imageAlt: 'Solid carbide end mill — example from the Solid Carbide range',
    heroImage: solidCarbideHero,
    heroAlt: 'The RIDDHI solid carbide range: end mills, reamers, drills, step drills and special form tools',
    studio: true,
    features: [
      'End mill diameters from 2 to 32 mm',
      '2, 3, 4, 5 and 6-flute options',
      'Multi-helix geometry, polished and edge-honed',
      'Reamer diameters from 2 to 32 mm',
      'Customer-specific bore tolerances, including H6 and H7',
      'Drills from 2 to 25 mm, including special step drills',
      'Internal coolant from 4 mm diameter on drills',
      'Application-specific PVD wear-resistant coatings',
    ],
    featured: {
      title: 'Solid Carbide Reamers',
      blurb:
        'High-performance multi-blade monoblock reamers with unequal spacing and application-specific cutting geometry. Straight flutes suit through and blind holes, with left-hand spiral flutes for through holes — produced to customer-specific bore tolerances, including H6 and H7, in diameters from 2 to 32 mm.',
      image: solidCarbideReamers.url,
      imageAlt: 'Solid carbide reamers — example from the Solid Carbide range',
      href: '/products/solid-carbide/sc-reamers',
    },
    capabilities: [
      {
        id: 'materials',
        title: 'For every workpiece material',
        body:
          'Along with tools for machining steel, stainless steel, cast iron and aluminium, the programme includes geometries for titanium, Inconel and aerospace aluminium alloys.',
      },
      {
        id: 'coatings',
        title: 'Wear-resistant PVD coatings',
        body:
          'Cutting edges receive application-specific PVD wear-resistant coatings matched to the machining case.',
        pendingNote: 'The detailed coating programme (coating types and substrates) will be added once approved manufacturer documentation is supplied.',
      },
      {
        id: 'coolant',
        title: 'Internal coolant options',
        body:
          'Drills from 4 mm diameter are available with internal coolant supply for reliable chip evacuation in deep and multi-diameter holes.',
      },
      {
        id: 'geometry',
        title: 'Customer-specific geometries',
        body:
          'Multi-helix geometry, polished flutes and edge honing are matched to the application; special step drills and special multi-step reamers are engineered to customer requirements.',
      },
      {
        id: 'equipment',
        title: 'Latest production equipment',
        body:
          'Tools are ground on 5-axis CNC grinding equipment in Bengaluru, with cutting edges measured optically on Walter Helicheck equipment.',
      },
      {
        id: 'reconditioning',
        title: 'Reconditioning service',
        body: '',
        pending: true,
      },
    ],
    subcategories: [
      {
        id: 'sc-end-mills',
        title: 'End Mills',
        blurb:
          'Precision milling. Consistent performance.',
        products: products.filter(product => product.subcategory === 'sc-end-mills'),
        cardImage: scEndMillsCard,
        cardImageAlt: 'Solid carbide end mills from the RIDDHI range',
      },
      {
        id: 'sc-reamers',
        title: 'Reamers',
        blurb:
          'Precision reaming for demanding materials.',
        products: products.filter(product => product.subcategory === 'sc-reamers'),
        cardImage: scReamersCard,
        cardImageAlt: 'Solid carbide reamers from the RIDDHI range',
      },
      {
        id: 'sc-drills',
        title: 'Drills & Step Drills',
        blurb:
          'Precision drilling for demanding materials.',
        products: products.filter(product => product.subcategory === 'sc-drills'),
        cardImage: scDrillsCard,
        cardImageAlt: 'Solid carbide drills and step drills from the RIDDHI range',
      },
    ],
  },
  {
    id: 'pcd',
    icon: Gem,
    color: 'var(--cat-pcd)',
    bg: 'var(--cat-pcd-bg)',
    label: 'PCD Tools',
    headline: 'PCD Tools for High-Performance Machining',
    intro:
      'Polycrystalline diamond tooling for highly productive machining of aluminium parts in automotive and aerospace applications.',
    intro2:
      'RMTT starts with the customer’s component and application requirements, then develops a proposal, tool design and manufacturing solution to meet production and performance requirements for drilling, milling and precision boring.',
    image: pcdOverview.url,
    imageAlt: 'PCD boring tool — example from the PCD range',
    heroImage: pcdHero,
    heroAlt: 'The RIDDHI PCD range: step drills, reamers, boring and form tools with HSK and cylindrical shanks',
    studio: true,
    features: [
      'Application-specific drilling, milling and boring solutions',
      'Wire EDM, lapping and grinding of cutting edges',
      'Solid carbide or steel tool bodies',
      'Seamless brazing and high-quality pocket seats',
      'Smooth flutes and balanced PCD material',
      'Long tool life and high wear resistance',
      'Surface finish below Ra 0.2 is possible',
      'Tight tolerances maintained over longer machining cycles',
      'Combined operations reduce tool changes and production costs',
      'High cutting speeds and feeds can reduce machining time',
    ],
    featured: {
      title: 'PCD Multi-Step Reamers',
      blurb:
        'Precision PCD tooling designed around component and bore requirements, including multi-step tools that consolidate operations into one tool — such as the five-step shock-absorber bore reamer machined at a cutting speed of 210 m/min.',
      image: pcdOverview.url,
      imageAlt: 'PCD boring tool — example from the PCD range',
      href: '/products/pcd/pcd-reamers',
    },
    capabilities: [
      {
        id: 'materials',
        title: 'Sharp edges against built-up edge',
        body:
          'PCD combines very high hardness, an ultra-fine microstructure and sharp cutting edges. Aluminium can adhere at a hot cutting edge and form built-up edge; PCD reduces this effect compared with solid carbide and supports high cutting speeds, feeds and long tool life.',
      },
      {
        id: 'manufacturing',
        title: 'Manufacturing technology',
        body:
          'Wire EDM, lapping and grinding of cutting edges on solid carbide or steel tool bodies, with seamless brazing, high-quality pocket seats and smooth flutes.',
      },
      {
        id: 'finish',
        title: 'Surface finish',
        body: 'Surface finishes below Ra 0.2 are possible.',
        pendingNote: 'The unit for the stated Ra 0.2 figure, and supporting trial evidence, will be added once confirmed by the client.',
      },
      {
        id: 'combined',
        title: 'Combined operations',
        body:
          'Operations can be consolidated into one tool, reducing tool changes and production costs while tight tolerances are maintained over longer machining cycles.',
      },
      {
        id: 'custom',
        title: 'Custom solutions',
        body:
          'Special machining tasks are engineered individually from the customer’s component, material and production requirements.',
      },
    ],
    subcategories: [
      {
        id: 'pcd-tools',
        title: 'PCD Tooling Technology',
        blurb:
          'PCD combines very high hardness, an ultra-fine microstructure, smooth chip surfaces and sharp cutting edges. Aluminium can adhere at a hot cutting edge and form built-up edge, impairing machining performance. PCD reduces this effect compared with solid carbide and supports high speeds, feeds and long tool life.',
        products: products.filter(product => product.subcategory === 'pcd-tools'),
      },
      {
        id: 'pcd-reamers',
        title: 'PCD Boring & Reaming Tools',
        blurb:
          'Precision PCD tooling designed around component and bore requirements, including operations that can be consolidated into one tool.',
        products: products.filter(product => product.subcategory === 'pcd-reamers'),
      },
      {
        id: 'pcd-milling',
        title: 'PCD Milling & Special Tools',
        blurb:
          'PCD milling and application-specific tools engineered for high-speed aluminium machining and multiple-operation processes.',
        products: products.filter(product => product.subcategory === 'pcd-milling'),
      },
    ],
  },
  {
    id: 'brazed',
    icon: Layers,
    color: 'var(--cat-brazed)',
    bg: 'var(--cat-brazed-bg)',
    label: 'Brazed Carbide',
    headline: 'Brazed Carbide Tools',
    intro:
      'Due to the high cost of carbide raw material, RIDDHI brings a unique solution for reducing tool costs while maintaining the same performance as that of solid carbide tools by offering brazed carbide-tipped tools.',
    image: brazedCarbideOverview.url,
    imageAlt: 'Brazed carbide T-slot cutter — example from the Brazed Carbide range',
    heroImage: brazedCarbideHero,
    heroAlt: 'RIDDHI brazed carbide-tipped tools: reamers, stepped and form tools and a T-slot cutter on heat-treated steel bodies',
    studio: true,
    // Sampled from this photo's left and right edges (a lighter backdrop than the other studio shots).
    studioBackdrop: 'linear-gradient(180deg, #DADADA 0%, #DCDCDC 5%, #DEDEDE 10%, #E0E0E0 15%, #E2E2E2 20%, #E4E4E4 25%, #E7E7E7 30%, #E8E8E8 35%, #E8E8E8 40%, #EAEAEA 45%, #EAEAEA 50%, #EBEBEB 55%, #EFEFEF 60%, #F7F7F7 65%, #FDFDFD 70%, #FCFCFC 75%, #F2F2F2 80%, #EFEFEF 85%, #F4F4F4 90%, #F8F8F8 95%, #FAFAFA 100%)',
    // Approved client copy: "Solid Performance. Smarter Tooling".
    story: {
      heading: 'Solid Performance. Smarter Tooling',
      lead: 'Due to the high cost of carbide raw material, RIDDHI brings a unique solution for reducing tool costs while maintaining the same performance as that of solid carbide tools by offering brazed carbide-tipped tools.',
      construction: {
        heading: 'The construction',
        paragraphs: [
          'The tool body is made of high-quality tool steel, which is heat-treated, and the carbide tips are brazed onto the steel body (suitably fluted and pockets are prepared).',
          'The cutting edges are ground on a 5-axis CNC tool grinding machine, ensuring the required geometries are achieved in one go.',
        ],
      },
      drawingToTool: {
        model: 'RDH60-00164',
        drawing: brazedDrawing,
        drawingAlt: 'Engineering drawing of a brazed carbide helical cutter: Ø80 × 132 mm, Ø40 H6 bore, with an end view of the brazed carbide teeth',
        tool: brazedFinishedTool,
        toolAlt: 'The finished brazed carbide helical cutter RDH60-00164, Ø80 × 132.0, with carbide tips brazed along each helical flute',
      },
      solutions: {
        heading: 'Our solutions',
        items: [
          'Tools are manufactured according to customer-specific requirements',
          'Brazed carbide reamers with internal coolant supply and PVD coating',
          'Stepped special tools and form tools',
          'T-slot milling cutters',
          'Lugged carbide drills and reamers with internal coolant supply',
        ],
      },
    },
    features: [
      'Tool-steel body, heat-treated for the application',
      'Carbide tips brazed into prepared pockets',
      'Cutting edges ground on 5-axis CNC equipment',
      'Manufactured to customer-specific requirements',
    ],
    featured: {
      title: 'Brazed carbide-tipped tools',
      blurb:
        'Brazed carbide-tipped tools manufactured to customer-specific requirements, with the performance of solid carbide at a lower tool cost.',
      image: brazedFinishedTool,
      imageAlt: 'Brazed carbide helical cutter RDH60-00164',
      href: '/products/brazed',
    },
    capabilities: [],
    subcategories: [],
  },
  {
    id: 'specialized',
    icon: Sparkles,
    color: 'var(--cat-specialized)',
    bg: 'var(--cat-specialized-bg)',
    label: 'Specialized Solutions',
    headline: 'Specialized Solutions & Custom Tooling',
    intro:
      'Application-engineered special tools manufactured to customer-specific component and process requirements.',
    intro2:
      'Combination tools consolidate multiple machining operations into a single tool to reduce tool changes and production cost; form and stepped tools are purpose-designed around the required profile and machining sequence.',
    image: specializedOverview.url,
    imageAlt: 'Special carbide tool — example from the Specialized Solutions range',
    features: [
      'Combination tools consolidating multiple operations',
      'Purpose-designed PCD and carbide form tools',
      'Stepped special tools matched to the machining sequence',
      'Manufactured to customer-specific requirements',
      'PCD and brazed carbide constructions',
      'Engineered from the component, material and production requirements',
    ],
    featured: {
      title: 'Special Carbide Tools',
      blurb:
        'Application-engineered special tools manufactured to customer-specific requirements — from stepped and form tools to combination tooling that consolidates several machining operations into one tool.',
      image: specializedOverview.url,
      imageAlt: 'Special carbide tool — example from the Specialized Solutions range',
      href: '/products/specialized/special-solutions',
    },
    capabilities: [
      {
        id: 'combined',
        title: 'Combined operations',
        body:
          'Combination tooling can consolidate multiple machining operations into one tool to reduce tool changes and production cost.',
      },
      {
        id: 'form',
        title: 'Form and stepped tools',
        body:
          'Purpose-designed form geometry and stepped tools are manufactured to suit the required profile and machining sequence.',
      },
      {
        id: 'custom',
        title: 'Engineered to the component',
        body:
          'Special machining tasks are engineered individually from the customer’s component, material and production requirements.',
      },
      {
        id: 'constructions',
        title: 'PCD and brazed carbide constructions',
        body:
          'Special solutions are built as PCD tools for high-speed aluminium machining or as brazed carbide tools on heat-treated tool-steel bodies.',
      },
    ],
    subcategories: [
      {
        id: 'special-solutions',
        title: 'Special & Combination Tools',
        blurb:
          'Custom PCD and carbide special tools — combination, form and stepped tools designed around the component and its production requirements.',
        products: products.filter(product => product.subcategory === 'special-solutions'),
      },
    ],
  },
];

/** Shared two-level navigation; family pages keep their fuller range titles. */
export const productNavigation = categories.map(area => ({
  label: area.id === 'brazed' ? 'Brazed Carbide Tools' : area.label,
  href: `/products/${area.id}`,
  families: area.id === 'solid-carbide' || area.id === 'brazed'
    ? area.subcategories.map(family => ({
      label: family.id === 'sc-drills' ? 'Drills' : family.title,
      href: `/products/${area.id}/${family.id}`,
    }))
    : [],
}));
