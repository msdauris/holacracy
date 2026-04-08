# Holacracy Hub Runbook

Day-to-day operating guide for admins and circle leads running the production holacracy stack.

## 1) Purpose

This runbook explains how to operate, monitor, and troubleshoot the live system across:
- SharePoint Lists (roles/accountabilities)
- Jira Cloud (projects and next actions)
- Confluence (hub and governance pages)
- Power Automate (alerts and digests)
- Slack (notification channels)
- Power BI (operational KPIs)

## 2) Roles and Responsibilities

- **Platform Owner**: overall system health, escalation coordinator.
- **SharePoint Owner**: role model integrity and assignment data quality.
- **Jira Owner**: workflow hygiene, field consistency, dashboard filters.
- **Confluence Owner**: page quality and embedded module correctness.
- **Automation Owner**: Power Automate flow health, retries, failures.
- **BI Owner**: dataset refresh and KPI definition governance.

## 3) Daily Operations Checklist

1. Check Power Automate flow run history:
   - stale project flow
   - unassigned role flow
   - overdue next-action flow
2. Confirm Slack alerts posted to expected channels.
3. Review Jira "blocked" and "overdue next action" filters.
4. Validate there are no unassigned critical roles in SharePoint.
5. Confirm Confluence hub modules render correctly.

## 4) Weekly Operations Checklist

1. Publish weekly digest (or confirm automation posted it).
2. Review metrics:
   - role fill rate
   - active vs stalled projects
   - overdue next actions
3. Run tactical circle review:
   - close completed next actions
   - escalate stale items
4. Review governance updates:
   - any role/purpose/domain changes ratified
5. Log issues and remediation actions in operations notes.

## 5) Monthly Governance Checklist

1. Validate structural changes in governance records:
   - role creations/deletions
   - purpose changes
   - domain changes
2. Ensure SharePoint reflects ratified governance decisions.
3. Audit Jira field usage quality (`Circle`, `RoleId`, `Tension`, `IdealOutcome`).
4. Confirm Confluence page structure remains aligned to circles.
5. Review alert quality (signal-to-noise) and adjust thresholds if needed.

## 6) Core SLAs

- **Stale update detection**: within 24 hours.
- **Overdue next-action alerting**: within 24 hours.
- **Broken embed fix (Confluence)**: same business day.
- **Critical data mismatch correction**: within 1 business day.
- **Automation incident response**: start within 2 business hours.

## 7) Incident Playbooks

### A) Slack alerts not posting

1. Check Power Automate run history for failed runs.
2. Validate Slack connection/auth in flow connectors.
3. Re-run failed flow with known test payload.
4. Post manual interim alert in channel.
5. Document incident, root cause, and fix.

### B) Governance/Hub page is blank or missing widgets

1. Check Confluence embed macros for broken references.
2. Validate permissions for embedded source content.
3. Validate upstream data source accessibility (Power BI/Jira/Visio).
4. Roll back to last known good page version if needed.
5. Open follow-up task for permanent fix.

### C) Jira next actions not showing expected records

1. Verify field mappings (`Circle`, `Issue Type`, status).
2. Check filter JQL logic used in embedded views.
3. Confirm due date and owner fields are populated.
4. Validate recent workflow/status changes did not break filters.

### D) SharePoint role assignments inaccurate

1. Identify mismatched record source.
2. Confirm list permissions and recent edits.
3. Correct affected records and re-trigger relevant flows.
4. Add data validation rule if repeat issue.

## 8) Data Quality Rules

- Every `Role` must have:
  - `RoleId`, `CircleId`, `Purpose`, `Status`
- Every `Next Action` must have:
  - `Circle`, `RoleId`, `Tension`, `IdealOutcome`, `Owner`, `DueDate`, `Status`
- Governance decisions that trigger execution must include:
  - a linked `DecisionTraceId` and follow-up `Next Action`

## 9) Change Management

Any change to schema, workflow, automation, or KPI definitions requires:
1. Change request entry
2. Impact review
3. Approval from platform owner + system owner
4. Deployment window and rollback plan
5. Post-change validation and communication

## 10) Backup and Recovery

- Export SharePoint list snapshots weekly.
- Export Jira filter snapshots for key queues weekly.
- Version Confluence hub and major governance pages.
- Keep Power BI dataset version history and refresh logs.
- Preserve Power Automate definitions (solution export).

## 11) Access Model (Minimum)

- **Circle members**: read hub, update own tactical actions.
- **Lead Link / Facilitator**: update circle data and tactical prioritization.
- **Platform owners**: full admin on flows, schemas, and hub structure.
- **Audit/compliance roles**: read-only access to decision trail and logs.

## 12) KPI Operating Thresholds (Starting Point)

- Unassigned critical roles: target `0`
- Stalled projects (>14 days no update): target `<10%`
- Overdue next actions: target `<15%`
- Weekly digest success rate: target `100%`
- Automation failure rate: target `<2%`

## 13) Contacts and Escalation

Maintain this section with real contacts:
- Platform Owner:
- SharePoint Owner:
- Jira Owner:
- Confluence Owner:
- Automation Owner:
- BI Owner:
- Slack Admin:

Escalation path:
1. System owner
2. Platform owner
3. IT operations manager
