import React, { useContext } from 'react';
import { LanguageContext } from "../context/Language";

import { Link } from "react-scroll";

import './NavLinks.css';
function NavLinks(props) {
    const lang = useContext(LanguageContext);

    return (
        <div className={`navbar ${props.className}`} style={props.style}>
            {props.children}
            {/* <div className={props.sidebar_nav_item_wrapper} onClick={props.closeDrawer}>
                <NavLink
                    className={active === 'home' ? "nav-item active-nav-item" : "nav-item"}
                    to=""
                    onClick={() => scrollSmoothTo('home')}
                >
                    {lang.dictionary["navlinks"][0]}
                </NavLink>

            </div> */}
            <div className={props.sidebar_nav_item_wrapper} onClick={props.closeDrawer}>
                <Link
                    className="nav-item"
                    activeClass="active-nav-item"
                    to="home"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={750}
                >
                    {lang.dictionary["navlinks"][0]}
                </Link>
            </div>
            <div className={props.sidebar_nav_item_wrapper} onClick={props.closeDrawer}>
                <Link
                    className="nav-item"
                    activeClass="active-nav-item"
                    to="about"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={750}
                >
                    {lang.dictionary["navlinks"][1]}
                </Link>
            </div>
            <div className={props.sidebar_nav_item_wrapper} onClick={props.closeDrawer}>
                <Link
                    className="nav-item"
                    activeClass="active-nav-item"
                    to="services"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={750}
                >
                    {lang.dictionary["navlinks"][2]}
                </Link>
            </div>
            <div className={props.sidebar_nav_item_wrapper} onClick={props.closeDrawer}>
                <Link
                    className="nav-item"
                    activeClass="active-nav-item"
                    to="gallery"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={750}
                >
                    {lang.dictionary["navlinks"][3]}
                </Link>
            </div>
            <div className={props.sidebar_nav_item_wrapper} onClick={props.closeDrawer}>
                <Link
                    className="nav-item"
                    activeClass="active-nav-item"
                    to="testimonials"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={750}
                >
                    {lang.dictionary["navlinks"][4]}
                </Link>
            </div>
            <div className={props.sidebar_nav_item_wrapper} onClick={props.closeDrawer}>
                <Link
                    className="nav-item"
                    activeClass="active-nav-item"
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={750}
                >
                    {lang.dictionary["navlinks"][5]}
                </Link>
            </div>


            {/* <div className={props.sidebar_nav_item_wrapper} onClick={props.closeDrawer}>
                <NavLink
                    className={active === 'about' ? "nav-item active-nav-item" : "nav-item"}
                    to=""
                    onClick={() => scrollSmoothTo('about')}
                >
                    {lang.dictionary["navlinks"][1]}
                </NavLink>

            </div> */}
            {/* <div className={props.sidebar_nav_item_wrapper} onClick={props.closeDrawer}>

                <NavLink
                    className={active === 'services' ? "nav-item active-nav-item" : "nav-item"}
                    to=""
                    onClick={() => scrollSmoothTo('services')}
                >
                    {lang.dictionary["navlinks"][2]}
                </NavLink>
            </div>
            <div className={props.sidebar_nav_item_wrapper} onClick={props.closeDrawer}>
                <NavLink
                    className={active === 'gallery' ? "nav-item active-nav-item" : "nav-item"}
                    to=""
                    onClick={() => scrollSmoothTo('gallery')}
                >
                    {lang.dictionary["navlinks"][3]}
                </NavLink>
            </div>
            <div className={props.sidebar_nav_item_wrapper} onClick={props.closeDrawer}>
                <NavLink
                    className={active === 'testimonials' ? "nav-item active-nav-item" : "nav-item"}
                    to=""
                    onClick={() => scrollSmoothTo('testimonials')}
                >
                    {lang.dictionary["navlinks"][4]}
                </NavLink>
            </div>
            <div className={props.sidebar_nav_item_wrapper} onClick={props.closeDrawer}>
                <NavLink
                    className={active === 'contact' ? "nav-item active-nav-item" : "nav-item"}
                    to=""
                    onClick={() => scrollSmoothTo('contact')}
                >
                    {lang.dictionary["navlinks"][5]}
                </NavLink>
            </div> */}

        </div >
    );
}

export default NavLinks;