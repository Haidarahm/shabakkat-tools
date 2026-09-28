import Reach from '../../tools/Reach.jsx';
import Sign from '../../tools/Sign.jsx';
import Pulse from '../../tools/Pulse.jsx';

export const TOOLS = [
  {
    id: 'reach', name: 'Reach', sub: 'Customer conversations', App: Reach,
    menu: 'Customer conversations in one inbox', node: 'Conversations', foot: 'One inbox, every channel',
    head: 'Every customer conversation, in one inbox.',
    heroDesc: 'WhatsApp, email and web chat land in one shared inbox, with an AI assistant that drafts replies in Arabic or English.',
    card: 'One shared inbox for WhatsApp, email and web chat, with AI-drafted replies.',
    bullets: ['Unified inbox', 'AI reply drafts', 'Assignment & SLAs'],
    desc: 'Every message from every channel in one shared inbox. The AI assistant reads the thread and drafts the next reply — your team edits and sends.',
    points: [['Unified inbox.', 'WhatsApp, email and web chat side by side.'], ['AI drafts.', 'Suggested replies in Arabic or English.'], ['Team flow.', 'Assign, tag and track response times.']],
    price: 'Shared inbox, AI reply drafts and team assignment.'
  },
  {
    id: 'sign', name: 'Sign', sub: 'Contracts & e-signature', App: Sign,
    menu: 'Contracts and e-signature', node: 'Contracts', foot: 'Send, sign, store',
    head: 'Contracts that move themselves.',
    heroDesc: 'Draft from templates, send for signature and follow every signer — with AI that summarises the clauses before anyone signs.',
    card: 'Templates, signing workflows and a clear audit trail for every agreement.',
    bullets: ['Contract templates', 'Signing workflows', 'AI clause summaries'],
    desc: 'Build contracts from templates, place signature fields and send. Sign shows who has opened, who has signed and who needs a nudge.',
    points: [['Templates & fields.', 'Reusable contracts, filled in seconds.'], ['Signing order.', 'Sequential or parallel, with reminders.'], ['Clause summaries.', 'AI flags what changed before signing.']],
    price: 'Templates, signing workflows and clause summaries.'
  },
  {
    id: 'pulse', name: 'Pulse', sub: 'Analytics & dashboards', App: Pulse,
    menu: 'Analytics and dashboards', node: 'Insights', foot: 'Sample data',
    head: 'See how your customers really feel.',
    heroDesc: 'Live dashboards across conversations and contracts, and an AI analyst you can ask in plain language.',
    card: 'Dashboards that read across conversations and contracts, with an AI analyst.',
    bullets: ['Live dashboards', 'Ask-anything AI', 'Scheduled reports'],
    desc: 'One dashboard layer over Reach and Sign. Watch response times, signed deals and satisfaction move together — or just ask Pulse a question.',
    points: [['Live dashboards.', 'KPIs across every tool, in one view.'], ['Ask Pulse.', 'Plain-language questions, charted answers.'], ['Reports.', 'Scheduled summaries to your team.']],
    price: 'Live dashboards, Ask Pulse and scheduled reports.'
  }
];

export const FAQS = [
  ['What is Shabakkat?', 'One platform that brings three customer tools — Reach, Sign and Pulse — under one account, one customer record and one AI service.'],
  ['Can I start with just one tool?', 'Yes. Start with any of the three and switch the others on later under the same platform contract.'],
  ['Does it work in Arabic?', 'Yes. Every screen has a language switch, and layouts mirror right-to-left in Arabic.'],
  ['How does the AI service work?', 'The same assistant runs inside each tool: it drafts replies in Reach, summarises clauses in Sign and answers questions in Pulse. [ADD MODEL AND DATA-HANDLING DETAILS]'],
  ['How do I get started?', 'Book a demo. We will set up a workspace with the tools your team needs and walk you through it.']
];

export const SIG_A = 'M6 44c14-22 22-34 30-30s-8 34 2 34 18-30 28-30-4 28 6 28 14-18 22-18 4 14 14 14 20-12 34-12 14 8 30 6 40-8 60-10';
export const SIG_B = 'M8 40c20-4 26-26 38-26s-6 30 8 30 26-34 40-34-10 36 6 36 30-20 50-20 20 10 40 8 30-6 50-8';

export const r = (i) => ({ 'data-reveal': '', style: i ? { '--i': i } : undefined });
