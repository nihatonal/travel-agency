import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Input from '../../shared/components/Input';
import { AuthContext } from '../../shared/context/auth-context';
import { useParams } from 'react-router-dom';
import DropdownList from "react-widgets/DropdownList";
import {
    VALIDATOR_REQUIRE
} from "../../shared/util/validators.js";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import PropagateLoader from "react-spinners/PropagateLoader";
import { LanguageContext } from "../../shared/context/Language";
import { FaArrowLeftLong } from "react-icons/fa6";
import './UpdateTourist.css';

function UpdateTourist(props) {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const lang = useContext(LanguageContext);
    const { isLoading, sendRequest } = useHttpClient();
    const touristId = useParams().tid;
    const [loadedTourist, setLoadedTourist] = useState({});
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const sectionData = lang.dictionary["country_info"];
    const resorts = lang.dictionary["resorts"];

    const [formState, inputHandler, setFormData] = useForm(
        {
            otel: {
                value: "",
                isValid: false,
            },
            date: {
                value: "",
                isValid: false,
            },
            cost: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/tourists/${touristId}`
                );
                setLoadedTourist(responseData.tourist);
                setCountry({ id: sectionData.filter((item) => item.country === responseData.tourist.country)[0].country_id, country: responseData.tourist.country })
                setCity(responseData.tourist.city);

                setFormData(
                    {
                        otel: {
                            value: responseData.tourist.otel,
                            isValid: true,
                        },
                        date: {
                            value: responseData.tourist.date,
                            isValid: true,
                        },
                        cost: {
                            value: responseData.tourist.cost,
                            isValid: true,
                        },
                    },
                    true
                );
            } catch (err) { }
        };
        fetchPlace();
    }, [sendRequest, touristId, setFormData]);



    const updateTourist = async (e) => {
        e.preventDefault();
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + `/tourists/updatetourist/${touristId}`,
                // `http://localhost:5000/api/tourists/updatetourist/${touristId}`,
                'PATCH',
                JSON.stringify({
                    country: country.country,
                    country_id: country.id,
                    city: city,
                    otel: formState.inputs.otel.value,
                    date: formState.inputs.date.value,
                    cost: formState.inputs.cost.value
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            navigate(`/admin/touristlist/${loadedTourist.touristemail}`);
        } catch (err) { }
    };


    return (
        <React.Fragment>
            {loadedTourist.country ?
                <div className="admin-content-wrapper">
                    <NavLink to={`/admin/touristlist/${loadedTourist.touristemail}`
                        // state = { [location.state[0], location.state[1], location.state[2]]}
                    } className='back_arrow'>
                        <FaArrowLeftLong />
                    </NavLink>
                    <div className="admin-content">
                        <h3 className="admin-content-title">Update Tour</h3>
                        <div className='create-tourist-container'>
                            <div className="update-tourist-wrapper">


                                <form onSubmit={updateTourist}>
                                    <DropdownList

                                        dataKey="id"
                                        defaultValue={loadedTourist.country}
                                        textField="country"
                                        value={country}
                                        onChange={(nextValue) => {
                                            setCity(resorts.filter((item) => item.resort_id === nextValue.id)[0].resorts[0])
                                            setCountry(nextValue)
                                        }}
                                        data={sectionData.map((country) => {
                                            return {
                                                id: country.country_id
                                                , country: country.country
                                            }
                                        })}
                                    />
                                    <div>
                                        <span className='select_label'>City</span>
                                        <DropdownList
                                            dataKey="id"
                                            defaultValue={loadedTourist.city}
                                            value={city}
                                            onChange={(nextValue) => setCity(nextValue)}

                                            data={resorts.filter((item) => item.resort_id === country.id)[0].resorts}
                                        />
                                    </div>
                                    <Input
                                        id="otel"
                                        element="input"
                                        type="text"
                                        label='Otel Info'
                                        placeholder="Please write otel name"
                                        validators={[VALIDATOR_REQUIRE()]}
                                        onInput={inputHandler}
                                        initialValue={loadedTourist.otel}
                                        initialValid={true}
                                    />
                                    <Input
                                        id="date"
                                        element="input"
                                        type="month"
                                        label='Date Info'
                                        placeholder="Please write date of holiday"
                                        validators={[VALIDATOR_REQUIRE()]}
                                        onInput={inputHandler}
                                        initialValue={loadedTourist.date}
                                        initialValid={true}
                                    />
                                    <Input
                                        id="cost"
                                        element="input"
                                        type="text"
                                        label='Price'
                                        placeholder="Please write cost of holiday"
                                        validators={[VALIDATOR_REQUIRE()]}
                                        onInput={inputHandler}
                                        initialValue={loadedTourist.cost}
                                        initialValid={true}
                                    />
                                    <button
                                        type="submit"
                                        className="create-btn"
                                        disabled={!formState.isValid}
                                    >
                                        {isLoading ?
                                            <PropagateLoader
                                                color={'white'}
                                                loading={true}
                                                cssOverride={''}
                                                size={4}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            /> :
                                            'Update'}
                                    </button>
                                </form>


                            </div>
                            {/* <div className="create-success" onClick={() => setSuccess(false)}
                style={!success ? { display: 'none' } : { display: 'flex' }}
            >
                <p>Added tourist.</p>
            </div> */}
                        </div >
                    </div >
                </div> : <div className="center">
                    <PropagateLoader />
                </div>

            }
        </React.Fragment >
    );
}

export default UpdateTourist;


/*
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true
            },
            description: {
              value: responseData.place.description,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);


   <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
*/