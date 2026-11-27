import { Navigate, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from './productsData';
import CategoryPage from './CategoryPage';
import ProductDetail from './ProductDetail';
import NotFound from './NotFound';

// Brazed carbide product pages retired when the Brazed page became a single page; old links land there.
const RETIRED_BRAZED = new Set([
  'brazed-carbide-shell-milling-cutter', 't-slot-milling-cutter', 'brazed-carbide-reamer',
  'lugged-carbide-drill', 'brazed-carbide-drill', 'brazed-carbide-reamer-with-coolant',
]);

export default function ProductRoute() {
  const { categoryId } = useParams();
  if (categoryId && RETIRED_BRAZED.has(categoryId)) return <Navigate to="/products/brazed" replace />;
  const product = products.find(tool => tool.slug === categoryId);
  if (product) return <ProductDetail product={product} />;
  if (categories.some(cat => cat.id === categoryId)) return <CategoryPage />;
  return <NotFound />;
}