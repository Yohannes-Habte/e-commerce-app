import React, { createContext, useReducer } from 'react';

export const Store = createContext();

export const ACTIONS = {
  CART_ADD_ITEM: 'ADD_ITEM_TO_CART',
  CART_REMOVE_ITEM: 'REMOVE_ITEM_FROM_CART',
  USER_SIGNIN: 'USER_SIGNIN',
  USER_SIGNOUT: 'USER_SIGNOUT',
  SHIPPING_ADDRESS: 'SHIPPING_ADDRESS',
  PAYMENT_METHOD: 'PAYMENT_METHOD',
  CLEAR_CART: "CLEAR_CART"
};

const initialState = {
  // User info in the local storage
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  // Cart info in the local storage
  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
      paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CART_ADD_ITEM:
      // to add only one product at a time
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      // Save the item added to the cart in the "localStorage"
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    /*
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [...state.cart.cartItems, action.payload],
        },
      };
      */
    case ACTIONS.CART_REMOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      // Save the item added to the cart in the "localStorage"
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
 
    case ACTIONS.CART_CLEAR: 
      return {...state, cart: {...state.cart, cartItems: []}}

    case ACTIONS.USER_SIGNIN:
      return { ...state, userInfo: action.payload };

    case ACTIONS.USER_SIGNOUT:
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
      };

    case ACTIONS.SHIPPING_ADDRESS:
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };

    case ACTIONS.PAYMENT_METHOD:
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };

    default:
      return state;
  }
};

const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const values = { state, dispatch };

  return <Store.Provider value={values}> {props.children} </Store.Provider>;
};

export default StoreProvider;
