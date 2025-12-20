import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './TopBar.css';

const TopBar = () => {
    const history = useHistory();
    const userName = localStorage.getItem('name') || 'User';
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        history.push('/signin');
        window.location.reload();
    };

    return (
        <div className="topbar">
            <div className="topbar-left">
                <h3 className="topbar-title">Gym Management System</h3>
            </div>

            <div className="topbar-right">
                <button
                    className="btn btn-outline-light mr-3 d-flex align-items-center"
                    onClick={() => history.goBack()}
                    style={{
                        marginRight: '15px',
                        height: '40px',
                        border: '1px solid rgba(255,255,255,0.5)',
                        background: 'transparent',
                        color: 'white',
                        borderRadius: '20px',
                        padding: '0 15px'
                    }}
                >
                    ⬅ Back
                </button>

                <button
                    className="profile-button"
                    onClick={() => history.push('/profile')}
                    title="My Profile"
                >
                    👤 Profile
                </button>

                <div className="user-menu">
                    <button
                        className="user-button"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <span className="user-avatar">👤</span>
                        <span className="user-name">{userName}</span>
                        <span className="dropdown-arrow">▼</span>
                    </button>

                    {showDropdown && (
                        <div className="user-dropdown">
                            <button onClick={handleLogout} className="logout-btn">
                                🚪 Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopBar;
