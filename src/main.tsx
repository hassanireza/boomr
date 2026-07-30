import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { ServicesProvider } from './core/ServicesContext';
import './styles/global.css';

/**
 * HashRouter is used instead of BrowserRouter so the app works on
 * GitHub Pages without any server-side rewrite rules or a repo-name
 * dependent basename. Routes live after a '#' in the URL
 * (e.g. /#/shop), which GitHub Pages always serves correctly on a
 * hard refresh or direct link, regardless of the repository name.
 */
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <ServicesProvider>
        <App />
      </ServicesProvider>
    </HashRouter>
  </React.StrictMode>
);
