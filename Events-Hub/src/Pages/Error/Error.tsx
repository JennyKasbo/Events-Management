import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeLocale } from '../../Context/ThemeLocaleContext';

interface ErrorProps {
  message?: string;
}

interface LocationState {
  errorMessage?: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const state = location.state as LocationState;

  const errorMessage =
    message || state?.errorMessage || "An unexpected error has occurred.";

  const { t } = useThemeLocale();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#101224_0%,_#05070f_45%,_#030408_100%)] p-4">
      <div className="w-full max-w-md bg-slate-900/90 border border-purple-500/30 rounded-2xl shadow-[0_22px_35px_rgba(4,6,16,0.7)] p-8 text-center">
        <ErrorOutlineIcon sx={{ fontSize: 72, color: '#8f5dff', mb: 2 }} />
        <Typography variant="h3" className="text-white font-extrabold mb-2" sx={{ fontSize: '2rem' }}>
          {t('errorTitle')}
        </Typography>
        <Typography variant="h6" className="text-slate-200 mb-6" sx={{ fontSize: '1.1rem' }}>
          {errorMessage}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{
            bgcolor: 'rgba(143, 93, 255, 1)',
            '&:hover': { bgcolor: 'rgba(125, 91, 255, 0.9)' },
            color: '#FFF',
            px: 4,
            py: 1.5,
            borderRadius: '10px',
            fontWeight: 700,
          }}
        >
          {t('goHome')}
        </Button>
      </div>
    </div>
  );
};

export default Error;