import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// How to create checkout steps components
const CheckoutSteps = (props) => {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>Sign in</Col>
      <Col className={props.step1 ? 'active' : ''}>Shipping</Col>
      <Col className={props.step1 ? 'active' : ''}>Payment</Col>
      <Col className={props.step1 ? 'active' : ''}>Place Order</Col>
    </Row>
  );
};

export default CheckoutSteps;
