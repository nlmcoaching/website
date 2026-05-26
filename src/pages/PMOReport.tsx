// @ts-nocheck
import React from 'react';

// PMO Report Data - Inlined to avoid import issues
const pmoReportData = {
  reportDate: "7/14/2025",
  confirmationDeadline: "August 1, 2025",
  schedulingKPI: {
    weeks: [
      {
        period: "7/21 – 7/25",
        firmHours: 144,
        tentativeHours: 8,
        openHours: 8,
        totalSchedulableHours: 160
      },
      {
        period: "7/28 – 8/1",
        firmHours: 64,
        tentativeHours: 16,
        openHours: 80,
        totalSchedulableHours: 160
      }
    ],
    totals: {
      firmHours: 208,
      tentativeHours: 24,
      openHours: 88
    },
    openTentative: {
      total: 112,
      percentage: "29%"
    }
  },
  backlogReview: {
    fill: [
      "7/15 – Dominic",
      "7/16 AM – Dominic",
      "7/17 – 7/19 – Freddy"
    ],
    confirm: [
      "7/5 – Freddy – McGrath – WebEx Migration – Cutover Prep",
      "7/9 – Craig – Personalis – Staff Aug",
      "7/22 – 7/25 – Dominic – El Camino Health – Switch Refresh - Configuration"
    ]
  },
  budgetReview: {
    fixedFee: [
      {
        projectName: "Hitachi Data Center Migration",
        projectManager: "Natalie Higgins",
        budgetHours: 320,
        actualHours: 245,
        scheduledHours: 280,
        remainingHours: 75,
        estimateToComplete: 80,
        nextActions: "Complete failover testing by 7/26"
      },
      {
        projectName: "Fremont Bank Azure Deployment",
        projectManager: "Rebekah Mixon",
        budgetHours: 200,
        actualHours: 180,
        scheduledHours: 195,
        remainingHours: 20,
        estimateToComplete: 25,
        nextActions: "Finalize security review"
      }
    ],
    timeAndMaterials: [
      {
        projectName: "EECU Intune Deployment",
        projectManager: "Natalie Higgins",
        budgetHours: 150,
        actualHours: 120,
        scheduledHours: 140,
        remainingHours: 30,
        estimateToComplete: 35,
        nextActions: "Schedule user training sessions"
      },
      {
        projectName: "LP Entra ID Ph2",
        projectManager: "Rebekah Mixon",
        budgetHours: 180,
        actualHours: 165,
        scheduledHours: 175,
        remainingHours: 15,
        estimateToComplete: 20,
        nextActions: "Review integration points"
      }
    ]
  },
  projectsClosing: {
    thisWeek: [
      {
        projectName: "LP Livermore Project",
        projectManager: "Rebekah Mixon",
        remainingHours: 2,
        estimateToComplete: 2,
        estimatedCloseDate: "7/18/2025",
        nextActions: "Final sign-off and project closure"
      }
    ],
    nextWeek: [
      {
        projectName: "CoH WebEx Migration",
        projectManager: "Natalie Higgins",
        remainingHours: 5,
        estimateToComplete: 5,
        estimatedCloseDate: "7/25/2025",
        nextActions: "Final documentation and handoff"
      },
      {
        projectName: "Barton Cutover",
        projectManager: "Rebekah Mixon",
        remainingHours: 5,
        estimateToComplete: 5,
        estimatedCloseDate: "7/26/2025",
        nextActions: "Complete cutover verification"
      }
    ]
  },
  upcomingCutoverReview: [
    {
      date: "7/26",
      project: "Dominic",
      description: "Hitachi - Data Center Project - Failover Testing"
    },
    {
      date: "7/27",
      project: "Craig",
      description: "ECH - Switch Refresh - Cutover"
    },
    {
      date: "8/1",
      project: "Craig",
      description: "ECH - Switch Refresh - Cutover"
    }
  ],
  activeSubcontractors: [
    {
      name: "Morgan Stepp",
      projects: [
        "7/7 - CoH – WebEx Migration - Cutover",
        "7/9 - Fremonth Bank - Staff Aug"
      ]
    },
    {
      name: "Brandon Langford",
      projects: [
        "7/9 - Frank Rimmerman – Exchange Decommission - Prep Steps",
        "7/10  - EECU – Intune Deployment - Configure Policies",
        "7/11 - LP – Entra ID Ph2 - Stop Entra Connect service"
      ]
    },
    {
      name: "Saad Jilani",
      projects: [
        "7/8 - Fremont Bank – Azure Deployment",
        "7/10 - Hitachi – Data Center Migration - Switch Configuration"
      ]
    }
  ],
  subcontractorsScheduledThisWeek: [
    {
      date: "7/7",
      time: "",
      name: "Morgan Stepp",
      customerName: "Customer Name",
      projectName: "Project Name",
      description: "Description"
    },
    {
      date: "7/8",
      time: "AM",
      name: "Morgan Stepp",
      customerName: "Customer Name",
      projectName: "Project Name",
      description: "Description"
    },
    {
      date: "7/9",
      time: "",
      name: "Morgan Stepp",
      customerName: "Customer Name",
      projectName: "Project Name",
      description: "Description"
    },
    {
      date: "7/9",
      time: "",
      name: "Brandon Langford",
      customerName: "Customer Name",
      projectName: "Project Name",
      description: "Description"
    },
    {
      date: "7/10",
      time: "AM",
      name: "Morgan Stepp",
      customerName: "Customer Name",
      projectName: "Project Name",
      description: "Description"
    },
    {
      date: "7/10",
      time: "",
      name: "Brandon Langford",
      customerName: "Customer Name",
      projectName: "Project Name",
      description: "Description"
    }
  ]
};

/**
 * PMO Report Page Component
 * Displays a comprehensive Project Management Office report with scheduling KPIs,
 * backlog review, budget information, and subcontractor details.
 */
const PMOReport: React.FC = () => {
  const { 
    reportDate, 
    confirmationDeadline, 
    schedulingKPI, 
    backlogReview, 
    budgetReview,
    projectsClosing,
    upcomingCutoverReview,
    activeSubcontractors,
    subcontractorsScheduledThisWeek
  } = pmoReportData;

  // Parse percentage for Open/Tentative color coding
  const openTentativePercentage = parseFloat(schedulingKPI.openTentative.percentage.replace('%', ''));
  const openTentativeColorClass = openTentativePercentage < 21 ? 'text-green-600' : 'text-red-600';
  const openTentativeRowColorClass = openTentativePercentage > 20 ? 'text-red-600' : '';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Project Management Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            {reportDate}
          </p>
        </div>

        {/* Scheduling KPI and Backlog Review Sections */}
        <div className="flex gap-6 mb-6">
          {/* PMO Scheduling KPI Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex-1">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            Scheduling KPI
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Week of
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-900 uppercase tracking-wider">
                    # of Confirmed Hours
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-900 uppercase tracking-wider">
                    # of Tentative Hours
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-900 uppercase tracking-wider">
                    # of Open Hours
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Total Schedulable Hours
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schedulingKPI.weeks.map((week, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {week.period}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">
                      {week.firmHours}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">
                      {week.tentativeHours}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">
                      {week.openHours}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">
                      {week.totalSchedulableHours}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    Total
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">
                    {schedulingKPI.totals.firmHours}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">
                    {schedulingKPI.totals.tentativeHours}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">
                    {schedulingKPI.totals.openHours}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">
                    {schedulingKPI.weeks.reduce((sum, week) => sum + week.totalSchedulableHours, 0)}
                  </td>
                </tr>
                <tr className={`bg-yellow-50 font-bold ${openTentativeRowColorClass}`}>
                  <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${openTentativeRowColorClass || 'text-gray-900'}`}>
                    Open/Tentative
                  </td>
                  <td colSpan={4} className={`px-4 py-3 whitespace-nowrap text-sm text-right ${openTentativeRowColorClass || 'text-gray-900'}`}>
                    <span>{schedulingKPI.openTentative.total}</span>
                    <span className={`ml-2 ${openTentativePercentage > 20 ? 'text-red-600' : openTentativeColorClass}`}>({schedulingKPI.openTentative.percentage})</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>

          {/* Backlog Review Section */}
          <div className={`${openTentativePercentage > 20 ? 'bg-red-50' : 'bg-green-50'} rounded-lg shadow-sm border border-gray-200 p-6 flex-1`}>
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              Backlog Review
            </h2>
            <p className="text-sm text-gray-900 mb-4 pl-2 font-bold">
              PS Engineer's schedules/calendars should be confirmed through August 1, 2025.
            </p>
            
            {/* Fill Items */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Fill</h3>
              <ol className="list-decimal list-inside space-y-2">
                {backlogReview.fill.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700 pl-2">
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            {/* Confirm Items */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Confirm</h3>
              <ol className="list-decimal list-inside space-y-2">
                {backlogReview.confirm.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700 pl-2">
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Active Subcontractors and Upcoming Cutover Review Sections */}
        <div className="flex gap-6 mb-6">
          {/* Active Subcontractors Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex-1">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              Active Subcontractors
            </h2>
            <ol className="list-decimal list-inside space-y-4">
              {activeSubcontractors.map((subcontractor, index) => (
                <li key={index} className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">{subcontractor.name}</span>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    {subcontractor.projects.map((project, pIndex) => (
                      <li key={pIndex} className="text-gray-600">{project}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>

          {/* Upcoming Cutover Review Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex-1">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              Upcoming Cutovers
            </h2>
            <ul className="space-y-2">
              {upcomingCutoverReview.map((item, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>
                    <strong>{item.date}</strong> - {item.project} - {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Projects Closing Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-600 mb-6">
            Projects Closing
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Project Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Project Manager
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Estimated Close Date
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Remaining Hours
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Estimate to Complete
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider min-w-[250px]">
                    Next Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* This Week Section */}
                <tr>
                  <td colSpan={6} className="px-4 py-3 bg-gray-100">
                    <h3 className="text-xl text-gray-700 font-medium">This Week</h3>
                  </td>
                </tr>
                {projectsClosing.thisWeek.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-3 text-sm text-gray-500 italic">
                      No projects closing this week
                    </td>
                  </tr>
                ) : (
                  projectsClosing.thisWeek.map((project, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {project.projectName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {project.projectManager}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                        {project.estimatedCloseDate}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                        {project.remainingHours}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                        {project.estimateToComplete}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 min-w-[250px]">
                        {project.nextActions}
                      </td>
                    </tr>
                  ))
                )}
                
                {/* Next Week Section */}
                <tr>
                  <td colSpan={6} className="px-4 py-3 bg-gray-100">
                    <h3 className="text-xl text-gray-700 font-medium">Next Week</h3>
                  </td>
                </tr>
                {projectsClosing.nextWeek.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-3 text-sm text-gray-500 italic">
                      No projects closing next week
                    </td>
                  </tr>
                ) : (
                  projectsClosing.nextWeek.map((project, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {project.projectName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {project.projectManager}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                        {project.estimatedCloseDate}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                        {project.remainingHours}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                        {project.estimateToComplete}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 min-w-[250px]">
                        {project.nextActions}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Budget Review Section */}
        {/* Budget Review Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-600 mb-6">
            Budget Review
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Project Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Project Manager
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Budget Hours
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Actual Hours
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Scheduled Hours
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Remaining Hours
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Estimate to Complete
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Next Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Fixed Fee Section */}
                <tr>
                  <td colSpan={8} className="px-4 py-3 bg-gray-100">
                    <h3 className="text-xl text-gray-700 font-medium">Fixed Fee</h3>
                  </td>
                </tr>
                {budgetReview.fixedFee.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-3 text-sm text-gray-500 italic">
                      No items
                    </td>
                  </tr>
                ) : (
                  budgetReview.fixedFee.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {item.projectName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {item.projectManager}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                        {item.budgetHours}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                        {item.actualHours}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                        {item.scheduledHours}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                        {item.remainingHours}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                        {item.estimateToComplete}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {item.nextActions}
                      </td>
                    </tr>
                  ))
                )}
                
                {/* Time & Materials Section */}
                <tr>
                  <td colSpan={8} className="px-4 py-3 bg-gray-100">
                    <h3 className="text-xl text-gray-700 font-medium">Time & Materials</h3>
                  </td>
                </tr>
                {budgetReview.timeAndMaterials.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-3 text-sm text-gray-500 italic">
                      No items
                    </td>
                  </tr>
                ) : (
                  budgetReview.timeAndMaterials.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {item.projectName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {item.projectManager}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                        {item.budgetHours}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                        {item.actualHours}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                        {item.scheduledHours}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                        {item.remainingHours}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                        {item.estimateToComplete}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {item.nextActions}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PMOReport;

