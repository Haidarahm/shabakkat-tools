import { useEffect, useRef, useState } from 'react';
import { createNet } from '../../HeroNet.js';
import { Arrow, ArrowL, Spark, ReachIco, SignIco, PulseIco } from '../../icons.jsx';
import { TOOLS, SIG_A } from './data.js';

export default function Hero({ heroRef, canvasRef, reduce }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [noGl, setNoGl] = useState(false);
  const net = useRef();

  const go = (i) => setActive(((i % 3) + 3) % 3);
  const pos = (i) => 'pos-' + (((i - active) % 3) + 3) % 3;

  useEffect(() => {
    const n = createNet(canvasRef.current, heroRef.current, { accent: '#C8FF00', reduce });
    if (!n) { setNoGl(true); return; }
    net.current = n;
    return () => { n.destroy(); net.current = null; };
  }, [reduce, canvasRef, heroRef]);

  return (
    <section className="hero" id="top" ref={heroRef}
      onPointerMove={(e) => net.current?.move(e)} onPointerLeave={() => net.current?.leave()} onPointerDown={(e) => net.current?.down(e)}>
      <canvas className="hero-gl" ref={canvasRef} aria-hidden="true" />
      {noGl && (
        <svg className="hero-fallback" aria-hidden="true">
          <defs><pattern id="netp" width="44" height="38.1" patternUnits="userSpaceOnUse"><path d="M0 0H44M0 0 22 38.1M44 0 22 38.1M0 38.1H44" stroke="currentColor" strokeWidth="1" fill="none" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#netp)" />
        </svg>
      )}

      <div className="wrap grid12 hero-grid">
        <div className="hero-left">
          <span className="eyebrow">One platform · three tools</span>
          <h1 className="hero-title" aria-label="Shabakkat">
            {'Shabakkat.'.split('').map((c, i) => (
              <span key={i} className={'ch' + (c === '.' ? ' dot' : '')} style={{ '--i': i }} aria-hidden="true">{c}</span>
            ))}
          </h1>
          <div className="ht-stack" aria-live="polite">
            {TOOLS.map((t, i) => (
              <div className={'ht-item' + (i === active ? ' is-on' : '')} key={t.id}>
                <div className="ht-kicker">0{i + 1} <i>/</i> {t.name} <i>— {t.sub}</i></div>
                <p className="ht-head">{t.head}</p>
                <p className="ht-desc">{t.heroDesc}</p>
              </div>
            ))}
          </div>
          <div className="btn-row">
            <a className="btn btn-primary" href="#cta">Book demo <Arrow /></a>
            <a className="btn btn-ghost" href="#products">See the products</a>
          </div>
        </div>

        <div className={'hero-right' + (paused ? ' is-paused' : '')}
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <div className="hc-stack" role="group" aria-roledescription="carousel" aria-label="Shabakkat tools">
            <article className={'hc-card ' + pos(0)} aria-label="Reach">
              <div className="hc-top"><span className="glyph"><ReachIco /></span><div><b>Reach</b><small>Customer conversations</small></div><span className="tag">01</span></div>
              <div className="hc-vis">
                <div className="chips"><span className="chip on">All</span><span className="chip">WhatsApp</span><span className="chip">Email</span><span className="chip">Web chat</span></div>
                <div className="bub in b1">Hi — can I change my delivery address?</div>
                <div className="bub out b2">Of course. Send the new one here.</div>
                <div className="bub in ar b3" lang="ar">شكراً، العنوان الجديد في دبي</div>
                <div className="ai-draft"><Spark /><span><b>AI draft ready</b> — reply in Arabic</span></div>
              </div>
              <div className="hc-foot"><span>One inbox, every channel</span><span className="mono">Tool 01</span></div>
            </article>
            <article className={'hc-card ' + pos(1)} aria-label="Sign">
              <div className="hc-top"><span className="glyph"><SignIco /></span><div><b>Sign</b><small>Contracts &amp; e-signature</small></div><span className="tag">02</span></div>
              <div className="hc-vis">
                <div className="paper">
                  <div className="ln" style={{ width: '46%', height: 10, background: 'var(--ink)' }} />
                  <div className="ln" style={{ width: '92%' }} /><div className="ln hl" style={{ width: '80%' }} /><div className="ln" style={{ width: '88%' }} /><div className="ln" style={{ width: '64%' }} />
                  <div className="sig-box"><small>Signature · Client</small>
                    <svg viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden="true"><path className="sig-path" d={SIG_A + ' 30 0 50-2'} /></svg>
                    <div className="stamp"><span>Signed</span></div>
                  </div>
                </div>
              </div>
              <div className="hc-foot"><span>Send, sign, store</span><span className="mono">Tool 02</span></div>
            </article>
            <article className={'hc-card ' + pos(2)} aria-label="Pulse">
              <div className="hc-top"><span className="glyph"><PulseIco /></span><div><b>Pulse</b><small>Analytics &amp; dashboards</small></div><span className="tag">03</span></div>
              <div className="hc-vis">
                <div className="kpis">
                  <div className="kpi"><small>Resolved</small><b>1,284</b><em>+12%</em></div>
                  <div className="kpi"><small>Signed</small><b>312</b><em>+8%</em></div>
                </div>
                <div className="bars" aria-hidden="true">
                  {[38, 52, 44, 66, 58, 74, 92].map((h, d) => <i key={d} className={d === 6 ? 'hi' : undefined} style={{ '--h': h + '%', '--d': d }} />)}
                </div>
              </div>
              <div className="hc-foot"><span>Sample data</span><span className="mono">Tool 03</span></div>
            </article>
          </div>
          <div className="hc-ctrl">
            <button className="icon-btn" type="button" aria-label="Previous tool" onClick={() => go(active - 1)}><ArrowL /></button>
            <div className="hc-steps">
              {TOOLS.map((t, i) => (
                <button key={t.id} className={'hc-step' + (i === active ? ' is-on' : '')} type="button" onClick={() => go(i)} aria-current={i === active}>
                  <span>0{i + 1} {t.name}</span>
                  <span className="hc-bar"><span onAnimationEnd={(e) => { if (e.animationName === 'stepfill') go(i + 1); }} /></span>
                </button>
              ))}
            </div>
            <button className="icon-btn" type="button" aria-label="Next tool" onClick={() => go(active + 1)}><Arrow /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
