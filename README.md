# UBID-X: Explainable Unique Business Identifier and Active Business Intelligence

UBID-X is a working React/Vite prototype for the Karnataka Commerce and Industry shortlisted idea around a Unique Business Identifier and active business intelligence. It demonstrates how fragmented government department records can be resolved into defendable UBIDs, reviewed by humans when confidence is uncertain, and enriched with activity signals that classify businesses as Active, Dormant, Closed, or Unmatched.

The prototype is intentionally built as a product surface rather than a static presentation. Reviewers can click through a realistic government workflow: ingest records, standardize fields, inspect candidate matches, approve or reject risky links, track operating status, and run policy queries across departments.

## Submission Form Answers

### Title

**UBID-X: Explainable Unique Business Identifier and Active Business Intelligence for Karnataka**

### Description

UBID-X is a prototype decision-intelligence layer for Karnataka's business ecosystem. Today, the same business can appear differently across Commerce and Industries, GST, Labour, Pollution Control, utilities, and municipal licensing systems. This creates duplicate records, weak visibility into whether units are actually operating, and slow policy decisions.

UBID-X solves both problems together:

- It creates a Unique Business Identifier by linking cross-department records only when the match is explainable.
- It uses confidence bands to decide whether a record should be auto-linked, sent to human review, or kept separate.
- It gives reviewers the evidence behind every proposed merge, including identifier, name, address, geography, and owner signals.
- It maps recent events such as GST filings, utility signals, consent renewals, inspections, trade license renewals, and cancellation notices to a UBID.
- It classifies every resolved business as Active, Dormant, or Closed with a reason and audit trail.
- It keeps unmatched activity events visible so no source signal silently disappears.
- It enables policy-ready questions such as "active in GST but missing in Industries", "dormant with high employment", and "wrong-merge risk watchlist".

The key idea is that UBID-X is not just another ID number. It is an explainable identity and activity layer above existing systems, designed for government trust, operational review, and district-level business intelligence.

### Source Code Upload

Upload a source-code ZIP that includes this project but excludes generated and local-only files:

- Include: `src/`, `index.html`, `package.json`, `package-lock.json`, `vite.config.js`, `vercel.json`, `README.md`.
- Exclude: `node_modules/`, `dist/`, `.git/`, `.vercel/`, `.env`, `.env.*`, local QA screenshots, and any machine-specific files.

Recommended upload name:

```text
UBID-X-source-code.zip
```

### Instructions To Run

```bash
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173
```

Build production output:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

The app has no required API keys and no required database for the prototype. It runs fully from local React data in `src/data.js`.

### Custom Attachment

Recommended custom attachments for the submission:

- PPT or PDF deck built from the slide outline in this README.
- A 2.5 to 3 minute demo video following the demo script below.
- Optional screenshots from the prototype: Mission Control, UBID Generator, Review Queue, Activity Intel, Analytics, and Architecture.

### Shortlisted Idea

**Karnataka Commerce and Industry Theme 1: Unique Business Identifier and Active Business Intelligence for businesses.**

If the form needs a shorter version, use:

```text
Theme 1: Unique Business Identifier for businesses, with active/dormant/closed business intelligence.
```

## Project Snapshot

| Item | Details |
| --- | --- |
| Project name | UBID-X |
| Project type | Interactive frontend prototype |
| Stack | React 19, Vite, JavaScript, CSS, lucide-react |
| Runtime verified on | Node.js v22.17.0, npm 10.9.2 |
| Data mode | Mock government-style records and events |
| Primary users | State department officers, district officers, reviewers, policy analysts |
| Core output | Explainable UBID clusters plus activity status |
| Deployment model | Static frontend for demo; production architecture supports APIs, database, graph layer, audit logs, and connectors |

## Problem

Business data is usually fragmented across departments. A single business may have:

- one name in an Industries record,
- a slightly different name in GST,
- an abbreviated owner in Labour,
- a utility event with no PAN or GSTIN,
- a trade license with a local address format,
- and an outdated or cancelled registration somewhere else.

This creates three government problems:

1. **Identity fragmentation**: the same business appears as multiple records.
2. **False merge risk**: two different businesses can look similar and be incorrectly merged.
3. **Activity blindness**: departments may know a business is registered, but not whether it is operating today.

UBID-X is designed around the belief that a government-grade UBID system must solve all three at once. A unique identifier is only useful if it is explainable, reviewable, reversible, and connected to real operating signals.

## Solution

UBID-X creates a trusted identity and activity layer above existing source systems.

The workflow is:

1. Ingest department masters and activity events.
2. Standardize names, addresses, districts, PIN codes, identifiers, and owners.
3. Generate candidate business links across sources.
4. Score each candidate using multiple evidence signals.
5. Auto-link only high-confidence pairs.
6. Route medium-confidence pairs to human review.
7. Keep low-confidence pairs separate.
8. Assign or update UBIDs.
9. Map activity events to UBIDs.
10. Classify each business as Active, Dormant, or Closed.
11. Surface unmatched events and risky merge cases.
12. Run cross-department analytics on top of UBIDs.

## Why This Is Different

Many systems can store a business ID. UBID-X focuses on the harder government problem: creating trust in the ID.

UBID-X differentiators:

- **Explainable matching**: every candidate match shows why it was proposed.
- **Human-in-the-loop governance**: uncertain matches are not silently merged.
- **Activity intelligence**: UBID-X does not stop at "who is this business?" It asks "is this business operating?"
- **Unmatched event handling**: no filing, utility signal, inspection, or renewal disappears just because it cannot be immediately linked.
- **Non-intrusive deployment**: existing department systems can remain in place.
- **Reversible decisions**: review decisions should produce audit trails and allow correction.
- **Policy query layer**: analysts can ask questions across departments without manually reconciling source IDs.
- **Designed for public-sector risk**: false positives, privacy, auditability, and explainability are product requirements, not later add-ons.

## Prototype Features

### 1. Mission Control

Mission Control explains the operating picture:

- source coverage across six streams,
- decision bands for matching,
- reviewer workload,
- activity signals,
- district-level activity distribution,
- and the full workflow from ingest to policy query.

This is the best first screen for judges because it frames the problem and shows the product thesis immediately.

### 2. UBID Generator

The UBID Generator shows how raw department records become candidate UBID links.

It includes:

- raw records from multiple departments,
- standardized text fields,
- identifier health,
- candidate match cards,
- confidence scores,
- signal-level bars for identifier, name, address, geography, and owner evidence,
- and match explanations written in reviewer-friendly language.

Example: `Bengaluru Precision Components Pvt Ltd` and `Bangalore Precision Comp. Private Limited` are linked with 98 percent confidence because GSTIN, PAN, PIN, address, and owner initials align.

### 3. Review Queue

The Review Queue is the trust layer. It handles medium-confidence candidates where automation alone is risky.

Reviewers can:

- inspect both source records side by side,
- see the confidence band and evidence signals,
- understand the risk,
- approve a link,
- reject a link,
- and leave a decision trail.

This protects against the most dangerous failure mode in identity resolution: confidently merging two different businesses.

### 4. Activity Intel

Activity Intel converts identity resolution into operational intelligence.

It classifies businesses as:

- **Active**: recent strong activity such as GST filing, utility signal, renewal, or inspection.
- **Dormant**: no recent operating signal despite historical records.
- **Closed**: long inactivity or cancellation/closure evidence.
- **Unmatched**: source event exists but cannot yet be linked to a UBID.

Each classification includes a reason, last activity date, linked departments, and event history.

### 5. Analytics

Analytics demonstrates why UBIDs matter after they are created. It shows policy questions that are difficult when each department has a separate ID system.

Included query examples:

- Active in GST, missing in Industries.
- Dormant with high employment.
- Wrong-merge risk watchlist.

This turns UBID-X from a data-cleaning tool into a policy and operations product.

### 6. Architecture

The Architecture tab shows a production path:

- source connectors,
- standardization service,
- entity scoring,
- review workflow,
- graph layer,
- activity classification,
- analytics APIs,
- audit trails,
- and dashboards.

The intended production stack shown in the app is:

| Layer | Proposed implementation |
| --- | --- |
| Frontend | React dashboard |
| Backend | Python FastAPI |
| Database | PostgreSQL |
| Graph layer | Neo4j or equivalent graph database |
| Matching | Rules, embeddings, and reviewer feedback |
| Review and audit | Role-based review queue with evidence snapshots |
| Deployment | Can be piloted without replacing source systems |

### 7. Product Guide

The Product Guide gives a reviewer/operator path through the prototype:

1. Start with source coverage and decision bands.
2. Generate and inspect UBIDs.
3. Resolve review cases.
4. Monitor activity status.
5. Run policy queries.

## Data Used In The Prototype

The prototype uses mock records modelled after real-world government data problems. No live citizen or business data is included.

Source streams:

| Source stream | Purpose |
| --- | --- |
| Department of Commerce and Industries | Industrial master data |
| Commercial Taxes / GST | Filing and tax activity |
| Labour Department | Employment and labour returns |
| Pollution Control Board | Consent and inspection activity |
| Utility Consumption Streams | Operating signal from power usage |
| Municipal Trade Licenses | Local trade and license activity |

The sample data includes:

- 12 source records,
- 6 candidate matches,
- 6 resolved businesses,
- 9 mapped activity events,
- 2 unmatched events,
- 3 policy analytics queries,
- 6 district activity summaries.

## Matching Logic

The prototype uses precomputed match scores in `src/data.js` and helper functions in `src/matching.js`.

The conceptual scoring model combines:

- exact or partial identifier agreement,
- normalized business name similarity,
- address overlap,
- geography and PIN consistency,
- owner or promoter similarity,
- source reliability,
- and activity context.

Decision bands:

| Confidence | Decision |
| --- | --- |
| 85 to 100 | Auto-link |
| 65 to 84 | Human review |
| 0 to 64 | Keep separate |

This thresholding is intentionally conservative. A government system should prefer review over accidental false merges.

## Activity Classification Logic

The activity classifier evaluates whether a business has recent and credible operating signals.

Example signals:

- GST filing,
- utility consumption,
- labour return,
- pollution consent renewal,
- inspection,
- municipal trade renewal,
- cancellation notice.

Example classifications:

| Status | Meaning |
| --- | --- |
| Active | Recent credible activity exists |
| Dormant | Historical business exists but recent activity is weak or missing |
| Closed | Closure/cancellation evidence or long inactivity exists |
| Unmatched | Event exists but cannot be linked confidently |

The important design choice is transparency: every status is backed by visible evidence.

## Competitive Analysis

Judges may ask: "Are there already companies or systems like this?"

The short answer:

**There are business identifiers, company registries, master data tools, and entity-resolution platforms. UBID-X is different because it combines explainable government identity resolution, human review, activity classification, unmatched-event handling, and policy analytics in a Karnataka-specific layer above existing systems.**

| Category | Examples | What they do | UBID-X difference |
| --- | --- | --- | --- |
| Global business identifiers | Dun & Bradstreet D-U-N-S | Provides a unique business identifier and business data file. | UBID-X is not a commercial global business credit identifier. It is a government operating layer that resolves state department records and tracks activity. |
| Legal entity identifiers | GLEIF LEI | Provides global legal entity identification, especially useful in financial contexts. | UBID-X is focused on state-level business operations, department reconciliation, and active/dormant/closed intelligence. |
| Company data aggregators | OpenCorporates | Aggregates company registry data from many jurisdictions. | UBID-X is not only a searchable registry. It is a workflow system for matching, review, audit, and policy action. |
| Enterprise MDM platforms | Microsoft Purview + Profisee, Informatica MDM | Standardize, match, merge, and govern master data in enterprises. | UBID-X applies these ideas to public-sector business records with explicit reviewer safeguards and activity classification. |
| Existing Indian identifiers | PAN, GSTIN, Udyam, CIN, trade licenses | Identify a business in a specific legal, tax, MSME, company, or local context. | UBID-X does not replace these. It links them into one explainable operating picture across departments. |
| General data platforms | Data lakes, BI dashboards, graph platforms | Store and analyze data. | UBID-X provides the domain workflow: UBID resolution, review queue, unmatched signals, activity status, and policy queries. |

Sources for competitive landscape:

- Dun & Bradstreet describes the D-U-N-S Number as a unique nine-digit identifier for businesses: https://www.dnb.com/en-us/smb/duns/duns-lookup.html
- GLEIF manages the global LEI system and access to LEI reference data: https://www.gleif.org/en/
- OpenCorporates describes access to legal-entity records collected from official sources across many jurisdictions: https://knowledge.opencorporates.com/
- Microsoft describes MDM reference architecture with Profisee for standardizing, matching, merging, enriching, and validating master data: https://learn.microsoft.com/en-us/purview/data-governance-master-data-management-profisee
- Informatica positions Customer 360/MDM around trusted customer and reference data: https://www.informatica.com/gb/products/master-data-management/customer-360.html

## Differentiating Factor For Judges

Use this answer if judges ask why UBID-X is not just another registry or data-cleaning tool:

> UBID-X is different because it treats identity as an operational decision, not just a stored number. It links records only with explainable evidence, routes uncertain cases to human review, keeps unmatched activity visible, classifies whether businesses are active or dormant, and turns the resolved UBID layer into policy analytics. Existing IDs like GSTIN or PAN are inputs; UBID-X is the cross-department intelligence layer above them.

The strongest differentiators are:

1. **Identity plus activity**: UBID-X shows both who the business is and whether it is operating.
2. **Explainability by design**: every merge has evidence and confidence.
3. **Reviewer workflow**: medium-confidence cases are governed, not guessed.
4. **Non-replacement approach**: departments keep existing systems and identifiers.
5. **Unmatched-event queue**: unresolved signals are surfaced instead of dropped.
6. **Policy-ready analytics**: UBIDs support district action, outreach, and compliance.

## Judge Q&A Prep

### Is this already solved by GSTIN or PAN?

No. GSTIN and PAN are critical identifiers, but they do not solve the full cross-department problem. Some records may lack GSTIN, use old names, have abbreviated addresses, or appear only in utility, labour, municipal, or inspection streams. UBID-X uses GSTIN and PAN as strong evidence, then adds name, address, geography, owner, and activity signals to create a fuller government view.

### What prevents wrong merges?

UBID-X uses confidence bands, evidence explanations, and human review. High-confidence matches can be automated. Medium-confidence matches go to a reviewer. Low-confidence matches stay separate. A production version should also store reviewer identity, timestamp, evidence snapshot, and rollback history.

### Why not build one more central database and force everyone to use it?

Replacing every source system is slow and risky. UBID-X is designed as a non-intrusive layer above current systems. It can ingest data, resolve identity, and produce intelligence without forcing each department to change its core software immediately.

### How does this help policy?

Once each business has a UBID, the government can ask cross-department questions: which GST-active units are missing in Industries, which dormant units have high employment, which districts have rising closure signals, and which unmatched filings need reconciliation.

### How will the system improve over time?

Reviewer decisions become feedback. Over time, match rules, confidence thresholds, and model weights can improve based on approved and rejected cases.

### What about privacy and security?

A production version should use role-based access, purpose limitation, field-level controls, encryption, audit logs, data minimization, and clear retention policies. Reviewers should see only the fields needed to resolve identity and activity.

### What is the MVP pilot?

A practical pilot can start with 3 to 4 departments, selected districts, limited data fields, a reviewer queue, audit logs, and dashboards for activity status and unmatched events.

## PPT Outline

Use this as the full slide-by-slide deck structure. A strong deck should be 12 to 15 slides. If the hackathon has a strict time limit, use slides 1 to 10 for the main pitch and keep slides 11 to 15 as backup/appendix.

### Slide 1: Title

**Title:** UBID-X: Explainable Unique Business Identifier and Active Business Intelligence for Karnataka

**Visual:** Product screenshot from Mission Control or a clean diagram showing multiple department records converging into one UBID.

**Content:**

- Team/project name.
- Shortlisted idea: Karnataka Commerce and Industry Theme 1.
- One-line promise: "One trusted UBID for every business. One clear answer for whether it is operating."

**Speaker note:** Open with the problem of fragmented business identities and the need for a trusted operating picture.

### Slide 2: The Problem

**Title:** Business identity is fragmented across departments

**Visual:** Six source systems with duplicate or conflicting records.

**Content:**

- Same business appears with different names, addresses, IDs, and update dates.
- Some records have PAN/GSTIN; some do not.
- Departments cannot easily know whether a business is active, dormant, or closed.
- Manual reconciliation is slow and risky.

**Speaker note:** Explain that the challenge is not just creating an ID, but creating trust in the ID.

### Slide 3: Why It Matters

**Title:** Fragmented records create policy blind spots

**Visual:** Three impact boxes: duplicate records, missed active businesses, wrong field action.

**Content:**

- Duplicate records distort business counts.
- Dormant or closed units may remain in active lists.
- Active businesses may be missing from industry databases.
- False merges can harm compliance, incentives, and reporting.

**Speaker note:** Tie the project to real government decisions: outreach, compliance, subsidies, district planning, and industrial policy.

### Slide 4: Our Solution

**Title:** UBID-X is an identity and activity layer above existing systems

**Visual:** Pipeline: Ingest -> Standardize -> Resolve -> Review -> Classify -> Query.

**Content:**

- Ingest multi-department records and event streams.
- Generate explainable candidate UBID links.
- Route uncertain cases to human review.
- Classify businesses as Active, Dormant, Closed, or Unmatched.
- Enable cross-department analytics.

**Speaker note:** Stress that UBID-X does not replace existing identifiers. It connects them.

### Slide 5: Live Prototype Overview

**Title:** A clickable workflow, not just a concept

**Visual:** Screenshots of the tabs: Mission Control, UBID Generator, Review Queue, Activity Intel, Analytics.

**Content:**

- React/Vite prototype.
- Seven product surfaces.
- Realistic mock data from six source streams.
- Reviewer actions and analytics built in.

**Speaker note:** This is where you show that the idea has been translated into an actual product flow.

### Slide 6: Data Sources

**Title:** UBID-X connects the business signals government already has

**Visual:** Table of source streams.

**Content:**

- Industries master data.
- GST filings.
- Labour returns.
- Pollution consent and inspection signals.
- Utility consumption.
- Municipal trade licenses.

**Speaker note:** The advantage is combining signals that are weak alone but powerful together.

### Slide 7: UBID Generation

**Title:** Candidate links are scored with multiple evidence signals

**Visual:** UBID Generator screenshot with confidence score and signal bars.

**Content:**

- Identifier evidence: PAN/GSTIN.
- Name similarity.
- Address similarity.
- PIN and district consistency.
- Owner/promoter similarity.
- Confidence score and decision band.

**Speaker note:** Walk through a high-confidence case such as Bengaluru Precision Components.

### Slide 8: Explainability

**Title:** Every merge needs a reason

**Visual:** Candidate card with explanation text.

**Content:**

- High confidence: auto-link.
- Medium confidence: human review.
- Low confidence: keep separate.
- Evidence is visible before action.
- Decisions can be audited and reversed.

**Speaker note:** Explain why explainability is essential for government adoption.

### Slide 9: Human Review

**Title:** Risky matches go to a reviewer, not a black box

**Visual:** Review Queue screenshot.

**Content:**

- Side-by-side source records.
- Signal breakdown.
- Approve or reject action.
- Audit trail concept.
- Protects against false positive merges.

**Speaker note:** Judges may worry about AI errors. This slide answers that concern.

### Slide 10: Activity Intelligence

**Title:** UBID-X tells us whether businesses are operating

**Visual:** Activity Intel screenshot.

**Content:**

- Active: recent strong operating signal.
- Dormant: historical record but weak current activity.
- Closed: cancellation or long inactivity.
- Unmatched: event exists but cannot be linked yet.
- Each status includes evidence and reason.

**Speaker note:** This is the biggest shift from "registry" to "business intelligence".

### Slide 11: Policy Analytics

**Title:** UBIDs unlock cross-department questions

**Visual:** Analytics screenshot.

**Content:**

- Active in GST, missing in Industries.
- Dormant with high employment.
- Wrong-merge risk watchlist.
- District activity distribution.

**Speaker note:** Show how this directly supports action by officers and policymakers.

### Slide 12: Architecture

**Title:** Deployable without replacing source systems

**Visual:** Architecture lane from the app.

**Content:**

- Source connectors.
- Standardization service.
- Matching and scoring engine.
- Reviewer workflow.
- PostgreSQL plus graph layer.
- Audit APIs and dashboards.

**Speaker note:** Emphasize low-friction pilot deployment and phased scaling.

### Slide 13: Competitive Analysis

**Title:** What exists, and why UBID-X is different

**Visual:** Competitor matrix.

**Content:**

- D-U-N-S: global commercial business identifier.
- LEI: legal entity identifier for financial/legal contexts.
- OpenCorporates: company registry aggregation.
- MDM platforms: enterprise record matching and master data.
- GSTIN/PAN/Udyam/CIN: source identifiers in specific contexts.
- UBID-X: Karnataka-specific cross-department identity, review, activity classification, unmatched events, and policy analytics.

**Speaker note:** Use the prepared differentiator answer: "Existing IDs are inputs; UBID-X is the intelligence layer."

### Slide 14: Impact And Metrics

**Title:** What success looks like in a pilot

**Visual:** KPI dashboard mockup.

**Content:**

- Duplicate business records reduced.
- Percentage of records linked with high confidence.
- Review backlog and turnaround time.
- Unmatched events resolved.
- Active/dormant/closed coverage by district.
- Policy queries answered without manual reconciliation.

**Speaker note:** Give measurable outcomes judges can believe.

### Slide 15: Pilot Roadmap

**Title:** Practical path to production

**Visual:** 3-phase roadmap.

**Content:**

- Phase 1: MVP pilot with 3 to 4 departments and selected districts.
- Phase 2: Reviewer workflow, audit APIs, and district dashboards.
- Phase 3: More departments, feedback-based scoring, and statewide rollout.

**Speaker note:** Close with feasibility. The prototype is small, but the architecture is scalable.

### Slide 16: Closing Ask

**Title:** UBID-X turns fragmented records into trusted business intelligence

**Visual:** Before/after: fragmented records -> one UBID -> activity status -> policy action.

**Content:**

- One trusted UBID.
- Explainable decisions.
- Human review for uncertainty.
- Active/dormant/closed intelligence.
- Actionable analytics for Karnataka.

**Speaker note:** End with the product promise, not technical details.

## Demo Video Instructions

Target length: 2.5 to 3 minutes.

Recommended recording setup:

- Use Chrome or Edge.
- Open `http://127.0.0.1:5173`.
- Use 1920x1080 resolution if possible.
- Keep browser zoom at 90 or 100 percent.
- Hide bookmarks and unrelated tabs.
- Use a visible cursor.
- Speak slowly and focus on decisions, not every UI detail.

### Demo Script

#### 0:00 to 0:20 - Opening

Show Mission Control.

Say:

> UBID-X solves two connected problems: fragmented business identity and lack of operating-status visibility. It creates explainable UBIDs across departments and classifies businesses as active, dormant, closed, or unmatched.

#### 0:20 to 0:45 - Source Coverage

Point to the source streams and decision bands.

Say:

> The prototype uses six government-style streams: Industries, GST, Labour, Pollution Control, utilities, and municipal licenses. Matches are separated into high confidence, medium confidence, and low confidence decisions.

#### 0:45 to 1:20 - UBID Generator

Open UBID Generator.

Show the raw records, standardized fields, and a high-confidence match.

Say:

> Here, two records describe the same business with different names. UBID-X compares identifiers, name, address, geography, and owner signals. Because PAN, GSTIN, PIN, and address evidence align, it can create a defendable UBID link.

#### 1:20 to 1:50 - Review Queue

Open Review Queue.

Approve one medium-confidence match or show the approve/reject controls.

Say:

> Medium-confidence cases are not silently merged. A reviewer sees the full evidence and decides whether to approve or reject. This is how UBID-X avoids dangerous false merges.

#### 1:50 to 2:20 - Activity Intel

Open Activity Intel.

Show Active, Dormant, Closed, and Unmatched filters.

Say:

> After identity is resolved, UBID-X maps activity events to each business. GST filings, utility signals, inspections, renewals, and cancellation notices help classify whether a unit is active, dormant, or closed. Unmatched events remain visible for reconciliation.

#### 2:20 to 2:40 - Analytics

Open Analytics.

Show the query shelf.

Say:

> Once UBIDs exist, officers can ask cross-department questions: which businesses are active in GST but missing in Industries, which dormant units have high employment, and which potential merges are risky.

#### 2:40 to 3:00 - Architecture And Close

Open Architecture.

Say:

> UBID-X is deployable without replacing existing systems. It can ingest department data, standardize records, score matches, route reviews, classify activity, and expose analytics. The goal is one trusted business identity layer for Karnataka.

## Suggested PPT Speaking Flow

If the judges allow only 5 minutes:

1. Slide 1 - 15 seconds.
2. Slides 2 and 3 - 45 seconds.
3. Slide 4 - 30 seconds.
4. Slides 5 to 11 with live demo - 2 minutes 30 seconds.
5. Slide 12 - 30 seconds.
6. Slide 13 - 45 seconds.
7. Slides 14 to 16 - 45 seconds.

If the judges allow only 3 minutes, skip deep architecture during the main pitch and keep it for Q&A.

## Installation

Requirements:

- Node.js 20 or newer recommended.
- npm 10 or newer recommended.

Install dependencies:

```bash
npm install
```

Start local development server:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:5173
```

Build:

```bash
npm run build
```

Preview:

```bash
npm run preview
```

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start Vite dev server on localhost |
| `npm run build` | Generate production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## File Structure

```text
.
|-- index.html
|-- package.json
|-- package-lock.json
|-- README.md
|-- vercel.json
|-- vite.config.js
`-- src
    |-- App.jsx
    |-- data.js
    |-- main.jsx
    |-- matching.js
    `-- styles.css
```

Important files:

- `src/App.jsx`: main product interface, tabs, review actions, analytics views, and reusable components.
- `src/data.js`: mock department records, candidate matches, businesses, events, queries, architecture nodes, and district signals.
- `src/matching.js`: helper functions for normalization, decision bands, confidence color, date formatting, and decision summaries.
- `src/styles.css`: full responsive product styling.
- `vercel.json`: Vercel build and SPA rewrite configuration.

## Product Walkthrough For Reviewers

1. Start at **Mission Control** to understand the product thesis and workflow.
2. Open **UBID Generator** to inspect raw records and confidence scoring.
3. Inspect the Bengaluru Precision Components high-confidence match.
4. Open **Review Queue** and approve or reject a medium-confidence case.
5. Open **Activity Intel** and switch between Active, Dormant, Closed, and Unmatched.
6. Open **Analytics** and view policy queries.
7. Open **Architecture** to explain production feasibility.
8. Open **Product Guide** for the end-to-end operator workflow.

## Current Prototype Limitations

This is a hackathon/product prototype, not a production data platform yet.

Current limitations:

- Uses mock data, not live department APIs.
- Uses precomputed match confidence values for the demo.
- Does not persist reviewer decisions after refresh.
- Does not include authentication or role-based access.
- Does not include a real backend, database, or graph store.
- Does not perform real-time source ingestion.

Production next steps:

- Add source connectors and ingestion jobs.
- Store records, matches, decisions, and audit trails in PostgreSQL.
- Add graph relationships for UBID clusters.
- Implement secure role-based review flows.
- Add explainable matching services using rules and ML/embedding similarity.
- Add configurable activity windows by sector and department.
- Add district dashboards and exportable reports.

## Risk Controls

UBID-X is designed around government-grade trust.

| Risk | Control |
| --- | --- |
| False positive merge | Conservative thresholds, reviewer queue, evidence snapshots, rollback |
| False negative match | Unmatched queue, recurring resolution runs, reviewer search |
| Stale activity status | Recency windows, source timestamps, event history |
| Privacy exposure | Role-based access, field minimization, audit logs |
| Department adoption friction | Non-intrusive layer above existing systems |
| Black-box decisions | Explainable signal breakdowns and reviewer notes |

## Roadmap

### Phase 1: Prototype to pilot

- Replace mock data with sample extracts from 3 to 4 departments.
- Implement backend APIs.
- Add persistent reviewer decisions.
- Add audit trail storage.
- Validate match thresholds with domain officers.

### Phase 2: Pilot deployment

- Run in selected districts.
- Add reviewer roles and escalation.
- Add scheduled ingestion.
- Add unmatched-event reconciliation.
- Add dashboards for district and department officers.

### Phase 3: Scale-up

- Expand departments and source streams.
- Add ML-assisted matching with transparent evidence.
- Add feedback learning from reviewer decisions.
- Add statewide policy analytics.
- Add export and reporting workflows.

## Final One-Liner

**UBID-X turns fragmented department records into a trusted, explainable, and activity-aware business intelligence layer for Karnataka.**
