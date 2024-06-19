import React, { useContext } from 'react';
import './InfoBoxes.css';
import Notification from '../../Notification/Notification.jsx'
import { removeFavFacility } from '../../Services/UserDataServices.jsx'
import refcontext from '../../Context/Refcontext.js';

const InfoBoxes = ({ favFacilityData, updateFavState, homeAddressData }) => {
    const alert = new Notification()
    const refcon = useContext(refcontext)



    const editFavFacilityHandler = () => {
        alert.infoNotify(true, "To change your favorite facility, select any location on the map and then mark it as a favorite.")
    }

    const addFavFacilityHandler = () => {
        alert.infoNotify(true, "To add a favorite facility, select any location on the map and then mark it as a favorite.")
    }

    const removeFavFacilityHandler = async (e) => {
        e.preventDefault();
        const headers = {
            "authorization": localStorage.getItem("token")
        }

        const isRemoved = await removeFavFacility(headers)
        if (isRemoved?.status) {
            alert.notify(isRemoved?.status, isRemoved?.message);

            updateFavState() //reload and fetch fav facility data again to update mark and remove as fav

        } else {
            alert.notify(isRemoved?.status, isRemoved?.message);

        }
    }

    const editHomeAddressHandler = () => {
        refcon.refhomeaddress.current.click()
    }

    return (
        <div className="container-fluid mt-2 mb-4 p-4 main-info-box">
            <div className="row info-panel">
                <div className="col-md-6 col-lg-6 col-12 info-card-boxes">
                    <div className="card info-card facility-card">
                        <div className="card-header">
                            <span className='info-title fs-4'>Your Favorite Facility</span>
                            <div className="float-right icon-box">
                                <i className="fas fa-edit hover-blue mx-3 info-icon" onClick={editFavFacilityHandler} style={{ cursor: "pointer" }}></i>
                                <i className="fas fa-trash hover-red info-icon" onClick={removeFavFacilityHandler} style={{ cursor: "pointer" }}></i>
                            </div>
                        </div>
                        {favFacilityData.data_obj ?
                            <div className="card-body info-card-body">
                                <h5 className="card-title" style={{ color: "#540640" }}>{favFacilityData.data_obj.BEZEICHNUNG || ''}</h5>
                                {favFacilityData.data_obj.category && <p><strong>Category:</strong> {favFacilityData.data_obj.category}</p>}
                                {favFacilityData.data_obj.ART && <p><strong>Type:</strong> {favFacilityData.data_obj.ART}</p>}
                                {favFacilityData.data_obj.TRAEGER && <p><strong>Provider:</strong> {favFacilityData.data_obj.TRAEGER}</p>}
                                {favFacilityData.data_obj.TRAEGERBEZEICHNUNG && <p><strong>Provider:</strong> {favFacilityData.data_obj.TRAEGERBEZEICHNUNG}</p>}
                                {favFacilityData.data_obj.PROFILE && <p><strong>Profile:</strong> {favFacilityData.data_obj.PROFILE || "NA"}</p>}
                                {favFacilityData.data_obj.LEISTUNGEN && <p><strong>Services:</strong> {favFacilityData.data_obj.LEISTUNGEN || "NA"}</p>}
                                {favFacilityData.data_obj.STRASSE && favFacilityData.data_obj.PLZ && favFacilityData.data_obj.ORT && (
                                    <p><strong>Address:</strong> {favFacilityData.data_obj.STRASSE}, {favFacilityData.data_obj.PLZ} {favFacilityData.data_obj.ORT}</p>
                                )}
                                {favFacilityData.data_obj.HORT !== undefined && <p><strong>After school care:</strong> {favFacilityData.data_obj.HORT == 1 ? "Yes" : "No"}</p>}
                                {favFacilityData.data_obj.KITA !== undefined && <p><strong>Day care services:</strong> {favFacilityData.data_obj.KITA == 1 ? "Yes" : "No"}</p>}
                                {favFacilityData.data_obj.BARRIEREFREI !== undefined && <p><strong>Barriers-Free:</strong> {favFacilityData.data_obj.BARRIEREFREI == 1 ? "Yes" : "No"}</p>}
                                {favFacilityData.data_obj.INTEGRATIV !== undefined && <p><strong>Integrative services:</strong> {favFacilityData.data_obj.INTEGRATIV == 1 ? "Yes" : "No"}</p>}
                                {favFacilityData.data_obj.FAX && <p><strong>Fax:</strong> {favFacilityData.data_obj.FAX || "NA"}</p>}
                                {favFacilityData.data_obj.TELEFON && <p><strong>Phone:</strong> <a href={`tel:${favFacilityData.data_obj.TELEFON || ""}`}>{favFacilityData.data_obj.TELEFON || "NA"}</a></p>}
                                {favFacilityData.data_obj.EMAIL && <p><strong>Email:</strong> <a href={`mailto:${favFacilityData.data_obj.EMAIL || ""}`}>{favFacilityData.data_obj.EMAIL || "NA"}</a></p>}
                                {favFacilityData.data_obj.WWW && <p><strong>Website:</strong> <a href={`${favFacilityData.data_obj.WWW}`} target="_blank" rel="noopener noreferrer">{favFacilityData.data_obj.WWW || "NA"}</a></p>}
                                {favFacilityData.data_obj.URL && <p><strong>Website:</strong> <a href={`${favFacilityData.data_obj.URL}`} target="_blank" rel="noopener noreferrer">{favFacilityData.data_obj.URL || "NA"}</a></p>}
                            </div>
                            :

                            <div className="card-body info-card-body d-flex justify-content-center align-items-center">
                                <div className='hover-blue' style={{ cursor: "pointer" }}>

                                    <i class="fa-solid fa-circle-plus" style={{ fontSize: "21px", marginRight: "2px" }}></i> <span style={{ fontSize: "20px" }} onClick={addFavFacilityHandler}>Add Favorite Facility</span>
                                </div>
                            </div>

                        }

                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-12 info-card-boxes">
                    <div className="card info-card home-card">
                        <div className="card-header">
                            <span className='info-title fs-4'>Your Home Address</span>
                            <div className="float-right icon-box">
                                <i className="fas fa-edit hover-blue info-icon" onClick={editHomeAddressHandler} style={{ cursor: "pointer" }}></i>
                            </div>
                        </div>

                        {
                            localStorage.getItem("isAddress") ?
                                <div className='card-body info-card-body'>

                                    {homeAddressData.y && <p style={{fontSize:"16px"}}><strong>lattitude:</strong> {homeAddressData.y}</p>}
                                    {homeAddressData.x && <p className='mt-2' style={{fontSize:"16px"}}><strong>longitude:</strong> {homeAddressData.x}</p>}
                                    {homeAddressData.label && <p className='mt-2'  style={{fontSize:"16px"}}><strong>Address:</strong> {homeAddressData.label}</p>}
                                </div> :


                                <div className="card-body info-card-body d-flex justify-content-center align-items-center">
                                    <div className='hover-blue' style={{ cursor: "pointer" }}>
                                        <i class="fa-solid fa-circle-plus hover-blue" style={{ fontSize: "21px", marginRight: "2px" }}></i> <span style={{ fontSize: "20px" }} className='hover-blue'>Add Home Address</span>

                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoBoxes;
