import { useParams } from 'react-router';
import { useProduct } from '../hooks/useProduct';
import { use, useState } from 'react';
import { CartContext } from '../context/CartContext';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px)
  }
  to {
    opacity: 1;
    transform: translateY(0)
  }
`;

const NotificationWrapper = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
  position: absolute;
  top: 1rem;
  right: 5rem;
  background-color: #10b981;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
`;

export default function Product() {
  const { id } = useParams();
  const { data, isLoading, error } = useProduct(id);
  const { addItem } = use(CartContext);
  const [showNotification, setShowNotification] = useState(false);

  if (isLoading) return <div>Loading product details...</div>;
  if (error) return <div>Error while fetching the product</div>;

  const handleAddToCart = () => {
    addItem(data);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div className='p-8 max-w-4xl mx-auto'>
      {showNotification && (
        <NotificationWrapper>Item added to the cart!</NotificationWrapper>
      )}
      <div className='grid md:grid-cols-2 gap-8 min-h-[70vh]'>
        <div className='flex flex-col justify-center'>
          <img
            src={data.image}
            alt={data.title}
            className='w-full h-96 object-contain mb-8'
          />
        </div>
        <div className='flex flex-col justify-center'>
          <h1 className='text-2xl font-bold mb-4'>{data.title}</h1>
          <div className='mb-4'>
            <span className='bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded'>
              {data.category}
            </span>
          </div>
          <p className='text-gray-600 mb-6 text-lg'>{data.description}</p>
          <div className='flex items-center mb-6'>
            <div className='flex text-yellow-400'>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(data.rating.rate)
                      ? 'fill-current'
                      : 'fill-none'
                  }`}
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                </svg>
              ))}
            </div>
            <span className='ml-2 text-gray-600'>
              ({data.rating.count} reviews)
            </span>
          </div>
          <div>
            <p className='text-3xl font-bold text-blue-600 mb-8'>
              ${data.price}
            </p>
            <button
              onClick={handleAddToCart}
              className='w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg'
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
