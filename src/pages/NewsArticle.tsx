import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, FileText, Newspaper } from 'lucide-react';
import { getNewsById, publishedNews } from '../data/news';
import { formatNewsDate, newsImageUrl } from '../lib/news';
import Gallery from '../components/Gallery';
import NewsShare from '../components/NewsShare';
import NotFound from './NotFound';
import productStyles from './Products.module.css';
import homeStyles from './Home.module.css';
import styles from './News.module.css';

export default function NewsArticle() {
  const { id = '' } = useParams();
  const item = getNewsById(id);
  if (!item) return <NotFound />;
  const index = publishedNews.indexOf(item);
  const newer = publishedNews[index - 1];
  const older = publishedNews[index + 1];
  const hero = newsImageUrl(item.image?.src);
  const gallery = (item.gallery || []).flatMap(img => { const src = newsImageUrl(img.src); return src ? [{ src, alt: img.alt }] : []; });

  return (
    <div className={productStyles.main}>
      <section className={productStyles.pageHero}>
        <div className={`container ${styles.article}`}>
          <Link to="/news" className={styles.back}><ArrowLeft size={16} aria-hidden="true" /> Back to News</Link>
          <div className={styles.articleMeta}><span>{item.category}</span><time dateTime={item.date}>{formatNewsDate(item.date)}</time></div>
          <h1 className={styles.articleTitle}>{item.title}</h1>
        </div>
      </section>
      <section className={styles.section}>
        <article className={`container ${styles.article}`}>
          {hero && item.image && (
            <figure className={styles.figure}>
              <Gallery images={[{ src: hero, alt: item.image.alt }]} icon={Newspaper} width={1600} height={900} aspect="16 / 9" eager />
              {item.image.credit && <figcaption className={styles.caption}>{item.image.credit}</figcaption>}
            </figure>
          )}
          <div className={styles.content}>
            {item.body.map((block, i) => block.type === 'p' ? <p key={i}>{block.text}</p>
              : block.type === 'h' ? <h2 key={i}>{block.text}</h2>
              : <ul key={i}>{block.items.map(li => <li key={li}>{li}</li>)}</ul>)}
          </div>
          {item.linkedinUrl && <p><a className={styles.back} href={item.linkedinUrl} target="_blank" rel="noopener noreferrer">View the original post on LinkedIn (opens in a new tab)</a></p>}
          {gallery.length > 0 && (
            <div className={styles.gallery}>
              <h2 className={styles.galleryTitle}>Gallery</h2>
              <Gallery images={gallery} icon={Newspaper} width={1600} height={900} aspect="16 / 9" />
              {item.gallery?.[0]?.credit && <p className={styles.caption}>{item.gallery[0].credit}</p>}
            </div>
          )}
          <NewsShare id={item.id} title={item.title} />
          <nav className={styles.pager} aria-label="More articles">
            {newer && <Link to={`/news/${newer.id}`}><small>Previous article</small>{newer.title}</Link>}
            {older && <Link to={`/news/${older.id}`} className={styles.next}><small>Next article</small>{older.title}</Link>}
          </nav>
        </article>
      </section>
      <section className={homeStyles.ctaSection} data-focus-surface="dark">
        <div className="container">
          <div className={homeStyles.ctaInner}>
            <div className={homeStyles.ctaText}>
              <h2 className={homeStyles.ctaTitle}>Ready to optimise your machining process?</h2>
              <p className={homeStyles.ctaSub}>Share your application details and we'll engineer the right tool for your requirements.</p>
            </div>
            <div className={homeStyles.ctaBtns}>
              <Link to="/contact" className={homeStyles.ctaBtnPrimary}><FileText size={16} /> Request a Quote</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
