// Sign — contracts & e-signature. Ported from Homepage-html/Sign.dc.html.
import { useState } from 'react';
import Rail, { useToast, Toast } from './Rail.jsx';
import { Spark, Plus } from '../icons.jsx';

const S1 = 'M6 30c14-18 22-26 30-22s-8 26 2 26 18-22 28-22-4 20 6 20 14-12 22-12 4 10 14 10 20-8 34-8 30 4 60 2';
const S2 = 'M8 28c20-4 26-20 38-20s-6 22 8 22 26-24 40-24-10 26 6 26 30-14 50-14 20 6 40 4';
const DOCS = [
  { id: 'd1', title: 'Supply renewal 2027', party: 'Noon Home Supplies', status: 'await', pages: 3, when: '2h ago', signers: [{ name: 'Layla Haddad', role: 'Client', done: true, path: S1 }, { name: 'Haidar Ahmad', role: 'Shabakkat', done: true, path: S2 }, { name: 'Finance approver', role: 'Client', done: false }] },
  { id: 'd2', title: 'Service agreement — Khatib Logistics', party: 'Khatib Logistics', status: 'await', pages: 5, when: 'today', signers: [{ name: 'Omar Khatib', role: 'Client', done: false }, { name: 'Haidar Ahmad', role: 'Shabakkat', done: false }] },
  { id: 'd3', title: 'Pilot agreement', party: 'Mansoori Clinics', status: 'done', pages: 4, when: '12 Sep', signers: [{ name: 'Noura Al Mansoori', role: 'Client', done: true, path: S1 }, { name: 'Haidar Ahmad', role: 'Shabakkat', done: true, path: S2 }] },
  { id: 'd4', title: 'Platform agreement — draft', party: 'Aziz Studio', status: 'draft', pages: 3, when: 'Mon', signers: [{ name: 'Rania Aziz', role: 'Client', done: false }, { name: 'Haidar Ahmad', role: 'Shabakkat', done: false }] }
];
const LABELS = { draft: 'Draft', await: 'Awaiting', done: 'Completed' };
const TAGC = { draft: '', await: 'warn', done: 'ok' };
const STATUSES = [['all', 'All'], ['draft', 'Drafts'], ['await', 'Awaiting'], ['done', 'Completed'], ['expired', 'Expired']];
const TABS = [['signers', 'Signers'], ['ai', 'AI summary'], ['log', 'Activity']];

export default function Sign() {
  const [status, setStatus] = useState('all');
  const [sel, setSel] = useState('d1');
  const [tab, setTab] = useState('signers');
  const [reminded, setReminded] = useState({});
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState('Please review and sign the updated agreement.');
  const [tried, setTried] = useState(false);
  const [sentDocs, setSentDocs] = useState({});
  const [toast, flash] = useToast();

  const eff = (d) => (sentDocs[d.id] && d.status === 'draft' ? 'await' : d.status);
  const shown = DOCS.filter((d) => status === 'all' || eff(d) === status);
  const doc = DOCS.find((d) => d.id === sel) || DOCS[0];
  const es = eff(doc);
  const nextIdx = doc.signers.findIndex((p) => !p.done);
  const signers = doc.signers.map((p, i) => {
    const key = doc.id + i, rem = !!reminded[key], waiting = i === nextIdx && es === 'await';
    return { ...p, n: String(i + 1), key, rem, canRemind: !p.done && waiting,
      state: p.done ? 'Signed' : (waiting ? 'Viewed · waiting' : 'Not yet sent') };
  });
  const doneN = doc.signers.filter((p) => p.done).length;
  const msgErr = tried && !msg.trim();
  const log = [
    { text: 'Created from “Platform agreement” template', at: 'Mon 09:10' },
    { text: 'Sent to ' + doc.signers[0].name, at: 'Mon 09:14' },
    { text: doc.signers[0].name + (doc.signers[0].done ? ' signed' : ' viewed'), at: 'Tue 11:02' },
    { text: 'AI flagged a change in clause 3', at: 'Tue 11:03' }
  ];
  const confirmSend = () => {
    if (!msg.trim()) { setTried(true); return; }
    setModal(false); setSentDocs({ ...sentDocs, [doc.id]: true }); flash('Sent to ' + doc.signers.length + ' signers');
  };

  return (
    <div className="u-app" style={{ width: 1440, height: 900, fontFamily: "Cairo, 'Segoe UI', system-ui, sans-serif", color: 'var(--ink)', '--blue': '#C8FF00' }}>
      <Rail on="sign" extra={
        <button className="u-rb" type="button" aria-label="Templates"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 9h8M8 13h5" /></svg></button>
      } />

      <aside className="sg-side" aria-label="Documents">
        <div className="sg-sh">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 className="u-h" style={{ fontSize: 24 }}>Contracts</h1>
            <button className="u-btn pri sm" type="button"><Plus />New</button>
          </div>
          <div className="sg-status" role="tablist" aria-label="Status">
            {STATUSES.map(([k, label]) => (
              <button key={k} className={'sg-chip' + (status === k ? ' on' : '')} type="button" role="tab" aria-selected={status === k} onClick={() => setStatus(k)}>
                {label} <i>{k === 'all' ? DOCS.length : DOCS.filter((d) => eff(d) === k).length}</i>
              </button>
            ))}
          </div>
        </div>
        <div className="sg-list">
          {shown.map((d) => (
            <button key={d.id} className={'sg-doc' + (d.id === doc.id ? ' on' : '')} type="button" onClick={() => setSel(d.id)}>
              <span className="sg-ico" />
              <span className="m"><b>{d.title}</b><small>{d.party}</small><span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><span className={'u-tag ' + TAGC[eff(d)]}>{LABELS[eff(d)]}</span><small>{d.when}</small></span></span>
            </button>
          ))}
          {shown.length === 0 && <div className="sg-empty" style={{ padding: '48px 20px' }}><b>Nothing here yet</b><span>No contracts have this status.</span></div>}
        </div>
      </aside>

      <main className="sg-main">
        <div className="sg-top">
          <div className="t"><b>{doc.title}</b><small>{doc.party} · {doc.pages} pages · updated {doc.when}</small></div>
          <span className={'u-tag ' + TAGC[es]}>{LABELS[es]}</span>
          <button className="u-btn" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>Download</button>
          <button className="u-btn pri" type="button" onClick={() => { setModal(true); setTried(false); }} disabled={es === 'done'}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 12 20 4l-6 16-3-7z" /></svg>
            {es === 'done' ? 'Completed' : (es === 'await' ? 'Resend' : 'Send for signature')}
          </button>
        </div>
        <div className="sg-stage">
          <div className="sg-thumbs" aria-label="Pages">
            <div className="sg-th on"><span>1</span></div><div className="sg-th"><span>2</span></div><div className="sg-th"><span>3</span></div>
          </div>
          <article className="sg-paper">
            <div className="meta"><span>Agreement</span><span>Ref [REF NO.]</span><span>Page 1 of {doc.pages}</span></div>
            <h2>{doc.title}</h2>
            <div className="sg-cl"><h3>1. Parties</h3><p>This agreement is made between Shabakkat [LEGAL ENTITY] and {doc.party} (“the Client”).</p></div>
            <div className="sg-cl"><h3>2. Services</h3><p>The Client subscribes to the Shabakkat platform tools listed in Schedule A, delivered under the service levels in Schedule B.</p></div>
            <div className="sg-cl flag">
              <span className="sg-flag"><Spark />Changed since v1</span>
              <h3>3. Term and renewal</h3><p>The agreement runs for 24 months from the effective date and renews automatically unless either party gives 30 days’ written notice.</p>
            </div>
            <div className="sg-cl"><h3>4. Fees</h3><p>Fees are set out in Schedule C and invoiced [BILLING FREQUENCY].</p></div>
            <div className="sg-fields">
              {signers.slice(0, 3).map((p, i) => {
                const next = !p.done && i === nextIdx && es === 'await';
                return (
                  <div key={p.key} className={'sg-field' + (p.done ? ' done' : next ? ' next' : '')}><small>{p.name}</small>
                    {p.done && <svg viewBox="0 0 300 44" preserveAspectRatio="none" aria-hidden="true"><path className="sig" d={p.path} /></svg>}
                    {next && <span className="here">Signs next →</span>}
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </main>

      <aside className="sg-panel" aria-label="Details">
        <div className="sg-ph">
          <div className="u-tabs" role="tablist" aria-label="Details">
            {TABS.map(([k, label]) => <button key={k} className={'u-tab' + (tab === k ? ' on' : '')} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{label}</button>)}
          </div>
        </div>
        <div className="sg-pb">
          {tab === 'signers' && <>
            <div className="sg-order"><span className="u-lbl">Signing order</span><span style={{ marginLeft: 'auto' }}>Sequential</span></div>
            {signers.map((p) => (
              <div className="sg-step" key={p.key}>
                <span className={'sg-num' + (p.done ? ' done' : '')}>
                  {p.done ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="m5 12 5 5 9-10" /></svg> : <span>{p.n}</span>}
                </span>
                <div><b>{p.name}</b><small>{p.role} · {p.state}</small></div>
                {p.canRemind && (
                  <button className="u-btn sm" type="button" disabled={p.rem}
                    onClick={() => { setReminded({ ...reminded, [p.key]: true }); flash('Reminder sent to ' + p.name); }}>
                    {p.rem ? 'Reminded' : 'Remind'}
                  </button>
                )}
              </div>
            ))}
            <div className="u-card" style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ flex: 1 }}><span className="u-lbl">Progress</span><div className="u-h" style={{ fontSize: 22 }}>{doneN} of {doc.signers.length} signed</div></div>
              <a className="u-btn sm" href="/reach">Open chat in Reach</a>
            </div>
          </>}
          {tab === 'ai' && <>
            <span className="u-lbl">Summary · Shabakkat AI</span>
            <div className="sg-pt"><i /><span>A 24-month platform agreement covering the tools in Schedule A.</span></div>
            <div className="sg-pt"><i /><span>Renews automatically; either side can exit with 30 days’ notice.</span></div>
            <div className="sg-pt"><i /><span>Fees and billing frequency sit in Schedule C.</span></div>
            <div className="sg-risk"><b>Changed since v1 — clause 3</b><span>Term extended from 12 to 24 months; notice period reduced from 60 to 30 days.</span></div>
            <div className="u-card" style={{ padding: 14, fontSize: 12, color: 'var(--ink3)', lineHeight: 1.5 }}>AI summaries help reviewers orient. They are not legal advice — read the full clause before signing.</div>
          </>}
          {tab === 'log' && (
            <div className="sg-tl">{log.map((l) => <div key={l.text}><span>{l.text}</span><time>{l.at}</time></div>)}</div>
          )}
        </div>
      </aside>

      {modal && (
        <div className="u-scrim">
          <div className="u-modal" role="dialog" aria-modal="true" aria-labelledby="sg-mt">
            <div className="hd"><h2 className="u-h" id="sg-mt" style={{ fontSize: 22 }}>Send for signature</h2><button className="rc-ib u-btn sm" type="button" aria-label="Close" onClick={() => setModal(false)}>Close</button></div>
            <div className="bd">
              <span className="u-lbl">Recipients · in order</span>
              {signers.map((p) => <div className="sg-rec" key={p.key}><span className="sg-num">{p.n}</span><b>{p.name}</b><span className="u-tag">{p.role}</span></div>)}
              <div className={'u-field' + (msgErr ? ' bad' : '')}>
                <label htmlFor="sg-msg">Message to signers</label>
                <textarea id="sg-msg" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Add a short note" />
                {msgErr && <span className="err">Add a message so signers know what they are signing.</span>}
              </div>
            </div>
            <div className="ft"><button className="u-btn" type="button" onClick={() => setModal(false)}>Cancel</button><button className="u-btn pri" type="button" onClick={confirmSend}>Send now</button></div>
          </div>
        </div>
      )}

      <Toast msg={toast} />
    </div>
  );
}
