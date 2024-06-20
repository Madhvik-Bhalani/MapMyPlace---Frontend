import React, { useContext, useRef, useState } from 'react'
import refcontext from '../../Context/Refcontext'
import logo from '../../Assets/logo.png'
import { forgotassword } from './Services/ForgotPasswordServices.jsx';
import Notification from '../../Notification/Notification.jsx';




function ForgotPassword() {

    const alert = new Notification();  // new instance for Notification class base component

    // context for ref modal trigger btn -- triggerd from nav
    const refcon = useContext(refcontext)
    const refCloseModal = useRef(null)
    const submitBtnRef = useRef(null) 

    const [data, setData] = useState({ email: ""})

    const subHandler = async (e) => {
        e.preventDefault();

        const isLinkSent = await forgotassword(data);  //call api and user's email id

        if (isLinkSent?.status) {
          alert.notify(isLinkSent?.status, isLinkSent?.message);  //pass status and msg to notification
          setData({email:""}) 
          refCloseModal.current.click()
        } else {
          alert.notify(isLinkSent?.status, isLinkSent?.message);
        }
      }
    
    const clickHandler = () => {
        submitBtnRef.current.click();
    }

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdroppassword" style={{ display: "none" }} ref={refcon.refforgotpass}>
            </button>

            <div className="modal fade" id="staticBackdroppassword" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel" style={{color:"#540640"}}>Forgot Password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form method='POST' onSubmit={subHandler}>
                                <img src={logo} alt="MapMyPlace" style={{ width: "100px", height: "95px", display: "block", margin: "auto" }} />
                                <div className="mb-3 mt-4">

                                    <label htmlFor="exampleInputEmail5" className="form-label text-capitalize">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail5" aria-describedby="emailHelp" name="email" required onChange={changeHandler} value={data.email} />

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
                            }} onClick={clickHandler}>Send Reset Link</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ForgotPassword