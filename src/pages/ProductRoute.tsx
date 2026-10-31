import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from './productsData';
import CategoryPage from './CategoryPage';
import ProductDetail from './ProductDetail';
import NotFound from './NotFound';

export default function ProductRoute() {
  const { categoryId } = useParams();
  const product = products.find(tool => tool.slug === categoryId);
  if (product) return <ProductDetail product={product} />;
  if (categories.some(cat => cat.id === categoryId)) return <CategoryPage />;
  return <NotFound />;
}