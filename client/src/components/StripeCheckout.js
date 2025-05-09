import React,{ useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY); // Replace with your real test key

const CheckoutForm = ({ cart, setCart, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const enrichedCart = cart.map(item => ({
        ...item,
        quantity: item.quantity || 1, // default to 1 if quantity not defined
      }));
      
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/payment/create-payment-intent`,
        { cart: enrichedCart }
      );
          console.log('Received clientSecret:', data.clientSecret);
          const clientSecret = data.clientSecret;
          

      const cardElement = elements.getElement(CardElement);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
      } else {
        if (paymentResult.paymentIntent.status === 'succeeded') {
          setSuccess('Payment successful!');
          localStorage.removeItem('cart');
          setCart([]);
          toast.success("Payment Completed Successfully ");
          navigate('/dashboard/user/orders');
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-primary mt-3"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {error && <div className="text-danger mt-2">{error}</div>}
      {success && <div className="text-success mt-2">{success}</div>}
    </form>
  );
};

const StripeCheckout = ({ cart, setCart, navigate }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm cart={cart} setCart={setCart} navigate={navigate} />
  </Elements>
);

export default StripeCheckout;
