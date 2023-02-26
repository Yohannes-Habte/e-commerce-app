import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useReducer } from 'react';
import Product from '../../components/product/Product';
import './Home.scss';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../../components/loading/LoadingBox';
import MessageBox from '../../components/message/MessageBox';

// Create an object
const ACTION = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL',
};

/*  
  Create a reducer function that holds two parametes:
    1. "state" = the current state
    2. "action" = the action that changes the state and create a new state

  Inside the reducer, there is switch function that specifies the type of action
    1. The "type of action" is written next to the case
    2. After the case is written, the return has to be written that returns
      1. All the list the current state values
      2. And the data in the action.payload
 */

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.FETCH_REQUEST:
      return { ...state, loading: true };
    case ACTION.FETCH_SUCCESS:
      // keep the values in the state
      // only update "products: action.payload". "action.payload" keeps all the data from the backend
      // loading is true, because it is already displayed in the frontend
      return { ...state, products: action.payload, loading: false };
    case ACTION.FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Home = () => {
  // State Variables
  /* const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data) 
    }
    fetchData();
  }, []);
  */

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    products: [],
  });

  // useEffect to fetch Products and display in the frontend
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: ACTION.FETCH_REQUEST });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: ACTION.FETCH_SUCCESS, payload: result.data });
      } catch (err) {
        dispatch({ type: ACTION.FETCH_FAIL, payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <main className='home-page'>
      <Helmet>
        <title>LisaBoutique</title>
      </Helmet>
      <section className='home-page-container'>
        <h1 className='home-page-title'> Featured Products </h1>

        <div className="products">
          {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant={"danger"} > {error} </MessageBox>
          ) : (
            products.map((product) => {
              return <Product product={product} key={product.slug} />;
            })
          )}
        </div>
      </section>

      {/* <div className="products">
      {
        products.map(product => {
          return (
            <section key={product.slug} className="product">
              <img src={product.image} alt={product.name} />
            </section>
          )
        })
      }
      </div> */}
    </main>
  );
};

export default Home;
