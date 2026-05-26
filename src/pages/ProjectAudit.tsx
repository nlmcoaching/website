// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import './ProjectAudit.css';

interface ProjectData {
  projectName: string;
  customer: string;
  status: string;
  budget: number;
  revenue: number;
  actualCost: number;
  margin: number;
  estimatedMargin: number;
  hours: number;
  budgetHours: number;
  completion: number;
  risk: string;
  lpPSRevenue: number;
  riskRevenue: number;
  contractorRevenue: number;
  lpPSCost: number;
  contractorCost: number;
  engineeringHours: number;
  engineeringAfterHours: number;
  projectManagementHours: number;
  actualEngineeringHours: number;
  actualEngineeringAfterHours: number;
  actualProjectManagementHours: number;
}

const ProjectAudit = () => {
  const [projectData, setProjectData] = useState<ProjectData[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const chartRefs = {
    revenueChart: useRef<HTMLCanvasElement>(null),
    marginChart: useRef<HTMLCanvasElement>(null),
    budgetChart: useRef<HTMLCanvasElement>(null)
  };
  const chartInstances = useRef<{ [key: string]: Chart }>({});
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleFileUpload = (file: File) => {
    setLoading(true);
    setError(null);
    setDateRange(''); // Reset date range

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (fileExtension === 'csv') {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          if (results.data && results.data.length > 0) {
            // Extract date range from the first row
            const firstRow = results.data[0] as any;
            const dateRangeValue = firstRow['Date Range'] || '';
            if (dateRangeValue) {
              setDateRange(dateRangeValue);
            }
            processData(results.data);
          } else {
            setError('No data found in the file');
          }
          setLoading(false);
        },
        error: (error) => {
          setError('Error parsing CSV: ' + error.message);
          setLoading(false);
        }
      });
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet);
          
          if (jsonData && jsonData.length > 0) {
            // Extract date range from the first row
            const firstRow = jsonData[0] as any;
            const dateRangeValue = firstRow['Date Range'] || '';
            if (dateRangeValue) {
              setDateRange(dateRangeValue);
            }
            processData(jsonData);
          } else {
            setError('No data found in the file');
          }
        } catch (error) {
          setError('Error parsing Excel file: ' + (error as Error).message);
        }
        setLoading(false);
      };
      reader.onerror = () => {
        setError('Error reading file');
        setLoading(false);
      };
      reader.readAsArrayBuffer(file);
    } else {
      setError('Unsupported file format. Please upload a CSV or Excel file.');
      setLoading(false);
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          if (results.errors.length > 0) {
            console.warn('CSV parsing warnings:', results.errors);
          }
          
          if (!results.data || results.data.length === 0) {
            setError('No data found in the file.');
            return;
          }

          const validatedData = validateAndProcessData(results.data);
          if (validatedData.length === 0) {
            setError('No valid project data found. Please check your file format.');
            return;
          }

          setProjectData(validatedData);
          analyzeData(validatedData);
        } catch (error) {
          setError('Error processing CSV data: ' + (error as Error).message);
        } finally {
          setLoading(false);
        }
      },
      error: (error) => {
        setError('CSV parsing failed: ' + error.message);
        setLoading(false);
      }
    });
  };

  const parseExcel = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { defval: null });
        
        if (!jsonData || jsonData.length === 0) {
          setError('No data found in the Excel file.');
          return;
        }

        const validatedData = validateAndProcessData(jsonData);
        if (validatedData.length === 0) {
          setError('No valid project data found. Please check your file format.');
          return;
        }

        setProjectData(validatedData);
        analyzeData(validatedData);
      } catch (error) {
        setError('Excel parsing error: ' + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    reader.onerror = () => {
      setError('File reading error. Please try again.');
      setLoading(false);
    };
    reader.readAsArrayBuffer(file);
  };

  const validateAndProcessData = (data: any[]): ProjectData[] => {
    const processedData: ProjectData[] = [];
    
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const processed: ProjectData = {
        projectName: getFieldValue(row, ['Project Name', 'Opportunity name', 'project_name', 'projectname']) || `Project ${i + 1}`,
        customer: getFieldValue(row, ['Customer Name', 'customer', 'client']) || `Client ${i + 1}`,
        status: 'Active',
        budget: parseNumber(getFieldValue(row, ['Budget', 'Total Budget', 'budget'])),
        revenue: parseNumber(getFieldValue(row, ['Revenue', 'Total Revenue', 'revenue'])),
        actualCost: parseNumber(getFieldValue(row, ['Actual Cost', 'Total Cost', 'cost'])),
        margin: parseNumber(getFieldValue(row, ['Margin', 'Profit Margin', 'margin'])),
        estimatedMargin: parseNumber(getFieldValue(row, ['Estimated Margin', 'Expected Margin'])),
        hours: parseNumber(getFieldValue(row, ['Hours', 'Total Hours', 'hours'])),
        budgetHours: parseNumber(getFieldValue(row, ['Budget Hours', 'Planned Hours'])),
        completion: parseNumber(getFieldValue(row, ['Completion', 'Progress', 'completion'])),
        risk: getFieldValue(row, ['Risk Level', 'Risk', 'risk']) || 'Medium',
        lpPSRevenue: parseNumber(getFieldValue(row, ['LP PS Revenue'])),
        riskRevenue: parseNumber(getFieldValue(row, ['Risk Revenue'])),
        contractorRevenue: parseNumber(getFieldValue(row, ['Contractor Revenue'])),
        lpPSCost: parseNumber(getFieldValue(row, ['LP PS Cost'])),
        contractorCost: parseNumber(getFieldValue(row, ['Contractor Cost'])),
        engineeringHours: parseNumber(getFieldValue(row, ['Engineering Hours'])),
        engineeringAfterHours: parseNumber(getFieldValue(row, ['Engineering After Hours'])),
        projectManagementHours: parseNumber(getFieldValue(row, ['Project Management Hours'])),
        actualEngineeringHours: parseNumber(getFieldValue(row, ['Actual Engineering Hours'])),
        actualEngineeringAfterHours: parseNumber(getFieldValue(row, ['Actual Engineering After Hours'])),
        actualProjectManagementHours: parseNumber(getFieldValue(row, ['Actual Project Management Hours']))
      };
      
      processedData.push(processed);
    }
    
    return processedData;
  };

  const getFieldValue = (row: any, possibleKeys: string[]): any => {
    for (const key of possibleKeys) {
      if (row[key] !== null && row[key] !== undefined && row[key] !== '') {
        return row[key];
      }
    }
    return null;
  };

  const parseNumber = (value: any): number => {
    if (value === null || value === undefined || value === '') {
      return 0;
    }
    if (typeof value === 'number') {
      return isNaN(value) ? 0 : value;
    }
    if (typeof value === 'string') {
      const cleaned = value.replace(/[$,\s]/g, '');
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  const analyzeData = (data: ProjectData[]) => {
    let totalProjects = data.length;
    let totalBudget = 0;
    let totalMargin = 0;
    let totalLPPSRevenue = 0;
    let totalRiskRevenue = 0;
    let totalContractorRevenue = 0;
    let totalLPPSCost = 0;
    let totalContractorCost = 0;

    data.forEach(project => {
      totalBudget += project.budget || 0;
      totalMargin += project.margin || 0;
      totalLPPSRevenue += project.lpPSRevenue || 0;
      totalRiskRevenue += project.riskRevenue || 0;
      totalContractorRevenue += project.contractorRevenue || 0;
      totalLPPSCost += project.lpPSCost || 0;
      totalContractorCost += project.contractorCost || 0;
    });

    const totalRevenue = totalLPPSRevenue + totalRiskRevenue + totalContractorRevenue;
    const totalCosts = totalLPPSCost + totalContractorCost;
    const totalMarginPercentage = totalRevenue > 0 ? (totalMargin / totalRevenue * 100) : 0;

    const statsGrid = document.getElementById('statsGrid');
    if (statsGrid) {
      statsGrid.innerHTML = '';
      
      const cards = [
        { value: totalProjects, label: 'Total Projects' },
        { value: `$${formatNumber(totalRevenue)}`, label: 'Revenue' },
        { value: `$${formatNumber(totalCosts)}`, label: 'Costs' },
        { value: `$${formatNumber(totalMargin)}`, label: 'Total Margin' },
        { value: `${totalMarginPercentage.toFixed(1)}%`, label: 'Total Margin %' }
      ];
      
      cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'stat-card';
        
        const valueDiv = document.createElement('div');
        valueDiv.className = 'stat-value';
        valueDiv.textContent = card.value.toString();
        
        const labelDiv = document.createElement('div');
        labelDiv.className = 'stat-label';
        labelDiv.textContent = card.label;
        
        cardDiv.appendChild(valueDiv);
        cardDiv.appendChild(labelDiv);
        statsGrid.appendChild(cardDiv);
      });
    }

    try {
      generateStatistics(data);
      createCharts(data);
      createDataTable(data);
    } catch (error) {
      setError('Error analyzing data: ' + (error as Error).message);
    }
  };

  const generateStatistics = (data: ProjectData[]) => {
    const totalProjects = data.length;
    const totalBudget = data.reduce((sum, project) => sum + project.budget, 0);
    const totalLPPSCost = data.reduce((sum, project) => sum + (project.lpPSCost || 0), 0);
    const totalContractorCost = data.reduce((sum, project) => sum + (project.contractorCost || 0), 0);
    const totalRevenue = data.reduce((sum, project) => sum + project.revenue, 0);
    const totalCosts = totalLPPSCost + totalContractorCost;
    const totalMargin = totalRevenue - totalCosts;
    const onBudgetProjects = data.filter(project => project.actualCost <= project.budget).length;
    
    const totalMarginPercentage = totalRevenue > 0 ? (totalMargin / totalRevenue * 100) : 0;
    
    const statsGrid = document.getElementById('statsGrid');
    if (statsGrid) {
      statsGrid.innerHTML = '';
      
      const cards = [
        { value: totalProjects, label: 'Total Projects' },
        { value: `$${formatNumber(totalRevenue)}`, label: 'Revenue' },
        { value: `$${formatNumber(totalCosts)}`, label: 'Costs' },
        { value: `$${formatNumber(totalMargin)}`, label: 'Total Margin' },
        { value: `${totalMarginPercentage.toFixed(1)}%`, label: 'Total Margin %' }
      ];
      
      cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'stat-card';
        
        const valueDiv = document.createElement('div');
        valueDiv.className = 'stat-value';
        valueDiv.textContent = card.value.toString();
        
        const labelDiv = document.createElement('div');
        labelDiv.className = 'stat-label';
        labelDiv.textContent = card.label;
        
        cardDiv.appendChild(valueDiv);
        cardDiv.appendChild(labelDiv);
        statsGrid.appendChild(cardDiv);
      });
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return Math.round(num / 1000000) + 'M';
    } else if (num >= 1000) {
      return Math.round(num / 1000) + 'K';
    }
    return Math.round(num).toString();
  };

  const createCharts = (data: ProjectData[]) => {
    if (!chartRefs.revenueChart.current || !chartRefs.marginChart.current || !chartRefs.budgetChart.current) {
      return;
    }

    // Destroy existing charts
    Object.values(chartInstances.current).forEach(chart => chart.destroy());
    chartInstances.current = {};

    // Calculate totals
    const totalRevenue = data.reduce((sum, project) => sum + (project.revenue || 0), 0);
    const totalLPPSCost = data.reduce((sum, project) => sum + (project.lpPSCost || 0), 0);
    const totalContractorCost = data.reduce((sum, project) => sum + (project.contractorCost || 0), 0);
    const totalCosts = totalLPPSCost + totalContractorCost;
    const totalEstimatedMargin = data.reduce((sum, project) => sum + (project.estimatedMargin || 0), 0);
    const totalRealizedMargin = data.reduce((sum, project) => sum + (project.margin || 0), 0);

    // Revenue vs Costs Chart
    const revenueCtx = chartRefs.revenueChart.current.getContext('2d');
    if (revenueCtx) {
      chartInstances.current.revenueChart = new Chart(revenueCtx, {
        type: 'bar',
        data: {
          labels: ['Total Revenue', 'Total Costs'],
          datasets: [{
            data: [totalRevenue, totalCosts],
            backgroundColor: ['#2563eb', '#6b7280'],
            borderRadius: 8,
            barThickness: 60
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `$${context.parsed.y.toLocaleString()}`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => `$${formatNumber(Number(value))}`,
                font: {
                  size: 12
                }
              },
              grid: {
                color: '#e5e7eb'
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: 12
                }
              }
            }
          }
        }
      });
    }

    // Margin Chart
    chartInstances.current.marginChart = new Chart(chartRefs.marginChart.current, {
      type: 'bar',
      data: {
        labels: ['Estimated Margin', 'Realized Margin'],
        datasets: [{
          data: [totalEstimatedMargin, totalRealizedMargin],
          backgroundColor: ['#3b82f6', '#1e40af'],
          borderRadius: {
            topLeft: 8,
            topRight: 8,
            bottomLeft: 8,
            bottomRight: 8
          }
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `$${context.parsed.y.toLocaleString()}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `$${formatNumber(Number(value))}`
            }
          }
        }
      }
    });

    // Budget vs Actual Hours Chart
    const displayData = data
      .filter(project => (parseNumber(project.actualEngineeringHours) || 0) > 0)
      .slice(0, Math.min(10, data.length));
    
    console.log('Display Data:', displayData.map(project => ({
      name: project.projectName,
      actualHours: project.actualEngineeringHours
    })));
    
    chartInstances.current.budgetChart = new Chart(chartRefs.budgetChart.current, {
      type: 'bar',
      data: {
        labels: displayData.map(project => project.projectName),
        datasets: [
          {
            label: 'Budget Hours',
            data: displayData.map(project => {
              const engHours = parseNumber(project.engineeringHours) || 0;
              const engAfterHours = parseNumber(project.engineeringAfterHours) || 0;
              const pmHours = parseNumber(project.projectManagementHours) || 0;
              return engHours + engAfterHours + pmHours;
            }),
            backgroundColor: '#2563eb',
            borderRadius: 4
          },
          {
            label: 'Actual Engineering Hours - Standard',
            data: displayData.map(project => {
              const hours = parseNumber(project.actualEngineeringHours) || 0;
              console.log(`Project ${project.projectName} actual hours:`, hours);
              return hours;
            }),
            backgroundColor: '#6b7280',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || '';
                const value = context.parsed.y;
                return `${label}: ${value.toLocaleString()} hours`;
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            ticks: {
              maxRotation: 45,
              minRotation: 45,
              maxTicksLimit: 10
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Hours'
            }
          }
        }
      }
    });
  };

  const createDataTable = (data: ProjectData[]) => {
    const container = document.getElementById('dataTableContainer');
    if (!container) return;

    const table = document.createElement('table');
    table.className = 'data-table';
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Project Name', 'Budget', 'Actual Cost', 'Realized Margin', 'Estimated Margin', 'Budget Variance'];
    
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body
    const tbody = document.createElement('tbody');
    data.forEach((project, index) => {
        const row = document.createElement('tr');
        row.className = 'clickable-row';
        
        // Add click event listener
        row.addEventListener('click', () => {
            setSelectedProject(project);
            setShowModal(true);
        });
        
        const budget = project.budget || 0;
        const actualCost = project.actualCost || 0;
        const variance = budget > 0 ? ((actualCost - budget) / budget * 100) : 0;
        const varianceColor = actualCost > budget ? '#dc2626' : '#16a34a';
        
        const cells = [
            project.projectName || 'Project ' + (index + 1),
            '$' + formatNumber(budget),
            '$' + formatNumber(actualCost),
            '$' + formatNumber(project.margin || 0),
            '$' + formatNumber(project.estimatedMargin || 0),
            variance.toFixed(1) + '%'
        ];
        
        cells.forEach((cell, i) => {
            const td = document.createElement('td');
            td.textContent = cell;
            if (i === 5) { // Budget variance column
                td.style.color = varianceColor;
            }
            row.appendChild(td);
        });
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    container.innerHTML = '';
    container.appendChild(table);
  };

  const handleRowClick = (project: ProjectData) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const generatePDF = (project: ProjectData) => {
    const doc = new jsPDF();
    const projectName = project.projectName;
    
    // Title
    doc.setFontSize(20);
    doc.text('PROJECT AUDIT REPORT', 20, 30);
    
    // Project name
    doc.setFontSize(16);
    doc.text(projectName, 20, 50);
    
    // Date
    doc.setFontSize(10);
    doc.text('Generated: ' + new Date().toLocaleDateString(), 20, 60);
    
    // Project details
    doc.setFontSize(12);
    let yPosition = 80;
    const lineHeight = 10;
    
    const details = [
      'Customer: ' + project.customer,
      'Status: ' + project.status,
      'Total Revenue: $' + project.revenue.toLocaleString(),
      'Actual Cost: $' + project.actualCost.toLocaleString(),
      'Profit Margin: $' + project.margin.toLocaleString(),
      'Budget: $' + project.budget.toLocaleString(),
      'Total Hours: ' + project.hours.toLocaleString(),
      'Budget Hours: ' + project.budgetHours.toLocaleString(),
      'Completion: ' + Math.round(project.completion) + '%',
      'Risk Level: ' + project.risk
    ];
    
    details.forEach(detail => {
      doc.text(detail, 20, yPosition);
      yPosition += lineHeight;
    });
    
    // Budget variance calculation
    const budget = project.budget;
    const actualCost = project.actualCost;
    const budgetVariance = budget > 0 ? ((actualCost - budget) / budget * 100) : 0;
    
    yPosition += 10;
    doc.setFontSize(14);
    doc.text('Budget Variance: ' + budgetVariance.toFixed(1) + '%', 20, yPosition);
    
    const filename = projectName.replace(/[^a-zA-Z0-9\s]/g, '_') + '_audit.pdf';
    doc.save(filename);
  };

  const processData = (data: any[]) => {
    try {
      const processedData = data.map(row => {
        // Extract date range from the data
        const dateRangeValue = row['Date Range'] || '';
        if (dateRangeValue) {
          setDateRange(dateRangeValue);
        }

        return {
          projectName: row['Project Name'] || row['Opportunity name'] || 'Unnamed Project',
          customer: row['Customer Name'] || row['customer'] || 'Unknown Customer',
          status: row['Status'] || 'Active',
          budget: parseNumber(row['Total Project Revenue Billed']) || 0,
          revenue: parseNumber(row['Total Project Revenue Billed']) || 0,
          actualCost: parseNumber(row['Actual Cost']) || 0,
          margin: parseNumber(row['Realized Margin']) || 0,
          estimatedMargin: parseNumber(row['Anticipated Margin']) || 0,
          hours: parseNumber(row['Total Hours']) || 0,
          budgetHours: parseNumber(row['Budget Hours']) || 0,
          completion: parseNumber(row['Completion']) || 0,
          risk: row['Risk'] || 'Medium',
          lpPSRevenue: parseNumber(row['LP PS Revenue']) || 0,
          riskRevenue: parseNumber(row['Risk Revenue']) || 0,
          contractorRevenue: parseNumber(row['Contractor Revenue']) || 0,
          lpPSCost: parseNumber(row['LP PS Cost']) || 0,
          contractorCost: parseNumber(row['Contractor Cost']) || 0,
          engineeringHours: parseNumber(row['Engineering Hours – Standard']) || 0,
          engineeringAfterHours: parseNumber(row['Engineering Hours – After Hours']) || 0,
          projectManagementHours: parseNumber(row['Project Management Hours']) || 0,
          actualEngineeringHours: parseNumber(row['Actual Engineering Hours – Standard']) || 0,
          actualEngineeringAfterHours: parseNumber(row['Actual Engineering Hours – After Hours']) || 0,
          actualProjectManagementHours: parseNumber(row['Actual Project Management Hours']) || 0
        };
      });

      setProjectData(processedData);
      analyzeData(processedData);
    } catch (error) {
      setError('Error processing data: ' + (error as Error).message);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Project Audit Analyzer</h1>
        <p>Upload project audit data to get comprehensive project performance insights</p>
      </div>

      <div className="upload-section">
        <div 
          className={`upload-zone ${isDragging ? 'dragover' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <div className="upload-text">Drop your project audit file here</div>
          <div className="upload-hint">Supports CSV, Excel (.xlsx, .xls) files</div>
          <button className="btn">Choose File</button>
          <input 
            type="file" 
            id="fileInput" 
            className="file-input" 
            accept=".csv,.xlsx,.xls"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          />
        </div>
        {dateRange && (
          <div className="date-range">
            <strong>Date Range:</strong> {dateRange}
          </div>
        )}
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Analyzing your project data...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div id="analysisSection" className="analysis-section" style={{ display: projectData.length > 0 ? 'block' : 'none' }}>
        <h2>Project Performance Analysis</h2>
        
        <div id="statsGrid" className="stats-grid"></div>

        <div className="charts-grid">
          <div className="chart-container">
            <div className="chart-title">Total Revenue vs Total Costs</div>
            <canvas ref={chartRefs.revenueChart} className="chart-canvas"></canvas>
          </div>
          <div className="chart-container">
            <div className="chart-title">Total Estimated Margin vs Total Margin Realized</div>
            <canvas ref={chartRefs.marginChart} className="chart-canvas"></canvas>
          </div>
        </div>
        
        <div className="chart-container-full">
          <div className="chart-title">Budget Hours vs Actual Hours</div>
          <canvas ref={chartRefs.budgetChart} className="chart-canvas-full"></canvas>
        </div>

        <div>
          <h3>Detailed Project Data</h3>
          <p style={{ color: '#6b7280', fontStyle: 'italic', marginBottom: '15px' }}>
            Click on any project row to view detailed audit report
          </p>
          <div id="dataTableContainer"></div>
        </div>
      </div>

      {showModal && selectedProject && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="modal-close" onClick={closeModal}>×</span>
            <div>
              <h2>Project Audit Report</h2>
              <h3>{selectedProject.projectName}</h3>
              <button className="pdf-button" onClick={() => generatePDF(selectedProject)}>
                Save as PDF
              </button>
            </div>
            
            <div style={{ marginTop: '30px' }}>
              <h4>Project Summary</h4>
              <table className="data-table">
                <tbody>
                  <tr>
                    <td>Total Revenue</td>
                    <td>${formatNumber(selectedProject.revenue || 0)}</td>
                  </tr>
                  <tr>
                    <td>Actual Cost</td>
                    <td>${formatNumber(selectedProject.actualCost || 0)}</td>
                  </tr>
                  <tr>
                    <td>Profit Margin</td>
                    <td>${formatNumber(selectedProject.margin || 0)}</td>
                  </tr>
                  <tr>
                    <td>Budget Variance</td>
                    <td style={{ 
                      color: (selectedProject.actualCost || 0) > (selectedProject.budget || 0) ? '#dc2626' : '#16a34a'
                    }}>
                      {((selectedProject.actualCost || 0) - (selectedProject.budget || 0)) / (selectedProject.budget || 1) * 100}%
                    </td>
                  </tr>
                  <tr>
                    <td>Total Hours</td>
                    <td>{formatNumber(selectedProject.hours || 0)}</td>
                  </tr>
                  <tr>
                    <td>Completion</td>
                    <td>{selectedProject.completion || 0}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectAudit; 