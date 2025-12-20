import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import './UserDashboard.css';

const UserDashboard = () => {
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [userStats, setUserStats] = useState({
        activePlan: null,
        assignedTrainer: null,
        currentDiet: null,
        location: null
    });

    useEffect(() => {
        const name = localStorage.getItem('name');
        setUserName(name || 'User');

        // TODO: Fetch user stats from API
        // For now, using placeholder data
    }, []);



    return (
        <MainLayout>
            <div className="user-dashboard">
                {/* Header removed */}

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: '#4CAF50' }}>📋</div>
                        <div className="stat-content">
                            <h3>Active Plan</h3>
                            <p className="stat-value">
                                {userStats.activePlan || 'No active plan'}
                            </p>
                            <Button
                                variant="link"
                                onClick={() => history.push('/user/plans')}
                            >
                                Manage Plans →
                            </Button>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: '#2196F3' }}>🏋️</div>
                        <div className="stat-content">
                            <h3>My Trainer</h3>
                            <p className="stat-value">
                                {userStats.assignedTrainer || 'No trainer assigned'}
                            </p>
                            <Button
                                variant="link"
                                onClick={() => history.push('/user/trainers')}
                            >
                                Choose Trainer →
                            </Button>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: '#FF9800' }}>🥗</div>
                        <div className="stat-content">
                            <h3>Diet Plan</h3>
                            <p className="stat-value">
                                {userStats.currentDiet || 'No diet selected'}
                            </p>
                            <Button
                                variant="link"
                                onClick={() => history.push('/user/diets')}
                            >
                                Select Diet →
                            </Button>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: '#9C27B0' }}>📍</div>
                        <div className="stat-content">
                            <h3>Gym Location</h3>
                            <p className="stat-value">
                                {userStats.location || 'No location set'}
                            </p>
                            <Button
                                variant="link"
                                onClick={() => history.push('/user/location')}
                            >
                                Set Location →
                            </Button>
                        </div>
                    </div>
                </div>


            </div>
        </MainLayout>
    );
};

export default UserDashboard;
