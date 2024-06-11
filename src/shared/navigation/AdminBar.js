import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/auth-context';
import { NavLink } from 'react-router-dom';
import Hamburger from './Hamburger';
import './AdminBar.css'
function AdminBar(props) {
    const auth = useContext(AuthContext);
    // const pathname = window.location.pathname;
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [active, setActive] = useState('home');

    const openDrawerHandler = () => {
        setDrawerIsOpen(!drawerIsOpen);
    };
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
            <div className="admin-menu-wrapper">
                <NavLink
                    className={active === "home" ? "admin-menu--item admin-menu--item-active" : "admin-menu--item "}
                    to="/admin"
                    onClick={() => {
                        setActive('home')
                        setDrawerIsOpen(false)
                    }}
                >
                    Home

                </NavLink>
                <NavLink
                    className={active === "touristlist" ? "admin-menu--item admin-menu--item-active" : "admin-menu--item "}
                    to="tourists/touristlist"
                    onClick={() => {
                        setDrawerIsOpen(false)
                        setActive('touristlist')
                    }}
                >
                    My Tourists

                </NavLink>
                <NavLink
                    className={active === "addtourist" ? "admin-menu--item admin-menu--item-active" : "admin-menu--item "}
                    to="/admin/tourists/addtourist"
                    onClick={() => {
                        setDrawerIsOpen(false)
                        setActive('addtourist')
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