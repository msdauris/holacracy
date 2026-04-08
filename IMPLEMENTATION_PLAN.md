# Holacracy Hub Implementation Plan

From POC to production using Jira Cloud, Microsoft 365, Confluence, Slack, and Power BI.

## 1) Purpose

This plan defines how to move the local Holacracy prototype into a real operating system while keeping each tool as a clear system of record.

- Roles and Accountabilities -> SharePoint Lists (M365)
- Projects and Next Actions -> Jira Cloud
- Governance and Hub -> Confluence Cloud
- Circle Visualization -> Visio embedded in Confluence
- Notifications -> Slack via Power Automate
- Metrics -> Power BI embedded in Confluence

## 2) Scope and Operating Principles

- Keep one single hub URL in Confluence.
- Keep source data in native systems, not duplicated.
- Preserve holacracy distinctions:
  - Governance = role/purpose/domain changes
  - Tactical = Next Actions moving from tension to ideal outcome
- Require ownership, auditability, and automation from day one.

## 3) Target Architecture

- **Confluence (Presentation Layer)**: hub pages, embedded modules, decisions, KPI dashboard.
- **SharePoint Lists (Structure Layer)**: circles, roles, accountabilities, domains, role assignments.
- **Jira Cloud (Execution Layer)**: projects, tasks, next actions, tactical status flow.
- **Power Automate (Integration Layer)**: stale updates, assignment gaps, overdue alerts, weekly digests.
- **Power BI (Insights Layer)**: fill rate, stalled work, accountability and action health.
- **Visio (Visualization Layer)**: circle map embedded in Confluence.

## 4) Production Data Model

### 4.1 SharePoint Lists

#### `Circles`
- `CircleId` (text, unique)
- `CircleName` (text)
- `ParentCircleId` (text)
- `LeadLink` (person)
- `Facilitator` (person)

#### `Roles`
- `RoleId` (text, unique)
- `CircleId` (lookup -> Circles)
- `RoleName` (text)
- `Purpose` (multiline text)
- `AssignedPerson` (person, nullable)
- `Status` (choice: Filled, Unassigned)

#### `Accountabilities`
- `AccountabilityId` (text, unique)
- `RoleId` (lookup -> Roles)
- `AccountabilityText` (multiline text)

#### `Domains`
- `DomainId` (text, unique)
- `RoleId` (lookup -> Roles)
- `DomainName` (text)

### 4.2 Jira Cloud (Projects + Next Actions)

Required fields:
- `Circle` (single-select or component)
- `RoleId` (text/select)
- `Tension` (paragraph)
- `IdealOutcome` (paragraph)
- `SourceType` (choice: tactical, retro, governance-followup)
- `DecisionTraceId` (text, optional)
- `StaleFlag` (label/automation derived)

Issue types:
- `Project`
- `Task`
- `Next Action`

Suggested next-action workflow:
`New -> In Progress -> Blocked -> Done`

## 5) Confluence Hub Structure

Parent page: `Holacracy Hub`

Recommended modules:
1. **Circle Overview**
   - Circle metadata
   - Embedded role table (SharePoint view)
   - Embedded Visio map
2. **Projects and Tactical Work**
   - Embedded Jira board/list
3. **Next Actions**
   - Filtered Jira next-action list by circle
   - Export guidance and downstream-tool options
4. **Governance**
   - Proposals, ratified decisions, role/purpose/domain changes
5. **Metrics**
   - Embedded Power BI dashboard
6. **Alerts and Health**
   - Slack channels and alert policy links

## 6) Automation Design (Power Automate + Jira + Slack)

### Flow A: Stale Project Alert
- Trigger: scheduled daily
- Logic: Jira issue not updated for >= 14 days and not done
- Action: post alert to Slack circle channel

### Flow B: Unassigned Role Alert
- Trigger: SharePoint role change + scheduled daily safety check
- Logic: `AssignedPerson` is empty
- Action: post role-gap alert to Slack

### Flow C: Overdue Next Action Alert
- Trigger: scheduled daily
- Logic: Next Action due date < today and status != done
- Action: post alert tagging owner and lead link

### Flow D: Weekly Digest
- Trigger: weekly schedule
- Output: active/stalled projects, unassigned roles, overdue next actions
- Action: post summary into Slack

## 7) Metrics (Power BI)

Minimum KPI set:
- Role fill rate
- Active vs stalled projects
- Accountability gaps (unassigned roles)
- Open next actions
- Overdue next actions
- Decision-to-action conversion rate
- Median days to close next actions

Publish to workspace and embed in Confluence hub.

## 8) Ownership and Cadence

Define named owners for:
- SharePoint data model
- Jira workflow/configuration
- Confluence hub content
- Power Automate flows
- Power BI model/report

Operational cadence:
- Weekly tactical review (projects, blockers, next actions)
- Monthly governance review (roles/purpose/domain updates)
- Quarterly system audit (schema, automation drift, KPI usefulness)

## 9) Security, Compliance, and Control

- Use Entra ID for person/identity mapping.
- Apply role-based permissions in SharePoint and Confluence.
- Define retention labels for governance records and decisions.
- Maintain audit trail for role changes and ratifications.
- Maintain a break-glass admin procedure and change log.

## 10) Rollout Plan (4-Week Sequence)

### Week 1: Foundation
- Stand up SharePoint lists
- Configure Jira issue types and fields
- Build Confluence hub shell and page hierarchy

### Week 2: Integrations
- Implement flows A-C
- Create Power BI v1 model
- Embed Visio and Power BI in Confluence

### Week 3: Pilot
- Pilot with one circle
- Track stale reduction and overdue action reduction
- Tune automations and statuses

### Week 4: Scale
- Roll out to remaining circles
- Finalize SOPs and ownership model
- Start ongoing cadence and change governance

## 11) Immediate Action Checklist

- [ ] Confirm M365 (E3/E5) and Power Automate entitlements
- [ ] Confirm Jira/Confluence cloud plan and migration timeline
- [ ] Approve SharePoint schema and data owners
- [ ] Approve Slack posting policy for automations
- [ ] Implement Jira Next Action type + fields
- [ ] Publish Confluence hub v1
- [ ] Launch pilot circle

## 12) Definition of Done

Production readiness is achieved when:
- Confluence hub is the primary team entry point
- Roles and assignments are current in SharePoint
- Jira next actions are actively managed by circles
- Alert flows run reliably and are monitored
- Power BI reflects current operational health
- Governance and tactical processes are clearly separated in behavior and tooling
