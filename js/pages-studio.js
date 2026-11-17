/* ============ TEAM ============ */
PAGES.team = (parts, q) => {
  if (parts[1]) return PAGES.member_detail(parts, q);
  const f = q.f || 'all';
  const list = DB.team.filter(t => f === 'all' || (f === 'perm' ? t.type === 'Permanent' : t.type === 'Freelancer'));
  return `
  ${pageHead('Team', `${DB.team.filter(t => t.status === 'Active').length} active members · ${DB.team.filter(t => t.type === 'Freelancer').length} freelancers`,
    `<div class="seg">${[['all', 'All'], ['perm', 'Permanent'], ['free', 'Freelancer']].map(([k, l]) => `<a href="#/team?f=${k}" class="${f === k ? 'on' : ''}">${l}</a>`).join('')}</div><button class="btn primary" data-act="new-member">${ic('plus')} Add Member</button>`)}
  <div class="grid g-4">
    ${list.map(t => `<div class="card team-card" data-href="/team/${t.id}">
      <span class="status">${badge(t.status)}</span>
      ${av(t.name, 'lg')}
      <div class="strong" style="font-size:15px;margin-top:8px">${t.name}</div>
      <div class="muted small">${t.type} · ${tk(t.rate)}/${t.rateUnit}</div>
      <div class="roles">${t.roles.map(r => `<span class="tag">${r}</span>`).join('')}</div>
      <div class="stats"><div><b>${t.done}</b><span>Projects</span></div><div><b>${t.onTime}%</b><span>On time</span></div><div><b>${tkShort(t.earned - t.paid)}</b><span>Balance</span></div></div>
      <div class="row" style="margin-top:12px;gap:6px;width:100%"><a class="btn sm grow" href="tel:${t.phone}">${ic('phone')}</a><a class="btn sm wa grow" href="${waLink(t.phone)}" target="_blank">${ic('wa')} WhatsApp</a></div>
    </div>`).join('')}
  </div>`;
};
PAGES.member_detail = (parts, q) => {
  const t = member(parts[1]); if (!t.id) return PAGES.notfound();
  const tab = q.tab || 'overview';
  const evs = allEvents().filter(e => (e.team || []).includes(t.id) && e.date >= TODAY && e.kind !== 'leave').slice(0, 6);
  const tasks = DB.tasks.filter(x => x.who === t.id);
  const pays = DB.payouts.filter(x => x.who === t.id);
  const projs = DB.projects.filter(p => p.sessions.some(s => s.team.includes(t.id)));
  const base = `#/team/${t.id}`;
  let body = '';
  if (tab === 'overview') body = `<div class="grid g-main"><div class="col" style="gap:18px">
      <div class="card"><div class="card-h"><h3>Upcoming schedule</h3><a class="btn sm" href="#/calendar?m=${t.id}">Calendar</a></div><div class="card-b flush" style="padding-bottom:0;margin-top:10px">${evs.map(e => upcomingRow(e)).join('') || '<div class="empty">No upcoming shoots</div>'}</div></div>
      <div class="card"><div class="card-h"><h3>Assigned tasks</h3></div><div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><thead><tr><th>Task</th><th>Assignee</th><th>Due</th><th>Priority</th><th>Checklist</th><th>Status</th></tr></thead><tbody>${tasks.map(taskRow).join('') || '<tr><td colspan="6"><div class="empty">No tasks</div></td></tr>'}</tbody></table></div></div></div>
    <div class="col" style="gap:18px">
      <div class="card"><div class="card-h"><h3>Details</h3><button class="btn sm" data-act="new-member" data-id="${t.id}">${ic('edit')} Edit</button></div><div class="card-b"><dl class="kv" style="grid-template-columns:110px 1fr">
        <dt>Phone</dt><dd>${t.phone}</dd><dt>Email</dt><dd class="truncate">${t.email}</dd><dt>Joined</dt><dd>${fd(t.joined)}</dd><dt>Employment</dt><dd>${t.type}</dd><dt>Default rate</dt><dd>${tk(t.rate)} / ${t.rateUnit}</dd><dt>NID</dt><dd class="muted">•••• •••• 4471</dd><dt>Emergency</dt><dd>01700-112233 (Father)</dd></dl></div></div>
      <div class="card"><div class="card-h"><h3>Login access</h3></div><div class="card-b col" style="gap:12px">
        <div class="row between"><span class="small strong">Account active</span><span class="toggle ${t.status !== 'Inactive' ? 'on' : ''}" data-act="toggle"></span></div>
        <div class="row between"><span class="small strong">Show client contact</span><span class="toggle on" data-act="toggle"></span></div>
        <div class="row between"><span class="small strong">Show payouts in portal</span><span class="toggle on" data-act="toggle"></span></div>
        <button class="btn sm" data-act="toast" data-msg="Password reset link sent to ${t.email}">${ic('lock')} Reset password</button></div></div>
      <div class="card"><div class="card-h"><h3>Leave / unavailable</h3><button class="btn sm" data-act="toast" data-msg="Leave added to calendar">${ic('plus')}</button></div><div class="card-b small">${t.status === 'On Leave' ? '<div class="warn">' + ic('calendar') + '<div>On leave 17 – 24 Nov (family event)</div></div>' : '<span class="muted">No leave scheduled.</span>'}</div></div>
    </div></div>`;
  if (tab === 'projects') body = `<div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Project</th><th>Role</th><th>Date</th><th>Status</th></tr></thead><tbody>${projs.map(p => `<tr class="click" data-href="/projects/${p.id}"><td class="strong">${esc(p.title)}</td><td>${t.roles[0]}</td><td>${fd(p.sessions[0].date)}</td><td>${badge(p.status)}</td></tr>`).join('')}</tbody></table></div></div>`;
  if (tab === 'payouts') body = `<div class="grid g-4 keep2" style="margin-bottom:18px">${statCard('Total earned', tkShort(t.earned), 'trend')}${statCard('Total paid', tkShort(t.paid), 'wallet')}${statCard('Balance', tk(t.earned - t.paid), 'receipt')}${statCard('Advance', tk(t.advance), 'refresh')}</div>
    <div class="card"><div class="card-h"><h3>Payout history</h3><button class="btn sm primary" data-act="add-payout" data-who="${t.id}">${ic('plus')} Add Payout</button></div><div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><thead><tr><th>Slip</th><th>Date</th><th>Type</th><th>Method</th><th class="r">Net</th><th></th></tr></thead><tbody>
    ${pays.map(x => `<tr><td class="strong">${x.id}</td><td>${fd(x.date)}</td><td>${x.type}</td><td>${x.method}</td><td class="r num strong">${tk(x.amount + x.bonus - x.deduction)}</td><td class="r"><button class="btn sm" data-act="slip" data-id="${x.id}">${ic('download')} Slip</button></td></tr>`).join('') || '<tr><td colspan="6"><div class="empty">No payouts yet</div></td></tr>'}</tbody></table></div></div>`;

  return `
  <div class="crumbs"><a href="#/team">Team</a>${ic('right')}<span>${t.name}</span></div>
  <div class="card" style="margin-bottom:18px"><div class="profile-hero"><div class="bg"><img src="assets/logo-mark.png" alt=""></div>
    ${av(t.name, 'xl')}
    <div class="info"><h1 style="font-size:24px">${t.name}</h1><div class="row wrap" style="margin-top:6px">${t.roles.map(r => `<span class="tag">${r}</span>`).join('')}${badge(t.status)}<span class="muted small">${t.type} · since ${fd(t.joined)}</span></div></div>
    <div class="acts"><a class="btn" href="tel:${t.phone}">${ic('phone')} Call</a><a class="btn wa" href="${waLink(t.phone)}" target="_blank">${ic('wa')} WhatsApp</a><button class="btn primary" data-act="new-task" data-who="${t.id}">${ic('plus')} Assign task</button></div></div>
    <div class="money-strip ms4"><div><div class="l">Projects done</div><div class="v">${t.done}</div></div><div><div class="l">On-time completion</div><div class="v">${t.onTime}%</div></div><div><div class="l">Open tasks</div><div class="v">${tasks.filter(x => x.status !== 'Completed').length}</div></div><div><div class="l">Payable balance</div><div class="v num">${tk(t.earned - t.paid)}</div></div></div></div>
  ${tabs(base, [['overview', 'Overview'], ['projects', 'Project history', projs.length], ['payouts', 'Payouts', pays.length]], tab)}
  ${body}`;
};
ACT['new-member'] = el => {
  const t = el.dataset.id ? member(el.dataset.id) : {};
  openModal(modalHead(t.id ? 'Edit member' : 'Add team member', 'Creates a login for the team portal') + `<form data-submit="close-toast" data-msg="Member saved · login invite sent"><div class="modal-b"><div class="form-grid">
    <div class="field"><label>Full name</label><input class="input" value="${t.name || ''}" required></div><div class="field"><label>Phone</label><input class="input" value="${t.phone || ''}"></div>
    <div class="field"><label>Email (login)</label><input class="input" value="${t.email || ''}"></div><div class="field"><label>Joining date</label><input class="input" type="date" value="${t.joined || TODAY}"></div>
    <div class="field full"><label>Roles / skills</label><div class="row wrap" style="gap:6px">${['Photographer', 'Videographer', 'Drone Operator', 'Editor', 'Colorist', 'Graphics Designer', 'Assistant', 'Manager'].map(r => `<span class="chip ${(t.roles || []).includes(r) ? 'on' : ''}" data-act="toggle">${r}</span>`).join('')}</div></div>
    <div class="field"><label>Employment</label><select class="select"><option ${t.type === 'Permanent' ? 'selected' : ''}>Permanent (monthly salary)</option><option ${t.type === 'Freelancer' ? 'selected' : ''}>Freelancer (per project)</option></select></div>
    <div class="field"><label>Default rate</label><div class="row" style="gap:6px"><input class="input" type="number" value="${t.rate || ''}"><select class="select" style="width:130px"><option>/ month</option><option>/ day</option><option>/ project</option><option>/ hour</option></select></div></div>
    <div class="field"><label>Emergency contact</label><input class="input"></div><div class="field"><label>NID (optional)</label><input class="input"></div>
    <div class="field full"><div class="upload">${ic('upload')}Profile photo</div></div></div></div>
    <div class="modal-f"><button type="button" class="btn" data-act="close">Cancel</button><button class="btn primary">${ic('check')} Save & send invite</button></div></form>`, 'lg');
};
ACT['add-payout'] = el => openModal(modalHead('Add Payout', 'A payout slip is generated for the member') + `<form data-submit="save-payout"><div class="modal-b"><div class="form-grid">
  <div class="field"><label>Member</label><select class="select" name="who">${DB.team.map(t => `<option value="${t.id}" ${el.dataset.who === t.id ? 'selected' : ''}>${t.name}</option>`).join('')}</select></div>
  <div class="field"><label>Type</label><select class="select"><option>Per project</option><option>Salary</option><option>Advance</option></select></div>
  <div class="field full"><label>Linked project(s)</label><select class="select">${projOptions('SP-2026-0041')}</select></div>
  <div class="field"><label>Amount</label><input class="input" name="amount" type="number" value="${el.dataset.amt || 12000}"></div><div class="field"><label>Method</label><select class="select" name="method"><option>bKash</option><option>Nagad</option><option>Bank Transfer</option><option>Cash</option></select></div>
  <div class="field"><label>Bonus</label><input class="input" name="bonus" type="number" value="0"></div><div class="field"><label>Deduction / advance adj.</label><input class="input" name="ded" type="number" value="0"></div>
  <div class="field full"><label>Note</label><input class="input"></div></div></div>
  <div class="modal-f"><button type="button" class="btn" data-act="close">Cancel</button><button class="btn primary">${ic('check')} Save payout</button></div></form>`);
ACT['save-payout'] = f => { const d = Object.fromEntries(new FormData(f)); const id = 'PO-0' + (97 + DB.payouts.length - 9); DB.payouts.unshift({ id, who: d.who, date: TODAY, amount: +d.amount, type: 'Per project', pids: [], bonus: +d.bonus, deduction: +d.ded, method: d.method }); closeModal(); render(); toast(`Payout ${id} saved`); setTimeout(() => ACT.slip({ dataset: { id } }), 400); };
ACT.slip = el => {
  const x = DB.payouts.find(p => p.id === el.dataset.id), m = member(x.who), net = x.amount + x.bonus - x.deduction;
  openModal(`<div class="modal-b" style="padding:0"><div class="paper" style="box-shadow:none;border:0;border-radius:20px;padding:30px">
    <div class="row between" style="align-items:flex-start"><div><img src="assets/logo-mark-dark.png" style="width:80px" alt=""><div style="font-weight:800;margin-top:6px">${DB.company.name}</div></div>
      <div style="text-align:right"><div class="doc-t" style="font-size:24px">${x.type === 'Salary' ? 'Salary Slip' : 'Payment Voucher'}</div><div style="font-size:12.5px;color:#6E8084">${x.id} · ${fd(x.date)}</div></div></div>
    <div style="margin:20px 0 14px;display:flex;gap:12px;align-items:center">${av(m.name)}<div><b>${m.name}</b><div style="font-size:12px;color:#6E8084">${m.roles.join(', ')} · ${m.type}</div></div></div>
    <table><thead><tr><th>Description</th><th style="text-align:right">Amount</th></tr></thead><tbody>
      <tr><td>${x.type === 'Salary' ? 'Basic salary — ' + MONTHS[D(x.date).getMonth()] : 'Project fee — ' + (x.pids.join(', ') || 'project')}</td><td style="text-align:right">${tk(x.amount)}</td></tr>
      <tr><td>Bonus</td><td style="text-align:right;color:#3C8A5A">+ ${tk(x.bonus)}</td></tr><tr><td>Deduction / advance adjustment</td><td style="text-align:right;color:#C0473B">− ${tk(x.deduction)}</td></tr></tbody></table>
    <div class="tot"><div class="ln g"><span>Net paid</span><span>${tk(net)}</span></div></div>
    <div class="words">Taka ${numberToWords(net)} Only · via ${x.method}</div>
    <div class="row between" style="margin-top:26px;align-items:flex-end"><div class="sign"><div class="s" style="font-size:16px">${m.name.split(' ')[0]}</div>Received by</div><div class="sign"><div class="s">Shoptik</div>Authorized</div></div>
  </div></div><div class="modal-f no-print"><button class="btn" data-act="close">Close</button><button class="btn primary" data-act="print">${ic('download')} Download PDF</button></div>`);
};

/* ============ TASKS ============ */
const TASK_COLS = [['To Do', 'var(--faint)'], ['In Progress', 'var(--blue)'], ['In Review', 'var(--violet)'], ['Revision', 'var(--amber)'], ['Completed', 'var(--green)']];
function kcard(t, mine = false) {
  const m = member(t.who), p = project(t.pid), od = t.status !== 'Completed' && t.due < TODAY;
  return `<div class="kcard" draggable="true" data-task="${t.id}" ${od ? 'style="border-color:color-mix(in srgb,var(--red) 45%,var(--line))"' : ''}>
    <div class="row between"><span class="pj truncate">${esc(p.title || '')}</span><span class="prio ${t.prio}">${t.prio}</span></div>
    <div class="tt">${esc(t.title)}</div>
    <div style="margin-bottom:10px">${prog(t.checklist[0] / t.checklist[1] * 100)}</div>
    <div class="ft"><span class="row" style="gap:6px;${od ? 'color:var(--red);font-weight:800' : 'color:var(--muted)'}">${ic(od ? 'alert' : 'clock')}${fdShort(t.due)}${od ? ' · overdue' : ''}</span>
      <span class="row" style="gap:8px"><span class="faint row" style="gap:3px">${ic('msg')}${(t.id.length * 3) % 5}</span>${mine ? '' : av(m.name, 'sm')}</span></div>
  </div>`;
}
PAGES.tasks = (parts, q) => {
  if (q.view) { S.taskView = q.view; store.set('taskView', q.view); }
  const v = S.taskView, who = q.who || '';
  const list = DB.tasks.filter(t => !who || t.who === who);
  let body;
  if (v === 'kanban') body = `<div class="kanban">${TASK_COLS.map(([c, col]) => { const ts = list.filter(t => t.status === c); return `<div class="kcol" data-col="${c}"><div class="kcol-h"><span class="t"><i style="background:${col}"></i>${c}</span><span class="badge plain">${ts.length}</span></div>${ts.map(t => kcard(t)).join('')}</div>`; }).join('')}</div>`;
  else if (v === 'list') body = `<div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Task</th><th>Assignee</th><th>Due</th><th>Priority</th><th>Checklist</th><th>Status</th></tr></thead><tbody>${list.map(taskRow).join('')}</tbody></table></div></div>`;
  else {
    const start = '2026-11-05', N = 30, dayW = 100 / N;
    const groups = [...new Set(list.map(t => t.pid))];
    body = `<div class="card tbl-wrap"><div class="gantt">
      <div class="gantt-h"><div class="lbl" style="padding:8px 16px;font-size:11px;font-weight:800;color:var(--faint);text-transform:uppercase;letter-spacing:.08em">Task</div><div class="gantt-days" style="grid-template-columns:repeat(${N},1fr)">${Array.from({ length: N }, (_, i) => { const iso = addDays(start, i); return `<div class="${iso === TODAY ? 'today' : ''}">${D(iso).getDate()}</div>`; }).join('')}</div></div>
      ${groups.map(pid => `<div class="gantt-group">${esc(project(pid).title)}</div>${list.filter(t => t.pid === pid).map(t => {
        const s = Math.max(0, daysBetween(start, t.start)), e = Math.min(N, daysBetween(start, t.due) + 1);
        const col = { 'Completed': 'var(--sage-300)', 'In Progress': '#A9C9DE', 'In Review': '#C9C0E6', 'Revision': '#E7D49A', 'To Do': 'var(--line)' }[t.status];
        const od = t.status !== 'Completed' && t.due < TODAY;
        return `<div class="gantt-r"><div class="lbl"><div class="strong small truncate">${esc(t.title)}</div><div class="faint xs">${member(t.who).name}</div></div>
          <div class="lane" style="background-size:${dayW}% 100%"><div class="today-line" style="left:${(daysBetween(start, TODAY) + .5) * dayW}%"></div>
          <div class="gantt-bar" style="left:${s * dayW}%;width:${Math.max(1, e - s) * dayW}%;background:${col};${od ? 'box-shadow:inset 0 0 0 2px var(--red)' : ''}">${t.checklist[0]}/${t.checklist[1]}</div></div></div>`;
      }).join('')}`).join('')}
    </div></div>`;
  }
  const od = DB.tasks.filter(t => t.status !== 'Completed' && t.due < TODAY).length;
  return `
  ${pageHead('Tasks', `${DB.tasks.filter(t => t.status !== 'Completed').length} open · <span style="color:var(--red);font-weight:700">${od} overdue</span> · drag cards to change status`,
    `<select class="select sm" style="height:40px" data-change="task-who"><option value="">Everyone</option>${DB.team.map(t => `<option value="${t.id}" ${who === t.id ? 'selected' : ''}>${t.name}</option>`).join('')}</select>
     <div class="seg"><a href="#/tasks?view=kanban" class="${v === 'kanban' ? 'on' : ''}">${ic('kanban')}Board</a><a href="#/tasks?view=list" class="${v === 'list' ? 'on' : ''}">${ic('list')}List</a><a href="#/tasks?view=timeline" class="${v === 'timeline' ? 'on' : ''}">${ic('gantt')}Timeline</a></div>
     <button class="btn" data-act="task-template">${ic('layers')} Apply template</button><button class="btn primary" data-act="new-task">${ic('plus')} New Task</button>`)}
  ${body}`;
};
ACT['chg-task-who'] = el => { location.hash = '#/tasks' + (el.value ? '?who=' + el.value : ''); };
function bindKanban(onDrop) {
  let dragId = null;
  $$('.kcard').forEach(c => {
    c.addEventListener('dragstart', e => { dragId = c.dataset.task; c.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; });
    c.addEventListener('dragend', () => c.classList.remove('dragging'));
    c.addEventListener('click', () => ACT['task-open']({ dataset: { id: c.dataset.task } }));
  });
  $$('.kcol').forEach(col => {
    col.addEventListener('dragover', e => { e.preventDefault(); col.classList.add('over'); });
    col.addEventListener('dragleave', () => col.classList.remove('over'));
    col.addEventListener('drop', e => { e.preventDefault(); col.classList.remove('over'); const t = DB.tasks.find(x => x.id === dragId); if (t && t.status !== col.dataset.col) { t.status = col.dataset.col; if (t.status === 'Completed') t.checklist[0] = t.checklist[1]; onDrop(t); } });
  });
}
AFTER.tasks = () => bindKanban(t => { render(); toast(`“${t.title}” → ${t.status}`); });
ACT['task-open'] = el => {
  const t = DB.tasks.find(x => x.id === el.dataset.id), m = member(t.who), p = project(t.pid);
  const items = ['Collect files from shoot drives', 'Rough cut / selection', 'Apply LUT & grade', 'Export preview', 'Client feedback round', 'Final export'].slice(0, t.checklist[1]);
  openModal(modalHead(esc(t.title), `${esc(p.title)} · ${p.id}`) + `<div class="modal-b">
    <div class="row wrap" style="margin-bottom:16px">${badge(t.status)}<span class="prio ${t.prio}">${t.prio}</span><span class="muted small">${ic('calendar')} ${fd(t.start)} → ${fd(t.due)}</span></div>
    <div class="row" style="margin-bottom:16px">${av(m.name)}<div><div class="strong">${m.name}</div><div class="muted xs">${t.role}</div></div></div>
    <div class="field" style="margin-bottom:16px"><label>Status</label><div class="seg" style="flex-wrap:wrap">${TASK_COLS.map(([c]) => `<button class="${t.status === c ? 'on' : ''}" data-act="task-status" data-id="${t.id}" data-s="${c}">${c}</button>`).join('')}</div></div>
    <div class="strong small" style="margin-bottom:6px">Checklist · ${t.checklist[0]}/${t.checklist[1]}</div>
    ${items.map((it, i) => `<div class="row" style="padding:6px 0"><span class="check ${i < t.checklist[0] ? 'on' : ''}" data-act="check">${i < t.checklist[0] ? ic('check') : ''}</span><span class="${i < t.checklist[0] ? 'muted' : ''}">${it}</span></div>`).join('')}
    <div class="field" style="margin-top:16px"><label>Delivery / preview link</label><div class="input-ico">${ic('link')}<input class="input" placeholder="https://drive.google.com/…"></div></div>
    <div class="strong small" style="margin:16px 0 8px">Comments</div>
    <div class="act-item" style="padding:6px 0">${av('Owner', 'sm')}<div><div class="txt"><b>Owner</b> Client wants warmer skin tones in the Biye part. Revision note added.</div><div class="faint xs">Yesterday, 8:12 PM</div></div></div>
    <div class="row" style="margin-top:8px"><input class="input" placeholder="Write a comment…"><button class="btn icon" data-act="toast" data-msg="Comment posted">${ic('send')}</button></div>
  </div>`);
};
ACT['task-status'] = el => { const t = DB.tasks.find(x => x.id === el.dataset.id); t.status = el.dataset.s; closeModal(); render(); toast(`Status updated → ${t.status}`); };
ACT['new-task'] = el => openModal(modalHead('New Task') + `<form data-submit="save-task"><div class="modal-b"><div class="form-grid">
  <div class="field full"><label>Title</label><input class="input" name="title" required placeholder="e.g. Highlight video edit"></div>
  <div class="field full"><label>Project</label><select class="select" name="pid">${projOptions('SP-2026-0041')}</select></div>
  <div class="field"><label>Assignee</label><select class="select" name="who">${DB.team.map(t => `<option value="${t.id}" ${el.dataset.who === t.id ? 'selected' : ''}>${t.name} — ${t.roles[0]}</option>`).join('')}</select></div>
  <div class="field"><label>Priority</label><select class="select" name="prio"><option value="high">High</option><option value="medium" selected>Medium</option><option value="low">Low</option></select></div>
  <div class="field"><label>Start date</label><input class="input" type="date" name="start" value="${TODAY}"></div><div class="field"><label>Due date</label><input class="input" type="date" name="due" value="${addDays(TODAY, 4)}"></div>
  <div class="field full"><label>Description</label><textarea class="input" style="min-height:60px"></textarea></div></div></div>
  <div class="modal-f"><button type="button" class="btn" data-act="close">Cancel</button><button class="btn primary">${ic('check')} Create task</button></div></form>`);
ACT['save-task'] = f => { const d = Object.fromEntries(new FormData(f)); DB.tasks.unshift({ id: 'k' + (DB.tasks.length + 1), title: d.title, pid: d.pid, who: d.who, role: member(d.who).roles[0], start: d.start, due: d.due, prio: d.prio, status: 'To Do', checklist: [0, 3] }); closeModal(); render(); toast(`Task assigned to ${member(d.who).name}`); };
ACT['task-template'] = () => openModal(modalHead('Apply task template', 'Auto-creates the standard workflow for a project') + `<div class="modal-b">
  <div class="field" style="margin-bottom:14px"><label>Project</label><select class="select">${projOptions('SP-2026-0046')}</select></div>
  <div class="field" style="margin-bottom:10px"><label>Template</label><div class="seg"><button class="on" data-act="pick-seg">Wedding</button><button data-act="pick-seg">Corporate</button><button data-act="pick-seg">Music Video</button><button data-act="pick-seg">Product</button></div></div>
  ${['Shoot', 'Backup data (3-2-1)', 'Photo selection', 'Photo edit', 'Video edit', 'Color grade', 'Client review', 'Final delivery'].map((t, i) => `<div class="row" style="padding:8px 0;border-bottom:1px solid var(--line-2)"><span class="check on">${ic('check')}</span><span class="grow strong small">${t}</span><span class="faint xs">Day +${[0, 1, 3, 6, 8, 12, 14, 18][i]}</span></div>`).join('')}
  </div><div class="modal-f"><button class="btn" data-act="close">Cancel</button><button class="btn primary" data-act="toast" data-msg="8 tasks created from Wedding template">${ic('check')} Create 8 tasks</button></div>`);

/* ============ EQUIPMENT ============ */
PAGES.equipment = (parts, q) => {
  const cat = q.cat || '';
  const list = DB.equipment.filter(e => !cat || e.cat === cat);
  const cats = [...new Set(DB.equipment.map(e => e.cat))];
  return `
  ${pageHead('Equipment', 'Gear inventory, check-out/in per project, maintenance and rentals.', `<button class="btn" data-act="toast" data-msg="Maintenance log opened">${ic('refresh')} Maintenance log</button><button class="btn primary" data-act="add-equipment">${ic('plus')} Add Equipment</button>`)}
  <div class="grid g-4 keep2" style="margin-bottom:18px">
    ${statCard('Total items', DB.equipment.length, 'box', tk(DB.equipment.reduce((s, e) => s + e.price, 0)) + ' value')}
    ${statCard('Checked out', DB.equipment.filter(e => e.status === 'Checked out').length, 'ext', 'On 2 projects')}
    ${statCard('Available', DB.equipment.filter(e => e.status === 'Available').length, 'check', 'Ready to book')}
    ${statCard('In maintenance', DB.equipment.filter(e => e.status === 'Maintenance').length, 'alert', 'Aputure 600d — fan')}
  </div>
  <div class="warn" style="margin-bottom:18px">${ic('alert')}<div><b>Double booking:</b> Sony FX3 is reserved for Rafiq & Nusrat (Biye, 20 Nov 6 PM) and requested by Meghna Textiles on the same evening.</div></div>
  <div class="row wrap" style="gap:6px;margin-bottom:16px"><a class="chip ${!cat ? 'on' : ''}" href="#/equipment">All</a>${cats.map(c => `<a class="chip ${cat === c ? 'on' : ''}" href="#/equipment?cat=${c}">${ic(eqIcon(c))}${c}</a>`).join('')}</div>
  <div class="grid g-4">
    ${list.map(e => `<div class="card eq-card">
      <div class="row between"><span class="eq-ico">${ic(eqIcon(e.cat))}</span>${badge(e.status)}</div>
      <div><div class="strong" style="font-size:15px">${e.name}</div><div class="faint xs">${e.cat} · SN ${e.serial}</div></div>
      <div class="row between small"><span class="muted">Condition</span><b>${e.cond}</b></div>
      <div class="row between small"><span class="muted">Purchased</span><span>${e.bought === '—' ? 'Rented' : fd(e.bought)}</span></div>
      ${e.pid ? `<a href="#/projects/${e.pid}" class="tag" style="justify-content:center">${ic('film')} ${esc(project(e.pid).title)}</a>` : '<span class="tag" style="justify-content:center;background:transparent">In studio</span>'}
      <button class="btn sm" data-act="toast" data-msg="${e.name} ${e.status === 'Checked out' ? 'checked in' : 'checked out'}">${e.status === 'Checked out' || e.status === 'Rented' ? ic('download') + ' Check in' : ic('ext') + ' Check out'}</button>
    </div>`).join('')}
  </div>`;
};
ACT['add-equipment'] = () => openModal(modalHead('Add Equipment', 'Purchases are auto-added to Expenses') + `<form data-submit="close-toast" data-msg="Equipment added · expense entry created"><div class="modal-b"><div class="form-grid">
  <div class="field"><label>Name</label><input class="input" placeholder="e.g. Sony FX6"></div><div class="field"><label>Category</label><select class="select">${['Camera', 'Lens', 'Drone', 'Light', 'Gimbal', 'Audio', 'Storage'].map(c => `<option>${c}</option>`).join('')}</select></div>
  <div class="field"><label>Serial no.</label><input class="input"></div><div class="field"><label>Condition</label><select class="select"><option>Excellent</option><option>Good</option><option>Fair</option></select></div>
  <div class="field"><label>Purchase date</label><input class="input" type="date" value="${TODAY}"></div><div class="field"><label>Price (৳)</label><input class="input" type="number"></div>
  <div class="field full row" style="gap:10px"><span class="toggle on" data-act="toggle"></span><span class="small strong">Add to expenses as “Equipment Purchase”</span></div>
  <div class="field full row" style="gap:10px"><span class="toggle" data-act="toggle"></span><span class="small strong">This is a rented item</span></div></div></div>
  <div class="modal-f"><button type="button" class="btn" data-act="close">Cancel</button><button class="btn primary">Save</button></div></form>`);

/* ============ NOTICES ============ */
const noticeList = (forMember = false) => DB.notices.map(n => `<div class="notice ${n.prio === 'Urgent' ? 'urgent' : ''}">
  <span class="ni">${ic(n.prio === 'Urgent' ? 'alert' : 'megaphone')}</span>
  <div class="grow"><div class="row wrap between"><div class="row wrap"><b style="font-size:15px">${n.title}</b>${badge(n.prio)}${forMember && n.unreadBy.includes(S.me) ? '<span class="badge b-blue plain">New</span>' : ''}</div><span class="faint xs">${fd(n.date)}</span></div>
    <p style="margin:6px 0 0;color:var(--text-2)">${n.body}</p>
    ${forMember ? `<div class="row" style="margin-top:12px;gap:8px">${n.unreadBy.includes(S.me) ? `<button class="btn sm primary" data-act="notice-read" data-id="${n.id}">${ic('check')} Got it</button>` : `<span class="muted small row" style="gap:4px">${ic('check')} Read</span>`}<a class="btn sm" target="_blank" href="${waLink('01711000222', 'About notice: ' + n.title)}">${ic('wa')} Ask office</a></div>`
      : `<div class="read-bar"><span>To: <b>${n.to}</b></span><span>·</span>${prog(n.read / n.total * 100)}<span><b>${n.read}/${n.total}</b> read</span>${n.unreadBy.length ? `<span class="row" style="gap:4px">Not yet: ${avStack(n.unreadBy)}</span>` : ''}</div>`}
  </div></div>`).join('');
PAGES.notices = () => `
  ${pageHead('Notices', 'Announcements pop up for team members until they tap “Got it”.', `<button class="btn primary" data-act="send-notice">${ic('send')} Send Notice</button>`)}
  <div class="grid g-side"><div class="card">${noticeList()}</div>
    <div class="col" style="gap:18px"><div class="card"><div class="card-h"><h3>Read rate</h3></div><div class="card-b"><div class="donut-wrap">${donut([{ l: 'Read', v: 28, c: 'var(--sage-600)' }, { l: 'Unread', v: 4, c: '#D9A55B' }], 120, '88%', 'read')}<div class="donut-list"><div class="r"><span>Read</span><b>28</b></div><div class="r"><span>Unread</span><b>4</b></div></div></div></div></div>
    <div class="card"><div class="card-h"><h3>Member preview</h3></div><div class="card-b"><p class="muted small" style="margin:0 0 12px">This is how an urgent notice appears to team members on login.</p><button class="btn block" data-act="preview-notice">${ic('eye')} Preview popup</button></div></div></div></div>`;
ACT['send-notice'] = () => openModal(modalHead('Send Notice', 'Shows as a popup to recipients until acknowledged') + `<form data-submit="save-notice"><div class="modal-b"><div class="form-grid">
  <div class="field full"><label>Title</label><input class="input" name="title" required placeholder="e.g. Tomorrow's call time"></div>
  <div class="field full"><label>Message</label><textarea class="input" name="body" required></textarea></div>
  <div class="field"><label>Priority</label><div class="seg"><button type="button" class="on" data-act="pick-seg">Normal</button><button type="button" data-act="pick-seg">Urgent</button></div></div>
  <div class="field"><label>Recipients</label><select class="select" name="to"><option>All members</option><option>Photographers</option><option>Videographers</option><option>Editors</option><option>Specific member…</option></select></div>
  <div class="field full"><div class="upload">${ic('paperclip')}Attachment (optional)</div></div>
  <div class="field full"><label>Also send via</label><div class="row wrap" style="gap:6px"><span class="chip on" data-act="toggle">${ic('wa')} WhatsApp</span><span class="chip" data-act="toggle">${ic('mail')} Email</span><span class="chip" data-act="toggle">${ic('msg')} SMS</span></div></div></div></div>
  <div class="modal-f"><button type="button" class="btn" data-act="close">Cancel</button><button class="btn primary">${ic('send')} Send notice</button></div></form>`);
ACT['save-notice'] = f => { const d = Object.fromEntries(new FormData(f)); const prio = $('.modal .seg .on')?.textContent || 'Normal'; DB.notices.unshift({ id: 'n' + Date.now(), title: d.title, body: d.body, prio, to: d.to, date: TODAY, read: 0, total: 9, unreadBy: DB.team.slice(0, 9).map(t => t.id) }); closeModal(); render(); toast('Notice sent to ' + d.to.toLowerCase()); };
function showMemberNotice(n) {
  n = n || DB.notices.find(x => x.unreadBy.includes(S.me) && x.prio === 'Urgent') || DB.notices.find(x => x.unreadBy.includes(S.me));
  if (!n) return;
  openModal(`<div class="notice-pop"><div class="big-ico" style="${n.prio !== 'Urgent' ? 'background:var(--sage-50);color:var(--sage-700)' : ''}">${ic(n.prio === 'Urgent' ? 'megaphone' : 'bell')}</div>
    <div class="row" style="justify-content:center;margin-bottom:8px">${badge(n.prio)}<span class="faint xs">${fd(n.date)} · from Admin</span></div>
    <h3 style="font-size:20px;margin-bottom:8px">${n.title}</h3><p class="muted" style="margin:0 0 22px">${n.body}</p>
    <div class="col" style="gap:8px"><button class="btn primary block" data-act="notice-read" data-id="${n.id}" style="height:46px">${ic('check')} Got it</button>
    <a class="btn wa block" target="_blank" href="${waLink('01711000222', 'About notice: ' + n.title)}">${ic('wa')} Contact office on WhatsApp</a></div></div>`);
}
ACT['preview-notice'] = () => showMemberNotice(DB.notices[0]);
ACT['notice-read'] = el => {
  const n = DB.notices.find(x => x.id === el.dataset.id);
  if (S.role === 'member' && n.unreadBy.includes(S.me)) { n.unreadBy = n.unreadBy.filter(x => x !== S.me); n.read++; }
  closeModal(); toast('Marked as read'); if (S.role === 'member') render();
};

/* ============ REPORTS ============ */
PAGES.reports = () => {
  const types = {}; DB.projects.forEach(p => types[p.type] = (types[p.type] || 0) + p.budget);
  const tArr = Object.entries(types).sort((a, b) => b[1] - a[1]), tMax = tArr[0][1];
  const src = {}; DB.projects.forEach(p => { const s = client(p.clientId).source; src[s] = (src[s] || 0) + 1; });
  const srcColors = { Facebook: '#3A729E', Instagram: '#6F5FA6', Referral: 'var(--sage-600)', 'Walk-in': '#D9A55B' };
  const tops = DB.clients.map(c => ({ c, s: clientStats(c) })).sort((a, b) => b.s.billed - a.s.billed).slice(0, 5);
  const exp = (t) => `<div class="row" style="gap:6px"><button class="btn sm" data-act="toast" data-msg="${t} exported as PDF">${ic('download')} PDF</button><button class="btn sm" data-act="toast" data-msg="${t} exported to Excel">${ic('download')} Excel</button></div>`;
  return `
  ${pageHead('Reports', 'Bookings, revenue, expenses, team performance and lead sources — export any report.', `<select class="select sm" style="height:40px"><option>Last 6 months</option><option>This year</option><option>Custom…</option></select>`)}
  <div class="grid g-2" style="margin-bottom:18px">
    <div class="card"><div class="card-h"><div><h3>Revenue & expense</h3><div class="sub">Monthly · BDT</div></div>${exp('Revenue report')}</div><div class="card-b">${barChart(DB.monthly, ['inc', 'exp'], [SERIES.inc, SERIES.exp], 210)}</div></div>
    <div class="card"><div class="card-h"><div><h3>Booking value by event type</h3><div class="sub">All bookings</div></div>${exp('Booking report')}</div><div class="card-b bars-h">${tArr.map(([t, v]) => `<div class="r"><div class="t"><span>${t}</span><b class="num">${tk(v)}</b></div>${prog(v / tMax * 100)}</div>`).join('')}</div></div>
  </div>
  <div class="grid g-3" style="margin-bottom:18px">
    <div class="card"><div class="card-h"><div><h3>Lead source</h3><div class="sub">Where bookings come from</div></div></div><div class="card-b"><div class="donut-wrap">${donut(Object.entries(src).map(([l, v]) => ({ l, v, c: srcColors[l] || '#9AA8AA' })), 130, DB.projects.length, 'bookings')}<div class="donut-list">${Object.entries(src).map(([l, v]) => `<div class="r"><span><i style="display:inline-block;width:9px;height:9px;border-radius:3px;background:${srcColors[l]};margin-right:8px"></i>${l}</span><b>${v}</b></div>`).join('')}</div></div></div></div>
    <div class="card"><div class="card-h"><div><h3>Top clients</h3><div class="sub">By billed amount</div></div></div><div class="card-b flush">${tops.map(({ c, s }, i) => `<a class="list-item" href="#/clients/${c.id}"><span class="faint strong" style="width:16px">${i + 1}</span>${av(c.name, 'sm')}<span class="grow strong small truncate">${esc(c.name)}</span>${c.tags.includes('Repeat') ? '<span class="tag">Repeat</span>' : ''}<b class="num small">${tkShort(s.billed)}</b></a>`).join('')}</div></div>
    <div class="card"><div class="card-h"><div><h3>Monthly net profit</h3><div class="sub">Trend</div></div></div><div class="card-b"><div style="font-family:var(--display);font-size:28px;font-weight:700">${tk(271000)}</div><div class="muted small" style="margin-bottom:10px">November so far ${delta('8%')}</div>${spark(DB.monthly.map(m => m.inc - m.exp), 'var(--sage-600)', 300, 80)}</div></div>
  </div>
  <div class="card" style="margin-bottom:18px"><div class="card-h"><div><h3>Team performance</h3><div class="sub">Projects, on-time %, payouts</div></div>${exp('Team report')}</div>
    <div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><thead><tr><th>Member</th><th>Role</th><th class="r">Projects</th><th style="width:220px">On-time completion</th><th class="r">Total payout</th></tr></thead><tbody>
    ${DB.team.slice().sort((a, b) => b.done - a.done).map(t => `<tr class="click" data-href="/team/${t.id}"><td><div class="row">${av(t.name, 'sm')}<span class="strong small">${t.name}</span></div></td><td class="muted small">${t.roles.join(', ')}</td><td class="r num">${t.done}</td><td><div class="row">${prog(t.onTime, t.onTime < 85 ? 'amber' : '')}<b class="small" style="width:40px">${t.onTime}%</b></div></td><td class="r num strong">${tk(t.paid)}</td></tr>`).join('')}</tbody></table></div></div>
  <div class="grid g-4">${[['Booking report', 'Month, service & event-type wise', 'film'], ['Revenue & due report', 'Collections and outstanding', 'wallet'], ['Expense report', 'Category-wise spending', 'receipt'], ['Profit & Loss', 'Monthly P&L statement', 'pie']].map(([t, s, i]) => `<div class="card rep-card"><span class="ri">${ic(i)}</span><div><div class="strong">${t}</div><div class="muted small">${s}</div></div>${exp(t)}</div>`).join('')}</div>`;
};

/* ============ SETTINGS ============ */
PAGES.settings = (parts, q) => {
  const tab = q.tab || 'company';
  const nav = [['company', 'Company profile', 'building'], ['invoice', 'Invoice settings', 'file'], ['catalog', 'Services & packages', 'layers'], ['lists', 'Categories & lists', 'list'], ['email', 'Email & templates', 'mail'], ['roles', 'Roles & permissions', 'shield'], ['prefs', 'Preferences', 'settings'], ['security', 'Security & backup', 'lock']];
  const save = `<div class="row" style="justify-content:flex-end;margin-top:18px"><button class="btn primary" data-act="toast" data-msg="Settings saved">${ic('check')} Save changes</button></div>`;
  let body = '';
  if (tab === 'company') body = `<div class="card"><div class="card-h"><h3>Company profile</h3></div><div class="card-b">
    <div class="row" style="gap:18px;margin-bottom:20px"><div style="width:110px;height:110px;border-radius:20px;background:var(--ink);display:grid;place-items:center"><img src="assets/logo-mark.png" style="width:80px" alt=""></div><div><b>Logo</b><div class="muted small" style="margin:2px 0 10px">Used on invoices, receipts and the sidebar</div><button class="btn sm">${ic('upload')} Replace</button></div></div>
    <div class="form-grid"><div class="field"><label>Company name</label><input class="input" value="${DB.company.name}"></div><div class="field"><label>Phone</label><input class="input" value="${DB.company.phone}"></div>
    <div class="field"><label>Email</label><input class="input" value="${DB.company.email}"></div><div class="field"><label>Website</label><input class="input" value="${DB.company.website}"></div>
    <div class="field full"><label>Address</label><input class="input" value="${DB.company.address}"></div>
    <div class="field"><label>BIN</label><input class="input" value="${DB.company.bin}"></div><div class="field"><label>TIN</label><input class="input" placeholder="Optional"></div>
    <div class="field"><label>Facebook</label><input class="input" value="facebook.com/shoptikproduction"></div><div class="field"><label>Instagram</label><input class="input" value="@shoptik.production"></div></div>${save}</div></div>`;
  if (tab === 'invoice') body = `<div class="card"><div class="card-h"><h3>Invoice settings</h3></div><div class="card-b"><div class="form-grid">
    <div class="field"><label>Invoice prefix</label><input class="input" value="INV-2026-"></div><div class="field"><label>Next number</label><input class="input" value="0053"></div>
    <div class="field"><label>Quotation prefix</label><input class="input" value="Q-2026-"></div><div class="field"><label>Booking ID prefix</label><input class="input" value="SP-2026-"></div>
    <div class="field"><label>Default VAT %</label><input class="input" value="5"></div><div class="field"><label>Amount in words</label><select class="select"><option>English (Taka … Only)</option><option>Bangla (টাকা … মাত্র)</option></select></div>
    <div class="field full"><label>Default terms & conditions</label><textarea class="input">• Booking is confirmed on receipt of advance.\n• 2 free revisions; extra revisions are charged.\n• Final files are delivered after full payment.</textarea></div>
    <div class="field full"><label>Payment details (shown on invoice)</label><textarea class="input">bKash Merchant: 01711-000222\nEastern Bank Ltd · A/C 1011 0600 12345 · Banani Branch</textarea></div>
    <div class="field"><label>Footer note</label><input class="input" value="Thank you for choosing Shoptik Production."></div><div class="field"><label>Signature image</label><div class="upload" style="padding:10px">${ic('upload')}Upload signature</div></div></div>${save}</div></div>`;
  if (tab === 'catalog') body = `<div class="card" style="margin-bottom:18px"><div class="card-h"><h3>Services</h3><button class="btn sm">${ic('plus')} Add</button></div><div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><thead><tr><th>Service</th><th>Unit</th><th class="r">Default price</th><th></th></tr></thead><tbody>${DB.services.map(s => `<tr><td><div class="row"><span class="alert-ico" style="background:var(--sage-50);color:var(--sage-700)">${ic(s.icon)}</span><b>${s.name}</b></div></td><td>${s.unit}</td><td class="r num strong">${tk(s.price)}</td><td class="r"><button class="btn sm icon ghost">${ic('edit')}</button></td></tr>`).join('')}</tbody></table></div></div>
    <div class="card" style="margin-bottom:18px"><div class="card-h"><h3>Add-ons</h3><button class="btn sm">${ic('plus')} Add</button></div><div class="card-b"><div class="row wrap" style="gap:8px">${DB.addons.map(a => `<span class="chip">${a.name}<span class="px">${tk(a.price)}</span></span>`).join('')}</div></div></div>
    <div class="card" style="margin-bottom:18px"><div class="card-h"><h3>Packages</h3><button class="btn sm">${ic('plus')} New package</button></div><div class="card-b grid g-2">${DB.packages.map(p => `<div class="session"><div class="row between"><b>${p.name}</b><b class="num">${tk(p.price)}</b></div><div class="row wrap" style="gap:6px;margin-top:10px">${p.items.map(i => `<span class="tag">${i}</span>`).join('')}</div></div>`).join('')}</div></div>
    <div class="card"><div class="card-h"><h3>Crew rate card</h3></div><div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><tbody>${DB.crewRates.map(r => `<tr><td class="strong">${r.role}</td><td class="r num">${tk(r.rate)} / ${r.role === 'Editor' ? 'project' : 'day'}</td></tr>`).join('')}</tbody></table></div></div>`;
  if (tab === 'lists') body = `<div class="grid g-2">${[['Event types', ['Wedding', 'Corporate', 'Product', 'Music Video', 'Birthday', 'Real Estate', 'Others']], ['Payment methods', ['Cash', 'bKash', 'Nagad', 'Rocket', 'Bank Transfer', 'Card', 'Cheque']], ['Expense categories', ['Transport', 'Food', 'Equipment Purchase', 'Equipment Rent', 'Equipment Repair', 'Office Rent', 'Utility', 'Internet', 'Marketing / Ads', 'Software Subscription', 'Freelancer Payment', 'Others']], ['Client sources', ['Facebook', 'Instagram', 'Referral', 'Walk-in', 'Website']]].map(([t, items]) => `<div class="card"><div class="card-h"><h3>${t}</h3><button class="btn sm">${ic('plus')}</button></div><div class="card-b"><div class="row wrap" style="gap:6px">${items.map(i => `<span class="chip">${i} <span class="px">${ic('x')}</span></span>`).join('')}</div></div></div>`).join('')}</div>`;
  if (tab === 'email') body = `<div class="card" style="margin-bottom:18px"><div class="card-h"><h3>SMTP</h3><span class="badge b-green">Connected</span></div><div class="card-b"><div class="form-grid"><div class="field"><label>Host</label><input class="input" value="smtp.gmail.com"></div><div class="field"><label>Port</label><input class="input" value="587"></div><div class="field"><label>Username</label><input class="input" value="hello@shoptikproduction.com"></div><div class="field"><label>Password</label><input class="input" type="password" value="xxxxxxxxxxxx"></div></div></div></div>
    <div class="card"><div class="card-h"><h3>Templates</h3><div class="seg"><button class="on" data-act="pick-seg">Invoice</button><button data-act="pick-seg">Quotation</button><button data-act="pick-seg">Receipt</button><button data-act="pick-seg">Due reminder</button></div></div><div class="card-b col" style="gap:12px">
      <div class="field"><label>Subject</label><input class="input" value="Invoice {invoice_no} — {project_title}"></div>
      <div class="field"><label>Body</label><textarea class="input" style="min-height:160px">Dear {client_name},\n\nPlease find attached invoice {invoice_no} for {project_title}.\nTotal: {total_amount}\nDue: {due_amount} by {due_date}\n\nThank you,\nShoptik Production</textarea></div>
      <div class="row wrap" style="gap:6px">${['{client_name}', '{project_title}', '{invoice_no}', '{total_amount}', '{due_amount}', '{due_date}', '{company_phone}'].map(p => `<span class="tag" style="cursor:pointer">${p}</span>`).join('')}</div>
      <div class="row between" style="padding-top:8px;border-top:1px solid var(--line-2)"><span class="small strong">Auto due reminder (3 days before due date)</span><span class="toggle on" data-act="toggle"></span></div>
      <div class="row between"><span class="small strong">Daily summary email to owner (8 AM)</span><span class="toggle on" data-act="toggle"></span></div>${save}</div></div>`;
  if (tab === 'roles') {
    const mods = ['Dashboard', 'Calendar', 'Projects', 'Clients', 'Invoices', 'Payments', 'Finance', 'Team', 'Tasks', 'Equipment', 'Notices', 'Reports', 'Settings'];
    const roleCaps = { Manager: m => m === 'Settings' || m === 'Finance' ? [1, 0, 0, 0] : m === 'Reports' ? [1, 0, 0, 0] : [1, 1, 1, 0], Accountant: m => ['Payments', 'Finance', 'Reports', 'Invoices'].includes(m) ? [1, 1, 1, 0] : m === 'Dashboard' ? [1, 0, 0, 0] : [0, 0, 0, 0] };
    const r = q.role || 'Manager';
    body = `<div class="card"><div class="card-h"><div><h3>Roles & permissions</h3><div class="sub">Module-wise view / create / edit / delete</div></div><button class="btn sm">${ic('plus')} New role</button></div>
      <div class="card-b" style="padding-bottom:6px"><div class="seg">${['Super Admin', 'Manager', 'Accountant', 'Team Member'].map(x => `<a href="#/settings?tab=roles&role=${encodeURIComponent(x)}" class="${r === x ? 'on' : ''}">${x}</a>`).join('')}</div></div>
      <div class="tbl-wrap"><table class="tbl perm"><thead><tr><th>Module</th><th>View</th><th>Create</th><th>Edit</th><th>Delete</th></tr></thead><tbody>
      ${mods.map(m => { const caps = r === 'Super Admin' ? [1, 1, 1, 1] : r === 'Team Member' ? (['Tasks', 'Notices', 'Calendar'].includes(m) ? [1, 0, m === 'Tasks' ? 1 : 0, 0] : [0, 0, 0, 0]) : roleCaps[r](m); return `<tr><td class="strong">${m}</td>${caps.map(c => `<td><span class="check ${c ? 'on' : ''}" data-act="check" style="margin:auto">${c ? ic('check') : ''}</span></td>`).join('')}</tr>`; }).join('')}</tbody></table></div>
      <div class="card-b"><div class="warn">${ic('lock')}<div>Only the Super Admin can delete payments. Everything else is archived instead of deleted.</div></div>${save}</div></div>`;
  }
  if (tab === 'prefs') body = `<div class="card"><div class="card-h"><h3>Preferences</h3></div><div class="card-b"><div class="form-grid">
    <div class="field"><label>Currency</label><select class="select"><option>BDT (৳)</option></select></div><div class="field"><label>Timezone</label><select class="select"><option>Asia/Dhaka (GMT+6)</option></select></div>
    <div class="field"><label>Date format</label><select class="select"><option>18 Nov 2026</option><option>18/11/2026</option><option>2026-11-18</option></select></div><div class="field"><label>Week starts on</label><select class="select"><option>Saturday</option><option>Sunday</option></select></div>
    <div class="field"><label>Theme</label><div class="seg"><button class="${S.theme === 'light' ? 'on' : ''}" data-act="${S.theme === 'dark' ? 'theme' : 'pick-seg'}">Light</button><button class="${S.theme === 'dark' ? 'on' : ''}" data-act="${S.theme === 'light' ? 'theme' : 'pick-seg'}">Dark</button></div></div>
    <div class="field"><label>Notifications</label><div class="row wrap" style="gap:6px"><span class="chip on" data-act="toggle">In-app</span><span class="chip on" data-act="toggle">Email</span><span class="chip" data-act="toggle">SMS (BD gateway)</span><span class="chip" data-act="toggle">Web push</span></div></div></div>${save}</div></div>`;
  if (tab === 'security') body = `<div class="grid g-2"><div class="card"><div class="card-h"><h3>Security</h3></div><div class="card-b col" style="gap:14px">
      ${[['Strong password policy', 1], ['Two-step login for admins', 1], ['Auto logout after 30 min idle', 1], ['Archive instead of delete', 1]].map(([l, on]) => `<div class="row between"><span class="small strong">${l}</span><span class="toggle ${on ? 'on' : ''}" data-act="toggle"></span></div>`).join('')}
      <button class="btn sm" data-act="toast" data-msg="All other sessions logged out">${ic('logout')} Log out all sessions</button></div></div>
    <div class="card"><div class="card-h"><h3>Backup</h3><span class="badge b-green">Daily · 3:00 AM</span></div><div class="card-b col" style="gap:10px">${['18 Nov 2026, 3:00 AM', '17 Nov 2026, 3:00 AM', '16 Nov 2026, 3:00 AM'].map(d => `<div class="row"><span class="alert-ico" style="background:var(--green-bg);color:var(--green)">${ic('check')}</span><span class="grow small strong">${d}</span><span class="faint xs">42 MB</span></div>`).join('')}<button class="btn sm" data-act="toast" data-msg="Backup started">${ic('download')} Backup now</button></div></div>
    <div class="card span-2"><div class="card-h"><h3>Audit log</h3></div><div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><thead><tr><th>When</th><th>User</th><th>Action</th><th>IP</th></tr></thead><tbody>
      ${[['18 Nov, 11:04 AM', 'Arif Hossain', 'Added payment PAY-0188 (৳50,000)', '103.112.54.10'], ['17 Nov, 6:30 PM', 'Owner', 'Edited booking SP-2026-0041 — team changed', '103.112.54.2'], ['17 Nov, 9:12 AM', 'Owner', 'Archived client “Test Client”', '103.112.54.2'], ['16 Nov, 4:45 PM', 'Nadia Islam', 'Logged in from new device (Android)', '37.111.200.8']].map(r => `<tr><td class="nowrap">${r[0]}</td><td class="strong small">${r[1]}</td><td>${r[2]}</td><td class="muted small">${r[3]}</td></tr>`).join('')}</tbody></table></div></div></div>`;
  return `${pageHead('Settings', 'Company, invoicing, catalog, roles and system preferences.')}
  <div class="grid" style="grid-template-columns:230px minmax(0,1fr);align-items:start" id="set-grid">
    <div class="set-nav">${nav.map(([k, l, i]) => `<a href="#/settings?tab=${k}" class="${tab === k ? 'on' : ''}">${ic(i)}${l}</a>`).join('')}</div>
    <div>${body}</div></div>`;
};

/* ============ MEMBER PORTAL ============ */
PAGES.me = () => {
  const m = member(S.me);
  const evs = allEvents().filter(e => (e.team || []).includes(S.me) && e.date >= TODAY && e.kind === 'shoot');
  const today = evs.filter(e => e.date === TODAY);
  const tasks = DB.tasks.filter(t => t.who === S.me && t.status !== 'Completed');
  const d = D(TODAY);
  return `
  <div class="hello"><div><div class="date">${WDF[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}</div><h1>Hi ${m.name.split(' ')[0]}, ready for today?</h1>
    <div class="muted" style="margin-top:4px">${today.length} shoot today · ${tasks.length} open tasks · ${DB.notices.filter(n => n.unreadBy.includes(S.me)).length} unread notices</div></div>
    <a class="btn wa" href="${waLink('01711000222', 'Hello office,')}" target="_blank">${ic('wa')} WhatsApp office</a></div>
  ${today.map(e => { const c = client(e.p.clientId); return `<div class="card" style="margin-bottom:18px;background:var(--ink);border-color:var(--ink);color:#E6EFE9;overflow:hidden;position:relative">
    <img src="assets/logo-mark.png" style="position:absolute;right:-30px;bottom:-30px;width:220px;opacity:.08" alt="">
    <div class="card-b" style="position:relative"><span class="live-pill" style="background:rgba(192,71,59,.2)"><i></i>Today's shoot</span>
      <h2 style="font-size:24px;margin:10px 0 4px;color:#fff">${esc(e.short)} — ${e.session}</h2>
      <div class="meta" style="color:#93AFA2;font-size:13.5px"><span>${ic('clock')}${ft(e.start)} – ${ft(e.end)}</span><span>${ic('pin')}${esc(e.location)}</span><span>${ic('user')}Call time 2:30 PM</span></div>
      <div class="row wrap" style="margin-top:16px;gap:8px"><a class="btn sage" target="_blank" href="https://maps.google.com/?q=${encodeURIComponent(e.location)}">${ic('pin')} Open in Maps</a><a class="btn" href="tel:${c.phone}" style="background:transparent;color:#E6EFE9;border-color:rgba(143,173,154,.3)">${ic('phone')} Client: ${c.name}</a>
      <span class="row" style="gap:6px;margin-left:auto">${e.team.map(t => `<span class="tag" style="background:rgba(143,173,154,.12);border-color:rgba(143,173,154,.2);color:#CFE0D5">${member(t).name.split(' ')[0]}</span>`).join('')}</span></div></div></div>`; }).join('')}
  <div class="grid g-4 keep2" style="margin-bottom:18px">
    ${statCard('Upcoming shoots', evs.length, 'camera', 'Next 30 days')}
    ${statCard('Open tasks', tasks.length, 'task', `${tasks.filter(t => t.due < TODAY).length} overdue`)}
    ${statCard('On-time rate', m.onTime + '%', 'trend', 'Last 90 days')}
    ${statCard('Last payout', tk(55000), 'wallet', '1 Nov · Salary')}
  </div>
  <div class="grid g-main">
    <div class="card"><div class="card-h"><h3>My upcoming shoots</h3><a class="btn sm" href="#/me/schedule">Schedule</a></div><div class="card-b flush" style="padding-bottom:0;margin-top:10px">${evs.slice(0, 6).map(e => upcomingRow(e, true)).join('')}</div></div>
    <div class="card"><div class="card-h"><h3>Pending tasks</h3><a class="btn sm" href="#/me/tasks">All tasks</a></div><div class="card-b flush">
      ${tasks.map(t => `<div class="list-item" style="cursor:pointer" data-act="task-open" data-id="${t.id}"><span class="prio ${t.prio}">${t.prio[0]}</span><div class="grow"><div class="strong small">${esc(t.title)}</div><div class="faint xs">${esc(project(t.pid).title)} · due ${fdShort(t.due)}</div></div>${badge(t.status)}</div>`).join('')}</div></div>
  </div>`;
};
PAGES.me_tasks = () => {
  const list = DB.tasks.filter(t => t.who === S.me);
  return `${pageHead('My Tasks', 'Drag a card or open it to update status, tick the checklist and submit a delivery link.')}
  <div class="kanban">${TASK_COLS.map(([c, col]) => { const ts = list.filter(t => t.status === c); return `<div class="kcol" data-col="${c}"><div class="kcol-h"><span class="t"><i style="background:${col}"></i>${c}</span><span class="badge plain">${ts.length}</span></div>${ts.map(t => kcard(t, true)).join('')}</div>`; }).join('')}</div>`;
};
AFTER.me_tasks = () => bindKanban(t => { render(); toast(`Status updated → ${t.status} · admin notified`); });
PAGES.me_schedule = () => {
  const evs = allEvents().filter(e => (e.team || []).includes(S.me) && e.date >= TODAY);
  return `${pageHead('My Schedule', 'Your personal calendar — shoots, meetings and deadlines.', `<button class="btn" data-act="toast" data-msg="Added to your Google Calendar">${ic('calendar')} Add to Google Calendar</button>`)}
  <div class="card"><div class="card-b flush" style="padding:0">${evs.map(e => upcomingRow(e, true)).join('')}</div></div>
  <div class="card" style="margin-top:18px"><div class="card-h"><h3>Request leave</h3></div><div class="card-b"><div class="form-grid g3"><div class="field"><label>From</label><input class="input" type="date" value="2026-12-01"></div><div class="field"><label>To</label><input class="input" type="date" value="2026-12-02"></div><div class="field"><label>&nbsp;</label><button class="btn primary" data-act="toast" data-msg="Leave request sent to admin">${ic('send')} Send request</button></div></div></div></div>`;
};
PAGES.me_notices = () => `${pageHead('Notices', 'Announcements from the office.')}<div class="card">${noticeList(true)}</div>`;
PAGES.me_payouts = () => {
  const m = member(S.me), pays = DB.payouts.filter(x => x.who === S.me).concat([{ id: 'PO-0081', who: S.me, date: '2026-10-01', amount: 55000, type: 'Salary', pids: [], bonus: 5000, deduction: 0, method: 'Bank Transfer' }, { id: 'PO-0070', who: S.me, date: '2026-09-01', amount: 55000, type: 'Salary', pids: [], bonus: 0, deduction: 0, method: 'Bank Transfer' }]);
  pays.forEach(p => { if (!DB.payouts.find(x => x.id === p.id)) DB.payouts.push(p); });
  return `${pageHead('My Payouts', 'Your salary and project payments with downloadable slips.')}
  <div class="grid g-3" style="margin-bottom:18px">${statCard('Total earned (2026)', tkShort(m.earned), 'trend', '', true)}${statCard('Total paid', tkShort(m.paid), 'wallet')}${statCard('Balance', tk(m.earned - m.paid), 'receipt', 'Will be paid with Dec salary')}</div>
  <div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Slip</th><th>Date</th><th>Type</th><th>Method</th><th class="r">Bonus</th><th class="r">Net</th><th></th></tr></thead><tbody>
    ${pays.map(x => `<tr><td class="strong">${x.id}</td><td>${fd(x.date)}</td><td>${x.type}</td><td>${x.method}</td><td class="r">${x.bonus ? tk(x.bonus) : '—'}</td><td class="r num strong">${tk(x.amount + x.bonus - x.deduction)}</td><td class="r"><button class="btn sm" data-act="slip" data-id="${x.id}">${ic('download')} Slip</button></td></tr>`).join('')}</tbody></table></div></div>`;
};
PAGES.me_profile = () => {
  const t = member(S.me);
  return `${pageHead('My Profile', 'Keep your contact details up to date.')}
  <div class="card" style="margin-bottom:18px"><div class="profile-hero"><div class="bg"><img src="assets/logo-mark.png" alt=""></div>${av(t.name, 'xl')}
    <div class="info"><h1 style="font-size:24px">${t.name}</h1><div class="row wrap" style="margin-top:6px">${t.roles.map(r => `<span class="tag">${r}</span>`).join('')}<span class="muted small">${t.type} · since ${fd(t.joined)}</span></div></div></div></div>
  <div class="card"><div class="card-b"><div class="form-grid"><div class="field"><label>Phone</label><input class="input" value="${t.phone}"></div><div class="field"><label>WhatsApp</label><input class="input" value="${t.phone}"></div>
    <div class="field"><label>Email</label><input class="input" value="${t.email}"></div><div class="field"><label>Emergency contact</label><input class="input" value="01700-112233 (Father)"></div>
    <div class="field full"><label>Address</label><input class="input" value="Mohakhali DOHS, Dhaka"></div>
    <div class="field"><label>New password</label><input class="input" type="password" placeholder="••••••••"></div><div class="field"><label>Confirm password</label><input class="input" type="password" placeholder="••••••••"></div></div>
    <div class="row" style="justify-content:flex-end;margin-top:18px"><button class="btn primary" data-act="toast" data-msg="Profile updated">${ic('check')} Save</button></div></div></div>`;
};
