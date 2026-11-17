/* ============ CLIENTS ============ */
PAGES.clients = (parts, q) => {
  if (parts[1]) return PAGES.client_detail(parts, q);
  const f = q.f || 'all';
  let list = DB.clients.map(c => ({ c, s: clientStats(c) }));
  if (f === 'due') list = list.filter(x => x.s.due > 0);
  if (f === 'corp') list = list.filter(x => x.c.type !== 'Individual');
  if (f === 'vip') list = list.filter(x => x.c.tags.includes('VIP'));
  const tot = DB.clients.map(clientStats);
  return `
  ${pageHead('Clients', 'Every client with their full booking and billing history.', `<button class="btn" data-act="toast" data-msg="Exported 12 clients">${ic('download')} Export</button><button class="btn primary" data-act="new-client">${ic('plus')} New Client</button>`)}
  <div class="grid g-4 keep2" style="margin-bottom:18px">
    ${statCard('Total clients', DB.clients.length, 'users', '3 new this month')}
    ${statCard('Corporate / Agency', DB.clients.filter(c => c.type !== 'Individual').length, 'building', 'Repeat rate 42%')}
    ${statCard('Total billed', tkShort(tot.reduce((s, x) => s + x.billed, 0)), 'file', 'All time')}
    ${statCard('Outstanding', tkShort(tot.reduce((s, x) => s + x.due, 0)), 'wallet', `${tot.filter(x => x.due).length} clients have due`)}
  </div>
  <div class="card">
    <div class="toolbar">
      <div class="seg">${[['all', 'All'], ['due', 'Has due'], ['corp', 'Corporate'], ['vip', 'VIP']].map(([k, l]) => `<a href="#/clients?f=${k}" class="${f === k ? 'on' : ''}">${l}</a>`).join('')}</div>
      <span class="grow"></span>
      <div class="input-ico" style="width:260px">${ic('search')}<input class="input sm" style="width:100%" placeholder="Name or phone…"></div>
    </div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Client</th><th>Contact</th><th>Type</th><th>Source</th><th class="r">Bookings</th><th class="r">Billed</th><th class="r">Due</th><th></th></tr></thead><tbody>
    ${list.map(({ c, s }) => `<tr class="click" data-href="/clients/${c.id}">
      <td><div class="row">${av(c.name)}<div><div class="strong">${esc(c.name)} ${c.tags.map(t => `<span class="tag">${t}</span>`).join(' ')}</div><div class="faint xs">${c.contact ? 'Contact: ' + c.contact : c.address}</div></div></div></td>
      <td><div class="small">${c.phone}</div><div class="faint xs">${c.email}</div></td>
      <td>${c.type}</td><td><span class="muted">${c.source}</span></td>
      <td class="r num">${s.count}</td><td class="r num strong">${tk(s.billed)}</td>
      <td class="r num" style="${s.due ? 'color:var(--red);font-weight:700' : 'color:var(--faint)'}">${s.due ? tk(s.due) : '—'}</td>
      <td class="r nowrap"><a class="btn sm icon ghost" href="tel:${c.phone}" title="Call">${ic('phone')}</a><a class="btn sm icon ghost" href="${waLink(c.wa)}" target="_blank" title="WhatsApp" style="color:#1F9D55">${ic('wa')}</a><a class="btn sm icon ghost" href="mailto:${c.email}" title="Email">${ic('mail')}</a></td>
    </tr>`).join('')}</tbody></table></div>
  </div>`;
};

PAGES.client_detail = (parts) => {
  const c = client(parts[1]); if (!c.id) return PAGES.notfound();
  const s = clientStats(c);
  const pays = DB.payments.filter(p => project(p.pid).clientId === c.id);
  return `
  <div class="crumbs"><a href="#/clients">Clients</a>${ic('right')}<span>${esc(c.name)}</span></div>
  <div class="card" style="margin-bottom:18px">
    <div class="profile-hero"><div class="bg"><img src="assets/logo-mark.png" alt=""></div>
      ${av(c.name, 'xl')}
      <div class="info"><h1 style="font-size:24px">${esc(c.name)}</h1><div class="row wrap" style="margin-top:6px"><span class="badge b-sage plain">${c.type}</span>${c.tags.map(t => `<span class="tag">${t}</span>`).join('')}<span class="muted small">Client since ${fd(c.since)} · via ${c.source}</span></div></div>
      <div class="acts"><a class="btn" href="tel:${c.phone}">${ic('phone')} Call</a><a class="btn wa" href="${waLink(c.wa)}" target="_blank">${ic('wa')} WhatsApp</a><a class="btn" href="mailto:${c.email}">${ic('mail')} Email</a><button class="btn" data-act="client-statement" data-id="${c.id}">${ic('download')} Statement PDF</button><a class="btn primary" href="#/projects/new">${ic('plus')} New Booking</a></div>
    </div>
    <div class="money-strip ms4">
      <div><div class="l">Bookings</div><div class="v">${s.count}</div></div>
      <div><div class="l">Total billed</div><div class="v num">${tk(s.billed)}</div></div>
      <div><div class="l">Total paid</div><div class="v num" style="color:var(--green)">${tk(s.paid)}</div></div>
      <div><div class="l">Total due</div><div class="v num" style="color:${s.due ? 'var(--red)' : 'inherit'}">${tk(s.due)}</div></div>
    </div>
  </div>
  <div class="grid g-main">
    <div class="col" style="gap:18px">
      <div class="card"><div class="card-h"><h3>Bookings</h3></div><div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><thead><tr><th>Project</th><th>Date</th><th>Status</th><th class="r">Budget</th><th class="r">Due</th></tr></thead><tbody>
        ${s.projects.map(p => `<tr class="click" data-href="/projects/${p.id}"><td><div class="strong">${esc(p.title)}</div><div class="faint xs">${p.id}</div></td><td>${fd(p.sessions[0].date)}</td><td>${badge(p.status)}</td><td class="r num">${tk(p.budget)}</td><td class="r num" style="${projDue(p) && !['Inquiry', 'Quotation Sent'].includes(p.status) ? 'color:var(--red);font-weight:700' : ''}">${['Inquiry', 'Quotation Sent'].includes(p.status) ? '—' : tk(projDue(p))}</td></tr>`).join('')}
      </tbody></table></div></div>
      <div class="card"><div class="card-h"><h3>Payment history</h3></div><div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><thead><tr><th>Receipt</th><th>Date</th><th>Method</th><th class="r">Amount</th><th></th></tr></thead><tbody>
        ${pays.map(x => `<tr><td class="strong">${x.id}</td><td>${fd(x.date)}</td><td>${methodTag(x.method)}</td><td class="r num strong">${tk(x.amount)}</td><td class="r"><button class="btn sm" data-act="receipt" data-id="${x.id}">${ic('receipt')}</button></td></tr>`).join('') || '<tr><td colspan="5"><div class="empty">No payments yet</div></td></tr>'}
      </tbody></table></div></div>
    </div>
    <div class="col" style="gap:18px">
      <div class="card"><div class="card-h"><h3>Profile</h3><button class="btn sm" data-act="new-client" data-edit="${c.id}">${ic('edit')} Edit</button></div><div class="card-b"><dl class="kv" style="grid-template-columns:100px 1fr">
        ${c.contact ? `<dt>Contact</dt><dd>${c.contact}</dd>` : ''}<dt>Phone</dt><dd>${c.phone}</dd><dt>WhatsApp</dt><dd>${c.wa}</dd><dt>Email</dt><dd class="truncate">${c.email}</dd>
        ${c.company ? `<dt>Company</dt><dd>${c.company}</dd>` : ''}<dt>Address</dt><dd>${c.address}</dd><dt>Source</dt><dd>${c.source}</dd></dl></div></div>
      <div class="card"><div class="card-h"><h3>Invoices</h3></div><div class="card-b flush">
        ${DB.invoices.filter(i => project(i.pid).clientId === c.id).map(i => `<a class="list-item" href="#/invoices/${i.id}"><span class="alert-ico" style="background:var(--sage-50);color:var(--sage-700)">${ic('file')}</span><div class="grow"><div class="strong small">${i.id}</div><div class="faint xs">${fd(i.issue)}</div></div>${badge(invStatus(i))}</a>`).join('') || '<div class="empty small">No invoices</div>'}</div></div>
      <div class="card"><div class="card-h"><h3>Notes</h3></div><div class="card-b"><p class="muted" style="margin:0">${c.type === 'Corporate' ? 'Needs VAT invoice with BIN. Payment via bank transfer within 15 days of invoice.' : 'Prefers WhatsApp over calls. Very particular about candid shots.'}</p></div></div>
    </div>
  </div>`;
};
ACT['client-statement'] = el => { toast(`Statement for ${client(el.dataset.id).name} ready — printing`, 'download'); setTimeout(() => window.print(), 400); };

/* ============ INVOICES & QUOTATIONS ============ */
PAGES.invoices = (parts, q) => {
  if (parts[1]) return PAGES.invoice_view(parts, q);
  const tab = q.tab || 'invoices';
  const invs = DB.invoices.map(i => ({ i, p: project(i.pid), st: invStatus(i), paid: Math.min(projPaid(project(i.pid)), i.amount) }));
  const sum = st => invs.filter(x => x.st === st).reduce((s, x) => s + x.i.amount - x.paid, 0);
  return `
  ${pageHead('Quotations & Invoices', 'Create a quotation from any booking, convert it to an invoice, and send it in one click.', `<a class="btn" href="#/invoices/quote-SP-2026-0044">${ic('file')} New Quotation</a><a class="btn primary" href="#/invoices/INV-2026-0040">${ic('plus')} New Invoice</a>`)}
  <div class="grid g-4 keep2" style="margin-bottom:18px">
    ${statCard('Invoiced (all)', tkShort(invs.reduce((s, x) => s + x.i.amount, 0)), 'file', invs.length + ' invoices')}
    ${statCard('Outstanding', tkShort(invs.reduce((s, x) => s + x.i.amount - x.paid, 0)), 'wallet', `${invs.filter(x => x.st !== 'Paid').length} open`)}
    ${statCard('Overdue', tkShort(sum('Overdue')), 'alert', `<span style="color:var(--red);font-weight:700">${invs.filter(x => x.st === 'Overdue').length} invoices</span>`)}
    ${statCard('Quotations open', DB.quotations.filter(x => ['Sent', 'Draft'].includes(x.status)).length, 'send', 'Avg. approval 3.4 days')}
  </div>
  ${tabs('#/invoices', [['invoices', 'Invoices', invs.length], ['quotations', 'Quotations', DB.quotations.length], ['log', 'Sent log']], tab)}
  ${tab === 'invoices' ? `<div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Invoice</th><th>Client / Project</th><th>Issued</th><th>Due date</th><th>Status</th><th class="r">Amount</th><th class="r">Balance</th><th></th></tr></thead><tbody>
    ${invs.map(({ i, p, st, paid }) => `<tr class="click" data-href="/invoices/${i.id}"><td class="strong">${i.id}</td><td><div class="strong small">${esc(client(p.clientId).name)}</div><div class="faint xs truncate" style="max-width:230px">${esc(p.title)}</div></td><td>${fd(i.issue)}</td><td>${fd(i.due)}</td><td>${badge(st)}</td><td class="r num">${tk(i.amount)}</td><td class="r num strong" style="${i.amount - paid ? 'color:var(--red)' : 'color:var(--faint)'}">${i.amount - paid ? tk(i.amount - paid) : '—'}</td>
      <td class="r nowrap"><button class="btn sm icon ghost" data-act="send-mail" data-doc="${i.id}" title="Send mail">${ic('mail')}</button><a class="btn sm icon ghost" href="#/invoices/${i.id}" title="Download">${ic('download')}</a></td></tr>`).join('')}
  </tbody></table></div></div>` : tab === 'quotations' ? `<div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Quotation</th><th>Client / Project</th><th>Date</th><th>Valid till</th><th>Version</th><th>Status</th><th class="r">Amount</th><th></th></tr></thead><tbody>
    ${DB.quotations.map(x => { const p = project(x.pid); return `<tr class="click" data-href="/invoices/quote-${p.id}"><td class="strong">${x.id}</td><td><div class="strong small">${esc(client(p.clientId).name)}</div><div class="faint xs">${esc(p.title)}</div></td><td>${fd(x.date)}</td><td>${fd(x.valid)}</td><td><span class="tag">${x.ver}</span></td><td>${badge(x.status)}</td><td class="r num strong">${tk(x.amount)}</td>
      <td class="r">${x.status === 'Sent' ? `<button class="btn sm" data-act="toast" data-msg="Converted to invoice INV-2026-0053">Convert to Invoice</button>` : ''}</td></tr>`; }).join('')}
  </tbody></table></div></div>` : `<div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Sent</th><th>To</th><th>Subject</th><th>Type</th></tr></thead><tbody>
    ${DB.emailLog.map(l => `<tr><td class="nowrap">${l.date}</td><td>${l.to}</td><td class="strong">${l.subject}</td><td><span class="tag">${l.type}</span></td></tr>`).join('')}</tbody></table></div></div>`}`;
};

function docLines(p) {
  const days = p.sessions.length, lines = [];
  p.services.forEach(s => { const sv = DB.services.find(x => x.name === s); if (sv) lines.push([s, sv.unit === 'per day' ? days : 1, sv.price, sv.unit]); });
  p.addons.forEach(a => { const ad = DB.addons.find(x => x.name === a); if (ad) lines.push([a, 1, ad.price, 'add-on']); });
  const sub = lines.reduce((s, l) => s + l[1] * l[2], 0);
  if (sub < p.budget) lines.push(['Crew (' + new Set(p.sessions.flatMap(s => s.team)).size + ' members)', 1, p.budget - sub, 'crew']);
  const gross = lines.reduce((s, l) => s + l[1] * l[2], 0);
  return { lines, gross, disc: gross - p.budget };
}

PAGES.invoice_view = (parts) => {
  const isQ = parts[1].startsWith('quote-');
  const p = isQ ? project(parts[1].slice(6)) : project((DB.invoices.find(i => i.id === parts[1]) || {}).pid);
  if (!p.id) return PAGES.notfound();
  const inv = DB.invoices.find(i => i.pid === p.id) || { id: 'INV-2026-0053', issue: TODAY, due: p.delivery, amount: p.budget };
  const quo = DB.quotations.find(x => x.pid === p.id) || { id: 'Q-2026-0063', date: TODAY, valid: addDays(TODAY, 14), ver: 'v1' };
  const c = client(p.clientId), { lines, disc } = docLines(p);
  const paid = isQ ? 0 : Math.min(projPaid(p), p.budget), due = p.budget - paid, st = isQ ? '' : invStatus(inv);
  const pays = DB.payments.filter(x => x.pid === p.id);
  const docId = isQ ? quo.id : inv.id;
  return `
  <div class="no-print">${pageHead(docId, `${isQ ? 'Quotation ' + quo.ver : 'Invoice'} for ${esc(c.name)} · ${esc(p.title)}`,
    `${isQ ? `<button class="btn" data-act="toast" data-msg="Revision ${quo.ver === 'v1' ? 'v2' : 'v' + (+quo.ver.slice(1) + 1)} saved">${ic('copy')} Save as new version</button><button class="btn" data-act="toast" data-msg="Converted to invoice INV-2026-0053">${ic('refresh')} Convert to Invoice</button>` : `<button class="btn" data-act="add-payment" data-pid="${p.id}">${ic('plus')} Add Payment</button>`}
     <a class="btn wa" target="_blank" href="${waLink(c.wa, `Assalamu alaikum ${c.contact || c.name}, please find your ${isQ ? 'quotation' : 'invoice'} ${docId} (${tk(p.budget)}) from Shoptik Production: https://shoptik.app/d/${docId}`)}">${ic('wa')} WhatsApp</a>
     <button class="btn" data-act="send-mail" data-doc="${docId}">${ic('mail')} Send Mail</button>
     <button class="btn primary" data-act="print">${ic('download')} Download PDF</button>`,
    [['Quotations & Invoices', '#/invoices'], [docId]])}</div>
  <div class="paper">
    <div class="ph-top">
      <div class="co"><img src="assets/logo-mark-dark.png" alt="Shoptik Production"><div style="margin-top:10px;font-weight:800;font-size:15px">${DB.company.name}</div>
        <div style="font-size:12px;color:#6E8084;line-height:1.6">${DB.company.address}<br>${DB.company.phone} · ${DB.company.email}<br>BIN: ${DB.company.bin}</div></div>
      <div style="text-align:right"><div class="doc-t">${isQ ? 'Quotation' : 'Invoice'}</div>${!isQ ? `<div class="stamp ${st === 'Paid' ? 'paid' : st === 'Partially Paid' ? 'partial' : 'unpaid'}">${st.toUpperCase()}</div>` : ''}
        <table style="margin-top:10px;font-size:12.5px;width:auto;margin-left:auto"><tbody>
          <tr><td style="padding:3px 10px;border:0;color:#6E8084">${isQ ? 'Quotation' : 'Invoice'} no.</td><td style="padding:3px 0;border:0;font-weight:800;text-align:right">${docId}</td></tr>
          <tr><td style="padding:3px 10px;border:0;color:#6E8084">${isQ ? 'Date' : 'Issue date'}</td><td style="padding:3px 0;border:0;text-align:right">${fd(isQ ? quo.date : inv.issue)}</td></tr>
          <tr><td style="padding:3px 10px;border:0;color:#6E8084">${isQ ? 'Valid until' : 'Due date'}</td><td style="padding:3px 0;border:0;text-align:right;font-weight:700">${fd(isQ ? quo.valid : inv.due)}</td></tr>
          <tr><td style="padding:3px 10px;border:0;color:#6E8084">Booking</td><td style="padding:3px 0;border:0;text-align:right">${p.id}</td></tr>
        </tbody></table></div>
    </div>
    <div class="grid2">
      <div><div class="lbl">Bill to</div><div style="font-weight:800;font-size:15px">${esc(c.company || c.name)}</div><div style="font-size:12.5px;color:#3D5155;line-height:1.6">${c.contact ? 'Attn: ' + c.contact + '<br>' : ''}${c.address}<br>${c.phone} · ${c.email}</div></div>
      <div><div class="lbl">Project · ${p.type}</div><div style="font-weight:800;font-size:15px">${esc(p.title)}</div>
        <div style="font-size:12.5px;color:#3D5155;line-height:1.6">${p.sessions.map(s => `${s.name} — ${fd(s.date)}, ${ft(s.start)}–${ft(s.end)}`).join('<br>')}</div></div>
    </div>
    <table><thead><tr><th>#</th><th>Description</th><th style="text-align:center">Qty</th><th style="text-align:right">Rate</th><th style="text-align:right">Amount</th></tr></thead><tbody>
      ${lines.map((l, i) => `<tr><td style="color:#9AA8AA">${String(i + 1).padStart(2, '0')}</td><td><b>${l[0]}</b><div style="font-size:11.5px;color:#6E8084">${l[3]}</div></td><td style="text-align:center">${l[1]}</td><td style="text-align:right">${tk(l[2])}</td><td style="text-align:right;font-weight:700">${tk(l[1] * l[2])}</td></tr>`).join('')}
    </tbody></table>
    <div class="tot">
      <div class="ln"><span>Subtotal</span><b>${tk(p.budget + disc)}</b></div>
      ${disc ? `<div class="ln"><span>Discount</span><b style="color:#3C8A5A">− ${tk(disc)}</b></div>` : ''}
      <div class="ln"><span>VAT (0%)</span><b>${tk(0)}</b></div>
      <div class="ln g"><span>Total</span><span>${tk(p.budget)}</span></div>
      ${!isQ ? `<div class="ln" style="margin-top:6px"><span>Paid</span><b style="color:#3C8A5A">${tk(paid)}</b></div><div class="ln"><span><b>Balance due</b></span><b style="color:${due ? '#C0473B' : 'inherit'}">${tk(due)}</b></div>` : ''}
    </div>
    <div class="words">In words: Taka ${numberToWords(p.budget)} Only${!isQ && due ? ` · Due: Taka ${numberToWords(due)} Only` : ''}</div>
    ${!isQ && pays.length ? `<div style="margin-top:24px"><div class="lbl">Payment history</div><table><tbody>${pays.map(x => `<tr><td>${fd(x.date)}</td><td>${x.id}</td><td>${x.method}${x.ref !== '—' ? ' · ' + x.ref : ''}</td><td style="text-align:right;font-weight:700">${tk(x.amount)}</td></tr>`).join('')}</tbody></table></div>` : ''}
    <div class="grid2" style="padding-bottom:0">
      <div><div class="lbl">Payment schedule</div><div style="font-size:12.5px;line-height:1.8">50% advance on booking — ${tk(p.budget * .5)}<br>30% on shoot day — ${tk(p.budget * .3)}<br>20% before delivery — ${tk(p.budget * .2)}</div>
        <div class="lbl" style="margin-top:14px">Pay to</div><div style="font-size:12.5px;line-height:1.7">bKash Merchant: 01711-000222<br>Eastern Bank Ltd · A/C 1011 0600 12345 · Banani Branch</div></div>
      <div><div class="lbl">Terms & conditions</div><div style="font-size:12px;color:#3D5155;line-height:1.7">• Booking is confirmed on receipt of advance.<br>• 2 free revisions; extra revisions are charged.<br>• Final files are delivered after full payment.<br>• Advance is non-refundable within 7 days of the event.</div>
        <div class="sign" style="margin-top:22px;display:inline-block"><div class="s">Shoptik</div>Authorized signature</div></div>
    </div>
    <div class="foot"><span>Thank you for choosing ${DB.company.name}.</span><span>${DB.company.website}</span></div>
  </div>`;
};

/* ============ PAYMENTS ============ */
PAGES.payments = (parts, q) => {
  const m = q.m || '';
  const list = DB.payments.filter(x => !m || x.method === m).sort((a, b) => b.date.localeCompare(a.date));
  const methods = ['Cash', 'bKash', 'Nagad', 'Rocket', 'Bank Transfer', 'Card', 'Cheque'];
  const byM = methods.map(mm => ({ m: mm, v: DB.payments.filter(x => x.method === mm).reduce((s, x) => s + x.amount, 0) }));
  return `
  ${pageHead('Payments', 'Every taka received — with money receipts for each.', `<button class="btn" data-act="add-refund">${ic('refresh')} Refund entry</button><button class="btn primary" data-act="add-payment">${ic('plus')} Add Payment</button>`)}
  <div class="grid g-4 keep2" style="margin-bottom:18px">
    ${statCard('Received · Nov', tkShort(DB.payments.filter(x => x.date >= '2026-11-01').reduce((s, x) => s + x.amount, 0)), 'wallet', delta('12%') + ' vs Oct', true)}
    ${statCard('Payments · Nov', DB.payments.filter(x => x.date >= '2026-11-01').length, 'receipt', 'Avg ' + tk(66000))}
    ${statCard('Mobile banking', tkShort(byM.filter(x => ['bKash', 'Nagad', 'Rocket'].includes(x.m)).reduce((s, x) => s + x.v, 0)), 'phone', 'bKash · Nagad · Rocket')}
    ${statCard('Bank & card', tkShort(byM.filter(x => ['Bank Transfer', 'Card', 'Cheque'].includes(x.m)).reduce((s, x) => s + x.v, 0)), 'building', 'Transfers, POS, cheques')}
  </div>
  <div class="card">
    <div class="toolbar"><div class="row wrap" style="gap:6px"><a class="chip ${!m ? 'on' : ''}" href="#/payments">All</a>${methods.map(mm => `<a class="chip ${m === mm ? 'on' : ''}" href="#/payments?m=${encodeURIComponent(mm)}">${mm}</a>`).join('')}</div>
      <span class="grow"></span><button class="btn sm" data-act="toast" data-msg="Exported payments to Excel">${ic('download')} Export</button></div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Receipt</th><th>Date</th><th>Client / Project</th><th>Method</th><th>Reference</th><th>Received by</th><th class="r">Amount</th><th></th></tr></thead><tbody>
      ${list.map(x => { const p = project(x.pid); return `<tr><td class="strong">${x.id}</td><td class="nowrap">${fd(x.date)}</td><td><a href="#/projects/${p.id}?tab=payments"><div class="strong small">${esc(client(p.clientId).name)}</div><div class="faint xs truncate" style="max-width:220px">${esc(p.title)}</div></a></td>
        <td>${methodTag(x.method)}</td><td class="muted small">${x.ref}</td><td class="small">${x.by}</td><td class="r num strong">${tk(x.amount)}</td>
        <td class="r nowrap"><button class="btn sm" data-act="receipt" data-id="${x.id}">${ic('receipt')} Receipt</button></td></tr>`; }).join('')}
    </tbody></table></div>
  </div>`;
};

/* ============ FINANCE ============ */
PAGES.finance = (parts, q) => {
  const tab = q.tab || 'overview';
  const inc = DB.payments.filter(x => x.date >= '2026-11-01').reduce((s, x) => s + x.amount, 0);
  const exp = DB.expenses.filter(x => x.date >= '2026-11-01').reduce((s, x) => s + x.amount, 0);
  const pay = DB.payouts.filter(x => x.date >= '2026-11-01').reduce((s, x) => s + x.amount + x.bonus - x.deduction, 0);
  const dueList = DB.projects.filter(p => !['Inquiry', 'Quotation Sent'].includes(p.status) && projDue(p) > 0);
  const totalDue = dueList.reduce((s, p) => s + projDue(p), 0);
  let body = '';

  if (tab === 'overview') {
    const methods = [['bKash', '#C0473B'], ['Bank Transfer', '#3A729E'], ['Cash', '#3C8A5A'], ['Nagad', '#D9A55B'], ['Card', '#2F8378'], ['Cheque', '#9AA8AA'], ['Rocket', '#6F5FA6']];
    const parts2 = methods.map(([m, c]) => ({ l: m, c, v: DB.payments.filter(x => x.method === m).reduce((s, x) => s + x.amount, 0) })).filter(x => x.v);
    const tot = parts2.reduce((s, x) => s + x.v, 0);
    const cats = {}; DB.expenses.forEach(e => cats[e.cat] = (cats[e.cat] || 0) + e.amount);
    const catArr = Object.entries(cats).sort((a, b) => b[1] - a[1]).slice(0, 6), catMax = catArr[0][1];
    body = `
    <div class="grid g-main" style="margin-bottom:18px">
      <div class="card"><div class="card-h"><div><h3>Income vs Expense</h3><div class="sub">Last 6 months</div></div><div class="legend"><span><i style="background:${SERIES.inc}"></i>Income</span><span><i style="background:${SERIES.exp}"></i>Expense</span></div></div>
        <div class="card-b">${barChart(DB.monthly, ['inc', 'exp'], [SERIES.inc, SERIES.exp])}</div></div>
      <div class="card"><div class="card-h"><div><h3>Collection by method</h3><div class="sub">All payments received</div></div></div>
        <div class="card-b"><div class="donut-wrap">${donut(parts2, 150, tkShort(tot), 'collected')}<div class="donut-list">${parts2.map(x => `<div class="r"><span><i style="display:inline-block;width:9px;height:9px;border-radius:3px;background:${x.c};margin-right:8px"></i>${x.l}</span><b class="num">${tkShort(x.v)}</b></div>`).join('')}</div></div></div></div>
    </div>
    <div class="grid g-3">
      <div class="card"><div class="card-h"><h3>Due aging</h3><a class="btn sm" href="#/finance?tab=due">Details</a></div><div class="card-b bars-h">
        ${[['0–30 days', totalDue * .62, ''], ['31–60 days', totalDue * .28, 'amber'], ['60+ days', totalDue * .1, 'red']].map(([l, v, t]) => `<div class="r"><div class="t"><span>${l}</span><b class="num">${tk(v)}</b></div>${prog(v / totalDue * 100, t)}</div>`).join('')}</div></div>
      <div class="card"><div class="card-h"><h3>Top expense categories</h3></div><div class="card-b bars-h">
        ${catArr.map(([c, v]) => `<div class="r"><div class="t"><span>${c}</span><b class="num">${tk(v)}</b></div>${prog(v / catMax * 100)}</div>`).join('')}</div></div>
      <div class="card"><div class="card-h"><h3>Account balances</h3><span class="tag">Optional</span></div><div class="card-b col" style="gap:12px">
        ${[['Cash box', 84500, 'wallet'], ['bKash merchant', 126300, 'phone'], ['Eastern Bank', 1248000, 'building'], ['Nagad', 22000, 'phone']].map(([l, v, i]) => `<div class="row"><span class="alert-ico" style="background:var(--sage-50);color:var(--sage-700)">${ic(i)}</span><span class="grow strong small">${l}</span><b class="num">${tk(v)}</b></div>`).join('')}</div></div>
    </div>`;
  }
  if (tab === 'income') body = `<div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Date</th><th>Client</th><th>Booking</th><th>Method</th><th class="r">Amount</th></tr></thead><tbody>
    ${DB.payments.slice().sort((a, b) => b.date.localeCompare(a.date)).map(x => { const p = project(x.pid); return `<tr><td>${fd(x.date)}</td><td class="strong">${esc(client(p.clientId).name)}</td><td class="muted">${p.id}</td><td>${methodTag(x.method)}</td><td class="r num strong">${tk(x.amount)}</td></tr>`; }).join('')}</tbody></table></div></div>`;
  if (tab === 'due') body = `<div class="card"><div class="card-h"><div><h3>Due list</h3><div class="sub">${dueList.length} bookings · ${tk(totalDue)} outstanding</div></div><button class="btn sm" data-act="toast" data-msg="Reminders sent to 6 clients via email & WhatsApp">${ic('send')} Remind all</button></div>
    <div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><thead><tr><th>Client</th><th>Booking</th><th class="r">Total</th><th class="r">Paid</th><th class="r">Due</th><th>Due date</th><th>Aging</th><th></th></tr></thead><tbody>
    ${dueList.sort((a, b) => a.delivery.localeCompare(b.delivery)).map(p => { const c = client(p.clientId), n = daysBetween(p.delivery, TODAY); return `<tr><td><div class="row">${av(c.name, 'sm')}<span class="strong">${esc(c.name)}</span></div></td><td class="small"><a href="#/projects/${p.id}">${esc(p.title)}</a></td><td class="r num">${tk(p.budget)}</td><td class="r num" style="color:var(--green)">${tk(projPaid(p))}</td><td class="r num strong" style="color:var(--red)">${tk(projDue(p))}</td><td class="nowrap">${fd(p.delivery)}</td>
      <td>${n > 0 ? `<span class="badge b-red">${n}d overdue</span>` : '<span class="badge b-sage">0–30</span>'}</td><td class="r"><a class="btn sm" target="_blank" href="${waLink(c.wa, `Reminder: ${tk(projDue(p))} due for ${p.title}`)}">${ic('wa')} Remind</a></td></tr>`; }).join('')}</tbody></table></div></div>`;
  if (tab === 'expenses') body = `<div class="card"><div class="toolbar"><select class="select sm"><option>All categories</option>${['Transport', 'Food', 'Equipment Purchase', 'Equipment Rent', 'Equipment Repair', 'Office Rent', 'Utility', 'Internet', 'Marketing / Ads', 'Software Subscription', 'Freelancer Payment', 'Others'].map(c => `<option>${c}</option>`).join('')}</select><span class="tag">${ic('refresh')} 3 recurring expenses active</span><span class="grow"></span><button class="btn sm primary" data-act="add-expense">${ic('plus')} Add Expense</button></div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Date</th><th>Category</th><th>Paid to</th><th>Project</th><th>Method</th><th>Note</th><th class="r">Amount</th></tr></thead><tbody>
    ${DB.expenses.map(x => `<tr><td class="nowrap">${fd(x.date)}</td><td><span class="tag">${x.cat}</span></td><td class="strong small">${x.to}</td><td class="small">${x.pid ? `<a href="#/projects/${x.pid}" style="color:var(--sage-600)">${x.pid}</a>` : '<span class="faint">Office</span>'}</td><td>${x.method}</td><td class="muted small">${x.note.includes('recurring') ? `<span class="badge b-blue plain">${ic('refresh')} Recurring</span>` : x.note}</td><td class="r num strong">${tk(x.amount)}</td></tr>`).join('')}</tbody></table></div></div>`;
  if (tab === 'payouts') body = `<div class="grid g-main" style="margin-bottom:18px">
      <div class="card"><div class="card-h"><div><h3>Payable now</h3><div class="sub">Freelancer amounts from completed projects</div></div></div><div class="card-b flush">
        ${DB.payables.map(x => { const m = member(x.who); return `<div class="list-item">${av(m.name, 'sm')}<div class="grow"><div class="strong small">${m.name}</div><div class="faint xs">${esc(project(x.pid).title)}</div></div><b class="num">${tk(x.amount)}</b><button class="btn sm" data-act="add-payout" data-who="${x.who}" data-amt="${x.amount}">Pay</button></div>`; }).join('')}</div></div>
      <div class="card"><div class="card-h"><h3>Member ledger</h3></div><div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><thead><tr><th>Member</th><th class="r">Earned</th><th class="r">Paid</th><th class="r">Balance</th></tr></thead><tbody>
        ${DB.team.slice(0, 7).map(m => `<tr class="click" data-href="/team/${m.id}?tab=payouts"><td><div class="row">${av(m.name, 'sm')}<span class="small strong">${m.name.split(' ')[0]}</span></div></td><td class="r num small">${tkShort(m.earned)}</td><td class="r num small">${tkShort(m.paid)}</td><td class="r num strong small" style="${m.earned - m.paid ? 'color:var(--amber)' : ''}">${tk(m.earned - m.paid)}</td></tr>`).join('')}</tbody></table></div></div></div>
    <div class="card"><div class="card-h"><h3>Payout history</h3><button class="btn sm primary" data-act="add-payout">${ic('plus')} Add Payout</button></div><div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><thead><tr><th>Slip</th><th>Member</th><th>Date</th><th>Type</th><th>Projects</th><th class="r">Bonus / Ded.</th><th class="r">Net</th><th></th></tr></thead><tbody>
    ${DB.payouts.map(x => { const m = member(x.who); return `<tr><td class="strong">${x.id}</td><td><div class="row">${av(m.name, 'sm')}<span class="small strong">${m.name}</span></div></td><td>${fd(x.date)}</td><td><span class="badge ${x.type === 'Salary' ? 'b-blue' : 'b-violet'} plain">${x.type}</span></td><td class="small muted">${x.pids.join(', ') || '—'}</td><td class="r small">${x.bonus ? `<span style="color:var(--green)">+${tk(x.bonus)}</span>` : ''}${x.deduction ? `<span style="color:var(--red)"> −${tk(x.deduction)}</span>` : ''}${!x.bonus && !x.deduction ? '—' : ''}</td><td class="r num strong">${tk(x.amount + x.bonus - x.deduction)}</td><td class="r"><button class="btn sm" data-act="slip" data-id="${x.id}">${ic('download')} Slip</button></td></tr>`; }).join('')}</tbody></table></div></div>`;
  if (tab === 'pnl') body = `<div class="grid g-main"><div class="card"><div class="card-h"><div><h3>Project-wise P&L</h3><div class="sub">Income − (project expense + team payout)</div></div><button class="btn sm" data-act="toast" data-msg="P&L exported to Excel">${ic('download')} Excel</button></div>
      <div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><thead><tr><th>Project</th><th class="r">Income</th><th class="r">Expense</th><th class="r">Payout</th><th class="r">Profit</th><th class="r">Margin</th></tr></thead><tbody>
      ${DB.projects.filter(p => !['Inquiry', 'Quotation Sent'].includes(p.status)).map(p => { const e = DB.expenses.filter(x => x.pid === p.id).reduce((s, x) => s + x.amount, 0) || Math.round(p.budget * .06); const po = Math.round(p.budget * .22); const pr = p.budget - e - po; return `<tr class="click" data-href="/projects/${p.id}?tab=expenses"><td class="strong small">${esc(p.title)}</td><td class="r num">${tk(p.budget)}</td><td class="r num" style="color:var(--red)">${tk(e)}</td><td class="r num" style="color:var(--red)">${tk(po)}</td><td class="r num strong" style="color:var(--green)">${tk(pr)}</td><td class="r"><span class="badge b-green plain">${Math.round(pr / p.budget * 100)}%</span></td></tr>`; }).join('')}</tbody></table></div></div>
    <div class="card"><div class="card-h"><h3>November statement</h3><button class="btn sm" data-act="print">${ic('download')} PDF</button></div><div class="card-b">
      ${[['Income', inc, 'green'], ['Expenses', -exp, 'red'], ['Team payouts', -pay, 'red']].map(([l, v, c]) => `<div class="row between" style="padding:8px 0;border-bottom:1px solid var(--line-2)"><span class="muted">${l}</span><b class="num" style="color:var(--${c})">${v < 0 ? '− ' : ''}${tk(Math.abs(v))}</b></div>`).join('')}
      <div class="row between" style="padding-top:14px"><b>Net profit</b><b class="num" style="font-size:22px;font-family:var(--display)">${tk(inc - exp - pay)}</b></div>
      <div style="margin-top:16px">${spark([180, 140, 203, 253, 367, inc - exp - pay].map(x => x > 1000 ? x / 1000 : x), 'var(--sage-600)', 280, 60)}</div></div></div></div>`;

  return `
  ${pageHead('Finance', 'Who paid, who owes, what we spent, what the team earned — and what is left.',
    `<select class="select sm" style="height:40px"><option>This month</option><option>Last month</option><option>This year</option><option>Custom range…</option></select>
     <button class="btn" data-act="add-expense">${ic('receipt')} Add Expense</button><button class="btn primary" data-act="add-payment">${ic('plus')} Add Payment</button>`)}
  <div class="grid g-5 keep2" style="margin-bottom:18px">
    ${statCard('Total income', tkShort(inc), 'trend', delta('12%') + ' vs Oct')}
    ${statCard('Total due', tkShort(totalDue), 'wallet', `${dueList.length} bookings`)}
    ${statCard('Total expense', tkShort(exp), 'receipt', delta('4%', false) + ' vs Oct')}
    ${statCard('Team payout', tkShort(pay), 'users', `${DB.payouts.filter(x => x.date >= '2026-11-01').length} payouts`)}
    ${statCard('Net profit', tkShort(inc - exp - pay), 'pie', `Margin ${Math.round((inc - exp - pay) / inc * 100)}%`, true)}
  </div>
  ${tabs('#/finance', [['overview', 'Overview'], ['income', 'Income'], ['due', 'Due', dueList.length], ['expenses', 'Expenses'], ['payouts', 'Team Payouts'], ['pnl', 'Profit & Loss']], tab)}
  ${body}`;
};

/* ============ MODALS (forms that actually update the demo data) ============ */
const projOptions = sel => DB.projects.map(p => `<option value="${p.id}" ${sel === p.id ? 'selected' : ''}>${p.id} — ${esc(p.title)}</option>`).join('');
ACT['add-payment'] = el => {
  const pid = el.dataset.pid || 'SP-2026-0041', p = project(pid);
  openModal(modalHead('Add Payment', 'A money receipt is generated automatically') + `
  <form data-submit="save-payment"><div class="modal-b"><div class="form-grid">
    <div class="field full"><label>Booking</label><select class="select" name="pid" data-change="pay-proj">${projOptions(pid)}</select><span class="hint" id="pay-due">Due: <b>${tk(projDue(p))}</b> of ${tk(p.budget)}</span></div>
    <div class="field"><label>Amount (৳)</label><input class="input" name="amount" type="number" required value="${Math.min(50000, projDue(p)) || 10000}"></div>
    <div class="field"><label>Date</label><input class="input" name="date" type="date" value="${TODAY}"></div>
    <div class="field full"><label>Method</label><div class="row wrap" style="gap:6px" id="pay-methods">${['Cash', 'bKash', 'Nagad', 'Rocket', 'Bank Transfer', 'Card', 'Cheque'].map((m, i) => `<span class="chip ${i === 1 ? 'on' : ''}" data-act="pick-chip" data-v="${m}">${m}</span>`).join('')}</div></div>
    <div class="field"><label>Transaction ID / reference</label><input class="input" name="ref" placeholder="e.g. BK8XN21QA9"></div>
    <div class="field"><label>Received by</label><select class="select" name="by"><option>Owner</option>${DB.team.slice(0, 3).map(t => `<option>${t.name}</option>`).join('')}</select></div>
    <div class="field full"><label>Note</label><input class="input" name="note" placeholder="Optional"></div>
    <div class="field full"><div class="upload">${ic('upload')}Attach screenshot / slip (optional)</div></div>
  </div></div>
  <div class="modal-f"><button type="button" class="btn" data-act="close">Cancel</button><button class="btn primary">${ic('check')} Save & generate receipt</button></div></form>`);
};
ACT['chg-pay-proj'] = el => { const p = project(el.value); $('#pay-due').innerHTML = `Due: <b>${tk(projDue(p))}</b> of ${tk(p.budget)}`; };
ACT['pick-chip'] = el => { $$('.chip', el.parentElement).forEach(c => c.classList.toggle('on', c === el)); };
ACT['save-payment'] = f => {
  const d = Object.fromEntries(new FormData(f));
  const method = $('#pay-methods .chip.on')?.dataset.v || 'Cash';
  const id = 'PAY-0' + (189 + DB.payments.length - 16);
  DB.payments.unshift({ id, pid: d.pid, date: d.date, amount: +d.amount, method, ref: d.ref || '—', by: d.by, note: d.note });
  DB.activity.unshift({ who: d.by, what: `added payment ${tk(+d.amount)} (${method}) to`, target: project(d.pid).title, time: 'Just now', icon: 'wallet' });
  closeModal(); render(); toast(`${tk(+d.amount)} received · ${id} created`);
  setTimeout(() => ACT.receipt({ dataset: { id } }), 400);
};
ACT.receipt = el => {
  const x = DB.payments.find(p => p.id === el.dataset.id), p = project(x.pid), c = client(p.clientId);
  openModal(`<div class="modal-b" style="padding:0"><div class="paper" style="box-shadow:none;border:0;border-radius:20px;padding:30px">
    <div class="row between" style="align-items:flex-start"><div><img src="assets/logo-mark-dark.png" style="width:80px" alt=""><div style="font-weight:800;margin-top:6px">${DB.company.name}</div><div style="font-size:11.5px;color:#6E8084">${DB.company.phone}</div></div>
      <div style="text-align:right"><div class="doc-t" style="font-size:24px">Money Receipt</div><div style="font-size:12.5px;color:#6E8084">${x.id} · ${fd(x.date)}</div></div></div>
    <div style="margin:22px 0;padding:18px;border-radius:14px;background:#EEF4F0;text-align:center"><div style="font-size:11px;letter-spacing:.14em;font-weight:800;color:#46705A">AMOUNT RECEIVED</div><div style="font-family:Sora;font-size:34px;font-weight:700">${tk(x.amount)}</div><div style="font-size:12px;font-weight:700">Taka ${numberToWords(x.amount)} Only</div></div>
    <table><tbody>${[['Received from', c.company || c.name], ['For', p.title + ' (' + p.id + ')'], ['Method', x.method + (x.ref !== '—' ? ' · ' + x.ref : '')], ['Received by', x.by], ['Total budget', tk(p.budget)], ['Total paid to date', tk(projPaid(p))], ['Remaining due', tk(projDue(p))]].map(r => `<tr><td style="color:#6E8084;width:40%">${r[0]}</td><td style="font-weight:700">${r[1]}</td></tr>`).join('')}</tbody></table>
    <div class="row between" style="margin-top:26px;align-items:flex-end"><span style="font-size:11.5px;color:#6E8084">Computer generated receipt.</span><div class="sign"><div class="s">Shoptik</div>Authorized</div></div>
  </div></div>
  <div class="modal-f no-print"><button class="btn" data-act="close">Close</button><a class="btn wa" target="_blank" href="${waLink(c.wa, `Payment received: ${tk(x.amount)} for ${p.title}. Receipt ${x.id}. Thank you! — Shoptik Production`)}">${ic('wa')} WhatsApp</a><button class="btn" data-act="send-mail" data-doc="${x.id}">${ic('mail')} Email</button><button class="btn primary" data-act="print">${ic('download')} Download PDF</button></div>`);
};
ACT['add-refund'] = () => openModal(modalHead('Refund entry', 'For cancelled bookings') + `<form data-submit="close-toast" data-msg="Refund recorded"><div class="modal-b"><div class="form-grid">
  <div class="field full"><label>Booking</label><select class="select">${projOptions('SP-2026-0040')}</select></div>
  <div class="field"><label>Refund amount</label><input class="input" type="number" value="25000"></div><div class="field"><label>Method</label><select class="select"><option>bKash</option><option>Bank Transfer</option><option>Cash</option></select></div>
  <div class="field full"><label>Reason</label><textarea class="input">Event postponed indefinitely — 50% of advance refunded as per terms.</textarea></div></div></div>
  <div class="modal-f"><button type="button" class="btn" data-act="close">Cancel</button><button class="btn primary">Save refund</button></div></form>`);
ACT['close-toast'] = f => { closeModal(); toast(f.dataset.msg || 'Saved'); };

ACT['add-expense'] = el => openModal(modalHead('Add Expense', 'Link it to a project to see project-wise profit') + `
  <form data-submit="save-expense"><div class="modal-b"><div class="form-grid">
    <div class="field"><label>Amount (৳)</label><input class="input" name="amount" type="number" required value="4500"></div>
    <div class="field"><label>Date</label><input class="input" name="date" type="date" value="${TODAY}"></div>
    <div class="field"><label>Category</label><select class="select" name="cat">${['Transport', 'Food', 'Equipment Purchase', 'Equipment Rent', 'Equipment Repair', 'Office Rent', 'Utility', 'Internet', 'Marketing / Ads', 'Software Subscription', 'Freelancer Payment', 'Others'].map(c => `<option>${c}</option>`).join('')}</select></div>
    <div class="field"><label>Method</label><select class="select" name="method">${['Cash', 'bKash', 'Nagad', 'Bank Transfer', 'Card'].map(c => `<option>${c}</option>`).join('')}</select></div>
    <div class="field"><label>Paid to</label><input class="input" name="to" value="Crew transport"></div>
    <div class="field"><label>Linked project</label><select class="select" name="pid"><option value="">— Office / none —</option>${projOptions(el.dataset.pid)}</select></div>
    <div class="field full"><label>Note</label><input class="input" name="note"></div>
    <div class="field full row" style="gap:10px"><span class="toggle" data-act="toggle"></span><span class="small strong">Recurring monthly</span><span class="muted small">(rent, internet, software)</span></div>
    <div class="field full"><div class="upload">${ic('upload')}Receipt / voucher photo</div></div>
  </div></div>
  <div class="modal-f"><button type="button" class="btn" data-act="close">Cancel</button><button class="btn primary">${ic('check')} Save expense</button></div></form>`);
ACT['save-expense'] = f => { const d = Object.fromEntries(new FormData(f)); DB.expenses.unshift({ id: 'EX-0413', date: d.date, cat: d.cat, amount: +d.amount, method: d.method, to: d.to, pid: d.pid, note: d.note }); closeModal(); render(); toast(`Expense ${tk(+d.amount)} added`); };

ACT['new-client'] = el => {
  const c = el.dataset.edit ? client(el.dataset.edit) : {};
  openModal(modalHead(c.id ? 'Edit client' : 'New Client', 'Duplicate phone/email is checked automatically') + `
  <form data-submit="save-client"><div class="modal-b"><div class="form-grid">
    <div class="field full"><label>Client type</label><div class="seg" style="width:max-content">${['Individual', 'Corporate', 'Agency'].map((t, i) => `<button type="button" class="${(c.type || 'Individual') === t ? 'on' : ''}" data-act="pick-seg">${t}</button>`).join('')}</div></div>
    <div class="field"><label>Name</label><input class="input" name="name" required value="${esc(c.name || '')}" placeholder="Full name or company"></div>
    <div class="field"><label>Company / organization</label><input class="input" name="company" value="${esc(c.company || '')}"></div>
    <div class="field"><label>Phone</label><input class="input" name="phone" required value="${c.phone || ''}" placeholder="01XXXXXXXXX" data-change="dup-check"></div>
    <div class="field"><label>WhatsApp (if different)</label><input class="input" name="wa" value="${c.wa || ''}"></div>
    <div class="field full" id="dup-warn"></div>
    <div class="field"><label>Email</label><input class="input" name="email" type="email" value="${c.email || ''}"></div>
    <div class="field"><label>Source</label><select class="select" name="source">${['Facebook', 'Instagram', 'Referral', 'Walk-in', 'Website', 'Other'].map(s => `<option ${c.source === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
    <div class="field full"><label>Address</label><input class="input" name="address" value="${esc(c.address || '')}"></div>
    <div class="field full"><label>Tags</label><div class="row wrap" style="gap:6px">${['VIP', 'Repeat', 'Corporate', 'Discount'].map(t => `<span class="chip ${(c.tags || []).includes(t) ? 'on' : ''}" data-act="toggle">${t}</span>`).join('')}</div></div>
    <div class="field full"><label>Notes</label><textarea class="input" name="notes" style="min-height:60px"></textarea></div>
  </div></div>
  <div class="modal-f"><button type="button" class="btn" data-act="close">Cancel</button><button class="btn primary">${ic('check')} Save client</button></div></form>`);
};
ACT['pick-seg'] = el => $$('button', el.parentElement).forEach(b => b.classList.toggle('on', b === el));
ACT['chg-dup-check'] = el => { const v = el.value.replace(/\D/g, ''); const hit = DB.clients.find(c => c.phone === v); $('#dup-warn').innerHTML = hit ? `<div class="warn">${ic('alert')}<div>A client with this phone already exists: <b>${hit.name}</b>. <a href="#/clients/${hit.id}" style="text-decoration:underline">Open profile</a></div></div>` : ''; };
ACT['save-client'] = f => {
  const d = Object.fromEntries(new FormData(f));
  const dup = DB.clients.find(c => c.phone === d.phone.replace(/\D/g, ''));
  if (dup && !location.hash.includes(dup.id)) { $('#dup-warn').innerHTML = `<div class="warn red">${ic('alert')}<div>Duplicate! <b>${dup.name}</b> already uses this phone.</div></div>`; return; }
  const type = $('.modal .seg .on')?.textContent || 'Individual';
  const id = 'c' + (DB.clients.length + 1);
  DB.clients.unshift({ id, name: d.name, phone: d.phone.replace(/\D/g, ''), wa: d.wa || d.phone, email: d.email, company: d.company, type, source: d.source, tags: [], address: d.address || 'Dhaka', since: TODAY });
  closeModal(); toast(`Client “${d.name}” saved`); location.hash = '#/clients/' + id;
};

ACT['send-mail'] = el => {
  const doc = el.dataset.doc || 'invoice';
  const { parts } = parseHash();
  const p = parts[0] === 'projects' && parts[1] ? project(parts[1]) : DB.invoices.find(i => i.id === doc) ? project(DB.invoices.find(i => i.id === doc).pid) : project('SP-2026-0041');
  const c = client(p.clientId);
  openModal(modalHead('Send Mail', 'Uses the template from Settings → Email templates') + `
  <form data-submit="sent-mail"><div class="modal-b col" style="gap:12px">
    <div class="field"><label>To</label><input class="input" value="${c.email}"></div>
    <div class="field"><label>Subject</label><input class="input" value="${doc === 'delivery' ? 'Your files are ready' : (doc.startsWith('Q') ? 'Quotation' : doc.startsWith('PAY') ? 'Money receipt' : 'Invoice')} ${doc !== 'delivery' && doc !== 'invoice' ? doc : ''} — ${esc(p.title)}"></div>
    <div class="field"><label>Message</label><textarea class="input" style="min-height:150px">Dear ${c.contact || c.name},

Please find attached the ${doc === 'delivery' ? 'delivery link for' : 'document for'} "${p.title}".
Total: ${tk(p.budget)} · Paid: ${tk(projPaid(p))} · Due: ${tk(projDue(p))}

Thank you for choosing Shoptik Production.
— Team Shoptik</textarea></div>
    <div class="row" style="padding:10px 12px;border:1px solid var(--line);border-radius:10px;gap:10px">${ic('paperclip')}<span class="grow small strong">${doc === 'delivery' ? 'Delivery link included' : (doc === 'invoice' ? DB.invoices.find(i => i.pid === p.id)?.id || 'Invoice' : doc) + '.pdf'}</span><span class="faint xs">PDF · 148 KB</span></div>
  </div>
  <div class="modal-f"><a class="btn wa" target="_blank" href="${waLink(c.wa, `Hello ${c.contact || c.name}, sharing your document from Shoptik Production.`)}">${ic('wa')} Send via WhatsApp</a><button class="btn primary">${ic('send')} Send email</button></div></form>`, 'lg');
};
ACT['sent-mail'] = () => { closeModal(); toast('Email sent · added to sent log', 'send'); };
