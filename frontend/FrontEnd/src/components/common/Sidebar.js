import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const role = localStorage.getItem('role');

    const menuItems = [
        // Admin Dashboard
        {
            path: '/dashboard',
            label: 'Dashboard',
            icon: '📊',
            roles: ['admin']
        },
        // User Dashboard
        {
            path: '/user-dashboard',
            label: 'Dashboard',
            icon: '📊',
            roles: ['user']
        },
        // Trainer Dashboard
        {
            path: '/trainer-dashboard',
            label: 'Dashboard',
            icon: '📊',
            roles: ['trainer']
        },
        // Profile (all roles)
        {
            path: '/profile',
            label: 'Profile',
            icon: '👤',
            roles: ['admin', 'user', 'trainer']
        },
        // Admin-only pages
        {
            path: '/members',
            label: 'Members',
            icon: '👥',
            roles: ['admin']
        },
        {
            path: '/plans',
            label: 'Plans',
            icon: '📋',
            roles: ['admin']
        },
        {
            path: '/trainers',
            label: 'Trainers',
            icon: '🏋️',
            roles: ['admin']
        },
        {
            path: '/inventory',
            label: 'Inventory',
            icon: '📦',
            roles: ['admin']
        },
        {
            path: '/diet',
            label: 'Diet Plans',
            icon: '🥗',
            roles: ['admin']
        },
        {
            path: '/locations',
            label: 'Locations',
            icon: '📍',
            roles: ['admin']
        },
        {
            path: '/memberplans',
            label: 'Member Plans',
            icon: '📑',
            roles: ['admin']
        },
        // User self-service pages
        {
            path: '/user/plans',
            label: 'My Plans',
            icon: '📋',
            roles: ['user']
        },
        {
            path: '/userdietplan',
            label: 'My Diet',
            icon: '🥗',
            roles: ['user']
        },
        {
            path: '/user/trainers',
            label: 'My Trainer',
            icon: '🏋️',
            roles: ['user']
        },
        {
            path: '/user/location',
            label: 'My Location',
            icon: '📍',
            roles: ['user']
        },
        // Trainer pages
        {
            path: '/trainer/classes',
            label: 'My Classes',
            icon: '📚',
            roles: ['trainer']
        },
        {
            path: '/trainer/members',
            label: 'My Members',
            icon: '👥',
            roles: ['trainer']
        },
        // Feedback (both)
        {
            path: '/feedback',
            label: 'Feedback',
            icon: '💬',
            roles: ['admin', 'user']
        }
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>🏋️ Gym Manager</h2>
            </div>
            <nav className="sidebar-nav">
                {menuItems
                    .filter(item => item.roles.includes(role))
                    .map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className="sidebar-link"
                            activeClassName="active"
                        >
                            <span className="sidebar-icon">{item.icon}</span>
                            <span className="sidebar-label">{item.label}</span>
                        </NavLink>
                    ))}
            </nav>
        </div>
    );
};

export default Sidebar;
