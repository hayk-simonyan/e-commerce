import { use } from 'react';
import { CartContext } from '../context/CartContext';
import CartSummary from '../components/CartSummary';
import CheckoutForm from '../components/CheckoutForm';
import { useCheckout } from '../hooks/useCheckout';
import { useNavigate } from 'react-router';

export default function Checkout() {
  const { items, cartTotal, clearCart } = use(CartContext);
  const { mutateAsync: submitCheckout } = useCheckout();
  const navigate = useNavigate();

  if (items.length === 0)
    return (
      <div className='p-8 max-w-4xl mx-auto'>
        <h1 className='text-2xl font-bold mb-6'>Your Cart is Empty</h1>
        <div className='bg-white p-6 rounded shadow'>
          <p className='text-gray-600'>
            Add some items to your cart before checking out.
          </p>
        </div>
      </div>
    );

  async function handleCheckout(formData) {
    try {
      const orderData = {
        userId: 1,
        date: new Date().toISOString(),
        products: items,
        customer: {
          name: formData.get('name'),
          email: formData.get('email'),
          address: formData.get('address'),
          city: formData.get('city'),
          zipCode: formData.get('zipCode'),
        },
      };
      await submitCheckout(orderData);
      clearCart();
      navigate('/checkout/success');
    } catch (error) {
      console.log(`Checkout failed: ${error}`);
      alert('Failed to process the checkout');
    }
  }

  return (
    <div className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>Checkout</h1>
      <div className='grid md:grid-cols-2 gap-8'>
        <CheckoutForm onSubmit={handleCheckout} />
        <CartSummary items={items} cartTotal={cartTotal} />
      </div>
    </div>
  );
}
