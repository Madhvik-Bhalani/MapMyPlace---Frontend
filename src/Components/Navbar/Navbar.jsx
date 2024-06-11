import React, { useContext } from 'react';
import logo from '../../Assets/logo.png';
import './Navbar.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import refcontext from '../../Context/Refcontext';

function Navbar() {
    const refcon = useContext(refcontext);
    const { refsignin, refsignup } = refcon;
    const navigate = useNavigate();
    let location = useLocation();

    const signinHandler = (e) => {
        e.preventDefault();
        refsignin.current.click();
    }

    const signupHandler = (e) => {
        e.preventDefault();
        refsignup.current.click();
    }

    const logoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.setItem("count", 0);
        navigate("/");
    }

    const changepassHandler = () => {
        // Logic to change password
    }

    return (
        <>
            <nav className="navbar navbox navbar-expand-lg bg-light bg-body-tertiary" style={{ height: "80px" }}>
                <div className="container-fluid p-0">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img src={logo} className="logoimg" alt="MapMyPlace.." />
                        <span className="nav-link active web-app-name mt-2">
                            <h2><span style={{ color: "#540640", textShadow: "0.7px 0.7px 0.5px #e99f27" }}>MapMyPlace</span></h2>
                        </span>
                    </Link>

                    <button className="navbar-toggler" type="button"  data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {!localStorage.getItem("token") ? (
                                <>
                                    <li className="nav-item">
                                        <button className="btn signin text-capitalize mx-1" onClick={signinHandler}>
                                            <i className="fa-solid fa-sign-in-alt sign-icons"></i> <span className='signin-text'> sign in</span>
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn signup text-capitalize mx-1" onClick={signupHandler}>
                                            <i className="fa-solid fa-user-plus sign-icons"></i> <span>sign up</span>
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link links" to="/" style={{ color: location.pathname === "/" ? "#e99f27" : "", textShadow: location.pathname === "/" ? ".37px .37px .37px #540660" : "" }}>
                                            <i className="fa-solid fa-house-chimney nicons" style={{ color: location.pathname === "/" ? "#e99f27" : "", textShadow: location.pathname === "/" ? ".35px .35px .35px #540660" : "" }}></i> Home
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link links" to="/contact" style={{ color: location.pathname === "/contact" ? "#e99f27" : "", textShadow: location.pathname === "/contact" ? ".37px .37px .37px #540660" : "" }}>
                                            <i className="fa-solid fa-address-card nicons" style={{ color: location.pathname === "/contact" ? "#e99f27" : "", textShadow: location.pathname === "/contact" ? ".35px .35px .35px #540660" : "" }}></i> Contact Us
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link links dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fa-solid fa-user nicons"></i> {localStorage.getItem("name")}
                                        </Link>
                                        <ul className="dropdown-menu" style={{ width: "257px" }}>
                                            <li onClick={changepassHandler}>
                                                <Link className="dropdown-item p-1" to="#" style={{ fontSize: "23px" }}>
                                                    <i className="fa-solid fa-unlock" style={{ fontSize: "23px" }}></i> Change Password
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item p-1" to="/yourorder" style={{ fontSize: "23px" }}>
                                                    <i className="fa-solid fa-basket-shopping" style={{ fontSize: "23px" }}></i> Your Order
                                                </Link>
                                            </li>
                                            <li className='logout' onClick={logoutHandler}>
                                                <Link className="dropdown-item p-1" to="#" style={{ fontSize: "23px" }}>
                                                    <i className="fa-solid fa-right-from-bracket" style={{ fontSize: "23px" }}></i> Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <span className="d-flex justify-content-center align-items-center position-absolute translate-middle border border-light text-light text-center" style={{ top: "30px", right: "64px", borderRadius: "50%", height: "19px", width: "19px", zIndex: "1", backgroundColor: "#e99f27" }}>
                                        <span className='text-light' style={{ fontSize: "12px" }}>{localStorage.getItem("count")}</span>
                                    </span>
                                    <li className='cart nav-item'>
                                        <Link className="nav-link" to="/cart">
                                            <i className="fa-solid fa-cart-arrow-down" style={{ transition: "none", transitionProperty: "none", color: location.pathname === "/cart" ? "#e99f27" : "", textShadow: location.pathname === "/cart" ? ".37px .37px .37px #540660" : "" }}></i>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
