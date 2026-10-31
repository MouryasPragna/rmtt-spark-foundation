import { Link } from 'react-router-dom';
import { Car, Zap, Droplets, Plane, Cpu, CircleCheck as CheckCircle2, ArrowRight, TrendingUp, Clock, Target } from 'lucide-react';
import styles from './Industries.module.css';
import PhotoPlaceholder from '../components/PhotoPlaceholder';

const caseStudies = [
  {
    id: 1,
    title: 'Cylinder Head Valve Seat & Guide',
    industry: 'Automotive',
    IndustryIcon: Car,
    material: 'Grey cast iron',
    toolUsed: 'Steel body + PCD tips (rough profile & finish)',
    connection: 'Custom engineered',
    challenge:
      'Improve cycle time and achieve consistent profile accuracy for cylinder head intake and exhaust valve seats. Existing brazed carbide solution provided inconsistent finish quality and required frequent regrinding.',
    solution:
      'Custom steel body + PCD-tipped multi-step valve seat reamer. 5-axis SAACKE ground geometry with VOLLMER EDM PCD edges and precision lapping for PCD cutting edges.',
    result: 'Improved profile accuracy, cycle time reduced, superior finish consistency vs previous brazed carbide solution',
    resultIcon: TrendingUp,
    color: 'var(--cat-pcd)',
    badge: 'var(--cat-pcd-bg)',
    badgeText: 'var(--cat-pcd)',
  },
  {
    id: 2,
    title: 'Two-Wheeler Shock Absorber Bore',
    industry: 'Two-wheeler',
    IndustryIcon: Zap,
    material: 'Aluminium die casting',
    toolUsed: 'PCD 5-step reamer, Module 70, Z-4 PCD tips',
    connection: 'Module 70 / BT30',
    challenge:
      'Component has 5 bore steps requiring precision finishing for smooth piston movement. Original process needed 5 separate tools and multiple machine setups, consuming significant cycle time and introducing runout variability.',
    solution:
      'Custom PCD 5-step reamer with Module 70 connection, Z-4 high-quality PCD tips, internal coolant supply. Engineered for Vc=210 m/min at 0.3 mm/rev feed. One tool achieves all 5 steps in single pass with module 60 runout compensation built-in.',
    result: '5 steps in one tool, Vc=210 m/min, feed=0.3 mm/rev',
    resultIcon: Clock,
    color: 'var(--cat-pcd)',
    badge: 'var(--cat-pcd-bg)',
    badgeText: 'var(--cat-pcd)',
  },
  {
    id: 3,
    title: 'Hydraulic Manifold Spool Bore Grooving',
    industry: 'Hydraulics',
    IndustryIcon: Droplets,
    material: 'Grey cast iron',
    toolUsed: 'Special multi-grooving brazed carbide tool',
    connection: 'Custom engineered',
    challenge:
      'Spool bore requires multiple circumferential grooves with tight specifications. Original process needed multiple tool setups and changes, consuming significant machine time and introducing positional inconsistency between grooves.',
    solution:
      'One-shot special multi-grooving tool with all groove widths and spacing ground simultaneously on SAACKE 5-axis. Tight positional tolerances built into the tool geometry for precision without post-machining adjustment. Brazed carbide tips engineered for grey cast iron cutting.',
    result: 'Special multi-grooving brazed carbide tool',
    resultIcon: TrendingUp,
    color: 'var(--cat-brazed)',
    badge: 'var(--cat-brazed-bg)',
    badgeText: 'var(--cat-brazed)',
  },
  {
    id: 4,
    title: 'Cylinder Head Injector Bore Finishing',
    industry: 'Automotive',
    IndustryIcon: Car,
    material: 'Grey cast iron cylinder head',
    toolUsed: 'Solid carbide body with PCD tip long-taper reamer',
    connection: 'Custom engineered',
    challenge:
      'Injector bore long-taper finish requires Ra 0.4 surface quality with tight size consistency. Component requires visible high-quality finish for quality assurance. Standard solid carbide tools could not maintain finish quality across full production batches.',
    solution:
      'Solid carbide body with PCD-tipped long-taper reamer. Wire EDM and lapping are described in the catalogue for PCD cutting edges. 5-axis SAACKE ground geometry.',
    result: 'Application requirement: long taper finish 0.4 Ra and size consistency',
    resultIcon: Target,
    color: 'var(--cat-pcd)',
    badge: 'var(--cat-pcd-bg)',
    badgeText: 'var(--cat-pcd)',
  },
  {
    id: 5,
    title: 'Aerospace Structural Component Reaming',
    industry: 'Aerospace',
    IndustryIcon: Plane,
    material: 'Titanium & aluminium alloys',
    toolUsed: 'PCD 3-step reamer with internal coolant',
    connection: 'Custom engineered',
    challenge:
      'Precision finish reaming of aerospace structural component bores with tight dimensional and positional tolerances. Requires consistent tool performance and traceability across production batches with zero defect tolerance.',
    solution:
      'Custom PCD 3-step reamer engineered for aerospace applications. VOLLMER EDM-machined edges with precision lapping. Internal coolant supply through tool body. The facility includes SAACKE 5-axis grinding and Walter Helicheck measurement.',
    result: 'Application: aerospace component finish reaming',
    resultIcon: CheckCircle2,
    color: 'var(--cat-pcd)',
    badge: 'var(--cat-pcd-bg)',
    badgeText: 'var(--cat-pcd)',
  },
  {
    id: 6,
    title: 'Precision Engineering Master Cylinder Bore',
    industry: 'Precision Engineering',
    IndustryIcon: Cpu,
    material: 'Grey cast iron',
    toolUsed: 'Solid carbide body with PCD tip profile cutter',
    connection: 'Custom engineered',
    challenge:
      'Master cylinder main bore requires precise surface finish to clear blow holes and maintain tight clearances. Component material is grey cast iron with internal porosity that causes frequent tool breakage and finish inconsistency.',
    solution:
      'Solid carbide body with PCD-tipped profile milling cutter engineered specifically for grey cast iron. Optimized flute geometry for chip evacuation, advanced coating (AlTiN), and edge preparation. VOLLMER EDM + precision lapping for smooth cutting edges.',
    result: 'Consistent bore finish quality, superior tool life, reduced rework, improved surface integrity',
    resultIcon: Target,
    color: 'var(--cat-pcd)',
    badge: 'var(--cat-pcd-bg)',
    badgeText: 'var(--cat-pcd)',
  },
];

export default function Industries() {
  return (
    <div className={styles.main}>
      <section className={styles.pageHero}>
        <div className="container">
          <div className="section-eyebrow">Proven results</div>
          <h1 className={styles.pageTitle}>Application case studies</h1>
          <p className={styles.pageSubtitle}>
            Real machining challenges solved with engineered tooling solutions. Every case study represents a problem we solved with a custom-designed tool.
          </p>
        </div>
      </section>

      <section className={styles.casesSection}>
        <div className="container">
          <div className={styles.casesGrid}>
            {caseStudies.map(cs => (
              <article key={cs.id} className={styles.caseCard}>
                <div className={styles.caseImg}>
                  <PhotoPlaceholder icon={cs.IndustryIcon} />
                  <div className={styles.caseImgOverlay} />
                  <span className={styles.caseBadge} style={{ background: cs.color }}>
                    <cs.IndustryIcon size={12} />
                    {cs.industry}
                  </span>
                </div>
                <div className={styles.caseBody}>
                  <h2 className={styles.caseTitle}>{cs.title}</h2>
                  <div className={styles.caseMeta}>
                    <div className={styles.caseMetaItem}>
                      <span className={styles.caseMetaLabel}>Material</span>
                      <span className={styles.caseMetaValue}>{cs.material}</span>
                    </div>
                    <div className={styles.caseMetaItem}>
                      <span className={styles.caseMetaLabel}>Tool used</span>
                      <span className={styles.caseMetaValue}>{cs.toolUsed}</span>
                    </div>
                  </div>
                  <div className={styles.caseSection}>
                    <div className={styles.caseSectionTitle}>Challenge</div>
                    <p className={styles.caseSectionText}>{cs.challenge}</p>
                  </div>
                  <div className={styles.caseSection}>
                    <div className={styles.caseSectionTitle}>Solution</div>
                    <p className={styles.caseSectionText}>{cs.solution}</p>
                  </div>
                  <div className={styles.caseResult} style={{ background: cs.badge }}>
                    <cs.resultIcon size={16} style={{ color: cs.color, flexShrink: 0 }} />
                    <span style={{ color: cs.badgeText }}>{cs.result}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h2 className={styles.ctaTitle}>Have a similar challenge?</h2>
              <p className={styles.ctaSub}>
                Tell us about your machining problem and we'll design a tooling solution for it. Free application analysis included.
              </p>
            </div>
            <Link to="/contact" className={styles.ctaBtn}>
              Describe your challenge <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
