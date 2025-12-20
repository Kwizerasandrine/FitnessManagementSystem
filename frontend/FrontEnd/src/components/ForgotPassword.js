import React, { useState, useRef } from 'react'
import Axios from 'axios'
import { Link, Redirect, useHistory } from 'react-router-dom';

import { API_URL } from './common/URL';

// const API_URL = "http://localhost:8080/";

const ForgotPassword = () => {

    const history = useHistory();

    const inputstyle = {
        color: 'black',
        background: 'transparent',
    }


    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
        setMessage(""); // Clear message when user types
    };


    const handleSubmit = () => {
        if (!email) {
            setMessage("Please enter your email address");
            return;
        }

        setIsLoading(true);
        setMessage("");

        // Check if email exists in the system
        Axios.post(API_URL + 'forgotpassword', {
            email: email
        })
            .then((response) => {
                console.log(response.data.data);

                if (response.data.data === 'No Such Email Found!!!!') {
                    setMessage("No account found with this email address");
                    setIsLoading(false);
                }
                else {
                    // Email exists, proceed to reset password page
                    alert("Email verified! You can now reset your password.");
                    sessionStorage.setItem("forgetemail", email);
                    history.push("/resetpassword");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage("An error occurred. Please try again.");
                setIsLoading(false);
            });
    };


    return (
        <div className='container'>
            <form className='formCenter'>
                {/* Centered Forgot Password Heading */}
                <div className='form-group' style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>Forgot Password</h1>
                    <p style={{ color: '#666', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                        Enter your email address and we'll verify your account
                    </p>
                </div>

                {/* Message Display */}
                {message && (
                    <div className='form-group' style={{ maxWidth: '400px', margin: '0 auto' }}>
                        <div style={{
                            padding: '12px',
                            backgroundColor: '#f8d7da',
                            color: '#721c24',
                            borderRadius: '4px',
                            border: '1px solid #f5c6cb',
                            fontSize: '0.9rem'
                        }}>
                            {message}
                        </div>
                    </div>
                )}

                <div className='form-group' style={{ maxWidth: '400px', margin: '1rem auto 0' }}>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={onChangeEmail}
                        disabled={isLoading}
                        required></input>
                </div>

                {/* Info Box */}
                <div className='form-group' style={{ maxWidth: '400px', margin: '1rem auto 0' }}>
                    <div style={{
                        padding: '12px',
                        backgroundColor: '#d1ecf1',
                        color: '#0c5460',
                        borderRadius: '4px',
                        border: '1px solid #bee5eb',
                        fontSize: '0.85rem'
                    }}>
                        <strong>ℹ️ Note:</strong> After verification, you'll be able to reset your password.
                    </div>
                </div>

                {/* Centered Verify Button */}
                <div className='form-group' style={{ maxWidth: '400px', margin: '1.5rem auto 0', textAlign: 'center' }}>
                    <button
                        onClick={handleSubmit}
                        className='btn btn-success btn-lg'
                        type='button'
                        disabled={isLoading}
                        style={{ width: '100%', padding: '12px', fontSize: '1.1rem' }}>
                        {isLoading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </div>

                {/* Back to Login Link */}
                <div className='form-group' style={{ maxWidth: '400px', margin: '1rem auto 0', textAlign: 'center' }}>
                    <a
                        href='/signin'
                        style={{
                            color: '#007bff',
                            textDecoration: 'none',
                            fontSize: '0.9rem'
                        }}
                    >
                        ← Back to Login
                    </a>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword;