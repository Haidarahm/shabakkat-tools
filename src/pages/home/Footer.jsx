import { LogoMark } from '../../icons.jsx';
import { TOOLS } from './data.js';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="grid12 foot-grid">
          <div className="foot-id">
            <a className="logo" href="#top" aria-label="Shabakkat home"><LogoMark /><span>shabakkat</span></a>
            <p>One platform, three tools for the way you work with customers.</p>
          </div>
          <nav className="foot-col" aria-label="Products"><h4>Products</h4>{TOOLS.map((t) => <a key={t.id} href={'/' + t.id}>{t.name}</a>)}</nav>
          <nav className="foot-col" aria-label="Platform"><h4>Platform</h4><a href="#platform">Platform</a><a href="#pricing">Pricing</a><a href="#top">Blogs</a></nav>
          <nav className="foot-col" aria-label="Account"><h4>Account</h4><a href="#top">Log in</a><a href="#top">العربية</a><a href="#cta">Book demo</a></nav>
        </div>
        <div className="foot-word" aria-hidden="true">shabakkat</div>
        <div className="foot-base"><span>© 2026 Shabakkat</span><span className="mono">[LEGAL LINKS]</span></div>
      </div>
    </footer>
  );
}
