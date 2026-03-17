import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import './Layout.css';

const Layout: React.FC = () => {
    return (
        <div className="main-layout">
            <div className="layout-content">
                <Header />
                <main className="page-container">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;