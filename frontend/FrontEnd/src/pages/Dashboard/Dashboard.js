import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import './Dashboard.css';

const Dashboard = () => {
    const userName = localStorage.getItem('name') || 'User';
    const userRole = localStorage.getItem('role') || 'user';

    const [stats, setStats] = useState({
        totalMembers: 0,
        activePlans: 0,
        totalTrainers: 0,
        totalEquipment: 0,
        pendingFeedback: 0,
        revenue: 0
    });

    useEffect(() => {
        // TODO: Load actual stats from API
        // For now using mock data
        setStats({
            totalMembers: 150,
            activePlans: 45,
            totalTrainers: 12,
            totalEquipment: 85,
            pendingFeedback: 8,
            revenue: 25000
        });
    }, []);

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
                {/* Header removed */}

                <div className="stats-grid">
                    <StatCard
                        title="Total Members"
                        value={stats.totalMembers}
                        icon="👥"
                        color="#ff7300"
                    />
                    <StatCard
                        title="Active Plans"
                        value={stats.activePlans}
                        icon="📋"
                        color="#28a745"
                    />
                    <StatCard
                        title="Trainers"
                        value={stats.totalTrainers}
                        icon="🏋️"
                        color="#007bff"
                    />
                    <StatCard
                        title="Equipment"
                        value={stats.totalEquipment}
                        icon="📦"
                        color="#6f42c1"
                    />
                    <StatCard
                        title="Pending Feedback"
                        value={stats.pendingFeedback}
                        icon="💬"
                        color="#fd7e14"
                    />
                    <StatCard
                        title="Revenue (RWF)"
                        value={stats.revenue.toLocaleString()}
                        icon="💰"
                        color="#20c997"
                    />
                </div>

                <div className="dashboard-content">
                    <div className="dashboard-section">
                        <h2>📊 Business Summary</h2>
                        <div className="summary-cards">
                            <div className="summary-card">
                                <h4>Member Growth</h4>
                                <p className="summary-value">+12%</p>
                                <p className="summary-description">Compared to last month</p>
                            </div>
                            <div className="summary-card">
                                <h4>Revenue Growth</h4>
                                <p className="summary-value">+18%</p>
                                <p className="summary-description">Compared to last month</p>
                            </div>
                            <div className="summary-card">
                                <h4>Active Memberships</h4>
                                <p className="summary-value">92%</p>
                                <p className="summary-description">Retention rate</p>
                            </div>
                        </div>
                    </div>

                    {userRole === 'admin' && (
                        <div className="dashboard-section">
                            <h2>🚀 Quick Actions</h2>
                            <div className="quick-actions">
                                <Button variant="primary" onClick={() => window.location.href = '/members/add'}>
                                    ➕ Add Member
                                </Button>
                                <Button variant="secondary" onClick={() => window.location.href = '/plans'}>
                                    📋 Manage Plans
                                </Button>
                                <Button variant="secondary" onClick={() => window.location.href = '/trainers'}>
                                    🏋️ Manage Trainers
                                </Button>
                                <Button variant="secondary" onClick={() => window.location.href = '/inventory'}>
                                    📦 Check Inventory
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="dashboard-section">
                        <h2>📈 Recent Activity</h2>
                        <div className="activity-list">
                            <div className="activity-item">
                                <span className="activity-icon">👤</span>
                                <div className="activity-content">
                                    <p><strong>New member registered</strong></p>
                                    <small>John Doe joined 2 hours ago</small>
                                </div>
                            </div>
                            <div className="activity-item">
                                <span className="activity-icon">📋</span>
                                <div className="activity-content">
                                    <p><strong>Plan purchased</strong></p>
                                    <small>Premium Plan - 3 hours ago</small>
                                </div>
                            </div>
                            <div className="activity-item">
                                <span className="activity-icon">💬</span>
                                <div className="activity-content">
                                    <p><strong>New feedback received</strong></p>
                                    <small>5-star rating - 5 hours ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard;
