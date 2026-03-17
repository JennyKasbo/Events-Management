import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { useThemeLocale } from "../../Context/ThemeLocaleContext";

const Layout: React.FC = () => {
    const { theme } = useThemeLocale();
    return (
        <div className={`min-h-screen w-full overflow-x-hidden ${theme === "dark" ? "bg-[#0F1117]" : "bg-slate-50"}`}>
            <Header />
            <main className="w-full pt-[90px]">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
