import { Arrow } from '../../icons.jsx';
import { r } from './data.js';

export default function Cta() {
  return (
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
  );
}
