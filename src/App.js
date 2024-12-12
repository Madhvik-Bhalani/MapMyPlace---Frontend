import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Home/Home";

import { ToastContainer } from 'react-toastify';
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import ChangePass from './Components/ChangePass/ChangePass';
import EditProfile from './Components/EditProfile/EditProfile';
import FilterPanel from "./Components/Map/FilterPanel";
import HomeAddress from "./Components/Map/HomeAddress";
import ProtectedRoute from './ProtectedRoute';



function App() {


  return (
    <>
      <BrowserRouter>

        <Navbar />
        <ChangePass />
        <EditProfile />
        <HomeAddress />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reset-password" element={<ProtectedRoute element={<ResetPassword />} />} />
          <Route path="/map" element={<ProtectedRoute element={<FilterPanel />} />} />
        </Routes>

        <ToastContainer limit={3} />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
