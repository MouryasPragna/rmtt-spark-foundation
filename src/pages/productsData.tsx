import { products, type Product } from '../data/products';
import { Settings, Gem, Layers } from 'lucide-react';
import solidCarbideOverview from '../assets/home-solid-endmill.webp.asset.json';
import pcdOverview from '../assets/home-pcd-boring.webp.asset.json';
import brazedCarbideOverview from '../assets/home-brazed-tslot.webp.asset.json';


export type SubCategory = {
  id: string;
  title: string;
  blurb: string;
  products: Product[];
};

export type Category = {
  id: 'solid-carbide' | 'pcd' | 'brazed';
  icon: typeof Settings;
  color: string;
  bg: string;
  label: string;
  headline: string;
  intro: string;
  image: string;
  imageAlt: string;
  features: string[];
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
      'High-performance solid carbide tools for demanding machining across grey and nodular cast iron, alloyed and stainless steels, titanium, Inconel and aluminium. The range includes precision end mills, reamers and drills, with application-specific geometries, polished flutes, internal coolant options and wear-resistant PVD coatings.',
    image: solidCarbideOverview.url,
    imageAlt: 'Solid carbide end mill — example from the Solid Carbide range',
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
    subcategories: [
      {
        id: 'sc-end-mills',
        title: 'End Mills',
        blurb:
          'Reliable, productive and cost-effective milling tools for slot and shoulder milling, grooving, chamfering, roughing, finishing, high-feed and 3D profile milling. Suitable materials include nodular cast iron, Inconel, titanium, stainless steel, PH steels and aerospace aluminium alloys.',
        products: products.filter(product => product.subcategory === 'sc-end-mills'),
      },
      {
        id: 'sc-reamers',
        title: 'Reamers',
        blurb:
          'Full-carbide reamers for precision bores and critical geometric accuracy in automotive, aerospace and other demanding applications.',
        products: products.filter(product => product.subcategory === 'sc-reamers'),
      },
      {
        id: 'sc-drills',
        title: 'Drills & Step Drills',
        blurb:
          'Solid carbide drilling solutions with smooth polished flutes and cutting edges honed to match the application.',
        products: products.filter(product => product.subcategory === 'sc-drills'),
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
      'Polycrystalline diamond tooling for highly productive machining of aluminium parts in automotive and aerospace applications. Riddhi starts with the customer’s component and application requirements, then develops a proposal, tool design and manufacturing solution to meet production and performance requirements for drilling, milling and precision boring.',
    image: pcdOverview.url,
    imageAlt: 'PCD boring tool — example from the PCD range',
    features: [
      'Application-specific drilling, milling and boring solutions',
      'Wire EDM, lapping and grinding of cutting edges',
      'Solid carbide or steel tool bodies',
      'Seamless brazing and high-quality pocket seats',
      'Smooth flutes and balanced PCD material',
      'Long tool life and high wear resistance',
      'Surface finish below Ra 0.2 is possible (unit not stated in the FINAL deck)',
      'Tight tolerances maintained over longer machining cycles',
      'Combined operations reduce tool changes and production costs',
      'High cutting speeds and feeds can reduce machining time',
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
    headline: 'Brazed Carbide Tools & Special Solutions',
    intro:
      'Brazed carbide-tipped tools offer a cost-conscious alternative amid high carbide raw-material costs, with the FINAL deck describing performance comparable to solid carbide for the intended application. A heat-treated, high-quality tool-steel body is suitably fluted, with carbide tips brazed into prepared pockets. Cutting edges are ground on a 5-axis CNC tool-grinding machine to achieve the required geometries in one setup.',
    image: brazedCarbideOverview.url,
    imageAlt: 'Brazed carbide T-slot cutter — example from the Brazed Carbide range',
    features: [
      'Tool-steel body, heat-treated for the application',
      'Carbide tips brazed into prepared pockets',
      'Cutting edges ground on 5-axis CNC equipment',
      'Manufactured to customer-specific requirements',
      'Stepped special tools and form tools',
      'T-slot milling cutters',
      'Reamers with internal coolant and PVD coating',
      'Lugged carbide drills and reamers with internal coolant',
    ],
    subcategories: [
      {
        id: 'bc-milling',
        title: 'Milling Cutters',
        blurb:
          'Brazed carbide milling solutions include T-slot cutters and special milling tools manufactured for the component and customer requirements.',
        products: products.filter(product => product.subcategory === 'bc-milling'),
      },
      {
        id: 'bc-reamers',
        title: 'Drills & Reamers',
        blurb:
          'Brazed carbide drilling and reaming tools, including internal-coolant options and application-specific geometries.',
        products: products.filter(product => product.subcategory === 'bc-reamers'),
      },
      {
        id: 'bc-special',
        title: 'Stepped & Form Tools',
        blurb:
          'Special and form tools are designed around customer-specific component requirements.',
        products: products.filter(product => product.subcategory === 'bc-special'),
      },
    ],
  },
];
