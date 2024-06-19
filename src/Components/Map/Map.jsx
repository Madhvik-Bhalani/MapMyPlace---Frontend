import React, { useContext, useRef, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import YourLocationMarker from './YourLocationMarker';
import MarkerComponent from './MarkerComponent.jsx';
import { schoolIcon, teenagerProjectIcon, kindergardenIcon, childProjectIcon, favFacilityIcon, homeIcon } from './CustomIcon.js';
import './Map.css'
import HomeMarkerComponent from './HomeMarkerComponent.jsx';

function Map({ schools, socialTeenagerProjects, kinderGardens, socialChildProjects, favFacilityData, updateFavState, homeAddressData }) {

  const mapRef = useRef(null)

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, []);

  var initialPosition = { lat: 50.833332, lng: 12.916667 }; // Initial center of the map Chemnitz

  return (
    <div className="p-4">
      <MapContainer center={initialPosition} zoom={13} scrollWheelZoom={false} style={{ borderRadius: "7px" }} whenCreated={map => (mapRef.current = map)}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <YourLocationMarker /> */}


        {/* home marker */}
        {localStorage.getItem("isAddress") && <HomeMarkerComponent homeAddressData={homeAddressData} icon={homeIcon} />}


        {/* location (facility) marker */}

        {schools && <MarkerComponent data={schools} icon={schoolIcon} favFacilityData={favFacilityData} favIcon={favFacilityIcon} updateFavState={updateFavState} homeAddressData={homeAddressData} />}
        {kinderGardens && <MarkerComponent data={kinderGardens} icon={kindergardenIcon} favFacilityData={favFacilityData} favIcon={favFacilityIcon} updateFavState={updateFavState} homeAddressData={homeAddressData} />}
        {socialTeenagerProjects && <MarkerComponent data={socialTeenagerProjects} icon={teenagerProjectIcon} favFacilityData={favFacilityData} favIcon={favFacilityIcon} updateFavState={updateFavState} homeAddressData={homeAddressData}  />}
        {socialChildProjects && <MarkerComponent data={socialChildProjects} icon={childProjectIcon} favFacilityData={favFacilityData} favIcon={favFacilityIcon} updateFavState={updateFavState} homeAddressData={homeAddressData} />}
      </MapContainer>
    </div>
  );
}

export default Map;
