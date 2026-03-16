import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css'

function setFaviconForColorScheme() {
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const link = document.getElementById('favicon-svg') as HTMLLinkElement | null
  if (link) link.href = dark ? '/favicon-dark.svg' : '/favicon.svg'
}
setFaviconForColorScheme()
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setFaviconForColorScheme)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
