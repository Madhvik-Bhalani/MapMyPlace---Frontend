import React,{useContext} from 'react';
import { Marker, Popup } from 'react-leaflet';
import './MarkerComponent.css';
import refcontext from '../../Context/Refcontext.js'

const HomeMarkerComponent = ({ homeAddressData, icon }) => {

    const refcon = useContext(refcontext)

    if (!homeAddressData || homeAddressData.y === undefined || homeAddressData.x === undefined) {
        return null; // Do not render the marker if coordinates are not available
    }

    const changeHomeAddressHandler = async () => {
        refcon.refhomeaddress.current.click()
    };

    return (<Marker position={[homeAddressData.y, homeAddressData.x]} icon={icon} >
        <Popup className="custom-popup">
            <div className="popup-body">
                {homeAddressData.y && <p><strong>lattitude:</strong> {homeAddressData.y}</p>}
                {homeAddressData.x && <p><strong>longitude:</strong> {homeAddressData.x}</p>}
                {homeAddressData.label && <p><strong>Address:</strong> {homeAddressData.label}</p>}



                <div className="favorite-icon text-center mt-3" onClick={(e) => changeHomeAddressHandler()}>
                    <i class="fa-solid fa-pen-to-square"></i> Change home Address
                </div>

            </div>
        </Popup>
    </Marker >)

}

export default HomeMarkerComponent;
