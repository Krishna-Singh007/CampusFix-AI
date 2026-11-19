// CampusFix AI - AI Triage & Duplicate Detection Engine
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CampusFixAI = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Keyword lexicons for Campus Maintenance Categories (English + Hinglish + Common Campus Lingo)
  const CATEGORY_LEXICON = {
    Electrical: {
      highWeight: ['spark', 'sparking', 'short circuit', 'naked wire', 'exposed wire', 'shock', 'burning wire', 'fire', 'current lag raha'],
      mediumWeight: ['wire', 'switch', 'switchboard', 'light', 'tube light', 'bulb', 'flicker', 'flickering', 'fan', 'ceiling fan', 'motor', 'socket', 'plug', 'mcb', 'fuse', 'power cut', 'dark corridor', 'bijli', 'voltage', 'generator'],
      lowWeight: ['ac', 'remote', 'cooler', 'charger', 'button']
    },
    Plumbing: {
      highWeight: ['pipe burst', 'overflowing sewage', 'heavy leak', 'sewer overflow', 'tank overflow', 'toilet choked', 'paani bhar gaya'],
      mediumWeight: ['tap', 'leak', 'leaking', 'tapak', 'paani', 'water', 'faucet', 'flush', 'flush tank', 'washroom', 'restroom', 'basin', 'washbasin', 'drain', 'drainage', 'sink', 'pipeline', 'water cooler', 'geyser'],
      lowWeight: ['smell', 'valve', 'handle', 'wet', 'puddle']
    },
    Cleaning: {
      highWeight: ['dead bird', 'biohazard', 'chemical spill', 'vomit', 'severe mold'],
      mediumWeight: ['garbage', 'kachra', 'trash', 'dustbin', 'waterlog', 'waterlogging', 'dirty', 'dust', 'stain', 'mud', 'badbu', 'foul smell', 'cockroach', 'pests', 'sweep', 'mop', 'clean'],
      lowWeight: ['litter', 'paper', 'mess', 'spill']
    },
    Furniture: {
      highWeight: ['sharp nail', 'collapsed desk', 'broken glass door', 'door stuck emergency'],
      mediumWeight: ['chair', 'desk', 'bench', 'table', 'podium', 'board', 'blackboard', 'whiteboard', 'door', 'window', 'latch', 'hinge', 'handle', 'cupboard', 'almirah', 'curtain', 'wooden plank'],
      lowWeight: ['creaking', 'loose screw', 'scratched', 'cushion']
    },
    Accessibility: {
      highWeight: ['ramp blocked', 'wheelchair blocked', 'lift broken', 'elevator stuck', 'handicap ramp', 'disabled access'],
      mediumWeight: ['ramp', 'wheelchair', 'lift', 'elevator', 'crutches', 'handrail', 'railing', 'tactile', 'braille', 'accessibility', 'divyang', 'slope', 'barrier'],
      lowWeight: ['steps', 'stairs', 'pathway']
    },
    Other: {
      highWeight: ['fire alarm', 'broken glass', 'gas leak', 'structural crack', 'ceiling falling'],
      mediumWeight: ['security', 'lock', 'key', 'paint', 'plaster', 'roof', 'pothole', 'tree branch', 'parking', 'fence', 'gate'],
      lowWeight: ['noise', 'general', 'cosmetic']
    }
  };

  // High hazard indicators that instantly escalate priority to Urgent or High
  const URGENT_HAZARDS = [
    'spark', 'sparking', 'short circuit', 'naked wire', 'exposed wire', 'shock', 'current lag',
    'fire', 'smoke', 'burning smell', 'gas leak', 'lift stuck with people', 'ceiling collapse',
    'pipe burst flood', 'critical'
  ];

  const HIGH_HAZARDS = [
    'ramp blocked', 'wheelchair', 'lift broken', 'elevator down', 'burning', 'heavy leak',
    'toilet overflow', 'slippery corridor', 'dark staircase', 'wobbly fan falling', 'sharp nail',
    'broken glass', 'waterlogged', 'paani jama'
  ];

  // Stop words to remove during duplicate text comparison
  const STOP_WORDS = new Set([
    'the', 'is', 'at', 'which', 'on', 'a', 'an', 'in', 'and', 'or', 'of', 'for', 'to', 'with', 'from',
    'hai', 'ho', 'raha', 'rahi', 'ke', 'ki', 'ka', 'ko', 'mein', 'se', 'aur', 'yeh', 'woh', 'bhi', 'par'
  ]);

  /**
   * Tokenizes text into normalized unique word stems
   */
  function tokenize(text) {
    if (!text) return [];
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !STOP_WORDS.has(w));
  }

  /**
   * Calculates Jaccard similarity between two token sets (0.0 to 1.0)
   */
  function jaccardSimilarity(tokens1, tokens2) {
    if (!tokens1.length || !tokens2.length) return 0;
    const set1 = new Set(tokens1);
    const set2 = new Set(tokens2);
    let intersection = 0;
    for (const t of set1) {
      if (set2.has(t)) intersection++;
    }
    const union = new Set([...set1, ...set2]).size;
    return union === 0 ? 0 : intersection / union;
  }

  /**
   * Primary Smart Heuristic AI Triage Analyzer
   * Runs locally with zero latency, deterministic reliability, and rich contextual explanations.
   */
  function triageIssueLocally(params) {
    const { title = '', description = '', buildingId = '', room = '', photoSelected = null } = params;
    const fullText = `${title} ${description} ${room}`.toLowerCase();
    const tokens = tokenize(fullText);

    // 1. Category Classification
    const categoryScores = {
      Electrical: 0,
      Plumbing: 0,
      Cleaning: 0,
      Furniture: 0,
      Accessibility: 0,
      Other: 0
    };

    for (const [cat, words] of Object.entries(CATEGORY_LEXICON)) {
      // Check high weight terms (3 points)
      words.highWeight.forEach(term => {
        if (fullText.includes(term.toLowerCase())) categoryScores[cat] += 4;
      });
      // Check medium weight terms (2 points)
      words.mediumWeight.forEach(term => {
        if (fullText.includes(term.toLowerCase())) categoryScores[cat] += 2;
      });
      // Check low weight terms (1 point)
      words.lowWeight.forEach(term => {
        if (fullText.includes(term.toLowerCase())) categoryScores[cat] += 1;
      });
    }

    // Photo hint bonus if preset photo is provided
    if (photoSelected && photoSelected.category && categoryScores[photoSelected.category] !== undefined) {
      categoryScores[photoSelected.category] += 3;
    }

    // Determine top category
    let bestCategory = 'Other';
    let maxCatScore = 0;
    for (const [cat, score] of Object.entries(categoryScores)) {
      if (score > maxCatScore) {
        maxCatScore = score;
        bestCategory = cat;
      }
    }

    // 2. Priority Scoring
    let priority = 'Medium'; // baseline default
    let urgencyScore = 0;
    let priorityReasons = [];

    // Check Urgent triggers
    const matchedUrgent = URGENT_HAZARDS.filter(h => fullText.includes(h));
    if (matchedUrgent.length > 0) {
      priority = 'Urgent';
      urgencyScore = 95;
      priorityReasons.push(`Critical safety hazard detected (${matchedUrgent.slice(0, 2).join(', ')}): immediate risk to students/infrastructure.`);
    } else {
      // Check High triggers
      const matchedHigh = HIGH_HAZARDS.filter(h => fullText.includes(h));
      if (matchedHigh.length > 0) {
        priority = 'High';
        urgencyScore = 75;
        priorityReasons.push(`Substantial operational impact or accessibility disruption identified (${matchedHigh.slice(0, 2).join(', ')}).`);
      } else {
        // Evaluate based on category & scope
        if (bestCategory === 'Accessibility') {
          priority = 'High';
          urgencyScore = 70;
          priorityReasons.push('Campus accessibility issues take mandatory high priority for inclusive mobility.');
        } else if (bestCategory === 'Electrical') {
          priority = 'Medium';
          urgencyScore = 55;
          priorityReasons.push('Electrical fault requires certified technician attention within 24-48 hours.');
        } else if (bestCategory === 'Plumbing') {
          priority = 'Medium';
          urgencyScore = 50;
          priorityReasons.push('Water/plumbing defect causes ongoing resource wastage and moderate floor slip hazard.');
        } else if (bestCategory === 'Furniture') {
          priority = 'Low';
          urgencyScore = 30;
          priorityReasons.push('Isolated furniture fixture damage; no immediate campus disruption.');
        } else {
          priority = 'Low';
          urgencyScore = 25;
          priorityReasons.push('Routine non-critical maintenance request.');
        }
      }
    }

    // 3. Construct Explainable AI Rationale
    let categoryReason = '';
    switch (bestCategory) {
      case 'Electrical':
        categoryReason = 'Identified electrical components (wiring, switches, light fixtures, or motors).';
        break;
      case 'Plumbing':
        categoryReason = 'Identified water supply, drain, faucet, or sanitation plumbing fixtures.';
        break;
      case 'Accessibility':
        categoryReason = 'Identified ramp, wheelchair pathway, elevator, or disability support facilities.';
        break;
      case 'Cleaning':
        categoryReason = 'Identified sanitation, waste accumulation, standing water, or cleanliness issues.';
        break;
      case 'Furniture':
        categoryReason = 'Identified classroom/dorm seating, desks, doors, or carpentry fixtures.';
        break;
      default:
        categoryReason = 'Categorized under General Campus Safety & Maintenance.';
    }

    const fullExplanation = `${categoryReason} ${priorityReasons.join(' ')}`;

    // Calculate confidence score (70-98%)
    const confidence = Math.min(98, Math.max(72, 70 + (maxCatScore * 5)));

    return {
      category: bestCategory,
      priority: priority,
      confidence: confidence,
      explanation: fullExplanation,
      engine: 'Smart Campus Heuristics (Local Demo Engine)',
      scores: categoryScores
    };
  }

  /**
   * Scans existing open/in-progress reports to find duplicate or highly similar issues
   */
  function detectDuplicates(newReport, existingReports = []) {
    if (!existingReports || existingReports.length === 0) {
      return { isDuplicate: false, candidates: [] };
    }

    const newTokens = tokenize(`${newReport.title || ''} ${newReport.description || ''} ${newReport.room || ''}`);
    const newLocation = (newReport.buildingId || '').toLowerCase();
    const newRoomTokens = tokenize(newReport.room || '');

    const candidates = [];

    existingReports.forEach(existing => {
      // Only check issues that are still active (Open or In Progress)
      if (existing.status === 'Resolved' || existing.status === 'Closed') {
        return;
      }
      // Don't compare against itself if editing
      if (newReport.id && existing.id === newReport.id) {
        return;
      }

      let similarityScore = 0;
      const matchReasons = [];

      // 1. Location match (Max 40 points)
      const existingLocation = (existing.buildingId || '').toLowerCase();
      if (newLocation && existingLocation && newLocation === existingLocation) {
        similarityScore += 25;
        matchReasons.push(`Same Campus Building: ${existing.buildingName || existing.buildingId}`);

        // Room/landmark match
        const existingRoomTokens = tokenize(existing.room || '');
        const roomJaccard = jaccardSimilarity(newRoomTokens, existingRoomTokens);
        if (roomJaccard > 0.25 || (newReport.room && existing.room && newReport.room.toLowerCase().includes(existing.room.toLowerCase()))) {
          similarityScore += 20;
          matchReasons.push(`Matching room / landmark zone: "${existing.room}"`);
        }
      }

      // 2. Category match (Max 15 points)
      if (newReport.category && existing.category && newReport.category === existing.category) {
        similarityScore += 15;
        matchReasons.push(`Same issue category (${existing.category})`);
      }

      // 3. Text description / keyword similarity (Max 45 points)
      const existingTokens = tokenize(`${existing.title || ''} ${existing.description || ''}`);
      const textJaccard = jaccardSimilarity(newTokens, existingTokens);
      const textPoints = Math.round(textJaccard * 45);
      similarityScore += textPoints;

      if (textJaccard > 0.18) {
        matchReasons.push(`Significant text & keyword overlap (${Math.round(textJaccard * 100)}% keyword match)`);
      }

      // Threshold: 50% or above is considered a probable duplicate
      if (similarityScore >= 50) {
        candidates.push({
          report: existing,
          score: Math.min(100, similarityScore),
          matchReasons: matchReasons
        });
      }
    });

    // Sort descending by match score
    candidates.sort((a, b) => b.score - a.score);

    const isDuplicate = candidates.length > 0;
    const topCandidate = isDuplicate ? candidates[0] : null;

    return {
      isDuplicate: isDuplicate,
      confidence: topCandidate ? topCandidate.score : 0,
      matchedReport: topCandidate ? topCandidate.report : null,
      matchReasons: topCandidate ? topCandidate.matchReasons : [],
      allCandidates: candidates
    };
  }

  /**
   * Optional Gemini API integration for Real Vision & Text Multimodal Analysis
   * If apiKey is configured in Settings, calls the official Gemini API endpoint.
   */
  async function triageWithGeminiAPI({ title, description, buildingName, room, photoBase64, apiKey }) {
    if (!apiKey) {
      throw new Error('Gemini API key is not configured.');
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const promptText = `
You are CampusFix AI, an intelligent college campus facility maintenance triage assistant.
Analyze this student maintenance issue report and return a JSON object with your triage decision:

Campus Location: ${buildingName || 'Not specified'}
Room / Specific Landmark: ${room || 'Not specified'}
Student Issue Title: ${title || 'N/A'}
Student Description: ${description || 'N/A'}

Categories must be strictly one of: ["Electrical", "Plumbing", "Cleaning", "Furniture", "Accessibility", "Other"]
Priorities must be strictly one of: ["Low", "Medium", "High", "Urgent"]

Rules:
1. "Urgent" is reserved for immediate physical danger: sparks, exposed wire, smoke, fire, active flooding, people stuck in lift.
2. "High" is for blocked wheelchair ramps/accessibility, major leaks, fan wobbling violently, hazardous broken glass.
3. "Medium" is for continuous tap leaks, non-dangerous fan issues, waterlogging.
4. "Low" is for minor cosmetic scratches, isolated loose screws.
5. Provide a 2-3 sentence clear and concise explanation for why you chose this category and priority.

Return valid JSON strictly matching this structure:
{
  "category": "Plumbing",
  "priority": "Medium",
  "confidence": 92,
  "explanation": "Brief reasoning here"
}
`;

    const parts = [{ text: promptText }];

    // If an image was uploaded, attach base64 inlineData
    if (photoBase64 && photoBase64.includes('base64,')) {
      const [header, base64Data] = photoBase64.split('base64,');
      const mimeType = header.match(/:(.*?);/)[1] || 'image/jpeg';
      parts.push({
        inlineData: {
          mimeType: mimeType,
          data: base64Data
        }
      });
    }

    const payload = {
      contents: [{ role: 'user', parts: parts }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `Gemini API error (Status ${response.status})`);
    }

    const data = await response.json();
    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = JSON.parse(rawContent);

    return {
      category: parsed.category || 'Other',
      priority: parsed.priority || 'Medium',
      confidence: parsed.confidence || 90,
      explanation: parsed.explanation || 'Analyzed with Gemini Multimodal Vision AI.',
      engine: 'Google Gemini 2.5 Flash API (Live Multimodal)'
    };
  }

  return {
    triageIssueLocally,
    detectDuplicates,
    triageWithGeminiAPI,
    tokenize,
    jaccardSimilarity
  };
});
