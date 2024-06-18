import React, { useContext } from 'react'
import Signin from '../Components/Signin/Signin'
import Signup from '../Components/Signup/Signup'
import Hero from '../Components/Hero/Hero';
import Banner from '../Components/Places-Banner/Banner'
import ForgotPassword from '../Components/ForgotPassword/ForgotPassword';
import reloadcontext from '../Context/Reloadcontext';



// import reloadcontext from '../Context/Reloadcontext'

function Home() {
    const reloadcon = useContext(reloadcontext)
    // eslint-disable-next-line 
    let { reload } = reloadcon
    return (
        <>
            <Signin />
            <Signup />
            <ForgotPassword />
            <Hero />
            {localStorage.getItem("token") && <Banner />}
        </>
    )
}

export default Home