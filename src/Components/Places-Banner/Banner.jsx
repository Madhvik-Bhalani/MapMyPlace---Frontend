import React from 'react';
import img1 from '../../Assets/y_scl.png';
import img2 from '../../Assets/y_kinder.png';
import img3 from '../../Assets/y_social_child.png';
import img4 from '../../Assets/y_youth.png';
import './Banner.css';

function Banner() {
    return (
        <div className='my-3 banner-main-container container-fluid' style={{padding: "7px 0px" }}>
            <h1 className='text-center section-header'><span style={{ color: "#e99f27" }}>⨳Explore</span> <span style={{ color: "#540640" }}>Nearby Places⨳</span></h1>
            <div className="container card-box my-5">
                <div className="row justify-content-around">
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="card card1" style={{ border: "none" }}>
                            <img src={img1} className="card-img-top" alt="Schools" />
                            <div className="card-body">
                                <h4 className="card-title text-center mt-2" style={{ textShadow: ".5px .5px .5px #540640" }}>Schools</h4>
                                <h6 className="card-text text-center">Explore diverse educational institutions catering to all levels of learning.</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="card card2" style={{ border: "none" }}>
                            <img src={img2} className="card-img-top" alt="Kindergardens" />
                            <div className="card-body">
                                <h4 className="card-title text-center mt-2" style={{ textShadow: ".5px .5px .5px #540640" }}>Kindergardens</h4>
                                <h6 className="card-text text-center">Discover nurturing environments for early childhood development and learning through play.</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="card card3" style={{ border: "none" }}>
                            <img src={img3} className="card-img-top" alt="Social Child Projects" />
                            <div className="card-body">
                                <h4 className="card-title text-center mt-2" style={{ textShadow: ".5px .5px .5px #540640" }}>Social Child Projects</h4>
                                <h6 className="card-text text-center">Connect with initiatives supporting children's well-being, social skills, and education.</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="card card4" style={{ border: "none" }}>
                            <img src={img4} className="card-img-top" alt="Social Teenager Projects" />
                            <div className="card-body">
                                <h4 className="card-title text-center mt-2" style={{ textShadow: ".5px .5px .5px #540640" }}>Social Teenager Projects</h4>
                                <h6 className="card-text text-center">Explore programs aiding teenagers in career guidance, skills development, and social support.</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
