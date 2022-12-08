import React from 'react';

const AppFooter = () => {
    return (
        <div className="layout-footer">
            <div className="footer-logo-container">
                <img id="footer-logo" src="assets/layout/images/logo-dark.svg" alt="diamond-layout" />
                <span className="app-name">Store Mangement System</span>
            </div>
            <span className="copyright">&#169; Alliance - 2022</span>
        </div>
    );
};

export default AppFooter;
