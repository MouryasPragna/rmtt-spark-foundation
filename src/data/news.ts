// News & articles. Only items with `published: true` are shown on the site.
// Source: rmtt-blogs.zip (text rewritten to remove unverified claims) + LinkedIn Vollmer post.
// Image provenance is recorded in each credit; use supplied RMTT photos only for matching subjects.
import brazedTslot from '../assets/home-brazed-tslot.webp.asset.json';

export type NewsBlock =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'ul'; items: string[] };

export type NewsImage = { src: string; alt: string; credit?: string };

export type NewsItem = {
  id: string;
  date: string; // YYYY-MM-DD
  category: 'Company' | 'Manufacturing' | 'Product spotlight' | 'Partnerships';
  title: string;
  summary: string;
  image?: NewsImage;
  gallery?: NewsImage[];
  body: NewsBlock[];
  linkedinUrl?: string;
  published: boolean; // false = hold until content/image rights are confirmed
};

// The shared call-to-action paragraph is rendered by NewsArticle, not stored per article.
export const news: NewsItem[] = [
  {
    id: 'precision-tooling-from-bengaluru',
    date: '2026-10-10',
    category: 'Company',
    title: 'Precision cutting tools, made in Bengaluru',
    summary:
      'Founded in 2013, RMTT manufactures solid carbide and PCD special tools on a 5-axis CNC grinding cell at our Kanakapura Road facility.',
    image: {
      src: '/images/news/saacke-grinding-centre.webp',
      alt: 'SAACKE UW II CNC tool and cutter grinding machine',
      credit: 'Machine image: SAACKE (manufacturer). Replace with RMTT photo.',
    },
    body: [
      { type: 'p', text: 'Riddhi Machine Tool Technology (RMTT) started in Bengaluru in 2013 as a trading business and began manufacturing in 2017. Our aim is to build precision cutting tools in India that customers can rely on, with a team that is customer oriented, technology oriented and service oriented.' },
      { type: 'h', text: 'Control quality at the source' },
      { type: 'p', text: 'Our core processes run in-house: tool grinding on a SAACKE 5-axis CNC machine and PCD cutting-edge production on a Vollmer EDM.' },
      { type: 'h', text: 'What we manufacture' },
      { type: 'ul', items: [
        'Special solid carbide drills, step drills and hole mills',
        'Solid carbide reamers and PCD reamers',
        'End mills, including polished geometries for aluminium',
        'PCD special tools',
      ] },
    ],
    published: true,
  },
  {
    id: 'why-5-axis-tool-grinding-matters',
    date: '2026-09-22',
    category: 'Manufacturing',
    title: 'Why 5-axis CNC tool grinding matters',
    summary:
      'Grinding the full tool geometry in one clamping keeps runout consistent and makes complex forms practical.',
    image: {
      src: '/images/news/saacke-external-grinding.webp',
      alt: 'SAACKE CNC grinding machine',
      credit: 'Machine image: SAACKE (manufacturer). Replace with RMTT photo.',
    },
    body: [
      { type: 'p', text: 'What separates a good cutting tool from a great one is often what the machine makes possible. On a 5-axis grinder the flutes, point, relief angles, necks and forms can be completed in one clamping, instead of repositioning the tool between operations.' },
      { type: 'h', text: 'Why it helps' },
      { type: 'ul', items: [
        'Less re-clamping means less runout and stack-up error, which supports hole roundness and surface finish.',
        'Stepped profiles, piloted drills and coolant-fed geometries become practical to produce.',
        'Tool-to-tool repeatability for customers running multi-machine cells.',
      ] },
    ],
    published: true,
  },
  {
    id: 'pcd-reamers-internal-coolant',
    date: '2026-08-28',
    category: 'Product spotlight',
    title: 'PCD reamers with internal coolant',
    summary:
      'Solid carbide bodies with brazed PCD cutting edges, built for stable, high-volume machining of aluminium and non-ferrous parts.',
    image: {
      src: '/images/news/pcd-reamers.webp',
      alt: 'PCD reamers and PCD-tipped special tools',
      credit: 'Representative image. Replace with RMTT photo.',
    },
    gallery: [
      { src: '/images/news/pcd-special-tools.webp', alt: 'PCD special tools including a reamer and step tool', credit: 'Representative image. Replace with RMTT photo.' },
    ],
    body: [
      { type: 'p', text: 'Reaming is a finishing operation. It removes only a few hundredths of a millimetre but sets final hole size, roundness and surface quality. In high-silicon aluminium alloys, abrasive silicon quickly wears carbide edges. PCD holds its edge far longer, which keeps hole size consistent over long production runs.' },
      { type: 'p', text: 'Our PCD reamers use a solid carbide body, brazed polycrystalline diamond cutting edges and an internal coolant supply. Internal coolant flushes chips along controlled paths, which helps avoid chip scoring inside the bore and keeps the cutting zone temperature stable.' },
      { type: 'p', text: 'Application tip: PCD delivers the most value in stable, high-volume machining of aluminium and non-ferrous materials. For hardened steels, ask us about alternatives.' },
    ],
    published: true,
  },
  {
    id: 'step-drills-and-hole-mills',
    date: '2026-08-05',
    category: 'Product spotlight',
    title: 'One tool, many operations: step drills and hole mills',
    summary:
      'Special drills, step tools and hole mills combine drilling, chamfering and counterboring in a single solid carbide tool.',
    image: {
      src: '/images/news/step-drills.webp',
      alt: 'Solid carbide step drills and special drills',
      credit: 'Representative image. Replace with RMTT photo.',
    },
    body: [
      { type: 'p', text: 'A multi-diameter hole feature (drill, chamfer, counterbore, finish) can take several tools and several tool changes. A step tool combines two or more diameters and operations along one axis, so they happen in one pass.' },
      { type: 'ul', items: [
        'Fewer tool changes and retracts on multi-feature holes.',
        'Diameters are ground concentric on one tool, removing stack-up between separate operations.',
        'Fewer tools to stock and manage.',
        'Internal coolant options for deep holes or difficult chip evacuation.',
      ] },
      { type: 'h', text: 'Made to your part' },
      { type: 'p', text: 'Share the drawing or the current process. Our team defines diameters, step lengths, corner radii, helix angle and coating, and the tool is ground to suit your component.' },
    ],
    published: true,
  },
  {
    id: 'polished-end-mills-for-aluminium',
    date: '2026-07-18',
    category: 'Product spotlight',
    title: 'Polished end mills for aluminium',
    summary:
      'Polished flutes reduce built-up edge and help chips clear, so aluminium parts come off the machine with a better finish.',
    image: {
      src: '/images/news/aluminium-end-mill.webp',
      alt: 'Polished solid carbide end mill for aluminium',
      credit: 'Representative image. Replace with RMTT photo.',
    },
    body: [
      { type: 'p', text: 'Aluminium is soft and adhesive. Under cutting pressure it smears onto the tool as built-up edge, which tears the finish and adds cutting force. A polished flute lets chips slide away instead of welding to the tool.' },
      { type: 'ul', items: [
        'Lower friction and delayed built-up edge formation.',
        'Better chip evacuation, especially in deep pockets.',
        'High-helix, 2- and 3-flute layouts that lift chips out of the cut.',
        'Sharp, lightly prepared edges that shear cleanly.',
      ] },
      { type: 'p', text: 'Typical uses include mould and die plates, automotive structural aluminium and aerospace housings.' },
    ],
    published: true,
  },
  {
    id: 'brazed-carbide-t-slot-cutters',
    date: '2026-07-02',
    category: 'Product spotlight',
    title: 'Brazed carbide T-slot cutters',
    summary:
      'Carbide cutting edges on a tough steel shank, for slot milling where HSS cutters limit speed and tool life.',
    image: {
      src: brazedTslot.url,
      alt: 'Brazed carbide T-slot cutter',
      credit: 'RMTT T-slot cutter — supplied company photograph.',
    },
    gallery: [
      { src: '/images/news/t-slot-milling.webp', alt: 'T-slot milling on a CNC machining centre', credit: 'Illustrative image. Replace with RMTT photo.' },
    ],
    body: [
      { type: 'p', text: 'T-slot milling means interrupted cuts, thin necks prone to vibration and chips trapped in the slot. Brazed carbide cutters let the cutting zone carry the harder material while the shank stays tough, allowing higher speeds and feeds than HSS equivalents.' },
      { type: 'h', text: 'Application guidance' },
      { type: 'ul', items: [
        'Rough the slot first with an end mill where possible.',
        'Climb mill to reduce impact on entry and improve finish.',
        'Use ample coolant and polished-flute tools to clear chips.',
        'Keep stick-out minimal and check holder runout.',
      ] },
      { type: 'p', text: 'For non-standard slot widths, neck lengths or profiles, send us the drawing and we will quote a special.' },
    ],
    published: true,
  },
  {
    // TODO after client meeting: confirm partner names/ranges before adding them.
    id: 'precision-tool-holding-partners',
    date: '2026-06-20',
    category: 'Partnerships',
    title: 'The right interface: precision tool holding',
    summary: 'Pairing our special tools with precision holders and collets so the whole tool system performs.',
    image: {
      src: '/images/news/collet-chuck.webp',
      alt: 'High-precision collet chuck holding a cutting tool',
      credit: 'Representative image. Replace with RMTT or partner-approved photo.',
    },
    body: [
      { type: 'p', text: 'A cutting tool is only as accurate as the interface holding it. Runout at the cutting edge shortens tool life, pushes holes out of round and degrades finish.' },
      { type: 'p', text: 'RMTT pairs its special tools with precision tool holders, collets and standard tooling, so the complete system, tool plus holder, delivers the accuracy your process was designed for. Our team can advise on the right holder for your tool and spindle.' },
    ],
    published: true,
  },
  {
    // HELD: date, LinkedIn URL and photo still needed; confirm whether this is a second machine (Journey page says Vollmer EDM arrived 2020).
    id: 'vollmer-edm-welcome',
    date: '2026-01-01',
    category: 'Company',
    title: 'Welcoming our new VOLLMER EDM machine',
    summary:
      'We are happy to welcome our new VOLLMER EDM machine to the Riddhi family, strengthening our precision manufacturing capabilities.',
    body: [
      { type: 'p', text: 'We are happy to welcome our new VOLLMER EDM machine to the Riddhi family. This addition strengthens our capabilities in precision manufacturing, advanced technology, and delivering the quality our customers expect from us.' },
    ],
    image: {
      src: '/images/news/vollmer-edm.webp',
      alt: 'The new VOLLMER EDM machine at the Riddhi facility',
    },
    linkedinUrl: 'https://www.linkedin.com/posts/ravi-kumar-k-86794417_riddhimachinetooltechnology-vollmer-edm-activity-7500101192245575681-_i5s',
    published: true, // TODO: date is a placeholder; confirm the real post date.
  },
];

export const publishedNews = news
  .filter((n) => n.published)
  .sort((a, b) => b.date.localeCompare(a.date));

export const getLatestNews = (count: number) => publishedNews.slice(0, count);
export const getNewsById = (id: string) => publishedNews.find((n) => n.id === id);
