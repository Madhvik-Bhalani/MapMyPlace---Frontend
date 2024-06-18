import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import './MarkerComponent.css';

const KinderGardenMarkerComponent = ({ data, icon }) => {

    const handleFavoriteClick = (e, id) => {
        e.preventDefault();
        alert(`Marked ${id} as favorite!`);
    };

    return data.map((item, index) => (
        <Marker key={index} position={[item.data_obj.lat, item.data_obj.lng]} icon={icon}>
            <Popup className="custom-popup">
                <div className="popup-header mt-3 mb-2">
                    <h3 className='location-name'>{item.data_obj.BEZEICHNUNG || " "}</h3>
                </div>
                <div className="popup-body">
                    <p><strong>Category:</strong> {item.data_obj.category}</p>
                    <p><strong>Provider:</strong> {item.data_obj.TRAEGERBEZEICHNUNG || "NA"}</p>
                    <p><strong>Address:</strong> {item.data_obj.STRASSE},
                        {item.data_obj.PLZ} {item.data_obj.ORT}</p>

                    <p><strong>After school care:</strong> {item.data_obj.HORT == 1 ? "Yes" : "No" || "NA"}</p>

                    <p><strong>Day care services:</strong> {item.data_obj.KITA == 1 ? "Yes" : "No" || "NA"}</p>
                    <p><strong>Barriers-Free:</strong> {item.data_obj.TRAEGERBEZEICHNUNG == 1 ? "Yes" : "No" || "NA"}</p>
                    <p><strong>Integrative services:</strong> {item.data_obj.INTEGRATIV == 1 ? "Yes" : "No" || "NA"}</p>

                    <p><strong>Fax:</strong> {item.data_obj.FAX || "NA"}</p>
                    <p><strong>Phone:</strong> <a href={`tel:${item.data_obj.TELEFON || ""}`}>{item.data_obj.TELEFON || "NA"}</a></p>
                    <p><strong>Email:</strong> <a href={`mailto:${item.data_obj.EMAIL || ""}`}>{item.data_obj.EMAIL || "NA"}</a></p>
                    <p><strong>Website:</strong> <a href={`${item.data_obj.WWW}`} target="_blank" rel="noopener noreferrer">{item.data_obj.URL || "NA"}</a></p>

                    {/* Favorite button */}
                    <div className="favorite-icon text-center mt-3">
                        <i className="fas fa-star me-2"></i> Mark as favourite
                    </div>

                    {/* <div className="text-center favorite-icon mt-3">
                            <button type="button" className="btn fav-btn" style={{
                                backgroundColor: "#540640", //#e99f27
                                color: "white", outline: "none",
                                
                            }} ><i className="fas fa-star me-2 fav-text" style={{fontSize:"14px"}}></i> <span className='fav-text' style={{fontSize:"14px"}}>Mark as favourite</span></button>
                    </div> */}
                </div>
            </Popup>
        </Marker>
    ));
};

export default KinderGardenMarkerComponent;
