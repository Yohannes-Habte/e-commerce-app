import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import MessageBox from '../../components/message/MessageBox';
import { NavLink, useNavigate } from 'react-router-dom';
import './Cart.scss';
import axios from 'axios';
import { ACTIONS, CART_ACTION, Store } from '../../components/storeProvider/StoreProvider';

const Cart = () => {
  const navigate = useNavigate();
  const { state, dispatch: createContextDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  // Function that update shopping cart
  const updateCart = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry, product is out of stock!');
      return;
    }
    createContextDispatch({
      type: ACTIONS.CART_ADD_ITEM,
      payload: { ...item, quantity },
    });
  };

  // Function that remove from cart
  const removeItemFromCart = (item) => {
    createContextDispatch({type: ACTIONS.CART_REMOVE_ITEM,  payload: item})
  }

  // checkout function handler
  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping")
  }

  return (
    <main>
      <Helmet>
        <title> Shopping Cart </title>
      </Helmet>
      <section>
        <h1> Shopping Cart </h1>
        {cartItems.length === 0 ? (
          <MessageBox> Cart is empty!</MessageBox>
        ) : (
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item>
                <Row className="aline-items-center">
                  <Col md={4}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded img-thumbnail"
                    />
                    <NavLink to={`/product/${item.slug}`}>{item.name}</NavLink>
                  </Col>

                  <Col md={3}>
                    <Button
                      onClick={() => updateCart(item, item.quantity - 1)}
                      variant="light"
                      disabled={item.quantity === 1}
                    >
                      <i className="fas fa-minus-circle"></i>
                    </Button>

                    <span> {item.quantity} </span>

                    <Button
                      onClick={() => updateCart(item, item.quantity + 1)}
                      variant="light"
                      disabled={item.quantity === 0}
                    >
                      <i className="fas fa-plus-circle"></i>
                    </Button>
                  </Col>

                  <Col md={3}>${item.price}</Col>

                  <Col md={2}>
                    <Button onClick={() => removeItemFromCart(item)} variant='light'>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <Col md={4}>
                    <Card>
                      <Card.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <h2>
                              Subtotal (
                              {cartItems.reduce(
                                (acc, curr) => acc + curr.quantity,
                                0
                              )}
                              items) = $
                              {cartItems.reduce(
                                (acc, curr) => acc + curr.price * curr.quantity,
                                0
                              )}
                            </h2>
                          </ListGroup.Item>

                          <ListGroup.Item>
                            <Button
                              type="button"
                              variant="primary"
                              onClick={checkoutHandler}
                              disabled={cartItems.length === 0}
                            >
                              Proceed to Checkout
                            </Button>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
      </section>
    </main>
  );
};

export default Cart;
