import { useEffect, useRef, useState } from 'react';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';

export default function Layout({ children, accent = '#C8FF00' }) {
  const [ready, setReady] = useState(false);
  const root = useRef(), nav = useRef(), bar = useRef();
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Nav scrolled state + page progress bar.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const vh = window.innerHeight || 900;
      const rr = root.current.getBoundingClientRect();
      bar.current.style.transform = 'scaleX(' + Math.min(1, Math.max(0, -rr.top / Math.max(1, rr.height - vh))) + ')';
      nav.current.classList.toggle('is-scrolled', rr.top < -24);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; tick(); }); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', tick);
    tick();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', tick); cancelAnimationFrame(raf); };
  }, []);

  // Reveal on enter.
  useEffect(() => {
    if (reduce || !('IntersectionObserver' in window)) return;
    setReady(true);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    root.current.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduce, children]);

  return (
    <div className={'sk' + (ready ? ' rv-ready' : '')} ref={root} style={{ '--blue': accent }}>
      <Nav navRef={nav} barRef={bar} />
      {children}
      <Footer />
    </div>
  );
}
