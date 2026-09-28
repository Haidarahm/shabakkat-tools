import { useState } from 'react';
import { Arrow, NET, TOOL_ICONS } from '../../icons.jsx';
import { TOOLS, r } from './data.js';

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const per = yearly ? 'per year, billed annually' : 'per month';

  return (
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
  );
}
