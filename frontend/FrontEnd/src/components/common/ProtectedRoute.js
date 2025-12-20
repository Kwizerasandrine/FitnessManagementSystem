import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
    const user = localStorage.getItem('user');
    const userRole = localStorage.getItem('role');

    return (
        <Route
            {...rest}
            render={props => {
                // Check if user is logged in
                if (!user) {
                    return <Redirect to="/signin" />;
                }

                // Check if user has required role
                if (roles && roles.length > 0 && !roles.includes(userRole)) {
                    return <Redirect to="/unauthorized" />;
                }

                // User is authorized, render component
                return <Component {...props} />;
            }}
        />
    );
};

export default ProtectedRoute;
