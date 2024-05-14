import React from 'react';
import { useInView } from "react-intersection-observer";
import { MdFlight } from "react-icons/md";
import { MdHotel } from "react-icons/md";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";

import './Services.css'

function Services(props) {
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
        rootMargin: "0px",
    });
    return (
        <div id='services' className='section_container services-container' ref={ref}>
            <div className="section-wrapper service-wrapper">

                <h3 className='section_title'>
                    WHAT WE DO?
                    <span className='section-suptitle'>SERVICES</span>
                    <span className='section-title-separator'></span>
                </h3>
                <div className="services-items-wrapper">
                    <div className="services-items">
                        <div className="service-item">
                            <div className="service-item-icon">
                                <MdFlight className={inView ? "icon-in" : ""}

                                />
                            </div>
                            <h4 className="service-item-title">
                                Flight Tickets
                            </h4>
                            <p className="service-item-desc">
                                Lorem ipsum dolor sit amet eiusmod adipis cing consec
                                teture elit sed dolor tempor dolor sit amet.
                            </p>
                        </div>
                        <div className="service-item">
                            <div className="service-item-icon">
                                <MdHotel className={inView ? "icon-in" : ""}
                                    style={{ animationDelay: "250ms" }} />
                            </div>
                            <h4 className="service-item-title">
                                Hotel Reservation
                            </h4>
                            <p className="service-item-desc">
                                Lorem ipsum dolor sit amet eiusmod adipis cing consec
                                teture elit sed dolor tempor dolor sit amet.
                            </p>
                        </div>
                        <div className="service-item">
                            <div className="service-item-icon">
                                <BsFillRocketTakeoffFill className={inView ? "icon-in" : ""}
                                    style={{ animationDelay: "500ms" }} />
                            </div>
                            <h4 className="service-item-title">
                                Top Package
                            </h4>
                            <p className="service-item-desc">
                                Lorem ipsum dolor sit amet eiusmod adipis cing consec
                                teture elit sed dolor tempor dolor sit amet.
                            </p>
                        </div>
                        <div className="service-item">
                            <div className="service-item-icon">
                                <GrMapLocation className={inView ? "icon-in" : ""}
                                    style={{ animationDelay: "750ms" }} />
                            </div>
                            <h4 className="service-item-title">
                                Best Destination
                            </h4>
                            <p className="service-item-desc">
                                Lorem ipsum dolor sit amet eiusmod adipis cing consec
                                teture elit sed dolor tempor dolor sit amet.
                            </p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Services;