import React, { useState, useEffect } from "react";
import Axios from "axios";

import { API_URL } from "../../components/common/URL";
import { useHistory } from "react-router";
import Navbar from "./Navbar.js";

const SignUp = (props) => {
  const history = useHistory();
  const inputstyle = {
    color: "black",
    background: "transparent",
  };

  const intialValues = { complete_name: "", contact: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRegister = () => {

    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);

      Axios.post(API_URL + "signup", {
        completeName: formValues.complete_name,
        contact: formValues.contact,
        email: formValues.email,
        password: formValues.password,
      }).then((response) => {
        console.log("in response of signup");
        console.log(response.data.data);

        if (response.data.data === "success") {
          alert("SignUp Successfull");
          console.log(response.data.data + "in signup response");
          console.log("next is history");
          history.push("/Signin");
          window.location.reload();
        } else {
          alert(response.data.data);
        }
      });


    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const emailregx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneregx = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (!values.complete_name) {
      errors.complete_name = "Please enter your full name."
    }

    if (!values.contact) {
      errors.contact = "Please enter your contact number."
    }
    else if (!phoneregx.test(values.contact))
      errors.contact = "This is not a valid contact number.";

    if (!values.email) {
      errors.email = "Please enter your email."
    }
    else if (!emailregx.test(values.email))
      errors.email = "This is not a valid email format.";

    if (!values.password) {
      errors.password = "Please enter password."
    }
    else if (!strongRegex.test(values.password))
      errors.password = "Passwords must be atleast 8 characters long,contain atleast 1 smallcap letter,largecap letter,special characters and number.";

    return errors;
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <form className="formCenter">
          {/* Centered SignUp Heading */}
          <div className="form-group" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>SignUp</h1>
          </div>

          <div className="form-group" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <label htmlFor="username">User Name</label>
            <input
              className="form-control"
              type="text"
              name="complete_name"
              placeholder="Enter User Name"
              value={formValues.complete_name}
              onChange={handleChange}
            />
            <p style={{ color: 'red' }}>{formErrors.complete_name}</p>
          </div>

          <div className="form-group" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <label htmlFor="contact">Contact No.</label>
            <input
              className="form-control"
              type="text"
              name="contact"
              placeholder="Enter your Contact"
              value={formValues.contact}
              onChange={handleChange}
            />
            <p style={{ color: 'red' }}>{formErrors.contact}</p>
          </div>

          <div className="form-group" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formValues.email}
              onChange={handleChange}
            />
            <p style={{ color: 'red' }}>{formErrors.email}</p>
          </div>

          <div className="form-group" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              required={"required"}
              placeholder="Enter Password"
              value={formValues.password}
              onChange={handleChange}
            />
            <p style={{ color: 'red' }}>{formErrors.password}</p>
          </div>

          {/* Centered SignUp Button */}
          <div className="form-group" style={{ maxWidth: '400px', margin: '1.5rem auto 0', textAlign: 'center' }}>
            <button
              onClick={handleRegister}
              className="btn btn-success btn-lg"
              type="button"
              style={{ width: '100%', padding: '12px', fontSize: '1.1rem' }}
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
