import React, { useRef, useState } from 'react'
import Refcontext from './Refcontext'
import Reloadcontext from './Reloadcontext'
import UserDatacontext from './UserDatacontext'
import { getUserData } from '../Services/UserDataServices.jsx'

function Contextprovider(props) {

    const refsignin = useRef(null)
    const refsignup = useRef(null)
    const refforgotpass = useRef(null)
    const refresetpass = useRef(null)
    const refchangepass = useRef(null)
    const refeditprofile = useRef(null)
    const refhomeaddress = useRef(null)
    const refhomeaddressclose = useRef(null)


    const [reload, setreload] = useState({})
    const [data, setData] = useState({ fname: "", lname: "", email: "", mno: "" })
    const [favFacilityState, setFavFacilityState] = useState({})
    const [homeAddressState, setHomeAddressState] = useState({})


    // Get logged in user data 

    const fetchUserData = async (headers) => {

        const user = await getUserData(headers) //call api and pass token to fetch user's data

        if (user?.data) {
            localStorage.setItem("fname", user?.data.fname.toString())
            localStorage.setItem("lname", user?.data.lname.toString())
            localStorage.setItem("mno", user?.data.mno.toString())
            localStorage.setItem("email", user?.data.email.toString())
        }

        if (user?.data?.favFacility) {
            setFavFacilityState(user?.data?.favFacility)
        } else {
            setFavFacilityState({})
        }
        //call this function on mount of map pgae and check user already selected fav facility or not
        //if there is fav facility alredy selected (in user data) then set to state and use through state and context provider        

        if (user?.data?.homeAddress) {
            localStorage.setItem('isAddress', true);
            setHomeAddressState(user?.data?.homeAddress)
        } else {
            setHomeAddressState({})
        }
        //call this function on mount of map pgae and check user already have home address or not
        //if there is already home address(in user data) then set to state and use through state and context provider  

        setreload({})
    }

    const setDataOnEditProfile = () => {
        setData({ fname: localStorage.getItem("fname"), lname: localStorage.getItem("lname"), email: localStorage.getItem("email"), mno: localStorage.getItem("mno") })
    } // used this data state to bind input fileds of edit profile modal


    return (
        <Refcontext.Provider value={{ refsignin, refsignup, refforgotpass, refresetpass, refchangepass, refeditprofile, refhomeaddress }}>
            <Reloadcontext.Provider value={{ reload, setreload }}>
                <UserDatacontext.Provider value={{ fetchUserData, data, setData, setDataOnEditProfile, favFacilityState, homeAddressState,refhomeaddressclose }}>
                    {props.children}
                </UserDatacontext.Provider>
            </Reloadcontext.Provider>
        </Refcontext.Provider>
    )
}

export default Contextprovider

