import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import ProductListing from "./ProductListing";
import ProductDetails from "./ProductDetails";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";

function App() {
  

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ProductListing" element={<ProductListing />} />
        <Route path="/ProductDetails/:id" element={<ProductDetails />} />
        <Route path="/EditProduct/:id" element={<EditProduct />} />
        <Route path="/AddProduct" element={<AddProduct />} />
      </Routes> 
    </>
  )
}

export default App
