import { useEffect, useState } from 'react';
import Layout, { ACCENTS } from './layout/Layout.jsx';
import Home from './pages/home/Home.jsx';
import Hr from './pages/hr/Hr.jsx';
import Reach from './tools/Reach.jsx';
import Sign from './tools/Sign.jsx';
import Pulse from './tools/Pulse.jsx';

const TOOLS = { '/reach': Reach, '/sign': Sign, '/pulse': Pulse };

// Full-screen tool: the 1440×900 app scaled to fit the viewport.
function ToolPage({ Tool }) {
  const fit = () => Math.min(window.innerWidth / 1440, window.innerHeight / 900);
  const [s, setS] = useState(fit);
  useEffect(() => {
    const on = () => setS(fit());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return (
    <div className="tool-page">
      <div style={{ width: 1440 * s, height: 900 * s }}>
        <div style={{ transform: `scale(${s})`, transformOrigin: '0 0' }}><Tool /></div>
      </div>
    </div>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const Tool = TOOLS[path];

  return (
    <Layout accent={path === '/hr' ? ACCENTS.hr : undefined}>
      {Tool ? <ToolPage Tool={Tool} /> : path === '/hr' ? <Hr /> : <Home />}
    </Layout>
  );
}
