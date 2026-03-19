import ProductDetail from '@/components/ProductDetail';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`, {
    cache: 'no-store',
  });
  if (!res.ok) notFound();
  const product = await res.json();
  return <ProductDetail product={product} />;
}