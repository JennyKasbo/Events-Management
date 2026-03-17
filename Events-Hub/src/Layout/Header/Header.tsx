import React from 'react';
import PopUp from '../../Components/PopUp/PopUp';
import { useAuth } from '../../Context/Authcontext';
import { useThemeLocale } from '../../Context/ThemeLocaleContext';
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from 'react-icons/fa';
import L from '../../Assets/Images/l2.png';
import { useState } from 'react';
const Header: React.FC = () => {
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const {isAdmin,logout} = useAuth();

   const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  const confirmLogout = async () => {
    try {
        await logout(); 
         navigate("/login", { replace: true });
         console.log("logout successfuly")
    } catch (error) {
        console.error("Logout error, redirecting:", error);
        navigate("/login", { replace: true }); 
    } finally {
        setShowLogoutPopup(false); 
    }
  };
 
  const { language, theme, setLanguage, setTheme, t } = useThemeLocale();


  return (
    <div className={`w-full h-[70px] fixed top-0 left-0 z-50 ${theme === 'dark' ? 'bg-slate-900 border-b border-slate-700 text-slate-50' : 'bg-white border-b border-slate-200 text-slate-900'} flex items-center justify-between px-8`} dir="ltr">
      <div className="flex items-center mt-2 gap-3">
        <img src={L} alt="logo" className="w-[120px] h-auto" />
        <select
          className={`rounded-md border px-2 py-1 text-sm font-semibold transition transform duration-200 ease-out hover:scale-105 ${theme === 'dark' ? 'bg-slate-800 text-white border-slate-500' : 'bg-white-100 text-slate-900 border-violet-400'}`}
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
        >
          <option value="en" className="bg-white text-black">{t('EN')}</option>
          <option value="ar" className="bg-white text-black">{t('AR')}</option>
        </select>
        <select
          className={`rounded-md border px-2 py-1 text-sm font-semibold transition transform duration-200 ease-out hover:scale-105 ${theme === 'dark' ? 'bg-slate-800 text-white border-slate-500' : 'bg-white-100 text-slate-900 border-violet-400'}`}
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
        >
          <option value="light" className="bg-white text-black">{t('light')}</option>
          <option value="dark" className="bg-white text-black">{t('dark')}</option>
        </select>
      </div>
      <div className={`flex items-center gap-3 text-lg font-medium mt-2 ${theme === 'dark' ? 'text-slate-100' : 'text-purple-900'}`}>
        <span>
          {t('welcome')} {isAdmin ? t('admin') : t('user')}
        </span>
        <button
          className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${theme === 'dark' ? 'bg-purple-800 text-white hover:bg-purple-700' : 'bg-purple-900 text-white hover:bg-purple-700'}`}
          onClick={handleLogoutClick}
        >
          <FaSignOutAlt className="text-base" />
        </button>
      </div>
       {showLogoutPopup && (
        <PopUp
          isShow={showLogoutPopup}
          setIshow={setShowLogoutPopup}
          logout={true}
          onConfirm={confirmLogout}
        />
      )}

    
            
    </div>
  );
};

export default Header;

