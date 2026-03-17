import React from "react";
import { useThemeLocale } from "../../Context/ThemeLocaleContext";

interface PopUpMessage {
  title?: string;
  body: string;
}

interface PopUpProps {
  isShow: boolean;
  setIshow: (value: boolean) => void;
  logout?: boolean;
  del?: boolean;
  messages?: PopUpMessage[];
  onConfirm?: () => void | Promise<void>;
}

const PopUp: React.FC<PopUpProps> = ({ 
  isShow, 
  setIshow, 
  logout, 
  del, 
  messages = [], 
  onConfirm 
}) => {
  const { language, t } = useThemeLocale();
  const isRTL = language === 'ar';

  if (!isShow) return null;

  const handleCancel = () => setIshow(false);
  
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
  };

  let popupMessage: React.ReactNode;

  if (logout) {
    popupMessage = t('logoutConfirm');
  } else if (del) {
    popupMessage = (
      <>
        {t('logoutConfirm')} <span className="font-bold">Delete</span>
      </>
    );
  } else if (messages.length > 0) {
    popupMessage = messages.map((msg, i) => (
      <span key={i} className="popup-msg-item">
        {msg.title && <span className="popup-bold">{msg.title}</span>} {msg.body}
      </span>
    ));
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50"
        onClick={handleCancel}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="w-[min(92vw,450px)] bg-slate-950/95 border border-purple-400/40 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.35)] p-6 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
          <h3 className="text-lg font-bold text-slate-100 mb-4 text-center">{popupMessage}</h3>
          <div className="flex justify-center gap-4">
            <button
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold hover:brightness-110"
              onClick={handleConfirm}
            >
              {t('yes')}
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-slate-600 text-white font-semibold hover:bg-slate-500"
              onClick={handleCancel}
            >
              {t('no')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUp;