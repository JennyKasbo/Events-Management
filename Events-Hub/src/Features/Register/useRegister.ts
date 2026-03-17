import { useState, useCallback } from 'react';
import { registerUser, RegisterPayload } from './Api';

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const submit = useCallback(async (payload: RegisterPayload) => {
        setLoading(true);
        setError('');

        try {
            const response = await registerUser(payload);
            return response;
        } catch (err: any) {
            setError(err?.message || 'Failed to register');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, submit, setError };
};
