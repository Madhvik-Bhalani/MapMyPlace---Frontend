import React, { useContext, useRef, useState, useEffect } from 'react'
import refcontext from '../../Context/Refcontext'
import logo from '../../Assets/logo.png'
import { resetPassword } from './Services/ResetPasswordServices.jsx';
import Notification from '../../Notification/Notification.jsx';
import { useLocation, useNavigate } from 'react-router-dom';



function ResetPassword() {

    const Navigate = useNavigate()

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    const query = useQuery();
    const token = query.get('token');  // Extract the token from the URL

    const alert = new Notification();  // new instance for Notification class base component

    // context for ref modal trigger btn -- triggerd from nav
    const refcon = useContext(refcontext)
    const submitBtnRef = useRef(null)
    const refCloseModal = useRef(null)


    useEffect(() => {
        if (token) {
            openModal();
        }
    }, [token]);

    const openModal = () => {
        refcon.refresetpass.current.click();
    };

    const [data, setData] = useState({ pass: "", cpass: "" })

    const subHandler = async (e) => {
        e.preventDefault();


        if (data.pass != data.cpass) {
            const status = false
            const message = "Password and confirm password are not match"
            alert.notify(status, message);  //frontend validation for passwords
        } else {
            const params = {
                pass: data.pass,
                token: token
            }

            const isPasswordReset = await resetPassword(params);  //call api and pass user's new pass and token

            if (isPasswordReset?.status) {
                alert.notify(isPasswordReset?.status, isPasswordReset?.message);  //pass status and msg to notification
                refCloseModal.current.click()
                Navigate("/") // redirect to home page

            } else {
                alert.notify(isPasswordReset?.status, isPasswordReset?.message);
            }

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
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdropresetpassword" style={{ display: "none" }} ref={refcon.refresetpass}>
            </button>

            <div className="modal fade" id="staticBackdropresetpassword" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel" style={{color:"#540640"}}>Enter Your New Password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{ display: "none" }}></button>
                        </div>
                        <div className="modal-body">
                            <form method='POST' onSubmit={subHandler}>
                                <img src={logo} alt="MapMyPlace" style={{ width: "100px", height: "95px", display: "block", margin: "auto" }} />

                                <div className="mb-2">
                                    <label htmlFor="exampleInputPassword2" className="form-label text-capitalize">Password</label>
                                    <input type="password" className="form-control" id="pass" name="pass" required minLength={3} onChange={changeHandler} value={data.pass} />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="exampleInputPassword3" className="form-label text-capitalize">Confirm Password</label>


                                    <input type="password" className="form-control" id="cpass" name="cpass" required onChange={changeHandler} value={data.cpass} />


                                </div>

                                <input type="submit" value="Sign In" ref={submitBtnRef} style={{ display: "none" }} />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" style={{
                                backgroundColor: "#e99f27",
                                color: "white",
                                display: "none"
                            }} data-bs-dismiss="modal" ref={refCloseModal}>Close</button>
                            <button type="button" className="btn d-block mx-auto" style={{
                                backgroundColor: "#540640",
                                color: "white", outline: "none"
                            }} onClick={clickHandler}>Reset Password</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ResetPassword