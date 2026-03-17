export const suspiciousPatterns: RegExp[] = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION)\b)/i,
    /(\b(OR|AND)\b\s+\d+\s*=\s*\d+)/i,
    /('|"|;|--)/i
];

export const detectSuspiciousPatterns = (input: string | null | undefined): boolean => {
    if (!input) return false;
    return suspiciousPatterns.some(pattern => pattern.test(input));
};

export const isStrongPassword = (password: string): boolean => {
    if (!password) return false;
    const minLength = password.length >= 8;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    return minLength && hasLower && hasUpper && hasNumber && hasSpecial;
};
