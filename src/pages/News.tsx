import { useMemo, useState } from 'react';
import { Rss, Search } from 'lucide-react';
import { rssUrl } from '../lib/newsSharing';
import NewsCard from '../components/NewsCard';
import { publishedNews } from '../data/news';
import productStyles from './Products.module.css';
import styles from './News.module.css';

export default function News() {
  const categories = [...new Set(publishedNews.map(item => item.category))];
  const [active, setActive] = useState<string>('All');
  const [query, setQuery] = useState('');
  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publishedNews.filter(item =>
      (active === 'All' || item.category === active) &&
      (!q || `${item.title} ${item.summary}`.toLowerCase().includes(q))
    );
  }, [active, query]);
  const [featured, ...rest] = items;
  const countFor = (cat: string) =>
    cat === 'All' ? publishedNews.length : publishedNews.filter(item => item.category === cat).length;

  return (
    <div className={productStyles.main}>
      <section className={productStyles.pageHero}>
        <div className={`container ${styles.newsHeader}`}><h1 className={productStyles.pageTitle}>News &amp; Articles</h1><a href={rssUrl} className={styles.allLink} target="_blank" rel="noopener noreferrer" aria-label="RSS feed (opens in a new tab)"><Rss size={20} aria-hidden="true" /> RSS feed</a></div>
      </section>
      <section className={styles.section}>
        <div className="container">
          {publishedNews.length > 0 ? <>
            <div className={styles.toolbar}>
              <div className={`${productStyles.chipRow} ${styles.chips}`} role="group" aria-label="Filter by category">
                {['All', ...categories].map(cat => (
                  <button key={cat} type="button" className={productStyles.filterChip} aria-pressed={active === cat} onClick={() => setActive(cat)}>
                    {cat} <span className={styles.chipCount}>{countFor(cat)}</span>
                  </button>
                ))}
              </div>
              <div className={styles.search}>
                <Search size={16} aria-hidden="true" className={styles.searchIcon} />
                <input
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search articles"
                  aria-label="Search articles"
                  className={styles.searchInput}
                />
              </div>
            </div>
            <p className={styles.resultCount} role="status">
              {items.length === publishedNews.length
                ? `${items.length} articles`
                : `${items.length} of ${publishedNews.length} articles`}
            </p>
            {items.length > 0 ? (
              <div className={styles.grid}>
                {featured && <NewsCard item={featured} featured />}
                {rest.map(item => <NewsCard key={item.id} item={item} />)}
              </div>
            ) : (
              <p className={styles.empty}>No articles match your search.</p>
            )}
          </> : <p className={styles.empty}>News will be published shortly.</p>}
        </div>
      </section>
    </div>
  );
}
