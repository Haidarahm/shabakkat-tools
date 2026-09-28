import { Arrow, TOOL_ICONS } from '../../icons.jsx';
import { TOOLS, r } from './data.js';

export default function Products({ onJump }) {
  return (
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
              <a className="pcard" href="#tools" onClick={(e) => onJump(i, e)} {...r(i)} key={t.id}>
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
  );
}
