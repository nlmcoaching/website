// @ts-nocheck
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  Search,
  BarChart3,
  ClipboardList,
  FileText,
  Flag,
  DollarSign,
  Activity,
  LayoutDashboard,
} from 'lucide-react';
import { BacklogTrendSparkline } from '../components/BacklogTrendSparkline';
import { LeadershipTabView } from './LeadershipTabView';

const BACKLOG_URL = 'https://lp.acela.io/ProjectManagement';
const BACKLOG_STATUS_URL = 'https://lp.acela.io/backlog?tab=Backlog';

const pmoReportData = {
  reportDate: '7/14/2025',
  confirmationDeadline: 'August 1, 2025',
  schedulingKPI: {
    weeks: [
      { period: '7/21 – 7/25', firmHours: 144, tentativeHours: 8, openHours: 8, totalSchedulableHours: 160 },
      { period: '7/28 – 8/1', firmHours: 64, tentativeHours: 16, openHours: 80, totalSchedulableHours: 160 },
    ],
    totals: { firmHours: 208, tentativeHours: 24, openHours: 88 },
    openTentative: { total: 112, percentage: '29%' },
  },
  backlogHours: { professionalServices: 3298, staffAug: 2780 },
  capacityRiskExpectedWeek: 'Aug 4',
  billableAttainment: {
    minimumAttainmentMetric: 119,
    thresholds: { Dominic: 4, Craig: 5, Freddy: 6, Trevor: 8, Natalie: 6, Rebekah: 6 },
    weeks: [
      { period: '1/24/26-1/30/26', total: 129, Dominic: 32, Craig: 28, Freddy: 32.25, Trevor: 20, Natalie: 17, Rebekah: 0 },
      { period: '1/31/26-2/6/26', total: 95, Dominic: 24, Craig: 22, Freddy: 28, Trevor: 12, Natalie: 9, Rebekah: 0 },
      { period: '2/7/26-2/13/26', total: 140, Dominic: 35, Craig: 30, Freddy: 38, Trevor: 22, Natalie: 15, Rebekah: 0 },
      { period: '2/14/26-2/20/26', total: 137, Dominic: 34, Craig: 28, Freddy: 36, Trevor: 24, Natalie: 15, Rebekah: 0 },
      { period: '2/21/26-2/27/26', total: 78, Dominic: 18, Craig: 16, Freddy: 22, Trevor: 14, Natalie: 8, Rebekah: 0 },
      { period: '3/1/26-3/7/26', total: 127, Dominic: 32, Craig: 26, Freddy: 34, Trevor: 20, Natalie: 15, Rebekah: 0 },
    ],
  },
  backlogReview: {
    fill: ['7/21 – Dominic', '7/29 AM – Dominic', '7/29 – 7/31 – Freddy', '7/29 - 8/2 - Craig', '7/29 - 7/31 - Trevor'],
    confirm: [
      '7/5 – Freddy – McGrath – WebEx Migration – Cutover Prep',
      '7/9 – Craig – Personalis – Staff Aug',
      '7/28 – Trevor – Barton – Phase 2 – Sign-off',
    ],
  },
  // 30 shared projects. PMs: Natalie Higgins, Rebekah Mixon. Engineers: Dominic Zeni, Trevor Butler, Freddy Tabet, Craig Grant.
  _sharedProjects: [
    { customerName: 'Hitachi', projectName: 'Hitachi Data Center Migration', projectManager: 'Natalie Higgins', engineer: 'Dominic Zeni' },
    { customerName: 'Hitachi', projectName: 'Hitachi DR Phase 2', projectManager: 'Natalie Higgins', engineer: 'Dominic Zeni' },
    { customerName: 'Fremont Bank', projectName: 'Fremont Bank Azure Deployment', projectManager: 'Rebekah Mixon', engineer: 'Trevor Butler' },
    { customerName: 'Fremont Bank', projectName: 'Fremont Bank M365 Rollout', projectManager: 'Rebekah Mixon', engineer: 'Trevor Butler' },
    { customerName: 'EECU', projectName: 'EECU Intune Deployment', projectManager: 'Natalie Higgins', engineer: 'Freddy Tabet' },
    { customerName: 'EECU', projectName: 'EECU Azure AD Sync', projectManager: 'Natalie Higgins', engineer: 'Freddy Tabet' },
    { customerName: 'LP', projectName: 'LP Entra ID Ph2', projectManager: 'Rebekah Mixon', engineer: 'Craig Grant' },
    { customerName: 'LP', projectName: 'LP Livermore Project', projectManager: 'Rebekah Mixon', engineer: 'Craig Grant' },
    { customerName: 'CoH', projectName: 'CoH WebEx Migration', projectManager: 'Natalie Higgins', engineer: 'Dominic Zeni' },
    { customerName: 'CoH', projectName: 'CoH Teams Rollout', projectManager: 'Natalie Higgins', engineer: 'Dominic Zeni' },
    { customerName: 'Barton', projectName: 'Barton Cutover', projectManager: 'Rebekah Mixon', engineer: 'Trevor Butler' },
    { customerName: 'Barton', projectName: 'Barton Phase 2', projectManager: 'Rebekah Mixon', engineer: 'Trevor Butler' },
    { customerName: 'Fremont Bank', projectName: 'Fremont Bank Azure Sign-off', projectManager: 'Rebekah Mixon', engineer: 'Freddy Tabet' },
    { customerName: 'Fremont Bank', projectName: 'Fremont M365 Close', projectManager: 'Rebekah Mixon', engineer: 'Freddy Tabet' },
    { customerName: 'EECU', projectName: 'EECU Intune Wrap', projectManager: 'Rebekah Mixon', engineer: 'Craig Grant' },
    { customerName: 'Personalis', projectName: 'Personalis Staff Aug', projectManager: 'Rebekah Mixon', engineer: 'Craig Grant' },
    { customerName: 'McGrath', projectName: 'McGrath WebEx Migration', projectManager: 'Natalie Higgins', engineer: 'Dominic Zeni' },
    { customerName: 'El Camino Health', projectName: 'ECH Switch Refresh', projectManager: 'Natalie Higgins', engineer: 'Trevor Butler' },
    { customerName: 'El Camino Health', projectName: 'ECH Network Upgrade', projectManager: 'Rebekah Mixon', engineer: 'Freddy Tabet' },
    { customerName: 'Acme Corp', projectName: 'Acme Entra ID Implementation', projectManager: 'Rebekah Mixon', engineer: 'Craig Grant' },
    { customerName: 'Acme Corp', projectName: 'Acme M365 Migration', projectManager: 'Natalie Higgins', engineer: 'Dominic Zeni' },
    { customerName: 'Northgate', projectName: 'Northgate Azure Migration', projectManager: 'Natalie Higgins', engineer: 'Trevor Butler' },
    { customerName: 'Northgate', projectName: 'Northgate DR Setup', projectManager: 'Rebekah Mixon', engineer: 'Freddy Tabet' },
    { customerName: 'Summit Credit', projectName: 'Summit Intune Rollout', projectManager: 'Rebekah Mixon', engineer: 'Craig Grant' },
    { customerName: 'Summit Credit', projectName: 'Summit Security Hardening', projectManager: 'Natalie Higgins', engineer: 'Dominic Zeni' },
    { customerName: 'Valley Health', projectName: 'Valley Health Cloud Migration', projectManager: 'Natalie Higgins', engineer: 'Trevor Butler' },
    { customerName: 'Valley Health', projectName: 'Valley Health Teams Deployment', projectManager: 'Rebekah Mixon', engineer: 'Freddy Tabet' },
    { customerName: 'Metro Bank', projectName: 'Metro Bank Core Upgrade', projectManager: 'Rebekah Mixon', engineer: 'Craig Grant' },
    { customerName: 'Metro Bank', projectName: 'Metro Bank Exchange Decommission', projectManager: 'Rebekah Mixon', engineer: 'Dominic Zeni' },
    { customerName: 'TechStart', projectName: 'TechStart Infrastructure Refresh', projectManager: 'Rebekah Mixon', engineer: 'Trevor Butler' },
  ] as const,
  budgetReview: { fixedFee: [], timeAndMaterials: [] },
  projectsClosing: {
    thisWeek: [
      { projectName: 'LP Livermore Project', projectManager: 'Rebekah Mixon', remainingHours: 2, estimateToComplete: 2, estimatedCloseDate: '7/18/2025', nextActions: 'Final sign-off and project closure' },
      { projectName: 'EECU Intune Wrap', projectManager: 'Rebekah Mixon', remainingHours: 3, estimateToComplete: 3, estimatedCloseDate: '7/19/2025', nextActions: 'Close-out' },
    ],
    nextWeek: [
      { projectName: 'CoH WebEx Migration', projectManager: 'Natalie Higgins', remainingHours: 5, estimateToComplete: 5, estimatedCloseDate: '7/25/2025', nextActions: 'Final documentation and handoff' },
      { projectName: 'CoH Teams Rollout', projectManager: 'Natalie Higgins', remainingHours: 4, estimateToComplete: 4, estimatedCloseDate: '7/26/2025', nextActions: 'Handoff' },
      { projectName: 'Barton Cutover', projectManager: 'Rebekah Mixon', remainingHours: 5, estimateToComplete: 5, estimatedCloseDate: '7/26/2025', nextActions: 'Complete cutover verification' },
      { projectName: 'Barton Phase 2', projectManager: 'Rebekah Mixon', remainingHours: 6, estimateToComplete: 6, estimatedCloseDate: '7/27/2025', nextActions: 'Sign-off' },
      { projectName: 'Fremont Bank Azure Sign-off', projectManager: 'Rebekah Mixon', remainingHours: 2, estimateToComplete: 2, estimatedCloseDate: '7/24/2025', nextActions: 'Final review' },
      { projectName: 'Fremont M365 Close', projectManager: 'Rebekah Mixon', remainingHours: 3, estimateToComplete: 3, estimatedCloseDate: '7/28/2025', nextActions: 'Closure' },
    ],
  },
  upcomingCutoverReview: [
    { date: '7/22', time: '', name: 'Dominic Zeni', customerName: 'Hitachi', projectName: 'Data Center Project', description: 'Failover Testing' },
    { date: '7/26', time: '', name: 'Dominic Zeni', customerName: 'Hitachi', projectName: 'Data Center Project', description: 'Failover Testing' },
    { date: '7/27', time: 'AM', name: 'Craig Grant', customerName: 'El Camino Health', projectName: 'ECH Switch Refresh', description: 'Cutover' },
    { date: '8/1', time: '', name: 'Craig Grant', customerName: 'El Camino Health', projectName: 'ECH Switch Refresh', description: 'Cutover' },
  ],
  subcontractorsScheduledThisWeek: [
    { date: '7/7', time: '', name: 'Morgan Stepp', customerName: 'CoH', projectName: 'CoH WebEx Migration', description: 'Cutover support and user migration' },
    { date: '7/8', time: 'AM', name: 'Morgan Stepp', customerName: 'Fremont Bank', projectName: 'Fremont Bank Azure Deployment', description: 'Staff augmentation - security review' },
    { date: '7/9', time: '', name: 'Morgan Stepp', customerName: 'EECU', projectName: 'EECU Intune Deployment', description: 'Policy configuration and testing' },
    { date: '7/9', time: '', name: 'Brandon Langford', customerName: 'Hitachi', projectName: 'Hitachi Data Center Migration', description: 'Exchange decommission - prep steps' },
    { date: '7/10', time: 'AM', name: 'Morgan Stepp', customerName: 'LP', projectName: 'LP Entra ID Ph2', description: 'Stop Entra Connect service for cutover' },
    { date: '7/10', time: '', name: 'Brandon Langford', customerName: 'Barton', projectName: 'Barton Cutover', description: 'Network cutover verification' },
  ],
  milestones: [
    { customerProject: 'Hitachi – Data Center Migration', projectManager: 'Natalie Higgins', description: 'Final Milestone - 50%', status: 'Billed', estimatedDate: '06/20/2025', amount: 24000 },
    { customerProject: 'Fremont Bank – Azure Deployment', projectManager: 'Rebekah Mixon', description: 'Final Milestone - 50%', status: 'Billed', estimatedDate: '07/01/2025', amount: 15000 },
    { customerProject: 'EECU – Intune Deployment', projectManager: 'Natalie Higgins', description: 'Final Milestone - 50%', status: 'Unbilled', estimatedDate: '07/25/2025', amount: 11250 },
    { customerProject: 'LP – Entra ID Ph2', projectManager: 'Rebekah Mixon', description: 'Final Milestone - 50%', status: 'Unbilled', estimatedDate: '07/28/2025', amount: 13500 },
    { customerProject: 'CoH – WebEx Migration', projectManager: 'Natalie Higgins', description: 'Final Milestone - 50%', status: 'Unbilled', estimatedDate: '08/01/2025', amount: 18000 },
    { customerProject: 'Barton – Phase 2', projectManager: 'Rebekah Mixon', description: 'Final Milestone - 50%', status: 'Unbilled', estimatedDate: '08/05/2025', amount: 9000 },
    { customerProject: 'El Camino Health – ECH Switch Refresh', projectManager: 'Natalie Higgins', description: 'Final Milestone - 50%', status: 'Billed', estimatedDate: '07/12/2025', amount: 16500 },
  ],
  projectReview: [],
  // Backlog forecast: 6 weeks, hours per engineer (40 = 100% utilization)
  backlogForecast: [
    { week: '7/21 – 7/25', 'Dominic Zeni': 36, 'Trevor Butler': 40, 'Freddy Tabet': 32, 'Craig Grant': 28 },
    { week: '7/28 – 8/1', 'Dominic Zeni': 32, 'Trevor Butler': 38, 'Freddy Tabet': 40, 'Craig Grant': 35 },
    { week: '8/4 – 8/8', 'Dominic Zeni': 45, 'Trevor Butler': 35, 'Freddy Tabet': 30, 'Craig Grant': 42 },
    { week: '8/11 – 8/15', 'Dominic Zeni': 28, 'Trevor Butler': 40, 'Freddy Tabet': 36, 'Craig Grant': 32 },
    { week: '8/18 – 8/22', 'Dominic Zeni': 38, 'Trevor Butler': 35, 'Freddy Tabet': 40, 'Craig Grant': 36 },
    { week: '8/25 – 8/29', 'Dominic Zeni': 40, 'Trevor Butler': 38, 'Freddy Tabet': 34, 'Craig Grant': 40 },
  ],
};

// Build projectReview and budgetReview from same 30 projects
(function () {
  const shared = pmoReportData._sharedProjects;
  const statuses: Array<'Initiating' | 'Planning' | 'On Track' | 'At Risk' | 'Closing' | 'On Hold'> = ['On Track', 'On Hold', 'Closing', 'Closing', 'At Risk', 'Planning', 'On Hold', 'At Risk', 'On Track', 'On Track', 'On Track', 'Initiating', 'Initiating', 'At Risk', 'Initiating', 'Closing', 'On Hold', 'Closing', 'Closing', 'Closing', 'On Track', 'On Track', 'On Track', 'On Track', 'On Track', 'On Track', 'On Track', 'On Track', 'On Track', 'On Track'];
  const progress = [77, 60, 90, 45, 80, 70, 92, 99, 95, 88, 94, 72, 85, 65, 50, 62, 78, 82, 41, 55, 68, 73, 58, 91, 84, 39, 76, 67, 44, 53];
  const etc = [80, 40, 25, 55, 35, 15, 20, 2, 5, 12, 5, 28, 15, 35, 50, 38, 22, 18, 59, 45, 32, 27, 42, 9, 61, 50, 24, 33, 56, 47];
  const nextActionsList = ['07/26 – Complete failover testing', '07/15 – Environment setup', '07/18 – Finalize security review', '07/19 – License validation', '07/20 – Schedule user training sessions', '07/21 – Configure sync rules', '07/22 – Review integration points', '07/18 – Final sign-off and project closure', '07/25 – Final documentation and handoff', '07/26 – Handoff', '07/26 – Complete cutover verification', '07/27 – Sign-off', '07/24 – Final review', '07/28 – Closure', '07/19 – Close-out', '07/09 – Staff aug delivery', '07/16 – Cutover prep', '07/22 – Configuration', '07/23 – Network config', '08/12 – Entra ID rollout', '08/15 – M365 migration', '08/10 – Azure migration', '08/20 – DR setup', '08/06 – Intune rollout', '09/05 – Security hardening', '08/28 – Cloud migration', '08/22 – Teams deployment', '07/22 – Core upgrade', '07/20 – Exchange decommission', '09/10 – Infrastructure refresh'];
  (pmoReportData as { projectReview: Array<{ customerName: string; projectName: string; projectManager: string; engineer: string; projectStatus: string; progress: number; nextActions: string; estimateToComplete: number; etc: number }> }).projectReview = shared.map((p, i) => ({
    customerName: p.customerName,
    projectName: p.projectName,
    projectManager: p.projectManager,
    engineer: (p as { engineer: string }).engineer,
    projectStatus: statuses[i],
    progress: progress[i],
    nextActions: nextActionsList[i],
    estimateToComplete: [3, 0, 2, 4, 1, 0, 2, 3, 4, 2, 1, 3, 2, 3, 2, 1, 2, 2, 4, 3, 2, 2, 3, 1, 3, 4, 2, 2, 3, 2][i],
    etc: etc[i],
  }));
  const budgetBase = shared.map((p, i) => ({
    customerName: (p as { customerName: string }).customerName,
    projectName: p.projectName,
    projectManager: p.projectManager,
    engineer: (p as { engineer: string }).engineer,
    projectStatus: statuses[i],
    riskItemsCount: [0, 2, 0, 1, 3, 0, 0, 1, 0, 2, 0, 1, 0, 4, 1, 0, 2, 0, 0, 1, 2, 0, 3, 0, 1, 0, 0, 2, 1, 0][i], // number of risk items tracked per project
    overdueActionsCount: [0, 1, 0, 2, 0, 1, 0, 0, 2, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 1, 0, 2, 0, 1, 0, 0, 2, 3, 1][i], // overdue actions for health score
    budgetHours: [320, 200, 200, 180, 150, 120, 180, 75, 155, 140, 100, 220, 60, 90, 75, 130, 110, 280, 190, 170, 240, 155, 165, 135, 145, 210, 175, 95, 85, 260][i], // indices 7,8 over budget (80→75, 160→155)
    actualHours: [245, 180, 150, 120, 120, 95, 165, 78, 152, 128, 95, 192, 55, 75, 60, 98, 88, 210, 140, 125, 180, 120, 130, 100, 110, 160, 135, 70, 65, 195][i],
    scheduledHours: [8, 12, 10, 14, 10, 8, 14, 2, 8, 12, 5, 28, 5, 15, 15, 32, 22, 20, 50, 45, 20, 35, 35, 35, 35, 50, 40, 25, 20, 65][i],
    remainingHours: 0,
    estimateToComplete: 0,
    estimatedStartDate: ['01/15/2025', '07/01/2025', '07/10/2025', '06/05/2025', '07/28/2025', '06/15/2025', '06/20/2025', '06/05/2025', '06/15/2025', '06/20/2025', '06/05/2025', '07/28/2025', '06/01/2025', '06/05/2025', '06/01/2025', '06/15/2025', '06/20/2025', '07/15/2025', '07/01/2025', '06/25/2025', '07/20/2025', '06/15/2025', '06/20/2025', '06/05/2025', '06/15/2025', '07/15/2025', '07/01/2025', '06/25/2025', '06/05/2025', '07/15/2025'][i],
    estimatedEndDate: ['08/15/2025', '07/30/2025', '08/10/2025', '07/25/2025', '08/22/2025', '08/05/2025', '07/28/2025', '07/18/2025', '07/25/2025', '08/01/2025', '07/26/2025', '08/20/2025', '07/24/2025', '07/28/2025', '07/19/2025', '08/15/2025', '08/08/2025', '09/01/2025', '08/25/2025', '08/12/2025', '08/18/2025', '08/02/2025', '08/22/2025', '08/14/2025', '08/06/2025', '09/05/2025', '08/28/2025', '07/22/2025', '07/20/2025', '09/10/2025'][i],
    nextActions: nextActionsList[i],
  }));
  budgetBase.forEach((b, i) => {
    b.remainingHours = b.budgetHours - b.actualHours - b.scheduledHours;
    const rem = b.remainingHours;
    // Most rows: ETC <= remaining. A few (indices 5, 12, 19, 22, 26, 29): ETC can be > remaining.
    const etcAboveAllowed = [5, 12, 19, 22, 26, 29];
    if (etcAboveAllowed.includes(i)) {
      b.estimateToComplete = Math.max(0, rem + Math.floor(rem * 0.15) + (i % 2));
    } else {
      b.estimateToComplete = Math.max(0, Math.min(rem, Math.floor(rem * (0.55 + (i % 6) * 0.07))));
    }
    b.estimateToComplete = Math.round(b.estimateToComplete * 0.75); // 25% reduction for health score
  });
  (pmoReportData as { budgetReview: { fixedFee: typeof budgetBase; timeAndMaterials: typeof budgetBase } }).budgetReview = {
    fixedFee: budgetBase.slice(0, 15),
    timeAndMaterials: budgetBase.slice(15, 30),
  };
})();

const cardClass = 'bg-white rounded-lg shadow-sm border border-gray-200 p-8';

/** Number of weeks shown in PMO Metrics trend panels (6–8 week window). */
const TREND_PANEL_WEEKS = 6;

const BACKLOG_FORECAST_ENGINEERS = ['Dominic Zeni', 'Trevor Butler', 'Freddy Tabet', 'Craig Grant'] as const;
/** Weekly schedulable capacity: 4 engineers × 40 hrs (matches backlog forecast mock). */
const WEEKLY_CAPACITY_HOURS = 160;

function trendStatsFromSeries(series: number[]): { current: number; delta: number; arrow: '↑' | '↓' | '→' } {
  if (series.length === 0) return { current: 0, delta: 0, arrow: '→' };
  if (series.length === 1) {
    const current = series[0]!;
    return { current, delta: 0, arrow: '→' };
  }
  const current = series[series.length - 1]!;
  const prev = series[series.length - 2]!;
  const delta = current - prev;
  const eps = 1e-9;
  const arrow = delta > eps ? '↑' : delta < -eps ? '↓' : '→';
  return { current, delta, arrow };
}

function formatDateMMDDYYYY(dateStr: string, year: string = '2025'): string {
  const parts = dateStr.trim().split('/');
  if (parts.length < 2) return dateStr;
  const month = parts[0].padStart(2, '0');
  const day = parts[1].padStart(2, '0');
  return `${month}/${day}/${year}`;
}

function formatPeriodMMDDYYYY(periodStr: string, year: string = '2025'): string {
  const range = periodStr.split(/\s*[–-]\s*/);
  if (range.length < 2) return formatDateMMDDYYYY(periodStr.trim(), year);
  return `${formatDateMMDDYYYY(range[0].trim(), year)} – ${formatDateMMDDYYYY(range[1].trim(), year)}`;
}

function mmddyyyyToYyyyMmDd(s: string): string {
  const parts = s.trim().split('/');
  if (parts.length !== 3) return '';
  return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
}
function yyyyMmDdToMmddyyyy(s: string): string {
  const parts = s.trim().split('-');
  if (parts.length !== 3) return s;
  return `${parts[1]}/${parts[2]}/${parts[0]}`;
}

/** Parse M/D/YYYY or MM/DD/YYYY for milestone / report dates. */
function parseUsDateFlexible(s: string): Date | null {
  const parts = s.trim().split('/');
  if (parts.length < 2) return null;
  const month = parseInt(parts[0]!, 10);
  const day = parseInt(parts[1]!, 10);
  const year = parts[2] != null && parts[2] !== '' ? parseInt(parts[2], 10) : new Date().getFullYear();
  if (Number.isNaN(month) || Number.isNaN(day) || Number.isNaN(year)) return null;
  const d = new Date(year, month - 1, day);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * PMO Dashboard Upgrade – KPI boxes, horizontal bar charts, filters, backlog links.
 */
const PMODashboardUpgrade: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>('projectReview');
  const [projectFilter, setProjectFilter] = useState('');
  const [projectReviewFilter, setProjectReviewFilter] = useState('');
  const [projectReviewEngineerFilter, setProjectReviewEngineerFilter] = useState('');
  const [projectReviewClosingFilter, setProjectReviewClosingFilter] = useState<'all' | 'thisWeek' | 'nextWeek'>('all');
  const [budgetClosingFilter, setBudgetClosingFilter] = useState<'all' | 'thisWeek' | 'nextWeek'>('all');
  const [projectReviewStatusFilter, setProjectReviewStatusFilter] = useState<'' | 'Initiating' | 'Planning' | 'On Track' | 'Closing' | 'On Hold'>('');
  const [cutoverFilter, setCutoverFilter] = useState('');
  const [subcontractorFilter, setSubcontractorFilter] = useState('');
  const [projectReviewSortColumn, setProjectReviewSortColumn] = useState<string | null>('projectName');
  const [projectReviewSortDirection, setProjectReviewSortDirection] = useState<'asc' | 'desc'>('asc');
  const [budgetSortColumn, setBudgetSortColumn] = useState<string | null>('estimatedEndDate');
  const [budgetSortDirection, setBudgetSortDirection] = useState<'asc' | 'desc'>('asc');
  const [cutoverSortColumn, setCutoverSortColumn] = useState<string | null>('date');
  const [cutoverSortDirection, setCutoverSortDirection] = useState<'asc' | 'desc'>('asc');
  const [subcontractorSortColumn, setSubcontractorSortColumn] = useState<string | null>('date');
  const [subcontractorSortDirection, setSubcontractorSortDirection] = useState<'asc' | 'desc'>('asc');
  const [statusOverrides, setStatusOverrides] = useState<Record<string, string>>({});
  const [editingStatusKey, setEditingStatusKey] = useState<string | null>(null);
  const [etcOverrides, setEtcOverrides] = useState<Record<string, number>>({});
  const [editingEtcKey, setEditingEtcKey] = useState<string | null>(null);
  const [projectManagerOverrides, setProjectManagerOverrides] = useState<Record<string, string>>({});
  const [editingPmKey, setEditingPmKey] = useState<string | null>(null);
  const [endDateOverrides, setEndDateOverrides] = useState<Record<string, string>>({});
  const [editingEndDateKey, setEditingEndDateKey] = useState<string | null>(null);
  const [milestoneBilledOverrides, setMilestoneBilledOverrides] = useState<Record<number, boolean>>({});
  const [milestoneToConfirm, setMilestoneToConfirm] = useState<number | null>(null);
  const [milestoneFilter, setMilestoneFilter] = useState('');
  const [expandedProjectHealthIndex, setExpandedProjectHealthIndex] = useState<number | null>(null);
  const [billableAttainmentExpanded, setBillableAttainmentExpanded] = useState(false);
  const [metricsBillingMilestonesExpanded, setMetricsBillingMilestonesExpanded] = useState(true);
  const [metricsClientPortfolioExpanded, setMetricsClientPortfolioExpanded] = useState(true);
  const [projectHealthFilter, setProjectHealthFilter] = useState('');
  const [projectHealthSortColumn, setProjectHealthSortColumn] = useState<string | null>('healthScore');
  const [projectHealthSortDirection, setProjectHealthSortDirection] = useState<'asc' | 'desc'>('desc');
  const [clientPortfolioHover, setClientPortfolioHover] = useState<string | null>(null);
  const [portfolioBacklogPopupOpen, setPortfolioBacklogPopupOpen] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement | null>(null);
  const pmDropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (editingStatusKey) statusDropdownRef.current?.focus();
  }, [editingStatusKey]);
  useEffect(() => {
    if (editingPmKey) pmDropdownRef.current?.focus();
  }, [editingPmKey]);

  const getProjectReviewRowKey = (row: { customerName?: string; projectName: string }) => `${(row as { customerName?: string }).customerName ?? ''}|${row.projectName}`;

  const { reportDate, confirmationDeadline, schedulingKPI, backlogReview, budgetReview, projectsClosing, upcomingCutoverReview, subcontractorsScheduledThisWeek, milestones, projectReview, backlogForecast, backlogHours, billableAttainment, capacityRiskExpectedWeek } = pmoReportData;

  const projectManagerOptions = useMemo(() => [...new Set(projectReview.map((p) => p.projectManager))].sort(), [projectReview]);

  // PMO Metrics: top 5 customers by active project count
  const clientPortfolioTop5 = useMemo(() => {
    const byCustomer: Record<string, number> = {};
    const revenueByCustomer: Record<string, number> = {};
    projectReview.forEach((p) => {
      const c = (p as { customerName?: string }).customerName ?? 'Unknown';
      byCustomer[c] = (byCustomer[c] ?? 0) + 1;
    });
    const allBudget = [...budgetReview.fixedFee, ...budgetReview.timeAndMaterials];
    const hourlyRate = 150; // TODO: wire to actual rate
    allBudget.forEach((b) => {
      const c = (b as { customerName?: string }).customerName ?? 'Unknown';
      revenueByCustomer[c] = (revenueByCustomer[c] ?? 0) + (b.budgetHours ?? 0) * hourlyRate;
    });
    return Object.entries(byCustomer)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 5)
      .map(([name, count]) => ({ customer: name, projectCount: count as number, revenue: Math.round(revenueByCustomer[name] ?? 0) }));
  }, [projectReview, budgetReview]);

  /** Sum of top-5 customer revenue — used for % of portfolio column */
  const clientPortfolioTop5RevenueTotal = useMemo(
    () => clientPortfolioTop5.reduce((s, r) => s + r.revenue, 0),
    [clientPortfolioTop5]
  );

  const projectsByCustomer = useMemo(() => {
    const map: Record<string, string[]> = {};
    projectReview.forEach((p) => {
      const c = (p as { customerName?: string }).customerName ?? 'Unknown';
      if (!map[c]) map[c] = [];
      map[c].push(p.projectName);
    });
    return map;
  }, [projectReview]);

  const unbilledMilestonesForMetrics = useMemo(
    () => milestones.filter((m) => (m as { status?: string }).status === 'Unbilled'),
    [milestones]
  );
  const billingMilestonesTotalAmount = useMemo(
    () => unbilledMilestonesForMetrics.reduce((sum, m) => sum + ((m as { amount?: number }).amount ?? 0), 0),
    [unbilledMilestonesForMetrics]
  );

  /** Sum of milestone amounts billed on/after (report date − 30 days) and on/before report date. */
  const revenueBilledLast30Days = useMemo(() => {
    const end = parseUsDateFlexible(reportDate);
    if (!end) return 0;
    const start = new Date(end);
    start.setDate(start.getDate() - 30);
    const startMs = start.getTime();
    const endMs = end.getTime();
    let total = 0;
    milestones.forEach((m, i) => {
      const effectiveStatus = milestoneBilledOverrides[i] ? 'Billed' : (m as { status?: string }).status;
      if (effectiveStatus !== 'Billed') return;
      const raw =
        (m as { billedDate?: string }).billedDate ?? (m as { estimatedDate?: string }).estimatedDate ?? '';
      const d = parseUsDateFlexible(raw);
      if (!d) return;
      const t = d.getTime();
      if (t >= startMs && t <= endMs) total += (m as { amount?: number }).amount ?? 0;
    });
    return total;
  }, [milestones, reportDate, milestoneBilledOverrides]);

  // Budget Used % = (Actual + Scheduled) / Budget → bucket points per leadership model:
  // 0–80%=100, 85–90%=95, 91–95%=90, 96–100%=85, 101–125%=75; 81–84% treated as 100; >125% = 50
  const getBudgetScoreFromUsedPct = (usedPct: number) => {
    if (usedPct <= 80) return 100;
    if (usedPct < 85) return 100;
    if (usedPct <= 90) return 95;
    if (usedPct <= 95) return 90;
    if (usedPct <= 100) return 85;
    if (usedPct <= 125) return 75;
    return 50;
  };

  // Health = Budget score (bucket) − ETC hrs − (overdue actions × 4); no percentage weighting
  const projectHealthData = useMemo(() => {
    const allItems = [...budgetReview.fixedFee, ...budgetReview.timeAndMaterials];
    return allItems
      .map((p) => {
        const budget = p.budgetHours;
        const used = p.actualHours + p.scheduledHours;
        const remainingHours = Math.max(0, budget - used);
        const budgetUsedPct = budget > 0 ? (used / budget) * 100 : 0;
        const budgetScore = getBudgetScoreFromUsedPct(budgetUsedPct);
        const riskCount = (p.projectStatus === 'At Risk' ? 1 : 0);
        const etcHours = (p as { estimateToComplete?: number }).estimateToComplete ?? 0;
        const overdueActionsCount = (p as { overdueActionsCount?: number }).overdueActionsCount ?? 0;
        const riskComponent = etcHours;
        const actionsComponent = overdueActionsCount * 4;
        const healthScore = Math.round(
          Math.max(0, Math.min(100, budgetScore - riskComponent - actionsComponent))
        );
        const customerName = (p as { customerName?: string }).customerName ?? '—';
        const rawProjectName = p.projectName;
        const projectName = (() => {
          if (!customerName || customerName === '—') return rawProjectName;
          const prefixes = [`${customerName} – `, `${customerName} - `, `${customerName} `];
          for (const pre of prefixes) {
            if (rawProjectName.startsWith(pre)) return rawProjectName.slice(pre.length).trim() || rawProjectName;
          }
          if (rawProjectName.toLowerCase().startsWith(customerName.toLowerCase() + ' ')) {
            return rawProjectName.slice(customerName.length + 1).trim() || rawProjectName;
          }
          return rawProjectName;
        })();
        const riskItemsCount = (p as { riskItemsCount?: number }).riskItemsCount ?? 0;
        return {
          customerProject: `${customerName} – ${rawProjectName}`,
          customerName,
          projectName,
          projectManager: projectManagerOverrides[getProjectReviewRowKey(p)] ?? (p as { projectManager?: string }).projectManager ?? '—',
          healthScore,
          budgetHours: budget,
          remainingHours,
          budgetHealth: Math.round(budgetUsedPct),
          budgetScore,
          budgetUsedPct,
          riskScore: (1 - riskCount) * 100,
          riskComponent,
          actionsComponent,
          overdueActionsCount,
          riskCount,
          riskItemsCount,
          actionsOpen: etcHours,
        };
      })
      .sort((a, b) => b.healthScore - a.healthScore);
  }, [budgetReview, projectManagerOverrides]);

  const filteredProjectHealthData = useMemo(() => {
    if (!projectHealthFilter.trim()) return projectHealthData;
    const q = projectHealthFilter.toLowerCase().trim();
    return projectHealthData.filter(
      (row) =>
        row.customerName.toLowerCase().includes(q) || row.projectName.toLowerCase().includes(q) || row.projectManager.toLowerCase().includes(q)
    );
  }, [projectHealthData, projectHealthFilter]);

  const sortedProjectHealthData = useMemo(() => {
    if (!projectHealthSortColumn) return filteredProjectHealthData;
    return [...filteredProjectHealthData].sort((a, b) => {
      let aVal: string | number, bVal: string | number;
      const key = projectHealthSortColumn as keyof (typeof filteredProjectHealthData)[0];
      aVal = a[key] as string | number;
      bVal = b[key] as string | number;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        const cmp = aVal - bVal;
        return projectHealthSortDirection === 'asc' ? cmp : -cmp;
      }
      const aStr = String(aVal ?? '');
      const bStr = String(bVal ?? '');
      const cmp = aStr.localeCompare(bStr, undefined, { numeric: true });
      return projectHealthSortDirection === 'asc' ? cmp : -cmp;
    });
  }, [filteredProjectHealthData, projectHealthSortColumn, projectHealthSortDirection]);

  /** Customers with at least one project below 70 health — Leadership tab */
  const leadershipCustomerRiskRows = useMemo(() => {
    const map: Record<string, { minHealth: number; count: number; projects: string[] }> = {};
    projectHealthData.forEach((row) => {
      if (row.healthScore >= 70) return;
      const c = row.customerName;
      if (!map[c]) map[c] = { minHealth: 100, count: 0, projects: [] };
      map[c].count += 1;
      map[c].minHealth = Math.min(map[c].minHealth, row.healthScore);
      map[c].projects.push(row.projectName);
    });
    return Object.entries(map)
      .map(([customer, v]) => ({ customer, ...v }))
      .sort((a, b) => a.minHealth - b.minHealth);
  }, [projectHealthData]);

  const openTentativePct = parseFloat(schedulingKPI.openTentative.percentage.replace('%', ''));
  const isBacklogAlert = openTentativePct > 20;

  // Smart Alerts for Metrics tab
  const smartAlerts = useMemo(() => {
    const allBudget = [...budgetReview.fixedFee, ...budgetReview.timeAndMaterials];
    const projectsOverBudgetList = allBudget
      .filter((p) => p.actualHours + p.scheduledHours > p.budgetHours)
      .map((p) => {
        const used = p.actualHours + p.scheduledHours;
        const progressPct = p.budgetHours > 0 ? Math.round((used / p.budgetHours) * 100) : 0;
        return {
          customerName: (p as { customerName?: string }).customerName ?? '—',
          projectName: p.projectName,
          projectManager: projectManagerOverrides[getProjectReviewRowKey(p)] ?? p.projectManager,
          progress: progressPct,
        };
      });
    const firstWeek = schedulingKPI.weeks[0]?.period ?? '';
    const [startStr, endStr] = firstWeek.split(/\s*[–-]\s*/).map((s) => s.trim());
    const parseMD = (s: string) => {
      const [m, d] = s.split('/').map(Number);
      return (m ?? 0) * 31 + (d ?? 0);
    };
    const weekStart = parseMD(startStr);
    const weekEnd = parseMD(endStr);
    const cutoversThisWeekList = upcomingCutoverReview.filter((c) => {
      const d = parseMD(c.date);
      return d >= weekStart && d <= weekEnd;
    });
    const projectsOnHoldList = projectReview.filter((p) => {
      const status = (statusOverrides[getProjectReviewRowKey(p)] ?? p.projectStatus ?? '').toLowerCase();
      return status === 'on hold';
    }).map((p) => ({
      customerName: (p as { customerName?: string }).customerName ?? '—',
      projectName: p.projectName,
      projectManager: projectManagerOverrides[getProjectReviewRowKey(p)] ?? (p as { projectManager?: string }).projectManager ?? '—',
    }));
    const projectsOnHold = projectsOnHoldList.length;
    const activeProjects = projectReview.length - projectsOnHold;
    const projectsClosingThisWeekList = projectsClosing.thisWeek;
    const parseDate = (s: string) => {
      const [m, d, y] = (s ?? '').trim().split('/').map(Number);
      if (!m || !d || !y) return null;
      return new Date(y, (m ?? 1) - 1, d ?? 1);
    };
    const durations = allBudget
      .filter((p) => {
        const start = parseDate((p as { estimatedStartDate?: string }).estimatedStartDate);
        const end = parseDate(p.estimatedEndDate);
        return start && end && end.getTime() >= start.getTime();
      })
      .map((p) => {
        const start = parseDate((p as { estimatedStartDate?: string }).estimatedStartDate)!;
        const end = parseDate(p.estimatedEndDate)!;
        return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      });
    const averageProjectDuration = durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0;
    return { projectsOverBudget: projectsOverBudgetList.length, projectsOverBudgetList, cutoversThisWeek: cutoversThisWeekList.length, cutoversThisWeekList, activeProjects, projectsOnHold, projectsOnHoldList, projectsClosingThisWeek: projectsClosingThisWeekList.length, projectsClosingThisWeekList, averageProjectDuration };
  }, [budgetReview, schedulingKPI.weeks, upcomingCutoverReview, backlogForecast, projectsClosing.thisWeek, projectManagerOverrides, projectReview, statusOverrides]);

  /** Combined exception list for Leadership tab */
  const leadershipProjectExceptionsRows = useMemo(() => {
    const low = projectHealthData
      .filter((r) => r.healthScore < 50)
      .map((r) => ({
        kind: 'Low health' as const,
        customer: r.customerName,
        project: r.projectName,
        pm: r.projectManager,
        detail: String(r.healthScore),
      }));
    const ob = smartAlerts.projectsOverBudgetList.map((p) => ({
      kind: 'Over budget' as const,
      customer: p.customerName,
      project: p.projectName,
      pm: p.projectManager ?? '—',
      detail: `${p.progress}%`,
    }));
    const oh = smartAlerts.projectsOnHoldList.map((p) => ({
      kind: 'On hold' as const,
      customer: p.customerName,
      project: p.projectName,
      pm: p.projectManager,
      detail: '—',
    }));
    return [...ob, ...oh, ...low];
  }, [projectHealthData, smartAlerts]);

  const lastWeekTotal = billableAttainment?.weeks?.[billableAttainment.weeks.length - 1]?.total ?? 0;
  const billableTarget = billableAttainment?.minimumAttainmentMetric ?? 119;
  const isBillableAttainmentAlert = lastWeekTotal < billableTarget;

  const allBudgetItems = useMemo(() => [...budgetReview.fixedFee.map((p) => ({ ...p, type: 'FF' as const })), ...budgetReview.timeAndMaterials.map((p) => ({ ...p, type: 'T&M' as const }))], []);
  const filteredBudgetItems = useMemo(() => {
    let list = allBudgetItems;
    if (budgetClosingFilter === 'thisWeek') {
      const keys = new Set(projectsClosing.thisWeek.map((c) => `${c.projectName}|${c.projectManager}`));
      list = list.filter((p) => keys.has(`${p.projectName}|${projectManagerOverrides[getProjectReviewRowKey(p)] ?? p.projectManager}`));
    } else if (budgetClosingFilter === 'nextWeek') {
      const keys = new Set(projectsClosing.nextWeek.map((c) => `${c.projectName}|${c.projectManager}`));
      list = list.filter((p) => keys.has(`${p.projectName}|${projectManagerOverrides[getProjectReviewRowKey(p)] ?? p.projectManager}`));
    }
    if (projectReviewEngineerFilter) {
      list = list.filter((p) => (p as { engineer?: string }).engineer === projectReviewEngineerFilter);
    }
    if (projectReviewStatusFilter) {
      list = list.filter((p) => (statusOverrides[getProjectReviewRowKey(p)] ?? p.projectStatus) === projectReviewStatusFilter);
    }
    if (projectReviewFilter.trim()) {
      const q = projectReviewFilter.toLowerCase();
      list = list.filter((p) => (projectManagerOverrides[getProjectReviewRowKey(p)] ?? p.projectManager).toLowerCase().includes(q) || p.projectName.toLowerCase().includes(q));
    }
    if (!projectFilter.trim()) return list;
    const q = projectFilter.toLowerCase();
    return list.filter((p) => p.projectName.toLowerCase().includes(q) || (projectManagerOverrides[getProjectReviewRowKey(p)] ?? p.projectManager).toLowerCase().includes(q));
  }, [allBudgetItems, projectFilter, budgetClosingFilter, projectReviewFilter, projectReviewEngineerFilter, projectReviewStatusFilter, projectsClosing.thisWeek, projectsClosing.nextWeek, statusOverrides, projectManagerOverrides]);

  const projectsByEngineer = useMemo(() => {
    const count: Record<string, number> = {};
    projectReview.forEach((p) => {
      const eng = (p as { engineer?: string }).engineer ?? p.projectManager;
      count[eng] = (count[eng] ?? 0) + 1;
    });
    return count;
  }, [projectReview]);
  const projectsByEngineerChartData = useMemo(() => {
    const entries = Object.entries(projectsByEngineer)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .map(([name, count]) => ({ name, count: count as number }));
    const max = Math.max(1, ...entries.map((e) => e.count));
    return { entries, max };
  }, [projectsByEngineer]);

  const projectsByPM = useMemo(() => {
    const count: Record<string, number> = {};
    projectReview.forEach((p) => {
      const pm = projectManagerOverrides[getProjectReviewRowKey(p)] ?? p.projectManager;
      count[pm] = (count[pm] ?? 0) + 1;
    });
    return count;
  }, [projectReview, projectManagerOverrides]);
  const projectsByPMChartData = useMemo(() => {
    const entries = Object.entries(projectsByPM)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .map(([name, count]) => ({ name, count: count as number }));
    const max = Math.max(1, ...entries.map((e) => e.count));
    return { entries, max };
  }, [projectsByPM]);

  const statusOrder: Array<'Initiating' | 'Planning' | 'On Track' | 'Closing' | 'On Hold'> = ['Initiating', 'Planning', 'On Track', 'Closing', 'On Hold'];
  const projectReviewStatusOptions: { value: string; label: string }[] = [
    { value: 'Initiating', label: 'Initiating' },
    { value: 'Planning', label: 'Planning' },
    { value: 'On Track', label: 'Executing' },
    { value: 'Closing', label: 'Closing' },
    { value: 'On Hold', label: 'On Hold' },
  ];
  const getStatusBadgeClass = (status: string) =>
    status === 'On Track' ? 'bg-green-100 text-green-800' : (status === 'At Risk' || status === 'Closing') ? 'bg-blue-100 text-blue-800' : status === 'Initiating' ? 'bg-slate-100 text-slate-800' : status === 'Planning' ? 'bg-violet-100 text-violet-800' : status === 'On Hold' ? 'bg-amber-100 text-amber-800' : 'bg-amber-100 text-amber-800';
  const projectsByStatus = useMemo(() => {
    const count: Record<string, number> = { 'Initiating': 0, 'Planning': 0, 'On Track': 0, 'Closing': 0, 'On Hold': 0 };
    projectReview.forEach((p) => {
      const effective = (statusOverrides[getProjectReviewRowKey(p)] ?? p.projectStatus) as 'Initiating' | 'Planning' | 'On Track' | 'Closing' | 'At Risk' | 'On Hold';
      const s = effective === 'At Risk' ? 'Closing' : effective;
      if (s in count) count[s]++;
    });
    return count;
  }, [projectReview, statusOverrides]);
  const projectsByStatusChartData = useMemo(() => {
    const entries = statusOrder.map((status) => ({ name: status, count: projectsByStatus[status] ?? 0 }));
    const max = Math.max(1, ...entries.map((e) => e.count));
    return { entries, max };
  }, [projectsByStatus]);

  const filteredProjectReview = useMemo(() => {
    let list = projectReview;
    if (projectReviewClosingFilter === 'thisWeek') {
      const keys = new Set(projectsClosing.thisWeek.map((c) => `${c.projectName}|${c.projectManager}`));
      list = list.filter((p) => keys.has(`${p.projectName}|${projectManagerOverrides[getProjectReviewRowKey(p)] ?? p.projectManager}`));
    } else if (projectReviewClosingFilter === 'nextWeek') {
      const keys = new Set(projectsClosing.nextWeek.map((c) => `${c.projectName}|${c.projectManager}`));
      list = list.filter((p) => keys.has(`${p.projectName}|${projectManagerOverrides[getProjectReviewRowKey(p)] ?? p.projectManager}`));
    }
    if (projectReviewEngineerFilter) {
      list = list.filter((p) => (p as { engineer?: string }).engineer === projectReviewEngineerFilter);
    }
    if (projectReviewStatusFilter) {
      list = list.filter((p) => (statusOverrides[getProjectReviewRowKey(p)] ?? p.projectStatus) === projectReviewStatusFilter);
    }
    if (!projectReviewFilter.trim()) return list;
    const q = projectReviewFilter.toLowerCase();
    return list.filter((p) => p.projectName.toLowerCase().includes(q) || (projectManagerOverrides[getProjectReviewRowKey(p)] ?? p.projectManager).toLowerCase().includes(q) || (p.customerName && p.customerName.toLowerCase().includes(q)) || p.projectStatus.toLowerCase().includes(q) || (p.nextActions && p.nextActions.toLowerCase().includes(q)));
  }, [projectReview, projectReviewFilter, projectReviewEngineerFilter, projectReviewClosingFilter, projectReviewStatusFilter, projectsClosing.thisWeek, projectsClosing.nextWeek, statusOverrides, projectManagerOverrides]);

  const sortedProjectReview = useMemo(() => {
    if (!projectReviewSortColumn) return filteredProjectReview;
    return [...filteredProjectReview].sort((a, b) => {
      let aVal: unknown, bVal: unknown;
      if (projectReviewSortColumn === 'customerProject') {
        aVal = `${(a as { customerName?: string }).customerName ?? ''} – ${a.projectName}`;
        bVal = `${(b as { customerName?: string }).customerName ?? ''} – ${b.projectName}`;
      } else if (projectReviewSortColumn === 'projectStatus') {
        aVal = statusOverrides[getProjectReviewRowKey(a)] ?? a.projectStatus;
        bVal = statusOverrides[getProjectReviewRowKey(b)] ?? b.projectStatus;
      } else if (projectReviewSortColumn === 'projectManager') {
        aVal = projectManagerOverrides[getProjectReviewRowKey(a)] ?? a.projectManager;
        bVal = projectManagerOverrides[getProjectReviewRowKey(b)] ?? b.projectManager;
      } else {
        const key = projectReviewSortColumn as keyof (typeof projectReview)[0];
        aVal = a[key];
        bVal = b[key];
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') return projectReviewSortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      const cmp = String(aVal ?? '').localeCompare(String(bVal ?? ''), undefined, { sensitivity: 'base' });
      return projectReviewSortDirection === 'asc' ? cmp : -cmp;
    });
  }, [filteredProjectReview, projectReviewSortColumn, projectReviewSortDirection, statusOverrides, projectManagerOverrides]);

  const filteredCutovers = useMemo(() => {
    if (!cutoverFilter.trim()) return upcomingCutoverReview;
    const q = cutoverFilter.toLowerCase();
    return upcomingCutoverReview.filter((item) => item.date.toLowerCase().includes(q) || (item.name && item.name.toLowerCase().includes(q)) || (item.customerName && item.customerName.toLowerCase().includes(q)) || (item.projectName && item.projectName.toLowerCase().includes(q)) || (item.description && item.description.toLowerCase().includes(q)));
  }, [upcomingCutoverReview, cutoverFilter]);

  const parseDateMD = (s: string): [number, number] => {
    const parts = s.trim().split('/').map(Number);
    return [parts[0] ?? 0, parts[1] ?? 0];
  };

  const sortedCutovers = useMemo(() => {
    if (!cutoverSortColumn) return filteredCutovers;
    return [...filteredCutovers].sort((a, b) => {
      let aVal: string | number, bVal: string | number;
      if (cutoverSortColumn === 'date') {
        const [aM, aD] = parseDateMD(a.date);
        const [bM, bD] = parseDateMD(b.date);
        const cmp = aM !== bM ? aM - bM : aD - bD;
        return cutoverSortDirection === 'asc' ? cmp : -cmp;
      }
      if (cutoverSortColumn === 'customerProject') {
        aVal = `${(a as { customerName?: string }).customerName ?? '—'} – ${(a as { projectName?: string }).projectName ?? '—'}`;
        bVal = `${(b as { customerName?: string }).customerName ?? '—'} – ${(b as { projectName?: string }).projectName ?? '—'}`;
      } else {
        aVal = (a as Record<string, unknown>)[cutoverSortColumn] as string ?? '';
        bVal = (b as Record<string, unknown>)[cutoverSortColumn] as string ?? '';
      }
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { sensitivity: 'base' });
      return cutoverSortDirection === 'asc' ? cmp : -cmp;
    });
  }, [filteredCutovers, cutoverSortColumn, cutoverSortDirection]);

  const subcontractorScheduleSorted = useMemo(() => {
    return [...subcontractorsScheduledThisWeek].sort((a, b) => {
      const [aM, aD] = a.date.split('/').map(Number);
      const [bM, bD] = b.date.split('/').map(Number);
      if (aM !== bM) return aM - bM;
      if (aD !== bD) return aD - bD;
      const aTime = a.time === 'AM' ? 0 : a.time === 'PM' ? 1 : -1;
      const bTime = b.time === 'AM' ? 0 : b.time === 'PM' ? 1 : -1;
      return aTime - bTime;
    });
  }, [subcontractorsScheduledThisWeek]);

  const filteredSubcontractorSchedule = useMemo(() => {
    if (!subcontractorFilter.trim()) return subcontractorScheduleSorted;
    const q = subcontractorFilter.toLowerCase();
    return subcontractorScheduleSorted.filter(
      (entry) =>
        entry.date.toLowerCase().includes(q) ||
        (entry.time && entry.time.toLowerCase().includes(q)) ||
        entry.name.toLowerCase().includes(q) ||
        entry.customerName.toLowerCase().includes(q) ||
        entry.projectName.toLowerCase().includes(q) ||
        (entry.description && entry.description.toLowerCase().includes(q))
    );
  }, [subcontractorScheduleSorted, subcontractorFilter]);

  const sortedSubcontractorSchedule = useMemo(() => {
    if (!subcontractorSortColumn) return filteredSubcontractorSchedule;
    return [...filteredSubcontractorSchedule].sort((a, b) => {
      let aVal: string, bVal: string;
      if (subcontractorSortColumn === 'date') {
        const [aM, aD] = parseDateMD(a.date);
        const [bM, bD] = parseDateMD(b.date);
        let cmp = aM !== bM ? aM - bM : aD - bD;
        if (cmp === 0 && (a.time || b.time)) {
          const aT = a.time === 'AM' ? 0 : a.time === 'PM' ? 1 : -1;
          const bT = b.time === 'AM' ? 0 : b.time === 'PM' ? 1 : -1;
          cmp = aT - bT;
        }
        return subcontractorSortDirection === 'asc' ? cmp : -cmp;
      }
      if (subcontractorSortColumn === 'customerProject') {
        aVal = `${a.customerName ?? '—'} – ${a.projectName ?? '—'}`;
        bVal = `${b.customerName ?? '—'} – ${b.projectName ?? '—'}`;
      } else {
        aVal = (a as Record<string, unknown>)[subcontractorSortColumn] as string ?? '';
        bVal = (b as Record<string, unknown>)[subcontractorSortColumn] as string ?? '';
      }
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { sensitivity: 'base' });
      return subcontractorSortDirection === 'asc' ? cmp : -cmp;
    });
  }, [filteredSubcontractorSchedule, subcontractorSortColumn, subcontractorSortDirection]);

  const handleProjectReviewSort = (column: string) => { setProjectReviewSortColumn(column); setProjectReviewSortDirection((prev) => (projectReviewSortColumn === column ? (prev === 'asc' ? 'desc' : 'asc') : 'asc')); };
  const handleBudgetSort = (column: string) => { setBudgetSortColumn(column); setBudgetSortDirection((prev) => (budgetSortColumn === column ? (prev === 'asc' ? 'desc' : 'asc') : 'asc')); };
  const handleCutoverSort = (column: string) => { setCutoverSortColumn(column); setCutoverSortDirection((prev) => (cutoverSortColumn === column ? (prev === 'asc' ? 'desc' : 'asc') : 'asc')); };
  const handleSubcontractorSort = (column: string) => { setSubcontractorSortColumn(column); setSubcontractorSortDirection((prev) => (subcontractorSortColumn === column ? (prev === 'asc' ? 'desc' : 'asc') : 'asc')); };
  const handleProjectHealthSort = (column: string) => { setProjectHealthSortColumn(column); setProjectHealthSortDirection((prev) => (projectHealthSortColumn === column ? (prev === 'asc' ? 'desc' : 'asc') : 'asc')); };

  const sortedBudgetItems = useMemo(() => {
    if (!budgetSortColumn) return filteredBudgetItems;
    return [...filteredBudgetItems].sort((a, b) => {
      let aVal: number | string, bVal: number | string;
      if (budgetSortColumn === 'remaining') {
        aVal = a.budgetHours - a.actualHours - a.scheduledHours;
        bVal = b.budgetHours - b.actualHours - b.scheduledHours;
      } else if (budgetSortColumn === 'projectStatus') {
        aVal = statusOverrides[getProjectReviewRowKey(a)] ?? (a as { projectStatus?: string }).projectStatus ?? '';
        bVal = statusOverrides[getProjectReviewRowKey(b)] ?? (b as { projectStatus?: string }).projectStatus ?? '';
      } else if (budgetSortColumn === 'projectManager') {
        aVal = projectManagerOverrides[getProjectReviewRowKey(a)] ?? (a as { projectManager?: string }).projectManager ?? '';
        bVal = projectManagerOverrides[getProjectReviewRowKey(b)] ?? (b as { projectManager?: string }).projectManager ?? '';
      } else {
        aVal = (a as Record<string, unknown>)[budgetSortColumn] as number | string;
        bVal = (b as Record<string, unknown>)[budgetSortColumn] as number | string;
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') return budgetSortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      const cmp = String(aVal ?? '').localeCompare(String(bVal ?? ''), undefined, { sensitivity: 'base' });
      return budgetSortDirection === 'asc' ? cmp : -cmp;
    });
  }, [filteredBudgetItems, budgetSortColumn, budgetSortDirection, statusOverrides, projectManagerOverrides]);

  const portfolioHealthScore = projectHealthData.length > 0
    ? Math.round(projectHealthData.reduce((s, r) => s + r.healthScore, 0) / projectHealthData.length)
    : 0;

  const totalProjectsCount = projectReview.length;
  /** Each counts toward overall banner emoji: 0 bad → green, 1–2 → yellow, 3+ → red */
  const indicatorBadHealth = portfolioHealthScore < 75;
  const indicatorBadBillable = isBillableAttainmentAlert;
  /** Backlog %: green if ≤20%; issue if &gt;20% */
  const indicatorBadBacklog = openTentativePct > 20;
  /** Over budget: green if ≤15% of projects; issue if &gt;15% */
  const indicatorBadOverBudget =
    totalProjectsCount > 0 && smartAlerts.projectsOverBudget / totalProjectsCount > 0.15;
  const indicatorBadOnHold =
    totalProjectsCount > 0 && smartAlerts.projectsOnHold / totalProjectsCount > 0.15;

  const portfolioBannerRedIndicatorCount = [
    indicatorBadHealth,
    indicatorBadBillable,
    indicatorBadBacklog,
    indicatorBadOverBudget,
    indicatorBadOnHold,
  ].filter(Boolean).length;

  const portfolioStatusBannerEmoji =
    portfolioBannerRedIndicatorCount >= 3 ? '🔴' : portfolioBannerRedIndicatorCount >= 1 ? '🟡' : '🟢';
  const portfolioStatusBannerLabel =
    portfolioStatusBannerEmoji === '🟢' ? 'Healthy' : portfolioStatusBannerEmoji === '🟡' ? 'Caution' : 'At risk';

  const highlightBannerHealth = indicatorBadHealth;
  const highlightBannerBillable = indicatorBadBillable;
  const highlightBannerBacklog = indicatorBadBacklog;
  const highlightBannerOverBudget = indicatorBadOverBudget;
  const highlightBannerOnHold = indicatorBadOnHold;
  const bannerIssueHighlightClass =
    portfolioStatusBannerEmoji === '🔴'
      ? 'rounded-md px-2 py-1 ring-1 ring-red-300 bg-red-50'
      : 'rounded-md px-2 py-1 ring-1 ring-amber-300 bg-amber-50';
  const bannerIssueTextClass = portfolioStatusBannerEmoji === '🔴' ? 'text-red-900' : 'text-amber-900';
  /** Backlog over threshold: always red issue styling (not amber when overall is yellow) */
  const bannerBacklogIssueHighlightClass = 'rounded-md px-2 py-1 ring-1 ring-red-300 bg-red-50';
  const bannerBacklogIssueTextClass = 'text-red-900';
  /** Good metrics: same box + weight as issue rows, green palette */
  const bannerGoodHighlightClass = 'rounded-md px-2 py-1 ring-1 ring-green-300 bg-green-50';
  const bannerGoodLabelClass = 'font-medium text-green-900';
  const bannerGoodValueClass = 'tabular-nums font-bold text-green-900';

  /** Issue (yellow/red) chips left, good (green) chips right — stable order within each group */
  type PortfolioBannerMetricKey = 'health' | 'billable' | 'backlog' | 'overBudget' | 'onHold';
  const baseBannerMetricOrder: PortfolioBannerMetricKey[] = ['health', 'billable', 'backlog', 'overBudget', 'onHold'];
  const bannerMetricIsBad = (k: PortfolioBannerMetricKey) =>
    k === 'health'
      ? indicatorBadHealth
      : k === 'billable'
        ? indicatorBadBillable
        : k === 'backlog'
          ? indicatorBadBacklog
          : k === 'overBudget'
            ? indicatorBadOverBudget
            : indicatorBadOnHold;
  const portfolioBannerMetricOrder: PortfolioBannerMetricKey[] = [
    ...baseBannerMetricOrder.filter((k) => bannerMetricIsBad(k)),
    ...baseBannerMetricOrder.filter((k) => !bannerMetricIsBad(k)),
  ];

  /** Synthetic weekly backlog % series ending at current open/tentative % — TODO: replace with API weekly history */
  const backlogPctTrendSeries = useMemo(() => {
    const cur = openTentativePct;
    const n = TREND_PANEL_WEEKS;
    return Array.from({ length: n }, (_, i) => {
      if (i === n - 1) return cur;
      const dist = n - 1 - i;
      const v = cur + dist * 1.15 - Math.sin(i * 0.9) * 2.4;
      return Math.max(0, Math.min(100, v));
    });
  }, [openTentativePct]);

  const billablePctTrendSeries = useMemo(() => {
    const weeks = billableAttainment?.weeks ?? [];
    const t = billableTarget;
    if (t <= 0) return Array(TREND_PANEL_WEEKS).fill(0);
    const pct = (total: number) => Math.min(100, (total / t) * 100);
    const mapped = weeks.map((w) => pct(w.total ?? 0));
    if (mapped.length >= TREND_PANEL_WEEKS) return mapped.slice(-TREND_PANEL_WEEKS);
    const padVal = mapped[0] ?? 0;
    return [...Array(TREND_PANEL_WEEKS - mapped.length).fill(padVal), ...mapped].slice(-TREND_PANEL_WEEKS) as number[];
  }, [billableAttainment?.weeks, billableTarget]);

  /** Synthetic health trajectory ending at current portfolio average — TODO: wire weekly health history */
  const portfolioHealthTrendSeries = useMemo(() => {
    const cur = portfolioHealthScore;
    const n = TREND_PANEL_WEEKS;
    return Array.from({ length: n }, (_, i) => {
      if (i === n - 1) return cur;
      const dist = n - 1 - i;
      const v = cur + dist * 1.8 - Math.cos(i * 0.75) * 2.5;
      return Math.max(0, Math.min(100, Math.round(v)));
    });
  }, [portfolioHealthScore]);

  /** Demand − capacity (hrs): sum of forecast engineer hours minus 160 hrs/week */
  const capacityDemandGapSeries = useMemo(() => {
    const rows = (backlogForecast ?? []).slice(-TREND_PANEL_WEEKS);
    return rows.map((row) => {
      const sum = BACKLOG_FORECAST_ENGINEERS.reduce(
        (s, k) => s + ((row as Record<string, number>)[k] ?? 0),
        0
      );
      return sum - WEEKLY_CAPACITY_HOURS;
    });
  }, [backlogForecast]);

  const backlogTrendStats = useMemo(() => trendStatsFromSeries(backlogPctTrendSeries), [backlogPctTrendSeries]);
  const billableTrendStats = useMemo(() => trendStatsFromSeries(billablePctTrendSeries), [billablePctTrendSeries]);
  const healthTrendStats = useMemo(() => trendStatsFromSeries(portfolioHealthTrendSeries), [portfolioHealthTrendSeries]);
  const gapTrendStats = useMemo(() => trendStatsFromSeries(capacityDemandGapSeries), [capacityDemandGapSeries]);

  /** Navigate to Backlog Status tab (detailed backlog view). */
  const goToBacklogDetail = useCallback(() => {
    setActiveSection('backlogStatus');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /** Scroll to Engineering Capacity (engineer allocation) on Metrics tab. */
  const goToEngineerAllocation = useCallback(() => {
    const scroll = () => document.getElementById('engineering-capacity-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (activeSection !== 'pmoMetrics' && activeSection !== 'leadership') {
      setActiveSection('pmoMetrics');
      setTimeout(scroll, 90);
    } else scroll();
  }, [activeSection]);

  /** Open Project Review tab (full project table). */
  const goToProjectTable = useCallback(() => {
    setActiveSection('projectReview');
    setProjectReviewFilter('');
    setProjectReviewStatusFilter('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /** Open Budget Review (financial variance / over-budget projects). */
  const goToBudgetReview = useCallback(() => {
    setActiveSection('budget');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /** Open Billing Milestones tab. */
  const goToBillingMilestonesTab = useCallback(() => {
    setActiveSection('milestones');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /** Scroll to Client Portfolio (revenue breakdown by customer). */
  const goToRevenueBreakdown = useCallback(() => {
    const scroll = () => document.getElementById('client-portfolio-financials')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (activeSection !== 'pmoMetrics' && activeSection !== 'leadership') {
      setActiveSection('pmoMetrics');
      setTimeout(scroll, 90);
    } else scroll();
  }, [activeSection]);

  /** Scroll to Project Health metrics table on Metrics tab. */
  const goToProjectHealthMetrics = useCallback(() => {
    const scroll = () => document.getElementById('project-health-metrics')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (activeSection !== 'pmoMetrics' && activeSection !== 'leadership') {
      setActiveSection('pmoMetrics');
      setTimeout(scroll, 90);
    } else scroll();
  }, [activeSection]);

  /** Expand and scroll to Billable Attainment section. */
  const goToBillableAttainmentSection = useCallback(() => {
    setBillableAttainmentExpanded(true);
    const scroll = () => document.getElementById('billable-attainment-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (activeSection !== 'pmoMetrics' && activeSection !== 'leadership') {
      setActiveSection('pmoMetrics');
      setTimeout(scroll, 90);
    } else setTimeout(scroll, 0);
  }, [activeSection]);

  const sections = [
    { id: 'projectReview', label: 'Project Review', icon: ClipboardList },
    { id: 'budget', label: 'Budget Review', icon: TrendingUp },
    { id: 'milestones', label: 'Billing Milestones', icon: Flag },
    { id: 'backlogStatus', label: 'Backlog Status', icon: BarChart3 },
    { id: 'cutovers', label: 'Upcoming Cutovers', icon: Calendar },
    { id: 'subcontractors', label: 'Subcontractors', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'pmoMetrics', label: 'Metrics', icon: Activity },
    { id: 'leadership', label: 'Leadership', icon: LayoutDashboard },
  ];

  const projectReviewColumns = [
    { key: 'customerProject', label: 'Customer - Project', align: 'text-left' as const },
    { key: 'projectManager', label: 'Project Manager', align: 'text-left' as const },
    { key: 'estimateToComplete', label: 'Actions', align: 'text-center' as const },
    { key: 'progress', label: 'Progress', align: 'text-center' as const },
    { key: 'nextActions', label: 'Next Actions', align: 'text-left' as const },
    { key: 'etc', label: 'ETC', align: 'text-center' as const },
    { key: 'projectStatus', label: 'Status', align: 'text-left' as const },
  ];

  /** PMO Metrics + Leadership tab share the same widgets; Leadership reorders into executive sections. */
  const renderMetricsDashboard = (): React.ReactNode => {
    const portfolioBannerEl = (
          <div
            className="bg-gradient-to-r from-slate-50 to-blue-50 border border-gray-200 rounded-lg shadow-sm px-6 py-4"
            role="region"
            aria-label="Portfolio status summary"
          >
            <h2 className="text-xs font-bold uppercase tracking-wide text-black mb-2 text-center">Portfolio Status</h2>
            <p className="text-sm font-normal text-gray-700 mb-3 text-center">
              <span className="text-gray-700">Active projects: </span>
              <span className="tabular-nums text-gray-900">{smartAlerts.activeProjects}</span>
            </p>
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 text-sm text-gray-800">
              <span className="inline-flex items-center gap-2">
                <span className="text-gray-600">Portfolio Status:</span>
                <span className="text-xl leading-none" title={portfolioStatusBannerLabel} aria-hidden>
                  {portfolioStatusBannerEmoji}
                </span>
                <span className="sr-only">{portfolioStatusBannerLabel}</span>
              </span>
              {portfolioBannerMetricOrder.map((metricKey) => {
                const wrap = (highlight: boolean) =>
                  highlight
                    ? `${bannerIssueHighlightClass} inline-flex flex-wrap items-baseline gap-x-1`
                    : `${bannerGoodHighlightClass} inline-flex flex-wrap items-baseline gap-x-1`;
                if (metricKey === 'health') {
                  return (
                    <button
                      key="health"
                      type="button"
                      className={`${wrap(highlightBannerHealth)} cursor-pointer text-left font-inherit border-0 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md`}
                      onClick={() =>
                        document.getElementById('project-health-metrics')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }
                      title="Optimum Project Performance > 70%"
                      aria-label="Portfolio Health Score. Optimum project performance over 70%. Go to Project Health section"
                    >
                      <span className={highlightBannerHealth ? `font-medium ${bannerIssueTextClass}` : bannerGoodLabelClass}>
                        Portfolio Health Score:
                      </span>{' '}
                      <strong
                        className={
                          highlightBannerHealth
                            ? `tabular-nums font-bold ${bannerIssueTextClass}`
                            : bannerGoodValueClass
                        }
                      >
                        {portfolioHealthScore}
                      </strong>
                    </button>
                  );
                }
                if (metricKey === 'billable') {
                  return (
                    <button
                      key="billable"
                      type="button"
                      className={`${wrap(highlightBannerBillable)} cursor-pointer text-left font-inherit border-0 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md`}
                      onClick={() => {
                        setBillableAttainmentExpanded(true);
                        requestAnimationFrame(() => {
                          requestAnimationFrame(() => {
                            document.getElementById('billable-attainment-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          });
                        });
                      }}
                      title={
                        billableTarget > 0
                          ? `Last week: ${lastWeekTotal} billable hrs / ${billableTarget} target hrs\nClick to open Billable Attainment.`
                          : `Last week: ${lastWeekTotal} billable hrs\nClick to open Billable Attainment.`
                      }
                      aria-label={`Attainment Last Week. Last week ${lastWeekTotal} billable hours${billableTarget > 0 ? ` of ${billableTarget} target` : ''}. Open section expanded.`}
                    >
                      <span className={highlightBannerBillable ? `font-medium ${bannerIssueTextClass}` : bannerGoodLabelClass}>
                        Attainment Last Week:
                      </span>{' '}
                      <strong
                        className={
                          highlightBannerBillable
                            ? `tabular-nums font-bold ${bannerIssueTextClass}`
                            : bannerGoodValueClass
                        }
                      >
                        {billableTarget > 0 ? `${((lastWeekTotal / billableTarget) * 100).toFixed(1)}%` : '—'}
                      </strong>
                    </button>
                  );
                }
                if (metricKey === 'overBudget') {
                  return (
                    <button
                      key="overBudget"
                      type="button"
                      className={`${wrap(highlightBannerOverBudget)} cursor-pointer text-left font-inherit border-0 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md`}
                      onClick={() => {
                        setActiveSection('budget');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      title={
                        smartAlerts.projectsOverBudgetList.length > 0
                          ? `Projects over budget (${smartAlerts.projectsOverBudget})\n${smartAlerts.projectsOverBudgetList
                              .map((p) => `${p.customerName} – ${p.projectName} – ${p.projectManager ?? '—'}`)
                              .join('\n')}`
                          : 'Open Budget Review'
                      }
                      aria-label={
                        smartAlerts.projectsOverBudgetList.length > 0
                          ? `Projects over budget: ${smartAlerts.projectsOverBudget}. ${smartAlerts.projectsOverBudgetList.map((p) => `${p.customerName}, ${p.projectName}, ${p.projectManager ?? '—'}`).join('. ')}. Open Budget Review.`
                          : 'Open Budget Review tab'
                      }
                    >
                      <span className={highlightBannerOverBudget ? `font-medium ${bannerIssueTextClass}` : bannerGoodLabelClass}>
                        Projects Over Budget:
                      </span>{' '}
                      <strong
                        className={
                          highlightBannerOverBudget
                            ? `tabular-nums font-bold ${bannerIssueTextClass}`
                            : bannerGoodValueClass
                        }
                      >
                        {smartAlerts.projectsOverBudget}
                      </strong>
                    </button>
                  );
                }
                if (metricKey === 'onHold') {
                  return (
                    <button
                      key="onHold"
                      type="button"
                      className={`${wrap(highlightBannerOnHold)} cursor-pointer text-left font-inherit border-0 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md`}
                      onClick={() => {
                        setActiveSection('projectReview');
                        setProjectReviewStatusFilter('On Hold');
                        setProjectReviewFilter('');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      title={
                        smartAlerts.projectsOnHoldList?.length
                          ? `Projects on hold (${smartAlerts.projectsOnHold})\n${smartAlerts.projectsOnHoldList
                              .map((p) => `${p.customerName} – ${p.projectName} – ${p.projectManager}`)
                              .join('\n')}`
                          : 'No projects on hold'
                      }
                      aria-label={
                        smartAlerts.projectsOnHoldList?.length
                          ? `Projects on hold: ${smartAlerts.projectsOnHold}. ${smartAlerts.projectsOnHoldList.map((p) => `${p.customerName}, ${p.projectName}, ${p.projectManager}`).join('. ')}. Open Project Review filtered by On Hold.`
                          : 'No projects on hold. Open Project Review filtered by On Hold.'
                      }
                    >
                      <span className={highlightBannerOnHold ? `font-medium ${bannerIssueTextClass}` : bannerGoodLabelClass}>
                        Projects on Hold:
                      </span>{' '}
                      <strong
                        className={
                          highlightBannerOnHold
                            ? `tabular-nums font-bold ${bannerIssueTextClass}`
                            : bannerGoodValueClass
                        }
                      >
                        {smartAlerts.projectsOnHold}
                      </strong>
                    </button>
                  );
                }
                return (
                  <button
                    key="backlog"
                    type="button"
                    className={`${
                      highlightBannerBacklog ? bannerBacklogIssueHighlightClass : bannerGoodHighlightClass
                    } inline-flex flex-wrap items-baseline gap-x-1 cursor-pointer text-left font-inherit border-0 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md`}
                    onClick={() => setPortfolioBacklogPopupOpen(true)}
                    title="View Open/Unconfirmed Hours and Backlog Hours"
                    aria-label="View Open/Unconfirmed Hours and Backlog Hours"
                  >
                    <span className={highlightBannerBacklog ? `font-medium ${bannerBacklogIssueTextClass}` : bannerGoodLabelClass}>
                      Backlog Status:
                    </span>{' '}
                    <strong
                      className={
                        highlightBannerBacklog
                          ? `tabular-nums font-bold ${bannerBacklogIssueTextClass}`
                          : bannerGoodValueClass
                      }
                    >
                      {schedulingKPI.openTentative.percentage}
                    </strong>
                  </button>
                );
              })}
            </div>
          </div>
    );

    const trendPanelGridInner = (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <button
                type="button"
                onClick={goToBacklogDetail}
                className="rounded-lg border border-gray-200 p-4 flex flex-col gap-2 text-left w-full hover:border-blue-300 hover:bg-blue-50/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                title="Open detailed backlog view"
                aria-label="Open detailed backlog view"
              >
                <div className="text-xs font-semibold text-gray-600">Backlog % trend</div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-2xl font-bold tabular-nums text-gray-900" title="Current week backlog %">
                      {backlogTrendStats.current.toFixed(1)}%
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-700" title="Direction vs prior week">
                      <span className="text-lg leading-none" aria-hidden>
                        {backlogTrendStats.arrow}
                      </span>
                      <span className="tabular-nums">
                        {backlogTrendStats.delta >= 0 ? '+' : ''}
                        {backlogTrendStats.delta.toFixed(1)} pp vs last week
                      </span>
                    </div>
                  </div>
                  <BacklogTrendSparkline
                    values={backlogPctTrendSeries}
                    aria-label={`Backlog percent over ${TREND_PANEL_WEEKS} weeks, current ${backlogTrendStats.current.toFixed(1)} percent`}
                  />
                </div>
              </button>
              <button
                type="button"
                onClick={goToProjectHealthMetrics}
                className="rounded-lg border border-gray-200 p-4 flex flex-col gap-2 text-left w-full hover:border-blue-300 hover:bg-blue-50/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                title="Open project health metrics"
                aria-label="Open project health metrics"
              >
                <div className="text-xs font-semibold text-gray-600">Portfolio health score trend</div>
                <div className="text-2xl font-bold tabular-nums text-gray-900" title="Current portfolio health score">
                  {healthTrendStats.current}
                </div>
                <div className="mt-auto flex items-center gap-2 text-sm text-gray-700" title="Direction vs prior week">
                  <span className="text-lg leading-none" aria-hidden>
                    {healthTrendStats.arrow}
                  </span>
                  <span className="tabular-nums">
                    {healthTrendStats.delta >= 0 ? '+' : ''}
                    {healthTrendStats.delta.toFixed(0)} pts vs last week
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={goToBillableAttainmentSection}
                className="rounded-lg border border-gray-200 p-4 flex flex-col gap-2 text-left w-full hover:border-blue-300 hover:bg-blue-50/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                title="Open billable attainment detail"
                aria-label="Open billable attainment detail"
              >
                <div className="text-xs font-semibold text-gray-600">Billable attainment % trend</div>
                <div className="text-2xl font-bold tabular-nums text-gray-900" title="Current week attainment %">
                  {billableTrendStats.current.toFixed(1)}%
                </div>
                <div className="mt-auto flex items-center gap-2 text-sm text-gray-700" title="Direction vs prior week">
                  <span className="text-lg leading-none" aria-hidden>
                    {billableTrendStats.arrow}
                  </span>
                  <span className="tabular-nums">
                    {billableTrendStats.delta >= 0 ? '+' : ''}
                    {billableTrendStats.delta.toFixed(1)} pp vs last week
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={goToEngineerAllocation}
                className="rounded-lg border border-gray-200 p-4 flex flex-col gap-2 text-left w-full hover:border-blue-300 hover:bg-blue-50/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                title="Open engineer allocation view"
                aria-label="Open engineer allocation view"
              >
                <div className="text-xs font-semibold text-gray-600">Capacity vs demand gap trend</div>
                <div className="text-2xl font-bold tabular-nums text-gray-900" title="Current week gap (demand − capacity hours)">
                  {gapTrendStats.current >= 0 ? '+' : ''}
                  {gapTrendStats.current.toFixed(0)} hrs
                </div>
                <div className="mt-auto flex items-center gap-2 text-sm text-gray-700" title="Direction vs prior week">
                  <span className="text-lg leading-none" aria-hidden>
                    {gapTrendStats.arrow}
                  </span>
                  <span className="tabular-nums">
                    {gapTrendStats.delta >= 0 ? '+' : ''}
                    {gapTrendStats.delta.toFixed(0)} hrs vs last week
                  </span>
                </div>
              </button>
            </div>
    );

    const trendCardEl = (
      <div
        className="bg-white rounded-lg border border-gray-200 shadow-sm px-4 py-4 sm:px-6"
        role="region"
        aria-label={`Trend panels: last ${TREND_PANEL_WEEKS} weeks`}
      >
        <h3 className="text-xs font-bold uppercase tracking-wide text-gray-800 mb-3 text-center">
          Trend panels (last {TREND_PANEL_WEEKS} weeks)
        </h3>
        {trendPanelGridInner}
      </div>
    );

    const smartAlertsCardEl = (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <button
                type="button"
                onClick={goToProjectHealthMetrics}
                className="rounded-lg border border-gray-200 p-4 text-left w-full hover:border-blue-300 hover:bg-blue-50/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                title="Open project health metrics"
                aria-label="Open project health metrics"
              >
                <div className="text-2xl text-gray-800">{portfolioHealthScore}</div>
                <div className="text-sm font-bold text-gray-600 mt-0.5">Portfolio Health</div>
                <div className="mt-2 text-xs text-gray-600">
                  Project health score average
                </div>
              </button>
              <button
                type="button"
                onClick={goToProjectTable}
                className="rounded-lg border border-gray-200 p-4 text-left w-full hover:border-blue-300 hover:bg-blue-50/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                title="Open full project table"
                aria-label="Open full project table in Project Review"
              >
                <div className="text-2xl text-gray-800">{smartAlerts.activeProjects}</div>
                <div className="text-sm font-bold text-gray-600 mt-0.5">Active Projects</div>
                <div
                  className="mt-2 text-xs text-gray-600 cursor-default pointer-events-none"
                  title={smartAlerts.projectsOnHoldList?.length ? smartAlerts.projectsOnHoldList.map((p) => `${p.customerName} – ${p.projectName} – ${p.projectManager}`).join('\n') : ''}
                >
                  {smartAlerts.projectsOnHold} project{smartAlerts.projectsOnHold !== 1 ? 's' : ''} on hold
                </div>
              </button>
              <button
                type="button"
                onClick={goToBudgetReview}
                className="rounded-lg border border-gray-200 p-4 text-left w-full hover:border-blue-300 hover:bg-blue-50/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                title="Open budget review (project exceptions)"
                aria-label="Open budget review for projects over budget"
              >
                <div className="text-2xl text-black">{smartAlerts.projectsOverBudget}</div>
                <div className="text-sm font-bold text-black mt-0.5">Projects over budget</div>
                {smartAlerts.projectsOverBudgetList.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    {smartAlerts.projectsOverBudgetList.map((p, i) => (
                      <div key={i} className="text-xs text-black font-normal cursor-default pointer-events-none" title={`Project Manager: ${p.projectManager ?? '—'}`}>
                        {p.projectName} — {typeof p.progress === 'number' ? `${p.progress}%` : p.progress}
                      </div>
                    ))}
                  </div>
                )}
              </button>
              <button
                type="button"
                onClick={goToBacklogDetail}
                className={`rounded-lg border p-4 text-left w-full hover:border-blue-300 hover:bg-blue-50/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${isBacklogAlert ? 'border-red-200 bg-red-50/50' : 'border-green-200 bg-green-50/50'}`}
                title="Open detailed backlog view"
                aria-label="Open detailed backlog view"
              >
                <div className={`text-2xl font-bold ${isBacklogAlert ? 'text-red-700' : 'text-green-700'}`}>
                  {schedulingKPI.openTentative.percentage}
                </div>
                <div className="text-sm font-bold text-gray-600 mt-0.5">Backlog Status</div>
                <div className="mt-2 space-y-1 text-xs text-gray-600">
                  <div className="font-bold">{schedulingKPI.openTentative.total} Open or unconfirmed hours</div>
                  <div>Professional Services: {backlogHours?.professionalServices ?? 0} hrs</div>
                  <div>Staff Aug: {backlogHours?.staffAug ?? 0} hrs</div>
                </div>
              </button>
              <button
                type="button"
                onClick={goToBillableAttainmentSection}
                className={`rounded-lg border p-4 text-left w-full hover:border-blue-300 hover:bg-blue-50/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${isBillableAttainmentAlert ? 'border-red-200 bg-red-50/50' : 'border-green-200 bg-green-50/50'}`}
                title="Open billable attainment detail"
                aria-label="Open billable attainment detail"
              >
                <div className={`text-2xl font-bold ${isBillableAttainmentAlert ? 'text-red-700' : 'text-green-700'}`}>
                  {billableTarget > 0 ? `${((lastWeekTotal / billableTarget) * 100).toFixed(1)}%` : '—'}
                </div>
                <div className="text-sm font-bold text-gray-600 mt-0.5">Billable Attainment</div>
                <div className="mt-2 text-xs text-gray-600">
                  ({lastWeekTotal}/{billableTarget})
                </div>
                <div className="text-xs text-gray-600">
                  Total billable hours/target (last week)
                </div>
              </button>
            </div>
          </div>
    );

    const billableSectionEl = (
          billableAttainment?.weeks?.length ? (
            <div
              id="billable-attainment-section"
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden scroll-mt-6"
            >
              <div
                className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100/80"
                onClick={() => setBillableAttainmentExpanded((p) => !p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setBillableAttainmentExpanded((p) => !p)}
                aria-expanded={billableAttainmentExpanded}
              >
                <div>
                  <h3 className="font-semibold text-gray-800">Billable Attainment</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Weekly total: green ≥ target, red &lt; target</p>
                </div>
                <button type="button" className="p-1 rounded hover:bg-gray-200" aria-label={billableAttainmentExpanded ? 'Collapse' : 'Expand'}>
                  {billableAttainmentExpanded ? <ChevronUp className="h-5 w-5 text-gray-600" /> : <ChevronDown className="h-5 w-5 text-gray-600" />}
                </button>
              </div>
              {billableAttainmentExpanded && (
              <div className="p-6 overflow-x-auto">
                <table className="min-w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 font-medium text-gray-600 w-40">Metric</th>
                      {billableAttainment.weeks.map((w, wi) => (
                        <th key={wi} className="text-center py-3 px-2 font-medium text-gray-600 min-w-[100px]">{w.period}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-medium text-gray-800">Attainment Target</td>
                      {billableAttainment.weeks.map((_, mi) => (
                        <td key={mi} className="text-center py-3 px-2">{billableAttainment.minimumAttainmentMetric}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-200 font-medium">
                      <td className="py-3 px-4 text-gray-800">Weekly Total</td>
                      {billableAttainment.weeks.map((w, wi) => {
                        const met = (w.total ?? 0) >= (billableAttainment.minimumAttainmentMetric ?? 0);
                        return (
                          <td key={wi} className={`text-center py-3 px-2 font-semibold ${met ? 'bg-green-200/80' : 'bg-red-200/80'}`}>
                            {w.total ?? 0}
                          </td>
                        );
                      })}
                    </tr>
                    {['Dominic', 'Craig', 'Freddy', 'Trevor', 'Natalie', 'Rebekah'].map((name) => (
                      <tr key={name} className="border-b border-gray-200 last:border-0">
                        <td className="py-3 px-4 font-medium text-gray-800">{name}</td>
                        {billableAttainment.weeks.map((w, wi) => (
                          <td key={wi} className="text-center py-3 px-2">{(w as Record<string, number>)[name] ?? 0}</td>
                        ))}
                      </tr>
                    ))}
                    <tr className="border-t-2 border-gray-300 text-gray-500">
                      <td className="py-2 px-4 text-xs">Timesheet Period</td>
                      {billableAttainment.weeks.map((w, wi) => (
                        <td key={wi} className="text-center py-2 px-2 text-xs">{w.period}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              )}
            </div>
          ) : null
    );

    const capacityDemandGridEl = (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              id="engineering-capacity-section"
              role="button"
              tabIndex={0}
              onClick={goToEngineerAllocation}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goToEngineerAllocation();
                }
              }}
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden text-left w-full hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
              title="Engineer allocation by week — click to focus this view"
              aria-label="Open engineer allocation view: Engineering Capacity"
            >
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Engineering Capacity</h3>
                <p className="text-xs text-gray-500 mt-0.5">Hours per week: green &lt;35, yellow 35–39, red ≥40</p>
              </div>
              <div className="p-6 overflow-x-auto">
                <table className="min-w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 font-medium text-gray-600 w-24">Engineer</th>
                      {(backlogForecast ?? []).map((w, wi) => (
                        <th key={wi} className="text-center py-3 px-2 font-medium text-gray-600">{w.week?.split('–')[0]?.trim() ?? `W${wi + 1}`}</th>
                      ))}
                      <th className="text-right py-3 px-4 font-medium text-gray-600 w-12">Avg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Dominic Zeni', 'Trevor Butler', 'Freddy Tabet', 'Craig Grant'].map((eng) => {
                      const weekData = (backlogForecast ?? []).map((w) => (w as Record<string, number>)[eng] ?? 0);
                      const avg = weekData.length ? Math.round(weekData.reduce((a, b) => a + b, 0) / weekData.length) : 0;
                      const firstName = eng.split(' ')[0];
                      return (
                        <tr key={eng} className="border-b border-gray-200 last:border-0">
                          <td className="py-3 px-4 font-medium text-gray-800">{firstName}</td>
                          {weekData.map((hrs, wi) => {
                            const dotColor = hrs < 35 ? 'bg-green-400' : hrs < 40 ? 'bg-amber-400' : 'bg-red-400';
                            return (
                              <td key={wi} className="py-3 px-2 text-center">
                                <div className="flex justify-center" title={`${hrs} hrs`}>
                                  <span className={`inline-block w-4 h-4 rounded-full ${dotColor}`} />
                                </div>
                              </td>
                            );
                          })}
                          <td className="py-3 px-4 text-right font-medium text-gray-800">{avg}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Backlog Forecast — detailed backlog (clickable) */}
            <div
              id="backlog-forecast-section"
              role="button"
              tabIndex={0}
              onClick={goToBacklogDetail}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goToBacklogDetail();
                }
              }}
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              title="Open detailed backlog view"
              aria-label="Open detailed backlog view"
            >
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Backlog Forecast</h3>
                <p className="text-xs text-gray-500 mt-0.5">Combined engineer hours per week (stacked, 160 hrs = 4 × 40)</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {((backlogForecast ?? []).slice(0, 4)).map((row, wi) => {
                    const engineers = ['Dominic Zeni', 'Trevor Butler', 'Freddy Tabet', 'Craig Grant'];
                    const colors = ['bg-blue-400', 'bg-violet-400', 'bg-slate-400', 'bg-green-400'];
                    const hrsByEng = engineers.map((eng) => (row as Record<string, number>)[eng] ?? 0);
                    const total = hrsByEng.reduce((a, b) => a + b, 0);
                    const maxTotal = 160; // 4 engineers × 40 hrs
                    return (
                      <div key={wi}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium text-gray-800">{row.week}</span>
                          <span className="text-gray-600">{total} / 160 hrs</span>
                        </div>
                        <div className="h-6 bg-gray-100 rounded overflow-hidden flex w-full">
                          {hrsByEng.map((hrs, ei) => {
                            const pctOf160 = (hrs / maxTotal) * 100;
                            return (
                              <div
                                key={ei}
                                className={`${colors[ei]} transition-all`}
                                style={{ width: `${pctOf160}%` }}
                                title={`${engineers[ei]}: ${hrs} hrs`}
                              />
                            );
                          })}
                        </div>
                        <div className="flex gap-4 mt-1 text-xs text-gray-500">
                          {engineers.map((eng, ei) => (
                            <span key={eng}>
                              <span className={`inline-block w-2 h-2 rounded-sm ${colors[ei]} align-middle mr-1`} />
                              {eng.split(' ')[0]}: {(row as Record<string, number>)[eng] ?? 0}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
    );

    const billingMilestonesCardEl = (
      <div
        id="billing-milestones-metrics"
        className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:border-gray-300 transition-colors"
      >
        <div
          className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-start justify-between gap-4 cursor-pointer hover:bg-gray-100/80 select-none"
          onClick={() => setMetricsBillingMilestonesExpanded((p) => !p)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setMetricsBillingMilestonesExpanded((p) => !p);
            }
          }}
          aria-expanded={metricsBillingMilestonesExpanded}
          aria-controls="billing-milestones-metrics-body"
        >
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-800">Billing Milestones (Next 30 days)</h3>
            <p className="text-xs text-gray-500 mt-0.5">Upcoming Billing Milestones and Estimated Date</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {activeSection !== 'leadership' && (
              <button
                type="button"
                className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline px-2 py-1 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  goToBillingMilestonesTab();
                }}
                aria-label="Open Billing Milestones tab"
              >
                Open tab
              </button>
            )}
            {metricsBillingMilestonesExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-600" aria-hidden />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-600" aria-hidden />
            )}
          </div>
        </div>
        {metricsBillingMilestonesExpanded ? (
          <div id="billing-milestones-metrics-body" className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Project</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Project Manager</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Est. Date</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">Amount</th>
                </tr>
              </thead>
              <tbody>
                {unbilledMilestonesForMetrics.map((m, i) => {
                  const [customer, project] = ((m as { customerProject?: string }).customerProject ?? '—').split(/\s*–\s*/);
                  const amount = (m as { amount?: number }).amount ?? 0;
                  const amountFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
                  const estimatedDate = (m as { estimatedDate?: string }).estimatedDate ?? '—';
                  return (
                    <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-800">{customer ?? '—'}</td>
                      <td className="px-4 py-3 text-gray-800">{project ?? '—'}</td>
                      <td className="px-4 py-3 text-gray-700">{(m as { projectManager?: string }).projectManager ?? '—'}</td>
                      <td className="px-4 py-3 text-gray-700">{estimatedDate}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-800">{amountFormatted}</td>
                    </tr>
                  );
                })}
                {unbilledMilestonesForMetrics.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500 text-sm">No upcoming billing milestones</td>
                  </tr>
                )}
              </tbody>
              {unbilledMilestonesForMetrics.length > 0 && (
                <tfoot>
                  <tr className="border-t-2 border-gray-200 bg-gray-50">
                    <td colSpan={4} className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Total</td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-gray-800">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(billingMilestonesTotalAmount)}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        ) : null}
      </div>
    );

    const clientPortfolioCardEl = (
      <div
        id="client-portfolio-financials"
        className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:border-gray-300 transition-colors"
      >
        <div
          className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-start justify-between gap-4 cursor-pointer hover:bg-gray-100/80 select-none"
          onClick={() => setMetricsClientPortfolioExpanded((p) => !p)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setMetricsClientPortfolioExpanded((p) => !p);
            }
          }}
          aria-expanded={metricsClientPortfolioExpanded}
          aria-controls="client-portfolio-financials-body"
        >
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-800">Client Portfolio</h3>
            <p className="text-xs text-gray-500 mt-0.5">Top 5 customers by active projects</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {activeSection !== 'leadership' && (
              <button
                type="button"
                className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline px-2 py-1 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  goToRevenueBreakdown();
                }}
                aria-label="Scroll to Client Portfolio section"
              >
                Open tab
              </button>
            )}
            {metricsClientPortfolioExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-600" aria-hidden />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-600" aria-hidden />
            )}
          </div>
        </div>
        {metricsClientPortfolioExpanded ? (
          <div id="client-portfolio-financials-body" className="p-6">
            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2 px-0">
              <span>Customer</span>
              <span className="flex gap-4 sm:gap-6 items-baseline justify-end">
                <span className="w-16 sm:w-[4.5rem] text-right shrink-0">Projects</span>
                <span className="w-[4.5rem] sm:w-24 text-right shrink-0">Revenue</span>
                <span className="w-[4.5rem] sm:w-20 text-right shrink-0 leading-tight">% of Revenue</span>
              </span>
            </div>
            <div className="space-y-4">
              {clientPortfolioTop5.map(({ customer, projectCount, revenue }, i) => {
                const max = Math.max(1, ...clientPortfolioTop5.map((c) => c.projectCount));
                const pct = (projectCount / max) * 100;
                const colors = ['bg-blue-400', 'bg-slate-400', 'bg-violet-400', 'bg-gray-400', 'bg-gray-300'];
                const projects = projectsByCustomer[customer] ?? [];
                const isHovered = clientPortfolioHover === customer;
                const revenueFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(revenue);
                const pctOfRevenue =
                  clientPortfolioTop5RevenueTotal > 0 ? (revenue / clientPortfolioTop5RevenueTotal) * 100 : 0;
                return (
                  <div
                    key={customer}
                    className="relative"
                    onMouseEnter={() => setClientPortfolioHover(customer)}
                    onMouseLeave={() => setClientPortfolioHover(null)}
                  >
                    <div className="flex justify-between items-baseline text-sm mb-1 gap-2">
                      <span className="font-medium text-gray-800 min-w-0 truncate">{customer}</span>
                      <span className="flex gap-4 sm:gap-6 shrink-0 justify-end">
                        <span className="text-gray-600 w-16 sm:w-[4.5rem] text-right tabular-nums">
                          {projectCount} project{projectCount !== 1 ? 's' : ''}
                        </span>
                        <span className="text-gray-700 font-medium w-[4.5rem] sm:w-24 text-right tabular-nums">{revenueFormatted}</span>
                        <span className="text-gray-700 font-medium w-[4.5rem] sm:w-20 text-right tabular-nums">
                          {clientPortfolioTop5RevenueTotal > 0 ? `${pctOfRevenue.toFixed(1)}%` : '—'}
                        </span>
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${colors[i]} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                    {isHovered && projects.length > 0 && (
                      <div className="absolute left-0 bottom-full mb-1 z-20 min-w-[220px] bg-white border border-gray-200 rounded-lg shadow-lg py-2 px-3">
                        <div className="text-xs font-semibold text-gray-700 mb-2">Active projects</div>
                        <ul className="text-xs text-gray-600 space-y-1 max-h-48 overflow-y-auto">
                          {projects.map((proj, j) => (
                            <li key={j} className="py-0.5">• {proj}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );

    const milestonesAndPortfolioRowEl = (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {billingMilestonesCardEl}
        {clientPortfolioCardEl}
      </div>
    );

    const projectHealthBlockEl = (
          <div
            id="project-health-metrics"
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden scroll-mt-6"
          >
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={goToProjectTable}
                className="text-left flex-1 min-w-0 max-w-xl rounded-md border-0 bg-transparent p-0 hover:bg-gray-100/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                title="Open full project table (project exceptions)"
                aria-label="Open full project table in Project Review"
              >
                <h3 className="font-semibold text-gray-800">Project Health</h3>
                <p className="text-xs text-gray-500 mt-0.5">Budget health + risk + open actions → health score (highest first)</p>
              </button>
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter by customer, project, or PM..."
                  value={projectHealthFilter}
                  onChange={(e) => setProjectHealthFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="overflow-x-auto overflow-y-auto max-h-[520px]">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 z-10 bg-white">
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 w-8 bg-white"></th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 bg-white cursor-pointer select-none hover:bg-gray-50" onClick={() => handleProjectHealthSort('customerName')}><span className="inline-flex items-center gap-1">Customer Name{projectHealthSortColumn === 'customerName' && (projectHealthSortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</span></th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 bg-white cursor-pointer select-none hover:bg-gray-50" onClick={() => handleProjectHealthSort('projectName')}><span className="inline-flex items-center gap-1">Project Name{projectHealthSortColumn === 'projectName' && (projectHealthSortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</span></th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 bg-white cursor-pointer select-none hover:bg-gray-50" onClick={() => handleProjectHealthSort('projectManager')}><span className="inline-flex items-center gap-1">Project Manager{projectHealthSortColumn === 'projectManager' && (projectHealthSortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</span></th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 bg-white cursor-pointer select-none hover:bg-gray-50" onClick={() => handleProjectHealthSort('healthScore')}><span className="inline-flex items-center gap-1 justify-center">Health Score{projectHealthSortColumn === 'healthScore' && (projectHealthSortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</span></th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 bg-white cursor-pointer select-none hover:bg-gray-50" onClick={() => handleProjectHealthSort('riskItemsCount')}><span className="inline-flex items-center gap-1 justify-center">Risk{projectHealthSortColumn === 'riskItemsCount' && (projectHealthSortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</span></th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 bg-white cursor-pointer select-none hover:bg-gray-50" onClick={() => handleProjectHealthSort('budgetHours')}><span className="inline-flex items-center gap-1 justify-center">Budget Hours{projectHealthSortColumn === 'budgetHours' && (projectHealthSortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</span></th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 bg-white cursor-pointer select-none hover:bg-gray-50" onClick={() => handleProjectHealthSort('remainingHours')}><span className="inline-flex items-center gap-1 justify-center">Remaining Hours{projectHealthSortColumn === 'remainingHours' && (projectHealthSortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</span></th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 bg-white cursor-pointer select-none hover:bg-gray-50" onClick={() => handleProjectHealthSort('budgetHealth')}><span className="inline-flex items-center gap-1 justify-center">Budget{projectHealthSortColumn === 'budgetHealth' && (projectHealthSortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</span></th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 bg-white cursor-pointer select-none hover:bg-gray-50" onClick={() => handleProjectHealthSort('actionsOpen')}><span className="inline-flex items-center gap-1 justify-center">ETC{projectHealthSortColumn === 'actionsOpen' && (projectHealthSortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}</span></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProjectHealthData.map((row, i) => (
                    <React.Fragment key={i}>
                      <tr
                        className="border-b border-gray-100 hover:bg-gray-50/50 cursor-pointer"
                        onClick={() => setExpandedProjectHealthIndex((prev) => (prev === i ? null : i))}
                      >
                        <td className="py-3 px-2 text-gray-500">
                          {expandedProjectHealthIndex === i ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </td>
                        <td className="py-3 px-6 text-gray-700">{row.customerName}</td>
                        <td className="py-3 px-6 text-gray-800 font-medium">{row.projectName}</td>
                        <td className="py-3 px-6 text-gray-700">{row.projectManager}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-flex items-center justify-center w-10 h-6 rounded text-xs font-semibold ${row.healthScore >= 70 ? 'bg-green-100 text-green-800' : row.healthScore >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                            {row.healthScore}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-gray-600">{row.riskItemsCount ?? 0}</td>
                        <td className="py-3 px-4 text-center text-gray-600">{row.budgetHours ?? 0}</td>
                        <td className="py-3 px-4 text-center text-gray-600">{row.remainingHours ?? 0}</td>
                        <td className={`py-3 px-4 text-center ${row.budgetHealth > 100 ? 'text-red-600 font-medium' : 'text-gray-600'}`}>{row.budgetHealth}%</td>
                        <td className="py-3 px-4 text-center text-gray-600">{row.actionsOpen}</td>
                      </tr>
                      {expandedProjectHealthIndex === i && (
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                          <td colSpan={10} className="py-5 px-8">
                            <div className="bg-white rounded-lg border border-gray-200 p-5 max-w-xl">
                              <div className="text-base font-semibold text-gray-800 mb-4">
                                Health Score = Budget Score − Risk Score − Actions Score
                              </div>
                              <div className="space-y-3 text-sm">
                                <div className="flex gap-3 items-baseline flex-wrap">
                                  <span className="text-gray-500 w-40 shrink-0">Budget score</span>
                                  <span className={`font-semibold ${row.budgetHealth > 100 ? 'text-red-700' : 'text-green-700'}`}>
                                    {Math.round(row.budgetScore ?? 0)}
                                  </span>
                                  <span className="text-gray-500 text-xs min-w-0">
                                    (Actual + Scheduled) / Budget hrs → {row.budgetHealth}% → buckets: 0–80%=100, 85–90%=95,
                                    91–95%=90, 96–100%=85, 101–125%=75
                                  </span>
                                </div>
                                <div className="flex gap-3 items-baseline flex-wrap">
                                  <span className="text-gray-500 w-40 shrink-0">Risk (ETC hrs)</span>
                                  <span className="font-semibold text-amber-800">
                                    {Math.round((row.riskComponent ?? 0) * 10) / 10}
                                  </span>
                                  <span className="text-gray-500 text-xs">Subtracted from budget score</span>
                                </div>
                                <div className="flex gap-3 items-baseline flex-wrap">
                                  <span className="text-gray-500 w-40 shrink-0">Actions (overdue × 4)</span>
                                  <span className="font-semibold text-amber-800">
                                    {Math.round((row.actionsComponent ?? 0) * 10) / 10}
                                  </span>
                                  <span className="text-gray-500 text-xs">
                                    {row.overdueActionsCount ?? 0} overdue × 4
                                  </span>
                                </div>
                              </div>
                              <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap items-baseline gap-2">
                                <span className="text-gray-600">Formula:</span>
                                <span className="font-mono text-gray-800">
                                  {Math.round(row.budgetScore ?? 0)} − {Math.round((row.riskComponent ?? 0) * 10) / 10} −{' '}
                                  {Math.round((row.actionsComponent ?? 0) * 10) / 10} = <strong>{row.healthScore}</strong>
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    );

    const backlogBreakdownEl = (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`rounded-lg border p-4 text-center ${isBacklogAlert ? 'border-red-200 bg-red-50/50' : 'border-green-200 bg-green-50/50'}`}>
            <div className="text-xs font-semibold text-gray-600 uppercase">Open / unconfirmed</div>
            <div className={`text-2xl font-bold mt-1 ${isBacklogAlert ? 'text-red-700' : 'text-green-700'}`}>{schedulingKPI.openTentative.percentage}</div>
            <div className="text-xs text-gray-600 mt-2">{schedulingKPI.openTentative.total} hours</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
            <div className="text-xs font-semibold text-gray-600 uppercase">PS backlog</div>
            <div className="text-2xl font-bold text-gray-900 mt-1 tabular-nums">{backlogHours?.professionalServices ?? 0}</div>
            <div className="text-xs text-gray-500 mt-2">hours</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
            <div className="text-xs font-semibold text-gray-600 uppercase">Staff aug backlog</div>
            <div className="text-2xl font-bold text-gray-900 mt-1 tabular-nums">{backlogHours?.staffAug ?? 0}</div>
            <div className="text-xs text-gray-500 mt-2">hours</div>
          </div>
        </div>
            <div
              id="backlog-forecast-section"
              role="button"
              tabIndex={0}
              onClick={goToBacklogDetail}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goToBacklogDetail();
                }
              }}
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              title="Open detailed backlog view"
              aria-label="Open detailed backlog view"
            >
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Backlog Forecast</h3>
                <p className="text-xs text-gray-500 mt-0.5">Combined engineer hours per week (stacked, 160 hrs = 4 × 40)</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {((backlogForecast ?? []).slice(0, 4)).map((row, wi) => {
                    const engineers = ['Dominic Zeni', 'Trevor Butler', 'Freddy Tabet', 'Craig Grant'];
                    const colors = ['bg-blue-400', 'bg-violet-400', 'bg-slate-400', 'bg-green-400'];
                    const hrsByEng = engineers.map((eng) => (row as Record<string, number>)[eng] ?? 0);
                    const total = hrsByEng.reduce((a, b) => a + b, 0);
                    const maxTotal = 160; // 4 engineers × 40 hrs
                    return (
                      <div key={wi}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium text-gray-800">{row.week}</span>
                          <span className="text-gray-600">{total} / 160 hrs</span>
                        </div>
                        <div className="h-6 bg-gray-100 rounded overflow-hidden flex w-full">
                          {hrsByEng.map((hrs, ei) => {
                            const pctOf160 = (hrs / maxTotal) * 100;
                            return (
                              <div
                                key={ei}
                                className={`${colors[ei]} transition-all`}
                                style={{ width: `${pctOf160}%` }}
                                title={`${engineers[ei]}: ${hrs} hrs`}
                              />
                            );
                          })}
                        </div>
                        <div className="flex gap-4 mt-1 text-xs text-gray-500">
                          {engineers.map((eng, ei) => (
                            <span key={eng}>
                              <span className={`inline-block w-2 h-2 rounded-sm ${colors[ei]} align-middle mr-1`} />
                              {eng.split(' ')[0]}: {(row as Record<string, number>)[eng] ?? 0}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
      </div>
    );

    const customerRiskTableEl = (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Customer</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">Lowest health</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">At-risk projects</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Projects</th>
              </tr>
            </thead>
            <tbody>
              {leadershipCustomerRiskRows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">
                    No customers with project health below 70.
                  </td>
                </tr>
              ) : (
                leadershipCustomerRiskRows.map((row) => (
                  <tr key={row.customer} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">{row.customer}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center justify-center min-w-[2.5rem] rounded px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-900">
                        {row.minHealth}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-gray-700">{row.count}</td>
                    <td className="py-3 px-4 text-gray-600 text-xs">
                      {row.projects.slice(0, 5).join(', ')}
                      {row.projects.length > 5 ? ` + ${row.projects.length - 5} more` : ''}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
    );

    const projectExceptionsTableEl = (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Project</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">PM</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Detail</th>
              </tr>
            </thead>
            <tbody>
              {leadershipProjectExceptionsRows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No budget, hold, or low-health exceptions in the current portfolio snapshot.
                  </td>
                </tr>
              ) : (
                leadershipProjectExceptionsRows.map((row, idx) => (
                  <tr key={`${row.kind}-${row.project}-${idx}`} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">{row.kind}</td>
                    <td className="py-3 px-4 text-gray-800">{row.customer}</td>
                    <td className="py-3 px-4 text-gray-800">{row.project}</td>
                    <td className="py-3 px-4 text-gray-600">{row.pm}</td>
                    <td className="py-3 px-4 text-gray-600 tabular-nums">{row.detail}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
    );

    const financialDeliveryLeadershipEl = (
      <div className="space-y-6">
        {billableSectionEl}
        {billingMilestonesCardEl}
        {clientPortfolioCardEl}
        {projectHealthBlockEl}
      </div>
    );

    if (activeSection === 'leadership') {
      return (
        <LeadershipTabView
          portfolioBannerEl={portfolioBannerEl}
          portfolioBannerRedIndicatorCount={portfolioBannerRedIndicatorCount}
          capacityRiskExpectedWeek={capacityRiskExpectedWeek}
          revenueBilledLast30Days={revenueBilledLast30Days}
          trendPanelGridEl={trendPanelGridInner}
          capacityDemandLeadershipEl={capacityDemandGridEl}
          backlogBreakdownEl={backlogBreakdownEl}
          financialDeliveryEl={financialDeliveryLeadershipEl}
          customerRiskTableEl={customerRiskTableEl}
          projectExceptionsTableEl={projectExceptionsTableEl}
        />
      );
    }

    return (
      <div className="space-y-6">
        {portfolioBannerEl}
        {trendCardEl}
        {smartAlertsCardEl}
        {billableSectionEl}
        {capacityDemandGridEl}
        {milestonesAndPortfolioRowEl}
        {projectHealthBlockEl}
      </div>
    );
  };




  return (
    <div className="max-w-[1400px] mx-auto p-10">
      {/* KPI boxes */}
      <div className="flex flex-nowrap gap-4 mb-8">
        <div className={`${cardClass} p-6 text-left flex-1 min-w-0 basis-0 flex flex-col`}>
          <div className="flex items-center gap-2 text-blue-600 mb-2 h-8 shrink-0"><Users className="h-5 w-5 shrink-0" /><span className="font-semibold text-gray-700">Projects by Project Manager</span></div>
          <div className="mt-2 space-y-1.5 min-h-0">
            {projectsByPMChartData.entries.map(({ name, count }, i) => {
              const barColors = ['bg-slate-500', 'bg-violet-500'];
              const barColor = name === 'Rebekah Mixon' ? 'bg-blue-600' : barColors[i % 2];
              return (
              <button key={name} type="button" onClick={() => { setProjectReviewFilter(name); setProjectReviewSortColumn('projectManager'); setProjectReviewSortDirection('asc'); }} className="w-full flex items-center gap-2 rounded py-0.5 -mx-1 px-1 hover:bg-blue-50 transition-colors text-left cursor-pointer" title={`Filter Project Review by ${name}`}>
                <span className={`text-xs truncate shrink-0 w-20 ${projectReviewFilter === name ? 'font-semibold text-blue-600' : 'text-gray-700'}`} title={name}>{name}</span>
                <div className="flex-1 min-w-0 h-4 bg-gray-100 rounded overflow-hidden">
                  <div className={`h-full ${barColor} rounded transition-all`} style={{ width: `${(count / projectsByPMChartData.max) * 100}%` }} />
                </div>
                <span className="text-xs font-medium text-gray-700 shrink-0 w-5 text-right">{count}</span>
              </button>
              );
            })}
          </div>
        </div>
        <div className={`${cardClass} p-6 text-left flex-1 min-w-0 basis-0 flex flex-col`}>
          <div className="flex items-center gap-2 text-blue-600 mb-2 h-8 shrink-0"><CheckCircle className="h-5 w-5 shrink-0" /><span className="font-semibold text-gray-700">Projects by Engineer</span></div>
          <div className="mt-2 space-y-2 min-h-0">
            {projectsByEngineerChartData.entries.map(({ name, count }, i) => {
              const barColors = ['bg-slate-500', 'bg-violet-500', 'bg-green-600', 'bg-blue-600'];
              const entries = projectsByEngineerChartData.entries;
              const dominicIdx = entries.findIndex((e) => e.name === 'Dominic Zeni');
              const craigIdx = entries.findIndex((e) => e.name === 'Craig Grant');
              const barColor = name === 'Dominic Zeni' && craigIdx >= 0 ? barColors[craigIdx % 4] : name === 'Craig Grant' && dominicIdx >= 0 ? barColors[dominicIdx % 4] : barColors[i % 4];
              return (
                <button key={name} type="button" onClick={() => { setProjectReviewEngineerFilter(name); setProjectReviewFilter(''); setProjectReviewSortColumn('projectManager'); setProjectReviewSortDirection('asc'); }} className="w-full flex items-center gap-2 rounded py-0.5 -mx-1 px-1 hover:bg-blue-50 transition-colors text-left cursor-pointer" title={`Filter Project Review by engineer ${name}`}>
                  <span className={`text-xs truncate shrink-0 min-w-[5.5rem] ${projectReviewEngineerFilter === name ? 'font-semibold text-blue-600' : 'text-gray-700'}`} title={name}>{name}</span>
                  <div className="flex-1 min-w-0 h-5 bg-gray-100 rounded overflow-hidden">
                    <div className={`h-full ${barColor} rounded transition-all`} style={{ width: `${(count / projectsByEngineerChartData.max) * 100}%` }} />
                  </div>
                  <span className="text-xs font-medium text-gray-700 shrink-0 w-5 text-right">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className={`${cardClass} p-6 text-left flex-1 min-w-0 basis-0 flex flex-col`}>
          <div className="flex items-center gap-2 text-blue-600 mb-2 h-8 shrink-0"><BarChart3 className="h-5 w-5 shrink-0" /><span className="font-semibold text-gray-700">Projects by Status</span></div>
          <div className="mt-2 space-y-1.5 min-h-0">
            {projectsByStatusChartData.entries.map(({ name, count }) => (
              <button key={name} type="button" onClick={() => { setProjectReviewStatusFilter(name); setProjectReviewFilter(''); setProjectReviewClosingFilter('all'); setProjectReviewEngineerFilter(''); }} className="w-full flex items-center gap-2 rounded py-0.5 -mx-1 px-1 hover:bg-blue-50 transition-colors text-left cursor-pointer" title={`Filter Project Review by status ${name}`}>
                <span className={`text-xs truncate shrink-0 w-20 ${projectReviewStatusFilter === name ? 'font-semibold text-blue-600' : 'text-gray-700'}`} title={name === 'On Track' ? 'Executing' : name}>{name === 'On Track' ? 'Executing' : name}</span>
                <div className="flex-1 min-w-0 h-4 bg-gray-100 rounded overflow-hidden">
                  <div className={`h-full rounded transition-all ${name === 'Initiating' ? 'bg-blue-600' : name === 'Planning' ? 'bg-violet-500' : name === 'On Track' ? 'bg-green-600' : name === 'On Hold' ? 'bg-amber-500' : 'bg-slate-500'}`} style={{ width: `${(count / projectsByStatusChartData.max) * 100}%` }} />
                </div>
                <span className="text-xs font-medium text-gray-700 shrink-0 w-5 text-right">{count}</span>
              </button>
            ))}
          </div>
        </div>
        <div className={`${cardClass} p-6 text-left flex-1 min-w-0 basis-0 flex flex-col`}>
          <div className="flex items-center gap-2 text-blue-600 mb-2 h-8 shrink-0"><Calendar className="h-5 w-5 shrink-0" /><span className="font-semibold text-gray-700">Projects Closing</span></div>
          <div className="mt-2 space-y-1.5 min-h-0">
            {[
              { key: 'thisWeek' as const, label: 'This week', count: projectsClosing.thisWeek.length },
              { key: 'nextWeek' as const, label: 'Next week', count: projectsClosing.nextWeek.length },
            ].map(({ key, label, count }, i) => {
              const max = Math.max(1, projectsClosing.thisWeek.length, projectsClosing.nextWeek.length);
              const barColors = ['bg-slate-500', 'bg-violet-500'];
              const barColor = key === 'thisWeek' ? 'bg-blue-600' : barColors[i % 2];
              return (
                <button key={key} type="button" onClick={(e) => { e.stopPropagation(); setBudgetClosingFilter(key); setProjectReviewClosingFilter(key); setProjectFilter(''); }} className="w-full flex items-center gap-2 rounded py-0.5 -mx-1 px-1 hover:bg-blue-50 transition-colors text-left cursor-pointer" title={`View Budget Review: projects closing ${label.toLowerCase()}`}>
                  <span className={`text-xs truncate shrink-0 w-20 ${budgetClosingFilter === key ? 'font-semibold text-blue-600' : 'text-gray-700'}`}>{label}</span>
                  <div className="flex-1 min-w-0 h-4 bg-gray-100 rounded overflow-hidden">
                    <div className={`h-full ${barColor} rounded transition-all`} style={{ width: `${(count / max) * 100}%` }} />
                  </div>
                  <span className="text-xs font-medium text-gray-700 shrink-0 w-5 text-right">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
        {sections.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" onClick={() => setActiveSection(id)} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            <Icon className="h-4 w-4" />{label}
            {id === 'projectReview' && (
              <span className={`min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-semibold inline-flex items-center justify-center ${activeSection === id ? 'bg-blue-500/80 text-white' : 'bg-blue-600 text-white'}`}>{filteredProjectReview.length}</span>
            )}
            {id === 'budget' && (
              <span className={`min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-semibold inline-flex items-center justify-center ${activeSection === id ? 'bg-blue-500/80 text-white' : 'bg-blue-600 text-white'}`}>{filteredBudgetItems.length}</span>
            )}
            {id === 'cutovers' && (
              <span className={`min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-semibold inline-flex items-center justify-center ${activeSection === id ? 'bg-blue-500/80 text-white' : 'bg-blue-600 text-white'}`}>{upcomingCutoverReview.length}</span>
            )}
            {id === 'subcontractors' && (
              <span className={`min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-semibold inline-flex items-center justify-center ${activeSection === id ? 'bg-blue-500/80 text-white' : 'bg-blue-600 text-white'}`}>{subcontractorsScheduledThisWeek.length}</span>
            )}
            {id === 'backlogStatus' && (
              <span className={`min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-semibold inline-flex items-center justify-center ${activeSection === id ? (isBacklogAlert ? 'bg-red-500/90 text-white' : 'bg-green-500/90 text-white') : (isBacklogAlert ? 'bg-red-600 text-white' : 'bg-green-600 text-white')}`}>{schedulingKPI.openTentative.percentage}</span>
            )}
            {id === 'milestones' && (
              <span className={`min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-semibold inline-flex items-center justify-center ${activeSection === id ? 'bg-blue-500/80 text-white' : 'bg-blue-600 text-white'}`}>{milestones.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Milestones */}
      {activeSection === 'milestones' && (() => {
        const withStatus = milestones.map((m, i) => ({
          m,
          i,
          effectiveStatus: milestoneBilledOverrides[i] ? 'Billed' : m.status,
        }));
        const filtered = milestoneFilter.trim()
          ? withStatus.filter(({ m }) => {
              const q = milestoneFilter.toLowerCase();
              return m.customerProject.toLowerCase().includes(q) || m.projectManager.toLowerCase().includes(q);
            })
          : withStatus;
        const sorted = [...filtered].sort((a, b) => a.effectiveStatus.localeCompare(b.effectiveStatus));
        return (
          <div className={`${cardClass} mb-6 min-w-0`}>
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="text" placeholder="Filter by..." value={milestoneFilter} onChange={(e) => setMilestoneFilter(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              {milestoneFilter.trim() && (
                <button type="button" onClick={() => setMilestoneFilter('')} className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">Clear filter</button>
              )}
              <span className="text-sm text-gray-500">{sorted.length} milestone(s)</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200 min-w-[260px]">Customer - Project</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200 min-w-[160px]">Project Manager</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Description</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200 min-w-[120px]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map(({ m, i, effectiveStatus }) => {
                    const isUnbilled = effectiveStatus === 'Unbilled';
                    return (
                      <tr key={i} className="hover:bg-gray-50 border-b border-gray-200">
                        <td className="px-4 py-3 text-gray-900">{m.customerProject}</td>
                        <td className="px-4 py-3 text-gray-700">{m.projectManager}</td>
                        <td className="px-4 py-3 text-gray-700">{m.description}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1.5">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${effectiveStatus === 'Billed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                              {effectiveStatus}
                            </span>
                            {isUnbilled && (
                              <button
                                type="button"
                                onClick={() => setMilestoneToConfirm(i)}
                                className="inline-flex items-center justify-center w-6 h-6 rounded text-amber-700 hover:bg-amber-100 hover:text-amber-900 transition-colors"
                                title="Bill Milestone"
                              >
                                <DollarSign className="h-4 w-4" />
                              </button>
                            )}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })()}

      {/* Bill Milestone Confirmation Dialog */}
      {milestoneToConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMilestoneToConfirm(null)} aria-hidden="true" />
          <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bill Milestone</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to bill this project milestone?
            </p>
            <p className="text-sm font-medium text-gray-900 mb-6">
              {milestones[milestoneToConfirm]?.customerProject} — {milestones[milestoneToConfirm]?.description}
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setMilestoneToConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setMilestoneBilledOverrides((prev) => ({ ...prev, [milestoneToConfirm]: true }));
                  setMilestoneToConfirm(null);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio banner — Backlog Status detail */}
      {portfolioBacklogPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setPortfolioBacklogPopupOpen(false)} aria-hidden="true" />
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-2xl ring-1 ring-black/5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="backlog-status-dialog-title"
          >
            <div className="border-b border-gray-100 bg-gradient-to-br from-slate-50 to-blue-50/60 px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 shadow-sm">
                  <BarChart3 className="h-5 w-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <h3 id="backlog-status-dialog-title" className="text-lg font-semibold tracking-tight text-gray-900">
                    Backlog Status
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-500">Open / unconfirmed and backlog hour totals</p>
                </div>
              </div>
            </div>
            <dl className="divide-y divide-gray-100 px-2 py-2">
              <div className="flex items-baseline justify-between gap-4 px-4 py-3.5">
                <dt className="text-sm text-gray-600">Open / unconfirmed hours</dt>
                <dd className="text-lg font-semibold tabular-nums text-gray-900">
                  {schedulingKPI.openTentative.total}
                  <span className="ml-1 text-sm font-medium text-gray-500">hrs</span>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 px-4 py-3.5">
                <dt className="text-sm text-gray-600">Professional Services Backlog</dt>
                <dd className="text-lg font-semibold tabular-nums text-gray-900">
                  {backlogHours?.professionalServices ?? 0}
                  <span className="ml-1 text-sm font-medium text-gray-500">hrs</span>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 px-4 py-3.5">
                <dt className="text-sm text-gray-600">Staff Aug Backlog</dt>
                <dd className="text-lg font-semibold tabular-nums text-gray-900">
                  {backlogHours?.staffAug ?? 0}
                  <span className="ml-1 text-sm font-medium text-gray-500">hrs</span>
                </dd>
              </div>
            </dl>
            <div className="flex justify-end border-t border-gray-100 bg-gray-50/90 px-6 py-4">
              <button
                type="button"
                onClick={() => setPortfolioBacklogPopupOpen(false)}
                className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reports */}
      {activeSection === 'reports' && (
        <div className={`${cardClass} mb-6 min-w-0`}>
          <button
            type="button"
            onClick={() => {
              // TODO: wire to lessons-learned report API or export
              alert('Lessons Learned Report — run/export not yet implemented.');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <FileText className="h-4 w-4" />
            Run Lessons Learned Report
          </button>
        </div>
      )}

      {/* PMO Metrics + Leadership (shared body via renderMetricsDashboard) */}
      {(activeSection === 'pmoMetrics' || activeSection === 'leadership') && renderMetricsDashboard()}

            {/* Backlog Status */}
      {activeSection === 'backlogStatus' && (
        <div className={`${cardClass} min-w-0 text-black mb-6`}>
          <p className="text-base font-medium font-bold text-blue-600 mb-4">PS Engineer schedules confirmed through {confirmationDeadline}.</p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse">
              <thead><tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-black border-b-2 border-gray-200">Week of</th>
                <th className="px-4 py-3 text-right font-semibold text-black border-b-2 border-gray-200">Confirmed</th>
                <th className="px-4 py-3 text-right font-semibold text-black border-b-2 border-gray-200">Tentative</th>
                <th className="px-4 py-3 text-right font-semibold text-black border-b-2 border-gray-200">Open</th>
                <th className="px-4 py-3 text-right font-semibold text-black border-b-2 border-gray-200">Total</th>
              </tr></thead>
              <tbody>
                {schedulingKPI.weeks.map((week, i) => (
                  <tr key={i} role="button" tabIndex={0} onClick={() => window.open(BACKLOG_STATUS_URL, '_blank')} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(BACKLOG_STATUS_URL, '_blank'); } }} className="hover:bg-gray-50 border-b border-gray-200 cursor-pointer">
                    <td className="px-4 py-3 text-black" onClick={(e) => e.stopPropagation()}>
                      <span role="button" tabIndex={0} className="cursor-pointer hover:underline" onClick={() => window.open(BACKLOG_STATUS_URL, '_blank')} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(BACKLOG_STATUS_URL, '_blank'); } }}>{formatPeriodMMDDYYYY(week.period, reportDate.split('/')[2])}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-black">{week.firmHours}</td>
                    <td className="px-4 py-3 text-right text-black">{week.tentativeHours}</td>
                    <td className="px-4 py-3 text-right text-black">{week.openHours}</td>
                    <td className="px-4 py-3 text-right text-black">{week.totalSchedulableHours}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 border-t-2 border-gray-300 text-black"><td className="px-4 py-3">Total</td><td className="px-4 py-3 text-right">{schedulingKPI.totals.firmHours}</td><td className="px-4 py-3 text-right">{schedulingKPI.totals.tentativeHours}</td><td className="px-4 py-3 text-right">{schedulingKPI.totals.openHours}</td><td className="px-4 py-3 text-right">{schedulingKPI.weeks.reduce((s, w) => s + w.totalSchedulableHours, 0)}</td></tr>
                <tr className={`font-bold ${isBacklogAlert ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}><td className="px-4 py-3">Open/Tentative</td><td colSpan={4} className="px-4 py-3 text-right">{schedulingKPI.openTentative.percentage} ({schedulingKPI.openTentative.total})</td></tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-6">
            <div><h3 className="text-lg font-semibold text-blue-600 mb-2">Fill</h3><ol className="list-decimal list-inside space-y-2 text-black">{backlogReview.fill.map((item, i) => <li key={i} role="button" tabIndex={0} onClick={() => window.open(BACKLOG_STATUS_URL, '_blank')} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(BACKLOG_STATUS_URL, '_blank'); } }} className="cursor-pointer hover:underline">{item}</li>)}</ol></div>
            <div><h3 className="text-lg font-semibold text-blue-600 mb-2">Confirm</h3><ol className="list-decimal list-inside space-y-2 text-black">{backlogReview.confirm.map((item, i) => <li key={i} role="button" tabIndex={0} onClick={() => window.open(BACKLOG_STATUS_URL, '_blank')} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(BACKLOG_STATUS_URL, '_blank'); } }} className="cursor-pointer hover:underline">{item}</li>)}</ol></div>
          </div>
        </div>
      )}

      {/* Budget Review */}
      {activeSection === 'budget' && (
        <div className={`${cardClass} mb-6`}>
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Filter by..." value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            {(projectFilter.trim() || budgetClosingFilter !== 'all' || projectReviewFilter.trim() || projectReviewEngineerFilter || projectReviewStatusFilter) && (
              <button type="button" onClick={() => { setProjectFilter(''); setBudgetClosingFilter('all'); setProjectReviewClosingFilter('all'); setProjectReviewFilter(''); setProjectReviewEngineerFilter(''); setProjectReviewStatusFilter(''); }} className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">Clear filters</button>
            )}
            {budgetClosingFilter !== 'all' && <span className="text-sm text-blue-600 font-medium">Closing {budgetClosingFilter === 'thisWeek' ? 'this week' : 'next week'}</span>}
            {projectReviewEngineerFilter && <span className="text-sm text-blue-600 font-medium">Engineer: {projectReviewEngineerFilter}</span>}
            {projectReviewStatusFilter && <span className="text-sm text-blue-600 font-medium">Status: {projectReviewStatusFilter === 'On Track' ? 'Executing' : projectReviewStatusFilter}</span>}
            <span className="text-sm text-gray-500">{filteredBudgetItems.length} project(s)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead><tr className="bg-gray-50 h-12">{[{ key: 'projectName', label: 'Customer - Project', align: 'text-left' as const }, { key: 'projectManager', label: 'Project Manager', align: 'text-left' as const }, { key: 'budgetHours', label: 'Budget', align: 'text-center' as const }, { key: 'actualHours', label: 'Actual', align: 'text-center' as const }, { key: 'scheduledHours', label: 'Scheduled', align: 'text-center' as const }, { key: 'remaining', label: 'Remaining', align: 'text-center' as const }, { key: 'estimateToComplete', label: 'ETC', align: 'text-center' as const }, { key: 'estimatedEndDate', label: 'End Date', align: 'text-center' as const }, { key: 'projectStatus', label: 'Status', align: 'text-left' as const }].map(({ key, label, align }) => (<th key={key} className={`px-4 py-3 font-semibold text-gray-700 border-b-2 border-gray-200 cursor-pointer select-none hover:bg-gray-100 h-12 min-h-[3rem] align-middle ${align} ${key === 'projectName' ? 'min-w-[260px]' : key === 'projectManager' ? 'min-w-[160px]' : ''}`} onClick={() => handleBudgetSort(key)}><span className="inline-flex items-center gap-1">{label}{budgetSortColumn === key && (budgetSortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}</span></th>))}</tr></thead>
              <tbody>
                {sortedBudgetItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-900">
                      <span role="button" tabIndex={0} className="cursor-pointer hover:underline" title="Open Project" onClick={(e) => { e.preventDefault(); window.open(BACKLOG_URL, '_blank'); }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(BACKLOG_URL, '_blank'); } }}>{(item as { customerName?: string }).customerName ?? '—'} – {item.projectName}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 relative align-top">
                      {editingPmKey === getProjectReviewRowKey(item) ? (
                        <>
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded text-gray-500 bg-gray-100 opacity-80">Select...</span>
                          <div ref={editingPmKey === getProjectReviewRowKey(item) ? pmDropdownRef : undefined} className="absolute left-0 top-full mt-0.5 z-20 flex flex-col gap-1 p-1.5 border border-gray-300 rounded-md bg-white shadow-lg min-w-[10rem]" tabIndex={0} onBlur={() => setEditingPmKey(null)}>
                            {projectManagerOptions.map((pm) => (
                              <button
                                key={pm}
                                type="button"
                                className="inline-flex px-2 py-1 text-xs font-medium rounded text-left cursor-pointer hover:ring-2 hover:ring-blue-400 w-fit bg-gray-50 hover:bg-gray-100 text-gray-800"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  const key = getProjectReviewRowKey(item);
                                  setProjectManagerOverrides((prev) => ({ ...prev, [key]: pm }));
                                  setEditingPmKey(null);
                                }}
                              >
                                {pm}
                              </button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <span role="button" tabIndex={0} className="cursor-pointer hover:ring-2 hover:ring-blue-400 rounded" title="Change Project Manager" onClick={() => setEditingPmKey(getProjectReviewRowKey(item))} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setEditingPmKey(getProjectReviewRowKey(item)); } }}>{projectManagerOverrides[getProjectReviewRowKey(item)] ?? item.projectManager}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700">{item.budgetHours}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{item.actualHours}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{item.scheduledHours}</td>
                    <td className={`px-4 py-3 text-center font-medium ${(item.budgetHours - item.actualHours - item.scheduledHours) > 0 ? 'text-green-600' : (item.budgetHours - item.actualHours - item.scheduledHours) < 0 ? 'text-red-600' : 'text-gray-700'}`}>{item.budgetHours - item.actualHours - item.scheduledHours}</td>
                    <td className="px-4 py-3 text-center text-gray-700">
                      {editingEtcKey === getProjectReviewRowKey(item) ? (
                        <input
                          type="number"
                          min={0}
                          step={1}
                          className="w-14 text-center text-sm border border-gray-300 rounded px-1 py-0.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          defaultValue={etcOverrides[getProjectReviewRowKey(item)] ?? (item as { estimateToComplete?: number }).estimateToComplete ?? 0}
                          autoFocus
                          onBlur={(e) => {
                            const key = getProjectReviewRowKey(item);
                            const val = parseInt(String(e.target.value), 10);
                            if (!Number.isNaN(val) && val >= 0) setEtcOverrides((prev) => ({ ...prev, [key]: val }));
                            setEditingEtcKey(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const key = getProjectReviewRowKey(item);
                              const val = parseInt(String((e.target as HTMLInputElement).value), 10);
                              if (!Number.isNaN(val) && val >= 0) setEtcOverrides((prev) => ({ ...prev, [key]: val }));
                              setEditingEtcKey(null);
                            }
                            if (e.key === 'Escape') setEditingEtcKey(null);
                          }}
                        />
                      ) : (
                        <span role="button" tabIndex={0} className="cursor-pointer hover:underline" title="Change ETC" onClick={() => setEditingEtcKey(getProjectReviewRowKey(item))} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setEditingEtcKey(getProjectReviewRowKey(item)); } }}>{etcOverrides[getProjectReviewRowKey(item)] ?? (item as { estimateToComplete?: number }).estimateToComplete ?? '—'}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700">
                      {editingEndDateKey === getProjectReviewRowKey(item) ? (
                        <input
                          type="date"
                          className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          defaultValue={mmddyyyyToYyyyMmDd(endDateOverrides[getProjectReviewRowKey(item)] ?? (item as { estimatedEndDate?: string }).estimatedEndDate ?? '') || undefined}
                          autoFocus
                          onBlur={(e) => {
                            const key = getProjectReviewRowKey(item);
                            const val = e.target.value;
                            if (val) setEndDateOverrides((prev) => ({ ...prev, [key]: yyyyMmDdToMmddyyyy(val) }));
                            setEditingEndDateKey(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const key = getProjectReviewRowKey(item);
                              const val = (e.target as HTMLInputElement).value;
                              if (val) setEndDateOverrides((prev) => ({ ...prev, [key]: yyyyMmDdToMmddyyyy(val) }));
                              setEditingEndDateKey(null);
                            }
                            if (e.key === 'Escape') setEditingEndDateKey(null);
                          }}
                        />
                      ) : (
                        <span role="button" tabIndex={0} className="cursor-pointer hover:underline" title="Change End Date" onClick={() => setEditingEndDateKey(getProjectReviewRowKey(item))} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setEditingEndDateKey(getProjectReviewRowKey(item)); } }}>{endDateOverrides[getProjectReviewRowKey(item)] ?? (item as { estimatedEndDate?: string }).estimatedEndDate ?? '—'}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 relative align-top">
                      {editingStatusKey === getProjectReviewRowKey(item) ? (
                        <>
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full text-gray-500 bg-gray-100 opacity-80">Select...</span>
                          <div ref={editingStatusKey === getProjectReviewRowKey(item) ? statusDropdownRef : undefined} className="absolute left-0 top-full mt-0.5 z-20 flex flex-col gap-1.5 p-1.5 border border-gray-300 rounded-md bg-white shadow-lg min-w-[7rem]" tabIndex={0} onBlur={() => setEditingStatusKey(null)}>
                            {projectReviewStatusOptions.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full text-left cursor-pointer hover:ring-2 hover:ring-blue-400 w-fit ${getStatusBadgeClass(opt.value)}`}
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  const key = getProjectReviewRowKey(item);
                                  setStatusOverrides((prev) => ({ ...prev, [key]: opt.value }));
                                  setEditingStatusKey(null);
                                }}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <span
                          role="button"
                          tabIndex={0}
                          title="Change Project Status"
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer hover:ring-2 hover:ring-blue-400 ${getStatusBadgeClass(statusOverrides[getProjectReviewRowKey(item)] ?? (item as { projectStatus?: string }).projectStatus ?? '')}`}
                          onClick={() => setEditingStatusKey(getProjectReviewRowKey(item))}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setEditingStatusKey(getProjectReviewRowKey(item)); } }}
                        >
                          {(statusOverrides[getProjectReviewRowKey(item)] ?? (item as { projectStatus?: string }).projectStatus) === 'On Track' ? 'Executing' : (statusOverrides[getProjectReviewRowKey(item)] ?? (item as { projectStatus?: string }).projectStatus) ?? '—'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Project Review */}
      {activeSection === 'projectReview' && (
        <div className={`${cardClass} mb-6`}>
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Filter by..." value={projectReviewFilter} onChange={(e) => setProjectReviewFilter(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            {(projectReviewFilter.trim() || projectReviewClosingFilter !== 'all' || projectReviewEngineerFilter || projectReviewStatusFilter) && (
              <button type="button" onClick={() => { setProjectReviewFilter(''); setProjectReviewClosingFilter('all'); setProjectReviewEngineerFilter(''); setProjectReviewStatusFilter(''); }} className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">Clear filters</button>
            )}
            {projectReviewClosingFilter !== 'all' && <span className="text-sm text-blue-600 font-medium">Closing {projectReviewClosingFilter === 'thisWeek' ? 'this week' : 'next week'}</span>}
            {projectReviewEngineerFilter && <span className="text-sm text-blue-600 font-medium">Engineer: {projectReviewEngineerFilter}</span>}
            {projectReviewStatusFilter && <span className="text-sm text-blue-600 font-medium">Status: {projectReviewStatusFilter === 'On Track' ? 'Executing' : projectReviewStatusFilter}</span>}
            <span className="text-sm text-gray-500">{filteredProjectReview.length} project(s)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead><tr className="bg-gray-50 h-12">{projectReviewColumns.map(({ key, label, align }) => (<th key={key} className={`px-4 py-3 font-semibold text-gray-700 border-b-2 border-gray-200 cursor-pointer select-none hover:bg-gray-100 h-12 min-h-[3rem] align-middle ${align} ${key === 'customerProject' ? 'min-w-[260px]' : key === 'projectManager' ? 'min-w-[160px]' : key === 'nextActions' ? 'min-w-[280px]' : ''}`} onClick={() => handleProjectReviewSort(key)}><span className="inline-flex items-center gap-1">{label}{projectReviewSortColumn === key && (projectReviewSortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}</span></th>))}</tr></thead>
              <tbody>
                {sortedProjectReview.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-700">
                      <span role="button" tabIndex={0} className="cursor-pointer hover:underline" title="Open Project" onClick={(e) => { e.preventDefault(); window.open(BACKLOG_URL, '_blank'); }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(BACKLOG_URL, '_blank'); } }}>{(row as { customerName?: string }).customerName ?? '—'} – {row.projectName}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 relative align-top">
                      {editingPmKey === getProjectReviewRowKey(row) ? (
                        <>
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded text-gray-500 bg-gray-100 opacity-80">Select...</span>
                          <div ref={editingPmKey === getProjectReviewRowKey(row) ? pmDropdownRef : undefined} className="absolute left-0 top-full mt-0.5 z-20 flex flex-col gap-1 p-1.5 border border-gray-300 rounded-md bg-white shadow-lg min-w-[10rem]" tabIndex={0} onBlur={() => setEditingPmKey(null)}>
                            {projectManagerOptions.map((pm) => (
                              <button
                                key={pm}
                                type="button"
                                className="inline-flex px-2 py-1 text-xs font-medium rounded text-left cursor-pointer hover:ring-2 hover:ring-blue-400 w-fit bg-gray-50 hover:bg-gray-100 text-gray-800"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  const key = getProjectReviewRowKey(row);
                                  setProjectManagerOverrides((prev) => ({ ...prev, [key]: pm }));
                                  setEditingPmKey(null);
                                }}
                              >
                                {pm}
                              </button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <span role="button" tabIndex={0} className="cursor-pointer hover:ring-2 hover:ring-blue-400 rounded" title="Change Project Manager" onClick={() => setEditingPmKey(getProjectReviewRowKey(row))} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setEditingPmKey(getProjectReviewRowKey(row)); } }}>{projectManagerOverrides[getProjectReviewRowKey(row)] ?? row.projectManager}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span role="button" tabIndex={0} className={`cursor-pointer hover:underline font-medium ${row.estimateToComplete > 0 ? 'text-red-600' : 'text-green-600'}`} title="View Actions" onClick={(e) => { e.preventDefault(); window.open(BACKLOG_URL, '_blank'); }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(BACKLOG_URL, '_blank'); } }}>{row.estimateToComplete}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-medium text-gray-700">{row.progress}%</td>
                    <td className="px-4 py-3 text-gray-700 text-sm">
                      <span role="button" tabIndex={0} className="cursor-pointer hover:underline" title="View Next Actions" onClick={(e) => { e.preventDefault(); window.open(BACKLOG_URL, '_blank'); }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(BACKLOG_URL, '_blank'); } }}>{row.nextActions}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700">
                      {editingEtcKey === getProjectReviewRowKey(row) ? (
                        <input
                          type="number"
                          min={0}
                          step={1}
                          className="w-14 text-center text-sm border border-gray-300 rounded px-1 py-0.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          defaultValue={etcOverrides[getProjectReviewRowKey(row)] ?? (row as { etc?: number }).etc ?? 0}
                          autoFocus
                          onBlur={(e) => {
                            const key = getProjectReviewRowKey(row);
                            const val = parseInt(String(e.target.value), 10);
                            if (!Number.isNaN(val) && val >= 0) setEtcOverrides((prev) => ({ ...prev, [key]: val }));
                            setEditingEtcKey(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const key = getProjectReviewRowKey(row);
                              const val = parseInt(String((e.target as HTMLInputElement).value), 10);
                              if (!Number.isNaN(val) && val >= 0) setEtcOverrides((prev) => ({ ...prev, [key]: val }));
                              setEditingEtcKey(null);
                            }
                            if (e.key === 'Escape') setEditingEtcKey(null);
                          }}
                        />
                      ) : (
                        <span role="button" tabIndex={0} className="cursor-pointer hover:underline" title="Change ETC" onClick={() => setEditingEtcKey(getProjectReviewRowKey(row))} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setEditingEtcKey(getProjectReviewRowKey(row)); } }}>{etcOverrides[getProjectReviewRowKey(row)] ?? (row as { etc?: number }).etc ?? '—'}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 relative align-top">
                      {editingStatusKey === getProjectReviewRowKey(row) ? (
                        <>
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full text-gray-500 bg-gray-100 opacity-80">Select...</span>
                          <div ref={editingStatusKey === getProjectReviewRowKey(row) ? statusDropdownRef : undefined} className="absolute left-0 top-full mt-0.5 z-20 flex flex-col gap-1.5 p-1.5 border border-gray-300 rounded-md bg-white shadow-lg min-w-[7rem]" tabIndex={0} onBlur={() => setEditingStatusKey(null)}>
                            {projectReviewStatusOptions.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full text-left cursor-pointer hover:ring-2 hover:ring-blue-400 w-fit ${getStatusBadgeClass(opt.value)}`}
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  const key = getProjectReviewRowKey(row);
                                  setStatusOverrides((prev) => ({ ...prev, [key]: opt.value }));
                                  setEditingStatusKey(null);
                                }}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <span
                          role="button"
                          tabIndex={0}
                          title="Change Project Status"
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer hover:ring-2 hover:ring-blue-400 ${getStatusBadgeClass(statusOverrides[getProjectReviewRowKey(row)] ?? row.projectStatus)}`}
                          onClick={() => setEditingStatusKey(getProjectReviewRowKey(row))}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setEditingStatusKey(getProjectReviewRowKey(row)); } }}
                        >
                          {(statusOverrides[getProjectReviewRowKey(row)] ?? row.projectStatus) === 'On Track' ? 'Executing' : (statusOverrides[getProjectReviewRowKey(row)] ?? row.projectStatus) === 'At Risk' ? 'Closing' : (statusOverrides[getProjectReviewRowKey(row)] ?? row.projectStatus)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upcoming Cutovers */}
      {activeSection === 'cutovers' && (
        <div className={`${cardClass} mb-6`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Filter by..." value={cutoverFilter} onChange={(e) => setCutoverFilter(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <span className="text-sm text-gray-500">{filteredCutovers.length} cutover(s)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 h-12">
                  {[{ key: 'date', label: 'Date' }, { key: 'time', label: 'AM/PM' }, { key: 'customerProject', label: 'Customer - Project' }, { key: 'name', label: 'Name' }, { key: 'description', label: 'Description' }].map(({ key, label }) => (
                    <th key={key} className={`px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider border-b-2 border-gray-200 cursor-pointer select-none hover:bg-gray-100 h-12 align-middle ${key === 'description' ? 'min-w-[120px]' : ''}`} onClick={() => handleCutoverSort(key)}>
                      <span className="inline-flex items-center gap-1">{label}{cutoverSortColumn === key && (cutoverSortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedCutovers.map((item, i) => (
                  <tr
                    key={i}
                    role="button"
                    tabIndex={0}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => window.open(BACKLOG_STATUS_URL, '_blank')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(BACKLOG_STATUS_URL, '_blank'); } }}
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{(item as { time?: string }).time && (item as { time?: string }).time!.toUpperCase() === 'AM' ? 'AM' : (item as { time?: string }).time && (item as { time?: string }).time!.toUpperCase() === 'PM' ? 'PM' : '—'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{(item as { customerName?: string }).customerName ?? '—'} – {(item as { projectName?: string }).projectName ?? '—'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{(item as { name?: string }).name ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{item.description || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subcontractors */}
      {activeSection === 'subcontractors' && (
        <div className={`${cardClass} mb-6`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Filter by..." value={subcontractorFilter} onChange={(e) => setSubcontractorFilter(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <span className="text-sm text-gray-500">{filteredSubcontractorSchedule.length} entry(ies)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 h-12">
                  {[{ key: 'date', label: 'Date' }, { key: 'time', label: 'AM/PM' }, { key: 'name', label: 'Name' }, { key: 'customerProject', label: 'Customer - Project' }, { key: 'description', label: 'Description' }].map(({ key, label }) => (
                    <th key={key} className={`px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider border-b-2 border-gray-200 cursor-pointer select-none hover:bg-gray-100 h-12 align-middle ${key === 'description' ? 'min-w-[120px]' : ''}`} onClick={() => handleSubcontractorSort(key)}>
                      <span className="inline-flex items-center gap-1">{label}{subcontractorSortColumn === key && (subcontractorSortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedSubcontractorSchedule.map((entry, i) => (
                  <tr
                    key={i}
                    role="button"
                    tabIndex={0}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => window.open(BACKLOG_STATUS_URL, '_blank')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(BACKLOG_STATUS_URL, '_blank'); } }}
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{formatDateMMDDYYYY(entry.date, reportDate.split('/')[2])}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{entry.time && entry.time.toUpperCase() === 'AM' ? 'AM' : entry.time && entry.time.toUpperCase() === 'PM' ? 'PM' : '—'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{entry.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{entry.customerName ?? '—'} – {entry.projectName ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{entry.description || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PMODashboardUpgrade;
