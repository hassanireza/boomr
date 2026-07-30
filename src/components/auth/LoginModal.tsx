import React, { useState } from 'react';
import { CloseIcon, BoomrLogoMark, EyeIcon, EyeOffIcon } from '../common/Icons';
import { useUI } from '../../hooks/useUI';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

type Tab = 'login' | 'register';

export const LoginModal: React.FC = () => {
  const { active, close } = useUI();
  const { login, register } = useAuth();
  const { show } = useToast();
  const [tab, setTab] = useState<Tab>('login');
  const [showPw, setShowPw] = useState(false);
  const isOpen = active === 'login';

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [regFirst, setRegFirst] = useState('');
  const [regLast, setRegLast] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPw, setRegPw] = useState('');

  const handleLogin = () => {
    const result = login(loginEmail, loginPw);
    show(result.success ? 'Welcome back!' : 'Missing fields', result.message, result.success ? 'success' : 'error');
    if (result.success) close();
  };

  const handleRegister = () => {
    const result = register(regFirst, regLast, regEmail, regPw);
    show(result.success ? 'Account created!' : 'Check your details', result.message, result.success ? 'success' : 'error', result.success ? 4000 : 3200);
    if (result.success) close();
  };

  return (
    <div className={`modal-overlay${isOpen ? ' active' : ''}`} role="dialog" aria-label="Sign in" aria-modal="true">
      <div className="modal">
        <button className="modal-close" onClick={close} aria-label="Close">
          <CloseIcon />
        </button>
        <div className="modal-logo">
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--ff-display)', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.03em' }}>
            <BoomrLogoMark size={26} />
            BOOMR<span style={{ color: 'var(--ochre)' }}>.</span>
          </span>
        </div>
        <div className="modal-tabs">
          <button className={`modal-tab${tab === 'login' ? ' active' : ''}`} onClick={() => setTab('login')}>
            Sign In
          </button>
          <button className={`modal-tab${tab === 'register' ? ' active' : ''}`} onClick={() => setTab('register')}>
            Create Account
          </button>
        </div>

        {tab === 'login' ? (
          <div>
            <div className="social-login">
              <button className="social-btn" onClick={() => show('Coming soon', 'Google sign-in launching soon', 'info')}>
                Continue with Google
              </button>
              <button className="social-btn" onClick={() => show('Coming soon', 'Apple sign-in launching soon', 'info')}>
                Continue with Apple
              </button>
            </div>
            <div className="form-divider">or sign in with email</div>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">
                Email address <span className="required">*</span>
              </label>
              <input
                id="login-email"
                className="form-input"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="login-pw">
                Password <span className="required">*</span>
              </label>
              <div className="input-group">
                <input
                  id="login-pw"
                  className="form-input"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Your password"
                  autoComplete="current-password"
                  value={loginPw}
                  onChange={(event) => setLoginPw(event.target.value)}
                />
                <span className="pw-toggle" onClick={() => setShowPw((s) => !s)} title="Show/hide password">
                  {showPw ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                </span>
              </div>
            </div>
            <div className="remember-row">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked /> Remember me
              </label>
              <a
                className="forgot-link"
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  show('Email sent', 'Password reset link sent to your inbox', 'info');
                }}
              >
                Forgot password?
              </a>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleLogin}>
              Sign In
            </button>
            <p style={{ textAlign: 'center', marginTop: 16, fontSize: '0.8125rem', color: 'var(--chalk-dim)' }}>
              New to BOOMR.?{' '}
              <a href="#" onClick={(event) => { event.preventDefault(); setTab('register'); }} style={{ color: 'var(--ochre)' }}>
                Create account
              </a>
            </p>
          </div>
        ) : (
          <div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-first">
                  First name <span className="required">*</span>
                </label>
                <input
                  id="reg-first"
                  className="form-input"
                  type="text"
                  placeholder="First name"
                  autoComplete="given-name"
                  value={regFirst}
                  onChange={(event) => setRegFirst(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-last">
                  Last name
                </label>
                <input
                  id="reg-last"
                  className="form-input"
                  type="text"
                  placeholder="Last name"
                  autoComplete="family-name"
                  value={regLast}
                  onChange={(event) => setRegLast(event.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">
                Email address <span className="required">*</span>
              </label>
              <input
                id="reg-email"
                className="form-input"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={regEmail}
                onChange={(event) => setRegEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-pw">
                Password <span className="required">*</span>
              </label>
              <div className="input-group">
                <input
                  id="reg-pw"
                  className="form-input"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  value={regPw}
                  onChange={(event) => setRegPw(event.target.value)}
                />
                <span className="pw-toggle" onClick={() => setShowPw((s) => !s)} title="Show/hide password">
                  {showPw ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                </span>
              </div>
              <div className="form-hint">Must be at least 8 characters with a number.</div>
            </div>
            <div className="form-group">
              <label className="checkbox-label" style={{ alignItems: 'flex-start', gap: 10 }}>
                <input type="checkbox" style={{ marginTop: 2, flexShrink: 0 }} />
                <span>
                  I agree to the <a href="#" style={{ color: 'var(--ochre)' }}>Terms of Service</a> and{' '}
                  <a href="#" style={{ color: 'var(--ochre)' }}>Privacy Policy</a>
                </span>
              </label>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span>Send me offers, tips, and new product alerts</span>
              </label>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleRegister}>
              Create Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
