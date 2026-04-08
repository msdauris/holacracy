import { useMemo, useState } from 'react'
import './App.css'

const TOOL_LABELS = {
  roles: 'SharePoint Lists',
  projects: 'Jira Cloud',
  governance: 'Confluence Cloud',
  visualization: 'Visio (embedded in Confluence)',
  notifications: 'Slack (via Jira + Power Automate)',
  metrics: 'Power BI (embedded in Confluence)',
  nextActions: 'Jira Cloud (exportable to other tools)',
}

const circles = [
  {
    id: 'operations',
    name: 'Operations',
    parentId: null,
    roles: [
      {
        id: 'ops-facilitator',
        name: 'Circle Facilitator',
        purpose: 'Keep operations priorities flowing across teams.',
        accountabilities: [
          'Run tactical meetings and triage blockers.',
          'Coordinate cross-circle dependencies for delivery.',
          'Track SLA and throughput trends weekly.',
        ],
        domains: ['Meeting Cadence', 'Operations Metrics'],
        assignedPerson: 'Maria Costa',
      },
      {
        id: 'ops-resource',
        name: 'Resource Planner',
        purpose: 'Ensure staffing and capacity support commitments.',
        accountabilities: [
          'Maintain team allocation and on-call schedules.',
          'Forecast capacity against roadmap demand.',
          'Escalate staffing gaps to lead link.',
        ],
        domains: ['Staffing Plans', 'Capacity Board'],
        assignedPerson: null,
      },
      {
        id: 'ops-vendor',
        name: 'Vendor Coordinator',
        purpose: 'Maintain reliable partner and procurement workflows.',
        accountabilities: [
          'Review vendor performance and renewals.',
          'Validate purchase requests against policy.',
          'Keep procurement SLA documentation current.',
        ],
        domains: ['Vendor Contracts', 'Procurement Process'],
        assignedPerson: 'Avery Kim',
      },
    ],
    projects: [
      {
        id: 'ops-p1',
        roleId: 'ops-facilitator',
        name: 'Incident Response Runbook Upgrade',
        status: 'active',
        owner: 'Maria Costa',
        lastUpdated: '2026-04-05',
        tasks: ['Map critical paths', 'Finalize severity matrix', 'Train responders'],
      },
      {
        id: 'ops-p2',
        roleId: 'ops-facilitator',
        name: 'Shift Handoff Standardization',
        status: 'done',
        owner: 'Maria Costa',
        lastUpdated: '2026-04-06',
        tasks: ['Define handoff template', 'Pilot with support pod', 'Publish final process'],
      },
      {
        id: 'ops-p3',
        roleId: 'ops-resource',
        name: 'Q2 Capacity Rebalancing',
        status: 'active',
        owner: 'Unassigned',
        lastUpdated: '2026-03-30',
        tasks: ['Review utilization', 'Adjust allocations', 'Confirm with leads'],
      },
      {
        id: 'ops-p4',
        roleId: 'ops-resource',
        name: 'Backfill Hiring Coordination',
        status: 'active',
        owner: 'Unassigned',
        lastUpdated: '2026-03-28',
        tasks: ['Open reqs with HR', 'Align interview panel', 'Publish timeline'],
      },
      {
        id: 'ops-p5',
        roleId: 'ops-vendor',
        name: 'Supplier Risk Heatmap',
        status: 'active',
        owner: 'Avery Kim',
        lastUpdated: '2026-03-19',
        tasks: ['Collect vendor scorecards', 'Identify high-risk vendors', 'Draft mitigations'],
      },
      {
        id: 'ops-p6',
        roleId: 'ops-vendor',
        name: 'Procurement Portal Refresh',
        status: 'done',
        owner: 'Avery Kim',
        lastUpdated: '2026-04-04',
        tasks: ['Update policy docs', 'Improve request form UX', 'Announce rollout'],
      },
    ],
    governance: [
      { id: 'ops-g1', title: 'Weekly Tactical Notes', date: '2026-04-01', author: 'Maria Costa' },
      { id: 'ops-g2', title: 'Decision: Incident Commander Rotation', date: '2026-03-26', author: 'Avery Kim' },
      { id: 'ops-g3', title: 'Decision: Supplier Risk Threshold', date: '2026-03-20', author: 'Maria Costa' },
    ],
  },
  {
    id: 'product',
    name: 'Product',
    parentId: null,
    roles: [
      {
        id: 'prod-strategy',
        name: 'Product Strategist',
        purpose: 'Translate customer insights into roadmap direction.',
        accountabilities: [
          'Own roadmap hypotheses and outcomes.',
          'Prioritize initiatives with circle lead link.',
          'Maintain discovery notes and assumptions.',
        ],
        domains: ['Roadmap', 'Opportunity Backlog'],
        assignedPerson: 'Daniel Reed',
      },
      {
        id: 'prod-research',
        name: 'Research Lead',
        purpose: 'Surface validated insights from user behavior.',
        accountabilities: [
          'Plan monthly qualitative research sessions.',
          'Maintain insight repository and themes.',
          'Present findings in governance meetings.',
        ],
        domains: ['Research Repository', 'Interview Scripts'],
        assignedPerson: 'Priya Shah',
      },
      {
        id: 'prod-ops',
        name: 'Product Ops Analyst',
        purpose: 'Keep product delivery and metrics consistent.',
        accountabilities: [
          'Track product KPI scorecards weekly.',
          'Audit workflow hygiene across squads.',
          'Coordinate release readiness checks.',
        ],
        domains: ['Release Checklist', 'KPI Dashboard'],
        assignedPerson: null,
      },
    ],
    projects: [
      {
        id: 'prod-p1',
        roleId: 'prod-strategy',
        name: 'Self-Serve Onboarding Revamp',
        status: 'active',
        owner: 'Daniel Reed',
        lastUpdated: '2026-04-07',
        tasks: ['Finalize onboarding narrative', 'Prioritize MVP flows', 'Align launch metrics'],
      },
      {
        id: 'prod-p2',
        roleId: 'prod-strategy',
        name: 'Enterprise Packaging Experiment',
        status: 'active',
        owner: 'Daniel Reed',
        lastUpdated: '2026-03-24',
        tasks: ['Define pricing hypotheses', 'Review with finance', 'Prepare pilot deck'],
      },
      {
        id: 'prod-p3',
        roleId: 'prod-research',
        name: 'Churn Interview Sprint',
        status: 'active',
        owner: 'Priya Shah',
        lastUpdated: '2026-03-22',
        tasks: ['Recruit churned users', 'Run 8 interviews', 'Summarize root causes'],
      },
      {
        id: 'prod-p4',
        roleId: 'prod-research',
        name: 'Feature Adoption Baseline',
        status: 'done',
        owner: 'Priya Shah',
        lastUpdated: '2026-04-03',
        tasks: ['Instrument events', 'Build dashboard', 'Share benchmark'],
      },
      {
        id: 'prod-p5',
        roleId: 'prod-ops',
        name: 'Release Notes Automation',
        status: 'active',
        owner: 'Unassigned',
        lastUpdated: '2026-03-18',
        tasks: ['Define release template', 'Connect issue metadata', 'Set weekly digest'],
      },
      {
        id: 'prod-p6',
        roleId: 'prod-ops',
        name: 'Roadmap Health Scoring',
        status: 'active',
        owner: 'Unassigned',
        lastUpdated: '2026-03-21',
        tasks: ['Design scoring rubric', 'Auto-populate from Jira', 'Review in governance'],
      },
    ],
    governance: [
      { id: 'prod-g1', title: 'Monthly Governance Minutes', date: '2026-04-02', author: 'Daniel Reed' },
      { id: 'prod-g2', title: 'Decision: Onboarding Scope for Q2', date: '2026-03-27', author: 'Priya Shah' },
      { id: 'prod-g3', title: 'Decision: Metrics Review Cadence', date: '2026-03-14', author: 'Daniel Reed' },
    ],
  },
  {
    id: 'people',
    name: 'People',
    parentId: null,
    roles: [
      {
        id: 'people-culture',
        name: 'Culture Steward',
        purpose: 'Nurture engagement and healthy team rituals.',
        accountabilities: [
          'Own monthly engagement pulse process.',
          'Coordinate rituals for cross-circle cohesion.',
          'Track follow-up actions with lead links.',
        ],
        domains: ['Engagement Pulse', 'Team Rituals'],
        assignedPerson: 'Nora Diaz',
      },
      {
        id: 'people-learning',
        name: 'Learning Coordinator',
        purpose: 'Build role-relevant growth paths and training.',
        accountabilities: [
          'Manage onboarding learning paths.',
          'Curate internal capability workshops.',
          'Measure training completion and impact.',
        ],
        domains: ['Learning Hub', 'Training Calendar'],
        assignedPerson: 'Oliver Grant',
      },
      {
        id: 'people-recruiting',
        name: 'Recruiting Partner',
        purpose: 'Support talent pipeline and hiring quality.',
        accountabilities: [
          'Own role intake process with circles.',
          'Track time-to-fill and conversion metrics.',
          'Run weekly recruiting sync updates.',
        ],
        domains: ['Hiring Pipeline', 'Interview Guides'],
        assignedPerson: null,
      },
    ],
    projects: [
      {
        id: 'people-p1',
        roleId: 'people-culture',
        name: 'Engagement Pulse v2',
        status: 'active',
        owner: 'Nora Diaz',
        lastUpdated: '2026-04-04',
        tasks: ['Refine survey questions', 'Launch pulse', 'Review trends with leads'],
      },
      {
        id: 'people-p2',
        roleId: 'people-culture',
        name: 'All-Hands Format Refresh',
        status: 'done',
        owner: 'Nora Diaz',
        lastUpdated: '2026-04-01',
        tasks: ['Collect feedback', 'Pilot new format', 'Publish facilitation guide'],
      },
      {
        id: 'people-p3',
        roleId: 'people-learning',
        name: 'Leadership Training Cohort',
        status: 'active',
        owner: 'Oliver Grant',
        lastUpdated: '2026-03-26',
        tasks: ['Finalize curriculum', 'Assign mentors', 'Run kickoff session'],
      },
      {
        id: 'people-p4',
        roleId: 'people-learning',
        name: 'Onboarding Program Audit',
        status: 'active',
        owner: 'Oliver Grant',
        lastUpdated: '2026-03-15',
        tasks: ['Map onboarding journey', 'Identify gaps', 'Create improvement backlog'],
      },
      {
        id: 'people-p5',
        roleId: 'people-recruiting',
        name: 'Hiring Funnel Instrumentation',
        status: 'active',
        owner: 'Unassigned',
        lastUpdated: '2026-03-20',
        tasks: ['Define funnel events', 'Implement dashboard', 'Review bottlenecks'],
      },
      {
        id: 'people-p6',
        roleId: 'people-recruiting',
        name: 'Referral Program Relaunch',
        status: 'active',
        owner: 'Unassigned',
        lastUpdated: '2026-03-17',
        tasks: ['Redesign referral rules', 'Draft communication plan', 'Track referral quality'],
      },
    ],
    governance: [
      { id: 'people-g1', title: 'People Circle Tactical Summary', date: '2026-04-03', author: 'Nora Diaz' },
      { id: 'people-g2', title: 'Decision: Learning Budget Allocation', date: '2026-03-25', author: 'Oliver Grant' },
      { id: 'people-g3', title: 'Decision: Interview Panel Standards', date: '2026-03-16', author: 'Nora Diaz' },
    ],
  },
]

const tabs = [
  { id: 'roles', label: 'Roles' },
  { id: 'projects', label: 'Projects' },
  { id: 'next-actions', label: 'Next Actions' },
  { id: 'governance', label: 'Governance' },
  { id: 'notifications', label: 'Notifications' },
]

const STALE_DAYS = 14
const HUB_URL = 'https://confluence.company.com/display/HOL/Holacracy+Hub'
const NEXT_ACTION_FIELDS = [
  'actionId',
  'circleId',
  'roleId',
  'projectKey',
  'actionTitle',
  'owner',
  'dueDate',
  'status',
  'priority',
  'source',
  'createdFromDecisionId',
]

const nextActions = [
  {
    actionId: 'NA-101',
    circleId: 'operations',
    roleId: 'ops-facilitator',
    projectKey: 'OPS-41',
    actionTitle: 'Schedule incident command simulation',
    owner: 'Maria Costa',
    dueDate: '2026-04-11',
    status: 'in_progress',
    priority: 'High',
    source: 'tactical',
    createdFromDecisionId: 'ops-g2',
    tension: 'Incident response readiness is inconsistent between shifts.',
    idealOutcome: 'Every shift can run the same command protocol confidently.',
  },
  {
    actionId: 'NA-102',
    circleId: 'operations',
    roleId: 'ops-resource',
    projectKey: 'OPS-52',
    actionTitle: 'Nominate owner for capacity board',
    owner: 'Unassigned',
    dueDate: '2026-04-10',
    status: 'blocked',
    priority: 'High',
    source: 'tactical',
    createdFromDecisionId: 'ops-g1',
    tension: 'Capacity allocation has no explicit accountable owner.',
    idealOutcome: 'One owner updates and publishes allocation weekly.',
  },
  {
    actionId: 'NA-201',
    circleId: 'product',
    roleId: 'prod-strategy',
    projectKey: 'PROD-88',
    actionTitle: 'Confirm onboarding KPI baseline',
    owner: 'Daniel Reed',
    dueDate: '2026-04-12',
    status: 'new',
    priority: 'Medium',
    source: 'tactical',
    createdFromDecisionId: 'prod-g2',
    tension: 'Onboarding goals are debated without shared KPI baseline.',
    idealOutcome: 'A single KPI baseline is used in all prioritization.',
  },
  {
    actionId: 'NA-202',
    circleId: 'product',
    roleId: 'prod-ops',
    projectKey: 'PROD-92',
    actionTitle: 'Publish release-note taxonomy',
    owner: 'Unassigned',
    dueDate: '2026-04-09',
    status: 'blocked',
    priority: 'High',
    source: 'retro',
    createdFromDecisionId: 'prod-g3',
    tension: 'Release notes are inconsistent across squads.',
    idealOutcome: 'Every release uses a common taxonomy and template.',
  },
  {
    actionId: 'NA-301',
    circleId: 'people',
    roleId: 'people-learning',
    projectKey: 'PEOP-17',
    actionTitle: 'Lock mentor cohort assignments',
    owner: 'Oliver Grant',
    dueDate: '2026-04-13',
    status: 'in_progress',
    priority: 'Medium',
    source: 'tactical',
    createdFromDecisionId: 'people-g2',
    tension: 'Mentor allocation is unclear before cohort launch.',
    idealOutcome: 'Each participant has a confirmed mentor before kickoff.',
  },
  {
    actionId: 'NA-302',
    circleId: 'people',
    roleId: 'people-recruiting',
    projectKey: 'PEOP-21',
    actionTitle: 'Define hiring panel SLA',
    owner: 'Unassigned',
    dueDate: '2026-04-08',
    status: 'new',
    priority: 'High',
    source: 'tactical',
    createdFromDecisionId: 'people-g3',
    tension: 'Hiring panel response times are too variable.',
    idealOutcome: 'Panel SLA is explicit and monitored weekly.',
  },
]

function getDaysSince(dateText) {
  const now = new Date('2026-04-08')
  const updated = new Date(dateText)
  return Math.floor((now - updated) / (1000 * 60 * 60 * 24))
}

function toCsv(rows) {
  const header = NEXT_ACTION_FIELDS.join(',')
  const body = rows
    .map((row) =>
      NEXT_ACTION_FIELDS.map((field) => `"${String(row[field] ?? '').replaceAll('"', '""')}"`).join(','),
    )
    .join('\n')
  return `${header}\n${body}`
}

function toMarkdownTable(rows) {
  const header = `| ${NEXT_ACTION_FIELDS.join(' | ')} |`
  const divider = `| ${NEXT_ACTION_FIELDS.map(() => '---').join(' | ')} |`
  const body = rows
    .map((row) => `| ${NEXT_ACTION_FIELDS.map((field) => row[field] ?? '').join(' | ')} |`)
    .join('\n')
  return `${header}\n${divider}\n${body}`
}

function downloadText(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

function App() {
  const [activeCircleId, setActiveCircleId] = useState(circles[0].id)
  const [activeTab, setActiveTab] = useState('roles')
  const [exportMessage, setExportMessage] = useState('')

  const activeCircle = useMemo(
    () => circles.find((circle) => circle.id === activeCircleId) || circles[0],
    [activeCircleId],
  )

  const projectsWithDerivedStatus = useMemo(
    () =>
      activeCircle.projects.map((project) => {
        const daysSinceUpdate = getDaysSince(project.lastUpdated)
        const isStalled = project.status !== 'done' && daysSinceUpdate >= STALE_DAYS
        return {
          ...project,
          daysSinceUpdate,
          computedStatus: isStalled ? 'stalled' : project.status,
        }
      }),
    [activeCircle.projects],
  )

  const unassignedRoles = activeCircle.roles.filter((role) => !role.assignedPerson)
  const stalledProjects = projectsWithDerivedStatus.filter(
    (project) => project.computedStatus === 'stalled',
  )
  const activeProjects = projectsWithDerivedStatus.filter(
    (project) => project.computedStatus === 'active',
  )
  const doneProjects = projectsWithDerivedStatus.filter(
    (project) => project.computedStatus === 'done',
  )
  const filledRoles = activeCircle.roles.length - unassignedRoles.length
  const fillRate = Math.round((filledRoles / activeCircle.roles.length) * 100)
  const circleNextActions = nextActions.filter((action) => action.circleId === activeCircle.id)
  const overdueActions = circleNextActions.filter(
    (action) => action.status !== 'done' && getDaysSince(action.dueDate) > 0,
  )

  const exportNextActionsCsv = () => {
    downloadText(
      `${activeCircle.id}-next-actions.csv`,
      toCsv(circleNextActions),
      'text/csv;charset=utf-8',
    )
    setExportMessage('Exported CSV from mapped Jira-style action data.')
  }

  const exportNextActionsJson = () => {
    downloadText(
      `${activeCircle.id}-next-actions.json`,
      JSON.stringify(circleNextActions, null, 2),
      'application/json;charset=utf-8',
    )
    setExportMessage('Exported JSON for automation/API handoff.')
  }

  const copyNextActionsMarkdown = async () => {
    const markdown = toMarkdownTable(circleNextActions)
    try {
      await navigator.clipboard.writeText(markdown)
      setExportMessage('Copied Markdown table for docs, Notion, or chat.')
    } catch {
      setExportMessage('Clipboard copy blocked. Use CSV/JSON download instead.')
    }
  }

  const alertFeed = [
    ...stalledProjects.slice(0, 1).map(
      (project) =>
        `🔴 ${project.name} hasn't been updated in ${project.daysSinceUpdate} days — owner: ${project.owner}`,
    ),
    ...unassignedRoles.slice(0, 1).map(
      (role) => `🟡 Role ${role.name} in Circle ${activeCircle.name} is unassigned`,
    ),
    `📊 Weekly summary: ${activeProjects.length} active, ${stalledProjects.length} stalled, ${unassignedRoles.length} unassigned roles`,
  ]

  const embeddedViews = [
    {
      title: 'Circle Page Hub',
      description: 'Confluence parent page aggregating circle charter, links, and current governance priorities.',
    },
    {
      title: 'Meeting Notes Stream',
      description: 'Embedded Confluence meeting note index filtered to this circle.',
    },
    {
      title: 'Decision Register',
      description: 'Governance decisions with owners, dates, and follow-up actions.',
    },
  ]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Holacracy POC</h1>
          <span className="tool-badge" title={TOOL_LABELS.visualization}>
            Circle Visualization: {TOOL_LABELS.visualization}
          </span>
        </div>
        <nav className="circle-nav" aria-label="Circle navigation">
          <div className="circle-parent">Core Circle</div>
          <div className="circle-children">
            {circles.map((circle) => (
              <button
                key={circle.id}
                className={`circle-button ${circle.id === activeCircle.id ? 'active' : ''}`}
                onClick={() => setActiveCircleId(circle.id)}
                type="button"
              >
                <span className="circle-name">{circle.name}</span>
                <span className="circle-meta">
                  {circle.roles.length} roles, {circle.projects.length} projects
                </span>
              </button>
            ))}
          </div>
        </nav>

        <section className="viz-card">
          <div className="section-head tight">
            <h3>Circle Visualization</h3>
            <span className="tool-badge" title={TOOL_LABELS.visualization}>
              {TOOL_LABELS.visualization}
            </span>
          </div>
          <div className="viz-tree">
            <div className="viz-node root">Core Circle</div>
            {circles.map((circle) => (
              <div
                key={`viz-${circle.id}`}
                className={`viz-node child ${circle.id === activeCircle.id ? 'active' : ''}`}
              >
                {circle.name} ({circle.roles.length} roles)
              </div>
            ))}
          </div>
        </section>

        <section className="it-checklist">
          <h3>IT Decisions Needed</h3>
          <ul>
            <li>Confirm M365 license level (E3/E5).</li>
            <li>Confirm Jira/Confluence migration timeline.</li>
            <li>Assign SharePoint list owner and governance.</li>
            <li>Approve Power Automate posting to Slack.</li>
          </ul>
        </section>
      </aside>

      <main className="main-content">
        <section className="hub-banner">
          <div className="hub-banner-head">
            <div>
              <p className="hub-kicker">One Hub Operating Model</p>
              <h2>Single Confluence URL</h2>
              <p className="hub-url">{HUB_URL}</p>
            </div>
            <span className="tool-badge" title={TOOL_LABELS.governance}>
              Hub: {TOOL_LABELS.governance}
            </span>
          </div>
          <div className="hub-modules">
            <article className="hub-module">
              <h4>Roles & Accountabilities</h4>
              <p>Embedded role cards synced from SharePoint lists.</p>
              <span className="tool-badge">SharePoint Lists</span>
            </article>
            <article className="hub-module">
              <h4>Projects & Tasks</h4>
              <p>Jira project panels with live status and stalled flags.</p>
              <span className="tool-badge">Jira Cloud</span>
            </article>
            <article className="hub-module">
              <h4>Circle Visualization</h4>
              <p>Visio org chart embed refreshed from role/circle data.</p>
              <span className="tool-badge">Visio in Confluence</span>
            </article>
            <article className="hub-module">
              <h4>Metrics Dashboard</h4>
              <p>Power BI KPI tiles for fill rate and delivery health.</p>
              <span className="tool-badge">Power BI in Confluence</span>
            </article>
            <article className="hub-module">
              <h4>Notifications & Alerts</h4>
              <p>Slack feed powered by Jira + SharePoint automation rules.</p>
              <span className="tool-badge">Slack + Power Automate</span>
            </article>
          </div>
        </section>

        <header className="content-header">
          <div>
            <h2>{activeCircle.name} Circle</h2>
            <p>Prototype data model for role governance and execution visibility.</p>
          </div>
          <div className="tab-row">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        <section className="panel">
          {activeTab === 'roles' && (
            <>
              <div className="section-head">
                <h3>Roles</h3>
                <span className="tool-badge" title={TOOL_LABELS.roles}>
                  {TOOL_LABELS.roles}
                </span>
              </div>
              <div className="card-grid">
                {activeCircle.roles.map((role) => (
                  <article key={role.id} className="card role-card">
                    <div className="card-title-row">
                      <h4>{role.name}</h4>
                      <span className={`status-pill ${role.assignedPerson ? 'filled' : 'unassigned'}`}>
                        {role.assignedPerson ? 'Filled' : 'Unassigned'}
                      </span>
                    </div>
                    <p className="purpose">{role.purpose}</p>
                    <div>
                      <strong>Accountabilities</strong>
                      <ul>
                        {role.accountabilities.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <p>
                      <strong>Domains:</strong> {role.domains.join(', ')}
                    </p>
                    <p>
                      <strong>Assigned person:</strong> {role.assignedPerson || 'Unassigned'}
                    </p>
                  </article>
                ))}
              </div>
            </>
          )}

          {activeTab === 'projects' && (
            <>
              <div className="section-head">
                <h3>Projects</h3>
                <span className="tool-badge" title={TOOL_LABELS.projects}>
                  {TOOL_LABELS.projects}
                </span>
              </div>
              <div className="card-grid">
                {projectsWithDerivedStatus.map((project) => (
                  <article key={project.id} className="card project-card">
                    <div className="card-title-row">
                      <h4>{project.name}</h4>
                      <span className={`status-pill ${project.computedStatus}`}>
                        {project.computedStatus}
                      </span>
                    </div>
                    <p>
                      <strong>Owner:</strong> {project.owner}
                    </p>
                    <p>
                      <strong>Last updated:</strong> {project.lastUpdated} ({project.daysSinceUpdate} days ago)
                    </p>
                    <div>
                      <strong>Tasks</strong>
                      <ul>
                        {project.tasks.map((task) => (
                          <li key={task}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {activeTab === 'governance' && (
            <>
              <div className="section-head">
                <h3>Governance</h3>
                <span className="tool-badge" title={TOOL_LABELS.governance}>
                  Documentation & Hub: {TOOL_LABELS.governance}
                </span>
              </div>
              <div className="embedded-grid">
                {embeddedViews.map((view) => (
                  <article key={view.title} className="embedded-card">
                    <h4>{view.title}</h4>
                    <p>{view.description}</p>
                  </article>
                ))}
              </div>
              <div className="governance-list">
                {activeCircle.governance.map((item) => (
                  <article key={item.id} className="governance-item">
                    <h4>{item.title}</h4>
                    <p>
                      <strong>Date:</strong> {item.date}
                    </p>
                    <p>
                      <strong>Author:</strong> {item.author}
                    </p>
                  </article>
                ))}
              </div>
              <article className="governance-note">
                Governance here is intentionally scoped to constitutional changes:
                role definitions, purpose updates, domains, and ratified decisions.
              </article>
              <div className="section-head metrics-head">
                <h3>Metrics Dashboard</h3>
                <span className="tool-badge" title={TOOL_LABELS.metrics}>
                  {TOOL_LABELS.metrics}
                </span>
              </div>
              <div className="metrics-grid">
                <article className="metric-card">
                  <span className="metric-label">Role fill rate</span>
                  <strong>{fillRate}%</strong>
                </article>
                <article className="metric-card">
                  <span className="metric-label">Active vs stalled</span>
                  <strong>
                    {activeProjects.length} active / {stalledProjects.length} stalled
                  </strong>
                </article>
                <article className="metric-card">
                  <span className="metric-label">Accountability gaps</span>
                  <strong>{unassignedRoles.length} unassigned roles</strong>
                </article>
                <article className="metric-card">
                  <span className="metric-label">Delivery throughput</span>
                  <strong>{doneProjects.length} done projects</strong>
                </article>
                <article className="metric-card">
                  <span className="metric-label">Next actions overdue</span>
                  <strong>{overdueActions.length} overdue actions</strong>
                </article>
              </div>
            </>
          )}

          {activeTab === 'next-actions' && (
            <>
              <div className="section-head">
                <h3>Next Actions</h3>
                <span className="tool-badge" title={TOOL_LABELS.nextActions}>
                  {TOOL_LABELS.nextActions}
                </span>
              </div>
              <p className="actions-intro">
                Tactical work items that move a present tension toward an ideal outcome.
                These are operational/project-level actions, separate from governance role design.
              </p>
              <div className="actions-toolbar">
                <button type="button" className="action-btn" onClick={exportNextActionsCsv}>
                  Export CSV
                </button>
                <button type="button" className="action-btn" onClick={exportNextActionsJson}>
                  Export JSON
                </button>
                <button type="button" className="action-btn" onClick={copyNextActionsMarkdown}>
                  Copy Markdown
                </button>
                {exportMessage && <span className="export-message">{exportMessage}</span>}
              </div>
              <div className="next-actions-grid">
                {circleNextActions.map((action) => (
                  <article key={action.actionId} className="action-card">
                    <div className="card-title-row">
                      <h4>{action.actionTitle}</h4>
                      <span className={`status-pill ${action.status === 'blocked' ? 'stalled' : 'active'}`}>
                        {action.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p>
                      <strong>Tension:</strong> {action.tension}
                    </p>
                    <p>
                      <strong>Ideal outcome:</strong> {action.idealOutcome}
                    </p>
                    <p>
                      <strong>Action ID:</strong> {action.actionId} | <strong>Project key:</strong> {action.projectKey}
                    </p>
                    <p>
                      <strong>Owner:</strong> {action.owner} | <strong>Due date:</strong> {action.dueDate}
                    </p>
                    <p>
                      <strong>Priority:</strong> {action.priority} | <strong>Source:</strong> {action.source}
                    </p>
                  </article>
                ))}
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <>
              <div className="section-head">
                <h3>Notifications</h3>
                <span className="tool-badge" title={TOOL_LABELS.notifications}>
                  {TOOL_LABELS.notifications}
                </span>
              </div>
              <div className="notification-list">
                <article className="notification-item pipeline-note">
                  Automation flow: Jira + SharePoint triggers to Power Automate to Slack channels.
                </article>
                {alertFeed.map((alert) => (
                  <article key={alert} className="notification-item">
                    {alert}
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
