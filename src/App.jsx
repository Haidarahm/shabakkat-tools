import { useEffect, useState } from 'react';
import Home from './Home.jsx';
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
  const Tool = TOOLS[window.location.pathname.replace(/\/$/, '')];
  return Tool ? <ToolPage Tool={Tool} /> : <Home />;
}
