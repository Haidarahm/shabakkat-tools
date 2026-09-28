import { Spark } from '../../icons.jsx';
import { r } from './data.js';

export default function Features() {
  return (
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
  );
}
