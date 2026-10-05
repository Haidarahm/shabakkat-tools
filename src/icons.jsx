// SVG paths reused across the site and the three tool apps (from the mockups).
const line = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const NET = 'M7 13 13 7M7 19 19 7M7 25 25 7M13 25 25 13M19 25 25 19M17 7 23 13M11 7 23 19M7 9 21 23M7 15 17 25';

export const Arrow = (p) => <svg viewBox="0 0 24 24" strokeWidth="2" {...line} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const ArrowL = (p) => <svg viewBox="0 0 24 24" strokeWidth="2" {...line} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>;
export const Chevron = (p) => <svg viewBox="0 0 24 24" strokeWidth="2" {...line} {...p}><path d="m6 9 6 6 6-6" /></svg>;
export const Check = (p) => <svg viewBox="0 0 24 24" strokeWidth="2" {...line} {...p}><path d="m5 12 5 5 9-10" /></svg>;
export const Plus = (p) => <svg viewBox="0 0 24 24" strokeWidth="2" {...line} {...p}><path d="M12 5v14M5 12h14" /></svg>;
export const Spark = (p) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M12 2.5l2 5.9 5.9 2-5.9 2-2 5.9-2-5.9-5.9-2 5.9-2z" /></svg>;

export const ReachIco = ({ tail = true, ...p }) => (
  <svg viewBox="0 0 24 24" strokeWidth="1.7" {...line} {...p}>
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5z" />
    {tail && <path d="M8.5 8.5h7M8.5 11.5h4" />}
  </svg>
);
export const SignIco = ({ tail = true, ...p }) => (
  <svg viewBox="0 0 24 24" strokeWidth="1.7" {...line} {...p}>
    <path d="M14.5 4.5l4 4L10 17H6v-4z" />
    {tail && <path d="M4 20.5c2.5 0 3.2-2 5-2s2.2 1.6 4.2 1.6 3-1.2 6.8-1.2" />}
  </svg>
);
export const PulseIco = ({ tail, ...p }) => <svg viewBox="0 0 24 24" strokeWidth="1.7" {...line} {...p}><path d="M3 12h4l2.5-6 4 12 2.5-6H21" /></svg>;
export const HrIco = (p) => <svg viewBox="0 0 24 24" strokeWidth="1.7" {...line} {...p}><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5" /></svg>;
export const TOOL_ICONS = { reach: ReachIco, sign: SignIco, pulse: PulseIco };

export const LogoMark = ({ className = 'logo-mark' }) => (
  <svg className={className} viewBox="0 0 30 30" aria-hidden="true">
    <rect width="30" height="30" rx="9" style={{ fill: 'var(--blue)' }} />
    <path d={NET} stroke="#0A0B0D" strokeWidth="1.6" strokeLinecap="round" fill="none" />
  </svg>
);
