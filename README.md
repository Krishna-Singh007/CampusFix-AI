# CampusFix AI 🛠️🤖
> **Smart College Campus Maintenance Reporting & AI Triage System**  
> *College campus mein maintenance problems ko report karne, unhe sahi team tak pahunchane aur unki progress track karne ke liye intelligent web app.*

---

## 🌟 Overview & Real-World Problem Solved

College campus mein chhoti-badi maintenance problems roz hoti hain—jaise classroom ki light kharab hona, washroom ka tap leak karna, corridor mein paani jama hona, fan kharab hona, ya wheelchair ramp ka blocked hona.

**Pehle kya hota tha:**
1. **Lost & Scattered Reports:** WhatsApp messages, register entries, ya phone calls se report aati thi jismein location aur issue clear nahi hota tha.
2. **Duplicate Complaints:** Ek hi tap leak hone par 10 alag-alag students report karte the, jisse maintenance team ka time waste hota tha.
3. **Safety Hazards Delayed:** Serious hazards (jaise staircase ke pass sparking naked wire ya blocked accessibility ramp) minor issues ke peeche dab jaate the.
4. **Zero Visibility for Students:** Students ko pata nahi chalta tha ki unki report kisko assign hui aur kab theek hogi.

**CampusFix AI Solution:**
- 📸 **Fast Visual Reporting:** Student photo preview aur location ke saath issue submit karta hai.
- 🧠 **Instant AI Triage:** AI automatically **Category** (Electrical, Plumbing, Cleaning, Furniture, Accessibility, Other) aur **Priority** (Low, Medium, High, Urgent) suggest karta hai with clear explanation.
- ⚠️ **Duplicate Detection:** Agar same location par open issue pehle se maujood hai, toh duplicate alert dikhata hai aur student ko existing issue ko **+1 Upvote** karne ka option deta hai.
- 📊 **Maintenance Command Dashboard:** Staff urgency ke hisaab se issues dekh sakta hai, technician assign kar sakta hai, aur **Open ➔ In Progress ➔ Resolved** lifecycle update kar sakta hai.
- ⚡ **Dual AI Engine:** Zero-config **Local Heuristics Engine** (offline hackathon ready) + optional **Google Gemini Flash Vision API** integration.

---

## 🚀 Quick Start (How to Run)

App ko run karne ke liye **kisi external build step ya npm install ki zaroorat nahi hai**. Yeh Windows aur kisi bhi modern browser (Chrome, Edge, Firefox, Safari) mein instant chalta hai.

### Option 1: One-Click Windows Script (Recommended)
1. Navigate to the project directory:
   ```cmd
   cd C:\Users\ks012\.gemini\antigravity\scratch\CampusFix-AI
   ```
2. Double-click **`start.bat`** (ya run `.\start-server.ps1` in PowerShell).
3. Browser automatically open ho jayega at:
   👉 **`http://localhost:3000/`**

### Option 2: Direct Browser Open (Offline)
- Simply double-click **`index.html`** in Windows File Explorer. It opens directly via `file:///` in your browser!

---

## 🎯 Hackathon Live Demo Guide (Judges Walkthrough)

App ke andar top navigation bar par **"🚀 Hackathon Tour"** button diya gaya hai jo judges ko step-by-step 6-stage flow dikhata hai:

1. **Step 1: The Problem (Overview)**
   - Open `#overview` tab. Real-time campus KPI ticker dikhta hai: Total Reports, Open, In Progress, Resolved, Urgent Hazards.
2. **Step 2: Student Reports an Issue**
   - Switch to **"Report an Issue"** tab.
   - Click **"💧 Scenario 1: Leaking Tap"** Quick-Fill chip.
   - Form photo preview, location ("Block B"), aur description ("Tap se lagataar paani leak ho raha hai...") populate kar deta hai.
3. **Step 3: AI Triage Recommendation**
   - Click **"Run AI Triage & Duplicate Scan"** (ya auto-trigger).
   - AI Triage Card appears:
     - **Suggested Category:** `Plumbing` 💧
     - **Suggested Priority:** `Medium` (SLA: 24-48 Hours)
     - **AI Rationale:** *"Continuous water leakage from tap fixture detected. Medium priority assigned due to water wastage and slipping hazard in high-traffic hallway washroom."*
     - User/Staff can override before submitting.
4. **Step 4: Duplicate Detection in Action**
   - Click **"⚠️ Scenario 4: Duplicate Report Test"** Quick-Fill chip.
   - Notice the prominent warning card:
     - **"⚠️ Possible Duplicate Issue Detected! (92% Match)"**
     - Matches existing ticket `#CF-2026-001` at Block B Ground Floor Washroom.
     - Student can click **"+1 Upvote Existing Issue"** to boost priority without creating a redundant ticket!
5. **Step 5: Maintenance Dashboard & Urgency Prioritization**
   - Switch to **"Maintenance Dashboard"** tab.
   - Notice how **Urgent** electrical safety hazards (e.g. sparking wire in Library) automatically float to the top of the queue.
   - Filter by status (Open, In Progress, Resolved) or categories. Toggle between Card Grid View and Dense Table View.
6. **Step 6: Lifecycle Tracking & Resolution**
   - On an Open issue, click **"In Progress"** ➔ click **"Assign Technician"** (e.g. *Anil Kumar - Lead Electrician*).
   - Click **"Resolved"** ➔ enter resolution notes (e.g. *Replaced gasket & tightened valve*).
   - Ticket history logs every action with timestamp and actor name.

---

## 🧠 AI Architecture & Technical Design

Codebase ko modular aur clean architecture ke saath organize kiya gaya hai:

```
CampusFix-AI/
├── index.html              # Complete responsive Single Page Application shell
├── css/
│   └── styles.css          # Glassmorphism, category/priority badges & animations
├── js/
│   ├── sampleData.js       # Campus buildings, categories, photo presets & initial issues
│   ├── aiEngine.js         # AI Triage Classifier, Hazard Urgency Scorer, Duplicate Detector, Gemini API Client
│   ├── storageService.js   # LocalStorage data persistence, lifecycle state machine, metrics
│   ├── components.js       # React 18 UI components (Navbar, Overview, ReportForm, Dashboard, Modals)
│   ├── app.js              # Hash router, toast manager & state controller
│   └── app-bundle.js       # Combined bundle for offline execution
├── start-server.ps1        # Pure PowerShell zero-install HTTP server
├── start.bat               # 1-click Windows launcher
└── README.md               # Documentation & Hackathon guide
```

### 1. Smart Heuristic Triage Engine (`aiEngine.js`)
- **Category Classifier:** Multi-keyword weighted dictionary supporting English, Hinglish, and campus terms (e.g., `paani`, `tapak`, `bijli`, `kachra`, `divyang`, `short circuit`).
- **Hazard Escalator:** High-risk indicators (`spark`, `exposed wire`, `fire`, `blocked ramp`) escalate SLA immediately to Urgent (<2 Hours) or High (6-12 Hours).
- **Explainable AI:** Generates human-readable explanations justifying every decision.

### 2. Multi-Factor Duplicate Detection (`aiEngine.js`)
- **Building & Location Factor:** 25-45 pts for matching building and landmark token overlap.
- **Category Factor:** 15 pts for shared functional domain.
- **Semantic Text Overlap:** Tokenized Jaccard similarity and n-gram overlap (35 pts).
- Issues with score ≥ 50% trigger an assistive warning.

### 3. Optional Google Gemini 2.5 Flash Vision API
- App supports connecting a real Google Gemini API Key via **Settings (⚙️)**.
- Sends campus photo (base64) + description to Gemini for multimodal vision classification.
- If no key is entered or offline, gracefully runs the local heuristic engine with 0ms latency.

---

## 🔒 Data Persistence & Reset

- All reports and settings are saved automatically in browser `localStorage`.
- Data persists across page reloads and browser restarts.
- To reset back to clean demo data at any time during a presentation, click **"Reset Data"** on the dashboard or inside Settings.

---

## 👥 Roles & Workflows

| Role | Actions |
|---|---|
| **Student** | Upload photo, enter location/landmark, review AI triage suggestions, +1 upvote duplicate issues, track fix progress. |
| **Maintenance Staff** | Review urgency-sorted queue, assign specialized technicians, override triage if necessary, advance status from Open ➔ In Progress ➔ Resolved with resolution notes. |
| **Facilities Admin** | View campus health metrics, SLA resolution rate, and manage campus buildings/settings. |
