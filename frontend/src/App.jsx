import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/homePage/Home";
import Contact from "./views/contactPage/Contact";
import Navbar from "./components/navbar/Navbar";
import About from "./views/aboutPage/About";
import Footer from "./components/footer/Footer";
import SingleProduct from "./views/productPage/SingleProduct";
import "./App.scss";
import Cart from "./views/cartPage/Cart";
import Signin from "./views/signinPage/Signin";


const App = () => {
  return (
    <div className="site-container">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:slug" element={<SingleProduct />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
