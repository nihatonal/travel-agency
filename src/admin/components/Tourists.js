import React, { useEffect, useState } from 'react';
import { useHttpClient } from "../../shared/hooks/http-hook";
import PropagateLoader from "react-spinners/PropagateLoader";
import { NavLink } from 'react-router-dom';
import { GiMagnifyingGlass } from "react-icons/gi";
import { FiPlusCircle } from "react-icons/fi";
import './Tourists.css';

function Tourists(props) {
    const { isLoading, sendRequest } = useHttpClient();
    const [loadedTourists, setLoaadedTourists] = useState([]);
    const [result, setResult] = useState([]);
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/tourists/gettourists`
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
    }, [loadedTourists, emails])
    return (
        <div className="admin-content-wrapper">
            <div className="admin-content">
                <h3 className="admin-content-title">Tourists List</h3>


                <div className='tourists-container'>
                    <div id="table-scroll" className="table-scroll">
                        {/* <img src={process.env.REACT_APP_ASSETS_URL + place.image} /> */}
                        {isLoading && loadedTourists ? <PropagateLoader /> :
                            <table className="main-table">
                                <thead>
                                    <tr>
                                        <th>Name Surname</th>
                                        <th>Last Destination</th>
                                        <th>Last Otel</th>
                                        <th>Last Date</th>
                                        <th>Last Price</th>
                                        <th>Tours</th>
                                        <th><GiMagnifyingGlass /></th>
                                        <th><FiPlusCircle /></th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {result && result.map((item) =>
                                        <tr key={item[0].id}>
                                            <td>{item[0].touristname}</td>
                                            <td>{item[0].city}</td>
                                            <td>{item[0].otel}</td>
                                            <td>{item[0].date}</td>
                                            <td>{item[0].cost}</td>
                                            <td>{item.length}</td>
                                            <td className='details-btn'>
                                                <NavLink to={`/tourists/${item[0].touristemail}`}>
                                                    <GiMagnifyingGlass />
                                                </NavLink>
                                            </td>
                                            <td className='details-btn'>
                                                <NavLink
                                                    to="/admin/tourists/addtourist"
                                                    state={[item[0].touristname, item[0].touristemail, item[0].touristphone]}


                                                >
                                                    <FiPlusCircle />
                                                </NavLink>
                                            </td>
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