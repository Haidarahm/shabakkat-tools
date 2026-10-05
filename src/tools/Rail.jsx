// Dark left rail shared by the three tool apps (from the mockups' .u-rail).
import { useRef, useState, useEffect } from 'react';
import { NET, ReachIco, SignIco, PulseIco } from '../icons.jsx';
import './tools.css';

const GEAR = 'M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3';

export default function Rail({ on, extra }) {
  const item = (id, label, Ico) => (
    <a className={'u-rb' + (on === id ? ' on' : '')} href={'/' + id} aria-label={label} aria-current={on === id ? 'page' : undefined}><Ico tail={id === 'sign'} /></a>
  );
  return (
    <nav className="u-rail" aria-label="Shabakkat">
      <a href="/" aria-label="Shabakkat home">
        <svg className="mk" viewBox="0 0 30 30"><rect width="30" height="30" rx="9" style={{ fill: 'var(--blue)' }} /><path d={NET} stroke="#0A0B0D" strokeWidth="1.6" strokeLinecap="round" fill="none" /></svg>
      </a>
      <span className="u-rlabel">Tools</span>
      {item('reach', 'Reach', ReachIco)}
      {item('sign', 'Sign', SignIco)}
      {item('pulse', 'Pulse', PulseIco)}
      <span className="u-rsep" />
      {extra}
      <button className="u-rb" type="button" aria-label="Settings" style={{ marginTop: 'auto' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d={GEAR} /></svg>
      </button>
      <span className="u-av" style={{ background: '#fff', color: '#0A1024', marginTop: 8 }}>HA</span>
    </nav>
  );
}

// Toast that clears itself; mirrors the mockups' flash().
export function useToast() {
  const [toast, setToast] = useState('');
  const t = useRef();
  useEffect(() => () => clearTimeout(t.current), []);
  const flash = (m) => { clearTimeout(t.current); setToast(m); t.current = setTimeout(() => setToast(''), 2200); };
  return [toast, flash];
}
export const Toast = ({ msg }) => msg ? (
  <div className="u-toast" role="status"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m5 12 5 5 9-10" /></svg>{msg}</div>
) : null;
