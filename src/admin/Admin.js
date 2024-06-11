import React, { useState, useContext, useEffect } from 'react';

import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from '../shared/context/auth-context';
import Login from './components/Login';
import BasicSelect from '../shared/components/BasicSelect';
import DestinationChartCountry from './components/DestinationChartCountry';
import DestinationChartCity from './components/DestinationChartCity';
import Destinations from './components/Destinations';
import MonthsChart from './components/MonthsChart';
import "./Admin.css"

function Admin(props) {
    const auth = useContext(AuthContext);
    const { isLoading, sendRequest } = useHttpClient();
    const [loadedTourists, setLoadedTourists] = useState([]);
    const [filteredData, setFilteredData] = useState([])
    const [year, setYear] = useState();
    const [yearData, setYeardata] = useState([])

    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }
    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/tourists/gettourists`
                );
                setLoadedTourists(responseData.tourists);
                setFilteredData(responseData.tourists);
                setYeardata(["All"].concat(responseData.tourists.map((item) => item.date.slice(0, 4)).filter(onlyUnique).sort()));
            } catch (err) { }
        };
        fetchPlace();
    }, [sendRequest]);


    const handleChange = (event) => {
        event.preventDefault();
        setYear(event.target.id);
        const filter = filteredData.filter((item) => item.date.slice(0, 4) === event.target.id);
        if (event.target.id === "All") {
            setLoadedTourists(filteredData)
        } else {
            setLoadedTourists(filter)
        }

    };

    return (
        <div className="admin_container">
            <div className="admin-content-wrapper">
                <div className="admin-content">
                    <h3 className="admin-content-title">Wellcome!</h3>
                    <div className="year_select_wrapper">
                        <div className="year_select_item">
                            <BasicSelect
                                data={yearData}
                                label="Year"
                                onClick={handleChange}
                                value={year}
                            />
                        </div>
                    </div>

                    {loadedTourists.length >= 1 && <div className="admin-home-page">
                        <div className="admin-home-page-items">
                        <div className="admin-home-page-item">
                                <Destinations data={loadedTourists} />
                            </div>
                            {/* <div className="admin-home-page-item">
                                <DestinationChartCountry data={loadedTourists} />
                            </div>
                            <div className="admin-home-page-item">
                                <DestinationChartCity data={loadedTourists} />
                            </div>
                            <div className="admin-home-page-item">
                                <MonthsChart data={loadedTourists} label={year} />
                            </div> */}
                        </div>
                    </div>}
                    <Login />
                </div>
            </div>
        </div >
    );
}

export default Admin;