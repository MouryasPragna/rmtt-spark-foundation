import { Link } from 'react-router-dom';
import { ArrowRight, Newspaper } from 'lucide-react';
import type { NewsItem } from '../data/news';
import { formatNewsDate, newsImageUrl } from '../lib/news';
import PhotoPlaceholder from './PhotoPlaceholder';
import ZoomImage from './ZoomImage';
import styles from './NewsCard.module.css';

export default function NewsCard({ item, headingLevel = 2, featured = false }: { item: NewsItem; headingLevel?: 2 | 3; featured?: boolean }) {
  const src = newsImageUrl(item.image?.src);
  const Heading = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <div className={styles.media}>
        {src ? <ZoomImage src={src} alt={item.image?.alt || item.title} width={1600} height={900} /> : <PhotoPlaceholder icon={Newspaper} />}
      </div>
      <Link to={`/news/${item.id}`} className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>{item.category}</span>
          <time dateTime={item.date}>{formatNewsDate(item.date)}</time>
        </div>
        <Heading className={styles.title}>{item.title}</Heading>
        <p className={styles.summary}>{item.summary}</p>
        <span className={styles.more} aria-hidden="true">Read more <ArrowRight size={14} /></span>
      </Link>
    </article>
  );
}
