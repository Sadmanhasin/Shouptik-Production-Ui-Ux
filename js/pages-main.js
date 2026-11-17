/* ============ LOGIN ============ */
PAGES.login = () => {
  const role = S._pick || 'admin';
  return `
  <div class="login">
    <section class="login-art">
      <div class="glow"></div>
      <img class="big-logo" src="assets/logo-mark.png" alt="">
      <div class="row" style="position:relative;gap:14px">
        <img src="assets/logo-mark.png" alt="Shoptik Production" style="width:64px">
        <div><div class="brand-name" style="font-size:18px">Shoptik Production</div><div class="brand-sub">Studio OS</div></div>
      </div>
      <div style="position:relative">
        <h2>Every shoot, edit and <em>taka</em> — in one calm place.</h2>
        <p>Schedules, bookings, clients, invoices, payouts and your crew. Built for how a Dhaka production house actually runs.</p>
      </div>
      <div class="login-feats">
        <div><b>13</b><span>Active projects</span></div>
        <div><b>10</b><span>Crew members</span></div>
        <div><b>৳5.75L</b><span>Collected this month</span></div>
      </div>
    </section>
    <section class="login-form">
      <form class="login-box" data-submit="login">
        <h1 style="font-size:26px">Welcome back</h1>
        <p class="muted" style="margin:6px 0 24px">Sign in to continue to your workspace.</p>
        <div class="field" style="margin-bottom:16px"><label>Sign in as (demo)</label>
          <div class="role-pick">
            <label class="${role === 'admin' ? 'on' : ''}" data-act="pick-role" data-r="admin"><b>${ic('shield')} Owner / Admin</b><span>Full studio control</span></label>
            <label class="${role === 'member' ? 'on' : ''}" data-act="pick-role" data-r="member"><b>${ic('user')} Team Member</b><span>Tasks, schedule, payouts</span></label>
          </div>
        </div>
        <div class="field" style="margin-bottom:12px"><label>Email or phone</label>
          <div class="input-ico">${ic('mail')}<input class="input" value="${role === 'admin' ? 'owner@shoptikproduction.com' : 'arif@shoptik.com'}"></div></div>
        <div class="field" style="margin-bottom:10px"><label>Password</label>
          <div class="input-ico">${ic('lock')}<input class="input" type="password" value="demo-password"></div></div>
        <div class="row between small" style="margin-bottom:20px">
          <label class="row" style="gap:8px;cursor:pointer"><span class="check on">${ic('check')}</span> Keep me signed in</label>
          <a class="strong" style="color:var(--sage-600)" data-act="toast" data-msg="Password reset link sent (demo)">Forgot password?</a>
        </div>
        <button class="btn primary block" style="height:46px;font-size:14.5px">Sign in ${ic('right')}</button>
        <p class="faint xs" style="text-align:center;margin-top:22px">Demo build · no real data is stored · ${ic('lock')} Secured session</p>
      </form>
    </section>
  </div>`;
};
ACT['pick-role'] = el => { S._pick = el.dataset.r; render(); };
ACT.login = () => { S.role = S._pick || 'admin'; store.set('role', S.role); S.noticeShown = false; location.hash = S.role === 'member' ? '#/me' : '#/dashboard'; render(); };

/* ============ EVENTS (used by dashboard + calendar) ============ */
const EXTRA_EVENTS = [
  { date: '2026-11-21', start: '11:00', end: '12:30', kind: 'meeting', title: 'Recce — Green Valley site', pid: 'SP-2026-0044', location: 'Bashundhara Block K', team: ['t3', 't1'] },
  { date: '2026-11-25', start: '15:00', end: '16:00', kind: 'meeting', title: 'Pre-wedding meeting — Farhan & Mithila', pid: 'SP-2026-0046', location: 'Shoptik Studio, Banani', team: ['t1'] },
  { date: '2026-11-17', end: '', kind: 'leave', title: 'Imran Hasan — leave (till 24 Nov)', team: ['t9'] },
  { date: '2026-11-27', end: '', kind: 'leave', title: 'Nadia Islam — leave', team: ['t4'] },
];
function allEvents() {
  const ev = [];
  DB.projects.forEach(p => {
    if (p.status === 'Cancelled') return;
    p.sessions.forEach(s => ev.push({ date: s.date, start: s.start, end: s.end, kind: 'shoot', title: `${p.title} · ${s.name}`, short: p.title, session: s.name, pid: p.id, location: s.location, team: s.team, p }));
    if (!['Delivered', 'Closed'].includes(p.status)) {
      ev.push({ date: p.editDeadline, kind: 'edit', title: `Edit deadline · ${p.title}`, short: p.title, pid: p.id, team: DB.tasks.filter(t => t.pid === p.id && /Editor|Colorist/.test(t.role)).map(t => t.who), p });
      ev.push({ date: p.delivery, kind: 'delivery', title: `Delivery · ${p.title}`, short: p.title, pid: p.id, team: [], p });
    }
  });
  EXTRA_EVENTS.forEach(e => ev.push({ ...e, short: e.title, p: e.pid ? project(e.pid) : null }));
  return ev.sort((a, b) => (a.date + (a.start || '00')).localeCompare(b.date + (b.start || '00')));
}
const KIND = { shoot: ['Shoot', 'var(--sage-600)'], edit: ['Editing deadline', 'var(--amber)'], delivery: ['Delivery', 'var(--blue)'], meeting: ['Meeting / Recce', 'var(--violet)'], leave: ['Team leave', 'var(--faint)'] };
const kindTag = k => `<span class="kind" style="color:${KIND[k][1]}"><i style="background:${KIND[k][1]}"></i>${KIND[k][0]}</span>`;
const dtBox = iso => { const d = D(iso); return `<div class="dt-box ${iso === TODAY ? 'today' : ''}"><div class="m">${MON[d.getMonth()]}</div><div class="d">${d.getDate()}</div><div class="w">${WD[d.getDay()]}</div></div>`; };

function upcomingRow(e, member = false) {
  const p = e.p || {};
  const dl = e.kind !== 'shoot' && e.kind !== 'meeting' ? daysBetween(TODAY, e.date) : null;
  const href = member ? '#/me/schedule' : (e.pid ? '#/projects/' + e.pid : '#/calendar');
  return `<div class="up-item" data-href="${href.slice(1)}">
    ${dtBox(e.date)}
    <div style="min-width:0">
      <div class="row" style="gap:8px;margin-bottom:2px">${kindTag(e.kind)}${dl !== null && dl <= 1 && dl >= 0 ? `<span class="badge b-red plain">${dl === 0 ? 'Due today' : 'Due tomorrow'}</span>` : ''}${e.date === TODAY && e.kind === 'shoot' ? '<span class="live-pill"><i></i>Today</span>' : ''}</div>
      <div class="up-title truncate">${esc(e.kind === 'shoot' ? e.short + ' — ' + e.session : e.short)}</div>
      <div class="meta">
        ${e.start ? `<span>${ic('clock')}${ft(e.start)}${e.end ? ' – ' + ft(e.end) : ''}</span>` : ''}
        ${p.clientId && !member ? `<span>${ic('user')}${esc(client(p.clientId).name)}</span>` : ''}
        ${p.type ? `<span>${ic('film')}${p.type}</span>` : ''}
        ${e.location ? `<span>${ic('pin')}${esc(e.location)}</span>` : ''}
      </div>
    </div>
    <div class="col" style="align-items:flex-end;gap:8px">${p.status ? badge(p.status) : ''}${e.team && e.team.length ? avStack(e.team) : ''}</div>
  </div>`;
}

/* ============ DASHBOARD ============ */
PAGES.dashboard = (parts, q) => {
  const tab = q.tab || 'week';
  const ranges = { today: 0, tomorrow: 1, week: 7, month: 30 };
  const evs = allEvents().filter(e => e.kind !== 'leave').filter(e => {
    const n = daysBetween(TODAY, e.date);
    return tab === 'tomorrow' ? n === 1 : n >= 0 && n <= ranges[tab];
  });
  const active = DB.projects.filter(p => !['Delivered', 'Closed', 'Cancelled', 'Inquiry'].includes(p.status));
  const totalDue = DB.projects.filter(p => !['Inquiry', 'Quotation Sent'].includes(p.status)).reduce((s, p) => s + projDue(p), 0);
  const novInc = DB.payments.filter(p => p.date >= '2026-11-01').reduce((s, p) => s + p.amount, 0);
  const novExp = DB.expenses.filter(p => p.date >= '2026-11-01').reduce((s, p) => s + p.amount, 0);
  const todays = allEvents().filter(e => e.date === TODAY && e.kind === 'shoot');
  const deadlines = DB.projects.filter(p => !['Delivered', 'Closed', 'Inquiry', 'Quotation Sent', 'Cancelled'].includes(p.status))
    .flatMap(p => [{ p, k: 'Editing', d: p.editDeadline }, { p, k: 'Delivery', d: p.delivery }])
    .map(x => ({ ...x, n: daysBetween(TODAY, x.d) })).filter(x => x.n <= 3).sort((a, b) => a.n - b.n);
  const dues = DB.projects.filter(p => !['Inquiry', 'Quotation Sent'].includes(p.status) && projDue(p) > 0).sort((a, b) => a.delivery.localeCompare(b.delivery)).slice(0, 5);
  const d = D(TODAY);

  return `
  <div class="hello">
    <div><div class="date">${WDF[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}</div>
      <h1>Good afternoon, Shoptik 👋</h1>
      <div class="muted" style="margin-top:4px">You have <b style="color:var(--text)">${todays.length} shoot${todays.length !== 1 ? 's' : ''} today</b>, ${deadlines.filter(x => x.n < 0).length} overdue deadlines and ${tk(totalDue)} to collect.</div></div>
    <div class="row wrap"><a class="btn" href="#/calendar">${ic('calendar')} Open calendar</a><a class="btn primary" href="#/projects/new">${ic('plus')} New Booking</a></div>
  </div>

  <div class="card" style="margin-bottom:18px">
    <div class="card-h">
      <div><h3>Upcoming Projects</h3><div class="sub">Shoots, editing deadlines and deliveries — sorted by date</div></div>
      <div class="seg">${[['today', 'Today'], ['tomorrow', 'Tomorrow'], ['week', 'This Week'], ['month', 'Next 30 days']].map(([k, l]) => `<a href="#/dashboard?tab=${k}" class="${tab === k ? 'on' : ''}">${l}</a>`).join('')}</div>
    </div>
    <div class="card-b flush" style="padding-bottom:0">
      ${evs.length ? evs.slice(0, 8).map(e => upcomingRow(e)).join('') : `<div class="empty">Nothing scheduled ${tab === 'today' ? 'today' : 'in this range'}.</div>`}
      ${evs.length > 8 ? `<a href="#/calendar?view=list" class="row" style="justify-content:center;padding:14px;border-top:1px solid var(--line-2);font-weight:700;color:var(--sage-600)">View all ${evs.length} events ${ic('right')}</a>` : ''}
    </div>
  </div>

  <div class="grid g-6 keep2" style="margin-bottom:18px">
    ${statCard('Income · Nov', tkShort(novInc), 'trend', delta('12%') + ' vs Oct', true)}
    ${statCard('Bookings · Nov', '7', 'film', delta('3') + ' new this month')}
    ${statCard('Total due', tkShort(totalDue), 'wallet', `<span style="color:var(--red);font-weight:700">${dues.length} clients</span> pending`)}
    ${statCard('Expense · Nov', tkShort(novExp), 'receipt', delta('4%', false) + ' vs Oct')}
    ${statCard('Active projects', active.length, 'layers', `${DB.projects.filter(p => p.status === 'In Editing').length} in editing`)}
    ${statCard('Pending delivery', DB.projects.filter(p => ['In Editing', 'Review / Revision', 'Shoot Done'].includes(p.status)).length, 'send', 'Next: ' + fdShort('2026-11-20'))}
  </div>

  <div class="grid g-main" style="margin-bottom:18px">
    <div class="card">
      <div class="card-h"><div><h3>Deadline alerts</h3><div class="sub">Editing & delivery — 3 days, 1 day, overdue</div></div><a class="btn sm" href="#/tasks">All tasks</a></div>
      <div class="card-b flush">
        ${deadlines.map(x => {
          const tone = x.n < 0 ? 'red' : x.n <= 1 ? 'amber' : 'blue';
          return `<div class="alert-row" data-href="/projects/${x.p.id}" style="cursor:pointer">
            <span class="alert-ico" style="background:var(--${tone}-bg);color:var(--${tone})">${ic(x.n < 0 ? 'alert' : 'clock')}</span>
            <div class="grow"><div class="strong">${x.k} · ${esc(x.p.title)}</div><div class="muted small">${fd(x.d)} · ${esc(client(x.p.clientId).name)}</div></div>
            <span class="badge b-${tone} plain">${x.n < 0 ? `Overdue ${-x.n}d` : x.n === 0 ? 'Today' : x.n === 1 ? 'Tomorrow' : `In ${x.n} days`}</span>
          </div>`;
        }).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-h"><div><h3>Today's schedule</h3><div class="sub">Who is where right now</div></div><span class="live-pill"><i></i>Live</span></div>
      <div class="timeline-sched" style="padding-top:12px">
        ${todays.map((e, i) => `<div class="ts-item ${i === 0 ? 'live' : ''}">
          <div class="tm">${ft(e.start)}</div><div class="ln"></div>
          <div><div class="strong">${esc(e.short)} — ${e.session}</div>
            <div class="meta"><span>${ic('pin')}${esc(e.location)}</span><span>${ic('clock')}until ${ft(e.end)}</span></div>
            <div class="row" style="margin-top:8px;gap:6px;flex-wrap:wrap">${e.team.map(t => `<span class="tag">${member(t).name.split(' ')[0]} · ${member(t).roles[0]}</span>`).join('')}</div></div>
        </div>`).join('')}
        <div class="ts-item"><div class="tm">7 PM</div><div class="ln"></div><div><div class="strong">Editor sync — Megh Brishti color pass</div><div class="meta"><span>${ic('pin')}Shoptik Studio</span><span>${ic('user')}Nadia, Mahin</span></div></div></div>
        <div class="ts-item"><div class="tm">All day</div><div class="ln"></div><div><div class="strong muted">Imran Hasan on leave</div><div class="meta"><span>Back on 25 Nov</span></div></div></div>
      </div>
    </div>
  </div>

  <div class="grid g-main" style="margin-bottom:18px">
    <div class="card">
      <div class="card-h"><div><h3>Due payments</h3><div class="sub">Who still owes, by due date</div></div><a class="btn sm" href="#/finance?tab=due">Due list</a></div>
      <div class="card-b flush tbl-wrap"><table class="tbl"><thead><tr><th>Client</th><th>Project</th><th class="r">Due</th><th>Due date</th><th></th></tr></thead><tbody>
        ${dues.map(p => { const c = client(p.clientId); const od = p.delivery < TODAY; return `<tr class="click" data-href="/projects/${p.id}?tab=payments">
          <td><div class="row">${av(c.name, 'sm')}<span class="strong">${esc(c.name)}</span></div></td>
          <td class="muted truncate" style="max-width:200px">${esc(p.title)}</td>
          <td class="r strong num">${tk(projDue(p))}</td>
          <td><span class="${od ? 'strong' : ''}" style="${od ? 'color:var(--red)' : ''}">${fdShort(p.delivery)}</span></td>
          <td class="r"><a class="btn sm" href="${waLink(c.wa, `Assalamu alaikum ${c.contact || c.name}, a gentle reminder: ${tk(projDue(p))} is due for "${p.title}". — Shoptik Production`)}" target="_blank">${ic('wa')} Remind</a></td>
        </tr>`; }).join('')}
      </tbody></table></div>
    </div>
    <div class="card">
      <div class="card-h"><h3>Quick actions</h3></div>
      <div class="card-b"><div class="qa">
        <a href="#/projects/new"><span class="q-ico">${ic('film')}</span>New Booking</a>
        <a data-act="new-client"><span class="q-ico">${ic('users')}</span>New Client</a>
        <a data-act="add-payment"><span class="q-ico">${ic('wallet')}</span>Add Payment</a>
        <a data-act="add-expense"><span class="q-ico">${ic('receipt')}</span>Add Expense</a>
        <a data-act="send-notice"><span class="q-ico">${ic('megaphone')}</span>Send Notice</a>
      </div></div>
      <div class="card-h" style="padding-top:4px"><h3>Recent activity</h3></div>
      <div class="card-b flush" style="padding-bottom:12px">
        ${DB.activity.slice(0, 5).map(a => `<div class="act-item">${av(a.who, 'sm')}<div class="grow"><div class="txt"><b>${a.who}</b> ${a.what} <b>${esc(a.target)}</b></div><div class="faint xs">${a.time}</div></div></div>`).join('')}
      </div>
    </div>
  </div>`;
};

/* ============ CALENDAR ============ */
PAGES.calendar = (parts, q) => {
  if (q.view) S.calView = q.view;
  const view = S.calView;
  const flt = q.f || 'all';
  const memberF = q.m || '';
  let evs = allEvents();
  if (flt !== 'all') evs = evs.filter(e => e.kind === flt);
  if (memberF) evs = evs.filter(e => (e.team || []).includes(memberF));
  const title = `${MONTHS[S.calM]} ${S.calY}`;

  let body = '';
  if (view === 'month') {
    const first = new Date(S.calY, S.calM, 1), start = new Date(first); start.setDate(1 - first.getDay());
    let cells = '';
    for (let i = 0; i < 42; i++) {
      const d = new Date(start); d.setDate(start.getDate() + i);
      const iso = isoOf(d), dayEv = evs.filter(e => e.date === iso);
      cells += `<div class="cell ${d.getMonth() !== S.calM ? 'out' : ''} ${iso === TODAY ? 'today' : ''}">
        <span class="dn">${d.getDate()}</span>
        ${dayEv.slice(0, 3).map(e => `<div class="ev ${e.kind}" data-act="ev-pop" data-pid="${e.pid || ''}" data-d="${e.date}" data-k="${e.kind}" data-t="${esc(e.title)}">${e.start ? `<span class="t">${ft(e.start).replace(' ', '').toLowerCase()}</span>` : ''}${esc(e.short)}</div>`).join('')}
        ${dayEv.length > 3 ? `<span class="cal-more" data-act="day-list" data-d="${iso}">+${dayEv.length - 3} more</span>` : ''}
      </div>`;
    }
    body = `<div class="cal">${WD.map(w => `<div class="dow">${w}</div>`).join('')}${cells}</div>`;
  } else if (view === 'week' || view === 'day') {
    const base = D(S.calDay || TODAY); const ws = new Date(base); if (view === 'week') ws.setDate(base.getDate() - base.getDay());
    const n = view === 'week' ? 7 : 1;
    const days = Array.from({ length: n }, (_, i) => { const d = new Date(ws); d.setDate(ws.getDate() + i); return d; });
    const H0 = 6, H1 = 24, SLOT = 52;
    body = `<div class="tbl-wrap"><div class="week" style="grid-template-columns:60px repeat(${n}, minmax(${n === 7 ? 120 : 300}px,1fr));min-width:${n === 7 ? 900 : 360}px">
      <div class="wh"></div>${days.map(d => `<div class="wh ${isoOf(d) === TODAY ? 'today' : ''}">${WD[d.getDay()]}<b>${d.getDate()}</b></div>`).join('')}
      <div>${Array.from({ length: H1 - H0 }, (_, i) => `<div class="hr">${ft(String(H0 + i).padStart(2, '0') + ':00')}</div>`).join('')}</div>
      ${days.map(d => {
        const iso = isoOf(d);
        const de = evs.filter(e => e.date === iso);
        return `<div class="day-col">${Array.from({ length: H1 - H0 }, () => '<div class="slot"></div>').join('')}
          ${de.map((e, j) => {
            const [sh, sm] = (e.start || '09:00').split(':').map(Number); const [eh, em] = (e.end || ((sh + 1) + ':00')).split(':').map(Number);
            const top = ((sh + sm / 60) - H0) * SLOT, hgt = Math.max(40, ((eh + em / 60) - (sh + sm / 60)) * SLOT - 4);
            return `<div class="wev ev ${e.kind}" style="top:${e.start ? top : j * 44 + 2}px;height:${e.start ? hgt : 40}px;white-space:normal" data-act="ev-pop" data-pid="${e.pid || ''}" data-d="${e.date}" data-k="${e.kind}" data-t="${esc(e.title)}">
              ${e.start ? `<div class="t" style="font-size:10.5px">${ft(e.start)} – ${ft(e.end)}</div>` : `<div class="t" style="font-size:10.5px">${KIND[e.kind][0]}</div>`}${esc(e.short)}${e.session ? ' · ' + e.session : ''}</div>`;
          }).join('')}</div>`;
      }).join('')}
    </div></div>`;
  } else {
    const list = evs.filter(e => e.date >= TODAY).slice(0, 30);
    body = list.map(e => upcomingRow(e)).join('');
  }

  const sideAvail = DB.team.map(t => {
    const busy = allEvents().filter(e => e.date === TODAY && (e.team || []).includes(t.id) && e.kind !== 'leave');
    const leave = t.status === 'On Leave';
    return { t, st: leave ? 'Leave' : busy.length ? 'On shoot' : t.status === 'Inactive' ? 'Inactive' : 'Free' };
  });

  return `
  ${pageHead('Calendar', 'Shoots, editing deadlines, deliveries, meetings and leave — color coded.',
    `<div class="seg">${['month', 'week', 'day', 'list'].map(v => `<a href="#/calendar?view=${v}" class="${view === v ? 'on' : ''}">${v[0].toUpperCase() + v.slice(1)}</a>`).join('')}</div>
     <button class="btn" data-act="toast" data-msg="Calendar exported as shoptik-calendar.ics">${ic('download')} .ics</button>
     <button class="btn" data-act="toast" data-msg="Google Calendar sync connected (demo)">${ic('refresh')} Google sync</button>
     <a class="btn primary" href="#/projects/new">${ic('plus')} New Booking</a>`)}
  <div class="grid g-side">
    <div class="card" style="overflow:hidden">
      <div class="toolbar">
        <div class="row" style="gap:6px">
          <button class="btn sm icon" data-act="cal-nav" data-d="-1">${ic('left')}</button>
          <button class="btn sm" data-act="cal-today">Today</button>
          <button class="btn sm icon" data-act="cal-nav" data-d="1">${ic('right')}</button>
          <h3 style="font-size:17px;margin-left:6px">${view === 'month' || view === 'list' ? title : view === 'day' ? fd(S.calDay || TODAY) : 'Week of ' + fdShort(isoOf((() => { const b = D(S.calDay || TODAY); b.setDate(b.getDate() - b.getDay()); return b; })()))}</h3>
        </div>
        <div class="row wrap" style="margin-left:auto;gap:6px">
          <select class="select sm" data-change="cal-filter" data-key="f">${[['all', 'All event types'], ...Object.entries(KIND).map(([k, v]) => [k, v[0]])].map(([k, l]) => `<option value="${k}" ${flt === k ? 'selected' : ''}>${l}</option>`).join('')}</select>
          <select class="select sm" data-change="cal-filter" data-key="m"><option value="">All team</option>${DB.team.map(t => `<option value="${t.id}" ${memberF === t.id ? 'selected' : ''}>${t.name}</option>`).join('')}</select>
        </div>
      </div>
      ${body}
    </div>
    <div class="col" style="gap:18px">
      <div class="card"><div class="card-h"><h3>Legend</h3></div><div class="card-b col" style="gap:10px">${Object.keys(KIND).map(kindTag).join('')}</div></div>
      <div class="card cal-side">
        <div class="card-h"><div><h3>Availability · Today</h3><div class="sub">Check before taking a booking</div></div></div>
        <div class="card-b" style="padding-top:8px">
          <div class="row" style="margin-bottom:10px;gap:8px"><input type="date" class="input sm" value="${TODAY}" style="flex:1" data-change="avail-date"><button class="btn sm" data-act="toast" data-msg="5 members free on selected date">Check</button></div>
          ${sideAvail.map(({ t, st }) => `<div class="avail-row">${av(t.name, 'sm')}<div class="grow"><div class="small strong">${t.name}</div><div class="faint xs">${t.roles[0]}</div></div>
            <span class="badge ${st === 'Free' ? 'b-green' : st === 'On shoot' ? 'b-blue' : st === 'Leave' ? 'b-amber' : ''}">${st}</span></div>`).join('')}
        </div>
      </div>
      <div class="card"><div class="card-b"><div class="warn">${ic('alert')}<div><b>Conflict on 20 Nov</b><br>Sabbir Rahman & DJI Mavic 3 Pro are assigned to 2 sessions overlapping 6–7 PM.</div></div></div></div>
    </div>
  </div>`;
};
ACT['cal-nav'] = el => {
  const n = +el.dataset.d;
  if (S.calView === 'month' || S.calView === 'list') { S.calM += n; if (S.calM < 0) { S.calM = 11; S.calY--; } if (S.calM > 11) { S.calM = 0; S.calY++; } }
  else { S.calDay = addDays(S.calDay || TODAY, n * (S.calView === 'week' ? 7 : 1)); }
  render();
};
ACT['cal-today'] = () => { S.calY = 2026; S.calM = 10; S.calDay = TODAY; render(); };
ACT['day-list'] = el => { S.calDay = el.dataset.d; location.hash = '#/calendar?view=day'; };
ACT['ev-pop'] = el => {
  const p = el.dataset.pid ? project(el.dataset.pid) : null;
  const k = el.dataset.k;
  if (!p) { openModal(modalHead(el.dataset.t, fd(el.dataset.d)) + `<div class="modal-b">${kindTag(k)}</div>`); return; }
  const c = client(p.clientId), s = p.sessions.find(x => x.date === el.dataset.d);
  openModal(modalHead(esc(p.title), `${p.id} · ${esc(c.name)}`) + `
    <div class="modal-b">
      <div class="row wrap" style="margin-bottom:14px">${kindTag(k)}${badge(p.status)}</div>
      <dl class="kv">
        <dt>Date</dt><dd>${fd(el.dataset.d)}${s ? ` · ${ft(s.start)} – ${ft(s.end)}` : ''}</dd>
        ${s ? `<dt>Session</dt><dd>${s.name}</dd><dt>Location</dt><dd><a href="https://maps.google.com/?q=${encodeURIComponent(s.location)}" target="_blank" style="color:var(--sage-600)">${esc(s.location)} ${ic('ext')}</a></dd>
        <dt>Team</dt><dd>${s.team.length ? s.team.map(t => member(t).name).join(', ') : '—'}</dd>` : ''}
        <dt>Client</dt><dd>${esc(c.name)} · ${c.phone}</dd>
        <dt>Services</dt><dd>${p.services.join(', ')}</dd>
      </dl>
    </div>
    <div class="modal-f"><a class="btn" href="${waLink(c.wa)}" target="_blank">${ic('wa')} Client</a><a class="btn primary" href="#/projects/${p.id}">Open booking ${ic('right')}</a></div>`);
};
document.addEventListener('change', e => {
  const el = e.target.closest('[data-change]'); if (!el) return;
  const k = el.dataset.change;
  if (k === 'cal-filter') { const { q } = parseHash(); q[el.dataset.key] = el.value; location.hash = '#/calendar?' + new URLSearchParams(q); }
  if (k === 'proj-filter') { const { q } = parseHash(); q[el.dataset.key] = el.value; location.hash = '#/projects?' + new URLSearchParams(q); }
  if (ACT['chg-' + k]) ACT['chg-' + k](el, e);
});

/* ============ PROJECTS LIST ============ */
PAGES.projects = (parts, q) => {
  if (parts[1] === 'new') return PAGES.booking_new(parts, q);
  if (parts[1]) return PAGES.project_detail(parts, q);
  const st = q.status || 'all', svc = q.svc || '', due = q.due || '';
  let list = DB.projects.slice().sort((a, b) => b.id.localeCompare(a.id));
  const counts = s => DB.projects.filter(p => s === 'all' || p.status === s).length;
  if (st !== 'all') list = list.filter(p => p.status === st);
  if (svc) list = list.filter(p => p.type === svc);
  if (due === 'yes') list = list.filter(p => projDue(p) > 0 && !['Inquiry', 'Quotation Sent'].includes(p.status));
  if (q.s) list = list.filter(p => (p.id + p.title + client(p.clientId).name).toLowerCase().includes(q.s.toLowerCase()));
  const statuses = ['all', 'Inquiry', 'Quotation Sent', 'Confirmed', 'In Editing', 'Review / Revision', 'Delivered', 'On Hold'];
  return `
  ${pageHead('Projects / Bookings', `${DB.projects.length} bookings · ${tk(DB.projects.reduce((s, p) => s + p.budget, 0))} total value`,
    `<button class="btn" data-act="from-package">${ic('layers')} From package</button><a class="btn primary" href="#/projects/new">${ic('plus')} New Booking</a>`)}
  <div class="card">
    <div class="tabs" style="padding:0 16px;margin:0">${statuses.map(s => `<a href="#/projects?status=${encodeURIComponent(s)}" class="${st === s ? 'on' : ''}">${s === 'all' ? 'All' : s}<span class="n">${counts(s)}</span></a>`).join('')}</div>
    <div class="toolbar">
      <div class="input-ico" style="width:260px">${ic('search')}<input class="input sm" style="width:100%" placeholder="Search title, ID, client…" value="${esc(q.s || '')}" data-change="proj-filter" data-key="s"></div>
      <select class="select sm" data-change="proj-filter" data-key="svc"><option value="">All event types</option>${['Wedding', 'Corporate', 'Product', 'Music Video', 'Birthday', 'Real Estate'].map(t => `<option ${svc === t ? 'selected' : ''}>${t}</option>`).join('')}</select>
      <select class="select sm" data-change="proj-filter" data-key="due"><option value="">Any payment</option><option value="yes" ${due === 'yes' ? 'selected' : ''}>Has due</option></select>
      <input type="date" class="input sm" value="2026-11-01"> <span class="faint">→</span> <input type="date" class="input sm" value="2026-12-31">
      <span class="grow"></span>
      <button class="btn sm" data-act="toast" data-msg="Exported 13 bookings to Excel">${ic('download')} Export</button>
    </div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Booking</th><th>Client</th><th>Next date</th><th>Team</th><th>Status</th><th class="r">Budget</th><th class="r">Due</th><th></th></tr></thead><tbody>
      ${list.map(p => {
        const c = client(p.clientId), next = p.sessions.find(s => s.date >= TODAY) || p.sessions[p.sessions.length - 1];
        const team = [...new Set(p.sessions.flatMap(s => s.team))];
        const dueV = ['Inquiry', 'Quotation Sent'].includes(p.status) ? 0 : projDue(p);
        return `<tr class="click" data-href="/projects/${p.id}">
          <td><div class="strong">${esc(p.title)}</div><div class="faint xs">${p.id} · ${p.type} · ${p.sessions.length} session${p.sessions.length > 1 ? 's' : ''}</div></td>
          <td><div class="row">${av(c.name, 'sm')}<span>${esc(c.name)}</span></div></td>
          <td class="nowrap"><div class="small strong">${fd(next.date)}</div><div class="faint xs">${ft(next.start)} · ${rel(next.date)}</div></td>
          <td>${avStack(team)}</td>
          <td>${badge(p.status)}</td>
          <td class="r num strong">${tk(p.budget)}</td>
          <td class="r num" style="${dueV ? 'color:var(--red);font-weight:700' : 'color:var(--faint)'}">${dueV ? tk(dueV) : '—'}</td>
          <td class="r"><button class="btn sm icon ghost" data-act="dup-booking" data-id="${p.id}" title="Duplicate">${ic('copy')}</button></td>
        </tr>`;
      }).join('') || `<tr><td colspan="8"><div class="empty">No bookings match these filters.</div></td></tr>`}
    </tbody></table></div>
  </div>`;
};
ACT['dup-booking'] = el => toast(`Booking ${el.dataset.id} duplicated as draft — open it to edit dates`, 'copy');
ACT['from-package'] = () => openModal(modalHead('Start from a package', 'One click fills services, crew and price') + `<div class="modal-b col" style="gap:10px">
  ${DB.packages.map(p => `<a class="svc" href="#/projects/new?pkg=${p.id}"><span class="si">${ic('layers')}</span><div class="grow"><div class="row between"><span class="nm">${p.name}</span><b class="num">${tk(p.price)}</b></div><div class="pr">${p.items.join(' · ')}</div></div></a>`).join('')}
</div>`);

/* ============ PROJECT DETAIL ============ */
PAGES.project_detail = (parts, q) => {
  const p = project(parts[1]); if (!p.id) return PAGES.notfound();
  const c = client(p.clientId), tab = q.tab || 'overview';
  const paid = projPaid(p), due = projDue(p), pays = DB.payments.filter(x => x.pid === p.id);
  const tasks = DB.tasks.filter(t => t.pid === p.id), exps = DB.expenses.filter(x => x.pid === p.id);
  const team = [...new Set(p.sessions.flatMap(s => s.team))];
  const stIdx = PIPELINE.indexOf(p.status);
  const base = `#/projects/${p.id}`;
  let body = '';

  if (tab === 'overview') body = `
    <div class="grid g-main">
      <div class="col" style="gap:18px">
        <div class="card"><div class="card-h"><h3>Schedule · ${p.sessions.length} session${p.sessions.length > 1 ? 's' : ''}</h3><button class="btn sm" data-act="toast" data-msg="Session added (demo)">${ic('plus')} Add session</button></div>
          <div class="card-b">${p.sessions.map((s, i) => `<div class="sess-card"><div class="bar" style="background:${['var(--sage-600)', 'var(--amber)', 'var(--blue)'][i % 3]}"></div>
            <div><div class="row between wrap"><b style="font-size:15px">${s.name}</b><span class="badge ${s.date < TODAY ? 'b-green' : s.date === TODAY ? 'b-red' : 'b-sage'} plain">${s.date < TODAY ? 'Done' : rel(s.date)}</span></div>
              <div class="meta" style="margin:6px 0 10px"><span>${ic('calendar')}${fd(s.date)}</span><span>${ic('clock')}${ft(s.start)} – ${ft(s.end)}</span><a href="https://maps.google.com/?q=${encodeURIComponent(s.location)}" target="_blank" style="color:var(--sage-600)"><span>${ic('pin')}${esc(s.location)}</span></a></div>
              <div class="row wrap" style="gap:6px">${s.team.map(t => `<span class="tag">${av(member(t).name, 'sm')} ${member(t).name} · ${member(t).roles[0]}</span>`).join('') || '<span class="badge b-amber">No crew assigned</span>'}</div></div></div>`).join('')}</div></div>
        <div class="card"><div class="card-h"><h3>Services & add-ons</h3>${p.package ? `<span class="tag">${ic('layers')} ${p.package}</span>` : ''}</div>
          <div class="card-b"><div class="row wrap" style="gap:8px">${p.services.map(s => `<span class="chip on">${s}</span>`).join('')}${p.addons.map(a => `<span class="chip">${ic('plus')}${a}</span>`).join('')}</div></div></div>
        <div class="card"><div class="card-h"><h3>Deliverables</h3><span class="muted small">${p.deliverables.filter(d => d[1]).length}/${p.deliverables.length} done · 2 free revisions</span></div>
          <div class="card-b flush">${p.deliverables.map(d => `<div class="list-item"><span class="check ${d[1] ? 'on' : ''}" data-act="check">${d[1] ? ic('check') : ''}</span><span class="grow ${d[1] ? 'muted' : 'strong'}">${d[0]}</span></div>`).join('')}</div></div>
      </div>
      <div class="col" style="gap:18px">
        <div class="card"><div class="card-h"><h3>Client</h3><a class="btn sm" href="#/clients/${c.id}">Profile</a></div>
          <div class="card-b"><div class="row" style="margin-bottom:14px">${av(c.name, 'lg')}<div><div class="strong" style="font-size:15px">${esc(c.name)}</div><div class="muted small">${c.contact ? c.contact + ' · ' : ''}${c.type}</div></div></div>
            <dl class="kv" style="grid-template-columns:80px 1fr"><dt>Phone</dt><dd>${c.phone}</dd><dt>Email</dt><dd class="truncate">${c.email}</dd><dt>Source</dt><dd>${c.source}</dd></dl>
            <div class="row" style="margin-top:14px;gap:8px"><a class="btn sm" href="tel:${c.phone}">${ic('phone')} Call</a><a class="btn sm wa" href="${waLink(c.wa)}" target="_blank">${ic('wa')} WhatsApp</a><a class="btn sm" href="mailto:${c.email}">${ic('mail')}</a></div></div></div>
        <div class="card"><div class="card-h"><h3>Key dates</h3></div><div class="card-b"><dl class="kv" style="grid-template-columns:110px 1fr">
          <dt>First shoot</dt><dd>${fd(p.sessions[0].date)}</dd>
          <dt>Edit deadline</dt><dd style="${p.editDeadline < TODAY && !['Delivered', 'Closed'].includes(p.status) ? 'color:var(--red)' : ''}">${fd(p.editDeadline)} <span class="faint xs">(${rel(p.editDeadline)})</span></dd>
          <dt>Delivery</dt><dd>${fd(p.delivery)} <span class="faint xs">(${rel(p.delivery)})</span></dd></dl></div></div>
        <div class="card"><div class="card-h"><h3>Equipment</h3><button class="btn sm" data-act="toast" data-msg="Equipment checked out">${ic('plus')}</button></div><div class="card-b flush">
          ${(DB.equipment.filter(e => e.pid === p.id).length ? DB.equipment.filter(e => e.pid === p.id) : DB.equipment.slice(2, 4)).map(e => `<div class="list-item"><span class="alert-ico" style="background:var(--sage-50);color:var(--sage-700)">${ic(eqIcon(e.cat))}</span><div class="grow"><div class="strong small">${e.name}</div><div class="faint xs">${e.serial}</div></div>${badge(e.status)}</div>`).join('')}</div></div>
      </div>
    </div>`;

  if (tab === 'tasks') body = `<div class="card"><div class="card-h"><div><h3>Tasks · ${p.progress}% complete</h3><div class="sub">Generated from the "${p.type}" task template</div></div><button class="btn sm primary" data-act="new-task">${ic('plus')} Add task</button></div>
    <div class="card-b" style="padding-top:12px">${prog(p.progress)}</div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Task</th><th>Assignee</th><th>Due</th><th>Priority</th><th>Checklist</th><th>Status</th></tr></thead><tbody>
    ${(tasks.length ? tasks : []).map(taskRow).join('') || '<tr><td colspan="6"><div class="empty">No tasks yet. Apply a template to generate them.</div></td></tr>'}</tbody></table></div></div>`;

  if (tab === 'payments') body = `<div class="grid g-main"><div class="card"><div class="card-h"><h3>Payment history</h3><button class="btn sm primary" data-act="add-payment" data-pid="${p.id}">${ic('plus')} Add Payment</button></div>
    <div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><thead><tr><th>Receipt</th><th>Date</th><th>Method</th><th>Reference</th><th class="r">Amount</th><th></th></tr></thead><tbody>
    ${pays.map(x => `<tr><td class="strong">${x.id}</td><td>${fd(x.date)}</td><td>${methodTag(x.method)}</td><td class="muted small">${x.ref}</td><td class="r num strong">${tk(x.amount)}</td><td class="r"><button class="btn sm" data-act="receipt" data-id="${x.id}">${ic('receipt')} Receipt</button></td></tr>`).join('') || '<tr><td colspan="6"><div class="empty">No payments yet.</div></td></tr>'}</tbody></table></div></div>
    <div class="col" style="gap:18px"><div class="card"><div class="card-h"><h3>Installment plan</h3></div><div class="card-b col" style="gap:12px">
      ${[['Advance (50%)', .5, p.sessions[0].date], ['Shoot day (30%)', .3, p.sessions[p.sessions.length - 1].date], ['Before delivery (20%)', .2, p.delivery]].reduce((acc, [l, pc, d]) => { const amt = p.budget * pc; const cum = acc.cum + amt; acc.html += `<div class="row between"><div><div class="strong small">${l}</div><div class="faint xs">Due ${fd(d)}</div></div><div class="col" style="align-items:flex-end;gap:2px"><b class="num">${tk(amt)}</b>${paid >= cum ? '<span class="badge b-green">Paid</span>' : paid > acc.cum ? '<span class="badge b-amber">Partial</span>' : `<span class="badge ${d < TODAY ? 'b-red' : ''}">${d < TODAY ? 'Overdue' : 'Upcoming'}</span>`}</div></div>`; acc.cum = cum; return acc; }, { html: '', cum: 0 }).html}
    </div></div>${due > 0 && ['In Editing', 'Review / Revision'].includes(p.status) ? `<div class="warn red">${ic('alert')}<div>Full payment not received — ${tk(due)} due before delivery.</div></div>` : ''}</div></div>`;

  if (tab === 'invoices') {
    const inv = DB.invoices.find(i => i.pid === p.id), qs = DB.quotations.filter(x => x.pid === p.id);
    body = `<div class="card"><div class="card-h"><h3>Quotations & invoices</h3><div class="row"><a class="btn sm" href="#/invoices/quote-${p.id}">${ic('file')} New quotation</a>${inv ? '' : `<button class="btn sm primary" data-act="toast" data-msg="Invoice created">${ic('plus')} Create invoice</button>`}</div></div>
    <div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><thead><tr><th>Document</th><th>Date</th><th>Version / Due</th><th>Status</th><th class="r">Amount</th><th></th></tr></thead><tbody>
    ${inv ? `<tr class="click" data-href="/invoices/${inv.id}"><td class="strong">${ic('file')} ${inv.id}</td><td>${fd(inv.issue)}</td><td>Due ${fd(inv.due)}</td><td>${badge(invStatus(inv))}</td><td class="r num strong">${tk(inv.amount)}</td><td class="r"><div class="row" style="justify-content:flex-end;gap:6px"><button class="btn sm" data-act="send-mail" data-doc="${inv.id}">${ic('mail')} Send</button><a class="btn sm" href="#/invoices/${inv.id}">${ic('download')} PDF</a></div></td></tr>` : ''}
    ${qs.map(x => `<tr class="click" data-href="/invoices/quote-${p.id}"><td class="strong">${ic('file')} ${x.id}</td><td>${fd(x.date)}</td><td>${x.ver} · valid till ${fdShort(x.valid)}</td><td>${badge(x.status)}</td><td class="r num">${tk(x.amount)}</td><td class="r"><a class="btn sm" href="#/invoices/quote-${p.id}">View</a></td></tr>`).join('')}
    </tbody></table></div><div class="card-b"><div class="muted small strong" style="margin-bottom:8px">Sent log</div>${DB.emailLog.slice(0, 2).map(l => `<div class="row small" style="padding:6px 0">${ic('send')}<span class="grow">${l.subject}</span><span class="faint xs">${l.date}</span></div>`).join('')}</div></div>`;
  }

  if (tab === 'expenses') {
    const payoutAmt = Math.round(p.budget * .22), expAmt = exps.reduce((s, x) => s + x.amount, 0) || Math.round(p.budget * .06);
    body = `<div class="grid g-main"><div class="card"><div class="card-h"><h3>Project expenses</h3><button class="btn sm primary" data-act="add-expense" data-pid="${p.id}">${ic('plus')} Add Expense</button></div>
      <div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><thead><tr><th>Date</th><th>Category</th><th>Paid to</th><th>Method</th><th class="r">Amount</th></tr></thead><tbody>
      ${(exps.length ? exps : [{ date: p.sessions[0].date, cat: 'Transport', to: 'Microbus rental', method: 'Cash', amount: expAmt }]).map(x => `<tr><td>${fd(x.date)}</td><td><span class="tag">${x.cat}</span></td><td>${x.to}</td><td>${x.method}</td><td class="r num strong">${tk(x.amount)}</td></tr>`).join('')}</tbody></table></div></div>
      <div class="card"><div class="card-h"><h3>Project P&L</h3></div><div class="card-b">
        <div class="ln row between" style="padding:6px 0"><span class="muted">Booking income</span><b class="num">${tk(p.budget)}</b></div>
        <div class="ln row between" style="padding:6px 0"><span class="muted">Project expenses</span><b class="num" style="color:var(--red)">− ${tk(expAmt)}</b></div>
        <div class="ln row between" style="padding:6px 0"><span class="muted">Team payouts</span><b class="num" style="color:var(--red)">− ${tk(payoutAmt)}</b></div>
        <div class="row between" style="border-top:1px dashed var(--line);margin-top:10px;padding-top:12px"><b>Project profit</b><b class="num" style="font-size:20px;color:var(--green)">${tk(p.budget - expAmt - payoutAmt)}</b></div>
        <div class="muted xs" style="margin-top:6px">Margin ${Math.round((p.budget - expAmt - payoutAmt) / p.budget * 100)}%</div></div></div></div>`;
  }

  if (tab === 'files') body = `<div class="grid g-2">
    <div class="card"><div class="card-h"><h3>Brief & references</h3><button class="btn sm" data-act="toast" data-msg="File uploaded">${ic('upload')} Upload</button></div><div class="card-b flush">
      ${[['Client brief.pdf', 'file', '1.2 MB'], ['Moodboard — Pinterest', 'link', 'pinterest.com/…'], ['Shot list v2.xlsx', 'file', '84 KB'], ['Venue floor plan.jpg', 'image', '2.4 MB']].map(f => `<div class="list-item"><span class="alert-ico" style="background:var(--sage-50);color:var(--sage-700)">${ic(f[1])}</span><div class="grow"><div class="strong small">${f[0]}</div><div class="faint xs">${f[2]}</div></div><button class="btn sm icon ghost">${ic('download')}</button></div>`).join('')}</div></div>
    <div class="card"><div class="card-h"><h3>Delivery</h3><span class="badge b-amber plain">Revision 1 of 2 used</span></div><div class="card-b col" style="gap:12px">
      <div class="field"><label>Delivery link</label><div class="row"><div class="input-ico grow">${ic('link')}<input class="input" value="https://drive.google.com/drive/folders/1Shoptik-${p.id}"></div><button class="btn icon" data-act="toast" data-msg="Link copied">${ic('copy')}</button></div></div>
      ${due > 0 ? `<div class="warn">${ic('alert')}<div>${tk(due)} is still due. Consider sending a watermarked preview first.</div></div>` : `<div class="warn ok">${ic('check')}<div>Fully paid — safe to deliver final files.</div></div>`}
      <div class="row wrap"><button class="btn" data-act="send-mail" data-doc="delivery">${ic('mail')} Send to client</button><a class="btn wa" target="_blank" href="${waLink(c.wa, `Hi ${c.contact || c.name}, your files for "${p.title}" are ready: https://drive.google.com/… — Shoptik Production`)}">${ic('wa')} WhatsApp link</a></div>
    </div></div></div>`;

  if (tab === 'activity') body = `<div class="card"><div class="card-b">${[
    ['Arif Hossain', 'added payment ৳50,000 via bKash', '17 Nov, 11:04 AM'], ['Owner', 'assigned Sabbir Rahman to Biye session', '16 Nov, 6:30 PM'],
    ['Owner', 'changed status Quotation Sent → Confirmed', '25 Oct, 2:15 PM'], ['Owner', 'sent invoice by email', '25 Oct, 2:10 PM'], ['Owner', 'created booking ' + p.id, '24 Oct, 5:52 PM']]
    .map(a => `<div class="ts-item" style="grid-template-columns:130px 14px 1fr"><div class="tm faint" style="font-weight:600">${a[2]}</div><div class="ln"></div><div><b>${a[0]}</b> ${a[1]}</div></div>`).join('')}</div></div>`;

  return `
  <div class="crumbs"><a href="#/projects">Projects</a>${ic('right')}<span>${p.id}</span></div>
  <div class="card" style="margin-bottom:18px">
    <div class="dhead">
      <div style="min-width:0"><div class="id">${p.id} · ${p.type.toUpperCase()}</div><h1>${esc(p.title)}</h1>
        <div class="row wrap">${badge(p.status)}<span class="muted small">${ic('user')} ${esc(c.name)}</span><span class="muted small">·</span>${avStack(team, 6)}</div></div>
      <div class="row wrap">
        <select class="select sm" data-change="status-change" style="height:40px">${[...PIPELINE, 'On Hold', 'Cancelled'].map(s => `<option ${s === p.status ? 'selected' : ''}>${s}</option>`).join('')}</select>
        <button class="btn" data-act="send-mail" data-doc="invoice">${ic('mail')} Send Mail</button>
        <button class="btn" data-act="dup-booking" data-id="${p.id}">${ic('copy')}</button>
        <button class="btn primary" data-act="add-payment" data-pid="${p.id}">${ic('plus')} Add Payment</button>
      </div>
    </div>
    <div style="padding:0 24px 18px"><div class="pipe">${PIPELINE.map((s, i) => `<div class="st ${i < stIdx ? 'done' : i === stIdx ? 'cur' : ''}"><div class="d"></div>${s}</div>`).join('')}</div></div>
    <div class="money-strip">
      <div><div class="l">Total budget</div><div class="v num">${tk(p.budget)}</div></div>
      <div><div class="l">Paid</div><div class="v num" style="color:var(--green)">${tk(paid)}</div>${prog(paid / p.budget * 100)}</div>
      <div><div class="l">Due</div><div class="v num" style="color:${due ? 'var(--red)' : 'var(--text)'}">${tk(due)}</div></div>
    </div>
  </div>
  ${tabs(base, [['overview', 'Overview'], ['tasks', 'Tasks', tasks.length], ['payments', 'Payments', pays.length], ['invoices', 'Invoices'], ['expenses', 'Expenses'], ['files', 'Files & Delivery'], ['activity', 'Activity log']], tab === 'overview' ? 'overview' : tab).replace(`href="${base}?tab=overview"`, `href="${base}"`)}
  ${body}`;
};
ACT['chg-status-change'] = el => { const { parts } = parseHash(); project(parts[1]).status = el.value; toast(`Status changed to “${el.value}”`); render(); };
const eqIcon = c => ({ Camera: 'camera', Lens: 'aperture', Drone: 'drone', Light: 'light', Gimbal: 'move', Audio: 'mic', Storage: 'hdd' }[c] || 'box');
const METHOD_C = { Cash: 'b-green', bKash: 'b-red', Nagad: 'b-amber', Rocket: 'b-violet', 'Bank Transfer': 'b-blue', Card: 'b-teal', Cheque: '' };
const methodTag = m => `<span class="badge plain ${METHOD_C[m] || ''}">${m}</span>`;
function taskRow(t) {
  const m = member(t.who), p = project(t.pid), od = t.status !== 'Completed' && t.due < TODAY;
  return `<tr><td><div class="strong">${esc(t.title)}</div><div class="faint xs">${p.title ? esc(p.title) : ''}</div></td>
    <td><div class="row">${av(m.name, 'sm')}<div><div class="small strong">${m.name}</div><div class="faint xs">${t.role}</div></div></div></td>
    <td class="nowrap" style="${od ? 'color:var(--red);font-weight:700' : ''}">${fdShort(t.due)}${od ? ' · overdue' : ''}</td>
    <td><span class="prio ${t.prio}">${t.prio}</span></td>
    <td style="min-width:110px"><div class="xs muted" style="margin-bottom:3px">${t.checklist[0]}/${t.checklist[1]}</div>${prog(t.checklist[0] / t.checklist[1] * 100)}</td>
    <td>${badge(t.status)}</td></tr>`;
}

/* ============ NEW BOOKING ============ */
let BK = null;
function newBK(pkg) {
  BK = {
    sessions: [{ name: 'Gaye Holud', date: '2026-12-12', start: '16:00', end: '22:00', location: '' }],
    services: new Set(['Video Shoot', 'Photography']), addons: new Set(['Highlight reel']),
    crew: { 'Photographer': 1, 'Videographer': 1, 'Drone Operator': 0, 'Assistant / Light': 1, 'Editor': 1 },
    discount: 5, discType: '%', vat: false, advance: 50000, type: 'Wedding',
  };
  if (pkg) {
    const P = DB.packages.find(x => x.id === pkg);
    if (P) { BK.pkg = P; BK.services = new Set(['Video Shoot', 'Photography', 'Drone']); BK.addons = new Set(['Highlight reel', 'Color grading']); BK.crew = { 'Photographer': 2, 'Videographer': 2, 'Drone Operator': 1, 'Assistant / Light': 1, 'Editor': 1 }; BK.discount = 0; }
  }
}
function bkTotals() {
  const days = Math.max(1, BK.sessions.length);
  const lines = [];
  DB.services.filter(s => BK.services.has(s.name)).forEach(s => lines.push([s.name + (s.unit === 'per day' ? ` × ${days} day` : ''), s.price * (s.unit === 'per day' ? days : 1)]));
  DB.addons.filter(a => BK.addons.has(a.name)).forEach(a => lines.push([a.name, a.price]));
  const crewTot = DB.crewRates.reduce((s, r) => s + (BK.crew[r.role] || 0) * r.rate * (r.role === 'Editor' ? 1 : days), 0);
  if (crewTot) lines.push([`Crew (${Object.values(BK.crew).reduce((a, b) => a + b, 0)} people)`, crewTot]);
  let sub = lines.reduce((s, l) => s + l[1], 0);
  if (BK.pkg) { lines.length = 0; lines.push([BK.pkg.name + ' package', BK.pkg.price]); sub = BK.pkg.price; }
  const disc = BK.discType === '%' ? sub * BK.discount / 100 : +BK.discount;
  const vat = BK.vat ? (sub - disc) * .05 : 0;
  return { lines, sub, disc, vat, total: Math.round(sub - disc + vat) };
}
function bkSummary() {
  const t = bkTotals();
  return `<div class="summary-hero"><img src="assets/logo-mark.png" alt=""><div class="muted small strong">Total budget</div><div class="big num">${tk(t.total)}</div>
      <div class="muted small">${BK.sessions.length} session${BK.sessions.length > 1 ? 's' : ''} · ${BK.services.size} services · ${BK.addons.size} add-ons</div></div>
    <div class="card-b">
      ${t.lines.map(l => `<div class="ln"><span class="muted">${l[0]}</span><span class="num strong">${tk(l[1])}</span></div>`).join('')}
      <div class="ln" style="border-top:1px solid var(--line-2);margin-top:6px;padding-top:10px"><span>Subtotal</span><span class="num strong">${tk(t.sub)}</span></div>
      ${t.disc ? `<div class="ln"><span class="muted">Discount ${BK.discType === '%' ? '(' + BK.discount + '%)' : ''}</span><span class="num" style="color:var(--green)">− ${tk(t.disc)}</span></div>` : ''}
      ${t.vat ? `<div class="ln"><span class="muted">VAT 5%</span><span class="num">${tk(t.vat)}</span></div>` : ''}
      <div class="ln tot"><span>Total</span><span class="num">${tk(t.total)}</span></div>
      <div class="ln"><span class="muted">Advance now</span><span class="num strong" style="color:var(--sage-600)">${tk(BK.advance)}</span></div>
      <div class="ln"><span class="muted">Remaining due</span><span class="num strong">${tk(Math.max(0, t.total - BK.advance))}</span></div>
    </div>`;
}
const sessionHTML = (s, i) => `<div class="session">
  <div class="sh"><b><span class="badge b-sage plain">Session ${i + 1}</span></b>${BK.sessions.length > 1 ? `<button type="button" class="btn sm ghost danger" data-act="bk-del-session" data-i="${i}">${ic('trash')} Remove</button>` : ''}</div>
  <div class="form-grid g3">
    <div class="field"><label>Session name</label><input class="input" value="${esc(s.name)}" placeholder="e.g. Biye" data-bk="name" data-i="${i}"></div>
    <div class="field"><label>Date</label><input class="input" type="date" value="${s.date}" data-bk="date" data-i="${i}"></div>
    <div class="field"><label>Time</label><div class="row" style="gap:6px"><input class="input" type="time" value="${s.start}" data-bk="start" data-i="${i}"><span class="faint">–</span><input class="input" type="time" value="${s.end}" data-bk="end" data-i="${i}"></div></div>
    <div class="field full"><label>Location (Google Maps link or address)</label><div class="input-ico">${ic('pin')}<input class="input" value="${esc(s.location)}" placeholder="Paste Google Maps link…" data-bk="location" data-i="${i}"></div></div>
  </div></div>`;

PAGES.booking_new = (parts, q) => {
  newBK(q.pkg);
  const steps = ['Client', 'Project info', 'Schedule', 'Main service', 'Add-ons', 'Crew', 'Team', 'Equipment', 'Deliverables', 'Pricing'];
  const sec = (n, title, sub, inner, act = '') => `<div class="card form-sec" id="sec-${n}"><div class="card-h"><div><h3><span class="n">${n}</span>${title}</h3>${sub ? `<div class="sub" style="margin-left:36px">${sub}</div>` : ''}</div>${act}</div><div class="card-b">${inner}</div></div>`;
  const roleSlots = [['Videographer', 'Videographer'], ['Photographer', 'Photographer'], ['Drone Operator', 'Drone Operator'], ['Editor', 'Editor']];
  return `
  ${pageHead(BK.pkg ? `New Booking · ${BK.pkg.name}` : 'New Booking', 'Create a booking with sessions, services, crew and pricing. Booking ID is generated automatically.',
    `<a class="btn" href="#/projects">Cancel</a><button class="btn" data-act="toast" data-msg="Draft saved">Save draft</button><button class="btn primary" data-act="bk-save">${ic('check')} Create booking</button>`,
    [['Projects', '#/projects'], ['New booking']])}
  <div class="grid booking-layout" style="grid-template-columns:200px minmax(0,1fr) 330px;align-items:start">
    <div class="stepper-col"><div class="stepper">${steps.map((s, i) => `<a href="javascript:void 0" data-act="bk-jump" data-n="${i + 1}" class="${i < 2 ? 'done' : ''}"><span class="n">${i < 2 ? ic('check') : i + 1}</span>${s}</a>`).join('')}</div></div>
    <div class="col" style="gap:18px">
      ${sec(1, 'Client', 'Search an existing client or create one right here', `
        <div class="row" style="gap:10px"><div class="input-ico grow">${ic('search')}<input class="input" value="Farhan Ahmed — 01611-223344" list="client-list"></div><button type="button" class="btn" data-act="new-client">${ic('plus')} New Client</button></div>
        <datalist id="client-list">${DB.clients.map(c => `<option value="${c.name} — ${c.phone}">`).join('')}</datalist>
        <div class="row" style="margin-top:12px;padding:12px;border-radius:12px;background:var(--surface-2);border:1px solid var(--line)">${av('Farhan Ahmed')}<div class="grow"><div class="strong">Farhan Ahmed <span class="tag">VIP</span></div><div class="muted small">Individual · Referral · 1 previous booking · ${tk(160000)} due</div></div><span class="badge b-amber">Has due</span></div>`)}
      ${sec(2, 'Project info', '', `<div class="form-grid">
        <div class="field"><label>Project title</label><input class="input" value="Farhan & Mithila — Reception Add-on"></div>
        <div class="field"><label>Booking ID</label><input class="input" value="SP-2026-0047" disabled style="background:var(--surface-2);font-weight:700"><span class="hint">Auto-generated</span></div>
        <div class="field"><label>Event type</label><select class="select">${['Wedding', 'Corporate', 'Product', 'Music Video', 'Birthday', 'Real Estate', 'Others'].map(t => `<option>${t}</option>`).join('')}</select></div>
        <div class="field"><label>Reference link</label><input class="input" placeholder="Instagram / Pinterest / YouTube reference"></div>
        <div class="field full"><label>Notes / brief</label><textarea class="input" placeholder="What does the client want? Mood, must-have shots, special requests…">Cinematic, warm tones. Must capture family portraits after Biye. Bride's side prefers candid photos.</textarea></div></div>`)}
      ${sec(3, 'Schedule', 'A booking can have multiple days and sessions — each with its own time, place and team', `<div id="bk-sessions">${BK.sessions.map(sessionHTML).join('')}</div>
        <button type="button" class="btn" style="margin-top:12px;border-style:dashed;width:100%" data-act="bk-add-session">${ic('plus')} Add Session</button>`)}
      ${sec(4, 'Main service', 'Select one or more — managed in Settings', `<div class="svc-grid">${DB.services.map(s => `<div class="svc ${BK.services.has(s.name) ? 'on' : ''}" data-act="bk-svc" data-n="${s.name}"><span class="si">${ic(s.icon)}</span><div><div class="nm">${s.name}</div><div class="pr">${tk(s.price)} ${s.unit}</div></div></div>`).join('')}</div>`)}
      ${sec(5, 'Add-on services', 'Price fills in automatically — edit anytime', `<div class="row wrap" style="gap:8px">${DB.addons.map(a => `<span class="chip ${BK.addons.has(a.name) ? 'on' : ''}" data-act="bk-addon" data-n="${a.name}">${BK.addons.has(a.name) ? ic('check') : ic('plus')}${a.name}<span class="px">${tkShort(a.price)}</span></span>`).join('')}</div>`)}
      ${sec(6, 'Crew requirement', 'Per-head rate × days — total calculated automatically', `
        <div class="crew-row xs faint strong" style="text-transform:uppercase;letter-spacing:.08em;padding-top:0"><span>Role</span><span>Count</span><span>Rate</span><span class="right">Subtotal</span></div>
        ${DB.crewRates.map(r => `<div class="crew-row"><span class="strong">${r.role}</span><span class="stepnum"><button type="button" data-act="bk-crew" data-r="${r.role}" data-d="-1">−</button><span id="crew-${r.role.replace(/\W/g, '')}">${BK.crew[r.role]}</span><button type="button" data-act="bk-crew" data-r="${r.role}" data-d="1">+</button></span><span class="muted small">${tk(r.rate)}/${r.role === 'Editor' ? 'project' : 'day'}</span><span class="right num strong" id="crewt-${r.role.replace(/\W/g, '')}">${tk(BK.crew[r.role] * r.rate * (r.role === 'Editor' ? 1 : BK.sessions.length))}</span></div>`).join('')}`)}
      ${sec(7, 'Team assignment', 'Only members with the matching skill appear in each slot', `<div class="form-grid">
        ${roleSlots.map(([role]) => `<div class="field"><label>${role}</label><select class="select">${DB.team.filter(t => t.roles.includes(role)).map(t => `<option>${t.name}${t.id === 't9' ? ' — on leave' : ''}</option>`).join('')}</select></div>`).join('')}
        <div class="full warn">${ic('alert')}<div><b>Sabbir Rahman</b> is already booked on 12 Dec, 3–9 PM (Startup Summit recce). You can still assign — the conflict will show in the calendar.</div></div></div>`)}
      ${sec(8, 'Equipment', 'Optional — reserve gear for this project', `<div class="row wrap" style="gap:8px">${DB.equipment.slice(0, 10).map((e, i) => `<span class="chip ${i < 3 || i === 5 ? 'on' : ''}" data-act="toggle">${ic(eqIcon(e.cat))}${e.name}</span>`).join('')}</div>`)}
      ${sec(9, 'Deliverables & deadlines', '', `<div class="form-grid">
        <div class="field full"><label>What will be delivered</label><textarea class="input" style="min-height:70px">1 cinematic highlight (4–5 min)\n300 edited photos\nFull ceremony film</textarea></div>
        <div class="field"><label>Editing deadline</label><input class="input" type="date" value="2026-12-28"></div>
        <div class="field"><label>Final delivery date</label><input class="input" type="date" value="2027-01-05"></div></div>`)}
      ${sec(10, 'Pricing & advance', 'Discount, VAT and the initial payment', `<div class="form-grid">
        <div class="field"><label>Discount</label><div class="row" style="gap:6px"><input class="input" type="number" value="${BK.discount}" data-bkp="discount"><div class="seg"><button type="button" class="${BK.discType === '%' ? 'on' : ''}" data-act="bk-disc" data-t="%">%</button><button type="button" class="${BK.discType === '৳' ? 'on' : ''}" data-act="bk-disc" data-t="৳">৳</button></div></div></div>
        <div class="field"><label>VAT / Tax</label><div class="row" style="height:40px"><span class="toggle ${BK.vat ? 'on' : ''}" data-act="bk-vat"></span><span class="muted small">Add 5% VAT</span></div></div>
        <div class="field"><label>Advance payment received</label><input class="input" type="number" value="${BK.advance}" data-bkp="advance"></div>
        <div class="field"><label>Method</label><select class="select">${['bKash', 'Nagad', 'Rocket', 'Cash', 'Bank Transfer', 'Card', 'Cheque'].map(m => `<option>${m}</option>`).join('')}</select></div>
        <div class="field full"><label>Installment plan</label><div class="row wrap" style="gap:8px"><span class="chip on" data-act="toggle">50% advance</span><span class="chip on" data-act="toggle">30% on shoot day</span><span class="chip on" data-act="toggle">20% before delivery</span><span class="chip" data-act="toggle">${ic('plus')} Custom</span></div></div></div>`)}
    </div>
    <div class="summary"><div class="card" id="bk-summary" style="overflow:hidden">${bkSummary()}</div>
      <div class="col" style="gap:8px;margin-top:14px"><button class="btn primary block" data-act="bk-save">${ic('check')} Create booking</button><button class="btn block" data-act="bk-quote">${ic('file')} Create & send quotation</button></div></div>
  </div>`;
};
const bkRefresh = () => { const s = $('#bk-summary'); if (s) s.innerHTML = bkSummary(); DB.crewRates.forEach(r => { const k = r.role.replace(/\W/g, ''); const a = $('#crew-' + k), b = $('#crewt-' + k); if (a) a.textContent = BK.crew[r.role]; if (b) b.textContent = tk(BK.crew[r.role] * r.rate * (r.role === 'Editor' ? 1 : BK.sessions.length)); }); };
ACT['bk-svc'] = el => { const n = el.dataset.n; BK.services.has(n) ? BK.services.delete(n) : BK.services.add(n); el.classList.toggle('on'); bkRefresh(); };
ACT['bk-addon'] = el => { const n = el.dataset.n, on = !BK.addons.has(n); on ? BK.addons.add(n) : BK.addons.delete(n); el.classList.toggle('on', on); el.firstElementChild.outerHTML = ic(on ? 'check' : 'plus'); bkRefresh(); };
ACT['bk-crew'] = el => { const r = el.dataset.r; BK.crew[r] = Math.max(0, BK.crew[r] + +el.dataset.d); bkRefresh(); };
ACT['bk-add-session'] = () => { const last = BK.sessions[BK.sessions.length - 1]; BK.sessions.push({ name: ['Biye', 'Reception', 'Day 2', 'Day 3'][BK.sessions.length - 1] || 'Session', date: addDays(last.date, 2), start: '18:00', end: '23:00', location: '' }); $('#bk-sessions').innerHTML = BK.sessions.map(sessionHTML).join(''); bkRefresh(); };
ACT['bk-del-session'] = el => { BK.sessions.splice(+el.dataset.i, 1); $('#bk-sessions').innerHTML = BK.sessions.map(sessionHTML).join(''); bkRefresh(); };
ACT['bk-disc'] = el => { BK.discType = el.dataset.t; $$('[data-act=bk-disc]').forEach(b => b.classList.toggle('on', b === el)); bkRefresh(); };
ACT['bk-vat'] = el => { BK.vat = !BK.vat; el.classList.toggle('on', BK.vat); bkRefresh(); };
ACT['bk-jump'] = el => { $('#sec-' + el.dataset.n)?.scrollIntoView({ behavior: 'smooth' }); $$('.stepper a').forEach((a, i) => { a.classList.toggle('done', i < +el.dataset.n); }); };
ACT['bk-save'] = () => { toast('Booking SP-2026-0047 created · advance receipt generated'); setTimeout(() => location.hash = '#/projects/SP-2026-0046', 600); };
ACT['bk-quote'] = () => { toast('Quotation Q-2026-0063 created'); setTimeout(() => location.hash = '#/invoices/quote-SP-2026-0046', 600); };
document.addEventListener('input', e => {
  const el = e.target;
  if (el.dataset.bk && BK) { BK.sessions[+el.dataset.i][el.dataset.bk] = el.value; }
  if (el.dataset.bkp && BK) { BK[el.dataset.bkp] = +el.value || 0; bkRefresh(); }
});
