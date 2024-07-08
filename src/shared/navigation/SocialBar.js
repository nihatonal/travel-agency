import React from 'react';
import { FaFacebookF } from "react-icons/fa";

import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { SlSocialVkontakte } from "react-icons/sl";
import './SocialBar.css';
function SocialBar(props) {
    return (
        <div className={`socialbar-container ${props.className}`}>
            <div className="socialbar_wrapper">
                <span></span>
                <a href="https://www.facebook.com/ugurdinc09/?mibextid=ZbWKwL" rel="noreferrer" target='_blank' className="social-item">
                    <FaFacebookF />
                </a>
                <span></span>
                <a href="https://instagram.com/monihomesfethiye?igshid=MzNlNGNkZWQ4Mg==" rel="noreferrer" target='_blank' className="social-item">
                    <FaInstagram />
                </a>
                <span></span>
                <a href="https://vk.com/dincugr" rel="noreferrer" target='_blank' className="social-item">
                    <SlSocialVkontakte />
                </a>
                <span></span>
                <a href={`https://api.whatsapp.com/send?phone=79651991188`} rel="noreferrer" target='_blank' className="social-item">
                    <FaWhatsapp />
                </a>
                <span></span>

            </div>

        </div>
    );
}

export default SocialBar;