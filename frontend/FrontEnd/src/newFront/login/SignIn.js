import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios'
import './SignUpLogin.css'
import { API_URL } from '../../components/common/URL';
import { useHistory } from 'react-router';
import Navbar from "./Navbar"
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
                // Robust verification of response status
                if (response.data.status === "error") {
                    alert('Please Enter Correct Password or Email');
                    return;
                }

                if (response.data.data === "2FA_REQUIRED") {
                    // Redirect to 2FA verification page
                    sessionStorage.setItem("2fa_email", email);
                    history.push("/verify-2fa");
                    return;
                }

                if (response.data.status === "success" && response.data.data) {
                    const userData = response.data.data;
                    console.log(userData);

                    localStorage.setItem("user", JSON.stringify(userData));
                    localStorage.setItem("id", (userData.id || userData.user_id));
                    localStorage.setItem("name", (userData.completeName || userData.complete_name));
                    localStorage.setItem("role", (userData.role));

                    // Improved role-based redirection
                    if (userData.role === "admin") {
                        history.push("/dashboard");
                    } else if (userData.role === "trainer") {
                        history.push("/trainer-dashboard");
                    } else {
                        // Default for users or any other role
                        history.push("/user-dashboard");
                    }
                    window.location.reload();
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
        <>
            <Navbar />
            <div className='container'>
                <form className='formCenter'>
                    {/* Centered Login Heading */}
                    <div className='form-group' style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>Login</h1>
                    </div>

                    <div className='form-group' style={{ maxWidth: '400px', margin: '0 auto' }}>
                        <label htmlFor='email'>Email</label>
                        <input
                            required
                            className='form-control'
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={onChangeEmail}
                        />
                    </div>

                    <div className='form-group' style={{ maxWidth: '400px', margin: '0 auto' }}>
                        <label htmlFor='password'>Password</label>
                        <input
                            required
                            className='form-control'
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={onChangePassword}
                        />
                    </div>

                    {/* Centered Login Button */}
                    <div className='form-group' style={{ maxWidth: '400px', margin: '1.5rem auto 0', textAlign: 'center' }}>
                        <button
                            onClick={handleRegister}
                            className='btn btn-success btn-lg'
                            type='button'
                            style={{ width: '100%', padding: '12px', fontSize: '1.1rem' }}
                        >
                            Login
                        </button>
                    </div>

                    {/* Centered and Visible Forgot Password Link */}
                    <div className='form-group' style={{ maxWidth: '400px', margin: '1rem auto 0', textAlign: 'center' }}>
                        <Link
                            to='/forgotpassword'
                            style={{
                                color: '#007bff',
                                fontSize: '1rem',
                                textDecoration: 'none',
                                fontWeight: '500'
                            }}
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;