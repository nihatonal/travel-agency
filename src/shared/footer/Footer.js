import React, { useContext } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import NavLinks from '../navigation/NavLinks';
import { countryData } from '../../assets/countryData';
import logo from '../../assets/images/logo.svg';
import { LanguageContext } from "../../shared/context/Language";
import './Footer.css';
function Footer(props) {
    const lang = useContext(LanguageContext);
    const sectionData = lang.dictionary["country_info"];
    return (
        <div className="footer">
            <div className="footer-wrapper">
                <div className="logo">
                    <img src={logo} alt='logo' className='logo' />
                </div>
                <div className="footer-motto">
                    <p>"Откройте для себя мир"</p>
                </div>
                <div className="footer-nav-links">
                    <h4>{lang.dictionary["footer_items"][0]}</h4>
                    <div className="footer-nav-link-items">
                        {sectionData.map((item, index) =>
                            <div className='footer-nav-link-item' key={item.country_id}>
                                <NavLink
                                    to={`/country/${item.country_id}`}
                                    state={[item, countryData[item.country_id][0].src]}
                                >{item.country}</NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div >
    );
}

export default Footer;