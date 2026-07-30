import { ObservableStore } from './ObservableStore';
import { LocalPersistence } from './LocalPersistence';

export interface AuthUser {
  firstName: string;
  lastName: string;
  email: string;
}

const STORAGE_KEY = 'boomr.auth.v1';

export interface AuthResult {
  success: boolean;
  message: string;
}

/**
 * AuthService simulates account creation and sign in for this
 * storefront demo. No network request is made; the intent is to
 * demonstrate the interaction pattern (validation, persisted
 * session, toasts) that a real auth provider would slot into.
 */
export class AuthService extends ObservableStore {
  private static instance: AuthService;
  private user: AuthUser | null;

  private constructor() {
    super();
    this.user = LocalPersistence.load<AuthUser | null>(STORAGE_KEY, null);
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  getUser(): AuthUser | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return this.user !== null;
  }

  login(email: string, password: string): AuthResult {
    if (!email || !password) {
      return { success: false, message: 'Enter your email and password.' };
    }
    this.user = { firstName: email.split('@')[0], lastName: '', email };
    LocalPersistence.save(STORAGE_KEY, this.user);
    this.emit();
    return { success: true, message: 'You are now signed in to BOOMR.' };
  }

  register(firstName: string, lastName: string, email: string, password: string): AuthResult {
    if (!firstName || !email || !password) {
      return { success: false, message: 'Fill out all required fields.' };
    }
    if (password.length < 8) {
      return { success: false, message: 'Password must be at least 8 characters.' };
    }
    this.user = { firstName, lastName, email };
    LocalPersistence.save(STORAGE_KEY, this.user);
    this.emit();
    return { success: true, message: 'Welcome to BOOMR. Use code BOOMR20 for 20% off.' };
  }

  logout(): void {
    this.user = null;
    LocalPersistence.save(STORAGE_KEY, null);
    this.emit();
  }
}
