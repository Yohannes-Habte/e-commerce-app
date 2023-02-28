import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import './Navbar.scss';
import { ACTIONS, Store } from '../storeProvider/StoreProvider';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';

const Navbar = () => {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  // Sign out Function
  const signoutHandler = () => {
    contextDispatch({ type: ACTIONS.USER_SIGNOUT });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  return (
    <nav className="navbar-container">
      <h3 className="logo">
        <NavLink to={'/'}> LisaBoutique </NavLink>
      </h3>

      <ul className="list-items">
        <li className="list-item">
          <NavLink to={'/'}> Home </NavLink>
        </li>

        <li className="list-item">
          <NavLink to={'/about'}> About Us </NavLink>
        </li>

        <li className="list-item">
          <NavLink to={'/contact'}> Contact </NavLink>
        </li>
      </ul>

      <ul className="cart-items">
        <li className="cart-item">
          <NavLink to="/cart">
            Cart
            {cart.cartItems.length > 0 && (
              <Badge pill bg="danger">
                {cart.cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
              </Badge>
            )}
          </NavLink>
        </li>
        {/* To show the Signed In user in the frontend */}
        {userInfo ? (
          <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
            <LinkContainer to="/profile">
              <NavDropdown.Item>User Profile</NavDropdown.Item>
            </LinkContainer>

            <LinkContainer to="/orderhistory">
              <NavDropdown.Item> Order History </NavDropdown.Item>
            </LinkContainer>

            <NavDropdown.Divider />

            <NavLink
              onClick={signoutHandler}
              className="dropdown-item"
              to="#signout"
            >
              Sign Out
            </NavLink>
          </NavDropdown>
        ) : (
          <li cart-item>
            <NavLink to={'/signin'}> Sign In </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
