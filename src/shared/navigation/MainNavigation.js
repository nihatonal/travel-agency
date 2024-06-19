import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import NavLinks from './NavLinks';
import { LanguageContext } from "../context/Language";
import logo from '../../assets/images/logo.svg';
import Hamburger from './Hamburger';
// import SideDrawer from './SideDrawer';
import Backdrop from '../UI/Backdrop';
// import SocialBar from './SocialBar';

import './MainNavigation.css';
function MainNavigation(props) {
    const lang = useContext(LanguageContext);
    const links = lang.dictionary["navlinks"];
    const navigate = useNavigate();
    const location = useLocation()
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = window.location.pathname;
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
    }, [active, navigate, location.pathname]);


    return (
        <>{pathname !== "" ?
            <div className={scrolled || drawerIsOpen ? 'header header_scroll' : 'header '}
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

                    }} className='logo-wrapper'
                    >
                        <img src={logo} alt='logo' className='logo' />
                    </NavLink>

                    <NavLinks closeDrawer={() => {
                        setDrawerIsOpen(false);
                        navigate('/', { state: { id: "countries" } });
                        setActive("countries");

                    }}
                        links={links}
                    />

                </div>

            </div> : null
        }

        </>
    );
}

export default MainNavigation;