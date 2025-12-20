import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/common/Button';
import './Unauthorized.css';

const Unauthorized = () => {
    const history = useHistory();

    return (
        <div className="unauthorized-page">
            <div className="unauthorized-content">
                <div className="error-icon">🚫</div>
                <h1>Access Denied</h1>
                <p>You don't have permission to access this page.</p>
                <p className="error-details">
                    This page is restricted. Please contact your administrator if you believe this is an error.
                </p>

                <div className="action-buttons">
                    <Button onClick={() => history.goBack()} variant="secondary">
                        Go Back
                    </Button>
                    <Button onClick={() => history.push('/dashboard')} variant="primary">
                        Go to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
