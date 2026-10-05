import { useState } from 'react';
import { Arrow, Chevron, HrIco, LogoMark, TOOL_ICONS } from '../icons.jsx';
import { TOOLS } from '../pages/home/data.js';
import { ACCENTS } from './Layout.jsx';

export default function Nav({ navRef, barRef }) {
  const [lang, setLang] = useState('en');

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
          <a className="nav-a" href="/">Log in</a>
          <a className="btn btn-primary btn-sm" href="/#cta">Book demo</a>
        </div>
      </div>
      <div className="nav-progress" aria-hidden="true"><span ref={barRef} /></div>
    </header>
  );
}
