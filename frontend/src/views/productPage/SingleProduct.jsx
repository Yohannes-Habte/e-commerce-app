import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import getError from '../../components/errorHandler/GetError';
import LoadingBox from '../../components/loading/LoadingBox';
import MessageBox from '../../components/message/MessageBox';
import Rating from '../../components/rating/Rating';
import { ACTIONS, Store } from '../../components/storeProvider/StoreProvider';
import './SingleProduct.scss';

// Create an object
const ACTION = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.FETCH_REQUEST:
      return { ...state, loading: true };
    case ACTION.FETCH_SUCCESS:
      return { ...state, product: action.payload, loading: false };
    case ACTION.FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const SingleProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    product: [],
  });

  // useEffect to fetch Products and display in the frontend
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: ACTION.FETCH_REQUEST });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: ACTION.FETCH_SUCCESS, payload: result.data });
      } catch (err) {
        //dispatch({ type: ACTION.FETCH_FAIL, payload: err.message });
        dispatch({ type: ACTION.FETCH_FAIL, payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  // Add to cart Function
  const { state, dispatch: createContextDispatch } = useContext(Store);
  const { cart } = state;

  const addToCart = async () => {
    const foundItem = cart.cartItems.find((item) => item._id === product._id);
    const quantity = foundItem ? foundItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry, product is out of stock!');
      return;
    }
    createContextDispatch({
      type:ACTIONS.CART_ADD_ITEM,
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };

  return (
    <main className="product-page">
      <section className="product-page-container">
        <h1 className="product-title"> {product.name} </h1>

        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger"> {error} </MessageBox>
        ) : (
          <article className="product-info">
            <figure className="product-image">
              <img src={product.image} alt={product.name} />
            </figure>

            <div>
              <Helmet>
                <title> {product.name} </title>
              </Helmet>

              <Rating rating={product.rating} numReviews={product.numReviews} />
              <div>
                Price: <strong> $ {product.price} </strong>
              </div>
              <div> Description: $ {product.description} </div>
            </div>

            <div className="product-details">
              <div>
                Price: <strong> {product.price} </strong>
              </div>
              <div>
                Status:
                {product.countInStock > 0 ? (
                  <div> In Stock </div>
                ) : (
                  <div> Unavailable </div>
                )}
              </div>
              {product.countInStock > 0 && (
                <div>
                  <button onClick={addToCart}> Add to Cart </button>
                </div>
              )}
            </div>
          </article>
        )}
      </section>
    </main>
  );
};

export default SingleProduct;
