// @ts-nocheck
import React, { useState, useEffect } from 'react';
// Placeholder for company logo - using text instead of image
import { 
  Search, 
  Bell, 
  User, 
  Home, 
  Package, 
  Monitor, 
  MapIcon, 
  Settings, 
  LogOut,
  ChevronRight,
  CheckCircle,
  Clock,
  Truck,
  X,
  List,
  Calendar,
  Filter,
  Download,
  AlertTriangle,
  ArrowRight,
  Cloud,
  Shield,
  FileText,
  BarChart,
  Users,
  Tag,
  PieChart,
  Activity,
  Archive,
  Box,
  Layers,
  Clipboard,
  HelpCircle,
  ChevronDown,
  MessageSquare,
  Circle,
  ExternalLink,
  Info,
  Eye,
  Edit,
  Trash,
  UploadCloud,
  Plus,
  Zap,
  Coffee,
  Flag,
  Printer,
  DollarSign,
  FilePlus,
  HardDrive,
  Server,
  Wifi,
  PenTool,
  Smartphone,
  Sliders
} from 'lucide-react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

// Import the BoM Creator component
import BoMCreatorPage from './BoM-Creator-Page';
// Import the Project Audit component
import ProjectAudit from './ProjectAudit';
// Import the PMO Report component
import PMOReport from './PMOReport';
// Import the Billing Tab component
import BillingTab from './BillingTab';
// Import the PMO Dashboard component
import PMODashboardUpgrade from './PMODashboardUpgrade';

const PORTAL_PAGE_TITLES: Record<string, string> = {
  '/bom-creator': 'BoM Creator',
  '/project-audit': 'Project Audit',
  '/pmo-report': 'Project Management Dashboard',
  '/pmo-dashboard-upgrade': 'Project Dashboard',
  '/billing-tab': 'Billing Tab',
};

const CustomerPortal = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('bomCreator');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // Feedback form state
  const [feedbackData, setFeedbackData] = useState({
    category: '',
    description: '',
    contactBack: false
  });
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    title: 'IT Manager',
    site: 'headquarters',
    department: 'Information Technology'
  });

  useEffect(() => {
    const previousTitle = document.title;
    document.title = PORTAL_PAGE_TITLES[location.pathname] ?? 'LookingPoint Portal';
    return () => {
      document.title = previousTitle;
    };
  }, [location.pathname]);
  
  // Handle feedback form submission
  const handleFeedbackSubmit = () => {
    // Validation
    if (!feedbackData.description.trim()) {
      alert('Please provide a description for your feedback.');
      return;
    }
    
    // TODO: Submit feedback to backend
    console.log('Feedback submitted:', feedbackData);
    
    // Show success message
    alert('Thank you for your feedback! We appreciate your input and will review it carefully.');
    
    setFeedbackModalOpen(false);
    // Reset form
    setFeedbackData({
      category: '',
      description: '',
      contactBack: false
    });
  };
  
  // Handle profile form submission
  const handleProfileSubmit = () => {
    // Validation
    if (!profileData.firstName.trim() || !profileData.lastName.trim()) {
      alert('Please provide both first and last name.');
      return;
    }
    
    // TODO: Submit profile updates to backend
    console.log('Profile updated:', profileData);
    
    // Show success message
    alert('Your profile has been updated successfully!');
    
    setProfileModalOpen(false);
  };
  
  // Render the appropriate content based on the active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'bomCreator':
        return <BoMCreatorPage />;
      case 'projectAudit':
        return <ProjectAudit />;
      case 'pmoReport':
        return <PMOReport />;
      case 'billingTab':
        return <BillingTab />;
      case 'pmoDashboardUpgrade':
        return <PMODashboardUpgrade />;
      default:
        return <BoMCreatorPage />;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 max-w-[2200px] mx-auto">
          <div className="flex items-center">
            <div className="text-xl font-bold text-blue-600 mr-10">
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    C
                  </div>
                  <span className="ml-2 text-blue-600 font-bold">CompanyName</span>
                </div>
                <span className="text-xs italic text-gray-500 mt-0.5">Powered by LookingPoint</span>
              </div>
            </div>
            {/* Search input removed */}
          </div>
          <div className="flex items-center space-x-3">
            <button 
              type="button"
              className="p-1.5 rounded-full hover:bg-gray-100 relative"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            </button>
            <button 
              type="button"
              className="p-1.5 rounded-full hover:bg-gray-100"
              onClick={() => setHelpModalOpen(true)}
            >
              <HelpCircle className="h-5 w-5 text-gray-600" />
            </button>
            <div className="relative">
              <button 
                type="button"
                className="flex items-center" 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <span className="ml-2 text-sm font-medium hidden md:inline-block">Jeff Mason</span>
                <ChevronDown className="h-4 w-4 text-gray-500 ml-1 hidden md:block" />
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Jeff Mason</p>
                    <p className="text-xs text-gray-500">john.smith@company.com</p>
                  </div>
                  <button 
                    type="button"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center w-full text-left"
                    onClick={() => {setProfileModalOpen(true); setUserMenuOpen(false);}}
                  >
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    Your Profile
                  </button>
                  <div className="border-t border-gray-100 mt-1" />
                  <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <LogOut className="h-4 w-4 mr-2 text-gray-500" />
                    Sign out
                  </a>
                </div>
              )}
            </div>
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <List className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
        
        {/* Notifications dropdown */}
        {notificationsOpen && (
          <div className="absolute right-4 mt-1 w-80 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-20">
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between">
              <p className="text-sm font-medium text-gray-900">Notifications</p>
              <button className="text-xs text-blue-600">Mark all as read</button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <a href="/" className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                <div className="flex">
                  <div className="mr-3 mt-1">
                    <span className="inline-flex h-2 w-2 rounded-full bg-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Your order has shipped</p>
                    <p className="text-xs text-gray-500 mt-1">Order #ORD-2025042 shipped via FedEx</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>
              </a>
              <a href="/" className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                <div className="flex">
                  <div className="mr-3 mt-1">
                    <span className="inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Equipment warranty expiring</p>
                    <p className="text-xs text-gray-500 mt-1">3 network switches at HQ expiring in 30 days</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                  </div>
                </div>
              </a>
              <a href="/" className="block px-4 py-3 hover:bg-gray-50">
                <div className="flex">
                  <div className="mr-3 mt-1">
                    <span className="inline-flex h-2 w-2 rounded-full bg-gray-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Microsoft subscription renewed</p>
                    <p className="text-xs text-gray-500 mt-1">Your Microsoft 365 subscription has been renewed</p>
                    <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="px-4 py-2 border-t border-gray-100">
              <a href="/" className="text-sm text-blue-600 font-medium">View all notifications</a>
            </div>
          </div>
        )}
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block bg-white border-r border-gray-200 ${sidebarCollapsed ? 'w-16' : 'w-52 lg:w-56 xl:w-60'} flex-shrink-0 overflow-y-auto transition-all duration-300`}>
          <nav className="flex flex-col h-full p-4">
            {/* Collapse/Expand Button */}
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                )}
              </button>
            </div>
            
            <div className="space-y-1">
              <Link 
                to="/"
                className={`flex items-center px-3 py-2 rounded-md w-full ${activeTab === 'bomCreator' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'} ${sidebarCollapsed ? 'justify-center' : ''}`}
                                onClick={() => {setActiveTab('bomCreator'); setMobileMenuOpen(false);}}
                {...(sidebarCollapsed && { title: 'BoM Creator' })}
              >
                <FileText className="h-5 w-5" />
                {!sidebarCollapsed && (
                  <span className="font-medium ml-3">BoM Creator</span>
                )}
              </Link>

              <Link 
                to="/project-audit"
                className={`flex items-center px-3 py-2 rounded-md w-full ${activeTab === 'projectAudit' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'} ${sidebarCollapsed ? 'justify-center' : ''}`}
                onClick={() => {setActiveTab('projectAudit'); setMobileMenuOpen(false);}}
                {...(sidebarCollapsed && { title: 'Project Audit' })}
              >
                <BarChart className="h-5 w-5" />
                {!sidebarCollapsed && (
                  <span className="font-medium ml-3">Project Audit</span>
                )}
              </Link>

              <Link 
                to="/pmo-report"
                className={`flex items-center px-3 py-2 rounded-md w-full ${activeTab === 'pmoReport' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'} ${sidebarCollapsed ? 'justify-center' : ''}`}
                onClick={() => {setActiveTab('pmoReport'); setMobileMenuOpen(false);}}
                {...(sidebarCollapsed && { title: 'Project Management Dashboard' })}
              >
                <Clipboard className="h-5 w-5" />
                {!sidebarCollapsed && (
                  <span className="font-medium ml-3">Project Management Dashboard</span>
                )}
              </Link>

              <Link 
                to="/pmo-dashboard-upgrade"
                className={`flex items-center px-3 py-2 rounded-md w-full ${activeTab === 'pmoDashboardUpgrade' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'} ${sidebarCollapsed ? 'justify-center' : ''}`}
                onClick={() => {setActiveTab('pmoDashboardUpgrade'); setMobileMenuOpen(false);}}
                {...(sidebarCollapsed && { title: 'Project Dashboard' })}
              >
                <Layers className="h-5 w-5" />
                {!sidebarCollapsed && (
                  <span className="font-medium ml-3">Project Dashboard</span>
                )}
              </Link>

              <Link 
                to="/billing-tab"
                className={`flex items-center px-3 py-2 rounded-md w-full ${activeTab === 'billingTab' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'} ${sidebarCollapsed ? 'justify-center' : ''}`}
                onClick={() => {setActiveTab('billingTab'); setMobileMenuOpen(false);}}
                {...(sidebarCollapsed && { title: 'Billing Tab' })}
              >
                <DollarSign className="h-5 w-5" />
                {!sidebarCollapsed && (
                  <span className="font-medium ml-3">Billing Tab</span>
                )}
              </Link>
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-200 space-y-1">
              <button 
                type="button"
                className={`flex items-center px-3 py-2 rounded-md w-full text-gray-700 hover:bg-gray-100 ${sidebarCollapsed ? 'justify-center' : ''}`}
                {...(sidebarCollapsed && { title: 'Log out' })}
              >
                <LogOut className="h-5 w-5" />
                {!sidebarCollapsed && (
                  <span className="font-medium ml-3">Log out</span>
                )}
              </button>
            </div>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={renderContent()} />
            <Route path="/bom-creator" element={<BoMCreatorPage />} />
            <Route path="/project-audit" element={<ProjectAudit />} />
            <Route path="/pmo-report" element={<PMOReport />} />
            <Route path="/pmo-dashboard-upgrade" element={<PMODashboardUpgrade />} />
            <Route path="/billing-tab" element={<BillingTab />} />
          </Routes>
        </main>
      </div>
      
      {/* Help modal */}
      {helpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Help & Support</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setHelpModalOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                {/* Account Manager section */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:bg-blue-100 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <h4 className="text-sm font-bold text-gray-900 mb-3 text-left">Your Account Manager</h4>
                                      <div className="flex items-center">
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-14 w-14 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-lg">JD</span>
                        </div>
                      </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-lg font-bold text-gray-900">Joe Dell'Anno</h3>
                      <div className="mt-1 space-y-1">
                        <div className="flex">
                          <div className="w-5 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-400" aria-hidden="true">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                              <polyline points="22,6 12,13 2,6" />
                            </svg>
                          </div>
                          <a href="mailto:Joe@lookingpoint.com" className="text-sm text-blue-600 hover:underline ml-1">Joe@lookingpoint.com</a>
                        </div>
                        <div className="flex">
                          <div className="w-5 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-400" aria-hidden="true">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                          </div>
                          <a href="tel:9255551212" className="text-sm text-blue-600 hover:underline ml-1">925-555-1212</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Solution Architect section */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-100 hover:bg-green-100 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <h4 className="text-sm font-bold text-gray-900 mb-3 text-left">Your Solution Architect</h4>
                                      <div className="flex items-center">
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-14 w-14 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center">
                          <span className="text-green-600 font-bold text-lg">MH</span>
                        </div>
                      </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-lg font-bold text-gray-900">Marshall Hill</h3>
                      <div className="mt-1 space-y-1">
                        <div className="flex">
                          <div className="w-5 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-400" aria-hidden="true">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                              <polyline points="22,6 12,13 2,6" />
                            </svg>
                          </div>
                          <a href="mailto:Marshall@lookingpoint.com" className="text-sm text-blue-600 hover:underline ml-1">Marshall@lookingpoint.com</a>
                        </div>
                        <div className="flex">
                          <div className="w-5 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-400" aria-hidden="true">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                          </div>
                          <a href="tel:9258775309" className="text-sm text-blue-600 hover:underline ml-1">925-877-5309</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-base font-semibold text-gray-900 mb-4 pb-1 border-b border-blue-200">Contact Resources</h4>
                  <div className="grid gap-4">
                    <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600" aria-hidden="true">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                          </svg>
                        </div>
                        <div className="flex-1 text-left">
                          <h5 className="text-sm font-semibold text-gray-900 mb-1">Client Services</h5>
                          <p className="text-xs text-gray-500 mb-2">Order Support</p>
                          <a href="mailto:Help@lookingpoint.com" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 mr-1.5" aria-hidden="true">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                              <polyline points="22,6 12,13 2,6" />
                            </svg>
                            Help@lookingpoint.com
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-600" aria-hidden="true">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                        <div className="flex-1 text-left">
                          <h5 className="text-sm font-semibold text-gray-900 mb-1">Accounting</h5>
                          <p className="text-xs text-gray-500 mb-2">Account and billing questions</p>
                          <a href="mailto:Accounting@lookingpoint.com" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 mr-1.5" aria-hidden="true">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                              <polyline points="22,6 12,13 2,6" />
                            </svg>
                            Accounting@lookingpoint.com
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-purple-600" aria-hidden="true">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </div>
                        <div className="flex-1 text-left">
                          <h5 className="text-sm font-semibold text-gray-900 mb-1">Corporate Office</h5>
                          <p className="text-xs text-gray-500 mb-2">Main line</p>
                          <a href="tel:9255663480" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 mr-1.5" aria-hidden="true">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            925-566-3480
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-base font-semibold text-gray-900 mb-3 pb-1 border-b border-blue-200">Feedback</h4>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-700 mb-3">We want to hear from you, if there is something we can improve or if you have a suggestion let us know.</p>
                    <button className="w-full py-2 bg-blue-600 text-white font-medium rounded-md text-sm" onClick={() => setFeedbackModalOpen(true)}>
                      Submit Feedback
                    </button>
                  </div>
                </div>
                
                {/* Resources section removed */}
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-50 rounded-b-lg text-right">
              <button 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setHelpModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      

      
      {/* Feedback modal */}
      {feedbackModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Submit Feedback</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setFeedbackModalOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="feedback-category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="feedback-category"
                    value={feedbackData.category}
                    onChange={(e) => setFeedbackData({ ...feedbackData, category: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select a category</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="general">General Feedback</option>
                    <option value="ui">User Interface</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="feedback-description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="feedback-description"
                    value={feedbackData.description}
                    onChange={(e) => setFeedbackData({ ...feedbackData, description: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Please describe your feedback in detail..."
                    required
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="feedback-contact"
                    checked={feedbackData.contactBack}
                    onChange={(e) => setFeedbackData({ ...feedbackData, contactBack: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="feedback-contact" className="ml-2 block text-sm text-gray-900">
                    I would like someone to contact me about this feedback
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setFeedbackModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md text-sm"
                onClick={handleFeedbackSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Profile modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Your Profile</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setProfileModalOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="profile-firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="profile-firstName"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="profile-lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="profile-lastName"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="profile-title" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="profile-title"
                    value={profileData.title}
                    onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., IT Manager"
                  />
                </div>
                
                <div>
                  <label htmlFor="profile-department" className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    id="profile-department"
                    value={profileData.department}
                    onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., Information Technology"
                  />
                </div>
                
                <div>
                  <label htmlFor="profile-site" className="block text-sm font-medium text-gray-700 mb-1">
                    Site Location
                  </label>
                  <select
                    id="profile-site"
                    value={profileData.site}
                    onChange={(e) => setProfileData({ ...profileData, site: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="headquarters">Headquarters - San Francisco</option>
                    <option value="denver">Denver Office</option>
                    <option value="chicago">Chicago Office</option>
                    <option value="austin">Austin Office</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setProfileModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md text-sm"
                onClick={handleProfileSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default CustomerPortal;