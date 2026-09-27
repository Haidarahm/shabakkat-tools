// Homepage — ported from Homepage-html/Main.dc.html. Styles live in styles.css (verbatim from the mockup).
import { useEffect, useRef, useState } from 'react';
import { createNet } from './HeroNet.js';
import Reach from './tools/Reach.jsx';
import Sign from './tools/Sign.jsx';
import Pulse from './tools/Pulse.jsx';
import { Arrow, ArrowL, Chevron, Check, Plus, Spark, NET, LogoMark, ReachIco, SignIco, PulseIco, TOOL_ICONS } from './icons.jsx';

const TOOLS = [
  {
    id: 'reach', name: 'Reach', sub: 'Customer conversations', App: Reach,
    menu: 'Customer conversations in one inbox', node: 'Conversations', foot: 'One inbox, every channel',
    head: 'Every customer conversation, in one inbox.',
    heroDesc: 'WhatsApp, email and web chat land in one shared inbox, with an AI assistant that drafts replies in Arabic or English.',
    card: 'One shared inbox for WhatsApp, email and web chat, with AI-drafted replies.',
    bullets: ['Unified inbox', 'AI reply drafts', 'Assignment & SLAs'],
    desc: 'Every message from every channel in one shared inbox. The AI assistant reads the thread and drafts the next reply — your team edits and sends.',
    points: [['Unified inbox.', 'WhatsApp, email and web chat side by side.'], ['AI drafts.', 'Suggested replies in Arabic or English.'], ['Team flow.', 'Assign, tag and track response times.']],
    price: 'Shared inbox, AI reply drafts and team assignment.'
  },
  {
    id: 'sign', name: 'Sign', sub: 'Contracts & e-signature', App: Sign,
    menu: 'Contracts and e-signature', node: 'Contracts', foot: 'Send, sign, store',
    head: 'Contracts that move themselves.',
    heroDesc: 'Draft from templates, send for signature and follow every signer — with AI that summarises the clauses before anyone signs.',
    card: 'Templates, signing workflows and a clear audit trail for every agreement.',
    bullets: ['Contract templates', 'Signing workflows', 'AI clause summaries'],
    desc: 'Build contracts from templates, place signature fields and send. Sign shows who has opened, who has signed and who needs a nudge.',
    points: [['Templates & fields.', 'Reusable contracts, filled in seconds.'], ['Signing order.', 'Sequential or parallel, with reminders.'], ['Clause summaries.', 'AI flags what changed before signing.']],
    price: 'Templates, signing workflows and clause summaries.'
  },
  {
    id: 'pulse', name: 'Pulse', sub: 'Analytics & dashboards', App: Pulse,
    menu: 'Analytics and dashboards', node: 'Insights', foot: 'Sample data',
    head: 'See how your customers really feel.',
    heroDesc: 'Live dashboards across conversations and contracts, and an AI analyst you can ask in plain language.',
    card: 'Dashboards that read across conversations and contracts, with an AI analyst.',
    bullets: ['Live dashboards', 'Ask-anything AI', 'Scheduled reports'],
    desc: 'One dashboard layer over Reach and Sign. Watch response times, signed deals and satisfaction move together — or just ask Pulse a question.',
    points: [['Live dashboards.', 'KPIs across every tool, in one view.'], ['Ask Pulse.', 'Plain-language questions, charted answers.'], ['Reports.', 'Scheduled summaries to your team.']],
    price: 'Live dashboards, Ask Pulse and scheduled reports.'
  }
];

const FAQS = [
  ['What is Shabakkat?', 'One platform that brings three customer tools — Reach, Sign and Pulse — under one account, one customer record and one AI service.'],
  ['Can I start with just one tool?', 'Yes. Start with any of the three and switch the others on later under the same platform contract.'],
  ['Does it work in Arabic?', 'Yes. Every screen has a language switch, and layouts mirror right-to-left in Arabic.'],
  ['How does the AI service work?', 'The same assistant runs inside each tool: it drafts replies in Reach, summarises clauses in Sign and answers questions in Pulse. [ADD MODEL AND DATA-HANDLING DETAILS]'],
  ['How do I get started?', 'Book a demo. We will set up a workspace with the tools your team needs and walk you through it.']
];

const SIG_A = 'M6 44c14-22 22-34 30-30s-8 34 2 34 18-30 28-30-4 28 6 28 14-18 22-18 4 14 14 14 20-12 34-12 14 8 30 6 40-8 60-10';
const SIG_B = 'M8 40c20-4 26-26 38-26s-6 30 8 30 26-34 40-34-10 36 6 36 30-20 50-20 20 10 40 8 30-6 50-8';
const r = (i) => ({ 'data-reveal': '', style: i ? { '--i': i } : undefined });

export default function Home() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hx, setHx] = useState(0);
  const [faq, setFaq] = useState(0);
  const [yearly, setYearly] = useState(false);
  const [lang, setLang] = useState('en');
  const [noGl, setNoGl] = useState(false);
  const [ready, setReady] = useState(false);

  const root = useRef(), nav = useRef(), bar = useRef(), hero = useRef(), canvas = useRef();
  const hxEl = useRef(), track = useRef(), hxFill = useRef(), pv = useRef(), net = useRef(), hxOn = useRef(false);
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const go = (i) => setActive(((i % 3) + 3) % 3);

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

  // WebGL net.
  useEffect(() => {
    const n = createNet(canvas.current, hero.current, { accent: '#1B4DFF', reduce });
    if (!n) { setNoGl(true); return; }
    net.current = n;
    return () => { n.destroy(); net.current = null; };
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

  const pos = (i) => 'pos-' + (((i - active) % 3) + 3) % 3;
  const per = yearly ? 'per year, billed annually' : 'per month';

  return (
    <div className={'sk' + (ready ? ' rv-ready' : '')} ref={root} style={{ '--blue': '#1B4DFF' }}>

      {/* ================= NAV ================= */}
      <header className="nav" ref={nav}>
        <div className="wrap nav-in">
          <a className="logo" href="#top" aria-label="Shabakkat home"><LogoMark /><span>shabakkat</span></a>
          <nav aria-label="Main">
            <ul className="nav-links">
              <li className="has-menu">
                <button className="nav-a" type="button" aria-haspopup="true">Products <Chevron /></button>
                <div className="menu">
                  {TOOLS.map((t) => {
                    const Ico = TOOL_ICONS[t.id];
                    return (
                      <a className="menu-item" href={'/' + t.id} key={t.id}>
                        <span className="glyph"><Ico /></span>
                        <span><b>{t.name}</b><small>{t.menu}</small></span>
                        <Arrow className="arr" width="18" height="18" />
                      </a>
                    );
                  })}
                  <div className="menu-foot"><span>All three run on one Shabakkat account.</span><a className="link" href="#platform">How it fits</a></div>
                </div>
              </li>
              <li><a className="nav-a" href="#platform">Platform</a></li>
              <li><a className="nav-a" href="#pricing">Pricing</a></li>
              <li><a className="nav-a" href="#faq">FAQ</a></li>
            </ul>
          </nav>
          <div className="nav-right">
            <div className="lang" role="group" aria-label="Language">
              <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
              <button type="button" aria-pressed={lang === 'ar'} onClick={() => setLang('ar')} lang="ar">ع</button>
            </div>
            <a className="nav-a" href="#top">Log in</a>
            <a className="btn btn-primary btn-sm" href="#cta">Book demo</a>
          </div>
        </div>
        <div className="nav-progress" aria-hidden="true"><span ref={bar} /></div>
      </header>

      {/* ================= HERO ================= */}
      <section className="hero" id="top" ref={hero}
        onPointerMove={(e) => net.current?.move(e)} onPointerLeave={() => net.current?.leave()} onPointerDown={(e) => net.current?.down(e)}>
        <canvas className="hero-gl" ref={canvas} aria-hidden="true" />
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
                    <div className="ln" style={{ width: '46%', height: 10, background: '#0A1024' }} />
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

        <div className="wrap hero-foot">
          <span className="scroll-cue mono"><i />Scroll to explore</span>
          <span className="hero-hint mono">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M9 3v10.5M9 3a2 2 0 0 1 4 0v7l4.5 1.1a2 2 0 0 1 1.5 2.3l-1 5.1A3 3 0 0 1 15 21h-4.3a3 3 0 0 1-2.5-1.3L5 15" /></svg>
            Move or tap to pull the net
          </span>
        </div>
      </section>

      {/* ================= 01 PRODUCTS ================= */}
      <section className="sec" id="products">
        <div className="wrap">
          <div className="grid12 sec-head">
            <div className="l">
              <span className="eyebrow" {...r()}>01 — Products</span>
              <h2 className="h2" {...r(1)}>Three tools.<br />One network.</h2>
            </div>
            <div className="r">
              <p className="lead" {...r(2)}>Talk to customers, close agreements and read the results — each tool stands on its own, and each gets better when the others are switched on.</p>
            </div>
          </div>
          <div className="pgrid">
            {TOOLS.map((t, i) => {
              const Ico = TOOL_ICONS[t.id];
              return (
                <a className="pcard" href="#tools" onClick={(e) => jump(i, e)} {...r(i)} key={t.id}>
                  <Ico className="big-glyph" strokeWidth="1" tail={t.id === 'sign'} />
                  <div className="top"><span className="num">0{i + 1}</span></div>
                  <h3>{t.name}</h3>
                  <span className="sub">{t.sub}</span>
                  <p>{t.card}</p>
                  <ul>{t.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  <span className="go">See {t.name} up close <span className="circ"><Arrow /></span></span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 02 TOOLS — HORIZONTAL ================= */}
      <section className="hx" id="tools" ref={hxEl} aria-label="The tools, up close">
        <div className="hx-sticky">
          <div className="wrap hx-head">
            <span className="eyebrow">02 — The tools, up close</span>
            <div className="hx-rail" role="group" aria-label="Jump to a tool">
              {TOOLS.map((t, i) => (
                <button key={t.id} className={'hx-stop' + (i === hx ? ' is-on' : '')} type="button" onClick={() => jump(i)} aria-current={i === hx}>0{i + 1} {t.name}</button>
              ))}
              <div className="hx-line" aria-hidden="true"><span ref={hxFill} /></div>
            </div>
          </div>
          <div className="hx-track" ref={track}>
            {TOOLS.map((t, i) => (
              <article className="hx-panel" aria-label={t.name} key={t.id}>
                <div className="wrap grid12 hx-grid">
                  <div className="hx-intro">
                    <span className="hx-num">0{i + 1} <i>/ 03</i></span>
                    <div className="hx-name"><h3>{t.name}</h3></div>
                    <p className="hx-sub">{t.sub}</p>
                    <p className="hx-desc">{t.desc}</p>
                    <ul className="hx-points">
                      {t.points.map(([b, s], k) => <li key={b}><span>{'ABC'[k]}</span><div><b>{b}</b> {s}</div></li>)}
                    </ul>
                    <div className="btn-row"><a className="btn btn-primary" href={'/' + t.id}>Open {t.name} <Arrow /></a><a className="btn btn-ghost" href="#cta">Book demo</a></div>
                  </div>
                  <div className="hx-preview">
                    <div className="pv-frame">
                      <div className="pv-bar"><span className="live" />Live preview — click around<a className="link" href={'/' + t.id}>Full screen</a></div>
                      <div className="pv-box" ref={i === 0 ? pv : undefined}><div className="pv-scale"><t.App /></div></div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 03 PLATFORM ================= */}
      <section className="sec" id="platform">
        <div className="wrap grid12 plat">
          <div className="plat-l">
            <span className="eyebrow" {...r()}>03 — Platform</span>
            <h2 className="h2" {...r(1)}>The net that holds it together.</h2>
            <p className="lead" {...r(2)}>Shabakkat is the layer underneath Reach, Sign and Pulse. A conversation in Reach can become a contract in Sign and a trend in Pulse — without exporting a thing.</p>
            <div className="layers" {...r(3)}>
              <div className="layer"><b>Identity</b><span>One login and one team for every tool.</span></div>
              <div className="layer"><b>Data</b><span>One customer record, shared across the three.</span></div>
              <div className="layer"><b>AI</b><span>One assistant that works inside each tool.</span></div>
            </div>
          </div>
          <div className="plat-r">
            <div className="orbit" {...r()} aria-label="Diagram: Reach, Sign and Pulse connected through the Shabakkat core" role="img">
              <svg viewBox="0 0 600 540" aria-hidden="true">
                <circle className="ring" cx="300" cy="280" r="220" />
                <path className="spoke" d="M300 280 L300 60" />
                <path className="spoke" d="M300 280 L109.5 390" />
                <path className="spoke" d="M300 280 L490.5 390" />
                <path className="arc" d="M300 60 A220 220 0 0 1 490.5 390" />
                <path className="arc" d="M490.5 390 A220 220 0 0 1 109.5 390" />
                <path className="arc" d="M109.5 390 A220 220 0 0 1 300 60" />
              </svg>
              <span className="pk" style={{ offsetPath: "path('M300 60 A220 220 0 0 1 490.5 390')", '--dur': '3.6s' }} />
              <span className="pk" style={{ offsetPath: "path('M490.5 390 A220 220 0 0 1 109.5 390')", '--dur': '3.6s', '--dl': '1.2s' }} />
              <span className="pk" style={{ offsetPath: "path('M109.5 390 A220 220 0 0 1 300 60')", '--dur': '3.6s', '--dl': '2.4s' }} />
              <span className="pk small" style={{ offsetPath: "path('M300 280 L300 60')", '--dur': '2.2s' }} />
              <span className="pk small" style={{ offsetPath: "path('M300 280 L109.5 390')", '--dur': '2.2s', '--dl': '.7s' }} />
              <span className="pk small" style={{ offsetPath: "path('M300 280 L490.5 390')", '--dur': '2.2s', '--dl': '1.4s' }} />
              <span className="flow-l" style={{ left: 440, top: 170 }}>chat → contract</span>
              <span className="flow-l" style={{ left: 250, top: 504 }}>contract → insight</span>
              <span className="flow-l" style={{ left: 40, top: 170 }}>insight → reply</span>
              <div className="core">
                <svg viewBox="0 0 30 30" aria-hidden="true"><path d={NET} stroke="#fff" strokeWidth="1.6" strokeLinecap="round" fill="none" /></svg>
                <b>Shabakkat</b><small>Identity · Data · AI</small>
              </div>
              {[[300, 60], [109, 390], [491, 390]].map(([left, top], i) => {
                const t = TOOLS[i];
                const Ico = TOOL_ICONS[t.id];
                return <div className="node" style={{ left, top }} key={t.id}><span className="glyph"><Ico tail={t.id === 'sign'} /></span><span><b>{t.name}</b><small>{t.node}</small></span></div>;
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 04 FEATURES ================= */}
      <section className="sec" id="features" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="grid12 sec-head">
            <div className="l">
              <span className="eyebrow" {...r()}>04 — Shared features</span>
              <h2 className="h2" {...r(1)}>Built once.<br />Shared by all three.</h2>
            </div>
            <div className="r"><p className="lead" {...r(2)}>The parts every team needs live in the platform, so each tool gets them on day one.</p></div>
          </div>
          <div className="fgrid">
            <article className="fcard wide" {...r()}>
              <div className="txt">
                <span className="tag">In every tool</span>
                <h3>AI service</h3>
                <p>One assistant across the platform: it drafts replies in Reach, summarises clauses in Sign and answers questions in Pulse.</p>
              </div>
              <div className="ai-demo" aria-hidden="true">
                <div className="ai-tabs"><span>Reach</span><span className="on">Sign</span><span>Pulse</span></div>
                <div className="ai-row"><span className="who">HA</span><p>What changed in this renewal?</p></div>
                <div className="ai-row"><span className="who ai"><Spark /></span><p>Two clauses: the term moves to 24 months, and the notice period drops to 30 days.</p></div>
                <div className="ai-row"><span className="who ai"><Spark /></span><span className="typing"><i /><i /><i /></span></div>
              </div>
            </article>
            <article className="fcard" {...r(1)}>
              <span className="tag">In every tool</span>
              <h3>Dashboards</h3>
              <p>Each tool reports into the same dashboard layer, so the numbers line up across teams.</p>
              <div className="mini-dash" aria-hidden="true">{[40, 55, 48, 70, 62, 84, 76, 92, 100].map((h, i) => <i key={i} style={{ '--h': h + '%' }} />)}</div>
            </article>
            <article className="fcard" {...r()}>
              <span className="f-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5" /></svg></span>
              <h3>One customer record</h3>
              <p>A contact's chats, contracts and metrics sit on a single profile.</p>
            </article>
            <article className="fcard" {...r(1)}>
              <span className="f-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M4 5h9M8.5 3v2M6 5c.6 3.5 3 6 6 7.5M11 5c-.8 3.8-3.4 6.8-7 8.5" /><path d="M13 21l4-10 4 10M14.5 17.5h5" /></svg></span>
              <h3>Arabic &amp; English</h3>
              <p>A language switch on every screen, with layouts that mirror right-to-left.</p>
            </article>
            <article className="fcard" {...r(2)}>
              <span className="f-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3 5 6v5.5c0 4.2 2.9 7.9 7 9.5 4.1-1.6 7-5.3 7-9.5V6z" /><path d="m9 12 2 2 4-4" /></svg></span>
              <h3>Roles &amp; permissions</h3>
              <p>Invite your team once, then decide who sees what in each tool.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ================= 05 CONTRACT ================= */}
      <section className="sec" id="contract" style={{ background: 'var(--paper)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap grid12 contract">
          <div className="ct-doc" {...r()}>
            <div className="meta"><span>Platform agreement</span><span>[REF NO.]</span></div>
            <h4>Shabakkat platform contract</h4>
            <div className="ln" style={{ width: '94%' }} /><div className="ln" style={{ width: '86%' }} /><div className="ln hl" style={{ width: '72%' }} />
            <div className="ct-tools">{TOOLS.map((t) => <span key={t.id}><Check strokeWidth="1.8" />{t.name}</span>)}</div>
            <div className="ln" style={{ width: '90%' }} /><div className="ln" style={{ width: '58%' }} />
            <div className="ct-sign">
              <div><svg viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden="true"><path className="sig-path" d={SIG_A} /></svg><small>Client</small></div>
              <div><svg viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden="true"><path className="sig-path" d={SIG_B} /></svg><small>Shabakkat</small></div>
            </div>
          </div>
          <div className="ct-text">
            <span className="eyebrow" {...r()}>05 — Contract</span>
            <h2 className="h2" {...r(1)}>One contract for the whole platform.</h2>
            <p className="lead" {...r(2)}>Sign once with Shabakkat and switch tools on as your team needs them — one agreement, one invoice, one renewal date.</p>
            <dl className="terms" {...r(3)}>
              <div><dt>Term</dt><dd>[TERM LENGTH]</dd></div>
              <div><dt>Service</dt><dd>24/7 support</dd></div>
              <div><dt>Uptime commitment</dt><dd>[SLA %]</dd></div>
              <div><dt>Data residency</dt><dd>[REGION]</dd></div>
            </dl>
            <div className="btn-row" {...r(4)}><a className="btn btn-ghost" href="#cta">Request the contract</a></div>
          </div>
        </div>
      </section>

      {/* ================= 06 NUMBERS ================= */}
      <section className="sec" id="proof">
        <div className="wrap">
          <div className="grid12 sec-head" style={{ marginBottom: 64 }}>
            <div className="l"><span className="eyebrow" {...r()}>06 — In numbers</span></div>
          </div>
          <div className="nums">
            <div className="num-i" {...r()}><b><span>24/7</span></b><small>Service</small></div>
            <div className="num-i" {...r(1)}><b><span>3</span></b><small>Models</small></div>
            <div className="num-i" {...r(2)}><b><span>4M</span><sup>+</sup></b><small>Users</small></div>
            <div className="num-i ph" {...r(3)}><b><span>[00]</span></b><small>[Your next figure]</small></div>
          </div>
        </div>
      </section>

      {/* ================= 07 PRICING ================= */}
      <section className="sec" id="pricing" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="grid12 sec-head">
            <div className="l">
              <span className="eyebrow" {...r()}>07 — Pricing</span>
              <h2 className="h2" {...r(1)}>Pay for the tools you use.</h2>
            </div>
            <div className="r" style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
              <p className="lead" {...r(2)}>Start with one tool, or run the whole platform at a bundled price.</p>
              <div className="seg" role="group" aria-label="Billing period" {...r(3)}>
                <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>Monthly</button>
                <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>Yearly · save [X]%</button>
              </div>
            </div>
          </div>
          <div className="prgrid">
            {TOOLS.map((t, i) => {
              const Ico = TOOL_ICONS[t.id];
              return (
                <article className="pr" {...r(i)} key={t.id}>
                  <div className="hd"><span className="glyph"><Ico tail={t.id === 'sign'} /></span><b>{t.name}</b></div>
                  <div><div className="price">[PRICE]</div><div className="per">{per}</div></div>
                  <p>{t.price}</p>
                  <a className="btn btn-ghost" href="#cta">Choose {t.name}</a>
                </article>
              );
            })}
            <article className="pr feat" {...r(3)}>
              <div className="hd">
                <span className="glyph"><svg viewBox="0 0 30 30" aria-hidden="true"><path d={NET} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" /></svg></span>
                <b>Platform</b><span className="tag" style={{ marginLeft: 'auto' }}>All three</span>
              </div>
              <div><div className="price">[PRICE]</div><div className="per">{per}</div></div>
              <p>Reach, Sign and Pulse under one contract, with the shared AI service.</p>
              <a className="btn btn-white" href="#cta">Book demo</a>
            </article>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}><a className="link" href="#pricing">See full pricing <Arrow /></a></div>
        </div>
      </section>

      {/* ================= 08 FAQ ================= */}
      <section className="sec" id="faq" style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)' }}>
        <div className="wrap grid12 faq">
          <div className="faq-l">
            <span className="eyebrow" {...r()}>08 — FAQ</span>
            <h2 className="h2" {...r(1)}>Questions, answered.</h2>
            <p className="lead" {...r(2)}>Something missing? We'll walk you through it in a demo.</p>
            <div {...r(3)}><a className="link" href="#cta">Book demo <Arrow /></a></div>
          </div>
          <div className="faq-r" {...r()}>
            {FAQS.map(([q, a], i) => (
              <div className={'faq-item' + (faq === i ? ' is-open' : '')} key={q}>
                <h3 style={{ margin: 0 }}>
                  <button className="faq-q" type="button" aria-expanded={faq === i} onClick={() => setFaq(faq === i ? -1 : i)}>
                    <span>{q}</span><span className="pm"><Plus /></span>
                  </button>
                </h3>
                <div className="faq-a"><div><p>{a}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 09 CTA ================= */}
      <section className="sec" id="cta" style={{ paddingBlock: '40px 0' }}>
        <div className="wrap">
          <div className="cta" {...r()}>
            <svg className="net" viewBox="0 0 760 620" aria-hidden="true"><defs><pattern id="netc" width="48" height="41.6" patternUnits="userSpaceOnUse"><path d="M0 0H48M0 0 24 41.6M48 0 24 41.6" stroke="currentColor" strokeWidth="1" fill="none" /></pattern></defs><rect width="760" height="620" fill="url(#netc)" /></svg>
            <span className="mono" style={{ position: 'relative', opacity: 0.85 }}>Book a demo</span>
            <h2>Ready to bring your customer work onto one platform?</h2>
            <div className="btn-row">
              <a className="btn btn-white" href="#top">Book demo <Arrow /></a>
              <a className="btn btn-ghost" href="#pricing">See pricing</a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
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
    </div>
  );
}
