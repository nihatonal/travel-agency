import React, { useEffect, useContext } from 'react';
import { useLocation, NavLink } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { countryData } from '../../assets/countryData';
import { LanguageContext } from "../../shared/context/Language";
import './CountryCard.css'
function CountryCard(props) {
    const lang = useContext(LanguageContext);
    const heroData = lang.dictionary["country_card_info"];
    const { country, country_id, country_motta, country_info, country_flag, sections } = useLocation().state[0];
    const image = useLocation().state[1];
    const location = useLocation()
    //split(/\r?\n|\r|\n/g)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className='country-card-container'>
            <div className="country-car-wrapper">
                <div className="country-card-header"
                    style={{ backgroundImage: `url(${image})` }}
                >
                    <div className="country-card-header-content">
                        <NavLink to='/'>{lang.dictionary["navlinks"][0].link}</NavLink>
                        <h2 className="country-card-header-title">{country_motta}</h2>
                        <div className="country-card-header-navbar">

                            <NavLink to='/'>{lang.dictionary["navlinks"][3].link}</NavLink>
                            <p>&nbsp;/&nbsp;{country}</p>
                        </div>
                        <div className="country_card_info">
                            <p><span>{heroData[0]}</span>:&nbsp;{country_info.location}</p>
                            <p><span>{heroData[1]}</span>:&nbsp;{country_info.capital}</p>
                            <p><span>{heroData[2]}</span>:&nbsp;{country_info.currency}</p>
                            <p><span>{heroData[3]}</span>:&nbsp;{country_info.time_zone}</p>
                        </div>
                        <ReactCountryFlag
                            className="emojiFlag"
                            countryCode={country_flag}
                            svg
                            style={{
                                width: "2em",
                                height: "2em",
                            }}
                        />
                    </div>
                </div>
                <div className="country-card-contents">
                    {sections.map((item, index) =>
                        <div className="country-card-content-item" key={item.section_title}>
                            <div className="country-card-content-item-image">
                                <img src={countryData[country_id][index + 1].src} alt="" />
                            </div>

                            <h3 className=''>{item.section_title}</h3>
                            <p>{item.section_desc}</p>
                        </div>
                    )}


                </div>

            </div>
        </div>
    );
}

export default CountryCard;