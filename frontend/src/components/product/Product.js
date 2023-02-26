import axios from 'axios';
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Rating from '../rating/Rating';
import { ACTIONS, Store } from '../storeProvider/StoreProvider';

const Product = (props) => {
  const navigate = useNavigate();
  const { state, dispatch: createContextDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  // Function that update shopping cart
  const addToCart = async (item) => {
    const foundItem = cartItems.find((item) => item._id === product._id);
    const quantity = foundItem ? foundItem.quantity + 1 : 1;
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
  const { product } = props;
  return (
    <article className="product">
      <figure className="product-image">
        <NavLink to={`product/${product.slug}`}>
          <img src={product.image} alt="Product images" />
        </NavLink>
      </figure>
      <div className="product-name-price-rating">
        <h5>
          <NavLink to={`product/${product.name}`}>{product.name}</NavLink>
        </h5>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <p>
          <strong> $ {product.price} </strong>
        </p>
      </div>
      {product.countInStock === 0 ? (
        <button disabled > Out of Stock </button>
      ) : (
        <button onClick={() => addToCart(product)} className="add-to-cart-btn">
          Add to Cart
        </button>
      )}
    </article>
  );
};

export default Product;
