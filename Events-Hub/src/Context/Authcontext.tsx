import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from "react";
import { safeRequest } from '../Api/ApiConfig';
import { jwtDecode } from "jwt-decode";


interface JWTPayload {
    sub: number;
    email: string;
    role: string;
    first_name?: string;
    iat: number;
    exp: number;
}

interface User {
    id: number;
    email: string;
    role: string; 
    firstName: string; 
}

interface LoginResponse {
    message: string;
    access_token: string;
    first_name?: string; 
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; message?: string }>;
    logout: () => Promise<void>;
    loading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const clientLogout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setToken(null);
        setUser(null);
    }, []);

    useEffect(() => {
        const initializeAuth = () => {
            try {
                const storedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
                const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");

                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser) as User);
                }
            } catch (error) {
                clientLogout();
            } finally {
                setLoading(false);
            }
        };
        initializeAuth();
    }, [clientLogout]);

    const login = async (email: string, password: string, rememberMe: boolean = false) => {
        try {
            const response = await safeRequest<LoginResponse>('POST', '/auth/login', { email, password });

            if (response.access_token) {
                const newToken = response.access_token;
                const decoded = jwtDecode<JWTPayload>(newToken);

                const firstName = decoded.first_name || response.first_name || "User";
                const extractedRole = decoded.role || "USER";

                const userData: User = {
                    id: decoded.sub,
                    email: decoded.email || email,
                    role: extractedRole,
                    firstName: firstName
                };

                const storage = rememberMe ? localStorage : sessionStorage;
                storage.setItem("token", newToken);
                storage.setItem("user", JSON.stringify(userData));

                setToken(newToken);
                setUser(userData);

                return { success: true };
            }
            return { success: false, message: response.message ||"login failed" };
        } catch (error: any) {
            return { success: false, message: error.message ||"error connect to server" };
        }
    };

    const logout = async () => {
        try {
            if (token && !token.startsWith('mock_')) {
                await safeRequest('POST', '/auth/logout');
            }
        } catch (error) {
            console.error("Server logout error");
        } finally {
            clientLogout();
        }
    };

    const value: AuthContextType = {
        user,
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!token,
        isAdmin: user?.role?.toUpperCase() === "ADMIN"
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};