// Reach — shared inbox. Ported from Homepage-html/Reach.dc.html.
import { useEffect, useRef, useState } from 'react';
import Rail, { useToast, Toast } from './Rail.jsx';
import { Spark, Plus, Check, Arrow, SignIco, PulseIco } from '../icons.jsx';

const CONVOS = [
  { id: 'c1', name: 'Layla Haddad', ini: 'LH', channel: 'WhatsApp', ch: 'wa', time: '2m', unread: true, sla: '4m left', company: 'Noon Home Supplies', phone: '+971 50 •••• 412', lang: 'Arabic, English', tags: ['VIP', 'Retail'], contract: 'Supply renewal 2027', signPct: '66%', signNote: '2 of 3 signers done', csat: '4.8', spark: 'M0 30 L40 26 L80 28 L120 18 L160 20 L200 10 L260 8',
    msgs: [{ dir: 'in', text: 'Hi, can I change the delivery address on order #4821?', meta: '10:02' }, { dir: 'out', text: 'Of course, Layla. What is the new address?', meta: '10:04 · Haidar' }, { dir: 'in', text: 'شكراً! العنوان الجديد: شارع الوصل، دبي. هل يمكن التوصيل غداً؟', meta: '10:06' }],
    ai: [['Done — I have updated order #4821 to Al Wasl Road, Dubai. It is booked for delivery tomorrow between 10 am and 2 pm.', 'تم — حدّثت الطلب ‎#4821‎ إلى شارع الوصل، دبي. التوصيل غداً بين ١٠ صباحاً و٢ ظهراً.'], ['All set. Order #4821 now ships to Al Wasl Road and arrives tomorrow morning. I will send the tracking link once it leaves.', 'تم التحديث. سيصل الطلب ‎#4821‎ إلى شارع الوصل صباح الغد، وسأرسل رابط التتبع عند الشحن.']] },
  { id: 'c2', name: 'Omar Khatib', ini: 'OK', channel: 'Email', ch: 'em', time: '18m', unread: true, sla: '', company: 'Khatib Logistics', phone: '+962 7 •••• 190', lang: 'English', tags: ['Renewal'], contract: 'Service agreement', signPct: '33%', signNote: 'Waiting on Omar', csat: '4.3', spark: 'M0 20 L40 22 L80 16 L120 24 L160 18 L200 20 L260 14',
    msgs: [{ dir: 'in', text: 'Re: renewal terms for 2027. Can we move to a 24-month term with a 30-day notice period?', meta: '09:41' }],
    ai: [['Hi Omar — yes, we can offer a 24-month term with a 30-day notice period. I have prepared the updated agreement in Sign for your review.', 'مرحباً عمر — نعم، يمكننا تقديم مدة ٢٤ شهراً مع إشعار ٣٠ يوماً. جهّزت الاتفاقية المحدثة للمراجعة.'], ['Thanks Omar. A 24-month term with 30 days notice works for us — the revised contract is ready to sign whenever you are.', 'شكراً عمر. تناسبنا مدة ٢٤ شهراً مع إشعار ٣٠ يوماً، والعقد المعدّل جاهز للتوقيع.']] },
  { id: 'c3', name: 'Noura Al Mansoori', ini: 'NM', channel: 'Chat', ch: 'wc', time: '1h', unread: false, sla: '', company: 'Mansoori Clinics', phone: '+971 55 •••• 007', lang: 'Arabic', tags: ['Onboarding'], contract: 'Pilot agreement', signPct: '100%', signNote: 'Signed · 12 Sep', csat: '4.9', spark: 'M0 32 L40 28 L80 22 L120 20 L160 14 L200 12 L260 6',
    msgs: [{ dir: 'in', text: 'Do you have an Arabic invoice template?', meta: '09:05' }, { dir: 'out', text: 'We do — sharing it now.', meta: '09:07 · Sara' }],
    ai: [['Here is the Arabic invoice template. You can set it as the default for your clinics in Settings → Documents.', 'إليك قالب الفاتورة بالعربية. يمكنك تعيينه افتراضياً من الإعدادات ← المستندات.'], ['Attached is the Arabic template. Want me to make it the default for all three clinics?', 'أرفقت القالب العربي. هل أجعله القالب الافتراضي لعياداتكم الثلاث؟']] },
  { id: 'c4', name: 'Karim Saleh', ini: 'KS', channel: 'WhatsApp', ch: 'wa', time: '3h', unread: false, sla: '', company: 'Saleh & Co.', phone: '+961 3 •••• 554', lang: 'English', tags: ['SMB'], contract: 'Standard terms', signPct: '100%', signNote: 'Signed · 2 Aug', csat: '4.6', spark: 'M0 24 L40 20 L80 22 L120 16 L160 18 L200 14 L260 12',
    msgs: [{ dir: 'out', text: 'Your replacement unit has shipped.', meta: '07:12 · Haidar' }, { dir: 'in', text: 'Thanks, received!', meta: '07:30' }],
    ai: [['Glad it arrived, Karim. I will close this conversation — reply here any time.', 'سعيد بوصوله يا كريم. سأغلق المحادثة، ويمكنك الرد هنا في أي وقت.'], ['Great to hear. Anything else we can help with today?', 'رائع. هل هناك ما يمكننا مساعدتك به اليوم؟']] },
  { id: 'c5', name: 'Rania Aziz', ini: 'RA', channel: 'Email', ch: 'em', time: 'Mon', unread: false, sla: '', company: 'Aziz Studio', phone: '+20 10 •••• 318', lang: 'English', tags: ['Trial'], contract: 'No contract yet', signPct: '0%', signNote: 'Draft in Sign', csat: '—', spark: 'M0 22 L260 22',
    msgs: [{ dir: 'in', text: 'How many seats does the platform plan include?', meta: 'Mon 16:20' }],
    ai: [['Hi Rania — the platform plan includes [SEATS] seats, and you can add more at any time from Settings → Team.', 'مرحباً رانيا — تتضمن خطة المنصة [SEATS] مقاعد، ويمكنك إضافة المزيد من الإعدادات ← الفريق.'], ['Good question. Platform includes [SEATS] seats; extra seats are [PRICE] each per month.', 'سؤال جيد. تتضمن المنصة [SEATS] مقاعد، والمقعد الإضافي [PRICE] شهرياً.']] }
];
const FILTERS = [['all', 'All'], ['wa', 'WhatsApp'], ['em', 'Email'], ['wc', 'Chat']];
const SearchIco = ({ w = 2 }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round"><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4-4" /></svg>;

export default function Reach() {
  const [sel, setSel] = useState('c1');
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const [draft, setDraft] = useState('');
  const [lang, setLang] = useState('en');
  const [ver, setVer] = useState(0);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiHidden, setAiHidden] = useState(false);
  const [sent, setSent] = useState({});
  const [resolved, setResolved] = useState({});
  const [toast, flash] = useToast();
  const t1 = useRef();
  useEffect(() => () => clearTimeout(t1.current), []);

  const ql = q.trim().toLowerCase();
  const shown = CONVOS.filter((c) => (filter === 'all' || c.ch === filter) && (!ql || c.name.toLowerCase().includes(ql)));
  const cur = CONVOS.find((c) => c.id === sel) || CONVOS[0];
  const allMsgs = cur.msgs.concat(sent[cur.id] || []);
  const last = allMsgs[allMsgs.length - 1];
  const isResolved = !!resolved[cur.id];
  const aiText = cur.ai[ver % cur.ai.length][lang === 'ar' ? 1 : 0];
  const statusLabel = isResolved ? 'Resolved' : (last?.dir === 'in' ? 'Waiting on you' : 'Open');
  const statusCls = isResolved ? 'ok' : (last?.dir === 'in' ? 'warn' : 'blue');

  const pick = (id) => { setSel(id); setDraft(''); setVer(0); setAiHidden(false); setAiLoading(false); };
  const resolve = () => { setResolved({ ...resolved, [cur.id]: !isResolved }); if (!isResolved) flash('Conversation resolved'); };
  const rewrite = () => { setAiLoading(true); clearTimeout(t1.current); t1.current = setTimeout(() => { setAiLoading(false); setVer((v) => v + 1); }, 900); };
  const send = () => {
    const t = draft.trim(); if (!t) return;
    setSent({ ...sent, [cur.id]: (sent[cur.id] || []).concat([{ dir: 'out', text: t, meta: 'now · You' }]) });
    setDraft(''); setAiHidden(true);
    flash('Sent via ' + cur.channel);
  };

  return (
    <div className="u-app" style={{ width: 1440, height: 900, fontFamily: "Cairo, 'Segoe UI', system-ui, sans-serif", color: '#EEF2E6', '--blue': '#C8FF00' }}>
      <Rail on="reach" extra={
        <button className="u-rb" type="button" aria-label="Contacts"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5" /></svg></button>
      } />

      <aside className="rc-side" aria-label="Conversations">
        <div className="rc-sh">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 className="u-h" style={{ fontSize: 24 }}>Inbox</h1>
            <button className="u-btn pri sm" type="button"><Plus />New</button>
          </div>
          <label className="u-input"><SearchIco /><input type="search" placeholder="Search people" aria-label="Search conversations" value={q} onChange={(e) => setQ(e.target.value)} /></label>
          <div className="u-tabs" role="tablist" aria-label="Channel">
            {FILTERS.map(([k, label]) => (
              <button key={k} className={'u-tab' + (filter === k ? ' on' : '')} type="button" role="tab" aria-selected={filter === k} onClick={() => setFilter(k)}>
                {label} <i>{k === 'all' ? CONVOS.length : CONVOS.filter((c) => c.ch === k).length}</i>
              </button>
            ))}
          </div>
        </div>
        <div className="rc-list">
          {shown.map((c) => {
            const ex = sent[c.id];
            const preview = ex?.length ? 'You: ' + ex[ex.length - 1].text : c.msgs[c.msgs.length - 1].text;
            const sla = resolved[c.id] ? '' : c.sla;
            const unread = c.unread && c.id !== cur.id && !resolved[c.id];
            return (
              <button key={c.id} className={'rc-item' + (c.id === cur.id ? ' on' : '')} type="button" onClick={() => pick(c.id)}>
                <span className={'u-av av-' + c.ch}>{c.ini}</span>
                <span className="m">
                  <span className="r1"><b>{c.name}</b><time>{c.time}</time></span>
                  <p>{preview}</p>
                  <span className="r3"><span className="u-tag">{c.channel}</span>{sla && <span className="u-tag warn">{sla}</span>}{unread && <span className="rc-dot" style={{ marginLeft: 'auto' }} aria-label="Unread" />}</span>
                </span>
              </button>
            );
          })}
          {shown.length === 0 && (
            <div className="rc-empty">
              <SearchIco w={1.5} />
              <b>No conversations match</b>
              <span>Try another name or clear the filter.</span>
              <button className="u-btn sm" type="button" onClick={() => { setQ(''); setFilter('all'); }}>Clear search</button>
            </div>
          )}
        </div>
      </aside>

      <main className="rc-main">
        <div className="rc-th">
          <span className={'u-av av-' + cur.ch}>{cur.ini}</span>
          <div className="who"><b>{cur.name}</b><small><span className="u-tag">{cur.channel}</span>{cur.company}</small></div>
          <span className={'u-tag ' + statusCls}>{statusLabel}</span>
          <button className="u-btn" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="8" /><path d="M12 8v4l2.5 2" /></svg>Snooze</button>
          <button className="u-btn pri" type="button" onClick={resolve}><Check />{isResolved ? 'Reopen' : 'Resolve'}</button>
        </div>
        <div className="rc-msgs" aria-live="polite">
          <span className="rc-day">Today</span>
          {allMsgs.map((m, i) => <div key={i} className={'rc-m ' + m.dir}><div className="b" dir="auto">{m.text}</div><span className="t">{m.meta}</span></div>)}
        </div>
        {!aiHidden && (
          <div className="rc-ai">
            <div className="hd">
              <Spark />
              <b>Suggested reply</b><span className="u-lbl">Shabakkat AI</span>
              <div className="u-tabs" role="tablist" aria-label="Reply language">
                <button className={'u-tab' + (lang === 'en' ? ' on' : '')} type="button" onClick={() => setLang('en')}>EN</button>
                <button className={'u-tab' + (lang === 'ar' ? ' on' : '')} type="button" onClick={() => setLang('ar')}>عربي</button>
              </div>
            </div>
            {aiLoading
              ? <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '4px 0' }}><div className="u-skel" style={{ width: '92%' }} /><div className="u-skel" style={{ width: '76%' }} /><div className="u-skel" style={{ width: '54%' }} /></div>
              : <p className={lang === 'ar' ? 'ar' : ''}>{aiText}</p>}
            <div className="act">
              <button className="u-btn pri sm" type="button" onClick={() => setDraft(aiText)} disabled={aiLoading}>Use reply</button>
              <button className="u-btn sm" type="button" onClick={rewrite} disabled={aiLoading}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6" /></svg>Rewrite</button>
              <button className="u-btn sm" type="button" onClick={() => setAiHidden(true)} style={{ marginLeft: 'auto' }}>Dismiss</button>
            </div>
          </div>
        )}
        <div className="rc-comp">
          <label htmlFor="rc-draft" className="u-lbl">Reply via {cur.channel}</label>
          <textarea id="rc-draft" placeholder="Write a reply…" value={draft} onChange={(e) => setDraft(e.target.value)} />
          <div className="bar">
            <button className="rc-ib" type="button" aria-label="Attach file"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="m20 11.5-7.8 7.8a5 5 0 0 1-7-7l8.4-8.4a3.3 3.3 0 0 1 4.7 4.7l-8.4 8.4a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8" /></svg></button>
            <button className="rc-ib" type="button" aria-label="Insert template"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 9h8M8 13h5" /></svg></button>
            <button className="rc-ib" type="button" aria-label="Ask AI" onClick={() => setAiHidden(false)}><Spark /></button>
            <span className="u-lbl" style={{ marginLeft: 'auto' }}>{draft.length ? draft.length + ' chars' : ''}</span>
            <button className="u-btn pri" type="button" onClick={send} disabled={!draft.trim()}>Send<Arrow /></button>
          </div>
        </div>
      </main>

      <aside className="rc-prof" aria-label="Customer profile">
        <div className="top">
          <span className={'u-av av-' + cur.ch}>{cur.ini}</span>
          <b>{cur.name}</b><small>{cur.company}</small>
          <div style={{ display: 'flex', gap: 6 }}>{cur.tags.map((t) => <span key={t} className="u-tag blue">{t}</span>)}</div>
        </div>
        <dl className="rc-kv">
          <dt>Phone</dt><dd>{cur.phone}</dd>
          <dt>Language</dt><dd>{cur.lang}</dd>
          <dt>Owner</dt><dd>Haidar A.</dd>
        </dl>
        <span className="u-lbl">Across Shabakkat</span>
        <a className="u-card rc-x" href="/sign">
          <div className="hd"><SignIco tail={false} /><b>{cur.contract}</b><span className="u-tag">Sign</span></div>
          <div className="rc-prog"><span style={{ width: cur.signPct }} /></div>
          <span style={{ fontSize: 12, color: 'var(--ink2)' }}>{cur.signNote}</span>
        </a>
        <a className="u-card rc-x" href="/pulse">
          <div className="hd"><PulseIco /><b>Satisfaction</b><span className="u-tag">Pulse</span></div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span className="u-h" style={{ fontSize: 28 }}>{cur.csat}</span><span style={{ fontSize: 12, color: 'var(--ink3)' }}>/ 5 · last 90 days</span></div>
          <svg className="rc-spark" viewBox="0 0 260 44" preserveAspectRatio="none" aria-hidden="true"><path d={cur.spark} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'var(--blue)' }} /></svg>
        </a>
      </aside>

      <Toast msg={toast} />
    </div>
  );
}
