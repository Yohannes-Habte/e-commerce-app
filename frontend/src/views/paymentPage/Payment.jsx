import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { ACTIONS, Store } from '../../components/storeProvider/StoreProvider';

const Payment = () => {
  const navigate = useNavigate();
  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );

  // useEffect
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  // Submit payment
  const submitPayment = async (e) => {
    e.preventDefault();
    contextDispatch({ type: ACTIONS.PAYMENT_METHOD, payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };
  return (
    <main>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div>
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1>Payment Method</h1>

        <Form onSubmit={submitPayment}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="payPal"
              label="payPal"
              value="payPal"
              checked={paymentMethodName === 'payPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </div>

          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </main>
  );
};

export default Payment;
