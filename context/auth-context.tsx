'use client';

import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState, ReactNode, useContext } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
    error: string | null;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: async () => {},
    logout: () => {},
    error: null,
    isLoading: false
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const cookieValue = document.cookie
                .split('; ')
                .find((row) => row.startsWith('authToken='))
                ?.split('=')[1];
            setIsAuthenticated(cookieValue != null);
        };

        if (typeof window !== 'undefined') {
            checkAuth();
        }
    }, []);

    const login = async ({ username, password }: { username: string; password: string }) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();

            const expires = new Date();
            expires.setDate(expires.getDate() + 7); // 7 days expiration
            document.cookie = `authToken=${data.token}; expires=${expires.toUTCString()}; path=/; ${
                process.env.NODE_ENV === 'production' ? 'Secure; SameSite=Strict' : ''
            }`;

            setIsAuthenticated(true);
            router.push('/products');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        setIsAuthenticated(false);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, error, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context == null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
