import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import NavLinks from './NavLinks';
import logo from '../../assets/images/logo.png'
import Hamburger from './Hamburger';
import SideDrawer from './SideDrawer';
import Backdrop from '../UI/Backdrop';
import SocialBar from './SocialBar';

import './MainNavigation.css';
function MainNavigation(props) {
    const navigate = useNavigate();
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const openDrawerHandler = () => {
        setDrawerIsOpen(!drawerIsOpen);
    };
    const closeDrawerHandler = (e) => {
        e.preventDefault();
        setDrawerIsOpen(false);
    };

    useEffect((_) => {
        const handleScroll = (_) => {
            if (window.pageYOffset > 90) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return (_) => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <div className={scrolled ? 'header header_scroll' : 'header '}
            style={drawerIsOpen ? { backgroundColor: "#fff" } : null}
        >


            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
            {/* {
                <SideDrawer show={drawerIsOpen}
                    style={{ top: '80px', paddingTop: '100px' }}
                >
                    <NavLinks
                        sidebar_nav_item_wrapper='sidedrawer-navlink_wrapper'
                        className={'sidedrawer-navlinks'}
                        onClick={props.onClick}
                        closeDrawer={closeDrawerHandler}
                    />
                    
                </SideDrawer>
            } */}

            <div className={drawerIsOpen ? 'main_header main_header-mobile' : 'main_header'}
            // style={drawerIsOpen ? { height: "380px" } : { height: "40px" }}
            >
                <Hamburger
                    show={drawerIsOpen}
                    onClick={openDrawerHandler}
                />
                <NavLink onClick={() => {
                    setDrawerIsOpen(true);
                }} className='logo-wrapper'>
                    <img src={logo} alt='logo' className='logo' />
                </NavLink>

                <NavLinks closeDrawer={() => {
                    setDrawerIsOpen(false);
                }} />

            </div>

        </div >
    );
}

export default MainNavigation;