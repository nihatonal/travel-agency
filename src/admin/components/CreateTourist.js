import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Input from '../../shared/components/Input'
import {
    VALIDATOR_REQUIRE
} from "../../shared/util/validators.js";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import ErrorModal from '../../shared/UI/ErrorModal';
import SuccessModal from '../../shared/UI/SuccessModal';
import PropagateLoader from "react-spinners/PropagateLoader";

import './CreateTourist.css';

function CreateTourist(props) {
    const navigate = useNavigate();
    const location = useLocation();
    // const [error, setError] = useState(false);
    const { error, isLoading, sendRequest, clearError } = useHttpClient();
    const [success, setSuccess] = useState(false);
    const unique_id = uuid().slice(0, 8);
    console.log(location.state)
    const [formState, inputHandler] = useForm(
        {
            touristname: {
                value: "",
                isValid: false,
            },
            touristemail: {
                value: "",
                isValid: false,
            },
            touristphone: {
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

    const createTourist = async (e) => {
        e.preventDefault();

        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + "/tourists/savetourist",
                "POST",
                JSON.stringify({
                    touristname: formState.inputs.touristname.value,
                    touristemail: formState.inputs.touristemail.value,
                    touristphone: formState.inputs.touristphone.value,
                    touristcode: unique_id,
                    image: "",
                    country: formState.inputs.country.value,
                    city: formState.inputs.city.value,
                    otel: formState.inputs.otel.value,
                    date: formState.inputs.date.value,
                    cost: formState.inputs.cost.value,
                    link: `http://localhost:3000/writecomment/${formState.inputs.touristname.value.toLowerCase().replace(/\s+/g, '')}/${formState.inputs.city.value.toLowerCase().replace(/\s+/g, '')}/${formState.inputs.otel.value.toLowerCase().replace(/\s+/g, '')}`,
                    comment: ''
                }),
                {
                    "Content-Type": "application/json",
                }
            );
            setSuccess(true)
            setTimeout(() => {
                navigate(`/tourists/touristlist/`);
            }, 2000);

        } catch (err) {
        }
    };




    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <SuccessModal success={success} msg={'Added tour'} />

            <div className="admin-content-wrapper">
                <div className="admin-content">
                    <h3 className="admin-content-title">Add Tour</h3>
                    <div className='create-tourist-container'>
                        <div className="create-tourist-wrapper">
                            <form onSubmit={createTourist}>
                                <Input
                                    id="touristname"
                                    element="input"
                                    type="text"
                                    label='Tourist Name Surname'
                                    placeholder="Please write tourist name and surname"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}
                                    initialValue={location.state && location.state[0]}
                                    initialValid={true}

                                />
                                <Input
                                    id="touristemail"
                                    element="input"
                                    type="email"
                                    label='Tourist email'
                                    placeholder="Please write tourist email"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}
                                    initialValue={location.state && location.state[1]}
                                    initialValid={true}

                                />
                                <Input
                                    id="touristphone"
                                    element="input"
                                    type="text"
                                    label='Tourist phone'
                                    placeholder="Please write tourist phone"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}
                                    initialValue={location.state && location.state[2]}
                                    initialValid={true}

                                />
                                <Input
                                    id="country"
                                    element="input"
                                    type="text"
                                    label='Country'
                                    placeholder="Please write country"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}

                                />
                                <Input
                                    id="city"
                                    element="input"
                                    type="text"
                                    label='City'
                                    placeholder="Please write city"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}

                                />
                                <Input
                                    id="otel"
                                    element="input"
                                    type="text"
                                    label='Otel Info'
                                    placeholder="Please write otel info"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}
                                />
                                <Input
                                    id="date"
                                    element="input"
                                    type="month"
                                    label='Date Info'
                                    placeholder="Please write date of holiday"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}
                                />
                                <Input
                                    id="cost"
                                    element="input"
                                    type="text"
                                    label='Price'
                                    placeholder="Please write cost of holiday"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}
                                />
                                <button
                                    type="submit"
                                    className="btn"
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
                                        'Create'}
                                </button>
                            </form>
                        </div>
                        {/* <div className="create-success" onClick={() => setSuccess(false)}
                            style={!success ? { display: 'none' } : { display: 'flex' }}
                        >
                            <p>Added Tour</p>
                        </div> */}
                    </div >
                </div>
            </div>
        </React.Fragment>
    );
}

export default CreateTourist;


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