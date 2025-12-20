import React, { useState, useRef } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
import Axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import './SignUpLogin.css'
import { API_URL } from './common/URL';


// const API_URL = "http://localhost:8080/";

const Login = (props) => {


    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };



    const handleRegister = () => {
        Axios.post(API_URL + 'signin', {
            email: email,
            password: password
        })
            .then((response) => {
                // Check if backend returned an error status despite 200 OK (old behavior)
                // or if we need 2FA
                if (response.data.status === "error") {
                    alert('Please Enter Correct Password or Email');
                    return;
                }

                if (response.data.data === "2FA_REQUIRED") {
                    // Redirect to 2FA verification page
                    sessionStorage.setItem("2fa_email", email);
                    history.push("/verify2fa");
                    return;
                }

                if (response.data.status === "success" && response.data.data) {
                    const userData = response.data.data;
                    console.log(userData);
                    localStorage.setItem("user", JSON.stringify(userData));
                    localStorage.setItem("id", (userData.id || userData.user_id));
                    localStorage.setItem("name", (userData.completeName || userData.complete_name));
                    localStorage.setItem("role", (userData.role));

                    if (userData.role === "user") {
                        history.push("/home")
                        window.location.reload();
                    }
                    else {
                        history.push("/dashboard")
                        window.location.reload();
                    }
                }
            }).catch((error) => {
                console.error("Login Error:", error);
                alert('Please Enter Correct Password or Email');
            });
    };



    //   if (isLoggedIn) {
    //     return <Redirect to="/dashboard" />;
    //   }


    return (
        <div className='container SignIn'>
            <form>
                <div className='form-group'>
                    <div className='col'><h1>Login</h1></div>
                </div>

                <div className='form-group col-md-4'>

                    <label htmlFor='email'>Email</label>
                    <input
                        required
                        className='form-control'
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={onChangeEmail}></input>

                </div>
                <div className='form-group col-md-4'>

                    <label htmlFor='password'>Password</label>
                    <input
                        required
                        className='form-control'
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={onChangePassword}></input>

                </div>
                <div className='form-row'>
                    <div className='row form-group col-md-4'>

                        <div className='col'> <button
                            onClick={handleRegister}
                            className='btn btn-success'
                            type='button'>Login</button>
                        </div>

                        <div className='col'>
                            <Link to='/forgotpassword'>Forgot Password?</Link>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Login;