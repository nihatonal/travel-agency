import React, { useContext, useState, useEffect } from 'react';
import { LanguageContext } from "../context/Language";
import { useNavigate, useLocation } from "react-router-dom"
import { Link } from "react-scroll";

import './NavLinks.css';
function NavLinks(props) {
    const lang = useContext(LanguageContext);
    const navigate = useNavigate();
    const location = useLocation()
    const [active, setActive] = useState();

    useEffect(() => {
        var element = document.getElementById(active);
        if (element) {
            navigate("/")
            element.scrollIntoView({
                block: "start",
                behavior: "auto",
            });
        }
    }, [active, navigate, location.pathname])
    return (
        <div className={`navbar ${props.className}`}
            style={location.pathname === "/" ? { zIndex: 99, top: "0" } : { zIndex: -99, top: "-1000px" }}
        >
            {props.children}
            < div className={`mobile-nav-link ${props.sidebar_nav_item_wrapper}`} >
                <Link
                    className="nav-item"
                    activeClass="active-nav-item"
                    to="home"
                    spy={true}
                    smooth='easeInOutQuart'
                    offset={0}
                    duration={1550}
                    onClick={props.closeDrawer}
                >
                    {lang.dictionary["navlinks"][0]}
                </Link>
            </div >
            <div className={`mobile-nav-link ${props.sidebar_nav_item_wrapper}`}>
                <Link
                    className="nav-item"
                    activeClass="active-nav-item"
                    to="about"
                    spy={true}
                    smooth='easeInOutQuart'
                    offset={0}
                    duration={1550}
                    onClick={props.closeDrawer}
                >
                    {lang.dictionary["navlinks"][1]}
                </Link>
            </div>
            <div className={`mobile-nav-link ${props.sidebar_nav_item_wrapper}`} >
                <Link
                    className="nav-item"
                    activeClass="active-nav-item"
                    to="services"
                    spy={true}
                    smooth='easeInOutQuart'
                    offset={0}
                    duration={1550}
                    onClick={props.closeDrawer}
                >
                    {lang.dictionary["navlinks"][2]}
                </Link>
            </div>
            <div className={`mobile-nav-link ${props.sidebar_nav_item_wrapper}`}
                onClick={() => { setActive("countries") }}
            >
                <Link
                    className="nav-item"
                    activeClass="active-nav-item"
                    to="countries"
                    spy={true}
                    smooth='easeInOutQuart'
                    offset={0}
                    duration={1550}
                    onClick={() => { setActive("countries") }}
                >
                    {lang.dictionary["navlinks"][3]}
                </Link>
            </div>
            <div className={`mobile-nav-link ${props.sidebar_nav_item_wrapper}`} >
                <Link
                    className="nav-item"
                    activeClass="active-nav-item"
                    to="gallery"
                    spy={true}
                    smooth='easeInOutQuart'
                    offset={0}
                    duration={1550}
                    onClick={props.closeDrawer}
                >
                    {lang.dictionary["navlinks"][4]}
                </Link>
            </div>
            <div className={`mobile-nav-link ${props.sidebar_nav_item_wrapper}`} >
                <Link
                    className="nav-item"
                    activeClass="active-nav-item"
                    to="testimonials"
                    spy={true}
                    smooth='easeInOutQuart'
                    offset={0}
                    duration={1550}
                    onClick={props.closeDrawer}
                >
                    {lang.dictionary["navlinks"][5]}
                </Link>
            </div>
            <div className={`mobile-nav-link ${props.sidebar_nav_item_wrapper}`} >
                <Link
                    className="nav-item"
                    activeClass="active-nav-item"
                    to="contact"
                    spy={true}
                    smooth='easeInOutQuart'
                    offset={0}
                    duration={1550}
                    onClick={props.closeDrawer}
                >
                    {lang.dictionary["navlinks"][6]}
                </Link>
            </div>
        </div >
    );
}

export default NavLinks;