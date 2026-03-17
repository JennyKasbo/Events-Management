import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../Features/Register/useRegister";
import RegisterForm from "../../Features/Register/Components/RegisterForm";
import { RegisterPayload } from "../../Features/Register/Api";
import { detectSuspiciousPatterns } from "../../Utils/Validators";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { loading, error, submit, setError } = useRegister();

    const [formData, setFormData] = useState<RegisterPayload & { confirmPassword: string }>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        gender: "",
    });

    const handleChange = (field: keyof RegisterPayload | 'confirmPassword', value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (Object.values(formData).some((v) => !v)) {
            setError("Please fill in all required fields.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Password and confirm password do not match.");
            return;
        }

        const isSuspicious = Object.values(formData).some((val) =>
            typeof val === 'string' && detectSuspiciousPatterns(val)
        );

        if (isSuspicious) {
            setError("Forbidden characters were detected in input data.");
            window.scrollTo(0, 0);
            return;
        }

        const payload: RegisterPayload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender as 'MALE' | 'FEMALE',
        };

        try {
            await submit(payload);
            alert('Account created successfully!');
            navigate('/login');
        } catch (e) {
        }
    };

    return (
        <RegisterForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            onSwitchToLogin={() => navigate('/login')}
        />
    );
};

export default Register;

