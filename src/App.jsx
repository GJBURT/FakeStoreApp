import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from "./HomePage";
import NavBar from "./NavBar";

function App() {
  

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes> 
    </>
  )
}

export default App
