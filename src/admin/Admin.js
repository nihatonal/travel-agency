import React, { useState, useContext, useEffect } from 'react';

import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from '../shared/context/auth-context';
import Login from './components/Login';

import ByCountryChart from './components/ByCountryChart';
import ByCityChart from './components/ByCityChart';
import ByYearChart from './components/ByYearChart';
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import "./Admin.css"

function Admin(props) {
    const auth = useContext(AuthContext);
    const { isLoading, sendRequest } = useHttpClient();
    const [loadedTourists, setLoadedTourists] = useState([]);


    const [show, setShow] = useState(false);


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

            } catch (err) { }
        };
        fetchPlace();
    }, [sendRequest]);

    function compareNumbers(a, b) {
        return b - a;
    }
    const years = function (startYear) {
        var currentYear = new Date().getFullYear() + 1, years = [];
        startYear = startYear || 2023;
        while (startYear <= currentYear) {
            years.push(startYear++);
        }
        return years.sort(compareNumbers).map((item) => { return { year: item.toString(), checked: true } });
    }

    const allToppings = years(2023);

    const [selected, setSelected] = useState(allToppings);


    const [all, setAll] = useState(false);

    const Checkbox = ({ isChecked, label, checkHandler, index }) => {
        return (
            <label className="option-item" >
                <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    checked={isChecked}
                    onChange={checkHandler}

                />
                {label}
            </label>
        )
    };

    const updateCheckStatus = index => {
        setSelected(
            selected.map((topping, currentIndex) =>
                currentIndex === index
                    ? { ...topping, checked: !topping.checked }
                    : topping
            )
        );

    }


    useEffect(() => {

        setSelected(
            all ?
                selected.map(topping => ({ ...topping, checked: true })) :
                selected.map(topping => ({ ...topping, checked: false }))
        )

    }, [all])

    return (
        <div className="admin_container">
            <div className="admin-content-wrapper">
                <div className="admin-content">
                    <h3 className="admin-content-title">Wellcome!</h3>
                    <div className="year_select_wrapper">
                        <div className="year_select_item">

                            <div className='select-container'

                            >
                                <span></span>
                                <span></span>
                                <p className="select-label">Filter</p>
                                <div></div>
                                <p className="select-label-option" onClick={() => setShow(!show)}>
                                    Year
                                    {!show ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
                                </p>

                                <div className="select-options"
                                    style={show ?
                                        { height: `144px` } :
                                        { height: "0" }
                                    }
                                >
                                    <label className="option-item" htmlFor={`checkbox-all`}>
                                        <input
                                            type="checkbox"
                                            id={`checkbox-all`}
                                            checked={all}
                                            onChange={() => setAll(!all)}
                                        />
                                        All
                                    </label>
                                    {
                                        selected.map((year, index) => (
                                            <Checkbox
                                                key={year.year}
                                                isChecked={year.checked}
                                                checkHandler={() => updateCheckStatus(index)}
                                                label={year.year}
                                                index={index}
                                            />
                                        ))
                                    }
                                </div>
                            </div >
                        </div>
                    </div>

                    {loadedTourists.length >= 1 && <div className="admin-home-page">
                        <div className="admin-home-page-items">
                            <div className="admin-home-page-item">
                                <ByCountryChart data={loadedTourists}
                                    years={
                                        selected.filter(x => x.checked).map((item) => item.year)}
                                />
                            </div>
                            <div className="admin-home-page-item">
                                <ByCityChart data={loadedTourists}
                                    years={selected.filter(x => x.checked).map((item) => item.year)}
                                />
                            </div>
                            <div className="admin-home-page-item">
                                <ByYearChart data={loadedTourists}
                                    years={selected.filter(x => x.checked).map((item) => item.year)}
                                />
                            </div>
                            {/* <div className="admin-home-page-item">
                                <DestinationChartCountry data={loadedTourists} />
                            </div>
                            <div className="admin-home-page-item">
                                <DestinationChartCity data={loadedTourists} />
                            </div> */}
                            {/* <div className="admin-home-page-item">
                                <MonthsChart data={loadedTourists} label={years(2023)} />
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