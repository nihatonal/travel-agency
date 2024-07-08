import React, { useEffect, useState } from 'react';
import { useInView } from "react-intersection-observer";
import { useHttpClient } from "../../shared/hooks/http-hook";
import moment from 'moment';
import SimpleSlider from '../../shared/UI/SimpleSlider';

import './Testimonials.css'
function Testimonials(props) {
    const { sendRequest } = useHttpClient();
    const [loadedTourists, setLoadedTourists] = useState([]);
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
        rootMargin: "0px",
    });

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/tourists/gettourists"
                );
                setLoadedTourists(responseData.tourists);
            } catch (err) { }
        };
        fetchPlace();
    }, [sendRequest]);


    return (
        <section id='testimonials' className="section_container">
            <div className="section_wrapper" ref={ref}>
                <h3 className='section_title'>
                    Testimonials
                    <span className='section-suptitle'>CLIENT SAY</span>
                    <span className='section-title-separator'></span>
                </h3>
                <div className="testimonials-content-wrapper">
                    <div className="testimonials-contents" >
                        <SimpleSlider>

                            {loadedTourists && loadedTourists.map((item) =>
                                <div className="testimonials-content-item" key={item.id}>
                                    <div className='testimonials-content-item-wrapper'>
                                        <img src={process.env.REACT_APP_ASSETS_URL + `${item.image}`} alt='profil' />
                                        <p className='testimonials-content-item-comment'>
                                            {item.comment}
                                        </p>
                                        <p className="testimonials-content-item-author">
                                            {item.touristname}
                                        </p>
                                        <p className="testimonials-content-item-location">
                                            {item.country} / {item.city}
                                        </p>
                                        <p className="testimonials-content-item-date">
                                            {moment(new Date(item.date)).format("MMMM / YYYY")}
                                        </p>
                                    </div>


                                </div>
                            )}
                        </SimpleSlider>
                    </div>
                    {loadedTourists.length > 1 && loadedTourists.length > 1 && loadedTourists.sort(() => .5 - Math.random()).slice(0, 9).map((item) =>
                        <div className={inView ? "testimonials-bg-item bg_img-in" : "testimonials-bg-item"}
                        // style={{ animationDelay: "550ms" }}
                        >
                            <img src={process.env.REACT_APP_ASSETS_URL + `${item.image}`} alt={`${item.touristname}`} />
                        </div>
                    )}
                    {/* <div className={inView ? "testimonials-bg-item bg_img-in" : "testimonials-bg-item"}
                        style={{ animationDelay: "1150ms" }}
                    >
                        <img src={process.env.REACT_APP_ASSETS_URL + `${loadedTourists.lenght > 1 && loadedTourists[numbers[0]].image}`} alt={`${loadedTourists.lenght > 1 && loadedTourists[0].touristname}`} />
                    </div>
                    <div className={inView ? "testimonials-bg-item bg_img-in" : "testimonials-bg-item"}
                        style={{ animationDelay: "550ms" }}
                    >
                        <img src={process.env.REACT_APP_ASSETS_URL + `${loadedTourists.lenght > 1 && loadedTourists[numbers[1]].image}`} alt={`${loadedTourists.lenght > 1 && loadedTourists[0].touristname}`} />
                    </div>
                    <div className={inView ? "testimonials-bg-item bg_img-in" : "testimonials-bg-item"}
                        style={{ animationDelay: "850ms" }}
                    >
                        <img src={process.env.REACT_APP_ASSETS_URL + `${loadedTourists.lenght > 1 && loadedTourists[numbers[2]].image}`} alt={`${loadedTourists.lenght > 1 && loadedTourists[0].touristname}`} />
                    </div>
                    <div className={inView ? "testimonials-bg-item bg_img-in" : "testimonials-bg-item"}
                        style={{ animationDelay: "550ms" }}
                    >
                        <img src={process.env.REACT_APP_ASSETS_URL + `${loadedTourists.lenght > 1 && loadedTourists[numbers[3]].image}`} alt={`${loadedTourists.lenght > 1 && loadedTourists[0].touristname}`} />
                    </div>
                    <div className={inView ? "testimonials-bg-item bg_img-in" : "testimonials-bg-item"}
                        style={{ animationDelay: "450ms" }}
                    >
                        <img src={process.env.REACT_APP_ASSETS_URL + `${loadedTourists.lenght > 1 && loadedTourists[numbers[4]].image}`} alt={`${loadedTourists.lenght > 1 && loadedTourists[0].touristname}`} />
                    </div>
                    <div className={inView ? "testimonials-bg-item bg_img-in" : "testimonials-bg-item"}
                        style={{ animationDelay: "950ms" }}
                    >
                        <img src={process.env.REACT_APP_ASSETS_URL + `${loadedTourists.lenght > 1 && loadedTourists[numbers[5]].image}`} alt={`${loadedTourists.lenght > 1 && loadedTourists[0].touristname}`} />
                    </div>
                    <div className={inView ? "testimonials-bg-item bg_img-in" : "testimonials-bg-item"}
                        style={{ animationDelay: "350ms" }}
                    >
                        <img src={process.env.REACT_APP_ASSETS_URL + `${loadedTourists.lenght > 1 && loadedTourists[numbers[6]].image}`} alt={`${loadedTourists.lenght > 1 && loadedTourists[0].touristname}`} />
                    </div>
                    <div className={inView ? "testimonials-bg-item bg_img-in" : "testimonials-bg-item"}
                        style={{ animationDelay: "1350ms" }}
                    >
                        <img src={process.env.REACT_APP_ASSETS_URL + `${loadedTourists.lenght > 1 && loadedTourists[numbers[7]].image}`} alt={`${loadedTourists.lenght > 1 && loadedTourists[0].touristname}`} />
                    </div> */}

                </div>
            </div>
        </section >
    );
}

export default Testimonials;