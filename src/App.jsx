import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import ProductListing from "./ProductListing";
import ProductDetails from "./ProductDetails";

function App() {
  

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ProductListing" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes> 
    </>
  )
}

export default App
