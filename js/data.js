/* Dummy data — no backend. Everything lives in memory for the demo. */
const TODAY = '2026-11-18';

const DB = {
  company: {
    name: 'Shoptik Production', tagline: 'Film · Photo · Post',
    address: 'House 27, Road 11, Banani, Dhaka 1213', phone: '+880 1711-000222',
    email: 'hello@shoptikproduction.com', website: 'shoptikproduction.com', bin: '004512398-0101',
  },

  team: [
    { id: 't1', name: 'Arif Hossain', roles: ['Videographer', 'Manager'], type: 'Permanent', rate: 55000, rateUnit: 'month', phone: '01711234567', email: 'arif@shoptik.com', joined: '2022-03-01', status: 'Active', earned: 660000, paid: 605000, advance: 0, done: 48, onTime: 96 },
    { id: 't2', name: 'Tanvir Ahmed', roles: ['Photographer'], type: 'Permanent', rate: 40000, rateUnit: 'month', phone: '01819456789', email: 'tanvir@shoptik.com', joined: '2023-01-15', status: 'Active', earned: 480000, paid: 440000, advance: 5000, done: 41, onTime: 92 },
    { id: 't3', name: 'Sabbir Rahman', roles: ['Drone Operator', 'Videographer'], type: 'Freelancer', rate: 8000, rateUnit: 'day', phone: '01912345678', email: 'sabbir.drone@gmail.com', joined: '2023-08-10', status: 'Active', earned: 212000, paid: 188000, advance: 0, done: 27, onTime: 100 },
    { id: 't4', name: 'Nadia Islam', roles: ['Editor', 'Colorist'], type: 'Permanent', rate: 45000, rateUnit: 'month', phone: '01633987654', email: 'nadia@shoptik.com', joined: '2022-11-01', status: 'Active', earned: 540000, paid: 495000, advance: 0, done: 63, onTime: 88 },
    { id: 't5', name: 'Mahin Chowdhury', roles: ['Editor'], type: 'Freelancer', rate: 12000, rateUnit: 'project', phone: '01555123987', email: 'mahin.edits@gmail.com', joined: '2024-02-20', status: 'Active', earned: 156000, paid: 120000, advance: 10000, done: 19, onTime: 79 },
    { id: 't6', name: 'Rumana Akter', roles: ['Photographer'], type: 'Freelancer', rate: 7000, rateUnit: 'day', phone: '01744567321', email: 'rumana.clicks@gmail.com', joined: '2024-05-05', status: 'Active', earned: 133000, paid: 119000, advance: 0, done: 22, onTime: 95 },
    { id: 't7', name: 'Fahim Kabir', roles: ['Assistant', 'Light'], type: 'Permanent', rate: 22000, rateUnit: 'month', phone: '01899112233', email: 'fahim@shoptik.com', joined: '2024-01-10', status: 'Active', earned: 242000, paid: 242000, advance: 3000, done: 55, onTime: 98 },
    { id: 't8', name: 'Sadia Noor', roles: ['Graphics Designer'], type: 'Permanent', rate: 35000, rateUnit: 'month', phone: '01677889900', email: 'sadia@shoptik.com', joined: '2023-06-01', status: 'Active', earned: 385000, paid: 350000, advance: 0, done: 72, onTime: 94 },
    { id: 't9', name: 'Imran Hasan', roles: ['Videographer'], type: 'Freelancer', rate: 9000, rateUnit: 'day', phone: '01788776655', email: 'imran.films@gmail.com', joined: '2024-09-12', status: 'On Leave', earned: 99000, paid: 81000, advance: 0, done: 12, onTime: 91 },
    { id: 't10', name: 'Joy Das', roles: ['Colorist', 'Editor'], type: 'Freelancer', rate: 15000, rateUnit: 'project', phone: '01566554433', email: 'joy.grade@gmail.com', joined: '2025-01-03', status: 'Inactive', earned: 60000, paid: 60000, advance: 0, done: 5, onTime: 100 },
  ],

  clients: [
    { id: 'c1', name: 'Rafiq Islam', phone: '01711987654', wa: '01711987654', email: 'rafiq.islam@gmail.com', company: '', type: 'Individual', source: 'Facebook', tags: ['VIP'], address: 'Uttara Sector 7, Dhaka', since: '2026-08-02' },
    { id: 'c2', name: 'Meghna Textiles Ltd', contact: 'Shahriar Kabir', phone: '01819001122', wa: '01819001122', email: 'marketing@meghnatex.com.bd', company: 'Meghna Textiles Ltd', type: 'Corporate', source: 'Referral', tags: ['Repeat', 'VIP'], address: 'Tejgaon I/A, Dhaka', since: '2025-03-14' },
    { id: 'c3', name: 'Nexa Tech BD', contact: 'Farzana Haque', phone: '01912556677', wa: '01912556677', email: 'farzana@nexatech.com.bd', company: 'Nexa Tech BD', type: 'Corporate', source: 'Instagram', tags: [], address: 'Gulshan 2, Dhaka', since: '2026-09-21' },
    { id: 'c4', name: 'Sharmin Akter', phone: '01633445566', wa: '01633445566', email: 'sharmin.akter@yahoo.com', company: '', type: 'Individual', source: 'Instagram', tags: [], address: 'Dhanmondi 9/A, Dhaka', since: '2026-10-28' },
    { id: 'c5', name: 'Shohag Music', contact: 'Shohag Mia', phone: '01799887766', wa: '01799887766', email: 'shohagmusic.bd@gmail.com', company: 'Shohag Music', type: 'Agency', source: 'Referral', tags: ['Repeat'], address: 'Mirpur 10, Dhaka', since: '2025-11-02' },
    { id: 'c6', name: 'Green Valley Developers', contact: 'Kamal Uddin', phone: '01558899001', wa: '01558899001', email: 'sales@greenvalleybd.com', company: 'Green Valley Developers', type: 'Corporate', source: 'Walk-in', tags: [], address: 'Bashundhara R/A, Dhaka', since: '2026-11-10' },
    { id: 'c7', name: 'Tasnim Rahman', phone: '01877665544', wa: '01877665544', email: 'tasnim.r@gmail.com', company: '', type: 'Individual', source: 'Facebook', tags: [], address: 'Mohammadpur, Dhaka', since: '2026-07-19' },
    { id: 'c8', name: 'Kacchi House', contact: 'Rubel Hossain', phone: '01722334455', wa: '01722334455', email: 'kacchihouse.bd@gmail.com', company: 'Kacchi House Restaurant', type: 'Corporate', source: 'Facebook', tags: [], address: 'Old Dhaka, Dhaka', since: '2026-11-15' },
    { id: 'c9', name: 'Farhan Ahmed', phone: '01611223344', wa: '01611223344', email: 'farhan.ahmed@outlook.com', company: '', type: 'Individual', source: 'Referral', tags: ['VIP'], address: 'Baridhara DOHS, Dhaka', since: '2026-10-05' },
    { id: 'c10', name: 'Bloom Skincare', contact: 'Anika Sultana', phone: '01933221100', wa: '01933221100', email: 'hello@bloomskin.com.bd', company: 'Bloom Skincare', type: 'Corporate', source: 'Instagram', tags: ['Repeat'], address: 'Banani, Dhaka', since: '2025-06-11' },
    { id: 'c11', name: 'Startup Dhaka Network', contact: 'Mehedi Hasan', phone: '01844556677', wa: '01844556677', email: 'events@startupdhaka.net', company: 'Startup Dhaka Network', type: 'Agency', source: 'Referral', tags: [], address: 'Karwan Bazar, Dhaka', since: '2026-09-30' },
    { id: 'c12', name: 'Noor Couture', contact: 'Nabila Noor', phone: '01766112299', wa: '01766112299', email: 'studio@noorcouture.com', company: 'Noor Couture', type: 'Corporate', source: 'Instagram', tags: [], address: 'Gulshan 1, Dhaka', since: '2026-10-12' },
  ],

  services: [
    { id: 's1', name: 'Video Shoot', price: 25000, unit: 'per day', icon: 'video' },
    { id: 's2', name: 'Photography', price: 18000, unit: 'per day', icon: 'camera' },
    { id: 's3', name: 'Video Editing', price: 15000, unit: 'per project', icon: 'film' },
    { id: 's4', name: 'Graphics Design', price: 8000, unit: 'per project', icon: 'image' },
    { id: 's5', name: 'Drone', price: 12000, unit: 'per day', icon: 'drone' },
    { id: 's6', name: 'Live Streaming', price: 35000, unit: 'per event', icon: 'broadcast' },
  ],
  addons: [
    { id: 'a1', name: 'Editing', price: 15000 },
    { id: 'a2', name: 'Color grading', price: 10000 },
    { id: 'a3', name: 'Drone coverage', price: 12000 },
    { id: 'a4', name: 'Highlight reel', price: 12000 },
    { id: 'a5', name: 'Reels / Shorts (5)', price: 8000 },
    { id: 'a6', name: 'Photo album (print)', price: 14000 },
    { id: 'a7', name: 'Extra hour', price: 4000 },
    { id: 'a8', name: 'Same-day edit', price: 18000 },
    { id: 'a9', name: 'Raw footage handover', price: 5000 },
  ],
  crewRates: [
    { role: 'Photographer', rate: 7000 }, { role: 'Videographer', rate: 9000 }, { role: 'Drone Operator', rate: 8000 },
    { role: 'Assistant / Light', rate: 3000 }, { role: 'Editor', rate: 12000 },
  ],
  packages: [
    { id: 'p1', name: 'Wedding Gold', price: 185000, items: ['2 Photographer', '2 Videographer', 'Drone', 'Highlight video', '300 edited photos'] },
    { id: 'p2', name: 'Wedding Silver', price: 120000, items: ['1 Photographer', '1 Videographer', 'Highlight video', '200 edited photos'] },
    { id: 'p3', name: 'Corporate Event', price: 95000, items: ['2 Videographer', '1 Photographer', 'Event recap film', 'Same-day reel'] },
    { id: 'p4', name: 'Product Shoot Pro', price: 60000, items: ['Studio day', '30 product photos', '3 Reels', 'Color grading'] },
  ],

  projects: [
    { id: 'SP-2026-0041', title: 'Rafiq & Nusrat Wedding', clientId: 'c1', type: 'Wedding', status: 'Confirmed', services: ['Video Shoot', 'Photography', 'Drone'], package: 'Wedding Gold',
      sessions: [
        { name: 'Gaye Holud', date: '2026-11-18', start: '16:00', end: '22:00', location: 'Gulshan Club, Dhaka', team: ['t1', 't2', 't3', 't7'] },
        { name: 'Biye', date: '2026-11-20', start: '18:00', end: '23:00', location: 'Senakunja, Dhaka Cantonment', team: ['t1', 't2', 't6', 't3', 't7'] },
        { name: 'Reception', date: '2026-11-22', start: '19:00', end: '23:00', location: 'Radisson Blu, Dhaka', team: ['t1', 't2', 't7'] },
      ],
      addons: ['Highlight reel', 'Color grading', 'Photo album (print)'], budget: 285000, paid: 150000, editDeadline: '2026-12-02', delivery: '2026-12-10', progress: 25,
      deliverables: [['1 Cinematic highlight (4–5 min)', false], ['Full ceremony film', false], ['350 edited photos', false], ['Photo album (40 pages)', false]] },
    { id: 'SP-2026-0042', title: 'Meghna Textiles — Brand Film', clientId: 'c2', type: 'Corporate', status: 'Confirmed', services: ['Video Shoot', 'Drone', 'Video Editing'],
      sessions: [{ name: 'Factory shoot', date: '2026-11-19', start: '09:00', end: '17:00', location: 'Meghna Textiles, Narayanganj', team: ['t9', 't3', 't7'] }],
      addons: ['Color grading', 'Reels / Shorts (5)'], budget: 180000, paid: 90000, editDeadline: '2026-11-28', delivery: '2026-12-03', progress: 15,
      deliverables: [['Brand film (2 min)', false], ['30s cut-down', false], ['5 vertical reels', false]] },
    { id: 'SP-2026-0039', title: 'Nexa Tech Product Launch', clientId: 'c3', type: 'Product', status: 'In Editing', services: ['Video Shoot', 'Photography', 'Video Editing'],
      sessions: [{ name: 'Launch event', date: '2026-11-12', start: '15:00', end: '21:00', location: 'ICCB Hall 3, Dhaka', team: ['t1', 't2', 't7'] }],
      addons: ['Same-day edit', 'Highlight reel'], budget: 145000, paid: 100000, editDeadline: '2026-11-21', delivery: '2026-11-24', progress: 60,
      deliverables: [['Event recap (3 min)', true], ['Product teaser (45s)', false], ['120 event photos', true]] },
    { id: 'SP-2026-0043', title: "Ayaan's 1st Birthday", clientId: 'c4', type: 'Birthday', status: 'Confirmed', services: ['Photography', 'Video Shoot'],
      sessions: [{ name: 'Birthday party', date: '2026-11-23', start: '17:00', end: '21:00', location: 'The Westin, Gulshan', team: ['t6', 't9'] }],
      addons: ['Highlight reel'], budget: 48000, paid: 20000, editDeadline: '2026-11-30', delivery: '2026-12-04', progress: 10,
      deliverables: [['Highlight video (2 min)', false], ['150 edited photos', false]] },
    { id: 'SP-2026-0037', title: "Shohag — 'Megh Brishti' Music Video", clientId: 'c5', type: 'Music Video', status: 'In Editing', services: ['Video Shoot', 'Drone', 'Video Editing'],
      sessions: [{ name: 'Day 1 — Sreemangal', date: '2026-11-08', start: '06:00', end: '18:00', location: 'Sreemangal Tea Garden', team: ['t1', 't3', 't7'] }, { name: 'Day 2 — Studio', date: '2026-11-09', start: '10:00', end: '20:00', location: 'Shoptik Studio, Banani', team: ['t1', 't7'] }],
      addons: ['Color grading', 'Reels / Shorts (5)'], budget: 220000, paid: 150000, editDeadline: '2026-11-19', delivery: '2026-11-25', progress: 70,
      deliverables: [['Music video (4:12)', false], ['Teaser (30s)', true], ['5 reels', false]] },
    { id: 'SP-2026-0044', title: 'Green Valley Apartments Walkthrough', clientId: 'c6', type: 'Real Estate', status: 'Quotation Sent', services: ['Drone', 'Video Shoot', 'Photography'],
      sessions: [{ name: 'Site shoot', date: '2026-11-26', start: '07:00', end: '13:00', location: 'Green Valley, Bashundhara Block K', team: ['t3', 't2'] }],
      addons: ['Color grading'], budget: 75000, paid: 0, editDeadline: '2026-12-01', delivery: '2026-12-04', progress: 0,
      deliverables: [['Walkthrough film (90s)', false], ['40 interior photos', false]] },
    { id: 'SP-2026-0035', title: 'Tasnim & Rehan Wedding', clientId: 'c7', type: 'Wedding', status: 'Review / Revision', services: ['Video Shoot', 'Photography'],
      sessions: [{ name: 'Biye', date: '2026-10-30', start: '18:00', end: '23:00', location: 'Bashundhara Convention Center', team: ['t1', 't2', 't6'] }],
      addons: ['Highlight reel', 'Photo album (print)'], budget: 160000, paid: 130000, editDeadline: '2026-11-15', delivery: '2026-11-20', progress: 85,
      deliverables: [['Highlight film', true], ['Full film', true], ['300 edited photos', true], ['Album print', false]] },
    { id: 'SP-2026-0045', title: 'Kacchi House — Menu Shoot', clientId: 'c8', type: 'Product', status: 'Inquiry', services: ['Photography', 'Video Shoot'],
      sessions: [{ name: 'Food shoot', date: '2026-12-02', start: '11:00', end: '17:00', location: 'Kacchi House, Old Dhaka', team: [] }],
      addons: ['Reels / Shorts (5)'], budget: 55000, paid: 0, editDeadline: '2026-12-08', delivery: '2026-12-10', progress: 0,
      deliverables: [['40 menu photos', false], ['5 food reels', false]] },
    { id: 'SP-2026-0046', title: 'Farhan & Mithila Wedding', clientId: 'c9', type: 'Wedding', status: 'Confirmed', services: ['Video Shoot', 'Photography', 'Drone'], package: 'Wedding Gold',
      sessions: [
        { name: 'Gaye Holud', date: '2026-12-12', start: '16:00', end: '22:00', location: 'Baridhara DOHS Convention Hall', team: ['t1', 't2', 't7'] },
        { name: 'Biye', date: '2026-12-14', start: '18:00', end: '23:00', location: 'Le Méridien, Dhaka', team: ['t1', 't2', 't6', 't3', 't7'] },
        { name: 'Reception', date: '2026-12-16', start: '19:00', end: '23:00', location: 'Army Golf Club, Dhaka', team: ['t1', 't2', 't7'] },
      ],
      addons: ['Highlight reel', 'Same-day edit', 'Photo album (print)'], budget: 320000, paid: 160000, editDeadline: '2026-12-28', delivery: '2027-01-05', progress: 5,
      deliverables: [['Highlight film', false], ['Same-day edit', false], ['400 edited photos', false], ['Album', false]] },
    { id: 'SP-2026-0031', title: 'Meghna Textiles — AGM 2026', clientId: 'c2', type: 'Corporate', status: 'Delivered', services: ['Video Shoot', 'Live Streaming'],
      sessions: [{ name: 'AGM', date: '2026-10-14', start: '10:00', end: '16:00', location: 'Pan Pacific Sonargaon', team: ['t1', 't9', 't7'] }],
      addons: ['Highlight reel'], budget: 135000, paid: 135000, editDeadline: '2026-10-20', delivery: '2026-10-24', progress: 100,
      deliverables: [['Live stream', true], ['Recap film', true]] },
    { id: 'SP-2026-0028', title: 'Bloom Skincare — Reels Pack', clientId: 'c10', type: 'Product', status: 'Closed', services: ['Video Shoot', 'Video Editing'],
      sessions: [{ name: 'Studio day', date: '2026-09-28', start: '10:00', end: '18:00', location: 'Shoptik Studio, Banani', team: ['t9', 't7'] }],
      addons: ['Reels / Shorts (5)', 'Color grading'], budget: 68000, paid: 68000, editDeadline: '2026-10-04', delivery: '2026-10-06', progress: 100,
      deliverables: [['10 product reels', true]] },
    { id: 'SP-2026-0040', title: 'Dhaka Startup Summit 2026', clientId: 'c11', type: 'Corporate', status: 'On Hold', services: ['Live Streaming', 'Video Shoot', 'Photography'],
      sessions: [{ name: 'Summit day', date: '2026-12-05', start: '09:00', end: '19:00', location: 'Bangabandhu Int. Conference Center', team: ['t1', 't9', 't2'] }],
      addons: ['Same-day edit'], budget: 210000, paid: 50000, editDeadline: '2026-12-09', delivery: '2026-12-12', progress: 0,
      deliverables: [['Live stream (2 cameras)', false], ['Recap film', false]] },
    { id: 'SP-2026-0038', title: 'Noor Couture — Winter Lookbook', clientId: 'c12', type: 'Product', status: 'In Editing', services: ['Photography', 'Video Shoot'],
      sessions: [{ name: 'Lookbook shoot', date: '2026-11-05', start: '09:00', end: '18:00', location: 'Shoptik Studio, Banani', team: ['t2', 't6', 't7'] }],
      addons: ['Color grading', 'Reels / Shorts (5)'], budget: 95000, paid: 60000, editDeadline: '2026-11-16', delivery: '2026-11-20', progress: 55,
      deliverables: [['60 retouched looks', false], ['Campaign film (60s)', false]] },
  ],

  tasks: [
    { id: 'k1', title: 'Shoot — Gaye Holud', pid: 'SP-2026-0041', who: 't1', role: 'Videographer', start: '2026-11-18', due: '2026-11-18', prio: 'high', status: 'In Progress', checklist: [3, 5] },
    { id: 'k2', title: 'Backup Holud footage (2 drives)', pid: 'SP-2026-0041', who: 't7', role: 'Assistant', start: '2026-11-19', due: '2026-11-19', prio: 'high', status: 'To Do', checklist: [0, 2] },
    { id: 'k3', title: 'Final color grade', pid: 'SP-2026-0037', who: 't4', role: 'Colorist', start: '2026-11-15', due: '2026-11-19', prio: 'high', status: 'In Progress', checklist: [4, 6] },
    { id: 'k4', title: 'Music video — final edit', pid: 'SP-2026-0037', who: 't5', role: 'Editor', start: '2026-11-10', due: '2026-11-18', prio: 'high', status: 'In Review', checklist: [5, 5] },
    { id: 'k5', title: 'Product teaser edit (45s)', pid: 'SP-2026-0039', who: 't4', role: 'Editor', start: '2026-11-14', due: '2026-11-21', prio: 'medium', status: 'In Progress', checklist: [2, 4] },
    { id: 'k6', title: 'Lookbook retouch — batch 2', pid: 'SP-2026-0038', who: 't8', role: 'Graphics Designer', start: '2026-11-08', due: '2026-11-16', prio: 'high', status: 'In Progress', checklist: [1, 3] },
    { id: 'k7', title: 'Album design revision', pid: 'SP-2026-0035', who: 't8', role: 'Graphics Designer', start: '2026-11-16', due: '2026-11-20', prio: 'medium', status: 'Revision', checklist: [2, 3] },
    { id: 'k8', title: 'Recce — Narayanganj factory', pid: 'SP-2026-0042', who: 't9', role: 'Videographer', start: '2026-11-17', due: '2026-11-17', prio: 'medium', status: 'Completed', checklist: [4, 4] },
    { id: 'k9', title: 'Drone permit & flight plan', pid: 'SP-2026-0042', who: 't3', role: 'Drone Operator', start: '2026-11-16', due: '2026-11-18', prio: 'high', status: 'Completed', checklist: [3, 3] },
    { id: 'k10', title: 'Photo selection — event', pid: 'SP-2026-0039', who: 't2', role: 'Photographer', start: '2026-11-13', due: '2026-11-15', prio: 'low', status: 'Completed', checklist: [2, 2] },
    { id: 'k11', title: 'Shot list & moodboard', pid: 'SP-2026-0046', who: 't1', role: 'Videographer', start: '2026-11-25', due: '2026-12-05', prio: 'low', status: 'To Do', checklist: [0, 4] },
    { id: 'k12', title: 'Reels cut-downs (5)', pid: 'SP-2026-0037', who: 't5', role: 'Editor', start: '2026-11-19', due: '2026-11-23', prio: 'medium', status: 'To Do', checklist: [0, 5] },
    { id: 'k13', title: 'Client review call', pid: 'SP-2026-0035', who: 't1', role: 'Manager', start: '2026-11-19', due: '2026-11-19', prio: 'medium', status: 'To Do', checklist: [0, 1] },
    { id: 'k14', title: 'Campaign film edit', pid: 'SP-2026-0038', who: 't4', role: 'Editor', start: '2026-11-12', due: '2026-11-17', prio: 'high', status: 'Revision', checklist: [3, 4] },
  ],

  payments: [
    { id: 'PAY-0188', pid: 'SP-2026-0041', date: '2026-11-17', amount: 50000, method: 'bKash', ref: 'BK8XN21QA9', by: 'Arif Hossain', note: '2nd installment' },
    { id: 'PAY-0187', pid: 'SP-2026-0042', date: '2026-11-15', amount: 90000, method: 'Bank Transfer', ref: 'EBL-554120', by: 'Owner', note: 'Advance 50%' },
    { id: 'PAY-0186', pid: 'SP-2026-0046', date: '2026-11-12', amount: 160000, method: 'Bank Transfer', ref: 'CITY-88123', by: 'Owner', note: 'Advance 50%' },
    { id: 'PAY-0185', pid: 'SP-2026-0039', date: '2026-11-12', amount: 45000, method: 'Cheque', ref: 'CHQ 0045521', by: 'Owner', note: 'Shoot day' },
    { id: 'PAY-0184', pid: 'SP-2026-0035', date: '2026-11-08', amount: 50000, method: 'Nagad', ref: 'NG71KQ0021', by: 'Arif Hossain', note: '' },
    { id: 'PAY-0183', pid: 'SP-2026-0040', date: '2026-11-04', amount: 50000, method: 'Bank Transfer', ref: 'DBBL-77102', by: 'Owner', note: 'Booking advance' },
    { id: 'PAY-0182', pid: 'SP-2026-0038', date: '2026-11-03', amount: 60000, method: 'Card', ref: 'POS-11982', by: 'Owner', note: '' },
    { id: 'PAY-0181', pid: 'SP-2026-0043', date: '2026-10-30', amount: 20000, method: 'bKash', ref: 'BK7HN10PL2', by: 'Arif Hossain', note: 'Advance' },
    { id: 'PAY-0180', pid: 'SP-2026-0037', date: '2026-10-28', amount: 100000, method: 'Cash', ref: '—', by: 'Owner', note: 'Advance' },
    { id: 'PAY-0179', pid: 'SP-2026-0041', date: '2026-10-25', amount: 100000, method: 'Bank Transfer', ref: 'BRAC-201193', by: 'Owner', note: 'Booking advance' },
    { id: 'PAY-0178', pid: 'SP-2026-0031', date: '2026-10-24', amount: 67500, method: 'Bank Transfer', ref: 'EBL-551003', by: 'Owner', note: 'Final' },
    { id: 'PAY-0177', pid: 'SP-2026-0039', date: '2026-10-20', amount: 55000, method: 'Bank Transfer', ref: 'CITY-87011', by: 'Owner', note: 'Advance' },
    { id: 'PAY-0176', pid: 'SP-2026-0037', date: '2026-11-10', amount: 50000, method: 'bKash', ref: 'BK6TT91MM0', by: 'Arif Hossain', note: 'Shoot done' },
    { id: 'PAY-0175', pid: 'SP-2026-0035', date: '2026-10-12', amount: 80000, method: 'Cash', ref: '—', by: 'Owner', note: 'Advance' },
    { id: 'PAY-0174', pid: 'SP-2026-0031', date: '2026-10-02', amount: 67500, method: 'Bank Transfer', ref: 'EBL-549872', by: 'Owner', note: 'Advance' },
    { id: 'PAY-0173', pid: 'SP-2026-0028', date: '2026-10-06', amount: 68000, method: 'Rocket', ref: 'RK0091273', by: 'Owner', note: 'Full payment' },
  ],

  expenses: [
    { id: 'EX-0412', date: '2026-11-18', cat: 'Transport', amount: 6500, method: 'Cash', to: 'Microbus rental', pid: 'SP-2026-0041', note: 'Holud — crew transport' },
    { id: 'EX-0411', date: '2026-11-17', cat: 'Equipment Rent', amount: 12000, method: 'bKash', to: 'Lens House BD', pid: 'SP-2026-0042', note: '24-70 GM + gimbal' },
    { id: 'EX-0410', date: '2026-11-15', cat: 'Software Subscription', amount: 7800, method: 'Card', to: 'Adobe CC', pid: '', note: 'Monthly · recurring' },
    { id: 'EX-0409', date: '2026-11-12', cat: 'Food', amount: 3400, method: 'Cash', to: 'Crew lunch', pid: 'SP-2026-0039', note: '' },
    { id: 'EX-0408', date: '2026-11-10', cat: 'Freelancer Payment', amount: 9000, method: 'bKash', to: 'Extra light assistant', pid: 'SP-2026-0037', note: '' },
    { id: 'EX-0407', date: '2026-11-08', cat: 'Transport', amount: 14500, method: 'Cash', to: 'Sreemangal trip', pid: 'SP-2026-0037', note: 'Fuel + toll' },
    { id: 'EX-0406', date: '2026-11-05', cat: 'Equipment Repair', amount: 8500, method: 'Cash', to: 'Camera service center', pid: '', note: 'FX3 sensor clean' },
    { id: 'EX-0405', date: '2026-11-01', cat: 'Office Rent', amount: 65000, method: 'Bank Transfer', to: 'Landlord', pid: '', note: 'Monthly · recurring' },
    { id: 'EX-0404', date: '2026-11-01', cat: 'Internet', amount: 3500, method: 'bKash', to: 'Link3', pid: '', note: 'Monthly · recurring' },
    { id: 'EX-0403', date: '2026-11-01', cat: 'Utility', amount: 7200, method: 'bKash', to: 'DESCO', pid: '', note: '' },
    { id: 'EX-0402', date: '2026-10-29', cat: 'Marketing / Ads', amount: 15000, method: 'Card', to: 'Meta Ads', pid: '', note: 'Wedding season campaign' },
    { id: 'EX-0401', date: '2026-10-22', cat: 'Equipment Purchase', amount: 48000, method: 'Bank Transfer', to: 'Star Tech', pid: '', note: 'Godox AD600 Pro' },
  ],

  payouts: [
    { id: 'PO-0096', who: 't3', date: '2026-11-16', amount: 16000, type: 'Per project', pids: ['SP-2026-0037'], bonus: 0, deduction: 0, method: 'bKash' },
    { id: 'PO-0095', who: 't5', date: '2026-11-14', amount: 12000, type: 'Per project', pids: ['SP-2026-0039'], bonus: 0, deduction: 2000, method: 'bKash' },
    { id: 'PO-0094', who: 't6', date: '2026-11-10', amount: 14000, type: 'Per project', pids: ['SP-2026-0038'], bonus: 0, deduction: 0, method: 'Nagad' },
    { id: 'PO-0093', who: 't1', date: '2026-11-01', amount: 55000, type: 'Salary', pids: [], bonus: 0, deduction: 0, method: 'Bank Transfer' },
    { id: 'PO-0092', who: 't2', date: '2026-11-01', amount: 40000, type: 'Salary', pids: [], bonus: 0, deduction: 5000, method: 'Bank Transfer' },
    { id: 'PO-0091', who: 't4', date: '2026-11-01', amount: 45000, type: 'Salary', pids: [], bonus: 3000, deduction: 0, method: 'Bank Transfer' },
    { id: 'PO-0090', who: 't7', date: '2026-11-01', amount: 22000, type: 'Salary', pids: [], bonus: 0, deduction: 0, method: 'Bank Transfer' },
    { id: 'PO-0089', who: 't8', date: '2026-11-01', amount: 35000, type: 'Salary', pids: [], bonus: 0, deduction: 0, method: 'Bank Transfer' },
    { id: 'PO-0088', who: 't9', date: '2026-10-26', amount: 27000, type: 'Per project', pids: ['SP-2026-0031'], bonus: 2000, deduction: 0, method: 'bKash' },
  ],
  payables: [
    { who: 't3', pid: 'SP-2026-0041', amount: 24000 }, { who: 't6', pid: 'SP-2026-0035', amount: 7000 },
    { who: 't5', pid: 'SP-2026-0037', amount: 12000 }, { who: 't9', pid: 'SP-2026-0028', amount: 18000 },
  ],

  equipment: [
    { id: 'EQ-01', name: 'Sony FX3', cat: 'Camera', serial: 'FX3-4471209', bought: '2024-02-11', price: 465000, cond: 'Excellent', status: 'Checked out', pid: 'SP-2026-0041' },
    { id: 'EQ-02', name: 'Sony A7 IV', cat: 'Camera', serial: 'A74-8812034', bought: '2023-06-20', price: 285000, cond: 'Good', status: 'Checked out', pid: 'SP-2026-0041' },
    { id: 'EQ-03', name: 'Canon R6 Mark II', cat: 'Camera', serial: 'R6M2-201188', bought: '2024-08-02', price: 310000, cond: 'Excellent', status: 'Available', pid: '' },
    { id: 'EQ-04', name: 'Sony 24-70mm f/2.8 GM II', cat: 'Lens', serial: 'SEL-2470-5521', bought: '2024-02-11', price: 245000, cond: 'Excellent', status: 'Checked out', pid: 'SP-2026-0041' },
    { id: 'EQ-05', name: 'Sigma 35mm f/1.4 Art', cat: 'Lens', serial: 'SG35-998120', bought: '2023-03-05', price: 92000, cond: 'Good', status: 'Available', pid: '' },
    { id: 'EQ-06', name: 'DJI Mavic 3 Pro', cat: 'Drone', serial: 'M3P-1CQ88213', bought: '2024-05-14', price: 330000, cond: 'Good', status: 'Checked out', pid: 'SP-2026-0041' },
    { id: 'EQ-07', name: 'DJI RS 4 Pro', cat: 'Gimbal', serial: 'RS4P-77120', bought: '2024-09-01', price: 98000, cond: 'Excellent', status: 'Available', pid: '' },
    { id: 'EQ-08', name: 'Aputure 600d Pro', cat: 'Light', serial: 'AP600-31092', bought: '2023-11-12', price: 175000, cond: 'Fair', status: 'Maintenance', pid: '' },
    { id: 'EQ-09', name: 'Godox AD600 Pro', cat: 'Light', serial: 'GDX-600-8812', bought: '2026-10-22', price: 48000, cond: 'Excellent', status: 'Available', pid: '' },
    { id: 'EQ-10', name: 'Rode Wireless PRO', cat: 'Audio', serial: 'RWP-55102', bought: '2024-03-19', price: 42000, cond: 'Good', status: 'Checked out', pid: 'SP-2026-0042' },
    { id: 'EQ-11', name: 'Samsung T7 2TB (x4)', cat: 'Storage', serial: 'T7-SET-04', bought: '2024-01-08', price: 64000, cond: 'Good', status: 'Available', pid: '' },
    { id: 'EQ-12', name: 'DJI Ronin 4D (rented)', cat: 'Camera', serial: 'RENT-LH-0091', bought: '—', price: 0, cond: 'Rented', status: 'Rented', pid: 'SP-2026-0042' },
  ],

  notices: [
    { id: 'n1', title: 'Wedding season dress code', body: 'All crew on wedding shoots this season: black formal shirt, black trousers, clean shoes. Shoptik ID card must be visible at the venue.', prio: 'Urgent', to: 'All members', date: '2026-11-17', read: 7, total: 9, unreadBy: ['t5', 't9'] },
    { id: 'n2', title: 'Holud shoot — call time 2:30 PM', body: 'Crew for Rafiq & Nusrat Gaye Holud: report at Gulshan Club by 2:30 PM sharp. Batteries charged, cards formatted.', prio: 'Urgent', to: 'Assigned crew', date: '2026-11-18', read: 3, total: 4, unreadBy: ['t3'] },
    { id: 'n3', title: 'New backup policy (3-2-1)', body: 'From today, every shoot must be backed up to 2 drives + cloud within 24 hours. Use the backup checklist in each task.', prio: 'Normal', to: 'All members', date: '2026-11-10', read: 9, total: 9, unreadBy: [] },
    { id: 'n4', title: 'November salary disbursed', body: 'November salaries have been transferred. Check your payout slip in My Payouts.', prio: 'Normal', to: 'Permanent staff', date: '2026-11-01', read: 5, total: 6, unreadBy: ['t8'] },
    { id: 'n5', title: 'Editor sync every Monday 11 AM', body: 'Weekly editing pipeline review — Google Meet link in calendar.', prio: 'Normal', to: 'Editors', date: '2026-10-27', read: 4, total: 4, unreadBy: [] },
  ],

  activity: [
    { who: 'Arif Hossain', what: 'added payment ৳50,000 (bKash) to', target: 'Rafiq & Nusrat Wedding', time: '2h ago', icon: 'wallet' },
    { who: 'Mahin Chowdhury', what: 'moved "Music video — final edit" to', target: 'In Review', time: '3h ago', icon: 'check' },
    { who: 'Owner', what: 'created booking', target: 'Kacchi House — Menu Shoot', time: '5h ago', icon: 'film' },
    { who: 'Sabbir Rahman', what: 'completed "Drone permit & flight plan" for', target: 'Meghna Textiles', time: 'Yesterday', icon: 'check' },
    { who: 'Owner', what: 'sent quotation Q-2026-0061 to', target: 'Green Valley Developers', time: 'Yesterday', icon: 'mail' },
    { who: 'Nadia Islam', what: 'uploaded preview link for', target: 'Nexa Tech Product Launch', time: '2 days ago', icon: 'link' },
  ],

  notifications: [
    { t: 'Editing deadline tomorrow', s: "Shohag — 'Megh Brishti' Music Video", time: '10 min', icon: 'alert', tone: 'amber', unread: true, href: '#/projects/SP-2026-0037' },
    { t: 'Task overdue', s: 'Lookbook retouch — batch 2 (Sadia Noor)', time: '1h', icon: 'clock', tone: 'red', unread: true, href: '#/tasks' },
    { t: 'Payment received ৳50,000', s: 'Rafiq Islam · bKash', time: '2h', icon: 'wallet', tone: 'green', unread: true, href: '#/payments' },
    { t: 'Equipment conflict', s: 'Sony FX3 is booked on 2 sessions on 20 Nov', time: '4h', icon: 'camera', tone: 'amber', unread: false, href: '#/equipment' },
    { t: 'New inquiry', s: 'Kacchi House — Menu Shoot', time: '5h', icon: 'film', tone: 'sage', unread: false, href: '#/projects/SP-2026-0045' },
  ],

  monthly: [
    { m: 'Jun', inc: 412000, exp: 238000 }, { m: 'Jul', inc: 368000, exp: 221000 }, { m: 'Aug', inc: 455000, exp: 252000 },
    { m: 'Sep', inc: 521000, exp: 268000 }, { m: 'Oct', inc: 698000, exp: 331000 }, { m: 'Nov', inc: 575000, exp: 304000 },
  ],

  quotations: [
    { id: 'Q-2026-0061', pid: 'SP-2026-0044', date: '2026-11-17', valid: '2026-11-30', amount: 75000, ver: 'v2', status: 'Sent' },
    { id: 'Q-2026-0062', pid: 'SP-2026-0045', date: '2026-11-18', valid: '2026-12-01', amount: 55000, ver: 'v1', status: 'Draft' },
    { id: 'Q-2026-0058', pid: 'SP-2026-0046', date: '2026-10-08', valid: '2026-10-22', amount: 320000, ver: 'v3', status: 'Converted' },
    { id: 'Q-2026-0057', pid: 'SP-2026-0040', date: '2026-10-02', valid: '2026-10-16', amount: 210000, ver: 'v1', status: 'Converted' },
    { id: 'Q-2026-0055', pid: 'SP-2026-0041', date: '2026-08-04', valid: '2026-08-18', amount: 285000, ver: 'v2', status: 'Converted' },
  ],

  emailLog: [
    { date: '2026-11-17 14:20', to: 'sales@greenvalleybd.com', subject: 'Quotation Q-2026-0061 — Green Valley Apartments Walkthrough', type: 'Quotation' },
    { date: '2026-11-17 11:05', to: 'rafiq.islam@gmail.com', subject: 'Money receipt PAY-0188 — ৳50,000 received', type: 'Receipt' },
    { date: '2026-11-15 09:40', to: 'marketing@meghnatex.com.bd', subject: 'Invoice INV-2026-0047 — Brand Film', type: 'Invoice' },
    { date: '2026-11-14 18:12', to: 'tasnim.r@gmail.com', subject: 'Reminder: ৳30,000 due on 20 Nov', type: 'Reminder' },
  ],
};

/* Invoices are derived from projects (1 per confirmed+ project) */
DB.invoices = DB.projects.filter(p => !['Inquiry', 'Quotation Sent'].includes(p.status)).map((p, i) => {
  const n = 40 + i;
  const issue = p.sessions[0].date < '2026-10-01' ? '2026-09-20' : addDays(p.sessions[0].date, -20);
  return { id: 'INV-2026-00' + n, pid: p.id, issue, due: p.delivery, amount: p.budget };
});
DB.invoices.forEach(i => { if (i.issue > TODAY) i.issue = '2026-11-10'; });

function addDays(iso, n) { const d = new Date(iso + 'T00:00:00'); d.setDate(d.getDate() + n); return isoOf(d); }
function isoOf(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
