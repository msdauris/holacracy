import { useEffect, useMemo, useState } from 'react'
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
  { id: 'org-map', label: 'Org Map' },
  { id: 'next-actions', label: 'Next Actions' },
  { id: 'governance', label: 'Governance' },
  { id: 'notifications', label: 'Notifications' },
]

const STALE_DAYS = 14
const HUB_URL = 'https://confluence.company.com/display/HOL/Holacracy+Hub'
const CURRENT_USER = 'Maria Costa'
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

function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10)
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
  const [visualTick, setVisualTick] = useState(0)
  const [lastMapRefresh, setLastMapRefresh] = useState(new Date())
  const [customProjectsByCircle, setCustomProjectsByCircle] = useState({})
  const [customActionsByCircle, setCustomActionsByCircle] = useState({})
  const [isMeetingPanelOpen, setIsMeetingPanelOpen] = useState(false)
  const [meetingChannel, setMeetingChannel] = useState('teams')
  const [meetingType, setMeetingType] = useState('tactical')
  const [whiteboardByCircle, setWhiteboardByCircle] = useState({})
  const [projectFilters, setProjectFilters] = useState({
    owner: 'all',
    roleId: 'all',
    status: 'all',
    search: '',
    sortBy: 'updated_desc',
  })
  const [actionFilters, setActionFilters] = useState({
    owner: 'all',
    roleId: 'all',
    status: 'all',
    priority: 'all',
    search: '',
    sortBy: 'due_asc',
  })
  const [meetingDraftProject, setMeetingDraftProject] = useState({
    name: '',
    roleId: '',
    owner: CURRENT_USER,
    tasks: '',
  })
  const [meetingDraftAction, setMeetingDraftAction] = useState({
    actionTitle: '',
    roleId: '',
    owner: CURRENT_USER,
    dueDate: getTodayIsoDate(),
    priority: 'Medium',
    tension: '',
    idealOutcome: '',
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setVisualTick((tick) => tick + 1)
      setLastMapRefresh(new Date())
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const activeCircle = useMemo(
    () => circles.find((circle) => circle.id === activeCircleId) || circles[0],
    [activeCircleId],
  )

  const allCircleProjects = useMemo(
    () => [...activeCircle.projects, ...(customProjectsByCircle[activeCircle.id] || [])],
    [activeCircle, customProjectsByCircle],
  )

  const projectsWithDerivedStatus = useMemo(
    () =>
      allCircleProjects.map((project) => {
        const daysSinceUpdate = getDaysSince(project.lastUpdated)
        const isStalled = project.status !== 'done' && daysSinceUpdate >= STALE_DAYS
        return {
          ...project,
          daysSinceUpdate,
          computedStatus: isStalled ? 'stalled' : project.status,
        }
      }),
    [allCircleProjects],
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
  const circleNextActions = [
    ...nextActions.filter((action) => action.circleId === activeCircle.id),
    ...(customActionsByCircle[activeCircle.id] || []),
  ]
  const overdueActions = circleNextActions.filter(
    (action) => action.status !== 'done' && getDaysSince(action.dueDate) > 0,
  )

  const roleNameById = useMemo(
    () => Object.fromEntries(activeCircle.roles.map((role) => [role.id, role.name])),
    [activeCircle.roles],
  )

  const projectOwnerOptions = useMemo(
    () =>
      Array.from(new Set(projectsWithDerivedStatus.map((project) => project.owner))).filter(Boolean).sort(),
    [projectsWithDerivedStatus],
  )

  const actionOwnerOptions = useMemo(
    () => Array.from(new Set(circleNextActions.map((action) => action.owner))).filter(Boolean).sort(),
    [circleNextActions],
  )

  const filteredProjects = useMemo(() => {
    const searchText = projectFilters.search.trim().toLowerCase()
    const filtered = projectsWithDerivedStatus.filter((project) => {
      const ownerMatch =
        projectFilters.owner === 'all' ||
        (projectFilters.owner === 'me' && project.owner === CURRENT_USER) ||
        (projectFilters.owner === 'unassigned' && project.owner === 'Unassigned') ||
        project.owner === projectFilters.owner
      const roleMatch = projectFilters.roleId === 'all' || project.roleId === projectFilters.roleId
      const statusMatch =
        projectFilters.status === 'all' || project.computedStatus === projectFilters.status
      const searchMatch =
        !searchText ||
        project.name.toLowerCase().includes(searchText) ||
        project.tasks.some((task) => task.toLowerCase().includes(searchText))
      return ownerMatch && roleMatch && statusMatch && searchMatch
    })

    return filtered.sort((a, b) => {
      if (projectFilters.sortBy === 'updated_asc') return a.lastUpdated.localeCompare(b.lastUpdated)
      if (projectFilters.sortBy === 'name_asc') return a.name.localeCompare(b.name)
      if (projectFilters.sortBy === 'stalled_first') {
        return Number(b.computedStatus === 'stalled') - Number(a.computedStatus === 'stalled')
      }
      return b.lastUpdated.localeCompare(a.lastUpdated)
    })
  }, [projectsWithDerivedStatus, projectFilters])

  const filteredNextActions = useMemo(() => {
    const searchText = actionFilters.search.trim().toLowerCase()
    const filtered = circleNextActions.filter((action) => {
      const ownerMatch =
        actionFilters.owner === 'all' ||
        (actionFilters.owner === 'me' && action.owner === CURRENT_USER) ||
        (actionFilters.owner === 'unassigned' && action.owner === 'Unassigned') ||
        action.owner === actionFilters.owner
      const roleMatch = actionFilters.roleId === 'all' || action.roleId === actionFilters.roleId
      const statusMatch = actionFilters.status === 'all' || action.status === actionFilters.status
      const priorityMatch =
        actionFilters.priority === 'all' || action.priority === actionFilters.priority
      const searchMatch =
        !searchText ||
        action.actionTitle.toLowerCase().includes(searchText) ||
        action.tension.toLowerCase().includes(searchText) ||
        action.idealOutcome.toLowerCase().includes(searchText)
      return ownerMatch && roleMatch && statusMatch && priorityMatch && searchMatch
    })

    return filtered.sort((a, b) => {
      if (actionFilters.sortBy === 'due_desc') return b.dueDate.localeCompare(a.dueDate)
      if (actionFilters.sortBy === 'priority') return a.priority.localeCompare(b.priority)
      if (actionFilters.sortBy === 'owner') return a.owner.localeCompare(b.owner)
      return a.dueDate.localeCompare(b.dueDate)
    })
  }, [circleNextActions, actionFilters])

  const exportNextActionsCsv = () => {
    downloadText(
      `${activeCircle.id}-next-actions.csv`,
      toCsv(filteredNextActions),
      'text/csv;charset=utf-8',
    )
    setExportMessage('Exported CSV from mapped Jira-style action data.')
  }

  const exportNextActionsJson = () => {
    downloadText(
      `${activeCircle.id}-next-actions.json`,
      JSON.stringify(filteredNextActions, null, 2),
      'application/json;charset=utf-8',
    )
    setExportMessage('Exported JSON for automation/API handoff.')
  }

  const copyNextActionsMarkdown = async () => {
    const markdown = toMarkdownTable(filteredNextActions)
    try {
      await navigator.clipboard.writeText(markdown)
      setExportMessage('Copied Markdown table for docs, Notion, or chat.')
    } catch {
      setExportMessage('Clipboard copy blocked. Use CSV/JSON download instead.')
    }
  }

  const launchMeeting = (channel) => {
    setMeetingChannel(channel)
    if (channel === 'teams') {
      const url = `https://teams.microsoft.com/l/meeting/new?subject=${encodeURIComponent(
        `${activeCircle.name} ${meetingType} meeting`,
      )}`
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }
    window.open('https://app.slack.com/client', '_blank', 'noopener,noreferrer')
  }

  const addProjectFromMeeting = () => {
    if (!meetingDraftProject.name.trim()) return
    const newProject = {
      id: `${activeCircle.id}-custom-project-${Date.now()}`,
      roleId: meetingDraftProject.roleId || activeCircle.roles[0].id,
      name: meetingDraftProject.name.trim(),
      status: 'active',
      owner: meetingDraftProject.owner || 'Unassigned',
      lastUpdated: getTodayIsoDate(),
      tasks: meetingDraftProject.tasks
        .split(',')
        .map((task) => task.trim())
        .filter(Boolean),
    }
    setCustomProjectsByCircle((previous) => ({
      ...previous,
      [activeCircle.id]: [...(previous[activeCircle.id] || []), newProject],
    }))
    setMeetingDraftProject({ name: '', roleId: '', owner: CURRENT_USER, tasks: '' })
  }

  const addActionFromMeeting = () => {
    if (!meetingDraftAction.actionTitle.trim()) return
    const newAction = {
      actionId: `NA-${Date.now()}`,
      circleId: activeCircle.id,
      roleId: meetingDraftAction.roleId || activeCircle.roles[0].id,
      projectKey: `${activeCircle.id.toUpperCase().slice(0, 4)}-${Math.floor(Math.random() * 900 + 100)}`,
      actionTitle: meetingDraftAction.actionTitle.trim(),
      owner: meetingDraftAction.owner || 'Unassigned',
      dueDate: meetingDraftAction.dueDate || getTodayIsoDate(),
      status: 'new',
      priority: meetingDraftAction.priority,
      source: meetingType === 'governance' ? 'governance-followup' : meetingType,
      createdFromDecisionId: 'meeting-capture',
      tension: meetingDraftAction.tension.trim() || 'Captured in meeting.',
      idealOutcome: meetingDraftAction.idealOutcome.trim() || 'Defined in follow-up.',
    }
    setCustomActionsByCircle((previous) => ({
      ...previous,
      [activeCircle.id]: [...(previous[activeCircle.id] || []), newAction],
    }))
    setMeetingDraftAction({
      actionTitle: '',
      roleId: '',
      owner: CURRENT_USER,
      dueDate: getTodayIsoDate(),
      priority: 'Medium',
      tension: '',
      idealOutcome: '',
    })
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

  const orgMapCircles = useMemo(
    () =>
      circles.map((circle, index) => {
        const allProjects = [...circle.projects, ...(customProjectsByCircle[circle.id] || [])]
        const circleProjects = allProjects.map((project) => {
          const daysSinceUpdate = getDaysSince(project.lastUpdated)
          const isStalled = project.status !== 'done' && daysSinceUpdate >= STALE_DAYS
          return { ...project, isStalled }
        })
        const stalledCount = circleProjects.filter((project) => project.isStalled).length
        const vacancyCount = circle.roles.filter((role) => !role.assignedPerson).length
        const roleCount = circle.roles.length
        const projectCount = allProjects.length
        const radius = 62 + roleCount * 5 + projectCount * 2
        const x = 170 + index * 230
        const y = 180 + (index % 2 === 0 ? 0 : 70)
        const pulse = (visualTick % 2 === 0 ? 1 : 1.04) + stalledCount * 0.01
        return {
          id: circle.id,
          name: circle.name,
          stalledCount,
          vacancyCount,
          roleCount,
          projectCount,
          x,
          y,
          radius,
          pulse,
        }
      }),
    [visualTick, customProjectsByCircle],
  )

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
                  {circle.roles.length} roles, {circle.projects.length + (customProjectsByCircle[circle.id]?.length || 0)} projects
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
          <div className="header-controls">
            <button
              type="button"
              className="meeting-launch-btn"
              onClick={() => setIsMeetingPanelOpen((open) => !open)}
            >
              {isMeetingPanelOpen ? 'Close Meeting Workspace' : 'Start Meeting'}
            </button>
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
          </div>
        </header>

        {isMeetingPanelOpen && (
          <section className="meeting-panel">
            <div className="section-head">
              <h3>Meeting Workspace</h3>
              <span className="tool-badge">
                Live channel: {meetingChannel === 'teams' ? 'Microsoft Teams' : 'Slack'}
              </span>
            </div>
            <div className="meeting-controls">
              <label>
                Meeting type
                <select value={meetingType} onChange={(event) => setMeetingType(event.target.value)}>
                  <option value="tactical">Tactical</option>
                  <option value="governance">Governance</option>
                  <option value="retro">Retro</option>
                  <option value="townhall">Town Hall</option>
                </select>
              </label>
              <button type="button" className="action-btn" onClick={() => launchMeeting('teams')}>
                Start in Teams (structured)
              </button>
              <button type="button" className="action-btn" onClick={() => launchMeeting('slack')}>
                Start in Slack (ad hoc)
              </button>
            </div>
            <div className="meeting-grid">
              <article className="meeting-card">
                <h4>Create Jira-style Project</h4>
                <input
                  value={meetingDraftProject.name}
                  placeholder="Project name"
                  onChange={(event) =>
                    setMeetingDraftProject((draft) => ({ ...draft, name: event.target.value }))
                  }
                />
                <select
                  value={meetingDraftProject.roleId}
                  onChange={(event) =>
                    setMeetingDraftProject((draft) => ({ ...draft, roleId: event.target.value }))
                  }
                >
                  <option value="">Role</option>
                  {activeCircle.roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <input
                  value={meetingDraftProject.owner}
                  placeholder="Owner"
                  onChange={(event) =>
                    setMeetingDraftProject((draft) => ({ ...draft, owner: event.target.value }))
                  }
                />
                <input
                  value={meetingDraftProject.tasks}
                  placeholder="Tasks (comma separated)"
                  onChange={(event) =>
                    setMeetingDraftProject((draft) => ({ ...draft, tasks: event.target.value }))
                  }
                />
                <button type="button" className="action-btn" onClick={addProjectFromMeeting}>
                  Add Project
                </button>
              </article>
              <article className="meeting-card">
                <h4>Create Jira-style Next Action</h4>
                <input
                  value={meetingDraftAction.actionTitle}
                  placeholder="Action title"
                  onChange={(event) =>
                    setMeetingDraftAction((draft) => ({ ...draft, actionTitle: event.target.value }))
                  }
                />
                <select
                  value={meetingDraftAction.roleId}
                  onChange={(event) =>
                    setMeetingDraftAction((draft) => ({ ...draft, roleId: event.target.value }))
                  }
                >
                  <option value="">Role</option>
                  {activeCircle.roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <input
                  value={meetingDraftAction.owner}
                  placeholder="Owner"
                  onChange={(event) =>
                    setMeetingDraftAction((draft) => ({ ...draft, owner: event.target.value }))
                  }
                />
                <input
                  type="date"
                  value={meetingDraftAction.dueDate}
                  onChange={(event) =>
                    setMeetingDraftAction((draft) => ({ ...draft, dueDate: event.target.value }))
                  }
                />
                <input
                  value={meetingDraftAction.tension}
                  placeholder="Tension"
                  onChange={(event) =>
                    setMeetingDraftAction((draft) => ({ ...draft, tension: event.target.value }))
                  }
                />
                <input
                  value={meetingDraftAction.idealOutcome}
                  placeholder="Ideal outcome"
                  onChange={(event) =>
                    setMeetingDraftAction((draft) => ({ ...draft, idealOutcome: event.target.value }))
                  }
                />
                <button type="button" className="action-btn" onClick={addActionFromMeeting}>
                  Add Next Action
                </button>
              </article>
              <article className="meeting-card">
                <h4>Meeting Whiteboard (M365 style)</h4>
                <textarea
                  rows={9}
                  value={whiteboardByCircle[activeCircle.id] || ''}
                  onChange={(event) =>
                    setWhiteboardByCircle((previous) => ({
                      ...previous,
                      [activeCircle.id]: event.target.value,
                    }))
                  }
                  placeholder="Capture notes, ideas, and follow-ups like a whiteboard."
                />
              </article>
            </div>
          </section>
        )}

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
              <div className="filters-row">
                <select
                  value={projectFilters.owner}
                  onChange={(event) =>
                    setProjectFilters((filters) => ({ ...filters, owner: event.target.value }))
                  }
                >
                  <option value="all">Owner: All</option>
                  <option value="me">Assigned to me</option>
                  <option value="unassigned">Unassigned</option>
                  {projectOwnerOptions.map((owner) => (
                    <option key={owner} value={owner}>
                      {owner}
                    </option>
                  ))}
                </select>
                <select
                  value={projectFilters.roleId}
                  onChange={(event) =>
                    setProjectFilters((filters) => ({ ...filters, roleId: event.target.value }))
                  }
                >
                  <option value="all">Role: All</option>
                  {activeCircle.roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <select
                  value={projectFilters.status}
                  onChange={(event) =>
                    setProjectFilters((filters) => ({ ...filters, status: event.target.value }))
                  }
                >
                  <option value="all">Status: All</option>
                  <option value="active">Active</option>
                  <option value="stalled">Stalled</option>
                  <option value="done">Done</option>
                </select>
                <select
                  value={projectFilters.sortBy}
                  onChange={(event) =>
                    setProjectFilters((filters) => ({ ...filters, sortBy: event.target.value }))
                  }
                >
                  <option value="updated_desc">Sort: Last updated (newest)</option>
                  <option value="updated_asc">Sort: Last updated (oldest)</option>
                  <option value="stalled_first">Sort: Stalled first</option>
                  <option value="name_asc">Sort: Name A-Z</option>
                </select>
                <input
                  value={projectFilters.search}
                  placeholder="Search projects or tasks"
                  onChange={(event) =>
                    setProjectFilters((filters) => ({ ...filters, search: event.target.value }))
                  }
                />
                <button
                  type="button"
                  className="action-btn"
                  onClick={() =>
                    setProjectFilters({
                      owner: 'all',
                      roleId: 'all',
                      status: 'all',
                      search: '',
                      sortBy: 'updated_desc',
                    })
                  }
                >
                  Clear
                </button>
              </div>
              <p className="filter-meta">{filteredProjects.length} projects shown</p>
              <div className="card-grid">
                {filteredProjects.map((project) => (
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
                      <strong>Role:</strong> {roleNameById[project.roleId] || project.roleId}
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

          {activeTab === 'org-map' && (
            <>
              <div className="section-head">
                <h3>Near Real-Time Org Map</h3>
                <span className="tool-badge" title={TOOL_LABELS.visualization}>
                  {TOOL_LABELS.visualization}
                </span>
              </div>
              <p className="actions-intro">
                Simulated live visualization (refreshing every 5 seconds) using circle, role, vacancy, and
                project-health signals.
              </p>
              <div className="map-meta">
                <span>Last refresh: {lastMapRefresh.toLocaleTimeString()}</span>
                <span>Vacant role = cyan ring</span>
                <span>Stalled projects = red intensity</span>
              </div>
              <div className="org-map-wrap">
                <svg viewBox="0 0 760 420" className="org-map-svg" role="img" aria-label="Holacracy org map">
                  <rect x="0" y="0" width="760" height="420" rx="16" className="map-bg" />
                  {orgMapCircles.map((circle, index) => {
                    const nextCircle = orgMapCircles[index + 1]
                    if (!nextCircle) return null
                    return (
                      <line
                        key={`${circle.id}-${nextCircle.id}`}
                        x1={circle.x}
                        y1={circle.y}
                        x2={nextCircle.x}
                        y2={nextCircle.y}
                        className="map-link"
                      />
                    )
                  })}
                  {orgMapCircles.map((circle) => (
                    <g
                      key={circle.id}
                      transform={`translate(${circle.x}, ${circle.y}) scale(${circle.pulse})`}
                      onClick={() => setActiveCircleId(circle.id)}
                      className="map-node-group"
                    >
                      <circle
                        r={circle.radius}
                        className={`map-node ${circle.id === activeCircle.id ? 'active' : ''} ${
                          circle.stalledCount > 0 ? 'at-risk' : ''
                        }`}
                      />
                      {circle.vacancyCount > 0 && <circle r={circle.radius + 8} className="map-vacancy-ring" />}
                      <text className="map-label" y="-8">
                        {circle.name}
                      </text>
                      <text className="map-sub" y="14">
                        {circle.roleCount} roles | {circle.projectCount} projects
                      </text>
                      <text className="map-sub" y="32">
                        {circle.vacancyCount} vacant | {circle.stalledCount} stalled
                      </text>
                    </g>
                  ))}
                </svg>
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
              <div className="filters-row">
                <select
                  value={actionFilters.owner}
                  onChange={(event) =>
                    setActionFilters((filters) => ({ ...filters, owner: event.target.value }))
                  }
                >
                  <option value="all">Owner: All</option>
                  <option value="me">Assigned to me</option>
                  <option value="unassigned">Unassigned</option>
                  {actionOwnerOptions.map((owner) => (
                    <option key={owner} value={owner}>
                      {owner}
                    </option>
                  ))}
                </select>
                <select
                  value={actionFilters.roleId}
                  onChange={(event) =>
                    setActionFilters((filters) => ({ ...filters, roleId: event.target.value }))
                  }
                >
                  <option value="all">Role: All</option>
                  {activeCircle.roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <select
                  value={actionFilters.status}
                  onChange={(event) =>
                    setActionFilters((filters) => ({ ...filters, status: event.target.value }))
                  }
                >
                  <option value="all">Status: All</option>
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="blocked">Blocked</option>
                  <option value="done">Done</option>
                </select>
                <select
                  value={actionFilters.priority}
                  onChange={(event) =>
                    setActionFilters((filters) => ({ ...filters, priority: event.target.value }))
                  }
                >
                  <option value="all">Priority: All</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <select
                  value={actionFilters.sortBy}
                  onChange={(event) =>
                    setActionFilters((filters) => ({ ...filters, sortBy: event.target.value }))
                  }
                >
                  <option value="due_asc">Sort: Due date (soonest)</option>
                  <option value="due_desc">Sort: Due date (latest)</option>
                  <option value="priority">Sort: Priority</option>
                  <option value="owner">Sort: Owner</option>
                </select>
                <input
                  value={actionFilters.search}
                  placeholder="Search title, tension, outcome"
                  onChange={(event) =>
                    setActionFilters((filters) => ({ ...filters, search: event.target.value }))
                  }
                />
                <button
                  type="button"
                  className="action-btn"
                  onClick={() =>
                    setActionFilters({
                      owner: 'all',
                      roleId: 'all',
                      status: 'all',
                      priority: 'all',
                      search: '',
                      sortBy: 'due_asc',
                    })
                  }
                >
                  Clear
                </button>
              </div>
              <p className="filter-meta">{filteredNextActions.length} next actions shown</p>
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
                {filteredNextActions.map((action) => (
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
                      <strong>Owner:</strong> {action.owner}
                    </p>
                    <p>
                      <strong>Action ID:</strong> {action.actionId} | <strong>Project key:</strong> {action.projectKey}
                    </p>
                    <p>
                      <strong>Role:</strong> {roleNameById[action.roleId] || action.roleId} | <strong>Due date:</strong>{' '}
                      {action.dueDate}
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
