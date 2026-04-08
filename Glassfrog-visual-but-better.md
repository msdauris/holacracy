You can build a near real-time visual org map (GlassFrog/Holaspirit style) using:

Source of truth: SharePoint Lists (circles/roles/assignments)
Transformation: Power Automate + optional Azure Function/Power Query
Visualization: Visio for the web embedded in Confluence, or Power BI custom visual, or a lightweight React/D3 component embedded in Confluence
Best options (ranked)
Option 1: Visio + SharePoint (lowest friction with M365)

Good for stakeholder-friendly circle map
Can refresh from data source
Easiest to embed in Confluence
Best if “diagram-first” is enough
Option 2: Power BI visual network (best for live metrics + interactivity)

Add circle/role graph visual with filters and KPI overlays
Better “live” behavior than static-ish diagrams
Strong drill-through and slicers
Great for operational use, not just presentation
Option 3: Custom React graph (closest to GlassFrog behavior)

D3/React Flow/Cytoscape for dynamic zoom/pan, role click-through, vacancy highlighting
Can reflect tactical + governance state instantly
More engineering effort, but best UX parity with dedicated holacracy tools
“Real-time” realistically means
For enterprise reliability, most teams do near-real-time (1–5 min refresh), not true websocket instant updates.

Recommended cadence:

SharePoint/Jira updates -> event/flow trigger
Materialized graph data update every 1–5 minutes
Visual layer auto-refresh on interval or user refresh
Suggested architecture for your setup
SharePoint Lists:
Circles, Roles, Accountabilities, Assignments
Jira:
Next Actions + project health flags
Power Automate:
On item update, push normalized record to graph dataset/table
Graph dataset:
Nodes (Circle, Role, Person) and Edges (contains, fills, owns)
Viewer:
Confluence page with embedded Visio/Power BI/custom app iframe
Must-have visual states (to make it useful, not just pretty)
Vacant role highlighting (already in your legend idea)
Stalled project pressure by circle (heat/shade)
Governance changes pending ratification
Role overload / too-many accountabilities indicator
Filter by circle, person, role type, vacancy, overdue next actions
Practical phased path
Phase A (fast): Visio embedded in Confluence, auto-refreshed daily/hourly
Phase B: Power BI network + KPI overlays, refreshed every 15 min
Phase C: Custom interactive map for tactical + governance drill-down parity with GlassFrog