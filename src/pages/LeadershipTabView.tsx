import React from 'react';
import { LeadershipDashboard } from './LeadershipDashboard';

const TREND_WEEKS = 6;

/** Leadership tab: same PMO Metrics data in executive section order. */
export function LeadershipTabView({
  portfolioBannerEl,
  portfolioBannerRedIndicatorCount,
  capacityRiskExpectedWeek,
  revenueBilledLast30Days,
  trendPanelGridEl,
  capacityDemandLeadershipEl,
  backlogBreakdownEl,
  financialDeliveryEl,
  customerRiskTableEl,
  projectExceptionsTableEl,
}: {
  portfolioBannerEl: React.ReactNode;
  portfolioBannerRedIndicatorCount: number;
  capacityRiskExpectedWeek: string | undefined;
  revenueBilledLast30Days: number;
  trendPanelGridEl: React.ReactNode;
  capacityDemandLeadershipEl: React.ReactNode;
  backlogBreakdownEl: React.ReactNode;
  financialDeliveryEl: React.ReactNode;
  customerRiskTableEl: React.ReactNode;
  projectExceptionsTableEl: React.ReactNode;
}) {
  const revenueBilledFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(revenueBilledLast30Days);
  const executiveSummary = (
    <div className="space-y-5">
      {portfolioBannerEl}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-4">
          <h3 className="text-xs font-bold uppercase text-emerald-900 mb-2">Revenue Billed (Last 30 days)</h3>
          <p className="text-2xl font-bold tabular-nums text-emerald-950" title="Total milestone revenue billed in the rolling 30-day window ending on the report date">
            {revenueBilledFormatted}
          </p>
          <p className="text-xs text-emerald-900/80 mt-2">Sum of billed milestone amounts in the last 30 days.</p>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-4">
          <h3 className="text-xs font-bold uppercase text-blue-900 mb-2">Actions</h3>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>Align engineering capacity with forecast demand</li>
            <li>Escalate budget and backlog exceptions with PMs</li>
            <li>Confirm upcoming billing milestones</li>
          </ul>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-4">
          <h3 className="text-xs font-bold uppercase text-amber-900 mb-2">Risks</h3>
          <p className="text-gray-800">
            {portfolioBannerRedIndicatorCount} of 5 portfolio indicators are outside green thresholds.
            {capacityRiskExpectedWeek ? (
              <span className="block mt-2 text-amber-900 font-medium">Capacity risk signal: week of {capacityRiskExpectedWeek}.</span>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );

  const trends = (
    <div>
      <p className="text-xs text-gray-500 mb-3">Last {TREND_WEEKS} weeks — direction vs prior week on each KPI.</p>
      {trendPanelGridEl}
    </div>
  );

  return (
    <LeadershipDashboard
      executiveSummary={executiveSummary}
      trends={trends}
      capacityDemand={capacityDemandLeadershipEl}
      backlogBreakdown={backlogBreakdownEl}
      financialDelivery={financialDeliveryEl}
      customerRisk={customerRiskTableEl}
      projectExceptions={projectExceptionsTableEl}
    />
  );
}
