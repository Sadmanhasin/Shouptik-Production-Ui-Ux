/* ===== Icons (lucide-style, inline SVG) ===== */
const ICONS = {
  dashboard: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  film: '<rect x="2" y="2" width="20" height="20" rx="2.5"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
  pie: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
  user: '<circle cx="12" cy="8" r="4.5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  task: '<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3.5"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  chart: '<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>',
  settings: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  search: '<circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.3-4.3"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  right: '<path d="m9 18 6-6-6-6"/>', left: '<path d="m15 18-6-6 6-6"/>', down: '<path d="m6 9 6 6 6-6"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  wa: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9 10c.5 2 2 3.5 4 4l1.2-1.2 2 1-.4 1.6c-3.5.3-7.3-3.5-7-7l1.6-.4 1 2Z"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  printer: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>', menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  filter: '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>',
  more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  up: '<path d="M7 17 17 7M7 7h10v10"/>', dn: '<path d="M7 7l10 10M17 7v10H7"/>',
  trend: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 17.5v-11"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  edit: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7l10-5z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  kanban: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7v7M12 7v4M16 7v9"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  gantt: '<path d="M3 3v18h18"/><path d="M7 7h8M10 12h9M7 17h6"/>',
  archive: '<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8M10 12h4"/>',
  trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  video: '<path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
  drone: '<circle cx="5" cy="5" r="2.5"/><circle cx="19" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M7 7l3 3M17 7l-3 3M7 17l3-3M17 17l-3-3"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/>',
  broadcast: '<circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
  msg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  ext: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  box: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4"/>',
  light: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
  hdd: '<rect x="2" y="13" width="20" height="8" rx="2"/><path d="M5.45 5.11 2 13h20l-3.45-7.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11zM6 17h.01M10 17h.01"/>',
  aperture: '<circle cx="12" cy="12" r="10"/><path d="m14.31 8 5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16 3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"/>',
  move: '<path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
  paperclip: '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  star: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
};
const ic = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24">${ICONS[n] || ''}</svg>`;

/* ===== Helpers ===== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const tk = n => '৳' + Math.round(n).toLocaleString('en-IN');
const tkShort = n => n >= 100000 ? '৳' + (n / 100000).toFixed(n % 100000 === 0 ? 0 : 2).replace(/\.?0+$/, '') + 'L' : n >= 1000 ? '৳' + (n / 1000).toFixed(0) + 'K' : tk(n);
const D = iso => new Date(iso + 'T00:00:00');
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WDF = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const fd = iso => { if (!iso || iso === '—') return '—'; const d = D(iso); return `${d.getDate()} ${MON[d.getMonth()]} ${d.getFullYear()}`; };
const fdShort = iso => { const d = D(iso); return `${d.getDate()} ${MON[d.getMonth()]}`; };
const ft = t => { const [h, m] = t.split(':').map(Number); return `${((h + 11) % 12) + 1}${m ? ':' + String(m).padStart(2, '0') : ''} ${h < 12 ? 'AM' : 'PM'}`; };
const daysBetween = (a, b) => Math.round((D(b) - D(a)) / 86400000);
const rel = iso => { const n = daysBetween(TODAY, iso); return n === 0 ? 'Today' : n === 1 ? 'Tomorrow' : n === -1 ? 'Yesterday' : n > 0 ? `in ${n} days` : `${-n} days ago`; };

const client = id => DB.clients.find(c => c.id === id) || {};
const member = id => DB.team.find(t => t.id === id) || {};
const project = id => DB.projects.find(p => p.id === id) || {};
const projPaid = p => DB.payments.filter(x => x.pid === p.id).reduce((s, x) => s + x.amount, 0) || p.paid;
const projDue = p => Math.max(0, p.budget - projPaid(p));
const clientStats = c => {
  const ps = DB.projects.filter(p => p.clientId === c.id);
  const billed = ps.filter(p => !['Inquiry', 'Quotation Sent'].includes(p.status)).reduce((s, p) => s + p.budget, 0);
  const paid = ps.reduce((s, p) => s + projPaid(p), 0);
  return { count: ps.length, billed, paid, due: Math.max(0, billed - paid), projects: ps };
};
const initials = n => n.split(/\s+/).filter(w => /[A-Za-z]/.test(w[0])).slice(0, 2).map(w => w[0]).join('').toUpperCase();
const AV_COLORS = ['#B5CBBD', '#E8C9A0', '#C9C0E6', '#A9C9DE', '#E5B8B0', '#BFD9C4', '#E7D49A', '#B9D4D0', '#D8C4B4', '#C4CFD9'];
const avColor = s => AV_COLORS[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % AV_COLORS.length];
const av = (name, cls = '') => `<span class="av ${cls}" style="background:${avColor(name)}" title="${esc(name)}">${initials(name)}</span>`;
const avStack = (ids, max = 4) => {
  if (!ids.length) return '<span class="faint small">Unassigned</span>';
  const ms = ids.map(member);
  return `<span class="stack">${ms.slice(0, max).map(m => av(m.name, 'sm')).join('')}${ms.length > max ? `<span class="av sm more">+${ms.length - max}</span>` : ''}</span>`;
};
const waLink = (phone, text = '') => `https://wa.me/88${String(phone).replace(/\D/g, '').replace(/^88/, '')}${text ? '?text=' + encodeURIComponent(text) : ''}`;

const STATUS = {
  'Inquiry': 'b-violet', 'Quotation Sent': 'b-blue', 'Confirmed': 'b-sage', 'Shoot Done': 'b-teal', 'In Editing': 'b-amber',
  'Review / Revision': 'b-violet', 'Delivered': 'b-green', 'Closed': '', 'Cancelled': 'b-red', 'On Hold': '',
  'Paid': 'b-green', 'Partially Paid': 'b-amber', 'Unpaid': 'b-red', 'Overdue': 'b-red',
  'To Do': '', 'In Progress': 'b-blue', 'In Review': 'b-violet', 'Revision': 'b-amber', 'Completed': 'b-green',
  'Available': 'b-green', 'Checked out': 'b-blue', 'Maintenance': 'b-amber', 'Rented': 'b-violet',
  'Active': 'b-green', 'On Leave': 'b-amber', 'Inactive': '', 'Sent': 'b-blue', 'Draft': '', 'Converted': 'b-green', 'Approved': 'b-green',
  'Urgent': 'b-red', 'Normal': 'b-sage',
};
const badge = s => `<span class="badge ${STATUS[s] ?? ''}">${esc(s)}</span>`;
const PIPELINE = ['Inquiry', 'Quotation Sent', 'Confirmed', 'Shoot Done', 'In Editing', 'Review / Revision', 'Delivered', 'Closed'];
const invStatus = inv => {
  const p = project(inv.pid); const paid = projPaid(p);
  if (p.status === 'Cancelled') return 'Cancelled';
  if (paid >= inv.amount) return 'Paid';
  if (inv.due < TODAY) return 'Overdue';
  return paid > 0 ? 'Partially Paid' : 'Unpaid';
};

function numberToWords(n) {
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const two = x => x < 20 ? a[x] : b[Math.floor(x / 10)] + (x % 10 ? ' ' + a[x % 10] : '');
  const three = x => (x >= 100 ? a[Math.floor(x / 100)] + ' Hundred' + (x % 100 ? ' ' : '') : '') + (x % 100 ? two(x % 100) : '');
  if (!n) return 'Zero';
  let out = [];
  const crore = Math.floor(n / 10000000); n %= 10000000;
  const lakh = Math.floor(n / 100000); n %= 100000;
  const th = Math.floor(n / 1000); n %= 1000;
  if (crore) out.push(three(crore) + ' Crore');
  if (lakh) out.push(two(lakh) + ' Lakh');
  if (th) out.push(two(th) + ' Thousand');
  if (n) out.push(three(n));
  return out.join(' ');
}

/* ===== App state ===== */
const store = {
  get(k, d) { try { const v = localStorage.getItem('sp_' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('sp_' + k, JSON.stringify(v)); } catch { } },
};
const S = {
  role: store.get('role', null),          // 'admin' | 'member'
  me: 't1',                                // member portal user (Arif Hossain)
  theme: store.get('theme', 'light'),
  calY: 2026, calM: 10, calView: 'month',
  taskView: store.get('taskView', 'kanban'),
  noticeShown: false,
};
document.documentElement.dataset.theme = S.theme;

/* ===== Layout ===== */
const NAV_ADMIN = [
  ['Overview'],
  ['dashboard', 'Dashboard', 'dashboard'],
  ['calendar', 'Calendar', 'calendar'],
  ['projects', 'Projects / Bookings', 'film', () => DB.projects.filter(p => !['Delivered', 'Closed', 'Cancelled'].includes(p.status)).length],
  ['clients', 'Clients', 'users'],
  ['Money'],
  ['invoices', 'Quotations & Invoices', 'file'],
  ['payments', 'Payments', 'card'],
  ['finance', 'Finance', 'pie'],
  ['Studio'],
  ['team', 'Team', 'user'],
  ['tasks', 'Tasks', 'task', () => DB.tasks.filter(t => t.status !== 'Completed' && t.due < TODAY).length, true],
  ['equipment', 'Equipment', 'camera'],
  ['notices', 'Notices', 'megaphone'],
  ['reports', 'Reports', 'chart'],
  ['settings', 'Settings', 'settings'],
];
const NAV_MEMBER = [
  ['My space'],
  ['me', 'My Dashboard', 'home'],
  ['me/tasks', 'My Tasks', 'task', () => DB.tasks.filter(t => t.who === S.me && t.status !== 'Completed').length],
  ['me/schedule', 'My Schedule', 'calendar'],
  ['me/notices', 'Notices', 'megaphone', () => DB.notices.filter(n => n.unreadBy.includes(S.me)).length, true],
  ['me/payouts', 'My Payouts', 'wallet'],
  ['me/profile', 'Profile', 'user'],
];

function sidebar(route) {
  const nav = S.role === 'member' ? NAV_MEMBER : NAV_ADMIN;
  const top = route.split('/').slice(0, S.role === 'member' && route.startsWith('me/') ? 2 : 1).join('/');
  return `
  <aside class="sidebar">
    <a class="brand" href="#/${S.role === 'member' ? 'me' : 'dashboard'}">
      <img src="assets/logo-mark.png" alt="Shoptik Production logo">
      <div><div class="brand-name">Shoptik<br>Production</div><div class="brand-sub">Studio OS</div></div>
    </a>
    <nav class="nav">
      ${nav.map(n => n.length === 1 ? `<div class="nav-label">${n[0]}</div>` : (() => {
        const c = n[3] ? n[3]() : 0;
        return `<a href="#/${n[0]}" class="${top === n[0] ? 'active' : ''}">${ic(n[2])}<span>${n[1]}</span>${c ? `<span class="count ${n[4] ? 'alert' : ''}">${c}</span>` : ''}</a>`;
      })()).join('')}
    </nav>
    <div class="side-foot">
      ${S.role === 'member' ? `
      <div class="side-card"><div class="t">Need help?</div><div class="s">Contact the office directly on WhatsApp.</div>
        <a class="btn wa sm block" href="${waLink('01711000222', 'Hello Shoptik office,')}" target="_blank">${ic('wa')} WhatsApp office</a></div>` : `
      <div class="side-card"><div class="t">November target</div><div class="s">${tk(575000)} of ${tk(800000)}</div>
        <div class="bar"><i style="width:72%"></i></div></div>`}
    </div>
  </aside>`;
}

function topbar() {
  const unread = DB.notifications.filter(n => n.unread).length;
  const me = S.role === 'member' ? member(S.me) : { name: 'Shoptik Owner' };
  return `
  <header class="topbar">
    <button class="icon-btn menu-btn" data-act="nav-toggle" aria-label="Menu">${ic('menu')}</button>
    <div class="search">
      ${ic('search')}
      <input id="gsearch" placeholder="${S.role === 'member' ? 'Search my tasks, projects…' : 'Search client, booking ID, phone…'}" autocomplete="off">
      <kbd>/</kbd>
      <div id="search-pop" class="search-pop hide"></div>
    </div>
    <div class="top-actions">
      ${S.role === 'admin' ? `<a class="btn primary" href="#/projects/new">${ic('plus')}<span class="lbl">New Booking</span></a>` : ''}
      <button class="icon-btn desk-only" data-act="theme" title="Toggle theme">${ic(S.theme === 'dark' ? 'sun' : 'moon')}</button>
      <button class="icon-btn" data-act="notif" aria-label="Notifications">${ic('bell')}${unread ? '<span class="dot"></span>' : ''}</button>
      <button class="profile-btn" data-act="profile-menu">
        ${S.role === 'member' ? av(me.name, 'sm') : `<span class="av sm" style="background:var(--ink);color:var(--sage)">SP</span>`}
        <span class="col" style="gap:0;text-align:left"><span class="nm">${S.role === 'member' ? me.name : 'Owner'}</span><span class="rl">${S.role === 'member' ? 'Team Member' : 'Super Admin'}</span></span>
        ${ic('down')}
      </button>
    </div>
  </header>`;
}

const pageHead = (title, sub = '', actions = '', crumbs = null) => `
  <div class="ph">
    <div>
      ${crumbs ? `<div class="crumbs">${crumbs.map((c, i) => (i ? ic('right') : '') + (c[1] ? `<a href="${c[1]}">${c[0]}</a>` : `<span>${c[0]}</span>`)).join('')}</div>` : ''}
      <h1>${title}</h1>${sub ? `<div class="sub">${sub}</div>` : ''}
    </div>
    <div class="row wrap">${actions}</div>
  </div>`;

const statCard = (label, value, icon, foot = '', hero = false) => `
  <div class="card stat ${hero ? 'hero' : ''}">
    <div class="lbl"><span class="ico">${ic(icon)}</span>${label}</div>
    <div class="val num">${value}</div>
    ${foot ? `<div class="foot">${foot}</div>` : ''}
  </div>`;
const delta = (v, up = true) => `<span class="delta ${up ? 'up' : 'down'}">${ic(up ? 'up' : 'dn')}${v}</span>`;
const tabs = (base, items, cur) => `<div class="tabs">${items.map(([k, l, n]) => `<a href="${base}${k ? '?tab=' + k : ''}" class="${cur === k ? 'on' : ''}">${l}${n != null ? `<span class="n">${n}</span>` : ''}</a>`).join('')}</div>`;
const prog = (v, tone = '') => `<div class="prog ${tone}"><i style="width:${Math.min(100, v)}%"></i></div>`;

/* ===== Charts (pure SVG) ===== */
function barChart(data, keys, colors, h = 230) {
  const W = 640, pad = { l: 44, r: 8, t: 12, b: 26 };
  const max = Math.ceil(Math.max(...data.flatMap(d => keys.map(k => d[k]))) / 100000) * 100000;
  const iw = W - pad.l - pad.r, ih = h - pad.t - pad.b, gw = iw / data.length, bw = Math.min(22, (gw - 18) / keys.length);
  let s = `<svg class="chart" viewBox="0 0 ${W} ${h}" role="img">`;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + ih - ih * i / 4;
    s += `<line x1="${pad.l}" x2="${W - pad.r}" y1="${y}" y2="${y}" stroke="var(--line-2)"/><text x="${pad.l - 8}" y="${y + 4}" text-anchor="end">${tkShort(max * i / 4).replace('৳', '')}</text>`;
  }
  data.forEach((d, i) => {
    const x0 = pad.l + gw * i + (gw - bw * keys.length - 4 * (keys.length - 1)) / 2;
    keys.forEach((k, j) => {
      const bh = ih * d[k] / max, x = x0 + j * (bw + 4), y = pad.t + ih - bh;
      s += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="5" fill="${colors[j]}"><title>${d.m} · ${k === 'inc' ? 'Income' : 'Expense'}: ${tk(d[k])}</title></rect>`;
    });
    s += `<text x="${pad.l + gw * i + gw / 2}" y="${h - 6}" text-anchor="middle" font-weight="${i === data.length - 1 ? 800 : 500}">${d.m}</text>`;
  });
  return s + '</svg>';
}
function donut(parts, size = 150, label = '', sub = '') {
  const tot = parts.reduce((s, p) => s + p.v, 0), r = 56, c = 2 * Math.PI * r;
  let off = 0;
  const segs = parts.map(p => { const len = c * p.v / tot; const g = `<circle r="${r}" cx="75" cy="75" fill="none" stroke="${p.c}" stroke-width="18" stroke-dasharray="${Math.max(0, len - 2)} ${c}" stroke-dashoffset="${-off}" transform="rotate(-90 75 75)"><title>${p.l}: ${tk(p.v)}</title></circle>`; off += len; return g; }).join('');
  return `<svg width="${size}" height="${size}" viewBox="0 0 150 150"><circle r="${r}" cx="75" cy="75" fill="none" stroke="var(--line-2)" stroke-width="18"/>${segs}
    <text x="75" y="72" text-anchor="middle" style="font-family:var(--display);font-size:17px;font-weight:700;fill:var(--text)">${label}</text>
    <text x="75" y="90" text-anchor="middle" style="font-size:10.5px;fill:var(--muted)">${sub}</text></svg>`;
}
function spark(vals, color = 'var(--sage-600)', w = 120, h = 36) {
  const max = Math.max(...vals), min = Math.min(...vals);
  const pts = vals.map((v, i) => [i * w / (vals.length - 1), h - 4 - (v - min) / (max - min || 1) * (h - 8)]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d="${d} L${w} ${h} L0 ${h}Z" fill="${color}" opacity=".12"/><path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/></svg>`;
}
const SERIES = { inc: 'var(--sage-600)', exp: '#D9A55B', a: '#3A729E', b: '#6F5FA6', c: '#2F8378', d: '#C0473B', e: '#9AA8AA' };

/* ===== Modal & toast ===== */
function openModal(html, cls = '') {
  closeModal();
  const ov = document.createElement('div');
  ov.className = 'overlay'; ov.id = 'overlay';
  ov.innerHTML = `<div class="modal ${cls}" role="dialog" aria-modal="true">${html}</div>`;
  ov.addEventListener('mousedown', e => { if (e.target === ov) closeModal(); });
  document.body.appendChild(ov);
  setTimeout(() => { const f = ov.querySelector('input:not([type=hidden]),select,textarea'); f && f.focus(); }, 50);
}
function closeModal() { $('#overlay')?.remove(); }
const modalHead = (t, s = '') => `<div class="modal-h"><div><h3>${t}</h3>${s ? `<div class="muted small" style="margin-top:3px">${s}</div>` : ''}</div><button class="icon-btn" data-act="close">${ic('x')}</button></div>`;
function toast(msg, icon = 'check') {
  let box = $('.toasts'); if (!box) { box = document.createElement('div'); box.className = 'toasts'; document.body.appendChild(box); }
  const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = ic(icon) + `<span>${msg}</span>`;
  box.appendChild(t); setTimeout(() => { t.style.transition = 'opacity .3s'; t.style.opacity = 0; setTimeout(() => t.remove(), 300); }, 2800);
}
function closePops() { $$('.dropdown').forEach(d => d.remove()); $('#search-pop')?.classList.add('hide'); }

/* ===== Router ===== */
const PAGES = {};
function parseHash() {
  const h = location.hash.replace(/^#\/?/, '') || '';
  const [path, qs] = h.split('?');
  const q = Object.fromEntries(new URLSearchParams(qs || ''));
  return { path, parts: path.split('/').filter(Boolean), q };
}
function render() {
  const { path, parts, q } = parseHash();
  const app = $('#app');
  closePops(); closeModal(); document.body.classList.remove('nav-open');
  if (!S.role || parts[0] === 'login') { app.innerHTML = PAGES.login(); return; }
  if (S.role === 'member' && parts[0] !== 'me') { location.replace('#/me'); return; }
  if (S.role === 'admin' && parts[0] === 'me') { location.replace('#/dashboard'); return; }
  if (!parts.length) { location.replace(S.role === 'member' ? '#/me' : '#/dashboard'); return; }
  let key = parts[0], content;
  if (key === 'me') key = 'me' + (parts[1] ? '_' + parts[1] : '');
  const fn = PAGES[key] || PAGES.notfound;
  try { content = fn(parts, q); } catch (e) { console.error(e); content = PAGES.notfound(); }
  app.innerHTML = `<div class="shell">${sidebar(path)}<div class="drawer-ov" data-act="nav-toggle"></div><div class="main">${topbar()}<main class="content" id="content">${content}</main></div></div>`;
  window.scrollTo(0, 0);
  (AFTER[key] || (() => { }))(parts, q);
  if (S.role === 'member' && !S.noticeShown) { S.noticeShown = true; setTimeout(showMemberNotice, 500); }
}
const AFTER = {};
PAGES.notfound = () => `<div class="card empty"><h2>Page not found</h2><p class="muted">The page you are looking for doesn't exist in this demo.</p><a class="btn primary" href="#/">Go home</a></div>`;

/* ===== Global actions (event delegation) ===== */
const ACT = {
  close: () => closeModal(),
  'nav-toggle': () => document.body.classList.toggle('nav-open'),
  theme: () => { S.theme = S.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = S.theme; store.set('theme', S.theme); render(); },
  logout: () => { S.role = null; store.set('role', null); S.noticeShown = false; location.hash = '#/login'; render(); },
  toast: el => toast(el.dataset.msg || 'Done'),
  print: () => window.print(),
  notif: (el, e) => {
    if ($('.dropdown.notif')) return closePops();
    closePops();
    const d = document.createElement('div'); d.className = 'dropdown notif';
    d.innerHTML = `<div class="hd"><b>Notifications</b><a class="small strong" style="color:var(--sage-600);cursor:pointer" data-act="mark-read">Mark all read</a></div>
      ${DB.notifications.map(n => `<a class="it ${n.unread ? 'unread' : ''}" href="${S.role === 'member' ? '#/me/tasks' : n.href}">
        <span class="alert-ico" style="background:var(--${n.tone === 'sage' ? 'sage-50' : n.tone + '-bg'});color:var(--${n.tone === 'sage' ? 'sage-700' : n.tone})">${ic(n.icon)}</span>
        <div class="grow"><div class="strong small">${n.t}</div><div class="muted xs truncate">${n.s}</div></div><span class="faint xs nowrap">${n.time}</span></a>`).join('')}
      <div style="padding:10px 16px;text-align:center"><span class="muted xs">Email & daily summary enabled · Settings</span></div>`;
    $('.topbar').appendChild(d); e.stopPropagation();
  },
  'mark-read': () => { DB.notifications.forEach(n => n.unread = false); render(); toast('All notifications marked as read'); },
  'profile-menu': (el, e) => {
    if ($('.dropdown.pm')) return closePops();
    closePops();
    const d = document.createElement('div'); d.className = 'dropdown sm pm';
    d.innerHTML = `
      ${S.role === 'admin' ? `<a class="menu-it" href="#/settings">${ic('settings')} Settings</a><a class="menu-it" href="#/settings?tab=roles">${ic('shield')} Roles & permissions</a>` : `<a class="menu-it" href="#/me/profile">${ic('user')} My profile</a>`}
      <a class="menu-it" data-act="theme">${ic(S.theme === 'dark' ? 'sun' : 'moon')} ${S.theme === 'dark' ? 'Light' : 'Dark'} mode</a>
      <a class="menu-it" data-act="switch-role">${ic('refresh')} Switch to ${S.role === 'admin' ? 'Team Member' : 'Admin'} view</a>
      <a class="menu-it" data-act="logout" style="color:var(--red);border-top:1px solid var(--line-2)">${ic('logout')} Log out</a>`;
    $('.topbar').appendChild(d); e.stopPropagation();
  },
  'switch-role': () => { S.role = S.role === 'admin' ? 'member' : 'admin'; store.set('role', S.role); S.noticeShown = false; location.hash = S.role === 'member' ? '#/me' : '#/dashboard'; },
  go: el => { location.hash = el.dataset.href; },
  toggle: el => el.classList.toggle('on'),
  check: el => { el.classList.toggle('on'); el.innerHTML = el.classList.contains('on') ? ic('check') : ''; },
};
document.addEventListener('click', e => {
  const a = e.target.closest('[data-act]');
  if (a) { const f = ACT[a.dataset.act]; if (f) { e.preventDefault(); f(a, e); return; } }
  const row = e.target.closest('[data-href]');
  if (row && !e.target.closest('a,button,input,select,label')) { location.hash = row.dataset.href; return; }
  if (!e.target.closest('.dropdown') && !e.target.closest('.search')) closePops();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closePops(); }
  if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); $('#gsearch')?.focus(); }
});
document.addEventListener('submit', e => {
  const f = e.target.closest('form[data-submit]');
  if (f) { e.preventDefault(); const fn = ACT[f.dataset.submit]; fn && fn(f, e); }
});

/* Global search */
document.addEventListener('input', e => {
  if (e.target.id !== 'gsearch') return;
  const q = e.target.value.trim().toLowerCase(), pop = $('#search-pop');
  if (!q) { pop.classList.add('hide'); return; }
  const isM = S.role === 'member';
  const cs = isM ? [] : DB.clients.filter(c => (c.name + c.phone + c.email + (c.contact || '')).toLowerCase().includes(q.replace(/\s/g, '')) || c.name.toLowerCase().includes(q)).slice(0, 4);
  const ps = DB.projects.filter(p => (p.id + p.title + client(p.clientId).name).toLowerCase().includes(q)).filter(p => !isM || p.sessions.some(s => s.team.includes(S.me))).slice(0, 5);
  const ts = isM ? [] : DB.team.filter(t => (t.name + t.phone + t.roles.join()).toLowerCase().includes(q)).slice(0, 3);
  pop.innerHTML = (cs.length ? `<div class="grp">Clients</div>` + cs.map(c => `<a href="#/clients/${c.id}">${av(c.name, 'sm')}<div class="grow"><div class="strong small">${esc(c.name)}</div><div class="muted xs">${c.phone} · ${c.type}</div></div></a>`).join('') : '')
    + (ps.length ? `<div class="grp">Bookings</div>` + ps.map(p => `<a href="${isM ? '#/me/tasks' : '#/projects/' + p.id}"><span class="alert-ico" style="background:var(--sage-50);color:var(--sage-700);width:28px;height:28px">${ic('film')}</span><div class="grow"><div class="strong small">${esc(p.title)}</div><div class="muted xs">${p.id} · ${fd(p.sessions[0].date)}</div></div>${badge(p.status)}</a>`).join('') : '')
    + (ts.length ? `<div class="grp">Team</div>` + ts.map(t => `<a href="#/team/${t.id}">${av(t.name, 'sm')}<div class="grow"><div class="strong small">${t.name}</div><div class="muted xs">${t.roles.join(', ')}</div></div></a>`).join('') : '')
    || `<div class="empty small">No results for “${esc(q)}”</div>`;
  pop.classList.remove('hide');
});

window.addEventListener('hashchange', render);
