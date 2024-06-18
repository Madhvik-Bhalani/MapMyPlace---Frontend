import React, { useContext } from 'react';
import logo from '../../Assets/logo.png';
import './Navbar.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import refcontext from '../../Context/Refcontext';
import reloadcontext from '../../Context/Reloadcontext';
import userDatacontext from '../../Context/UserDatacontext.js';
import SweetAlert from '../../Alert/SweetAlert.jsx';
import { deleteAccount } from '../../Services/UserDataServices.jsx'
import Notification from '../../Notification/Notification.jsx';

function Navbar() {
    const refcon = useContext(refcontext);
    const reloadcon = useContext(reloadcontext);
    const usercon = useContext(userDatacontext);

    const alert = new SweetAlert();
    const toastAlert = new Notification();


    const { refsignin, refsignup, refchangepass, refeditprofile } = refcon;

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
        localStorage.clear()
        reloadcon.setreload({})
        navigate("/");

    }

    const changepassHandler = () => {
        refchangepass.current.click()
    }

    const editProfileHandler = () => {
        refeditprofile.current.click()
        usercon.setDataOnEditProfile()


    }


    const deleteHandler = async () => {

        const headers = {
            'authorization': localStorage.getItem("token")
        }
        const param = {
            active: false
        }
        const isDeleted = await deleteAccount(param, headers)

        if (isDeleted?.status) {
            toastAlert.notify(isDeleted?.status, isDeleted?.message);  //pass status and msg to notification
            localStorage.clear()
            reloadcon.setreload({})
            navigate("/");
        } else {
            toastAlert.notify(isDeleted?.status, isDeleted?.message);
        }
    }

    const openCancelPopup = () => {
        alert.confirmBox('Are you sure?', "You won't be able to revert this!", { deleteHandler })
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

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 sidebox">
                            {!localStorage.getItem("token") ? (
                                <>
                                    <li className="nav-item m-0">
                                        <button className="btn signin text-capitalize mx-1" onClick={signinHandler}>
                                            <i className="fa-solid fa-sign-in-alt sign-icons"></i> <span className='signin-text'> sign in</span>
                                        </button>
                                    </li>
                                    <li className="nav-item m-0">
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
                                        <Link className="nav-link links" to="/map" style={{ color: location.pathname === "/map" ? "#e99f27" : "", textShadow: location.pathname === "/explore-map" ? ".37px .37px .37px #540660" : "" }}>
                                            <i className="fa-solid fa-map-location-dot nicons" style={{ color: location.pathname === "/map" ? "#e99f27" : "", textShadow: location.pathname === "/map" ? ".35px .35px .35px #540660" : "" }}></i> Map
                                        </Link>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <Link className="nav-link links dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fa-solid fa-user nicons"></i> {`${localStorage.getItem("fname")} ${localStorage.getItem("lname")}`}
                                        </Link>
                                        <ul className="dropdown-menu" style={{ width: "257px" }}>
                                            <li onClick={changepassHandler}>
                                                <Link className="dropdown-item p-1" to="#" style={{ fontSize: "22.5px" }}>
                                                    <i className="fa-solid fa-unlock" style={{ fontSize: "22.5px" }}></i> Change Password
                                                </Link>
                                            </li>
                                            <li onClick={editProfileHandler}>
                                                <Link className="dropdown-item p-1" style={{ fontSize: "22.5px" }}>
                                                    <i className="fa-solid fa-user-pen" style={{ fontSize: "22.5px" }}></i> Edit Profile
                                                </Link>
                                            </li>
                                            <li onClick={openCancelPopup}>
                                                <Link className="dropdown-item p-1" style={{ fontSize: "22.5px" }}>
                                                    <i className="fa-solid fa-user-xmark" style={{ fontSize: "22.5px" }}></i> Delete Account
                                                </Link>
                                            </li>
                                            <li className='logout' onClick={logoutHandler}>
                                                <Link className="dropdown-item p-1" to="#" style={{ fontSize: "22.5px" }}>
                                                    <i className="fa-solid fa-right-from-bracket" style={{ fontSize: "22.5px" }}></i> Logout
                                                </Link>
                                            </li>
                                        </ul>
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
