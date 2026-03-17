import React from 'react';
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt, FaVenusMars } from 'react-icons/fa';
import logo from '../../../Assets/Images/l2.png';
import { RegisterPayload } from '../api/RegisterApi';
import { useThemeLocale } from '../../../Context/ThemeLocaleContext';

interface RegisterFormProps {
    formData: RegisterPayload & { confirmPassword: string };
    onChange: (field: keyof RegisterPayload | 'confirmPassword', value: string) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    loading: boolean;
    error: string;
    onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ formData, onChange, onSubmit, loading, error, onSwitchToLogin }) => {
    const { t } = useThemeLocale();

    return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#101224_0%,_#05070f_45%,_#030408_100%)] p-4">
        <div className="w-full max-w-[460px] p-7 rounded-[18px] bg-slate-900/95 border border-white/10 shadow-[0_22px_42px_rgba(4,6,16,0.6)] text-slate-50">
            <div className="flex justify-center mb-4">
                <img src={logo} alt="App Logo" className="w-16 h-auto" />
            </div>
            <h1 className="text-2xl font-extrabold text-center">{t('createAccount')}</h1>
            <p className="text-sm text-slate-400 text-center mt-2">{t('joinEvents')}</p>

            {error && <div className="mt-4 px-3 py-2 bg-rose-500/20 text-rose-200 rounded-lg text-center text-sm">{error}</div>}

            <form onSubmit={onSubmit} className="space-y-4 mt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label className="text-sm text-slate-300">First Name</label>
                        <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2">
                            <FaUser className="text-slate-400" />
                            <input
                                className="w-full bg-transparent border-none outline-none text-slate-100"
                                value={formData.firstName}
                                onChange={(e) => onChange('firstName', e.target.value)}
                                placeholder="Jane"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm text-slate-300">Last Name</label>
                        <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2">
                            <FaUser className="text-slate-400" />
                            <input
                                className="w-full bg-transparent border-none outline-none text-slate-100"
                                value={formData.lastName}
                                onChange={(e) => onChange('lastName', e.target.value)}
                                placeholder="Doe"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm text-slate-300">Email</label>
                    <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2">
                        <FaEnvelope className="text-slate-400" />
                        <input
                            className="w-full bg-transparent border-none outline-none text-slate-100"
                            type="email"
                            value={formData.email}
                            onChange={(e) => onChange('email', e.target.value)}
                            placeholder="jane@example.com"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm text-slate-300">Date of Birth</label>
                    <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2">
                        <FaCalendarAlt className="text-slate-400" />
                        <input
                            className="w-full bg-transparent border-none outline-none text-slate-100"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => onChange('dateOfBirth', e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm text-slate-300">Gender</label>
                    <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2">
                        <FaVenusMars className="text-slate-400" />
                        <select
                            className="w-full bg-transparent border-none outline-none text-slate-100 appearance-none"
                            value={formData.gender}
                            onChange={(e) => onChange('gender', e.target.value)}
                            required
                        >
                            <option value="" className="text-slate-900">Select gender</option>
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm text-slate-300">Password</label>
                    <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2">
                        <FaLock className="text-slate-400" />
                        <input
                            className="w-full bg-transparent border-none outline-none text-slate-100"
                            type="password"
                            value={formData.password}
                            onChange={(e) => onChange('password', e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm text-slate-300">Confirm Password</label>
                    <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2">
                        <FaLock className="text-slate-400" />
                        <input
                            className="w-full bg-transparent border-none outline-none text-slate-100"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => onChange('confirmPassword', e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <button
                    className="w-full h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl font-bold text-white transition hover:brightness-110 disabled:opacity-70"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Please wait...' : 'Create Account'}
                </button>

                <p className="text-center text-sm text-slate-300">
                    {t('alreadyAccount')}
                    <button
                        type="button"
                        className="ml-1 text-purple-300 hover:text-purple-100 font-semibold"
                        onClick={onSwitchToLogin}
                    >
                        {t('signIn')}
                    </button>
                </p>
            </form>
        </div>
    </div>
  );
};

export default RegisterForm;
