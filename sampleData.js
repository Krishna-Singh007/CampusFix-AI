// CampusFix AI - Sample Data & Presets
window.CAMPUS_FIX_SAMPLE_DATA = {
  buildings: [
    { id: 'block-a', name: 'Block A (Admin & Dean Office)' },
    { id: 'block-b', name: 'Block B (Engineering & Labs)' },
    { id: 'block-c', name: 'Block C (Science & Humanities)' },
    { id: 'library', name: 'Central Library' },
    { id: 'sac', name: 'Student Activity Center / Cafeteria' },
    { id: 'hostel-boys', name: 'Boys Hostel Complex (BH 1 & 2)' },
    { id: 'hostel-girls', name: 'Girls Hostel Complex (GH 1 & 2)' },
    { id: 'sports', name: 'Sports Complex & Gymnasium' },
    { id: 'outdoors', name: 'Campus Pathways & Parking' }
  ],

  categories: [
    { id: 'Electrical', name: 'Electrical', icon: 'zap', color: 'amber', description: 'Lights, fans, wires, switches, power outages' },
    { id: 'Plumbing', name: 'Plumbing', icon: 'droplet', color: 'blue', description: 'Taps, leaks, blocked drains, toilets, water coolers' },
    { id: 'Cleaning', name: 'Cleaning & Sanitation', icon: 'sparkles', color: 'teal', description: 'Trash, waterlogging, spills, dirty washrooms' },
    { id: 'Furniture', name: 'Furniture & Fixtures', icon: 'armchair', color: 'purple', description: 'Broken desks, chairs, doors, window latches' },
    { id: 'Accessibility', name: 'Accessibility', icon: 'accessibility', color: 'rose', description: 'Wheelchair ramps, lifts, railings, tactile paths' },
    { id: 'Other', name: 'Safety & Other', icon: 'alert-triangle', color: 'slate', description: 'Broken glass, path hazards, general repairs' }
  ],

  priorities: [
    { id: 'Low', name: 'Low', badgeClass: 'bg-slate-100 text-slate-700 border-slate-300', dotColor: 'bg-slate-400', sla: '3-5 Days' },
    { id: 'Medium', name: 'Medium', badgeClass: 'bg-blue-100 text-blue-700 border-blue-300', dotColor: 'bg-blue-500', sla: '24-48 Hours' },
    { id: 'High', name: 'High', badgeClass: 'bg-amber-100 text-amber-800 border-amber-300', dotColor: 'bg-amber-500', sla: '6-12 Hours' },
    { id: 'Urgent', name: 'Urgent', badgeClass: 'bg-red-100 text-red-800 border-red-300 animate-pulse', dotColor: 'bg-red-600', sla: 'Immediate (< 2 Hours)' }
  ],

  // Preset realistic campus photos with reliable curated URLs & fallback SVG generator
  presetPhotos: [
    {
      id: 'photo-tap-leak',
      title: 'Leaking Tap / Dripping Faucet',
      category: 'Plumbing',
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      description: 'Water dripping continuously from washroom faucet onto basin.'
    },
    {
      id: 'photo-sparking-wire',
      title: 'Exposed Electrical Wires',
      category: 'Electrical',
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      description: 'Loose exposed electrical wiring hanging near a switchboard.'
    },
    {
      id: 'photo-blocked-ramp',
      title: 'Blocked Accessibility Ramp',
      category: 'Accessibility',
      url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
      description: 'Wheelchair access ramp obstructed by debris and wooden pallets.'
    },
    {
      id: 'photo-broken-fan',
      title: 'Wobbly / Broken Ceiling Fan',
      category: 'Electrical',
      url: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
      description: 'Classroom ceiling fan blade damaged and shaking violently.'
    },
    {
      id: 'photo-waterlog',
      title: 'Waterlogged Corridor Floor',
      category: 'Cleaning',
      url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
      description: 'Rainwater seepage leading to water accumulation in hallway.'
    },
    {
      id: 'photo-broken-bench',
      title: 'Damaged Wooden Desk / Bench',
      category: 'Furniture',
      url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      description: 'Cracked bench plank in classroom with exposed sharp edges.'
    }
  ],

  // Hackathon Quick-Fill Presets for 1-click live testing
  demoPresets: [
    {
      id: 'demo-leak',
      label: '💧 Scenario 1: Leaking Tap (Plumbing)',
      badge: 'Medium Priority',
      building: 'block-b',
      room: 'Ground Floor Washroom (Near Staircase 2)',
      description: 'Tap se lagataar paani leak ho raha hai aur floor poora geela ho gaya hai. Students fisal sakte hain.',
      photoId: 'photo-tap-leak',
      notes: 'Demonstrates intelligent plumbing category detection, water hazard reasoning & medium priority.'
    },
    {
      id: 'demo-ramp',
      label: '♿ Scenario 2: Blocked Ramp (Accessibility)',
      badge: 'High Priority',
      building: 'block-c',
      room: 'Science Block Main South Entrance',
      description: 'Wheelchair ramp ke samne maintenance team ne concrete bags aur wooden pallets chhod diye hain. Ramp poora block hai.',
      photoId: 'photo-blocked-ramp',
      notes: 'Demonstrates campus equity & accessibility escalation to High priority.'
    },
    {
      id: 'demo-wire',
      label: '⚡ Scenario 3: Sparking Wire (Urgent Safety)',
      badge: 'Urgent Hazard',
      building: 'library',
      room: '2nd Floor Staircase Exit',
      description: 'Loose electrical wire switchboard ke pass latak rahi hai aur switch on karne par spark nikal raha hai! Shock lagne ka khatra hai.',
      photoId: 'photo-sparking-wire',
      notes: 'Demonstrates immediate safety risk detection, sparking keyword urgency & immediate SLA.'
    },
    {
      id: 'demo-duplicate',
      label: '⚠️ Scenario 4: Duplicate Report Test',
      badge: 'Triggers Duplicate Alert',
      building: 'block-b',
      room: 'Ground Floor Washroom',
      description: 'Washroom ka tap band nahi ho raha, paani continuously beh raha hai.',
      photoId: 'photo-tap-leak',
      notes: 'Tests duplicate detector against existing Report #CF-2026-001 with similarity score.'
    }
  ],

  // Initial Seed Reports for realistic campus dashboard
  initialReports: [
    {
      id: 'CF-2026-001',
      title: 'Tap se lagataar paani leak ho raha hai',
      description: 'Ground floor washroom ka second tap tight band karne ke baad bhi tezi se leak kar raha hai. Floor par paani jama hone se slippery ho gaya hai.',
      buildingId: 'block-b',
      buildingName: 'Block B (Engineering & Labs)',
      room: 'Ground Floor Washroom (Near Staircase A)',
      category: 'Plumbing',
      priority: 'Medium',
      status: 'Open',
      reportedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      reportedBy: 'Aryan Sharma (B.Tech CS 3rd Year)',
      studentContact: 'aryan.s@campus.edu',
      photoUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      upvotes: 3,
      aiTriage: {
        category: 'Plumbing',
        priority: 'Medium',
        confidence: 94,
        explanation: 'Continuous water leakage from tap fixture detected. Medium priority assigned due to active water wastage and moderate slip hazard in high-traffic hallway washroom.',
        engine: 'Smart Campus Heuristics'
      },
      assignedStaff: null,
      history: [
        { action: 'Report Submitted', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), actor: 'Aryan Sharma' },
        { action: 'AI Triage Completed (Plumbing / Medium)', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 1000).toISOString(), actor: 'CampusFix AI Engine' }
      ]
    },
    {
      id: 'CF-2026-002',
      title: 'Exposed sparking wire near staircase',
      description: 'Staircase switchboard ke pass loose naked wire latak rahi hai. Switch on karte waqt spark aur crackle sound aata hai. Bahut dangerous hai.',
      buildingId: 'library',
      buildingName: 'Central Library',
      room: '2nd Floor Staircase Exit',
      category: 'Electrical',
      priority: 'Urgent',
      status: 'In Progress',
      reportedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      reportedBy: 'Priya Verma (Physics Dept)',
      studentContact: 'priya.v@campus.edu',
      photoUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      upvotes: 8,
      aiTriage: {
        category: 'Electrical',
        priority: 'Urgent',
        confidence: 98,
        explanation: 'Active sparking and exposed electrical conductor identified. Critical electrical hazard with immediate risk of electric shock or fire outbreak. Escalated to Urgent priority.',
        engine: 'Smart Campus Heuristics'
      },
      assignedStaff: 'Anil Kumar (Lead Electrician, Maintenance Unit 1)',
      history: [
        { action: 'Report Submitted', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), actor: 'Priya Verma' },
        { action: 'AI Triage Escalated to Urgent', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000 + 1000).toISOString(), actor: 'CampusFix AI Engine' },
        { action: 'Assigned to Anil Kumar & Marked In Progress', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), actor: 'Chief Facilities Officer' }
      ]
    },
    {
      id: 'CF-2026-003',
      title: 'Wheelchair accessibility ramp blocked by construction debris',
      description: 'Science block ke entrance par wheelchair ramp par cement ki boriyan aur wooden planks pade hain. Wheelchair aur crutches wale students enter nahi kar pa rahe.',
      buildingId: 'block-c',
      buildingName: 'Block C (Science & Humanities)',
      room: 'Main South Entrance Ramp',
      category: 'Accessibility',
      priority: 'High',
      status: 'Open',
      reportedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
      reportedBy: 'Aman Gupta (Student Council Welfare Rep)',
      studentContact: 'aman.g@campus.edu',
      photoUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
      upvotes: 6,
      aiTriage: {
        category: 'Accessibility',
        priority: 'High',
        confidence: 96,
        explanation: 'Physical blockage preventing wheelchair access to major academic facility. Campus accessibility standards require immediate clearance within 12 hours.',
        engine: 'Smart Campus Heuristics'
      },
      assignedStaff: null,
      history: [
        { action: 'Report Submitted', timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), actor: 'Aman Gupta' }
      ]
    },
    {
      id: 'CF-2026-004',
      title: 'Broken ceiling fan making burning odor in Lecture Hall 304',
      description: 'Fan number 3 tezi se wobble kar raha hai aur motor se plastic jalne jaisi smell aa rahi hai. Classes chal rahi hain aur safety risk hai.',
      buildingId: 'block-a',
      buildingName: 'Block A (Admin & Dean Office)',
      room: 'Lecture Hall 304 (3rd Floor)',
      category: 'Electrical',
      priority: 'High',
      status: 'In Progress',
      reportedAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
      reportedBy: 'Prof. S. K. Narayan',
      studentContact: 'sk.narayan@campus.edu',
      photoUrl: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
      upvotes: 11,
      aiTriage: {
        category: 'Electrical',
        priority: 'High',
        confidence: 92,
        explanation: 'Overheating fan motor accompanied by burning odor and physical instability. High risk of mechanical failure or ceiling collapse.',
        engine: 'Smart Campus Heuristics'
      },
      assignedStaff: 'Rakesh Verma (Electrical Services)',
      history: [
        { action: 'Report Submitted', timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(), actor: 'Prof. S. K. Narayan' },
        { action: 'Marked In Progress (Technician dispatched to disconnect power)', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), actor: 'Facilities Desk' }
      ]
    },
    {
      id: 'CF-2026-005',
      title: 'Waterlogged corridor near Cafeteria after rain',
      description: 'Drain choke hone ki wajah se cafeteria corridor mein 2-3 inch dirty water jama hai. Foul smell aa rahi hai aur movement blocked hai.',
      buildingId: 'sac',
      buildingName: 'Student Activity Center / Cafeteria',
      room: 'Ground Floor Connecting Corridor',
      category: 'Cleaning',
      priority: 'Medium',
      status: 'In Progress',
      reportedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      reportedBy: 'Neha Mehra (B.Des 2nd Year)',
      studentContact: 'neha.m@campus.edu',
      photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
      upvotes: 4,
      aiTriage: {
        category: 'Cleaning',
        priority: 'Medium',
        confidence: 91,
        explanation: 'Standing rainwater and choked drainage create sanitation risks and pedestrian disruption. Assigned Cleaning & Sanitation triage with Medium priority.',
        engine: 'Smart Campus Heuristics'
      },
      assignedStaff: 'Sunita Devi (Sanitation Lead)',
      history: [
        { action: 'Report Submitted', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), actor: 'Neha Mehra' },
        { action: 'Assigned to Sanitation Crew', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), actor: 'Facilities Coordinator' }
      ]
    },
    {
      id: 'CF-2026-006',
      title: 'Broken classroom desk with sharp nail protruding',
      description: 'Second row ki wooden bench ka armrest toota hua hai aur ek teekha nail bahar nikla hua hai jisse students ke kapde ya haath chhil sakte hain.',
      buildingId: 'block-b',
      buildingName: 'Block B (Engineering & Labs)',
      room: 'Classroom 102',
      category: 'Furniture',
      priority: 'Low',
      status: 'Resolved',
      reportedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      resolvedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      reportedBy: 'Kunal Sethi (Mechanical 4th Year)',
      studentContact: 'kunal.s@campus.edu',
      photoUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      upvotes: 2,
      aiTriage: {
        category: 'Furniture',
        priority: 'Low',
        confidence: 93,
        explanation: 'Classroom desk repair. Isolated fixture damage without structural building danger. Assigned Low priority routine carpentry repair.',
        engine: 'Smart Campus Heuristics'
      },
      assignedStaff: 'Ramesh Sharma (Carpentry Workshop)',
      resolutionNotes: 'Replaced cracked wooden armrest plank, removed sharp protruding fastener and polished edges. Bench verified safe for students.',
      history: [
        { action: 'Report Submitted', timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), actor: 'Kunal Sethi' },
        { action: 'Assigned to Ramesh Sharma', timestamp: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(), actor: 'Facilities Desk' },
        { action: 'Status changed to Resolved. Repair completed.', timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), actor: 'Ramesh Sharma' }
      ]
    }
  ]
};
