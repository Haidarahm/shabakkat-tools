import { useState } from 'react';
import { flushSync } from 'react-dom';
import { Arrow, Chevron, HrIco, LogoMark, TOOL_ICONS } from '../icons.jsx';
import { TOOLS } from '../pages/home/data.js';
import { ACCENTS } from './Layout.jsx';

export default function Nav({ navRef, barRef }) {
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');

  // Swap theme, then grow the new one out of the toggle as a circle (View Transitions; instant swap where unsupported).
  const toggleTheme = (e) => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const apply = () => flushSync(() => {
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch {}
      setTheme(next);
    });
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return apply();
    const r = e.currentTarget.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 900, easing: 'cubic-bezier(.16,1,.3,1)', pseudoElement: '::view-transition-new(root)' });
    }).catch(() => {}); // aborted (e.g. tab hidden): theme still applied
  };

  return (
    <header className="nav" ref={navRef}>
      <div className="wrap nav-in">
        <a className="logo" href="/" aria-label="Shabakkat home"><LogoMark /><span>shabakkat</span></a>
        <nav aria-label="Main">
          <ul className="nav-links">
            <li className="has-menu">
              <button className="nav-a" type="button" aria-haspopup="true">Products <Chevron /></button>
              <div className="menu">
                {TOOLS.filter((t) => t.id !== 'pulse').map((t) => {
                  const Ico = TOOL_ICONS[t.id];
                  return (
                    <a className="menu-item" href={'/' + t.id} key={t.id} style={{ '--blue': ACCENTS.tools }}>
                      <span className="glyph"><Ico /></span>
                      <span><b>{t.name}</b><small>{t.menu}</small></span>
                      <Arrow className="arr" width="18" height="18" />
                    </a>
                  );
                })}
                <a className="menu-item" href="/hr" style={{ '--blue': ACCENTS.hr }}>
                  <span className="glyph"><HrIco /></span>
                  <span><b>HR System</b><small>People, payroll and processes</small></span>
                  <Arrow className="arr" width="18" height="18" />
                </a>
                <div className="menu-foot"><span>All three run on one Shabakkat account.</span><a className="link" href="/#platform">How it fits</a></div>
              </div>
            </li>
            <li><a className="nav-a" href="/#platform">Platform</a></li>
            <li><a className="nav-a" href="/#pricing">Pricing</a></li>
            <li><a className="nav-a" href="/#faq">FAQ</a></li>
          </ul>
        </nav>
        <div className="nav-right">
          <div className="lang" role="group" aria-label="Language">
            <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
            <button type="button" aria-pressed={lang === 'ar'} onClick={() => setLang('ar')} lang="ar">ع</button>
          </div>
          <button className="icon-btn theme-tg" type="button" onClick={toggleTheme} aria-pressed={theme === 'light'}
            aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <mask id="tg-moon"><rect x="-4" y="-4" width="32" height="32" fill="#fff" /><circle className="tg-cut" cx="22" cy="2" r="4" fill="#000" /></mask>
              <circle className="tg-core" cx="12" cy="12" r="5" fill="currentColor" mask="url(#tg-moon)" />
              <path className="tg-rays" d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <a className="btn btn-primary btn-sm" href="/#cta">Book demo</a>
        </div>
      </div>
      <div className="nav-progress" aria-hidden="true"><span ref={barRef} /></div>
    </header>
  );
}
