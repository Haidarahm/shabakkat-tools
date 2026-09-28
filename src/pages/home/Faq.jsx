import { useState } from 'react';
import { Arrow, Plus } from '../../icons.jsx';
import { FAQS, r } from './data.js';

export default function Faq() {
  const [faq, setFaq] = useState(0);

  return (
    <section className="sec" id="faq" style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)' }}>
      <div className="wrap grid12 faq">
        <div className="faq-l">
          <span className="eyebrow" {...r()}>08 — FAQ</span>
          <h2 className="h2" {...r(1)}>Questions, answered.</h2>
          <p className="lead" {...r(2)}>Something missing? We'll walk you through it in a demo.</p>
          <div {...r(3)}><a className="link" href="#cta">Book demo <Arrow /></a></div>
        </div>
        <div className="faq-r" {...r()}>
          {FAQS.map(([q, a], i) => (
            <div className={'faq-item' + (faq === i ? ' is-open' : '')} key={q}>
              <h3 style={{ margin: 0 }}>
                <button className="faq-q" type="button" aria-expanded={faq === i} onClick={() => setFaq(faq === i ? -1 : i)}>
                  <span>{q}</span><span className="pm"><Plus /></span>
                </button>
              </h3>
              <div className="faq-a"><div><p>{a}</p></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
