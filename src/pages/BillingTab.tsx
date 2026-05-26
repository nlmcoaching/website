// @ts-nocheck
import React, { useEffect } from 'react';

const BillingTab = () => {
  useEffect(() => {
    // Function to extract numeric value from currency string
    const extractValue = (element: HTMLElement | null): number => {
      if (!element) return 0;
      const text = element.textContent?.trim() || '';
      return parseFloat(text.replace(/[$,]/g, '')) || 0;
    };

    // Function to format currency
    const formatCurrency = (value: number): string => {
      return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    };

    // Function to update project margin color based on actual vs planned margin %
    const updateProjectMarginColor = () => {
      const marginBox = document.getElementById('projectMarginBox');
      const actualEl = document.getElementById('marginPercentActual');
      const plannedEl = document.getElementById('marginPercentPlanned');
      
      if (!marginBox || !actualEl || !plannedEl) return;
      
      const actualPercent = parseFloat(actualEl.textContent?.replace(/[%,]/g, '') || '0') || 0;
      const plannedPercent = parseFloat(plannedEl.textContent?.replace(/[%,]/g, '') || '0') || 0;
      
      // Reset all child text colors first
      const allChildren = marginBox.querySelectorAll('*');
      allChildren.forEach((child) => {
        (child as HTMLElement).style.color = '';
      });
      
      if (actualPercent > plannedPercent) {
        marginBox.style.background = '#dcfce7'; // light green
        marginBox.style.color = '#166534'; // dark green text
      } else {
        marginBox.style.background = '#fee2e2'; // light red
        marginBox.style.color = '#991b1b'; // dark red text
      }
    };

    // Function to update margin percent color based on actual vs planned margin %
    const updateMarginPercentColor = () => {
      const marginPercentBox = document.getElementById('marginPercentBox');
      const actualEl = document.getElementById('marginPercentActual');
      const plannedEl = document.getElementById('marginPercentPlanned');
      
      if (!marginPercentBox || !actualEl || !plannedEl) return;
      
      const actualPercent = parseFloat(actualEl.textContent?.replace(/[%,]/g, '') || '0') || 0;
      const plannedPercent = parseFloat(plannedEl.textContent?.replace(/[%,]/g, '') || '0') || 0;
      
      // Reset all child text colors first
      const allChildren = marginPercentBox.querySelectorAll('*');
      allChildren.forEach((child) => {
        (child as HTMLElement).style.color = '';
      });
      
      if (actualPercent > plannedPercent) {
        marginPercentBox.style.background = '#dcfce7'; // light green
        marginPercentBox.style.color = '#166534'; // dark green text
      } else {
        marginPercentBox.style.background = '#fee2e2'; // light red
        marginPercentBox.style.color = '#991b1b'; // dark red text
      }
    };

    // Function to calculate and update revenue subtotal
    const updateRevenueSubtotal = () => {
      const totalProjectRevenuePlanned = extractValue(document.getElementById('totalProjectRevenuePlanned'));
      const totalProjectRevenueActual = extractValue(document.getElementById('totalProjectRevenueActual'));
      const changeRequestRevenuePlanned = extractValue(document.getElementById('changeRequestRevenuePlanned'));
      const changeRequestRevenueActual = extractValue(document.getElementById('changeRequestRevenueActual'));
      
      const plannedSubtotal = totalProjectRevenuePlanned + changeRequestRevenuePlanned;
      const actualSubtotal = totalProjectRevenueActual + changeRequestRevenueActual;
      
      const plannedEl = document.getElementById('revenueSubtotalPlanned');
      const actualEl = document.getElementById('revenueSubtotalActual');
      if (plannedEl) plannedEl.textContent = formatCurrency(plannedSubtotal);
      if (actualEl) actualEl.textContent = formatCurrency(actualSubtotal);
    };

    // Function to calculate and update costs subtotal
    const updateCostsSubtotal = () => {
      const projectHoursPlanned = extractValue(document.getElementById('projectHoursPlanned'));
      const projectHoursActual = extractValue(document.getElementById('projectHoursActual'));
      const subcontractorCostPlanned = extractValue(document.getElementById('subcontractorCostPlanned'));
      const subcontractorCostActual = extractValue(document.getElementById('subcontractorCostActual'));
      const additionalProjectCostsPlanned = extractValue(document.getElementById('additionalProjectCostsPlanned'));
      const additionalProjectCostsActual = extractValue(document.getElementById('additionalProjectCostsActual'));
      
      const plannedSubtotal = projectHoursPlanned + subcontractorCostPlanned + additionalProjectCostsPlanned;
      const actualSubtotal = projectHoursActual + subcontractorCostActual + additionalProjectCostsActual;
      
      const plannedEl = document.getElementById('costsSubtotalPlanned');
      const actualEl = document.getElementById('costsSubtotalActual');
      if (plannedEl) plannedEl.textContent = formatCurrency(plannedSubtotal);
      if (actualEl) actualEl.textContent = formatCurrency(actualSubtotal);
    };

    // Function to calculate and update project margin
    const updateProjectMargin = () => {
      const revenuePlanned = extractValue(document.getElementById('revenueSubtotalPlanned'));
      const revenueActual = extractValue(document.getElementById('revenueSubtotalActual'));
      const costsPlanned = extractValue(document.getElementById('costsSubtotalPlanned'));
      const costsActual = extractValue(document.getElementById('costsSubtotalActual'));
      
      const marginPlanned = revenuePlanned - costsPlanned;
      const marginActual = revenueActual - costsActual;
      
      const plannedEl = document.getElementById('projectMarginPlanned');
      const actualEl = document.getElementById('projectMarginValue');
      if (plannedEl) plannedEl.textContent = formatCurrency(marginPlanned);
      if (actualEl) actualEl.textContent = formatCurrency(marginActual);
      
      // Update margin percentage
      const marginPercentPlanned = revenuePlanned > 0 ? (marginPlanned / revenuePlanned * 100) : 0;
      const marginPercentActual = revenueActual > 0 ? (marginActual / revenueActual * 100) : 0;
      
      const percentPlannedEl = document.getElementById('marginPercentPlanned');
      const percentActualEl = document.getElementById('marginPercentActual');
      if (percentPlannedEl) percentPlannedEl.textContent = marginPercentPlanned.toFixed(1) + '%';
      if (percentActualEl) percentActualEl.textContent = marginPercentActual.toFixed(1) + '%';
      
      // Update margin color
      updateProjectMarginColor();
      updateMarginPercentColor();
    };

    // Initial calculations
    updateRevenueSubtotal();
    updateCostsSubtotal();
    setTimeout(updateProjectMargin, 100);
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto p-10">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Project Finance Tab</h1>
      </div>

      {/* Project Hours & Costs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 pb-3 border-b-2 border-gray-200">
          Project Hours & Costs
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Role</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Cost/Hour</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Hours Used</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">Jeff Mason</td>
                <td className="px-4 py-3">Senior Engineer</td>
                <td className="px-4 py-3">$160</td>
                <td className="px-4 py-3">120</td>
                <td className="px-4 py-3">$19,200</td>
              </tr>
              <tr className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">Emily Davis</td>
                <td className="px-4 py-3">Project Manager</td>
                <td className="px-4 py-3">$155</td>
                <td className="px-4 py-3">80</td>
                <td className="px-4 py-3">$12,400</td>
              </tr>
              <tr className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">Michael Chen</td>
                <td className="px-4 py-3">Solutions Architect</td>
                <td className="px-4 py-3">$190</td>
                <td className="px-4 py-3">95</td>
                <td className="px-4 py-3">$18,050</td>
              </tr>
              <tr className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">Lisa Anderson</td>
                <td className="px-4 py-3">DevOps Engineer</td>
                <td className="px-4 py-3">$160</td>
                <td className="px-4 py-3">150</td>
                <td className="px-4 py-3">$24,000</td>
              </tr>
              <tr className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">David Wilson</td>
                <td className="px-4 py-3">Junior Developer</td>
                <td className="px-4 py-3">$95</td>
                <td className="px-4 py-3">100</td>
                <td className="px-4 py-3">$9,500</td>
              </tr>
              <tr className="font-bold bg-gray-100 border-t-2 border-gray-300">
                <td colSpan={4} className="px-4 py-3 text-right">Total Project Hours Cost:</td>
                <td id="totalActualCost" className="px-4 py-3 text-lg font-bold">$83,150</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Subcontractor Costs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 pb-3 border-b-2 border-gray-200">
          Subcontractor Costs
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Vendor Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Description</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Invoice Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">2024-01-15</td>
                <td className="px-4 py-3">Tech Solutions Inc.</td>
                <td className="px-4 py-3">Network infrastructure setup</td>
                <td className="px-4 py-3">Paid</td>
                <td className="px-4 py-3">$14,800</td>
              </tr>
              <tr className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">2024-02-10</td>
                <td className="px-4 py-3">Cloud Services Pro</td>
                <td className="px-4 py-3">Security assessment and implementation</td>
                <td className="px-4 py-3">Paid</td>
                <td className="px-4 py-3">$25,000</td>
              </tr>
              <tr className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">2024-02-28</td>
                <td className="px-4 py-3">Data Migration Experts</td>
                <td className="px-4 py-3">Database migration services</td>
                <td className="px-4 py-3">Pending</td>
                <td className="px-4 py-3">$17,500</td>
              </tr>
              <tr className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">2024-03-05</td>
                <td className="px-4 py-3">IT Support Services</td>
                <td className="px-4 py-3">Ongoing maintenance and support</td>
                <td className="px-4 py-3">Paid</td>
                <td className="px-4 py-3">$8,200</td>
              </tr>
              <tr className="font-bold bg-gray-100 border-t-2 border-gray-300">
                <td colSpan={4} className="px-4 py-3 text-right">Total Subcontractor Costs:</td>
                <td id="totalSubcontractorAmount" className="px-4 py-3 text-lg font-bold">$65,500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Project Costs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 pb-3 border-b-2 border-gray-200">
          Additional Project Costs
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Member</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Billable</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Description</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Expense Type</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">ExpRecID</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">2024-01-08</td>
                <td className="px-4 py-3">MEM-101</td>
                <td className="px-4 py-3">No</td>
                <td className="px-4 py-3">Office supplies and equipment</td>
                <td className="px-4 py-3">Paid</td>
                <td className="px-4 py-3">Supplies</td>
                <td className="px-4 py-3">EXP-001</td>
                <td className="px-4 py-3">$2,350</td>
              </tr>
              <tr className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">2024-01-20</td>
                <td className="px-4 py-3">MEM-102</td>
                <td className="px-4 py-3">Yes</td>
                <td className="px-4 py-3">Software licenses and subscriptions</td>
                <td className="px-4 py-3">Paid</td>
                <td className="px-4 py-3">Software</td>
                <td className="px-4 py-3">EXP-002</td>
                <td className="px-4 py-3">$4,950</td>
              </tr>
              <tr className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">2024-02-15</td>
                <td className="px-4 py-3">MEM-103</td>
                <td className="px-4 py-3">Yes</td>
                <td className="px-4 py-3">Client site visit travel expenses</td>
                <td className="px-4 py-3">Paid</td>
                <td className="px-4 py-3">Travel</td>
                <td className="px-4 py-3">EXP-003</td>
                <td className="px-4 py-3">$3,750</td>
              </tr>
              <tr className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">2024-03-01</td>
                <td className="px-4 py-3">MEM-104</td>
                <td className="px-4 py-3">No</td>
                <td className="px-4 py-3">Testing equipment and cables</td>
                <td className="px-4 py-3">Pending</td>
                <td className="px-4 py-3">Equipment</td>
                <td className="px-4 py-3">EXP-004</td>
                <td className="px-4 py-3">$1,800</td>
              </tr>
              <tr className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">2024-03-10</td>
                <td className="px-4 py-3">MEM-105</td>
                <td className="px-4 py-3">Yes</td>
                <td className="px-4 py-3">Training and certification courses</td>
                <td className="px-4 py-3">Paid</td>
                <td className="px-4 py-3">Training</td>
                <td className="px-4 py-3">EXP-005</td>
                <td className="px-4 py-3">$4,100</td>
              </tr>
              <tr className="font-bold bg-gray-100 border-t-2 border-gray-300">
                <td colSpan={7} className="px-4 py-3 text-right">Total Additional Project Costs:</td>
                <td id="totalAmount" className="px-4 py-3 text-lg font-bold">$16,950</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-8 text-center">
          Project Performance - Planned vs Actuals
        </h2>
        <div className="max-w-4xl mx-auto px-5">
          <h3 className="text-base font-semibold mb-3 text-gray-900">Project Revenue</h3>
          <div className="flex flex-col gap-3 mb-8">
            <div className="bg-gray-50 text-gray-900 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
              <div className="text-sm font-medium flex-1">Project Revenue</div>
              <div className="flex gap-8 items-center">
                <div className="text-right">
                  <div className="text-xs opacity-60 mb-1 uppercase">Planned</div>
                  <div id="totalProjectRevenuePlanned" className="text-xl font-bold">$250,000</div>
                </div>
                <div className="text-right">
                  <div className="text-xs opacity-60 mb-1 uppercase">Actual</div>
                  <div id="totalProjectRevenueActual" className="text-xl font-bold">$250,000</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 text-gray-900 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
              <div className="text-sm font-medium flex-1">Change Request Revenue</div>
              <div className="flex gap-8 items-center">
                <div className="text-right">
                  <div className="text-xs opacity-60 mb-1 uppercase">Planned</div>
                  <div id="changeRequestRevenuePlanned" className="text-xl font-bold">$35,000</div>
                </div>
                <div className="text-right">
                  <div className="text-xs opacity-60 mb-1 uppercase">Actual</div>
                  <div id="changeRequestRevenueActual" className="text-xl font-bold">$35,000</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 text-gray-900 p-4 rounded-lg border border-gray-300 flex items-center justify-between font-semibold mt-2">
              <div className="text-sm font-semibold flex-1">Total Project Revenue</div>
              <div className="flex gap-8 items-center">
                <div className="text-right">
                  <div className="text-xs opacity-70 mb-1 uppercase">Planned</div>
                  <div id="revenueSubtotalPlanned" className="text-2xl font-bold">$0</div>
                </div>
                <div className="text-right">
                  <div className="text-xs opacity-70 mb-1 uppercase">Actual</div>
                  <div id="revenueSubtotalActual" className="text-2xl font-bold">$0</div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-base font-semibold mb-3 text-gray-900">Project Costs</h3>
          <div className="flex flex-col gap-3">
            <div className="bg-gray-50 text-gray-900 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
              <div className="text-sm font-medium flex-1 text-black">Project Hours & Costs</div>
              <div className="flex gap-8 items-center">
                <div className="text-right">
                  <div className="text-xs opacity-60 mb-1 uppercase">Planned</div>
                  <div id="projectHoursPlanned" className="text-xl font-bold">$81,500</div>
                </div>
                <div className="text-right">
                  <div className="text-xs opacity-60 mb-1 uppercase">Actual</div>
                  <div id="projectHoursActual" className="text-xl font-bold">$83,150</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 text-gray-900 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
              <div className="text-sm font-medium flex-1 text-black">Subcontractor Costs</div>
              <div className="flex gap-8 items-center">
                <div className="text-right">
                  <div className="text-xs opacity-60 mb-1 uppercase">Planned</div>
                  <div id="subcontractorCostPlanned" className="text-xl font-bold">$66,000</div>
                </div>
                <div className="text-right">
                  <div className="text-xs opacity-60 mb-1 uppercase">Actual</div>
                  <div id="subcontractorCostActual" className="text-xl font-bold">$65,500</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 text-gray-900 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
              <div className="text-sm font-medium flex-1 text-black">Additional Project Costs</div>
              <div className="flex gap-8 items-center">
                <div className="text-right">
                  <div className="text-xs opacity-60 mb-1 uppercase">Planned</div>
                  <div id="additionalProjectCostsPlanned" className="text-xl font-bold">$17,000</div>
                </div>
                <div className="text-right">
                  <div className="text-xs opacity-60 mb-1 uppercase">Actual</div>
                  <div id="additionalProjectCostsActual" className="text-xl font-bold">$16,950</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 text-gray-900 p-4 rounded-lg border border-gray-300 flex items-center justify-between font-semibold mt-2">
              <div className="text-sm font-semibold flex-1">Total Project Costs</div>
              <div className="flex gap-8 items-center">
                <div className="text-right">
                  <div className="text-xs opacity-70 mb-1 uppercase">Planned</div>
                  <div id="costsSubtotalPlanned" className="text-2xl font-bold">$0</div>
                </div>
                <div className="text-right">
                  <div className="text-xs opacity-70 mb-1 uppercase">Actual</div>
                  <div id="costsSubtotalActual" className="text-2xl font-bold">$0</div>
                </div>
              </div>
            </div>
            <div id="projectMarginBox" className="p-4 rounded-lg flex items-center justify-between">
              <div className="text-sm font-medium flex-1">Project Margin</div>
              <div className="flex gap-8 items-center">
                <div className="text-right">
                  <div className="text-xs opacity-80 mb-1 uppercase">Planned</div>
                  <div id="projectMarginPlanned" className="text-xl font-bold">$0</div>
                </div>
                <div className="text-right">
                  <div className="text-xs opacity-80 mb-1 uppercase">Actual</div>
                  <div id="projectMarginValue" className="text-xl font-bold">$0</div>
                </div>
              </div>
            </div>
            <div id="marginPercentBox" className="p-4 rounded-lg flex items-center justify-between">
              <div className="text-sm font-medium flex-1">Margin %</div>
              <div className="flex gap-8 items-center">
                <div className="text-right">
                  <div className="text-xs opacity-80 mb-1 uppercase">Planned</div>
                  <div id="marginPercentPlanned" className="text-xl font-bold">0%</div>
                </div>
                <div className="text-right">
                  <div className="text-xs opacity-80 mb-1 uppercase">Actual</div>
                  <div id="marginPercentActual" className="text-xl font-bold">0%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingTab;
