import React from 'react';
import { NavLink } from 'react-router-dom';
import { useInView } from "react-intersection-observer";
import ReactCountryFlag from "react-country-flag";
import { countryData } from '../../assets/countryData';

import './CountriesMobile.css'
function CountriesMobile(props) {
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
        rootMargin: "0px",
    });
    return (
        <div className='countries-mobile-container'>
            <div className="countries-mobile-wrapper" ref={ref}>
                {props.data.map((item, index) =>
                    <div
                        className={inView ? "countries-mobile-item country-in" : "countries-mobile-item"}
                        id={item.country_id} key={item.country_id}
                        style={{ animationDelay: `${200 * index}ms` }}
                    >
                        <NavLink
                            className={'countries-mobile-item-link'}
                            to={`/country/${item.country_id}`}
                            state={[item, countryData[item.country_id][0].src]}
                        ></NavLink>

                        <h4 className="countries-mobile-item-title">
                            {item.country}
                        </h4>
                        <h3 className="countries-mobile-item-motta">
                            {item.country_motta}
                        </h3>
                        <ReactCountryFlag
                            className="emojiFlag"
                            countryCode={item.country_flag}
                            svg
                            style={{
                                width: "3em",
                                height: "3em",
                            }}
                        />
                    </div>

                )}
            </div>

        </div>
    );
}

export default CountriesMobile;