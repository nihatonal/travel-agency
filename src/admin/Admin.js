import React, { useState, useContext, useEffect } from 'react';

import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from '../shared/context/auth-context';
import Login from './components/Login';
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import ByCountryChart from './components/ByCountryChart';
import ByCityChart from './components/ByCityChart';
import ByYearChart from './components/ByYearChart';
import OutsideClickHandler from "../shared/util/OutsideClickHandler";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import "./Admin.css"

function Admin(props) {
    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();
    const [loadedTourists, setLoadedTourists] = useState([]);
    const [filter, setFilter] = useState("Стоимость")

    const [showYear, setShowYear] = useState(false);
    const [showFilter, setShowFilter] = useState(false)

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/tourists/gettourists"
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

            <label className={"option-item"}>
                {isChecked ?
                    <FaCheckCircle className={"active-check"}
                    /> :
                    <FaRegCheckCircle className={"inactive-check"} />}
                <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    checked={isChecked}
                    onChange={checkHandler}
                    className='checkbox'

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
                selected.map(topping => ({ ...topping, checked: false })) :
                selected.map(topping => ({ ...topping, checked: true }))
        )

    }, [all]);



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
                                <p className="select-label-option" onClick={() => setShowYear(!showYear)}>
                                    Year
                                    {!showYear ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
                                </p>

                                <div className="select-options"
                                    style={showYear ?
                                        { height: `144px` } :
                                        { height: "0" }
                                    }
                                >
                                    <label className={"option-item"} htmlFor={`checkbox-all`}>
                                        {!selected.map((item) => item.checked).includes(false) ?
                                            <FaCheckCircle className={"active-check"}
                                            /> :
                                            <FaRegCheckCircle className={"inactive-check"} />}
                                        <input
                                            type="checkbox"
                                            id={`checkbox-all`}
                                            checked={!selected.map((item) => item.checked).includes(false)}
                                            onChange={() => setAll(!all)}
                                            className='checkbox'

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
                        <div className="year_select_item filter_select">

                            <div className='select-container'

                            >
                                <span></span>
                                <span></span>
                                <p className="select-label">Filter</p>
                                <div></div>
                                <p className="select-label-option" onClick={() => setShowFilter(!showFilter)}>
                                    Filter
                                    {!showFilter ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
                                </p>

                                <div className="select-options"
                                    style={showFilter ?
                                        { height: `144px` } :
                                        { height: "0" }
                                    }
                                >
                                    {
                                        ["Стоимость", "Количество"].map((item, index) => (
                                            <OutsideClickHandler
                                                onOutsideClick={() => {
                                                    setShowFilter(false);
                                                }}
                                                key={item}
                                            >
                                                <label className={"option-item"}

                                                   >
                                                    {filter === item ?
                                                        <FaCheckCircle className={"active-check"}
                                                        /> :
                                                        <FaRegCheckCircle className={"inactive-check"} />}
                                                    <input
                                                        type="radio"
                                                        id={item}
                                                        value={item}
                                                        // id={`checkbox-${index}`}
                                                        checked={filter === item}
                                                        onChange={() => setFilter(item)}
                                                        className='checkbox'

                                                    />
                                                    {item}
                                                </label>
                                            </OutsideClickHandler>
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
                                    filtered={filter}
                                />
                            </div>
                            <div className="admin-home-page-item">
                                <ByCityChart data={loadedTourists}
                                    years={selected.filter(x => x.checked).map((item) => item.year)}
                                    filtered={filter}
                                />
                            </div>
                            <div className="admin-home-page-item">
                                <ByYearChart data={loadedTourists}
                                    years={selected.filter(x => x.checked).map((item) => item.year)}
                                    filtered={filter}
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