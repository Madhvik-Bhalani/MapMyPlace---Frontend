import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Home/Home";

import { ToastContainer } from 'react-toastify';
import ResetPassword from "./Components/ResetPassword/ResetPassword";



function App() {
  return (
    <>
      <BrowserRouter>
       
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
          
          <ToastContainer limit={3}/>
       
      </BrowserRouter>
    </>
  );
}

export default App;
