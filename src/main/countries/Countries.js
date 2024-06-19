import React, { useContext } from 'react';
import { NavLink } from "react-router-dom"
import { LanguageContext } from "../../shared/context/Language";
import { countryData } from '../../assets/countryData';
import CountriesMobile from './CountriesMobile';
import { useInView } from "react-intersection-observer";
import './Countries.css';
function Countries(props) {
    const lang = useContext(LanguageContext);
    const sectionData = lang.dictionary["country_info"];

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
        rootMargin: "0px",
    });

    return (
        <div id='countries' className='section_container countries-container'>
            <div className="section-wrapper">
                <h3 className='section_title'>
                    Where to go!
                    <span className='section-suptitle'>Countries</span>
                    <span className='section-title-separator'></span>
                </h3>
                <div className="countries-wrapper" ref={ref}>
                    <div className="row">
                        <CountriesMobile data={sectionData} />
                        <div className="column">
                            {sectionData.slice(0, Math.round(sectionData.length / 3)).map((item, index) =>
                                <div
                                    className={inView ? "countries-item country-in" : "countries-item"}
                                    key={item.country_id + index}
                                    style={{ animationDelay: `${250 * index}ms` }}
                                >
                                    <div className="country_img_wrapper">
                                        <img src={countryData[item.country_id][1].src} alt={item.country} />
                                    </div>


                                    <h5 className="countries-item-title">{item.country}</h5>
                                    <h4 className="countries-item-motto">{item.country_motta}</h4>
                                    <p className="countries-item-info">
                                        {item.sections[0].section_desc.slice(0, randomInteger(300, 350))}...
                                    </p>
                                    <NavLink
                                        to={`/country/${item.country_id}`}
                                        state={[item, countryData[item.country_id][0].src]}
                                    >Read More</NavLink>
                                </div>
                            )}
                        </div>
                        <div className="column">
                            {sectionData.slice(Math.round(sectionData.length / 3), Math.round(sectionData.length / 3) * 2).map((item, index) =>
                                <div
                                    className={inView ? "countries-item country-in" : "countries-item"}
                                    key={item.country_id + index}
                                    style={{ animationDelay: `${250 * index}ms` }}

                                >
                                    <div className="country_img_wrapper">
                                        <img src={countryData[item.country_id][1].src} alt={item.country} />
                                    </div>
                                    <h5 className="countries-item-title">{item.country}</h5>
                                    <h4 className="countries-item-motto">{item.country_motta}</h4>
                                    <p className="countries-item-info">
                                        {item.sections[0].section_desc.slice(0, randomInteger(200, 300))}...
                                    </p>
                                    <NavLink
                                        to={`/country/${item.country_id}`}
                                        state={[item, countryData[item.country_id][0].src]}
                                    >Read More</NavLink>
                                </div>
                            )}
                        </div>
                        <div className="column">
                            {sectionData.slice((Math.round(sectionData.length / 3) * 2), sectionData.length).map((item, index) =>
                                <div
                                    className={inView ? "countries-item country-in" : "countries-item"}
                                    key={item.country_id + index}
                                    style={{ animationDelay: `${250 * index}ms` }}
                                >
                                    <div className="country_img_wrapper">
                                        <img src={countryData[item.country_id][1].src} alt={item.country} />
                                    </div>
                                    <h5 className="countries-item-title">{item.country}</h5>
                                    <h4 className="countries-item-motto">{item.country_motta}</h4>
                                    <p className="countries-item-info">
                                        {item.sections[0].section_desc.slice(0, randomInteger(300, 400))}...
                                    </p>
                                    <NavLink
                                        to={`/country/${item.country_id}`}
                                        state={[item, countryData[item.country_id][0].src]}
                                    >Read More</NavLink>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Countries;