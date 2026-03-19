'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

const checkoutSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code must be at least 5 characters'),
  country: z.string().min(1, 'Country is required'),
  paymentMethod: z.enum(['credit_card', 'paypal', 'cash_on_delivery']),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'credit_card',
    },
  });
  const { clearCart } = useCart();
  const router = useRouter();
  const onSubmit = async (data: CheckoutFormData) => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      clearCart();
      router.push('/dashboard?order=success');
    } else {
      alert('Checkout failed');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Street</label>
            <input
              type="text"
              {...register('street')}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              {...register('city')}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              type="text"
              {...register('state')}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ZIP Code</label>
            <input
              type="text"
              {...register('zipCode')}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              {...register('country')}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="credit_card"
              {...register('paymentMethod')}
              className="mr-2"
            />
            Credit Card
          </label>
          <label className="flex items-center">
            <input type="radio" value="paypal" {...register('paymentMethod')} className="mr-2" />
            PayPal
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="cash_on_delivery"
              {...register('paymentMethod')}
              className="mr-2"
            />
            Cash on Delivery
          </label>
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Placing Order...' : 'Place Order'}
      </button>
    </form>
  );
}