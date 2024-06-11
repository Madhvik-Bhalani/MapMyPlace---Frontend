import React, { useContext, useState, useRef } from 'react'
import './Signup.css'
import logo from '../../Assets/logo.png'
import refcontext from '../../Context/Refcontext'
import { signup } from './Services/SignupServices.jsx';
import Notification from '../../Notification/Notification.jsx';




function Signup() {

    const alert = new Notification();  // new instance for Notification class base component

    const refcon = useContext(refcontext)
    const refCloseModal = useRef(null)
    const submitBtnRef = useRef(null)

    const [data, setdata] = useState({ fname: "", lname: "", email: "", pass: "", mno: "", cpass: "" })

    const subHandler = async (e) => {
        e.preventDefault();

        const isRegistered = await signup(data);  //call api and pass user's data

        if (isRegistered?.status) {
            alert.notify(isRegistered?.status, isRegistered?.message);  //pass status and msg to notification
            setdata({ fname: "", lname: "", email: "", pass: "", mno: "", cpass: "" })
            refCloseModal.current.click()

        } else {
            alert.notify(isRegistered?.status, isRegistered?.message);
        }
    }

    const changeHandler = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }
    const clickHandler = () => {
        submitBtnRef.current.click(); //trigger submit button
    }

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" style={{ display: "none" }} ref={refcon.refsignup}>
            </button>



            <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Create Your Account With MapMyPlace</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form method='POST' onSubmit={subHandler}>
                                <img src={logo} alt="MapMyPlace" style={{ width: "120px", height: "115px", display: "block", margin: "auto" }} />

                                <div className="row mb-2 mt-3">
                                    <div className="col-md-6">
                                        <label htmlFor="fname" className="form-label text-capitalize">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fname"
                                            name="fname"
                                            required
                                            minLength={3}
                                            maxLength={25}
                                            onChange={changeHandler}
                                            value={data.firstName}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="lname" className="form-label text-capitalize">Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lname"
                                            name="lname"
                                            required
                                            minLength={3}
                                            maxLength={25}
                                            onChange={changeHandler}
                                            value={data.lastName}
                                        />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="mno" className="form-label text-capitalize">Mobile Number</label>
                                    <div className="input-group">
                                        <span className="input-group-text">+49</span>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="mno"
                                            name="mno"
                                            required
                                            onChange={changeHandler}
                                            value={data.mno}
                                        />
                                    </div>

                                </div>

                                <div className="mb-2">
                                    <label htmlFor="exampleInputEmail2" className="form-label text-capitalize">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail2" name="email"
                                        aria-describedby="emailHelp" required onChange={changeHandler} value={data.email} />
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="exampleInputPassword2" className="form-label text-capitalize">Password</label>
                                    <input type="password" className="form-control" id="pass" name="pass" required minLength={3} onChange={changeHandler} value={data.pass} />
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="exampleInputPassword3" className="form-label text-capitalize">Confirm Password</label>
                                    <div>

                                        <input type="password" className="form-control" id="cpass" name="cpass" required onChange={changeHandler} value={data.cpass} />

                                    </div>
                                </div>
                                <input type="submit" value="Sign Up" style={{ display: "none" }} ref={submitBtnRef} />
                            </form>
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn " data-bs-dismiss="modal" style={{
                                backgroundColor: "#e99f27",
                                color: "white"
                            }} ref={refCloseModal}>Close</button>
                            <button type="button" className="btn" style={{
                                backgroundColor: "#540640",
                                color: "white"
                            }} onClick={clickHandler}>Sign Up</button>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup