// Homepage — ported from Homepage-html/Main.dc.html. Styles live in styles.css (verbatim from the mockup).
import { useEffect, useRef, useState } from 'react';
import Hero from './Hero.jsx';
import Products from './Products.jsx';
import Tools from './Tools.jsx';
import Platform from './Platform.jsx';
import Features from './Features.jsx';
import Contract from './Contract.jsx';
import Numbers from './Numbers.jsx';
import Pricing from './Pricing.jsx';
import Faq from './Faq.jsx';
import Cta from './Cta.jsx';

export default function Home() {
  const [hx, setHx] = useState(0);

  const root = useRef(), hero = useRef(), canvas = useRef();
  const hxEl = useRef(), track = useRef(), hxFill = useRef(), pv = useRef(), hxOn = useRef(false);
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Horizontal tools pin + preview scale.
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      hxOn.current = window.matchMedia('(min-width: 1024px)').matches && !reduce;
      if (!hxOn.current && track.current) track.current.style.transform = '';
      const box = pv.current;
      if (box) {
        const s = Math.min(box.clientWidth / 1440, box.clientHeight / 900 || 1);
        if (s > 0) root.current.style.setProperty('--pv', String(s));
      }
    };
    const tick = () => {
      if (!hxOn.current || !hxEl.current) return;
      const vh = window.innerHeight || 900;
      const hr = hxEl.current.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -hr.top / Math.max(1, hr.height - vh)));
      track.current.style.transform = 'translate3d(' + (-p * 200 / 3) + '%,0,0)';
      hxFill.current.style.transform = 'scaleX(' + p + ')';
      setHx(Math.round(p * 2));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; tick(); }); };
    const onResize = () => { measure(); tick(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    measure(); tick();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); cancelAnimationFrame(raf); };
  }, [reduce]);

  const jump = (i, e) => {
    e?.preventDefault();
    const behavior = reduce ? 'auto' : 'smooth';
    if (hxOn.current) {
      const hr = hxEl.current.getBoundingClientRect();
      window.scrollBy({ top: hr.top + (hr.height - window.innerHeight) * (i / 2) + 2, behavior });
    } else {
      hxEl.current.querySelectorAll('.hx-panel')[i]?.scrollIntoView({ behavior, block: 'start' });
    }
  };

  return (
    <div ref={root}>
      <Hero heroRef={hero} canvasRef={canvas} reduce={reduce} />
      <Products onJump={jump} />
      <Tools hx={hx} onJump={jump} hxElRef={hxEl} trackRef={track} hxFillRef={hxFill} pvRef={pv} />
      <Platform />
      <Features />
      <Contract />
      <Numbers />
      <Pricing />
      <Faq />
      <Cta />
    </div>
  );
}
