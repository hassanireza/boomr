import { useSyncExternalStore } from 'react';
import { useServices } from './useServices';
import { AuthResult } from '../core/services/AuthService';

/**
 * Matches a standard "local@domain.tld" shape: one or more
 * non-whitespace, non-@ characters, an @, a domain, a dot, then a
 * top level domain of at least two letters.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

/**
 * Requires at least 8 characters, one letter and one number. Kept
 * intentionally simple: this is a demo storefront, not a security
 * boundary, so the regex favours readability over exhaustive rules.
 */
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function isValidPassword(password: string): boolean {
  return PASSWORD_REGEX.test(password);
}

export function useAuth() {
  const { auth } = useServices();
  const user = useSyncExternalStore(auth.subscribe, () => auth.getUser());

  const login = (email: string, password: string): AuthResult => {
    if (!isValidEmail(email)) {
      return { success: false, message: 'Enter a valid email address.' };
    }
    if (!password) {
      return { success: false, message: 'Enter your password.' };
    }
    return auth.login(email, password);
  };

  const register = (firstName: string, lastName: string, email: string, password: string): AuthResult => {
    if (!isValidEmail(email)) {
      return { success: false, message: 'Enter a valid email address.' };
    }
    if (!isValidPassword(password)) {
      return { success: false, message: 'Password needs 8+ characters with at least one letter and one number.' };
    }
    return auth.register(firstName, lastName, email, password);
  };

  return {
    user,
    isAuthenticated: user !== null,
    login,
    register,
    logout: auth.logout.bind(auth),
  };
}
