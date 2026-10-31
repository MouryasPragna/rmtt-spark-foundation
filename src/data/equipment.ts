import saackeImg from '../assets/equip-saacke.webp.asset.json';
import vollmerImg from '../assets/equip-vollmer.webp.asset.json';
import walterImg from '../assets/equip-walter.webp.asset.json';
import { Microscope, Cpu, Sparkles, Eye } from 'lucide-react';

export const equipment = [
  {
    num: '01',
    id: 'saacke',
    image: saackeImg.url as string | undefined,
    imageAlt: 'SAACKE UW II and UW ID O tool grinding machines',
    homeFeatured: true,
    facilityEquipment: true,
    shortName: "SAACKE UW II & UW ID O",
    summary: "5-axis grinding for rotary cutting tools",
    facilityName: "SAACKE UW II and SAACKE UW ID O — 5-axis tool grinding machines",
    icon: Cpu,
    name: 'SAACKE UW II & UW ID O',
    models: ['UW II', 'UW ID O'],
    detail:
      '5-axis CNC tool grinding machines used to grind solid carbide end mills, drills and reamers, and the cutting edges of brazed carbide tools — producing the required geometries in one go.',
    uses: ['Solid carbide end mills, drills and reamers', 'Brazed carbide tool cutting edges', 'Multi-helix, multi-step and form geometries'],
    // TODO: confirm with client
    // specs: ['5-axis simultaneous interpolation', 'Sub-micron geometric accuracy', 'Internal coolant hole grinding', 'Repeatable setups via digital machine memory'],
  },
  {
    num: '02',
    id: 'vollmer',
    image: vollmerImg.url as string | undefined,
    imageAlt: 'VOLLMER QWD wire EDM machine',
    homeFeatured: true,
    facilityEquipment: true,
    shortName: "VOLLMER QWD Wire EDM",
    summary: "PCD cutting-edge production with wire EDM",
    facilityName: "VOLLMER QWD Wire EDM Machine",
    icon: Sparkles,
    name: 'VOLLMER QWD Wire EDM',
    models: ['QWD'],
    detail:
      'Wire EDM machine used to produce PCD cutting edges. Wire EDM is combined with lapping and grinding to finish edges on PCD reamers, boring and milling tools.',
    uses: ['PCD cutting-edge production', 'PCD reamers, boring and milling tools', 'Edges finished with lapping and grinding'],
    // TODO: confirm with client
    // specs: ['PCD & CBN compatible', 'Edge geometry to ±0.002mm', 'Precision lapping post-EDM', 'No heat-affected zone'],
  },
  {
    num: '03',
    id: 'helicheck',
    image: walterImg.url as string | undefined,
    imageAlt: 'WALTER HELICHECK PRO measuring machine',
    homeFeatured: true,
    facilityEquipment: true,
    shortName: "WALTER HELICHECK PRO",
    summary: "Optical non-contact tool measurement & inspection",
    facilityName: "WALTER HELICHECK PRO Measuring Machine",
    icon: Eye,
    name: 'WALTER HELICHECK PRO Optical Measurement',
    models: ['HELICHECK PRO'],
    detail:
      'Measuring machine used to check tool geometry, so manufactured tools can be verified against the drawing before dispatch.',
    uses: ['Tool geometry measurement', 'Inspection before dispatch'],
    // TODO: confirm with client
    // specs: ['Non-contact optical measurement', 'Full geometry verification', '100% outgoing inspection', 'Digital measurement records per tool'],
  },
  {
    num: '04',
    id: 'coating',
    image: undefined as string | undefined,
    imageAlt: '',
    homeFeatured: false,
    facilityEquipment: false,
    icon: Microscope,
    name: 'PVD Coating Solutions',
    detail:
      'Wear-resistant PVD coatings are applied to solid carbide reamers and drills and to brazed carbide reamers, selected to suit the workpiece material and application.',
    uses: ['Solid carbide reamers and drills', 'Brazed carbide reamers', 'Application-specific selection'],
    // TODO: confirm with client
    // specs: ['AlTiN — steel and cast iron', 'TiSiN — hardened steel (>55 HRC)', 'DLC — aluminium and non-ferrous', 'nACo — general high-performance'],
  },
];

export const homeEquipment = equipment.filter(item => item.homeFeatured);
export const facilityEquipment = equipment.filter(item => item.facilityEquipment);
