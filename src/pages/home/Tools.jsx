import { Arrow } from '../../icons.jsx';
import { TOOLS } from './data.js';

export default function Tools({ hx, onJump, hxElRef, trackRef, hxFillRef, pvRef }) {
  return (
    <section className="hx" id="tools" ref={hxElRef} aria-label="The tools, up close">
      <div className="hx-sticky">
        <div className="wrap hx-head">
          <span className="eyebrow">02 — The tools, up close</span>
          <div className="hx-rail" role="group" aria-label="Jump to a tool">
            {TOOLS.map((t, i) => (
              <button key={t.id} className={'hx-stop' + (i === hx ? ' is-on' : '')} type="button" onClick={() => onJump(i)} aria-current={i === hx}>0{i + 1} {t.name}</button>
            ))}
            <div className="hx-line" aria-hidden="true"><span ref={hxFillRef} /></div>
          </div>
        </div>
        <div className="hx-track" ref={trackRef}>
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
                    <div className="pv-box" ref={i === 0 ? pvRef : undefined}><div className="pv-scale"><t.App /></div></div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
