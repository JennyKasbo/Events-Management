import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Loading from "../../Components/Loading/Loading";
import { FaUser, FaUnlockAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Authcontext";
import { useThemeLocale } from "../../Context/ThemeLocaleContext";
import { detectSuspiciousPatterns } from "../../Utils/Validators";

interface LoginFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const { login, isAuthenticated } = useAuth();
    
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: ""
    });
    
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    
    const navigate = useNavigate();
    const { t } = useThemeLocale();

    useEffect(() => {
        const savedEmail = localStorage.getItem("remembered_email");
        if (savedEmail) {
            setFormData(prev => ({ ...prev, email: savedEmail }));
            setRememberMe(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleInputChange = (field: keyof LoginFormData) => (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (error) setError("");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (detectSuspiciousPatterns(formData.email) || detectSuspiciousPatterns(formData.password)) {
            setError("suspicious patterns detected");
            setIsLoading(false);
            return;
        }

        try {
            const result = await login(formData.email, formData.password, rememberMe);
            
            if (result.success) {
                if (rememberMe) {
                    localStorage.setItem("remembered_email", formData.email);
                } else {
                    localStorage.removeItem("remembered_email");
                }
                navigate("/", { replace: true });
            } else {
                setError(result.message || "email or password incorrect");
            }
        } catch (err) {
            setError("error connecting to server");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#101224_0%,_#05070f_45%,_#030408_100%)] p-4">
            <div className="w-full max-w-md bg-slate-900/95 border border-white/10 rounded-2xl p-8 shadow-[0_20px_45px_rgba(3,6,19,0.5)]">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-extrabold text-white">{t('welcomeBack')}</h1>
                        <p className="text-slate-400 mt-2">{t('signInManage')}</p>
                    </div>

                    {error && <div className="mb-4 px-4 py-2 bg-rose-500/20 border border-rose-500/40 rounded-lg text-rose-100 text-sm text-center" role="alert">{error}</div>}

                    <div className="relative mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={formData.email}
                            onChange={handleInputChange('email')}
                            disabled={isLoading}
                            className="w-full h-12 pl-4 pr-10 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <FaUser className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300" />
                    </div>

                    <div className="relative mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={handleInputChange('password')}
                            disabled={isLoading}
                            className="w-full h-12 pl-4 pr-10 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <FaUnlockAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300" />
                    </div>

                    <div className="flex items-center justify-between mb-5 text-sm text-slate-300">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                disabled={isLoading}
                                className="accent-purple-500"
                            />
                            remember me
                        </label>
                        <button
                            type="button"
                            className="text-purple-300 hover:text-purple-100"
                            onClick={() => navigate('/forgot-password')}
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold rounded-xl transition hover:brightness-110 disabled:opacity-70"
                    >
                        {isLoading ? <Loading /> : 'Sign In'}
                    </button>

                    <div className="mt-4 text-center text-sm text-slate-400">
                        <span>Don't have an account?</span>
                        <button
                            type="button"
                            className="ml-1 font-semibold text-purple-300 hover:text-purple-100"
                            onClick={() => navigate('/register')}
                        >
                            {t('register')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;