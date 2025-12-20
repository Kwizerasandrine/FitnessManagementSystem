import React, { useState, useRef, useEffect } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom';

import { API_URL } from './common/URL';

// const API_URL = "http://localhost:8080/";

const ResetPassword = () => {

    const history = useHistory();

    const [isemail, setIsEmail] = useState('')

    useEffect(() => {
        setIsEmail(sessionStorage.getItem("forgetemail"))
        console.log(isemail)
    }, [])

    console.log(isemail);

    const inputstyle = {
        color: 'black',
        background: 'transparent',
    }



    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");



    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const onChangePassword1 = (e) => {
        const password = e.target.value;
        setPassword1(password);
    };

    const handleRegister = () => {
        if (password === password1) {

            Axios.post(API_URL + 'changepassword', {
                email: isemail,
                password: password
            })
                .then((response) => {

                    console.log(response.data.data);

                    if (response.data.status === 'success') {
                        alert("Password changed successfully.")
                        history.push("/signin")
                    }
                    else {
                        alert(response.data.data)
                    }

                })
        }
        else {
            alert('password does not match')
        }
    };


    return (
        <div className='container'>
            <form className='formCenter'>
                {/* Centered Reset Password Heading */}
                <div className='form-group' style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>Reset Password</h1>
                </div>

                <div className='form-group' style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <label htmlFor='password'>New Password</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={onChangePassword}></input>
                </div>

                <div className='form-group' style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <label htmlFor='password'>Confirm Password</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Enter Password'
                        value={password1}
                        onChange={onChangePassword1}></input>
                </div>

                {/* Centered Save Button */}
                <div className='form-group' style={{ maxWidth: '400px', margin: '1.5rem auto 0', textAlign: 'center' }}>
                    <button
                        onClick={handleRegister}
                        className='btn btn-success btn-lg'
                        type='button'
                        style={{ width: '100%', padding: '12px', fontSize: '1.1rem' }}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword;
