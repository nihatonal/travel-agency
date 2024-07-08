import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import DropdownList from "react-widgets/DropdownList";
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
import { LanguageContext } from "../../shared/context/Language";
import { FaArrowLeftLong } from "react-icons/fa6";
import "react-widgets/styles.css";
import './CreateTourist.css';

function CreateTourist(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const lang = useContext(LanguageContext);
    // const [error, setError] = useState(false);
    const { error, isLoading, sendRequest, clearError } = useHttpClient();
    const [success, setSuccess] = useState(false);
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const unique_id = uuid().slice(0, 8);
    const sectionData = lang.dictionary["country_info"];
    const resorts = lang.dictionary["resorts"];


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
                    country: country.country,
                    country_id: country.id,
                    city: city,
                    otel: formState.inputs.otel.value,
                    date: formState.inputs.date.value,
                    cost: formState.inputs.cost.value,
                    link: `https://travel-agency-11d17.web.app/writecomment/${formState.inputs.touristname.value.toLowerCase().replace(/\s+/g, '')}/${city.toLowerCase().replace(/\s+/g, '')}/${formState.inputs.otel.value.toLowerCase().replace(/\s+/g, '')}`,
                    comment: ''
                }),
                {
                    "Content-Type": "application/json",
                }
            );
            setSuccess(true)
            setTimeout(() => {
                navigate(`/admin/touristlist/`);
            }, 2000);

        } catch (err) {
        }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <SuccessModal success={success} msg={'Added tour'} />

            <div className="admin-content-wrapper">
                {location.state && <NavLink to={`/admin/touristlist/${location.state && location.state[1]}`
                    // state = { [location.state[0], location.state[1], location.state[2]]}
                } className='back_arrow'>
                    <FaArrowLeftLong />
                </NavLink>}
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
                                <div>
                                    <span className='select_label'>Country</span>
                                    <DropdownList

                                        dataKey="id"
                                        defaultValue={sectionData.map((country) => {
                                            return {
                                                id: country.country_id
                                                , country: country.country
                                            }
                                        })[0]}
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
                                </div>
                                {/* <Input
                                    id="country"
                                    element="input"
                                    type="text"
                                    label='Country'
                                    placeholder="Please write country"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}

                                /> */}
                                <div>
                                    <span className='select_label'>City</span>
                                    <DropdownList
                                        dataKey="id"
                                        defaultValue={
                                            resorts.filter((item) => item.resort_id ===
                                                sectionData.map((country) => {
                                                    return {
                                                        id: country.country_id
                                                        , country: country.country
                                                    }
                                                })[0].id
                                            )[0].resorts[0]


                                        }
                                        value={city}
                                        onChange={(nextValue) => setCity(nextValue)}

                                        data={country ? resorts.filter((item) => item.resort_id === country.id)[0].resorts :
                                            resorts.filter((item) => item.resort_id ===
                                                sectionData.map((country) => {
                                                    return {
                                                        id: country.country_id
                                                        , country: country.country
                                                    }
                                                })[0].id
                                            )[0].resorts
                                        }
                                    />
                                </div>
                                {/* <Input
                                    id="city"
                                    element="input"
                                    type="text"
                                    label='City'
                                    placeholder="Please write city"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}

                                /> */}
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