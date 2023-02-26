import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import './Signin.scss';
import { Helmet } from 'react-helmet-async';
import Axios from 'axios';
import { ACTIONS, Store } from '../../components/storeProvider/StoreProvider';

const Signin = () => {
  const navigate = useNavigate();
  // to get the value of "redirect" in the NavLink "Create your Account" you have to use useLocation
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function that updates login data
  const updateData = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  // Store the user info in the localStorage
  const { state, dispatch: contextDispatch } = useContext(Store);

  // Function to submit user signin
  const submitHandler = async (e) => {
    e.preventDefaul();
    const loginUser = {
      email,
      password,
    };

    try {
      const { data } = await Axios.post('/api/users/signin', loginUser);
      contextDispatch({ type: ACTIONS.USER_SIGNIN, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (error) {
      alert("Invalid password or email");
    }
  };

  return (
    <main className="login">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <section className="login-container">
        <h1 className="login-title"> Login </h1>
        <fieldset className="login-fieldset">
          <legend className="login-icon">
            <FaUserAlt className="icon" />
          </legend>

          <form onSubmit={submitHandler} className="login-form">
            <div className="login-email">
              <label htmlFor="email"> Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={updateData}
                placeholder="Enter Email"
              />
            </div>
            <div className="login-password">
              <label htmlFor="password"> Password: </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={updateData}
                value={password}
                placeholder="Enter Password"
              />
            </div>
            <div className="keep-login-and-forget-password">
              <div className="checkbox-keep-signed-in">
                <input type="checkbox" name="keepMe" id="keepMe" />
                <label htmlFor="keepMe">Keep me signed in</label>
              </div>
              <p className="forget-password">
                <a href="#"> Forget your password? </a>
              </p>
            </div>
            <button className="login-btn">Sign In</button>
          </form>
          <div className="if-no-account">
            <p>Don't have an account?</p>
            <NavLink to={`/signup?redirect=${redirect}`}>
              Create your Account
            </NavLink>
          </div>
        </fieldset>
      </section>
    </main>
  );
};

export default Signin;
