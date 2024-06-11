import React, { useContext } from 'react'
import Signin from '../Components/Signin/Signin'
import Signup from '../Components/Signup/Signup'
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Hero from '../Components/Hero/Hero';
import Banner from '../Components/Places-Banner/Banner'
import ForgotPassword from '../Components/ForgotPassword/ForgotPassword';


// import reloadcontext from '../Context/Reloadcontext'

function Home() {
    // const reloadcon=useContext(reloadcontext)
    // eslint-disable-next-line 
    // let {reload}=reloadcon
    return (
        <>
            <Navbar />

            <Signin />
            <Signup />
            <ForgotPassword/>
            <Hero />
            <Banner/>

            <Footer />
        </>
    )
}

export default Home