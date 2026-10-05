// HR System details page (/hr). Copy from HR_System_Website_Content.docx; styles in hr.css.
import { useEffect, useRef, useState } from 'react';
import { Arrow, Check, Spark } from '../../icons.jsx';
import { r } from '../home/data.js';
import './hr.css';

const d = (i) => ({ style: { '--d': i } });
const Pill = ({ t, k = '' }) => <span className={'hr-pill ' + k}>{t}</span>;
const Row = ({ i, ini, b, s, end }) => (
  <div className="hr-row hr-a" {...d(i)}>
    {ini && <span className="hr-av">{ini}</span>}
    <div><b>{b}</b><small>{s}</small></div>
    <div>{end}</div>
  </div>
);
const Tog = ({ on }) => <span className={'hr-tog' + (on ? ' on' : '')} />;

const MODULES = [
  {
    id: 'access', name: 'Customization & Access Control', short: 'Access',
    head: 'Built by Us. Configured Around You.',
    desc: 'Adapt every detail, from individual employee profiles and forms to calculations, workflows, and permissions. Define access by department, section, manager, or specific employee.',
    feats: ['Individual profile configuration', 'Flexible approval routes', 'Granular permissions'],
    card: ['Roles & approvals', 'Sales department', 'Configured'],
    vis: <>
      <div className="hr-route hr-a" {...d(0)}><span className="chip on">Employee</span><Arrow /><span className="chip">Line manager</span><Arrow /><span className="chip">HR</span><Arrow /><span className="chip">Finance</span></div>
      <Row i={1} b="Payroll records" s="Finance · Managers only" end={<Tog on />} />
      <Row i={2} b="Leave approvals" s="Sales · Line manager" end={<Tog on />} />
      <Row i={3} b="Salary details" s="Specific employee · Layla H." end={<Tog />} />
      <Row i={4} b="Overtime calculation" s="Custom formula · Operations" end={<Tog on />} />
    </>
  },
  {
    id: 'payroll', name: 'Personnel and Payroll', short: 'Payroll',
    head: 'Manage Your People and Payroll Across Borders.',
    desc: 'Manage employee records, document expiry dates, payroll, and settlement calculations across countries and branches from one place. Assign each employee to the appropriate tax setup, including a no-tax setup, with calculations based on their individual profile.',
    feats: ['Employee records', 'Multi-country payroll', 'Employee-level tax assignment', 'Settlement calculations'],
    card: ['September payroll', '4 countries · 6 branches', 'Run ready'],
    vis: <>
      <div className="kpis hr-a" {...d(0)}><div className="kpi"><small>Employees</small><b>1,248</b></div><div className="kpi"><small>Net payroll</small><b>2.4M</b><em>AED</em></div></div>
      <Row i={1} ini="LH" b="Layla Haddad" s="UAE · Dubai branch" end={<Pill t="No-tax setup" k="mute" />} />
      <Row i={2} ini="OK" b="Omar Khatib" s="Jordan · Amman branch" end={<Pill t="Jordan tax" />} />
      <Row i={3} ini="RA" b="Rania Aziz" s="Egypt · Cairo branch" end={<Pill t="Egypt tax" />} />
      <Row i={4} ini="!" b="Passport expires in 14 days" s="Karim Saleh · Document expiry" end={<Pill t="Renew" k="solid" />} />
    </>
  },
  {
    id: 'self-service', name: 'Employee Self-Service', short: 'Self-service',
    head: 'Everyday HR, at Your Employees’ Fingertips.',
    desc: 'Give employees one place to submit requests, follow approvals, and access HR documents. Automate salary certificates, payslips, and experience letters using employee data and customized templates.',
    feats: ['Online requests', 'Automated approval workflows', 'Automated HR documents', 'Request history'],
    card: ['My requests', 'Employee portal', 'Self-service'],
    vis: <>
      <Row i={0} b="Salary certificate" s="Generated from your template" end={<Pill t="Ready" k="solid" />} />
      <Row i={1} b="Annual leave · 12–16 Oct" s="Step 2 of 3 · Line manager" end={<Pill t="In approval" />} />
      <Row i={2} b="Payslip · September" s="Issued 30 Sep" end={<Pill t="Ready" k="solid" />} />
      <Row i={3} b="Experience letter" s="Requested 2 Sep" end={<Pill t="Delivered" k="mute" />} />
      <Row i={4} b="Work from home · 3 Oct" s="Approved by Sara M." end={<Pill t="Approved" k="mute" />} />
    </>
  },
  {
    id: 'attendance', name: 'Time & Attendance', short: 'Attendance',
    head: 'Attendance That Fits Your Workforce.',
    desc: 'Connect fingerprint or facial recognition devices and track attendance by employee. Customize attendance settings to match individual profiles and operational requirements.',
    feats: ['Biometric integration', 'Individual attendance tracking', 'Timesheets', 'Configurable settings'],
    card: ['Timesheet · Week 41', 'Omar Khatib · Operations', 'Live'],
    vis: <>
      <Row i={0} b="Face recognition · Main gate" s="Synced 2 min ago" end={<Pill t="Connected" k="solid" />} />
      {[['Sun', '08:02 – 17:10', 94], ['Mon', '07:58 – 17:02', 92], ['Tue', '08:21 – 17:30', 86], ['Wed', '08:00 – 16:05', 74], ['Thu', '07:55 – 17:15', 97]].map(([day, t, w], i) => (
        <div className="hr-row hr-a" {...d(i + 1)} key={day}>
          <b className="hr-day">{day}</b><span className="hr-meter"><span style={{ '--w': w + '%' }} /></span><small>{t}</small>
        </div>
      ))}
    </>
  },
  {
    id: 'ai', name: 'AI Assistant & Insights', short: 'AI',
    head: 'Get Answers. Know What Needs Attention.',
    desc: 'Check everyday HR information through the built-in assistant. Identify missing records and potential issues with insights that help your team prioritize action.',
    feats: ['HR assistant', 'Workforce insights', 'Data alerts'],
    card: ['HR assistant', 'Ask in plain language', 'AI'],
    vis: <>
      <div className="ai-row hr-a" {...d(0)}><span className="who">HA</span><p>How many annual leave days does Omar have left?</p></div>
      <div className="ai-row hr-a" {...d(2)}><span className="who ai"><Spark /></span><p>Omar Khatib has 12 annual leave days left this year, with 3 days waiting for approval.</p></div>
      <Row i={4} b="3 employees missing passport copies" s="Insight · Personnel records" end={<Pill t="Review" k="solid" />} />
      <Row i={5} b="Overtime up 18% in Operations" s="Alert · Time & attendance" end={<Pill t="Alert" />} />
    </>
  },
  {
    id: 'procurement', name: 'Procurement & Purchase Tracking', short: 'Procurement',
    head: 'Keep Every Purchase Moving.',
    desc: 'Bring purchase requests, vendor details, approvals, and petty cash records into one workflow. Customize approval routes around the way your business buys.',
    feats: ['Purchase requests', 'Vendor and item details', 'Approval tracking', 'Petty cash'],
    card: ['PR-0142 · Office chairs', 'Requested by Operations', 'In approval'],
    vis: <>
      <div className="hr-flow hr-a" {...d(0)}>{['Requested', 'Manager', 'Finance', 'Ordered'].map((s, k) => <span key={s} className={k < 2 ? 'done' : k === 2 ? 'now' : ''}><i />{s}</span>)}</div>
      <Row i={1} b="Al Noor Furniture" s="Vendor · 3 previous orders" end={<Pill t="Approved vendor" k="mute" />} />
      <Row i={2} b="Ergonomic chair × 12" s="Item · AED 640 each" end={<b>AED 7,680</b>} />
      <Row i={3} b="Petty cash · Operations" s="Balance this month" end={<b>AED 450</b>} />
    </>
  },
  {
    id: 'dashboards', name: 'Dashboards & Reporting', short: 'Dashboards',
    head: 'See Your Workforce Clearly.',
    desc: 'Monitor headcount, employee movements, and pending approvals through management dashboards. Explore workforce trends and export reports to support planning and decisions.',
    feats: ['Management dashboards', 'Workforce trends', 'Approval visibility', 'Exportable reports'],
    card: ['Workforce overview', 'All countries · Q3', 'Export'],
    vis: <>
      <div className="kpis hr-a" {...d(0)}><div className="kpi"><small>Headcount</small><b>1,248</b><em>+3.2%</em></div><div className="kpi"><small>Pending approvals</small><b>17</b></div></div>
      <div className="mini-dash hr-a" {...d(1)}>{[48, 56, 52, 64, 60, 72, 70, 84, 80, 92, 88, 100].map((h, i) => <i key={i} style={{ '--h': h + '%', '--b': i }} />)}</div>
      <Row i={3} b="Joiners vs leavers" s="Last 90 days" end={<b>42 / 11</b>} />
      <Row i={4} b="Q3 workforce report" s="PDF · Excel" end={<Pill t="Export" k="solid" />} />
    </>
  }
];

const SOON = [
  ['Performance Management', 'Bring employee performance into your HR workflow.'],
  ['Recruitment', 'Extend your HR journey to recruitment.'],
  ['Mobile App', 'Bring everyday HR access to your mobile.']
];

const PICKS = [['Single module', 'modules'], ['Multiple modules', 'modules'], ['Full system', 'full']];

const TITLE = 'HR Management, Built Around Your Business.'.split(' ');

function Card({ m, i, cls }) {
  return (
    <div className={'hr-card ' + cls} aria-hidden={cls.includes('is-on') ? undefined : true}>
      <div className="hc-top">
        <span className="glyph hr-num">0{i + 1}</span>
        <div><b>{m.card[0]}</b><small>{m.card[1]}</small></div>
        <span className="tag">{m.card[2]}</span>
      </div>
      <div className="hr-vis">{m.vis}</div>
    </div>
  );
}

function DemoForm({ scope, setScope }) {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  // Posts to Netlify Forms (form "hr-demo" is declared in index.html for detection).
  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const mods = f.getAll('module');
    if (scope === 'modules' && !mods.length) return setErr('Select at least one module, or choose Full system.');
    f.delete('module');
    f.set('form-name', 'hr-demo');
    f.set('scope', scope === 'full' ? 'Full system' : 'Selected modules');
    f.set('modules', scope === 'full' ? 'All modules' : mods.join(', '));
    setErr(''); setBusy(true);
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(f).toString() });
      if (!res.ok) throw new Error(res.status);
      setSent(true);
    } catch {
      setErr('Something went wrong sending your request. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  if (sent) return (
    <div className="hr-form hr-done" role="status">
      <span className="hr-done-ico"><Check /></span>
      <span className="eyebrow">Request a Demo</span>
      <h3>Submission Confirmation</h3>
      <p className="lead">Thank you for your interest. Our team will contact you by email to arrange your demo.</p>
    </div>
  );

  return (
    <form className="hr-form" onSubmit={submit} {...r(1)}>
      <h3>Demo Request Form</h3>
      <p hidden><label>Leave empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
      <div className="hr-2">
        <label className="hr-field"><span>Company Name</span><input name="company" required placeholder="Enter your company name." autoComplete="organization" /></label>
        <label className="hr-field"><span>Full Name</span><input name="name" required placeholder="Enter your name." autoComplete="name" /></label>
        <label className="hr-field"><span>Email Address</span><input name="email" type="email" required placeholder="Enter your email address." autoComplete="email" /></label>
        <label className="hr-field"><span>Number of Users</span><input name="users" type="number" min="1" inputMode="numeric" required placeholder="Enter the estimated number of subscribers." /></label>
      </div>
      <div className="hr-field">
        <span id="hr-scope">What would you like to explore?</span>
        <div className="seg" role="group" aria-labelledby="hr-scope">
          <button type="button" aria-pressed={scope === 'modules'} onClick={() => setScope('modules')}>Selected Modules</button>
          <button type="button" aria-pressed={scope === 'full'} onClick={() => { setScope('full'); setErr(''); }}>Full System</button>
        </div>
      </div>
      <div className={'hr-collapse' + (scope === 'modules' ? ' is-open' : '')} inert={scope !== 'modules'}>
        <fieldset className="hr-field">
          <legend><span>Select one or more modules:</span></legend>
          <div className="hr-checks">
            {MODULES.slice(1).map((m) => <label className="hr-check" key={m.id}><input type="checkbox" name="module" value={m.name} onChange={() => setErr('')} />{m.name}</label>)}
          </div>
        </fieldset>
      </div>
      {err && <p className="hr-err" role="alert">{err}</p>}
      <button className="btn btn-primary hr-submit" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Request a Demo'} <Arrow /></button>
    </form>
  );
}

export default function Hr() {
  const [active, setActive] = useState(0);
  const [scope, setScope] = useState('modules');
  const mods = useRef([]);

  useEffect(() => { document.title = 'HR System — Shabakkat'; }, []);

  // Active module = whichever text block crosses the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(+e.target.dataset.i)), { rootMargin: '-50% 0px -50% 0px' });
    mods.current.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main>
      <section className="hr-hero" id="top">
        <svg className="net" viewBox="0 0 900 760" aria-hidden="true"><defs><pattern id="nethr" width="48" height="41.6" patternUnits="userSpaceOnUse"><path d="M0 0H48M0 0 24 41.6M48 0 24 41.6" stroke="currentColor" strokeWidth="1" fill="none" /></pattern></defs><rect x="-96" y="-84" width="1100" height="940" fill="url(#nethr)" /></svg>
        <div className="wrap">
          <div className="hr-hero-in">
            <span className="eyebrow hr-fade" style={{ '--i': 0 }}>HR System · by Shabakkat</span>
            <h1 className="hr-title" aria-label={TITLE.join(' ')}>
              {TITLE.map((w, i) => <span key={i} aria-hidden="true"><span className={'w' + (i === TITLE.length - 1 ? ' hl' : '')} style={{ '--i': i }}>{w}</span>{' '}</span>)}
            </h1>
            <p className="lead hr-fade" style={{ '--i': 1 }}>Developed by Shabakkat, our HR management system brings your people, payroll, and processes together. Customize every detail around your organization, across countries, branches, and teams.</p>
            <div className="btn-row hr-fade" style={{ '--i': 2 }}>
              <a className="btn btn-primary" href="#demo">Request a Demo <Arrow /></a>
              <a className="btn btn-ghost" href="#modules">Explore modules</a>
            </div>
            <nav className="hr-chips hr-fade" style={{ '--i': 3 }} aria-label="Modules">
              {MODULES.map((m, i) => <a key={m.id} href={'#' + m.id}><span>0{i + 1}</span>{m.name}</a>)}
            </nav>
          </div>
        </div>
      </section>

      <section className="hr-mods" id="modules" aria-label="Modules">
        <div className="wrap grid12">
          <div className="hr-text">
            {MODULES.map((m, i) => (
              <article className={'hr-mod' + (i === active ? ' is-on' : '')} id={m.id} data-i={i} ref={(el) => { mods.current[i] = el; }} key={m.id}>
                <span className="hx-num">0{i + 1} <i>/ 0{MODULES.length}</i></span>
                <span className="eyebrow">{m.name}</span>
                <h2>{m.head}</h2>
                <p>{m.desc}</p>
                <ul className="hr-feats">{m.feats.map((f) => <li key={f}><Check />{f}</li>)}</ul>
                <div className="hr-mob"><Card m={m} i={i} cls="is-on" /></div>
              </article>
            ))}
          </div>
          <div className="hr-stage" aria-hidden="true">
            <div className="hr-rail">
              {MODULES.map((m, i) => <a key={m.id} className={'hx-stop' + (i === active ? ' is-on' : '')} href={'#' + m.id} tabIndex={-1}>0{i + 1}{i === active && ' ' + m.short}</a>)}
              <div className="hx-line"><span style={{ transform: `scaleX(${(active + 1) / MODULES.length})` }} /></div>
            </div>
            <div className="hr-screens">
              {MODULES.map((m, i) => <Card key={m.id} m={m} i={i} cls={i === active ? 'is-on' : i < active ? 'is-past' : ''} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="soon">
        <div className="wrap">
          <div className="grid12 sec-head">
            <div className="l">
              <span className="eyebrow" {...r()}>02 — Coming soon</span>
              <h2 className="h2" {...r(1)}>Coming Soon.</h2>
            </div>
          </div>
          <div className="fgrid">
            {SOON.map(([h, p], i) => (
              <article className="fcard hr-soon" {...r(i)} key={h}>
                <span className="tag">Coming soon</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="choose" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid12 sec-head">
            <div className="l">
              <span className="eyebrow" {...r()}>03 — Flexible module selection</span>
              <h2 className="h2" {...r(1)}>Choose the Modules You Need.</h2>
            </div>
            <div className="r"><p className="lead" {...r(2)}>Request a single module, combine multiple modules, or explore the full system. We’ll tailor the demo to your selected functions and team size.</p></div>
          </div>
          <div className="fgrid">
            {PICKS.map(([label, s], i) => (
              <a className="fcard hr-pick" href="#demo" onClick={() => setScope(s)} {...r(i)} key={label}>
                <span className="hr-pick-n">0{i + 1}</span>
                <h3>{label}</h3>
                <span className="link">Request a Demo <Arrow /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="sec hr-demo-sec" id="demo">
        <div className="wrap grid12 hr-demo">
          <div className="hr-demo-l">
            <span className="eyebrow" {...r()}>04 — Request a demo</span>
            <h2 className="h2" {...r(1)}>See How It Fits Your Organization.</h2>
            <p className="lead" {...r(2)}>Tell us about your company, the number of users, and the modules you’re interested in. Our team will contact you to arrange a demo focused on your needs.</p>
          </div>
          <DemoForm scope={scope} setScope={setScope} />
        </div>
      </section>
    </main>
  );
}
