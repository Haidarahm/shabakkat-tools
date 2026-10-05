// Pulse — analytics & dashboards. Ported from Homepage-html/Pulse.dc.html.
import { useEffect, useRef, useState } from 'react';
import Rail from './Rail.jsx';
import { Spark, Arrow } from '../icons.jsx';

const ANSWERS = [
  { q: 'Which channel resolves fastest?', a: 'Web chat resolves fastest this period — about a third quicker than email.', src: 'Reach · median time to resolve', bars: [['Chat', 38, '11m'], ['WhatsApp', 52, '16m'], ['Email', 100, '31m']] },
  { q: 'Are contracts getting signed faster?', a: 'Yes. Median time to sign dropped from 4.1 to 2.6 days since reminders were switched on.', src: 'Sign · time to complete', bars: [['Before', 100, '4.1d'], ['After', 63, '2.6d']] },
  { q: 'Who needs attention this week?', a: 'Two accounts have open conversations and unsigned renewals: Khatib Logistics and Noon Home Supplies.', src: 'Reach + Sign', bars: [['Khatib', 100, '3 open'], ['Noon', 66, '2 open']] }
];
const RANGES = { '7': { n: 7, lbl: ['Mon', 'Sun'], mult: 0.25, unit: 'day' }, '30': { n: 30, lbl: ['1 Sep', '30 Sep'], mult: 1, unit: 'day' }, '90': { n: 13, lbl: ['Week 1', 'Week 13'], mult: 3, unit: 'week' } };
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const series = (n, base, amp, seed) => {
  const out = [];
  for (let i = 0; i < n; i++) out.push(Math.max(1, base + Math.sin(i * 0.7 + seed) * amp + Math.sin(i * 0.23 + seed * 2) * amp * 0.6 + i * (amp / n) * 1.2));
  return out;
};
const spark = (seed) => {
  const a = series(12, 10, 4, seed), mx = Math.max(...a) * 1.1;
  return a.map((v, i) => (i ? 'L' : 'M') + (i * 10).toFixed(1) + ' ' + (34 - (v / mx) * 30).toFixed(1)).join(' ');
};
const HBar = ({ k, w, v, mute, style }) => <div className="pl-hb" style={style}><span>{k}</span><span className="bar"><i className={mute ? 'mute' : ''} style={{ width: w }} /></span><b>{v}</b></div>;

export default function Pulse() {
  const [range, setRange] = useState('30');
  const [metric, setMetric] = useState('res');
  const [hover, setHover] = useState(-1);
  const [ask, setAsk] = useState(-1);
  const [custom, setCustom] = useState('');
  const [thinking, setThinking] = useState(false);
  const [q, setQ] = useState('');
  const tt = useRef();
  useEffect(() => () => clearTimeout(tt.current), []);

  const run = (i, text) => {
    clearTimeout(tt.current);
    setAsk(i); setThinking(true); setQ(''); setCustom(text || '');
    tt.current = setTimeout(() => setThinking(false), 1100);
  };

  const R = RANGES[range];
  const M = {
    res: { label: 'Conversations resolved', base: 42, amp: 12, fmt: (v) => Math.round(v), total: Math.round(1284 * R.mult).toLocaleString('en'), delta: '+12%', src: 'Reach', seed: 1 },
    frt: { label: 'Median first response (min)', base: 9, amp: 3, fmt: (v) => v.toFixed(1) + 'm', total: '7.4m', delta: '−18%', src: 'Reach', seed: 2 },
    sgn: { label: 'Contracts signed', base: 10, amp: 4, fmt: (v) => Math.round(v), total: Math.round(312 * R.mult).toLocaleString('en'), delta: '+8%', src: 'Sign', seed: 3 },
    csat: { label: 'Satisfaction (CSAT)', base: 4.4, amp: 0.25, fmt: (v) => v.toFixed(2), total: '4.6', delta: '+0.2', src: 'Reach surveys', seed: 4 }
  };
  const m = M[metric];
  const n = R.n, wk = R.unit === 'week' ? 7 : 1;
  const cur = series(n, m.base * wk, m.amp * wk, m.seed);
  const prev = series(n, m.base * 0.88 * wk, m.amp * wk, m.seed + 1.7);
  const max = Math.max(...cur, ...prev) * 1.1;
  const X0 = 36, X1 = 760, Y0 = 215, Y1 = 20;
  const px = (i) => X0 + (n === 1 ? 0 : i * (X1 - X0) / (n - 1));
  const py = (v) => Y0 - (v / max) * (Y0 - Y1);
  const path = (arr) => arr.map((v, i) => (i ? 'L' : 'M') + px(i).toFixed(1) + ' ' + py(v).toFixed(1)).join(' ');
  const line = path(cur);
  const area = line + ' L' + X1 + ' ' + Y0 + ' L' + X0 + ' ' + Y0 + ' Z';
  const step = (X1 - X0) / Math.max(1, n - 1);
  const hov = hover >= 0 && hover < n;
  const hovLabel = hov ? (R.unit === 'week' ? 'Week ' + (hover + 1) : range === '7' ? DAYS[hover] + ' ' : 'Sep ' + (hover + 1)) : '';
  const ans = ask >= 0 ? ANSWERS[ask] : null;
  const chV = range === '7' ? [128, 204, 71] : range === '30' ? [512, 821, 284] : [1540, 2466, 853];
  const chMax = Math.max(...chV);
  const submit = (e) => {
    e.preventDefault();
    const t = q.trim(); if (!t) return;
    run(/sign|contract/i.test(t) ? 1 : /attention|who|account/i.test(t) ? 2 : 0, t);
  };

  return (
    <div className="u-app" style={{ width: 1440, height: 900, fontFamily: "Cairo, 'Segoe UI', system-ui, sans-serif", color: '#EEF2E6', '--blue': '#C8FF00' }}>
      <Rail on="pulse" extra={
        <button className="u-rb" type="button" aria-label="Reports"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 16v-4M12 16V8M16 16v-6" /></svg></button>
      } />

      <main className="pl-main">
        <div className="pl-top">
          <div className="t"><h1 className="u-h" style={{ fontSize: 24 }}>Overview</h1><small>All tools · Reach, Sign · <span className="u-tag" style={{ height: 18 }}>Sample data</span></small></div>
          <div className="u-tabs" role="tablist" aria-label="Date range" style={{ width: 220 }}>
            {[['7', '7D'], ['30', '30D'], ['90', '90D']].map(([k, label]) => (
              <button key={k} className={'u-tab' + (range === k ? ' on' : '')} type="button" role="tab" aria-selected={range === k} onClick={() => { setRange(k); setHover(-1); }}>{label}</button>
            ))}
          </div>
          <button className="u-btn" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></svg>Schedule report</button>
          <button className="u-btn pri" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>Export</button>
        </div>

        <div className="pl-body">
          <div className="pl-kpis">
            {Object.keys(M).map((k) => {
              const label = M[k].label.replace(' (min)', '').replace(' (CSAT)', '');
              return (
                <div key={k} className={'u-card pl-kpi' + (metric === k ? ' sel' : '')}>
                  <button type="button" onClick={() => { setMetric(k); setHover(-1); }} aria-label={'Show ' + label + ' on chart'} aria-pressed={metric === k} />
                  <span className="u-lbl">{label}</span>
                  <div className="v"><b>{M[k].total}</b><span className="d">{M[k].delta}</span></div>
                  <span style={{ fontSize: 12, color: 'var(--ink3)' }}>{M[k].src}</span>
                  <svg viewBox="0 0 110 36" preserveAspectRatio="none" aria-hidden="true"><path d={spark(M[k].seed)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'var(--blue)' }} /></svg>
                </div>
              );
            })}
          </div>

          <section className="u-card pl-chart" aria-label="Trend chart">
            <div className="pl-ch">
              <h2 className="u-h">{m.label}</h2>
              <div className="pl-leg"><span><i />This period</span><span><i className="prev" />Previous period</span></div>
            </div>
            <div className="pl-plot">
              <svg viewBox="0 0 760 250" preserveAspectRatio="none" onMouseLeave={() => setHover(-1)} role="img" aria-label={m.label + ' over the selected range'}>
                <g className="pl-grid">{[20, 85, 150, 215].map((y) => <line key={y} x1="36" x2="760" y1={y} y2={y} />)}</g>
                <text className="pl-ax" x="0" y="24">{m.fmt(max)}</text><text className="pl-ax" x="0" y="154">{m.fmt(max * 0.33)}</text><text className="pl-ax" x="0" y="219">0</text>
                <path className="pl-prev" d={path(prev)} />
                <path className="pl-area" d={area} />
                <path className="pl-line" d={line} />
                {hov && <>
                  <line className="pl-cross" x1={px(hover).toFixed(1)} x2={px(hover).toFixed(1)} y1="10" y2="215" />
                  <circle className="pl-dot" cx={px(hover).toFixed(1)} cy={py(cur[hover]).toFixed(1)} r="5" />
                </>}
                {cur.map((_, i) => <rect key={i} className="pl-hit" x={(px(i) - step / 2).toFixed(1)} y="0" width={step.toFixed(1)} height="250" onMouseEnter={() => setHover(i)} />)}
                <text className="pl-ax" x="36" y="246">{R.lbl[0]}</text><text className="pl-ax" x="760" y="246" textAnchor="end">{R.lbl[1]}</text>
              </svg>
              {hov && <div className="pl-tip" style={{ left: ((px(hover) / 760) * 100).toFixed(2) + '%' }}><span>{hovLabel}</span><b>{m.fmt(cur[hover])}</b></div>}
            </div>
          </section>

          <section className="u-card pl-ask" aria-label="Ask Pulse">
            <div className="hd"><Spark /><h2 className="u-h" style={{ fontSize: 18, flex: 1 }}>Ask Pulse</h2>{ans && <button className="u-btn sm" type="button" onClick={() => { setAsk(-1); setThinking(false); }}>New</button>}</div>
            {!ans && <>
              <div className="pl-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5z" /><path d="M9 9.5h6M9 12h3.5" /></svg>
                <b>Ask about your customers</b>
                <span>Pulse reads across Reach and Sign and answers with a chart.</span>
              </div>
              <div className="pl-sug">{ANSWERS.map((a, i) => <button key={a.q} type="button" onClick={() => run(i)}><Arrow />{a.q}</button>)}</div>
            </>}
            {ans && (
              <div className="pl-conv" aria-live="polite">
                <div className="pl-q">{custom || ans.q}</div>
                {thinking
                  ? <div className="pl-a"><div className="u-skel" style={{ width: '90%' }} /><div className="u-skel" style={{ width: '70%' }} /><div className="u-skel" style={{ width: '80%' }} /></div>
                  : <div className="pl-a">
                      <span>{ans.a}</span>
                      {ans.bars.map((b, i) => <HBar key={b[0]} k={b[0]} w={b[1] + '%'} v={b[2]} mute={i > 0} />)}
                      <span className="u-lbl">Source · {ans.src}</span>
                    </div>}
              </div>
            )}
            <form className="pl-in" onSubmit={submit}>
              <label className="u-input"><input type="text" placeholder="Ask a question…" aria-label="Ask Pulse a question" value={q} onChange={(e) => setQ(e.target.value)} /></label>
              <button className="u-btn pri" type="submit" disabled={!q.trim()} aria-label="Ask"><Arrow /></button>
            </form>
          </section>

          <div className="pl-row">
            <section className="u-card pl-box" aria-label="Conversations by channel">
              <div style={{ display: 'flex', alignItems: 'center' }}><h2 className="u-h" style={{ fontSize: 16, flex: 1 }}>By channel</h2><span className="u-tag">Reach</span></div>
              {['WhatsApp', 'Email', 'Web chat'].map((k, i) => {
                const v = chV[[1, 0, 2][i]];
                return <HBar key={k} k={k} v={v.toLocaleString('en')} w={Math.round(v / chMax * 100) + '%'} mute={i > 0} style={{ gridTemplateColumns: '80px 1fr 48px' }} />;
              })}
            </section>
            <section className="u-card pl-box" aria-label="Top accounts">
              <div style={{ display: 'flex', alignItems: 'center' }}><h2 className="u-h" style={{ fontSize: 16, flex: 1 }}>Top accounts</h2><span className="u-tag">Reach + Sign</span></div>
              <table className="pl-tbl">
                <thead><tr><th>Account</th><th className="n">Chats</th><th className="n">Contract</th></tr></thead>
                <tbody>
                  <tr><td>Noon Home Supplies</td><td className="n">{Math.round(48 * R.mult)}</td><td className="n">Awaiting</td></tr>
                  <tr><td>Khatib Logistics</td><td className="n">{Math.round(31 * R.mult)}</td><td className="n">Awaiting</td></tr>
                  <tr><td>Mansoori Clinics</td><td className="n">{Math.round(22 * R.mult)}</td><td className="n">Signed</td></tr>
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
