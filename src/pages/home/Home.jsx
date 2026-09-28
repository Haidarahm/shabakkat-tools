// Homepage — ported from Homepage-html/Main.dc.html. Styles live in styles.css (verbatim from the mockup).
import { useEffect, useRef, useState } from 'react';
import Nav from './Nav.jsx';
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
import Footer from './Footer.jsx';

export default function Home() {
  const [hx, setHx] = useState(0);
  const [ready, setReady] = useState(false);

  const root = useRef(), nav = useRef(), bar = useRef(), hero = useRef(), canvas = useRef();
  const hxEl = useRef(), track = useRef(), hxFill = useRef(), pv = useRef(), hxOn = useRef(false);
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll tick: nav state, progress bar, horizontal tools pin. Measure: preview scale + pin on/off.
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      hxOn.current = window.matchMedia('(min-width: 1024px)').matches && !reduce;
      if (!hxOn.current && track.current) track.current.style.transform = '';
      const w = pv.current?.clientWidth;
      if (w) root.current.style.setProperty('--pv', String(w / 1440));
    };
    const tick = () => {
      const vh = window.innerHeight || 900;
      const rr = root.current.getBoundingClientRect();
      bar.current.style.transform = 'scaleX(' + Math.min(1, Math.max(0, -rr.top / Math.max(1, rr.height - vh))) + ')';
      nav.current.classList.toggle('is-scrolled', rr.top < -24);
      if (hxOn.current) {
        const hr = hxEl.current.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -hr.top / Math.max(1, hr.height - vh)));
        track.current.style.transform = 'translate3d(' + (-p * 200 / 3) + '%,0,0)';
        hxFill.current.style.transform = 'scaleX(' + p + ')';
        setHx(Math.round(p * 2));
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; tick(); }); };
    const onResize = () => { measure(); tick(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    measure(); tick();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); cancelAnimationFrame(raf); };
  }, [reduce]);

  // Reveal on enter.
  useEffect(() => {
    if (reduce || !('IntersectionObserver' in window)) return;
    setReady(true);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    root.current.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    return () => io.disconnect();
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
    <div className={'sk' + (ready ? ' rv-ready' : '')} ref={root} style={{ '--blue': '#1B4DFF' }}>
      <Nav navRef={nav} barRef={bar} />
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
      <Footer />
    </div>
  );
}
