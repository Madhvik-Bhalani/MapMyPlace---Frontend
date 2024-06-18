import React, { useContext, useEffect } from 'react';
import { Marker, Popup, CircleMarker } from 'react-leaflet';
import './MarkerComponent.css';
import { addFavFacility, removeFavFacility } from '../../Services/UserDataServices.jsx'
import Notification from '../../Notification/Notification.jsx';


const MarkerComponent = ({ data, icon, favFacilityData, favIcon, updateFavState }) => {

    const alert = new Notification();  // new instance for Notification class base component

    const handleFavoriteClick = async (e, id, category) => {
        e.preventDefault();
        const params = {
            id, category
        }
        const headers = {
            "authorization": localStorage.getItem("token")
        }

        const isAdded = await addFavFacility(params, headers)
        if (isAdded?.status) {
            alert.notify(isAdded?.status, isAdded?.message);

            updateFavState() //reload and fetch fav facility data again to update mark and remove as fav

        } else {
            alert.notify(isAdded?.status, isAdded?.message);

        }
    };
    const handleRemoveFavoriteClick = async (e) => {
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
    };

    return data.map((item, index) => (
        <>
            <Marker Marker key={index} position={[item.data_obj.lat, item.data_obj.lng]} icon={item._id === favFacilityData._id ? favIcon : icon} >
                <Popup className="custom-popup">
                    {item.data_obj.BEZEICHNUNG && <div className="popup-header mt-3 mb-2">
                        <h3 className='location-name'>{item.data_obj.BEZEICHNUNG || " "}</h3>
                    </div>}
                    <div className="popup-body">
                        {item.data_obj.category && <p><strong>Category:</strong> {item.data_obj.category}</p>}
                        {item.data_obj.ART && <p><strong>Type:</strong> {item.data_obj.ART}</p>}
                        {item.data_obj.TRAEGER && <p><strong>Provider:</strong> {item.data_obj.TRAEGER}</p>}
                        {item.data_obj.TRAEGERBEZEICHNUNG && <p><strong>Provider:</strong> {item.data_obj.TRAEGERBEZEICHNUNG}</p>}
                        {item.data_obj.PROFILE && <p><strong>Profile:</strong> {item.data_obj.PROFILE || "NA"}</p>}
                        {item.data_obj.LEISTUNGEN && <p><strong>Services:</strong> {item.data_obj.LEISTUNGEN || "NA"}</p>}
                        {item.data_obj.STRASSE && item.data_obj.PLZ && item.data_obj.ORT && (
                            <p><strong>Address:</strong> {item.data_obj.STRASSE}, {item.data_obj.PLZ} {item.data_obj.ORT}</p>
                        )}
                        {item.data_obj.HORT !== undefined && <p><strong>After school care:</strong> {item.data_obj.HORT == 1 ? "Yes" : "No"}</p>}
                        {item.data_obj.KITA !== undefined && <p><strong>Day care services:</strong> {item.data_obj.KITA == 1 ? "Yes" : "No"}</p>}
                        {item.data_obj.BARRIEREFREI !== undefined && <p><strong>Barriers-Free:</strong> {item.data_obj.BARRIEREFREI == 1 ? "Yes" : "No"}</p>}
                        {item.data_obj.INTEGRATIV !== undefined && <p><strong>Integrative services:</strong> {item.data_obj.INTEGRATIV == 1 ? "Yes" : "No"}</p>}
                        {item.data_obj.FAX && <p><strong>Fax:</strong> {item.data_obj.FAX || "NA"}</p>}
                        {item.data_obj.TELEFON && <p><strong>Phone:</strong> <a href={`tel:${item.data_obj.TELEFON || ""}`}>{item.data_obj.TELEFON || "NA"}</a></p>}
                        {item.data_obj.EMAIL && <p><strong>Email:</strong> <a href={`mailto:${item.data_obj.EMAIL || ""}`}>{item.data_obj.EMAIL || "NA"}</a></p>}
                        {item.data_obj.WWW && <p><strong>Website:</strong> <a href={`${item.data_obj.WWW}`} target="_blank" rel="noopener noreferrer">{item.data_obj.WWW || "NA"}</a></p>}
                        {item.data_obj.URL && <p><strong>Website:</strong> <a href={`${item.data_obj.URL}`} target="_blank" rel="noopener noreferrer">{item.data_obj.URL || "NA"}</a></p>}

                        {
                            favFacilityData && favFacilityData._id !== item._id ?

                                <div className="favorite-icon text-center mt-3 d-flex justify-content-between" onClick={(e) => handleFavoriteClick(e, item._id, item.data_obj.category)}>
                                    <span style={{ color: "#e99f27" }} className='hovericon'> <i class="fa-regular fa-star " ></i> Mark as favorite</span>

                                    <span className='hovericon' style={{ color: "#540640" }}><i class="fa-solid fa-diamond-turn-right"></i> Get direction</span>


                                </div>

                                :
                                <div className="favorite-icon text-center mt-3  d-flex justify-content-between" onClick={(e) => handleRemoveFavoriteClick(e)}>
                                    <span style={{ fontSize: "14.5px", color: "#e99f27" }} className='hovericon'><i class="fa-solid fa-star"></i> Remove from favourite</span>
                                    <span style={{ fontSize: "14.5px", color: "#540640" }} className='hovericon' ><i class="fa-solid fa-diamond-turn-right"></i> Get direction</span>

                                </div>
                        }


                    </div>
                </Popup>
            </Marker >

        </>
    ));
};

export default MarkerComponent;
