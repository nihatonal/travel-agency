import React, { useContext } from 'react';
import Input from '../../shared/components/Input'
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_PASSWORD
} from "../../shared/util/validators.js";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from '../../shared/context/auth-context';

import PropagateLoader from "react-spinners/PropagateLoader";

import './Login.css';
function Login(props) {
    const auth = useContext(AuthContext);
    
    const { error, isLoading, sendRequest } = useHttpClient();
    const [formState, inputHandler] = useForm(
        {
            username: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );
    const authSubmitHandler = async event => {
        event.preventDefault();

        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + "/login",
                'POST',
                JSON.stringify({
                    username: formState.inputs.username.value,
                    password: formState.inputs.password.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            );

            auth.login(responseData.userId, responseData.token);

        } catch (err) { }
    }
    return (
        <div className="login_modal"
            style={!auth.isLoggedIn ? { top: "0" } : { top: "-1000px" }}
        >
            <div className="login_wrapper">
                {error && <div className="error_container">
                    Bir hata oluştu. Tekrar Deneyiniz.
                </div>}
                <form onSubmit={authSubmitHandler}>
                    <Input
                        id="username"
                        element="input"
                        type="text"
                        label='Username'
                        placeholder="Please write your username"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}

                    />
                    <Input
                        id="password"
                        element="input"
                        type="text"
                        label='Password'
                        placeholder="Please write your name"
                        validators={[VALIDATOR_REQUIRE(),
                        VALIDATOR_PASSWORD()]}
                        onInput={inputHandler}
                    />
                    <button className="login_btn">{
                        isLoading ? <PropagateLoader
                            color={'white'}
                            loading={true}
                            cssOverride={''}
                            size={5}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        /> : 'Login'}</button>
                </form>
            </div>
        </div>
    );
}

export default Login;