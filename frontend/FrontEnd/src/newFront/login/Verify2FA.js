import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../../components/common/URL';
import Navbar from "../../newFront/login/Navbar";

const Verify2FA = () => {
    const history = useHistory();
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("2fa_email");
        if (!storedEmail) {
            history.push("/signin");
        }
        setEmail(storedEmail);
    }, [history]);

    const handleVerify = () => {
        if (!code || code.length !== 6) {
            setError("Please enter a valid 6-digit code");
            return;
        }

        setLoading(true);
        setError("");

        Axios.post(API_URL + 'verify2fa', {
            email: email,
            twoFactorCode: code
        })
            .then((response) => {
                if (response.data.status === "success") {
                    const userData = response.data.data;

                    // Save user data like in SignIn.js
                    localStorage.setItem("user", JSON.stringify(userData));
                    localStorage.setItem("id", (userData.id || userData.user_id));
                    localStorage.setItem("name", (userData.completeName || userData.complete_name));
                    localStorage.setItem("role", userData.role);


                    // Clear 2FA session data
                    sessionStorage.removeItem("2fa_email");

                    // Redirect based on role
                    if (userData.role === "admin") {
                        history.push("/dashboard");
                    } else if (userData.role === "trainer") {
                        history.push("/trainer-dashboard");
                    } else {
                        history.push("/user-dashboard");
                    }

                    window.location.reload();
                } else {
                    setError("Invalid or expired code. Please try again.");
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error(err);
                setError("An error occurred. Please try again.");
                setLoading(false);
            });
    };

    return (
        <>
            <Navbar />
            <div className='container'>
                <form className='formCenter'>
                    <div className='form-group' style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>Two-Factor Authentication</h1>
                        <p style={{ color: '#666', fontSize: '1rem', marginTop: '1rem' }}>
                            We've sent a verification code to your email.<br />
                            Please enter the 6-digit code below.
                        </p>
                    </div>

                    {error && (
                        <div className='form-group' style={{ maxWidth: '400px', margin: '0 auto 1rem' }}>
                            <div style={{
                                padding: '12px',
                                backgroundColor: '#f8d7da',
                                color: '#721c24',
                                borderRadius: '4px',
                                border: '1px solid #f5c6cb',
                                textAlign: 'center'
                            }}>
                                {error}
                            </div>
                        </div>
                    )}

                    <div className='form-group' style={{ maxWidth: '400px', margin: '0 auto' }}>
                        <label htmlFor='code'>Verification Code</label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Enter 6-digit code'
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            maxLength={6}
                            style={{ letterSpacing: '4px', textAlign: 'center', fontSize: '1.2rem' }}
                        />
                    </div>

                    <div className='form-group' style={{ maxWidth: '400px', margin: '1.5rem auto 0', textAlign: 'center' }}>
                        <button
                            onClick={handleVerify}
                            className='btn btn-success btn-lg'
                            type='button'
                            disabled={loading}
                            style={{ width: '100%', padding: '12px', fontSize: '1.1rem' }}
                        >
                            {loading ? 'Verifying...' : 'Verify Code'}
                        </button>
                    </div>

                    <div className='form-group' style={{ maxWidth: '400px', margin: '1rem auto 0', textAlign: 'center' }}>
                        <a href="/signin" style={{ color: '#007bff', textDecoration: 'none' }}>
                            Back to Login
                        </a>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Verify2FA;
