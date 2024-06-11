import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Input from '../../shared/components/Input';
import { AuthContext } from '../../shared/context/auth-context';
import { useParams } from 'react-router-dom';
import {
    VALIDATOR_REQUIRE
} from "../../shared/util/validators.js";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import PropagateLoader from "react-spinners/PropagateLoader";

import './UpdateTourist.css';

function UpdateTourist(props) {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [success, setSuccess] = useState(false);
    const touristId = useParams().tid;
    const [loadedTourist, setLoadedTourist] = useState({})

    const [formState, inputHandler, setFormData] = useForm(
        {
            touristname: {
                value: "",
                isValid: false,
            },
            touristemail: {
                value: "",
                isValid: false,
            },
            country: {
                value: "",
                isValid: false,
            },
            city: {
                value: "",
                isValid: false,
            },
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
                    `http://localhost:5000/api/tourists/${touristId}`
                );
                setLoadedTourist(responseData.tourist);
                setFormData(
                    {
                        country: {
                            value: responseData.tourist.location,
                            isValid: true,
                        },
                        city: {
                            value: responseData.tourist.location,
                            isValid: true,
                        },
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
                `http://localhost:5000/api/tourists/updatetourist/${touristId}`,
                'PATCH',
                JSON.stringify({
                    country: formState.inputs.country.value,
                    city: formState.inputs.city.value,
                    otel: formState.inputs.otel.value,
                    date: formState.inputs.date.value,
                    cost: formState.inputs.cost.value
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            navigate(`/tourists/${loadedTourist.touristemail}`);
        } catch (err) { }
        // try {
        //     const responseData = await sendRequest(
        //         process.env.REACT_APP_BACKEND_URL + "/tourists/savetourists",
        //         "POST",
        //         JSON.stringify({
        //             touristname: formState.inputs.touristname.value,
        //             touristemail: formState.inputs.touristemail.value,
        //             image: "",
        //             tour: result,
        //         }),
        //         {
        //             "Content-Type": "application/json",
        //         }
        //     );
        //     setSuccess(true)
        //     console.log(responseData)
        // } catch (err) {
        // }
    };



    return (
        <React.Fragment>
            {loadedTourist.country ?
                <div className="admin-content-wrapper">
                    <div className="admin-content">
                        <h3 className="admin-content-title">Update Tour</h3>
                        <div className='create-tourist-container'>
                            <div className="update-tourist-wrapper">


                                <form onSubmit={updateTourist}>
                                    <Input
                                        id="country"
                                        element="input"
                                        type="text"
                                        label='Location info'
                                        placeholder="Please write location name"
                                        validators={[VALIDATOR_REQUIRE()]}
                                        onInput={inputHandler}
                                        initialValue={loadedTourist.country}
                                        initialValid={true}

                                    />
                                    <Input
                                        id="city"
                                        element="input"
                                        type="text"
                                        label='Location info'
                                        placeholder="Please write location name"
                                        validators={[VALIDATOR_REQUIRE()]}
                                        onInput={inputHandler}
                                        initialValue={loadedTourist.city}
                                        initialValid={true}

                                    />
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
        </React.Fragment>
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