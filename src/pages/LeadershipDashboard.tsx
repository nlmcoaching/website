import React from 'react';
import { LeadershipSection } from '../components/LeadershipSection';

export interface LeadershipDashboardSlots {
  /** Status banner, PMO narrative, risk grid, and key-metrics snapshot */
  executiveSummary: React.ReactNode;
  /** Four trend panels (directionality) */
  trends: React.ReactNode;
  /** Gap signal + engineering capacity + backlog forecast */
  capacityDemand: React.ReactNode;
  /** Open/tentative % and backlog hours mix */
  backlogBreakdown: React.ReactNode;
  /** Billable attainment, upcoming revenue (milestones), client portfolio, project health */
  financialDelivery: React.ReactNode;
  /** Customers with below-threshold health */
  customerRisk: React.ReactNode;
  /** Over budget, on hold, low health */
  projectExceptions: React.ReactNode;
}

/**
 * Leadership tab: executive layout grouping the same PMO Metrics data into seven sections.
 */
export function LeadershipDashboard({
  executiveSummary,
  trends,
  capacityDemand,
  backlogBreakdown,
  financialDelivery,
  customerRisk,
  projectExceptions,
}: LeadershipDashboardSlots) {
  return (
    <div className="space-y-8">
      <LeadershipSection title="Summary" subtitle="Status + Risks + Actions">
        {executiveSummary}
      </LeadershipSection>
      <LeadershipSection title="Trends" subtitle="Week-over-week direction">
        {trends}
      </LeadershipSection>
      {capacityDemand != null ? (
        <LeadershipSection title="Capacity vs Demand" subtitle="Utilization vs scheduled demand">
          {capacityDemand}
        </LeadershipSection>
      ) : null}
      <LeadershipSection title="Backlog Breakdown" subtitle="Open / unconfirmed and backlog pools">
        {backlogBreakdown}
      </LeadershipSection>
      <LeadershipSection
        title="Financial + Delivery Health"
        subtitle="Attainment, upcoming revenue (milestones), client mix, and project health"
      >
        {financialDelivery}
      </LeadershipSection>
      <LeadershipSection title="Customer Risk" subtitle="Customers with below-target project health">
        {customerRisk}
      </LeadershipSection>
      <LeadershipSection title="Project Exceptions" subtitle="Budget, hold, and health outliers">
        {projectExceptions}
      </LeadershipSection>
    </div>
  );
}
