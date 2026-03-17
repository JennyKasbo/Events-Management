export const suspiciousPatterns: RegExp[] = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION)\b)/i,
    /(\b(OR|AND)\b\s+\d+\s*=\s*\d+)/i,
    /('|"|;|--)/i
];

export const detectSuspiciousPatterns = (input: string | null | undefined): boolean => {
    if (!input) return false;
    return suspiciousPatterns.some(pattern => pattern.test(input));
};