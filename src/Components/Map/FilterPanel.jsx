import React, { useContext, useEffect, useState } from 'react';
import './FilterPanel.css';
import Map from './Map.jsx'
import { fetchMapData } from './Services/MapService.js'
import Notification from '../../Notification/Notification.jsx';
import UserDatacontext from '../../Context/UserDatacontext.js'
import reloadcontext from '../../Context/Reloadcontext.js';
import refcontext from '../../Context/Refcontext.js';
import InfoBoxes from './InfoBoxes.jsx';


const FilterPanel = () => {

  const alert = new Notification();  // new instance for Notification class base component
  const usercon = useContext(UserDatacontext)
  const reloadcon = useContext(reloadcontext)
  const refcon = useContext(refcontext)
  const { reload } = reloadcon


  const [filters, setFilters] = useState({
    schools: false,
    socialTeenagerProjects: false,
    kinderGardens: false,
    socialChildProjects: true,
  });

  const [schoolsData, setSchoolsData] = useState([])
  const [teenagerProjectsData, setTeenagerProjectsData] = useState([])
  const [childProjectsData, setChildProjectsData] = useState([])
  const [kinderGardensData, setkinderGardensData] = useState([])

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  }

  const resetFilters = () => {
    const resetState = {
      schools: false,
      socialTeenagerProjects: false,
      kinderGardens: false,
      socialChildProjects: false,
    };
    setFilters(resetState);

  };

  const fetchDataOnLoad = async () => {
    const headers = {
      'authorization': localStorage.getItem("token")
    }

    const mapData = await fetchMapData(headers) //mapData?.data?.schools   .teenagerProjects  .childProjects .kinderGardens

    if (mapData?.status) {

      setChildProjectsData(mapData?.data?.childProjects)
      setSchoolsData(mapData?.data?.schools)
      setTeenagerProjectsData(mapData?.data?.teenagerProjects)
      setkinderGardensData(mapData?.data?.kinderGardens)
    }
    else {
      alert.notify(mapData?.status, mapData?.message);  //pass status and msg to notification
    }
  }


  const fetchFavFacility = async () => {

    const headers = {
      "authorization": localStorage.getItem("token")
    }

    await usercon.fetchUserData(headers)



    //this state is defined in context provider which is automatically filled with data after 
    // console.log(usercon.favFacilityState); //this state is defined in context provider which is automatically filled with data after 
    //every fetchUserData req 

  }

  const checkHomeAddress = () => {


    // if (Object.keys(usercon.homeAddressState).length === 0) {
    //   console.log("");
    //   refcon.refhomeaddress.current.click()
    // }

    if (!localStorage.getItem("isAddress")) {
      refcon.refhomeaddress.current.click()
    }

  }



 useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    fetchDataOnLoad();
    fetchFavFacility(); //about fav facility
    checkHomeAddress(); //about home address
  }
}, []);

  // Callback function to update favFacilityData after adding or removing from favorites
  const updateFavState = () => {
    fetchFavFacility(); // Refresh favFacilityData
  };

  return (
    <>
      <div className="container-fluid p-4">
        <div className="card filter-panel">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h3 className="mb-0 fs-4" style={{ color: "#540640" }}>Filter Panel</h3>
            <button type="button" className="btn custom-button" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
          <div className="card-body">
            <form className="row py-2 px-4">



            <div className="form-check col-12 col-md-6 col-lg-3 d-flex justify-content-center">
                <input
                  id="socialChildProjects"
                  className="form-check-input filter-checkbox custom-checkbox childcheck"
                  type="checkbox"
                  name="socialChildProjects"
                  checked={filters.socialChildProjects}
                  onChange={handleChange}
                />
                <label className="form-check-label filter-box-text" htmlFor="socialChildProjects">
                  Social Child Projects
                </label>
              </div>

              <div className="form-check col-12 col-md-6 col-lg-3 d-flex justify-content-center">
                <input
                  className="form-check-input filter-checkbox custom-checkbox teenagercheck"
                  type="checkbox"
                  id="socialTeenagerProjects"
                  name="socialTeenagerProjects"
                  checked={filters.socialTeenagerProjects}
                  onChange={handleChange}
                />
                <label className="form-check-label filter-box-text" htmlFor="socialTeenagerProjects">
                  Social Teenager Projects
                </label>
              </div>



              <div className="form-check col-12 col-md-6 col-lg-3 d-flex justify-content-center">
                <input
                  className="form-check-input filter-checkbox kindercheck"
                  type="checkbox"
                  name="kinderGardens"
                  id="kinderGardens"
                  checked={filters.kinderGardens}
                  onChange={handleChange}
                />
                <label className="form-check-label filter-box-text" htmlFor="kinderGardens">
                  kinderGardens
                </label>
              </div>

              <div className="form-check col-12 col-md-6 col-lg-3 d-flex justify-content-center" >
                <input
                  className="form-check-input filter-checkbox schoolcheck"
                  type="checkbox"
                  name="schools"
                  id="schools"
                  checked={filters.schools}
                  onChange={handleChange}
                />
                <label className="form-check-label filter-box-text" htmlFor="schools">
                  Schools
                </label>
              </div>


            </form>
          </div>
        </div>
      </div>
      <Map
        schools={filters.schools ? schoolsData : []}
        socialTeenagerProjects={filters.socialTeenagerProjects ? teenagerProjectsData : []}
        kinderGardens={filters.kinderGardens ? kinderGardensData : []}
        socialChildProjects={filters.socialChildProjects ? childProjectsData : []}
        favFacilityData={Object.keys(usercon.favFacilityState).length !== 0 ? usercon.favFacilityState : []}
        updateFavState={updateFavState}
        homeAddressData={usercon.homeAddressState ? usercon.homeAddressState : []}
      />
      <InfoBoxes favFacilityData={usercon.favFacilityState ? usercon.favFacilityState : []} updateFavState={updateFavState} homeAddressData={usercon.homeAddressState ? usercon.homeAddressState : []} />
    </>
  );
};

export default FilterPanel;
