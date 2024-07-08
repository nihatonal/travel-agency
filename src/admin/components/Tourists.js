import React, { useEffect, useState, useContext } from 'react';
import { useHttpClient } from "../../shared/hooks/http-hook";
import PropagateLoader from "react-spinners/PropagateLoader";
import { NavLink, useNavigate } from 'react-router-dom';
import { GiMagnifyingGlass } from "react-icons/gi";
import { ShareContext } from '../../shared/context/share-context';
// import { FiPlusCircle } from "react-icons/fi";

import './Tourists.css';

function Tourists(props) {
    const share = useContext(ShareContext);
    const navigate = useNavigate();
    const { isLoading, sendRequest } = useHttpClient();
    const [loadedTourists, setLoaadedTourists] = useState([]);
    const [result, setResult] = useState([]);
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/tourists/gettourists"
                );
                setLoaadedTourists(responseData.tourists)

            } catch (err) { }
        };
        fetchPlace();
    }, [sendRequest]);



    useEffect(() => {
        const users = loadedTourists && loadedTourists.map((item) =>
            item.touristemail
        )
        setEmails(loadedTourists && users.filter((value, index, array) => array.indexOf(value) === index))
    }, [loadedTourists])
    useEffect(() => {
        const result_ = emails.map((email) =>
            loadedTourists.filter((item) => item.touristemail === email)
        )
        setResult(result_)
    }, [loadedTourists, emails]);

    const urlHandler = (x) => {
        share.AdminURL([
            { to: "/admin", toStr: "Home", active: "home" },
            { to: "/admin/touristlist", toStr: "/ Tourists List", active: "touristlist" },
            { to: "", toStr: `/ ${x.state[0]}`, active: "touristlist" }
        ])
        navigate(x.url, { state: x.state })
    }
    return (
        <div className="admin-content-wrapper">
            <div className="admin-content">
                <div className="admin-content-header">
                    <div className="admin-navbar">
                        <NavLink to='/admin' className={'admin-navbar-item'}>
                            Home /
                        </NavLink>
                        <NavLink to='' className={'admin-navbar-item'}>
                            &nbsp;Tourists
                        </NavLink>
                    </div>
                    <h3 className="admin-content-title">Tourists List</h3>
                </div>



                <div className='tourists-container'>
                    <div id="table-scroll" className="table-scroll">
                        {/* <img src={process.env.REACT_APP_ASSETS_URL + place.image} /> */}
                        {isLoading && loadedTourists ? <div className='loading-container'><PropagateLoader color={'#ff6a4fs'} /></div> :
                            <table className="main-table">
                                <thead>
                                    <tr>
                                        <th>Name Surname</th>
                                        <th>Last Destination</th>
                                        <th>Last Otel</th>
                                        <th>Last Date</th>
                                        <th>Last Price</th>
                                        <th>Tours</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result && result.map((item) =>
                                        <tr key={item[0].id} className='tourist-row' onClick={() => urlHandler({ url: `/admin/touristlist/${item[0].touristemail}`, state: [item[0].touristname, item[0].touristemail, item[0].touristphone] })}>

                                            <td>{item[0].touristname}</td>
                                            <td>{item[0].city}</td>
                                            <td>{item[0].otel}</td>
                                            <td>{item[0].date}</td>
                                            <td>{item[0].cost}</td>
                                            <td>{item.length}</td>


                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>

        </div >
    );
}

export default Tourists;