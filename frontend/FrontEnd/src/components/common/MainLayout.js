import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Footer from './Footer';
import './MainLayout.css';

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout">
            <Sidebar />
            <div className="main-content-wrapper">
                <TopBar />
                <div className="main-content">
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
