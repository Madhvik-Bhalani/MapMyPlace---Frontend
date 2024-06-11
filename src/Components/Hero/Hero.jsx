import React, { useContext } from 'react';
import './Hero.css';
import hero from '../../Assets/b_hero1.png';
import refcontext from '../../Context/Refcontext';

function Hero() {

    const refcon = useContext(refcontext);
    let { refsignup } = refcon;
    const clickHandler = () => {
        refsignup.current.click();
    };

    return (
        <>
            <div className="hero">

                <div className="left">
                    <h1 className='text-capitalize '> Need <span style={{fontWeight:"400",textShadow:"1px 1px 1px #540640"}}>directions?</span></h1>
                    <div className="para">

                        <p style={{ width: "80%" }} className='text-capitalize'>Discover Your Community With <span style={{textShadow:"0.25px 0.25px 0.25px #540640"}}>MapMyPlace</span> Your Ultimate Resource For Finding Schools, Kindergartens, And Social Projects. Whether You're New In Town Or Exploring New Opportunities, We've Got You Covered For All Your Local Navigation Needs.






</p>
                    </div>
                    <div className="btns">
                        <button className=" text-capitalize btn" style={{
                            backgroundColor: "#540640",
                            color: "white",width:"",fontSize:"19px"
                        }} onClick={clickHandler}>Explore Now</button>
                    </div>
                </div>

                <div className="right">
                    <img src={hero} alt="Home Page.." />
                </div>
            </div>
        </>
    )
}

export default Hero

