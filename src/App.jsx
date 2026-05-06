import React, { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  CircleDot,
  ClipboardCheck,
  Database,
  Eye,
  Factory,
  FileSearch,
  Fingerprint,
  Gauge,
  GitBranch,
  Layers3,
  LayoutDashboard,
  LineChart,
  Link2,
  MapPinned,
  Network,
  Play,
  RefreshCcw,
  Route,
  Scale,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Table2,
  Trophy,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import {
  activityEvents,
  architectureNodes,
  businesses,
  candidateMatches,
  departments,
  districtSignals,
  queryResults,
  sourceRecords,
  unmatchedEvents,
} from "./data.js";
import {
  classifyFreshness,
  confidenceColor,
  daysSince,
  formatDate,
  identifierHealth,
  normalizeText,
  summarizeDecisions,
  tokenFingerprint,
} from "./matching.js";

const tabs = [
  { id: "overview", label: "Mission Control", icon: LayoutDashboard },
  { id: "resolver", label: "UBID Generator", icon: Fingerprint },
  { id: "review", label: "Review Queue", icon: ClipboardCheck },
  { id: "activity", label: "Activity Intel", icon: Activity },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "architecture", label: "Architecture", icon: Network },
  { id: "guide", label: "Product Guide", icon: Route },
];

const tourSteps = [
  {
    tab: "overview",
    title: "Why UBID-X exists",
    lead: "Karnataka has many department systems, but no single trusted business identity.",
    value: "UBID-X solves identity fragmentation and activity blindness together.",
    action: "Start with decision bands, source coverage, and the operating picture.",
  },
  {
    tab: "resolver",
    title: "Generate a trusted UBID",
    lead: "Raw records are messy, inconsistent, and often missing identifiers.",
    value: "The system standardises records, scores multi-signal matches, and explains every link.",
    action: "Inspect name cleanup, identifier health, candidate confidence, and field evidence.",
  },
  {
    tab: "review",
    title: "Control risky merges",
    lead: "A wrong merge is worse than no merge, especially in government data.",
    value: "High confidence links can be automated; medium confidence links require human review.",
    action: "Approve or reject a medium-confidence case and watch the audit state change.",
  },
  {
    tab: "activity",
    title: "Track business activity",
    lead: "Once events map to UBIDs, the state can see which businesses are operating.",
    value: "Active, Dormant, and Closed are evidence-backed classifications, not guesses.",
    action: "Check timeline events, status reason, and the Unmatched queue.",
  },
  {
    tab: "analytics",
    title: "Ask cross-department questions",
    lead: "UBIDs make cross-department questions possible for the first time.",
    value: "Officials can find active firms missing from one department or dormant firms needing outreach.",
    action: "Use the query shelf and district activity distribution.",
  },
  {
    tab: "architecture",
    title: "Deploy without disruption",
    lead: "The system does not replace existing department software.",
    value: "UBID-X is an intelligence layer above current systems, with auditability and scale path.",
    action: "Follow ingest, standardise, resolve, review, classify, and query.",
  },
  {
    tab: "guide",
    title: "Use the product end to end",
    lead: "The guide collects the most important workflows for a real UBID-X operator.",
    value: "UBID-X is not just record linkage. It is a trusted operating picture of Karnataka's business ecosystem.",
    action: "Use the workflow checklist and readiness cards.",
  },
];

const initialDecisions = Object.fromEntries(
  candidateMatches.map((match) => [match.id, match.defaultDecision]),
);

const statusOrder = ["Active", "Dormant", "Closed"];

function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedRecordId, setSelectedRecordId] = useState("rec-1001");
  const [selectedMatchId, setSelectedMatchId] = useState("match-003");
  const [selectedBusinessId, setSelectedBusinessId] = useState("biz-001");
  const [activityFilter, setActivityFilter] = useState("All");
  const [selectedQueryId, setSelectedQueryId] = useState("q1");
  const [decisions, setDecisions] = useState(initialDecisions);
  const [runCount, setRunCount] = useState(1);
  const [tourOpen, setTourOpen] = useState(true);
  const [tourIndex, setTourIndex] = useState(0);

  const departmentById = useMemo(
    () => Object.fromEntries(departments.map((department) => [department.id, department])),
    [],
  );
  const recordById = useMemo(
    () => Object.fromEntries(sourceRecords.map((record) => [record.id, record])),
    [],
  );
  const matchById = useMemo(
    () => Object.fromEntries(candidateMatches.map((match) => [match.id, match])),
    [],
  );

  const selectedRecord = recordById[selectedRecordId];
  const selectedMatch = matchById[selectedMatchId] || candidateMatches[0];
  const selectedBusiness =
    businesses.find((business) => business.id === selectedBusinessId) || businesses[0];
  const selectedQuery =
    queryResults.find((query) => query.id === selectedQueryId) || queryResults[0];
  const decisionSummary = summarizeDecisions(candidateMatches, decisions);
  const pendingCount = candidateMatches.filter((match) => decisions[match.id] === "review").length;
  const tab = tabs.find((item) => item.id === activeTab) || tabs[0];

  function handleDecision(matchId, decision) {
    setDecisions((current) => ({ ...current, [matchId]: decision }));
  }

  function resetQueue() {
    setDecisions(initialDecisions);
    setSelectedMatchId("match-003");
  }

  function runResolutionPass() {
    setRunCount((count) => count + 1);
    setActiveTab("resolver");
  }

  function openTour(index = 0) {
    setTourIndex(index);
    setActiveTab(tourSteps[index].tab);
    setTourOpen(true);
  }

  function moveTour(delta) {
    const nextIndex = Math.min(Math.max(tourIndex + delta, 0), tourSteps.length - 1);
    setTourIndex(nextIndex);
    setActiveTab(tourSteps[nextIndex].tab);
  }

  const activeTourStep = tourSteps[tourIndex];

  return (
    <div className="app-shell">
      <aside className="side-nav">
        <div className="brand-block">
          <div className="brand-mark">
            <Fingerprint aria-hidden="true" size={28} />
          </div>
          <div>
            <strong>UBID-X</strong>
            <span>Karnataka business intelligence</span>
          </div>
        </div>

        <nav className="tab-list" aria-label="Primary">
          {tabs.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={`tab-button ${activeTab === item.id ? "is-active" : ""}`}
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                type="button"
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-note">
          <span>Product preview</span>
          <strong>6 streams. 12 raw records. Live reviewer loop.</strong>
        </div>
      </aside>

      <main className="workspace">
        <header className="top-bar">
          <div>
            <p className="screen-label">{tab.label}</p>
            <h1>{getScreenTitle(activeTab)}</h1>
          </div>
          <div className="top-actions">
            <div className="sync-chip">
              <CircleDot size={12} aria-hidden="true" />
              Run #{runCount} synced on 06 May 2026
            </div>
            <button className="button button-guide" onClick={() => openTour(0)} type="button">
              <Trophy size={16} aria-hidden="true" />
              Product tour
            </button>
            <button className="button button-secondary" onClick={resetQueue} type="button">
              <RefreshCcw size={16} aria-hidden="true" />
              Reset review
            </button>
            <button className="button button-primary" onClick={runResolutionPass} type="button">
              <Play size={16} aria-hidden="true" />
              Run resolver
            </button>
          </div>
        </header>

        <div className="content-region">
          {activeTab === "overview" && (
            <OverviewView
              decisionSummary={decisionSummary}
              pendingCount={pendingCount}
              departmentById={departmentById}
            />
          )}
          {activeTab === "resolver" && (
            <ResolverView
              departmentById={departmentById}
              decisions={decisions}
              recordById={recordById}
              selectedRecord={selectedRecord}
              selectedRecordId={selectedRecordId}
              setSelectedMatchId={setSelectedMatchId}
              setSelectedRecordId={setSelectedRecordId}
            />
          )}
          {activeTab === "review" && (
            <ReviewView
              departmentById={departmentById}
              decisions={decisions}
              handleDecision={handleDecision}
              recordById={recordById}
              selectedMatch={selectedMatch}
              selectedMatchId={selectedMatchId}
              setSelectedMatchId={setSelectedMatchId}
            />
          )}
          {activeTab === "activity" && (
            <ActivityView
              activityFilter={activityFilter}
              departmentById={departmentById}
              selectedBusiness={selectedBusiness}
              selectedBusinessId={selectedBusinessId}
              setActivityFilter={setActivityFilter}
              setSelectedBusinessId={setSelectedBusinessId}
            />
          )}
          {activeTab === "analytics" && (
            <AnalyticsView
              selectedQuery={selectedQuery}
              selectedQueryId={selectedQueryId}
              setSelectedQueryId={setSelectedQueryId}
            />
          )}
          {activeTab === "architecture" && <ArchitectureView />}
          {activeTab === "guide" && <ProductGuideView pendingCount={pendingCount} />}
        </div>
      </main>

      {tourOpen && (
        <ProductTour
          activeStep={activeTourStep}
          current={tourIndex}
          onClose={() => setTourOpen(false)}
          onNext={() => moveTour(1)}
          onPrevious={() => moveTour(-1)}
          total={tourSteps.length}
        />
      )}
    </div>
  );
}

function ProductTour({ activeStep, current, onClose, onNext, onPrevious, total }) {
  const isLast = current === total - 1;
  return (
    <div className="tour-overlay" role="dialog" aria-modal="true" aria-labelledby="tour-title">
      <div className="tour-card">
        <div className="tour-card-head">
          <div>
            <p className="screen-label">Product navigator</p>
            <h2 id="tour-title">{activeStep.title}</h2>
          </div>
          <button className="tour-close" onClick={onClose} type="button" aria-label="Close product tour">
            <XCircle size={20} aria-hidden="true" />
          </button>
        </div>
        <p className="tour-lead">{activeStep.lead}</p>
        <div className="tour-callout">
          <strong>Why it matters</strong>
          <span>{activeStep.value}</span>
        </div>
        <div className="tour-callout tour-callout-soft">
          <strong>Try this</strong>
          <span>{activeStep.action}</span>
        </div>
        <div className="tour-progress" aria-label={`Step ${current + 1} of ${total}`}>
          {Array.from({ length: total }).map((_, index) => (
            <i className={index <= current ? "is-filled" : ""} key={index} />
          ))}
        </div>
        <div className="tour-actions">
          <button className="button button-secondary" disabled={current === 0} onClick={onPrevious} type="button">
            Back
          </button>
          <button className="button button-primary" onClick={isLast ? onClose : onNext} type="button">
            {isLast ? "Finish guide" : "Next"}
            {!isLast && <ArrowRight size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </div>
  );
}

function getScreenTitle(activeTab) {
  const titles = {
    overview: "Explainable identity and activity layer",
    resolver: "Generate UBIDs with defendable evidence",
    review: "Human-in-the-loop safeguards",
    activity: "Active, dormant, and closed intelligence",
    analytics: "Policy-ready business questions",
    architecture: "Deployable without replacing source systems",
    guide: "Guided product workflows",
  };
  return titles[activeTab] || titles.overview;
}

function OverviewView({ decisionSummary, pendingCount, departmentById }) {
  const totalRecords = sourceRecords.length;
  const totalEvents = activityEvents.length + unmatchedEvents.length;
  const activeCount = businesses.filter((business) => business.status === "Active").length;
  const autoRate = Math.round((decisionSummary.linked / candidateMatches.length) * 100);

  return (
    <div className="view-stack">
      <section className="hero-panel">
        <div className="hero-copy">
          <div className="seal-row">
            <span>Theme 1</span>
            <span>Unified Business Identifier</span>
            <span>Active Business Intelligence</span>
          </div>
          <h2>One trusted UBID for every business. One clear answer for whether it is operating.</h2>
          <p>
            UBID-X links fragmented department records only when the decision can be explained,
            audited, and reversed. Every activity signal is mapped to a UBID or flagged for review.
          </p>
          <div className="hero-actions">
            <button className="button button-primary" type="button">
              <Search size={16} aria-hidden="true" />
              Inspect evidence
            </button>
            <button className="button button-secondary" type="button">
              <ShieldCheck size={16} aria-hidden="true" />
              Trust policy
            </button>
          </div>
        </div>
        <div className="decision-console" aria-label="Decision bands">
          <div className="console-header">
            <span>Decision bands</span>
            <Badge tone="success">Conservative by design</Badge>
          </div>
          <DecisionRow label="High confidence" value="Auto-link" score="85-100" tone="success" />
          <DecisionRow label="Medium confidence" value="Human review" score="65-84" tone="warning" />
          <DecisionRow label="Low confidence" value="Keep separate" score="0-64" tone="danger" />
          <div className="audit-strip">
            <Scale size={18} aria-hidden="true" />
            <span>Wrong merge is treated as a critical risk, so explainability gates every link.</span>
          </div>
        </div>
      </section>

      <div className="metric-grid">
        <MetricCard
          icon={Database}
          label="Sample source records"
          value={totalRecords}
          detail="From 6 department streams"
          tone="teal"
        />
        <MetricCard
          icon={Fingerprint}
          label="Candidate links scored"
          value={candidateMatches.length}
          detail={`${autoRate}% auto-linked in current pass`}
          tone="orange"
        />
        <MetricCard
          icon={ClipboardCheck}
          label="Reviewer queue"
          value={pendingCount}
          detail="Medium confidence cases"
          tone="purple"
        />
        <MetricCard
          icon={Activity}
          label="Activity signals"
          value={totalEvents}
          detail={`${activeCount} businesses currently active`}
          tone="green"
        />
      </div>

      <div className="split-grid">
        <section className="panel">
          <SectionHeader
            icon={Route}
            title="Live resolution flow"
            subtitle="The workflow connects identity resolution, review, activity, and action."
          />
          <div className="flow-lane">
            {["Ingest", "Standardise", "Score", "Review", "Classify", "Query"].map((step, index) => (
              <div className="flow-step" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                {index < 5 && <ArrowRight size={16} aria-hidden="true" />}
              </div>
            ))}
          </div>
          <div className="proof-grid">
            <ProofPoint icon={Link2} title="No shared join key needed" copy="PAN/GSTIN are used when present, but matching still works with partial records." />
            <ProofPoint icon={Eye} title="Every answer has evidence" copy="Scores, fields, and human decisions are retained as an audit trail." />
            <ProofPoint icon={AlertTriangle} title="No silent data loss" copy="Unmatched activity events stay visible until resolved." />
          </div>
        </section>

        <section className="panel">
          <SectionHeader
            icon={MapPinned}
            title="Karnataka operating picture"
            subtitle="District-level activity is derived after UBIDs are created."
          />
          <div className="district-list">
            {districtSignals.map((district) => (
              <DistrictRow key={district.district} {...district} />
            ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <SectionHeader
          icon={Layers3}
          title="Department coverage"
          subtitle="The same engine scales from pilot datasets to 40+ Karnataka systems."
        />
        <div className="department-grid">
          {departments.map((department) => (
            <div className="department-tile" key={department.id}>
              <span style={{ backgroundColor: department.color }} />
              <strong>{department.short}</strong>
              <p>{department.name}</p>
              <small>{department.records.toLocaleString("en-IN")} production-scale records</small>
            </div>
          ))}
        </div>
        <div className="status-summary-row">
          {statusOrder.map((status) => (
            <StatusCount key={status} status={status} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ResolverView({
  departmentById,
  decisions,
  recordById,
  selectedRecord,
  selectedRecordId,
  setSelectedMatchId,
  setSelectedRecordId,
}) {
  const relatedMatches = candidateMatches.filter(
    (match) => match.recordA === selectedRecordId || match.recordB === selectedRecordId,
  );

  return (
    <div className="workbench-grid">
      <section className="panel record-browser">
        <SectionHeader icon={Database} title="Raw records" subtitle="Fragmented records before UBID assignment." />
        <div className="search-shell">
          <Search size={16} aria-hidden="true" />
          <span>Filter by name, department, PIN, or identifier</span>
        </div>
        <div className="record-list">
          {sourceRecords.map((record) => (
            <button
              className={`record-row ${selectedRecordId === record.id ? "is-selected" : ""}`}
              key={record.id}
              onClick={() => setSelectedRecordId(record.id)}
              type="button"
            >
              <div>
                <strong>{record.name}</strong>
                <span>{record.address}</span>
              </div>
              <DepartmentPill department={departmentById[record.departmentId]} />
            </button>
          ))}
        </div>
      </section>

      <section className="panel standardise-panel">
        <SectionHeader icon={SlidersHorizontal} title="Standardisation engine" subtitle="Noisy fields become comparable signals." />
        <div className="standard-table">
          <FieldTransform label="Business name" raw={selectedRecord.name} clean={tokenFingerprint(selectedRecord.name)} />
          <FieldTransform label="Address" raw={selectedRecord.address} clean={normalizeText(selectedRecord.address)} />
          <FieldTransform label="Identifier health" raw={selectedRecord.gstin || selectedRecord.pan || "Missing"} clean={identifierHealth(selectedRecord)} />
          <FieldTransform label="Geography" raw={`${selectedRecord.district}, ${selectedRecord.pin}`} clean={`${selectedRecord.district.toLowerCase()} | ${selectedRecord.pin}`} />
        </div>
        <div className="selected-record-card">
          <div className="selected-record-head">
            <Factory size={20} aria-hidden="true" />
            <div>
              <strong>{selectedRecord.name}</strong>
              <span>{selectedRecord.id}</span>
            </div>
          </div>
          <RecordFacts record={selectedRecord} departmentById={departmentById} />
        </div>
      </section>

      <section className="panel match-panel">
        <SectionHeader icon={Fingerprint} title="Candidate UBID links" subtitle="Weighted evidence creates explainable decisions." />
        {relatedMatches.length === 0 ? (
          <EmptyState
            icon={FileSearch}
            title="No candidate links"
            copy="This record remains separate until another department signal produces defensible evidence."
          />
        ) : (
          <div className="candidate-stack">
            {relatedMatches.map((match) => (
              <CandidateCard
                departmentById={departmentById}
                decision={decisions[match.id]}
                key={match.id}
                match={match}
                recordById={recordById}
                onInspect={() => setSelectedMatchId(match.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function ReviewView({
  departmentById,
  decisions,
  handleDecision,
  recordById,
  selectedMatch,
  selectedMatchId,
  setSelectedMatchId,
}) {
  const recordA = recordById[selectedMatch.recordA];
  const recordB = recordById[selectedMatch.recordB];
  const currentDecision = decisions[selectedMatch.id];
  const reviewItems = candidateMatches.filter((match) => match.band !== "High");

  return (
    <div className="review-layout">
      <section className="panel queue-panel">
        <SectionHeader icon={ClipboardCheck} title="Reviewer inbox" subtitle="Medium cases need a human decision before UBID linking." />
        <div className="queue-list">
          {reviewItems.map((match) => {
            const decision = decisions[match.id];
            return (
              <button
                className={`queue-item ${selectedMatchId === match.id ? "is-selected" : ""}`}
                key={match.id}
                onClick={() => setSelectedMatchId(match.id)}
                type="button"
              >
                <div>
                  <strong>
                    {recordById[match.recordA].name} <span>vs</span> {recordById[match.recordB].name}
                  </strong>
                  <small>{match.explanation}</small>
                </div>
                <div className="queue-meta">
                  <ConfidenceDial confidence={match.confidence} />
                  <DecisionBadge decision={decision} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="panel evidence-panel">
        <SectionHeader
          icon={Scale}
          title="Defendable linkage evidence"
          subtitle="The reviewer sees why a merge is proposed and what could go wrong."
        />
        <div className="record-compare">
          <RecordCompareCard record={recordA} department={departmentById[recordA.departmentId]} />
          <div className="compare-bridge">
            <ConfidenceDial confidence={selectedMatch.confidence} large />
            <Badge tone={selectedMatch.band === "Low" ? "danger" : "warning"}>{selectedMatch.band} confidence</Badge>
          </div>
          <RecordCompareCard record={recordB} department={departmentById[recordB.departmentId]} />
        </div>

        <div className="explain-card">
          <div>
            <p className="eyebrow">Reason for decision</p>
            <strong>{selectedMatch.explanation}</strong>
          </div>
          <SignalBars signals={selectedMatch.signals} />
        </div>

        <div className="review-actions">
          <button
            className="button button-primary"
            disabled={currentDecision === "approved" || selectedMatch.band === "Low"}
            onClick={() => handleDecision(selectedMatch.id, "approved")}
            type="button"
          >
            <CheckCircle2 size={16} aria-hidden="true" />
            Approve link
          </button>
          <button
            className="button button-danger"
            disabled={currentDecision === "rejected"}
            onClick={() => handleDecision(selectedMatch.id, "rejected")}
            type="button"
          >
            <XCircle size={16} aria-hidden="true" />
            Keep separate
          </button>
          <div className="decision-state">
            <DecisionBadge decision={currentDecision} />
            <span>Audit trail writes reviewer, timestamp, and evidence snapshot.</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function ActivityView({
  activityFilter,
  departmentById,
  selectedBusiness,
  selectedBusinessId,
  setActivityFilter,
  setSelectedBusinessId,
}) {
  const filters = ["All", ...statusOrder, "Unmatched"];
  const visibleBusinesses =
    activityFilter === "All"
      ? businesses
      : businesses.filter((business) => business.status === activityFilter);
  const events = activityEvents
    .filter((event) => event.ubid === selectedBusiness.ubid)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="activity-grid">
      <section className="panel">
        <SectionHeader icon={Gauge} title="Activity classifier" subtitle="Status is evidence-backed, not guessed." />
        <div className="filter-row">
          {filters.map((filter) => (
            <button
              className={`filter-button ${activityFilter === filter ? "is-active" : ""}`}
              key={filter}
              onClick={() => setActivityFilter(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>
        {activityFilter === "Unmatched" ? (
          <div className="unmatched-list">
            {unmatchedEvents.map((event) => (
              <div className="unmatched-item" key={event.id}>
                <AlertTriangle size={18} aria-hidden="true" />
                <div>
                  <strong>{event.sourceName}</strong>
                  <span>
                    {event.type} from {departmentById[event.departmentId].short} on {formatDate(event.date)}
                  </span>
                  <p>{event.detail}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="business-list">
            {visibleBusinesses.map((business) => (
              <button
                className={`business-row ${selectedBusinessId === business.id ? "is-selected" : ""}`}
                key={business.id}
                onClick={() => setSelectedBusinessId(business.id)}
                type="button"
              >
                <div>
                  <strong>{business.name}</strong>
                  <span>{business.ubid}</span>
                </div>
                <StatusBadge status={business.status} />
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="panel activity-detail">
        <SectionHeader
          icon={LineChart}
          title={selectedBusiness.name}
          subtitle={`${selectedBusiness.ubid} | ${selectedBusiness.district}`}
        />
        <div className="classification-card">
          <div>
            <p className="eyebrow">Current classification</p>
            <StatusBadge status={selectedBusiness.status} />
          </div>
          <div>
            <p className="eyebrow">Last activity</p>
            <strong>{formatDate(selectedBusiness.lastActivity)}</strong>
            <span>{daysSince(selectedBusiness.lastActivity)} days ago</span>
          </div>
          <div>
            <p className="eyebrow">Freshness</p>
            <strong>{classifyFreshness(selectedBusiness.status)}</strong>
            <span>Window: 18 months</span>
          </div>
        </div>
        <div className="reason-box">
          <ShieldCheck size={18} aria-hidden="true" />
          <span>{selectedBusiness.reason}</span>
        </div>
        <div className="timeline">
          {events.map((event) => (
            <div className="timeline-item" key={event.id}>
              <span className="timeline-dot" />
              <div>
                <div className="timeline-head">
                  <strong>{event.type}</strong>
                  <DepartmentPill department={departmentById[event.departmentId]} />
                </div>
                <p>{event.detail}</p>
                <small>
                  {formatDate(event.date)} | {event.strength} signal
                </small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AnalyticsView({ selectedQuery, selectedQueryId, setSelectedQueryId }) {
  return (
    <div className="analytics-grid">
      <section className="panel">
        <SectionHeader icon={Table2} title="Analytics query shelf" subtitle="Built on UBIDs, not department-specific IDs." />
        <div className="query-list">
          {queryResults.map((query) => (
            <button
              className={`query-card ${selectedQueryId === query.id ? "is-selected" : ""}`}
              key={query.id}
              onClick={() => setSelectedQueryId(query.id)}
              type="button"
            >
              <strong>{query.title}</strong>
              <span>{query.question}</span>
              <Badge tone="info">{query.insight}</Badge>
            </button>
          ))}
        </div>
      </section>

      <section className="panel query-output">
        <SectionHeader icon={Search} title={selectedQuery.title} subtitle={selectedQuery.question} />
        <div className="insight-banner">
          <Zap size={18} aria-hidden="true" />
          <span>{selectedQuery.insight}</span>
        </div>
        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>Business</th>
                <th>District</th>
                <th>Evidence</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedQuery.rows.map((row) => (
                <tr key={row.join("-")}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="chart-panel">
          <SectionHeader icon={BarChart3} title="District activity distribution" subtitle="Aggregated after identity resolution." compact />
          <div className="stack-chart">
            {districtSignals.map((district) => {
              const total = district.active + district.dormant + district.closed;
              return (
                <div className="stack-row" key={district.district}>
                  <span>{district.district}</span>
                  <div className="stack-track" aria-label={`${district.district} activity distribution`}>
                    <i className="active" style={{ width: `${(district.active / total) * 100}%` }} />
                    <i className="dormant" style={{ width: `${(district.dormant / total) * 100}%` }} />
                    <i className="closed" style={{ width: `${(district.closed / total) * 100}%` }} />
                  </div>
                  <small>{total.toLocaleString("en-IN")}</small>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function ArchitectureView() {
  return (
    <div className="view-stack">
      <section className="panel">
        <SectionHeader
          icon={Network}
          title="Non-intrusive system architecture"
          subtitle="UBID-X sits above existing systems and produces a trusted intelligence layer."
        />
        <div className="architecture-lane">
          {architectureNodes.map((node, index) => (
            <div className="architecture-node" key={node.title}>
              <span>{index + 1}</span>
              <strong>{node.title}</strong>
              <p>{node.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="split-grid">
        <section className="panel">
          <SectionHeader icon={Database} title="Proposed stack" subtitle="Production-oriented and pilot-feasible." />
          <div className="stack-list">
            <StackRow label="Backend" value="Python FastAPI" />
            <StackRow label="Entity scoring" value="Rules + embeddings + reviewer feedback" />
            <StackRow label="Graph layer" value="Neo4j for UBID relationships" />
            <StackRow label="System of record" value="PostgreSQL audit store" />
            <StackRow label="Scale path" value="Spark jobs for 40+ systems" />
            <StackRow label="Frontend" value="React + Vite, Vercel-ready" />
          </div>
        </section>
        <section className="panel">
          <SectionHeader icon={ShieldCheck} title="Risk controls" subtitle="The product is built around government trust." />
          <div className="risk-list">
            <RiskControl title="False positive merge" copy="Conservative thresholds, review queue, reversible links, full evidence." />
            <RiskControl title="Poor free-text quality" copy="Name/address standardisation, synonym handling, and multi-signal scoring." />
            <RiskControl title="Missing identifiers" copy="Probabilistic matching is allowed, but cannot bypass decision bands." />
            <RiskControl title="Activity inference errors" copy="Transparent windows, evidence lists, and adjustable policy thresholds." />
          </div>
        </section>
      </div>

      <section className="panel">
        <SectionHeader icon={GitBranch} title="Implementation roadmap" subtitle="Clear pilot scope with credible scale-up path." />
        <div className="roadmap">
          <RoadmapStep title="MVP pilot" items={["3-4 department datasets", "UBID confidence scoring", "Reviewer workflow", "Activity classification"]} />
          <RoadmapStep title="Pilot deployment" items={["Source connectors", "Audit APIs", "Reviewer roles", "District dashboards"]} />
          <RoadmapStep title="Statewide scale" items={["40+ systems", "Continuous learning", "Real-time events", "Advanced policy queries"]} />
        </div>
      </section>
    </div>
  );
}

function ProductGuideView({ pendingCount }) {
  const steps = [
    {
      time: "01",
      title: "Check the operating picture",
      copy: "Start from Mission Control to understand source coverage, confidence bands, and district-level activity.",
    },
    {
      time: "02",
      title: "Generate and inspect UBIDs",
      copy: "Open UBID Generator, select a raw record, and review the standardised fields and candidate links.",
    },
    {
      time: "03",
      title: "Resolve review cases",
      copy: "Use Review Queue to approve or reject medium-confidence links after checking the evidence panel.",
    },
    {
      time: "04",
      title: "Monitor activity status",
      copy: "Use Activity Intel to inspect Active, Dormant, Closed, and Unmatched events with clear reasons.",
    },
    {
      time: "05",
      title: "Act on insights",
      copy: "Use Analytics to find missing registrations, dormant high-employment units, and risky merge patterns.",
    },
  ];

  return (
    <div className="demo-layout">
      <section className="panel">
        <SectionHeader icon={Route} title="Operator workflow" subtitle="A practical path for using UBID-X from identity resolution to action." />
        <div className="demo-timeline">
          {steps.map((step) => (
            <div className="demo-step" key={step.time}>
              <span>{step.time}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <SectionHeader icon={BadgeCheck} title="Product readiness" subtitle="The prototype is structured like a real government intelligence layer." />
        <div className="score-grid">
          <ScoreTile label="Core value" value="Identity + activity in one layer" icon={Fingerprint} />
          <ScoreTile label="Trust" value="No merge without evidence" icon={ShieldCheck} />
          <ScoreTile label="Deployment" value="Works without replacing systems" icon={Database} />
          <ScoreTile label="Operations" value={`${pendingCount} review cases currently pending`} icon={Users} />
        </div>
        <div className="pitch-card">
          <p className="eyebrow">Product promise</p>
          <strong>
            UBID-X is not just record linkage. It is a trusted operating picture of Karnataka's
            business ecosystem.
          </strong>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, subtitle, compact = false }) {
  return (
    <div className={`section-header ${compact ? "is-compact" : ""}`}>
      <div className="section-icon">
        <Icon size={18} aria-hidden="true" />
      </div>
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, detail, tone }) {
  return (
    <div className={`metric-card tone-${tone}`}>
      <Icon size={22} aria-hidden="true" />
      <span>{label}</span>
      <strong>{value.toLocaleString("en-IN")}</strong>
      <small>{detail}</small>
    </div>
  );
}

function DecisionRow({ label, value, score, tone }) {
  return (
    <div className="decision-row">
      <div>
        <span className={`status-dot ${tone}`} />
        <strong>{label}</strong>
      </div>
      <span>{value}</span>
      <small>{score}</small>
    </div>
  );
}

function ProofPoint({ icon: Icon, title, copy }) {
  return (
    <div className="proof-point">
      <Icon size={18} aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <p>{copy}</p>
      </div>
    </div>
  );
}

function DistrictRow({ district, active, dormant, closed }) {
  const total = active + dormant + closed;
  return (
    <div className="district-row">
      <div>
        <strong>{district}</strong>
        <span>{total.toLocaleString("en-IN")} UBIDs</span>
      </div>
      <div className="district-bars">
        <i className="active" style={{ width: `${(active / total) * 100}%` }} />
        <i className="dormant" style={{ width: `${(dormant / total) * 100}%` }} />
        <i className="closed" style={{ width: `${(closed / total) * 100}%` }} />
      </div>
    </div>
  );
}

function StatusCount({ status }) {
  const count = businesses.filter((business) => business.status === status).length;
  return (
    <div className="status-count">
      <StatusBadge status={status} />
      <strong>{count}</strong>
      <span>businesses</span>
    </div>
  );
}

function FieldTransform({ label, raw, clean }) {
  return (
    <div className="field-transform">
      <span>{label}</span>
      <div>
        <p>{raw || "Missing"}</p>
        <ArrowRight size={14} aria-hidden="true" />
        <strong>{clean || "missing"}</strong>
      </div>
    </div>
  );
}

function RecordFacts({ record, departmentById }) {
  return (
    <dl className="fact-grid">
      <div>
        <dt>Department</dt>
        <dd>{departmentById[record.departmentId].short}</dd>
      </div>
      <div>
        <dt>PIN</dt>
        <dd>{record.pin}</dd>
      </div>
      <div>
        <dt>PAN</dt>
        <dd>{record.pan || "Missing"}</dd>
      </div>
      <div>
        <dt>GSTIN</dt>
        <dd>{record.gstin || "Missing"}</dd>
      </div>
    </dl>
  );
}

function CandidateCard({ departmentById, decision, match, recordById, onInspect }) {
  const recordA = recordById[match.recordA];
  const recordB = recordById[match.recordB];
  return (
    <button className="candidate-card" onClick={onInspect} type="button">
      <div className="candidate-top">
        <ConfidenceDial confidence={match.confidence} />
        <div>
          <strong>{recordB.name}</strong>
          <span>
            {departmentById[recordA.departmentId].short} to {departmentById[recordB.departmentId].short}
          </span>
        </div>
      </div>
      <p>{match.explanation}</p>
      <div className="candidate-footer">
        <Badge tone={match.band === "High" ? "success" : match.band === "Low" ? "danger" : "warning"}>
          {match.band}
        </Badge>
        <DecisionBadge decision={decision} />
      </div>
    </button>
  );
}

function RecordCompareCard({ record, department }) {
  return (
    <div className="compare-card">
      <DepartmentPill department={department} />
      <strong>{record.name}</strong>
      <p>{record.address}</p>
      <dl>
        <div>
          <dt>PAN</dt>
          <dd>{record.pan || "Missing"}</dd>
        </div>
        <div>
          <dt>GSTIN</dt>
          <dd>{record.gstin || "Missing"}</dd>
        </div>
        <div>
          <dt>Owner</dt>
          <dd>{record.owner}</dd>
        </div>
        <div>
          <dt>PIN</dt>
          <dd>{record.pin}</dd>
        </div>
      </dl>
    </div>
  );
}

function SignalBars({ signals }) {
  return (
    <div className="signal-bars">
      {Object.entries(signals).map(([label, value]) => (
        <div className="signal-row" key={label}>
          <span>{label}</span>
          <div>
            <i style={{ width: `${value}%`, background: confidenceColor(value) }} />
          </div>
          <strong>{value}%</strong>
        </div>
      ))}
    </div>
  );
}

function ConfidenceDial({ confidence, large = false }) {
  return (
    <div className={`confidence-dial ${large ? "is-large" : ""}`}>
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="16" />
        <circle
          cx="20"
          cy="20"
          r="16"
          style={{
            strokeDasharray: `${confidence} 100`,
            stroke: confidenceColor(confidence),
          }}
        />
      </svg>
      <span>{confidence}</span>
    </div>
  );
}

function DepartmentPill({ department }) {
  return (
    <span className="department-pill">
      <i style={{ backgroundColor: department.color }} />
      {department.short}
    </span>
  );
}

function DecisionBadge({ decision }) {
  const labels = {
    "auto-linked": ["Auto-linked", "success"],
    review: ["Review", "warning"],
    separate: ["Separate", "danger"],
    approved: ["Approved", "success"],
    rejected: ["Rejected", "danger"],
  };
  const [label, tone] = labels[decision] || ["Review", "warning"];
  return <Badge tone={tone}>{label}</Badge>;
}

function Badge({ children, tone = "neutral" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function StatusBadge({ status }) {
  const tone = status === "Active" ? "success" : status === "Dormant" ? "warning" : "danger";
  return <Badge tone={tone}>{status}</Badge>;
}

function EmptyState({ icon: Icon, title, copy }) {
  return (
    <div className="empty-state">
      <Icon size={24} aria-hidden="true" />
      <strong>{title}</strong>
      <p>{copy}</p>
    </div>
  );
}

function StackRow({ label, value }) {
  return (
    <div className="stack-row-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function RiskControl({ title, copy }) {
  return (
    <div className="risk-control">
      <ShieldCheck size={18} aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <p>{copy}</p>
      </div>
    </div>
  );
}

function RoadmapStep({ title, items }) {
  return (
    <div className="roadmap-step">
      <strong>{title}</strong>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ScoreTile({ icon: Icon, label, value }) {
  return (
    <div className="score-tile">
      <Icon size={20} aria-hidden="true" />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;
