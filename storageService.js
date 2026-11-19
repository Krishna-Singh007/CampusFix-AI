// CampusFix AI - Storage & State Service
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CampusFixStorage = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const STORAGE_KEY_REPORTS = 'campusfix_reports_v1';
  const STORAGE_KEY_SETTINGS = 'campusfix_settings_v1';

  const defaultSettings = {
    campusName: 'Apex Institute of Technology & Sciences',
    useGeminiAPI: false,
    geminiApiKey: '',
    demoMode: true,
    notificationsEnabled: true
  };

  const listeners = [];

  function notifyChange() {
    listeners.forEach(fn => {
      try { fn(); } catch (err) { console.error('Listener error:', err); }
    });
  }

  function subscribe(fn) {
    listeners.push(fn);
    return () => {
      const idx = listeners.indexOf(fn);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  }

  function getSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (!raw) return { ...defaultSettings };
      return { ...defaultSettings, ...JSON.parse(raw) };
    } catch (e) {
      return { ...defaultSettings };
    }
  }

  function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    notifyChange();
  }

  function getReports() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_REPORTS);
      if (!raw) {
        // Initialize from sample data
        const initial = window.CAMPUS_FIX_SAMPLE_DATA?.initialReports || [];
        localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Failed to parse reports from localStorage, falling back to sample data', e);
      return window.CAMPUS_FIX_SAMPLE_DATA?.initialReports || [];
    }
  }

  function saveAllReports(reports) {
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(reports));
    notifyChange();
  }

  function getReportById(id) {
    const reports = getReports();
    return reports.find(r => r.id === id) || null;
  }

  function generateReportId() {
    const reports = getReports();
    const count = reports.length + 1;
    const year = new Date().getFullYear();
    const pad = String(count).padStart(3, '0');
    let id = `CF-${year}-${pad}`;
    // Ensure uniqueness
    let counter = 1;
    while (reports.some(r => r.id === id)) {
      id = `CF-${year}-${String(count + counter).padStart(3, '0')}`;
      counter++;
    }
    return id;
  }

  function createReport(data) {
    const reports = getReports();
    const id = generateReportId();
    const now = new Date().toISOString();

    const newReport = {
      id: id,
      title: data.title || 'Untitled Issue',
      description: data.description || '',
      buildingId: data.buildingId || 'other',
      buildingName: data.buildingName || 'Campus General',
      room: data.room || 'General Area',
      category: data.category || 'Other',
      priority: data.priority || 'Medium',
      status: 'Open',
      reportedAt: now,
      reportedBy: data.reportedBy || 'Anonymous Student',
      studentContact: data.studentContact || '',
      photoUrl: data.photoUrl || '',
      upvotes: 1,
      linkedDuplicateId: data.linkedDuplicateId || null,
      aiTriage: data.aiTriage || {
        category: data.category || 'Other',
        priority: data.priority || 'Medium',
        confidence: 85,
        explanation: 'Default initial triage.',
        engine: 'Standard System'
      },
      assignedStaff: null,
      resolutionNotes: null,
      resolvedAt: null,
      history: [
        {
          action: 'Issue Reported by Student',
          timestamp: now,
          actor: data.reportedBy || 'Student'
        },
        {
          action: `AI Triage Assigned: [${data.category}] - [${data.priority}] Priority`,
          timestamp: new Date(Date.now() + 500).toISOString(),
          actor: data.aiTriage?.engine || 'CampusFix AI Engine'
        }
      ]
    };

    reports.unshift(newReport);
    saveAllReports(reports);
    return newReport;
  }

  function updateStatus(reportId, newStatus, actorName = 'Maintenance Staff', notes = '') {
    const reports = getReports();
    const report = reports.find(r => r.id === reportId);
    if (!report) return null;

    const prevStatus = report.status;
    report.status = newStatus;
    const now = new Date().toISOString();

    if (newStatus === 'Resolved') {
      report.resolvedAt = now;
      if (notes) report.resolutionNotes = notes;
    } else if (newStatus === 'In Progress' && prevStatus === 'Resolved') {
      report.resolvedAt = null;
    }

    report.history.push({
      action: `Status changed from "${prevStatus}" to "${newStatus}"${notes ? ` (Notes: ${notes})` : ''}`,
      timestamp: now,
      actor: actorName
    });

    saveAllReports(reports);
    return report;
  }

  function updateTriageDetails(reportId, { category, priority, actorName = 'Maintenance Staff', reason = '' }) {
    const reports = getReports();
    const report = reports.find(r => r.id === reportId);
    if (!report) return null;

    const oldCat = report.category;
    const oldPri = report.priority;
    if (category) report.category = category;
    if (priority) report.priority = priority;

    const now = new Date().toISOString();
    report.history.push({
      action: `Triage updated by staff: [${oldCat} -> ${report.category}], [${oldPri} -> ${report.priority}]${reason ? ` (${reason})` : ''}`,
      timestamp: now,
      actor: actorName
    });

    saveAllReports(reports);
    return report;
  }

  function assignStaffMember(reportId, staffName, actorName = 'Facilities Desk') {
    const reports = getReports();
    const report = reports.find(r => r.id === reportId);
    if (!report) return null;

    report.assignedStaff = staffName;
    if (report.status === 'Open') {
      report.status = 'In Progress';
    }

    const now = new Date().toISOString();
    report.history.push({
      action: `Assigned to technician: ${staffName}. Status updated to In Progress.`,
      timestamp: now,
      actor: actorName
    });

    saveAllReports(reports);
    return report;
  }

  function upvoteReport(reportId, studentName = 'Campus Student') {
    const reports = getReports();
    const report = reports.find(r => r.id === reportId);
    if (!report) return null;

    report.upvotes = (report.upvotes || 0) + 1;
    report.history.push({
      action: `+1 Upvote added by ${studentName} (Similar issue verified in same location)`,
      timestamp: new Date().toISOString(),
      actor: studentName
    });

    saveAllReports(reports);
    return report;
  }

  function deleteReport(reportId) {
    let reports = getReports();
    reports = reports.filter(r => r.id !== reportId);
    saveAllReports(reports);
  }

  function resetToSampleData() {
    const initial = window.CAMPUS_FIX_SAMPLE_DATA?.initialReports || [];
    // Deep clone to reset clean
    const fresh = JSON.parse(JSON.stringify(initial));
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(fresh));
    notifyChange();
    return fresh;
  }

  function getMetrics() {
    const reports = getReports();
    const total = reports.length;
    const open = reports.filter(r => r.status === 'Open').length;
    const inProgress = reports.filter(r => r.status === 'In Progress').length;
    const resolved = reports.filter(r => r.status === 'Resolved').length;
    const urgent = reports.filter(r => r.priority === 'Urgent' && r.status !== 'Resolved').length;
    const high = reports.filter(r => r.priority === 'High' && r.status !== 'Resolved').length;

    return {
      total,
      open,
      inProgress,
      resolved,
      urgent,
      high,
      resolutionRate: total > 0 ? Math.round((resolved / total) * 100) : 0
    };
  }

  return {
    getSettings,
    saveSettings,
    getReports,
    getReportById,
    createReport,
    updateStatus,
    updateTriageDetails,
    assignStaffMember,
    upvoteReport,
    deleteReport,
    resetToSampleData,
    getMetrics,
    subscribe
  };
});
