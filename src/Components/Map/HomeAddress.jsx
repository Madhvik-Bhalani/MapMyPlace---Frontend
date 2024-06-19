import React, { useContext, useState, useRef, useEffect } from 'react';
import './HomeAddress.css';
import logo from '../../Assets/logo.png';
import refcontext from '../../Context/Refcontext';
import reloadcontext from '../../Context/Reloadcontext.js';
import Notification from '../../Notification/Notification.jsx';
import UserDatacontext from '../../Context/UserDatacontext.js';
import { addHomeAddress } from '../../Services/UserDataServices.jsx';
import { OpenStreetMapProvider } from 'leaflet-geosearch';


function HomeAddress() {

    const alert = new Notification();  // new instance for Notification class base component
    const usercon = useContext(UserDatacontext)
    const provider = new OpenStreetMapProvider(); // Create a Geosearch provider instance

    const refcon = useContext(refcontext)
    const reloadcon = useContext(reloadcontext)

    const refCloseModal = useRef(null)
    const submitBtnRef = useRef(null)
    const [homeAddress, setHomeAddress] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [finalHomeAddress, setFinalHomeAddress] = useState({});
    const [addressIndex, setAddressIndex] = useState(-1);

    const subHandler = async (e) => {
        e.preventDefault();



        if (addressIndex >= 0) {

            const headers = {
                'authorization': localStorage.getItem("token")
            };

            const params = {
                homeAddress: finalHomeAddress
            };

            console.log(params);


            const isAdded = await addHomeAddress(params, headers)

            if (isAdded?.status) {
                localStorage.setItem("isAddress", true)
                reloadcon.setreload({})
                await usercon.fetchUserData(headers)
                setHomeAddress("")
                setAddressIndex(-1)

                if (refCloseModal.current) {
                    refCloseModal.current.click();
                }


                alert.notify(isAdded?.status, isAdded?.message);
            } else {
                alert.notify(isAdded?.status, isAdded?.message);
            }
        } else {
            alert.notify(false, "Select your accurate address from lists..!!");
        }


    }

    const changeHandler = async (e) => {
        setHomeAddress(e.target.value);
        setAddressIndex(-1)
    }


    const fetchAddressHandler = async () => {
        if (homeAddress.trim() !== '') { //check value is not empty string
            try {
                const results = await provider.search({ query: homeAddress }); //search using entered text
                setSuggestions(results); //set that results into a state

            } catch (error) {
                alert.infoNotify(false, 'Error fetching address. Please try again.');
            }
        } else {
            setSuggestions([]);
        }
    }


    useEffect(() => {

        const getData = setTimeout(() => {
            fetchAddressHandler()
        }, 500)

        return () => clearTimeout(getData)
    }, [homeAddress])


    const suggestionClickHandler = (resultLabel, index, result) => {
        setHomeAddress(resultLabel)
        setAddressIndex(index)
        setFinalHomeAddress(result)
    }


    const clickHandler = () => {
        submitBtnRef.current.click();
    }

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop4" style={{ display: "none" }} ref={refcon.refhomeaddress}>
            </button>

            <div className="modal fade" id="staticBackdrop4" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel" style={{ color: "#540640" }}>Enter Your Home Address</h5>
                            <button type="button" className="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form method='POST' onSubmit={subHandler}>
                                <img src={logo} alt="MapMyPlace" style={{ width: "100px", height: "95px", display: "block", margin: "auto" }} />
                                <div className="mb-2">
                                    <label htmlFor="homeAddress" className="form-label text-capitalize">Home Address</label>
                                    <input type="text" className="form-control" id="homeAddress" name="homeAddress" required value={homeAddress} onChange={changeHandler} />
                                </div>
                                <input type="submit" value="Sign Up" style={{ display: "none" }} ref={submitBtnRef} />
                            </form>
                        </div>
                        {localStorage.getItem("isAddress") ? (
                            <>
                                <div className={suggestions.length > 0 ? "address-suggestions" : ""}>
                                    {suggestions.length > 0 && (
                                        <ul className="list-group">
                                            {suggestions.map((result, index) => (
                                                <li key={index} className="list-group-item list-group-item-action" style={{ cursor: "pointer" }} onClick={() => suggestionClickHandler(result.label, index, result)}>{result.label}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn" data-bs-dismiss="modal" style={{ backgroundColor: "#e99f27", color: "white" }} ref={refCloseModal}>Close</button>
                                    <button type="button" className="btn" style={{ backgroundColor: "#540640", color: "white" }} onClick={clickHandler}>Save Changes</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`${suggestions.length > 0 ? "address-suggestions" : ""}`}>

                                    {suggestions.length > 0 && (
                                        <ul className="list-group">
                                            {suggestions.map((result, index) => (
                                                <li key={index} className="list-group-item list-group-item-action" onClick={() => suggestionClickHandler(result.label, index, result)} style={{ cursor: "pointer" }}>{result.label}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn d-block mx-auto" style={{ backgroundColor: "#540640", color: "white" }} onClick={clickHandler}>Save Changes</button>
                                </div>
                            </>
                        )}
                        <button type="button" className="btn d-none" data-bs-dismiss="modal" style={{ backgroundColor: "#e99f27", color: "white" }} ref={refCloseModal}>Close</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default HomeAddress;
