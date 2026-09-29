import { useEffect, useRef } from 'react';
import { LogoMark } from '../icons.jsx';
import { TOOLS } from '../pages/home/data.js';

const WORD = 'shabakkat';

// Variable-font "text pressure" (after React Bits TextPressure / Codrops proximity type):
// letters near the cursor swell in weight, lift, and fill with brand blue.
function useTextPressure(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const letters = [...el.children];
    const cur = letters.map(() => 0);
    let mouse = null, raf = 0;

    const tick = () => {
      let moving = false;
      const radius = el.offsetHeight * 1.1;
      letters.forEach((l, i) => {
        let target = 0;
        if (mouse) {
          const r = l.getBoundingClientRect();
          const d = Math.hypot(mouse.x - (r.left + r.width / 2), mouse.y - (r.top + r.height / 2));
          target = Math.max(0, 1 - d / radius) ** 1.6;
        }
        cur[i] += (target - cur[i]) * 0.14;
        if (Math.abs(target - cur[i]) > 0.002) moving = true;
        l.style.setProperty('--p', cur[i].toFixed(3));
      });
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const move = (e) => { mouse = { x: e.clientX, y: e.clientY }; kick(); };
    const leave = () => { mouse = null; kick(); };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [ref]);
}

export default function Footer() {
  const wordRef = useRef(null);
  useTextPressure(wordRef);

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="grid12 foot-grid">
          <div className="foot-id">
            <a className="logo" href="/" aria-label="Shabakkat home"><LogoMark /><span>shabakkat</span></a>
            <p>One platform, three tools for the way you work with customers.</p>
          </div>
          <nav className="foot-col" aria-label="Products"><h4>Products</h4>{TOOLS.map((t) => <a key={t.id} href={'/' + t.id}>{t.name}</a>)}</nav>
          <nav className="foot-col" aria-label="Platform"><h4>Platform</h4><a href="/#platform">Platform</a><a href="/#pricing">Pricing</a><a href="/">Blogs</a></nav>
          <nav className="foot-col" aria-label="Account"><h4>Account</h4><a href="/">Log in</a><a href="/">العربية</a><a href="/#cta">Book demo</a></nav>
        </div>
        <div className="foot-word" aria-hidden="true" ref={wordRef}>
          {[...WORD].map((c, i) => <span key={i}>{c}</span>)}
        </div>
        <div className="foot-base"><span>© 2026 Shabakkat</span><span className="mono">[LEGAL LINKS]</span></div>
      </div>
    </footer>
  );
}
