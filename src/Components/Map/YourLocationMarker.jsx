import React, { useState } from 'react';
import { Marker, Popup, useMapEvents, CircleMarker } from 'react-leaflet';

function YourLocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
        click() {
            map.locate({
                enableHighAccuracy: true});
        },
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });


    return position === null ? null : (
        <>
            <Marker position={position} >
                <Popup>You are here</Popup>
            </Marker>
            <CircleMarker center={position} radius={20} fillColor="blue" color="blue">
                {/* <Popup>Circle Marker</Popup> */}
            </CircleMarker>
        </>
    );
}

export default YourLocationMarker;
