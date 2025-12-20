import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import trainerDashboardService from '../../services/trainer-dashboard.service';
import './Dashboard.css'; // Reuse dashboard styles

const TrainerDashboard = () => {
    const [stats, setStats] = useState({ totalClasses: 0, totalMembers: 0 });
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem('user'));
    const trainerName = user?.completeName || user?.complete_name || '';

    useEffect(() => {
        if (trainerName) {
            loadStats();
        }
    }, [trainerName]);

    const loadStats = () => {
        setLoading(true);
        trainerDashboardService.getTrainerStats(trainerName)
            .then(response => {
                if (response.data && response.data.data) {
                    setStats(response.data.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading stats:', error);
                setLoading(false);
            });
    };

    const StatCard = ({ title, value, icon, color }) => (
        <div className="stat-card" style={{ borderLeftColor: color }}>
            <div className="stat-icon" style={{ backgroundColor: color + '20' }}>
                {icon}
            </div>
            <div className="stat-content">
                <h3>{value}</h3>
                <p>{title}</p>
            </div>
        </div>
    );

    return (
        <MainLayout>
            <div className="dashboard-page">
                <div className="stats-grid">
                    <StatCard
                        title="Total Classes"
                        value={loading ? '...' : stats.totalClasses}
                        icon="📚"
                        color="#007bff"
                    />
                    <StatCard
                        title="Total Members"
                        value={loading ? '...' : stats.totalMembers}
                        icon="👥"
                        color="#28a745"
                    />
                    <StatCard
                        title="Profile Status"
                        value="Active"
                        icon="✅"
                        color="#6f42c1"
                    />
                </div>

                <div className="dashboard-content">
                    <div className="dashboard-section">
                        <h2>🚀 Quick Actions</h2>
                        <div className="quick-actions">
                            <Button
                                variant="primary"
                                onClick={() => history.push('/trainer/classes')}
                            >
                                📚 View My Classes
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => history.push('/trainer/members')}
                            >
                                👥 View My Members
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => history.push('/profile')}
                            >
                                👤 Edit Profile
                            </Button>
                        </div>
                    </div>

                    <div className="dashboard-section">
                        <h2>📈 Recent Updates</h2>
                        <div className="activity-list">
                            <div className="activity-item">
                                <span className="activity-icon">ℹ️</span>
                                <div className="activity-content">
                                    <p><strong>Welcome to your new dashboard!</strong></p>
                                    <small>Track your classes and members in one place.</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default TrainerDashboard;
