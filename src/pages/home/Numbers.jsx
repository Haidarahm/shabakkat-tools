import { r } from './data.js';

export default function Numbers() {
  return (
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
  );
}
