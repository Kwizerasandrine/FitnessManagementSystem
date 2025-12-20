import React from 'react';
import './Footer.css';

const Footer = () => {
    // Force year to 2025 as per user request snippet "2025" or dynamic if preferred.
    // User wrote "@2025", assuming dynamic is safer but defaulting to 2025 for now if they see that.
    // Actually, dynamic is always better engineering.
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-bottom" style={{ borderTop: 'none', margin: 0, padding: '20px' }}>
                <p className="footer-copyright">
                    &copy; 2025 Gym Management System. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
