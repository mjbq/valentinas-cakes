const ALLOWED_EMAIL_DOMAINS = ['gmail.com', 'inacap.cl'];

export function isValidEmailFormat(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isAllowedEmailDomain(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return !!domain && ALLOWED_EMAIL_DOMAINS.includes(domain);
}

export function isAdult(birthDate: string): boolean {
  if (!birthDate) return false;
  const birth = new Date(birthDate);
  if (Number.isNaN(birth.getTime())) return false;

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age >= 18;
}

export interface PasswordCheck {
  valid: boolean;
  errors: string[];
}

export function validatePassword(password: string): PasswordCheck {
  const errors: string[] = [];
  if (password.length < 8) errors.push('Debe tener al menos 8 caracteres.');
  if (!/[0-9]/.test(password)) errors.push('Debe incluir al menos un número.');
  if (!/[A-Z]/.test(password)) errors.push('Debe incluir al menos una letra mayúscula.');
  if (!/[a-z]/.test(password)) errors.push('Debe incluir al menos una letra minúscula.');
  if (!/[^A-Za-z0-9]/.test(password)) errors.push('Debe incluir al menos un carácter especial.');

  return { valid: errors.length === 0, errors };
}

export function isSameDayAndMonth(dateA: Date, dateB: Date): boolean {
  return dateA.getDate() === dateB.getDate() && dateA.getMonth() === dateB.getMonth();
}
