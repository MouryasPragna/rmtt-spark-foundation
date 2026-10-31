import { Link } from 'react-router-dom';
import { Plus, Check, ArrowRight, Settings } from 'lucide-react';
import type { Product } from '../data/products';
import { useQuote } from '../context/QuoteContext';
import PhotoPlaceholder from './PhotoPlaceholder';
import ZoomImage from './ZoomImage';
import styles from '../pages/Products.module.css';

export default function ProductCard({ product, headingLevel = 3 }: { product: Product; headingLevel?: 2 | 3 | 4 }) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4';
  const { selected, add } = useQuote();
  const added = selected.some(tool => tool.slug === product.slug);
  return <article className={styles.productCard}>
    <div className={styles.productImgWrap}>
      {product.image ? <ZoomImage src={product.image} alt={product.name} /> : <PhotoPlaceholder icon={Settings} />}
    </div>
    <div className={styles.productBody}>
      <Heading className={styles.productName}><Link to={`/products/${product.slug}`}>{product.name}</Link></Heading>
      <p className={styles.productDesc}>{product.description}</p>
      <div className={styles.cardActions}>
        <Link to={`/products/${product.slug}`} className={styles.detailLink}>Tool details <ArrowRight size={14} /></Link>
        <button type="button" className={styles.quoteButton} onClick={() => add(product.slug)} disabled={added} aria-label={`${added ? 'Added to quote' : 'Add to quote'}: ${product.name}`}>
          {added ? <Check size={14} /> : <Plus size={14} />}{added ? 'Added' : 'Add to quote'}
        </button>
      </div>
    </div>
  </article>;
}