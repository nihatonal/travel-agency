import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth-context';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShareContext } from '../context/share-context';
import Hamburger from './Hamburger';
import './AdminBar.css'
function AdminBar(props) {
    const auth = useContext(AuthContext);
    const share = useContext(ShareContext);
    const navigate = useNavigate();
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [active, setActive] = useState('home');


    const openDrawerHandler = () => {
        setDrawerIsOpen(!drawerIsOpen);
    };

    // function capitalizeFirstLetter(string) {
    //     return string.charAt(0).toUpperCase() + string.slice(1);
    // }



    // useEffect(() => {
    //     setNavbarItems(
    //         active === "home" ? [{ to: "/admin", toStr: "Home", active: "home" }] :
    //             active === "touristlist" ? [{ to: "/admin", toStr: "Home", active: "home" }, { to: "/admin/touristlist", toStr: "/ Tourists List", active: "touristlist" }] :
    //                 active === "addtourist" ? [{ to: "/admin", toStr: "Home", active: "home" }, { to: "/admin/addtourist", toStr: "/ Add Tour", active: "addtourist" }] :
    //                     []

    //     )

    // }, [active])

    return (
        <div className={drawerIsOpen ? "admin-menu-container admin-menu-open" : "admin-menu-container"}
            style={!auth.isLoggedIn ? {
                display: "none"
            } : null}
        >
            <Hamburger
                show={drawerIsOpen}
                onClick={openDrawerHandler}
            />
            <div className="admin-mobile-navbar">
                {/* <NavLink to='/admin' className={'admin-mobile-navbar-item'} onClick={() => setActive("home")}>Home </NavLink> */}
                {share.adminURL.map((item) =>
                    <p key={item.to}
                        onClick={() => {
                            setActive(item.active)
                            share.AdminURL(
                                item.active === "home" ?
                                    [
                                        { to: "/admin", toStr: "Home", active: "home" },
                                    ] :
                                    item.active === "touristlist" ?
                                        [
                                            { to: "/admin", toStr: "Home", active: "home" },
                                            { to: "/admin/touristlist", toStr: "/ Tourists List", active: "touristlist" }
                                        ] :
                                        item.active === "addtourist" ?
                                            [{ to: "/admin", toStr: "Home", active: "home" }, { to: "/admin/addtourist", toStr: "/ Add Tour", active: "addtourist" }] :
                                            []

                            )
                            navigate(item.to)
                        }}
                        className={'admin-mobile-navbar-item'}

                    >
                        {item.toStr}&nbsp;
                    </p>
                )}
            </div>
            <div className="admin-menu-wrapper">
                <NavLink
                    className={active === "home" ? "admin-menu--item admin-menu--item-active" : "admin-menu--item "}
                    to="/admin"
                    // state={["Touristlist"]}
                    onClick={() => {
                        setActive('home')
                        setDrawerIsOpen(false)
                    }}
                >
                    Home

                </NavLink>
                <NavLink
                    className={active === "touristlist" ? "admin-menu--item admin-menu--item-active" : "admin-menu--item "}
                    to="admin/touristlist"
                    // state={["Touristlist"]}
                    onClick={() => {
                        setDrawerIsOpen(false)
                        setActive('touristlist')
                        share.AdminURL([
                            { to: "/admin", toStr: "Home", active: "home" },
                            { to: "/admin/touristlist", toStr: "/ Tourists List", active: "touristlist" }
                        ])
                    }}
                >
                    My Tourists

                </NavLink>
                <NavLink
                    className={active === "addtourist" ? "admin-menu--item admin-menu--item-active" : "admin-menu--item "}
                    to="/admin/addtourist"
                    // state={["Add Tourist"]}
                    onClick={() => {
                        setDrawerIsOpen(false)
                        setActive('addtourist')
                        share.AdminURL([{ to: "/admin", toStr: "Home", active: "home" }, { to: "/admin/addtourist", toStr: "/ Add Tour", active: "addtourist" }])
                    }}
                >
                    Add Tour

                </NavLink>
                {auth.isLoggedIn && <NavLink
                    className='admin-menu--item logout-btn'
                    onClick={() => {
                        setDrawerIsOpen(false)
                        auth.logout()
                    }}
                    to='/admin'

                > Logout</NavLink>}
            </div>

        </div >
    );
}

export default AdminBar;