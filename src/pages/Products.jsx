import ProductGrid from '../components/ProductGrid';
import Filters from '../components/Filters';
import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';

export default function Products() {
  const [filters, setFilters] = useState({
    category: '',
    sort: 'asc',
  });
  const { data, error, isLoading } = useProducts(filters);

  if (error) return <div>Error when fetching the products</div>;

  return (
    <main className='flex-grow flex bg-gray-100'>
      <Filters filters={filters} onFilter={setFilters} />
      <ProductGrid products={data} loading={isLoading} />
    </main>
  );
}
