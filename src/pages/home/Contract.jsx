import { Check } from '../../icons.jsx';
import { TOOLS, SIG_A, SIG_B, r } from './data.js';

export default function Contract() {
  return (
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
  );
}
