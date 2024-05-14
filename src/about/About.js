import React from 'react';
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import about_adv from '../assets/images/sandwallpaper.jpg'
import './About.css'
function About(props) {
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
        rootMargin: "0px",
    });
    return (
        <section id='about' className='section_container about-container' >
            <div className="about-wrapper">
                <div className="about-top-content">
                    <div className="about-content">
                        <h3 className='section_title '>A FEW WORDS ABOUT US</h3>
                        <span className='section-title-separator'></span>
                        <p className="about-desc">  
                            We are committed to offering travel services of the highest quality,
                            combining our energy and enthusiasm, with our years of experience.
                            Our greatest satisfaction comes in serving large numbers of satisfied
                            clients who have experienced the joys and inspiration of travel. Ever
                            since our travel agency was established, Fast Travel has concentrated
                            its efforts in producing quality travel, responding to the needs of the
                            times while anticipating the demands of the future.
                        </p>
                    </div>
                    <div className="about-image">
                        <img src={about_adv} alt="about_adv" />
                    </div>
                </div>
                <div className="about-bottom-content" ref={ref}>
                    <div className="about-bottom-content-item">
                        <h2 className="about-bottom-content-item-count">
                            <CountUp
                                redraw={inView}
                                separator=""
                                decimals={0}
                                decimal="," end={1125}
                            />
                        </h2>
                        <span className="about-bottom-content-item-separator"></span>
                        <h4 className="about-bottom-content-item-name">
                            Clients
                        </h4>
                    </div>
                    <div className="about-bottom-content-item">
                        <h2 className="about-bottom-content-item-count">
                            <CountUp
                                redraw={inView}
                                separator=""
                                decimals={0}
                                decimal="," end={2525}
                            />
                        </h2>
                        <span className="about-bottom-content-item-separator"></span>
                        <h4 className="about-bottom-content-item-name">
                            Hotels
                        </h4>
                    </div>
                    <div className="about-bottom-content-item">
                        <h2 className="about-bottom-content-item-count">
                            <CountUp
                                redraw={inView}
                                separator=""
                                decimals={0}
                                decimal="," end={625}
                            />
                        </h2>
                        <span className="about-bottom-content-item-separator"></span>
                        <h4 className="about-bottom-content-item-name">
                            Tours
                        </h4>
                    </div>
                    <div className="about-bottom-content-item">
                        <h2 className="about-bottom-content-item-count">
                            <CountUp
                                redraw={inView}
                                separator=""
                                decimals={0}
                                decimal="," end={525}
                            />
                        </h2>
                        <span className="about-bottom-content-item-separator"></span>
                        <h4 className="about-bottom-content-item-name">
                            SUPPORT
                        </h4>
                    </div>
                </div>

            </div>

        </section>
    );
}

export default About;