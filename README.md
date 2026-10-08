# CareerBridge AI
### AI-Enabled Career Counselling & Family Decision-Support Platform for Vocational Education
**Smart India Hackathon (SIH) Project**

[![Vite](https://img.shields.io/badge/Vite-Fast%20Bundler-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vanilla%20CSS](https://img.shields.io/badge/CSS-Vanilla%20Design%20Tokens-38B2AC)](src/styles/designTokens.css)
[![i18n](https://img.shields.io/badge/i18n-English%20%7C%20%E0%AE%A4%E0%AE%AE%E0%AE%BF%E0%AE%B4%E0%AF%8D%20%7C%20%E0%A4%B9%E0%A4%BF%E0%A4%A8%E0%A5%8D%E0%A4%A6%E0%A5%80-4F46E5)](#multilingual-frontend)

---

## 1. Project Overview & SIH Core Concept

**CareerBridge AI** is an AI-assisted career counselling and family decision-support platform tailored for students and guardians navigating vocational, technical (ITI), and polytechnic diploma pathways in India.

### Core Principle
> **"Explore independently → Compare together → Decide together."**

Unlike conventional recommendation systems that unilaterally tell students which career to pick, CareerBridge recognizes that career choices in India are **deeply collective family decisions**. Students frequently seek modern, cutting-edge trades (e.g., Electric Vehicles, Robotics), whereas parents prioritize job stability, affordability, and public-sector (PSU/State Electricity Board) eligibility.

CareerBridge bridges this gap by collecting independent preferences, neutrally explaining divergences, and surfacing **mutually viable consensus options**.

---

## 2. SIH Core Innovation: The Family Decision Engine

```
Student enters preferences independently (e.g. EV Technician, ₹35k budget)
                        ↓
Parent enters preferences independently (e.g. Diploma in EEE, ₹60k budget)
                        ↓
AI Stakeholder Preference Matrix (Highlights alignments & divergences)
                        ↓
Explainable AI Breakdown (Explains WHY they differ without bias)
                        ↓
Options Both Can Agree On (3-5 bridging courses, e.g. Diploma in Mechatronics)
                        ↓
Interactive What-If Simulator (Real-time compatibility recalculation)
                        ↓
Explicit Final Family Decision Lock
                        ↓
Verified Government Scholarships (NSP, Pragati) + Subsidized Education Loans
```

### Strict Independence Protocol
- **Student and parent preferences do NOT share the same editable state.**
- If the student chooses `Electric Vehicle Service Technician`, the parent does **not** automatically receive that trade.
- If the parent modifies their preference to `Diploma in Electrical & Electronics`, the student's preference remains completely unaffected.
- Only the **Family Decision Engine** evaluates and compares both perspectives side-by-side.

---

## 3. Key Features

1. **Independent Assessment Stepper**:
   - 5-step progress stepper: Role Selection → Student Form → Parent Form → AI Analysis → Decision & Funding.
   - Privacy handoff screen ensures guardians enter unbiased perspectives.

2. **Vocational Course Explorer & Detailed Curriculum**:
   - Full NSQF-aligned courses: Electric Vehicle Service Technician, Diploma in EEE, Diploma in Mechatronics, Suryamitra Solar PV Installer, CNC Machinist, Cloud & Cyber Tech, and Medical Equipment Maintenance.
   - 6-tab modal & dedicated views: Overview, What You Learn (subjects, skills, tools), Career Roadmap (0 to 8 years), Job Roles, Accredited Institutes, and AI Fit Analysis.

3. **Family Decision Engine & Matrix**:
   - Compares 6 critical dimensions: Primary Course, Budget, Institution Type, Duration, Commute/Location, and Long-Term Stability.
   - Alignment indicators: Aligned, Partially Aligned, Different.

4. **Explainable AI with Configurable Multi-Criteria Weights**:
   - Course Match: 25%
   - Budget Feasibility: 20%
   - Location & Commute: 15%
   - Institution Category: 15%
   - Duration Compatibility: 15%
   - Career Priorities: 10%

5. **Interactive What-If Simulator**:
   - Sliders and segmented controls for Parent Budget, Course Duration, Daily Commute, and Hostel Accommodation.
   - Real-time compatibility score recalculation with delta indicators (`+8%`) and contextual factor explanations.

6. **Government Scholarships & Subsidized Loans**:
   - Central & State schemes: NSP Post-Matric, AICTE Pragati for Girls, NAPS Apprenticeship Stipend, PMKVY 4.0 Grants.
   - Subsidized loan guidance: Vidya Lakshmi Portal (CSIS subsidy), NBCFDC Backward Classes Loans (3.5% - 4% p.a.), and SBI Skill Loan.
   - Private Document Vault checklist with simulated uploads.

7. **Multilingual Architecture**:
   - 100% frontend dictionary-based translation in **English**, **தமிழ் (Tamil)**, and **हिन्दी (Hindi)**.
   - Zero external translation API dependency; persisted across browser reloads via `localStorage`.

---

## 4. UI/UX Design System

The application faithfully implements the reference UI/UX design specifications:
- **Background**: Light lavender / off-white palette (`#f5f6fc`, `#f8f9fe`).
- **Cards**: Crisp white surfaces (`#ffffff`) with subtle lavender borders (`#e6e8f4`) and restrained shadows.
- **Primary Brand**: Deep indigo / violet (`#4f46e5`, `#4338ca`).
- **Secondary Accent**: Mint / teal (`#0d9488`, `#14b8a6`, `#10b981`).
- **Typography**: Responsive font stack with Inter, Noto Sans Tamil, and Noto Sans Devanagari.
- **Layout**: Desktop left sidebar, top bar with language switch and search, mobile collapsible drawer.

---

## 5. Technology Stack

- **Framework**: React 19 + TypeScript
- **Tooling**: Vite 8
- **Styling**: Bespoke Vanilla CSS with CSS custom properties (`designTokens.css`)
- **Icons**: Lucide React
- **Celebration / Interaction**: Canvas Confetti
- **Backend Boundary**: Supabase ready (`src/services/supabase/`) with complete SQL Schema & Row Level Security (RLS) policies
- **AI Architecture**: Modular AI Service layer (`src/services/ai/`) with rule-based fallback and live endpoint hooks

---

## 6. Folder Structure

```
careerbridge2/
├── public/
├── src/
│   ├── types/                     # Typed data structures (Course, Preferences, Funding, etc.)
│   ├── i18n/                      # Frontend dictionaries (en.ts, ta.ts, hi.ts, index.ts)
│   ├── data/demo/                 # Curated demo catalogues (courses, institutes, scholarships, loans)
│   ├── context/                   # AppContext (Language, Independent Preferences, Modal, Decision Lock)
│   ├── services/
│   │   ├── ai/                    # Explainable AI, family analysis, what-if simulator
│   │   └── supabase/              # Supabase client boundary & SQL RLS schema
│   ├── styles/                    # Vanilla CSS tokens and main responsive stylesheets
│   ├── components/
│   │   ├── layout/                # AppShell, Sidebar, TopBar, Footer
│   │   ├── common/                # Badges, Stepper, LanguageSelector, Modal, States
│   │   ├── courses/               # CourseCard, CourseSelector, CourseDetailModal, AIExplanationCard
│   │   ├── assessment/            # StudentAssessmentForm, ParentAssessmentForm, HandoffModal
│   │   ├── family/                # StakeholderMatrix, DifferenceExplanation, MutualOptionsList, WhatIfSimulator, DecisionLock
│   │   └── funding/               # ScholarshipCard, LoanCard, DocumentVault
│   ├── pages/                     # LandingPage, Dashboard, Courses, Institutes, Funding, etc.
│   ├── App.tsx                    # Route dispatcher
│   └── main.tsx                   # Entry point
├── .env.example                   # Environment configuration template
├── package.json
└── README.md
```

---

## 7. Local Installation & Development

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Setup Commands
```bash
# Clone the repository
git clone https://github.com/Mohamedhashmi-07/careerbrigge.git
cd careerbrigge

# Install dependencies
npm install

# Run the local development server
npm run dev
```

The application will start at `http://localhost:5173`.

### Production Build
```bash
# Validate TypeScript and bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 8. Backend & Environment Configuration

Copy `.env.example` to `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_AI_PROVIDER=demo
VITE_AI_API_URL=https://api.yourdomain.com
```

- When `VITE_SUPABASE_URL` is omitted, the application operates in **Demo Local Mode**, storing preferences and locked decisions inside `localStorage`.
- When `VITE_AI_API_URL` is omitted, the platform uses the built-in **Explainable Deterministic Engine**, clearly marked with `Demo Rule-Based Analysis` badges.

---

## 9. Verification & Testing Highlights

- **Independence Check**:
  - Student selects `Electric Vehicle Service Technician`.
  - Parent selects `Diploma in Electrical & Electronics Engineering`.
  - Student changes preference to `Diploma in Mechatronics`. Parent remains `Diploma in EEE`.
  - Family Decision Engine compares both independent selections.
- **Multilingual Check**:
  - Instant toggle between **English**, **தமிழ்**, and **हिन्दी**.
  - All navigation items, matrix dimensions, form labels, and badges update immediately without page refresh or API lag.
  - Persists on browser reload.
- **Responsiveness Check**:
  - Tested from 320px mobile viewport up to 1440px desktop displays.

---

## 10. License & Credits

Developed for the **Smart India Hackathon (SIH)**. Built with pride for vocational education empowerment in India.
