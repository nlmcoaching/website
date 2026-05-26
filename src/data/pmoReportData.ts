// PMO Report Data
export const pmoReportData = {
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
      percentage: "35%"
    }
  },
  backlogReview: [
    "Fill Gap Dominic - 7/28 - 8/1",
    "Fill Craig Gap - 7/28 - 8/1",
    "Confirm Trevor - LP – Livermore - 7/28",
    "Confirm Freddy - COH – WebEx - 8/1",
    "Confirm Craig - Barton – Cutover - 7/22"
  ],
  budgetReview: {
    fixedFee: [],
    timeAndMaterials: []
  },
  projectsClosing: {
    thisWeek: "None",
    nextWeek: []
  },
  upcomingCutoverReview: [
    {
      date: "7/26",
      project: "Hitachi",
      description: "Failover Testing"
    }
  ],
  activeSubcontractors: [
    {
      name: "Morgan Stepp",
      projects: [
        "CoH – WebEx Migration",
        "Fremont Bank - Staff Aug"
      ]
    },
    {
      name: "Brandon",
      projects: [
        "Frank Rimmerman – Exchange Decommission",
        "EECU – Intune Deployment",
        "LP – Entra ID Ph2"
      ]
    },
    {
      name: "Saad Jilani",
      projects: [
        "Fremont Bank – Azure Deployment",
        "Hitachi – Data Center Migration"
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

