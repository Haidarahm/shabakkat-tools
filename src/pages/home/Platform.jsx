import { NET, TOOL_ICONS } from '../../icons.jsx';
import { TOOLS, r } from './data.js';

export default function Platform() {
  return (
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
  );
}
