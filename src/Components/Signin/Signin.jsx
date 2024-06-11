import React, { useContext, useRef, useState } from 'react'
import refcontext from '../../Context/Refcontext'
import logo from '../../Assets/logo.png'
import './Signin.css'
import { signin } from './Services/SigninServices.jsx';
import Notification from '../../Notification/Notification.jsx';




function Signin() {

    const alert = new Notification();  // new instance for Notification class base component

    // context for ref modal trigger btn -- triggerd from nav
    const refcon = useContext(refcontext)
    const refCloseModal = useRef(null)
    const submitBtnRef = useRef(null)

    const [data, setData] = useState({ email: "", pass: "" })

    const subHandler = async (e) => {
        e.preventDefault();

        const isLoggedin = await signin(data);  //call api and pass user's data

        if (isLoggedin?.status) {
            alert.notify(isLoggedin?.status, isLoggedin?.message);  //pass status and msg to notification
            setData({ email: "", pass: "" })
            refCloseModal.current.click()
        } else {
            alert.notify(isLoggedin?.status, isLoggedin?.message);
        }
    }

    const clickHandler = () => {
        submitBtnRef.current.click();
    }

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const forgotPasswordHandler = () => {
        refCloseModal.current.click()
        refcon.refforgotpass.current.click()

    }

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ display: "none" }} ref={refcon.refsignin}>
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Sign In To MapMyPlace</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form method='POST' onSubmit={subHandler}>
                                <img src={logo} alt="MapMyPlace" style={{ width: "120px", height: "115px", display: "block", margin: "auto" }} />
                                <div className="mb-3 mt-4">

                                    <label htmlFor="exampleInputEmail1" className="form-label text-capitalize">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" required onChange={changeHandler} value={data.email} />

                                </div>
                                <div>
                                    <label htmlFor="exampleInputPassword1" className="form-label text-capitalize">Password</label>
                                    <div>

                                        <input type="password" className="form-control" id="pass2" name="pass" required onChange={changeHandler} value={data.pass} />
                                        <p className='text-end mt-3 forgot-pass' onClick={forgotPasswordHandler}>Forgot your password?</p>

                                    </div>
                                </div>

                                <input type="submit" value="Sign In" ref={submitBtnRef} style={{ display: "none" }} />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" style={{
                                backgroundColor: "#e99f27",
                                color: "white"
                            }} data-bs-dismiss="modal" ref={refCloseModal}>Close</button>
                            <button type="button" className="btn " style={{
                                backgroundColor: "#540640",
                                color: "white", outline: "none"
                            }} onClick={clickHandler}>Sign In</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Signin