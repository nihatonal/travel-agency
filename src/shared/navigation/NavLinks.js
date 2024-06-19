import React from 'react';
import { useLocation } from "react-router-dom"
import { Link } from "react-scroll";

import './NavLinks.css';
function NavLinks(props) {
    const location = useLocation()


    return (
        <div className={`navbar ${props.className}`}
            style={location.pathname === "/" ? { zIndex: 99, visibility: "visible" } : { zIndex: -99, visibility: "hidden" }}
        >
            {props.links.map((link) =>
                < div className={`mobile-nav-link ${props.sidebar_nav_item_wrapper}`} key={link.link_id} >
                    <Link
                        className="nav-item"
                        activeClass="active-nav-item"
                        to={link.link_id}
                        spy={true}
                        smooth='easeInOutQuart'
                        offset={0}
                        duration={1550}
                        onClick={props.closeDrawer}
                    >
                        {link.link}
                    </Link>
                </div >
            )}
            {/* < div className={`mobile-nav-link ${props.sidebar_nav_item_wrapper}`} >
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
            >
                <Link
                    className="nav-item"
                    activeClass="active-nav-item"
                    to="countries"
                    spy={true}
                    smooth='easeInOutQuart'
                    offset={0}
                    duration={1550}
                    onClick={() => {
                        setActive("countries");
                    }}
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
            </div> */}
        </div >
    );
}

export default NavLinks;