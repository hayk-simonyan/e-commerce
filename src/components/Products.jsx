import ProductGrid from './ProductGrid';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Filters from './Filters';
import { useState } from 'react';

const fetchProducts = async ({ queryKey }) => {
  const [key, filters] = queryKey;
  let url = 'https://fakestoreapi.com/products';
  if (filters.category) {
    url += `/category/${filters.category}`;
  }
  if (filters.sort) {
    url += `?sort=${filters.sort}`;
  }
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default function Products() {
  const [filters, setFilters] = useState({
    category: '',
    sort: 'asc',
  });
  const { data, error, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error when fetching the products</div>;

  return (
    <main className='flex-grow flex bg-gray-100'>
      <Filters filters={filters} onFilter={setFilters} />
      <ProductGrid products={data} />
    </main>
  );
}
