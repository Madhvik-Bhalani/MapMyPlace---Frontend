import React, { useContext, useState, useRef } from 'react'
import refcontext from '../../Context/Refcontext'
import logo from '../../Assets/logo.png'
import { changePassword } from './Services/ChangePassServices.jsx'
import Notification from '../../Notification/Notification.jsx';

function ChangePass() {
    const refcon = useContext(refcontext)
    const alert = new Notification();

    const refCloseModal = useRef(null)

    const [pass, setPass] = useState({ opass: "", npass: "", rpass: "" })

    const subHandler = async (e) => {
        e.preventDefault()
        const headers = {
            'authorization': localStorage.getItem("token")
        }
        const isChanged = await changePassword(pass, headers);
        if (isChanged?.status) {
            alert.notify(isChanged?.status, isChanged?.message);  //pass status and msg to notification
            setPass({ opass: "", rpass: "", npass: "" })
            refCloseModal.current.click()
        } else {
            alert.notify(isChanged?.status, isChanged?.message);
        }
    }

    const changeHandler = (e) => {
        setPass({ ...pass, [e.target.name]: e.target.value })
    }

    return (
        <>
            <button className="btn btn-primary d-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" ref={refcon.refchangepass}>
            </button>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel" style={{ color: "#540640" }}>Change Password</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" ref={refCloseModal}></button>
                </div>
                <div className="offcanvas-body">
                    <form method='POST' onSubmit={subHandler}>
                        <img src={logo} alt="MapMyPlace" className='mb-5' style={{ width: "100px", height: "95px", display: "block", margin: "auto" }} />
                        <div className="mb-3">

                            <label htmlFor="opass" className="form-label text-capitalize">Old Password</label>
                            <input type="text" className="form-control" id="opass" aria-describedby="emailHelp" name="opass" required onChange={changeHandler} value={pass.opass} />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="npass" className="form-label text-capitalize">New Password</label>
                            <input type="password" className="form-control" id="npass" name="npass" required onChange={changeHandler} value={pass.npass} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rpass" className="form-label text-capitalize">Re-Type Password</label>
                            <div>


                                <input type="password" className="form-control" id="rpass" name="rpass" required onChange={changeHandler} value={pass.rpass} />

                            </div>
                        </div>

                        <input type="submit" className='mt-4 btn btn-dark d-block m-auto' value="Save Password" style={{ backgroundColor: "#540640", fontSize: "18px" }} />
                    </form>

                </div>
            </div>
        </>
    )
}

export default ChangePass