import { safeRequest } from '../../Api/ApiConfig';

export interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: string;
    gender: 'MALE' | 'FEMALE';
}

export const registerUser = async (data: RegisterPayload) => {
    return await safeRequest('POST', '/auth/register', data);
};
