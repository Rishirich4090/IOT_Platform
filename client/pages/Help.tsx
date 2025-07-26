import React, { useState } from "react";
import {
  HelpCircle,
  Search,
  Book,
  MessageSquare,
  Phone,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  FileText,
  Video,
  Download,
  Send,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Settings,
  Cpu,
  BarChart3,
  Shield,
  Zap,
  Users,
  Star,
  ThumbsUp,
  ThumbsDown,
  X,
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  notHelpful: number;
}

interface SupportTicket {
  id: string;
  subject: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: Date;
  lastUpdated: Date;
}

interface DocumentationSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  articles: Array<{
    title: string;
    description: string;
    readTime: string;
    type: "article" | "video" | "guide";
  }>;
}

export function Help() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFAQs, setExpandedFAQs] = useState<Set<string>>(new Set());
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    priority: "medium",
    category: "",
  });

  const faqCategories = [
    { id: "all", name: "All Categories", count: 24 },
    { id: "devices", name: "Device Management", count: 8 },
    { id: "alerts", name: "Alerts & Monitoring", count: 6 },
    { id: "analytics", name: "Analytics & Reports", count: 5 },
    { id: "account", name: "Account & Security", count: 3 },
    { id: "troubleshooting", name: "Troubleshooting", count: 2 },
  ];

  const faqItems: FAQItem[] = [
    {
      id: "faq1",
      question: "How do I add a new device to the system?",
      answer:
        'To add a new device: 1) Navigate to the Devices page, 2) Click the "Add Device" button, 3) Fill in the device information including name, type, location, and IP address, 4) Save the configuration. The device will appear as offline until it establishes connection.',
      category: "devices",
      helpful: 42,
      notHelpful: 3,
    },
    {
      id: "faq2",
      question: "What do the different alert severity levels mean?",
      answer:
        "Alert severity levels: Critical (immediate action required, production stopped), High (urgent attention needed), Medium (requires attention but not urgent), Low (informational, monitor). Critical alerts trigger automatic notifications and may initiate safety protocols.",
      category: "alerts",
      helpful: 38,
      notHelpful: 1,
    },
    {
      id: "faq3",
      question: "How can I export analytics data?",
      answer:
        "Analytics data can be exported from the Analytics page using the Export button. Choose your date range, select the metrics you want, and choose format (CSV, PDF, Excel). Historical data is available for up to 2 years depending on your plan.",
      category: "analytics",
      helpful: 29,
      notHelpful: 2,
    },
    {
      id: "faq4",
      question: "Why is my device showing as offline?",
      answer:
        "Common causes: 1) Network connectivity issues, 2) Incorrect IP address configuration, 3) Device powered off, 4) Firewall blocking communication, 5) Firmware compatibility issues. Check device status lights and network settings first.",
      category: "troubleshooting",
      helpful: 51,
      notHelpful: 4,
    },
    {
      id: "faq5",
      question: "How do I set up maintenance schedules?",
      answer:
        "Maintenance schedules can be configured in the Device settings. Set intervals based on runtime hours, calendar dates, or production cycles. The system will automatically generate maintenance alerts before scheduled service dates.",
      category: "devices",
      helpful: 33,
      notHelpful: 1,
    },
    {
      id: "faq6",
      question: "Can I customize alert thresholds?",
      answer:
        "Yes, alert thresholds are fully customizable. Go to Settings > Notifications, select the device or device type, and adjust temperature, vibration, pressure, and other parameter limits according to your operational requirements.",
      category: "alerts",
      helpful: 27,
      notHelpful: 0,
    },
  ];

  const documentationSections: DocumentationSection[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Quick start guides and initial setup",
      icon: Settings,
      articles: [
        {
          title: "Quick Start Guide",
          description: "Get up and running in 5 minutes",
          readTime: "5 min",
          type: "guide",
        },
        {
          title: "Initial System Setup",
          description: "Configure your IoT dashboard",
          readTime: "15 min",
          type: "article",
        },
        {
          title: "User Account Setup",
          description: "Create and manage user accounts",
          readTime: "8 min",
          type: "article",
        },
      ],
    },
    {
      id: "device-management",
      title: "Device Management",
      description: "Adding, configuring, and managing devices",
      icon: Cpu,
      articles: [
        {
          title: "Adding New Devices",
          description: "Step-by-step device onboarding",
          readTime: "10 min",
          type: "video",
        },
        {
          title: "Device Configuration",
          description: "Configure device parameters and alerts",
          readTime: "12 min",
          type: "guide",
        },
        {
          title: "Firmware Updates",
          description: "Manage device firmware remotely",
          readTime: "8 min",
          type: "article",
        },
      ],
    },
    {
      id: "monitoring",
      title: "Monitoring & Alerts",
      description: "Real-time monitoring and alert management",
      icon: AlertTriangle,
      articles: [
        {
          title: "Alert Configuration",
          description: "Set up custom alert rules",
          readTime: "15 min",
          type: "guide",
        },
        {
          title: "Notification Settings",
          description: "Configure email and SMS alerts",
          readTime: "7 min",
          type: "article",
        },
        {
          title: "Alert Response Workflows",
          description: "Automated response procedures",
          readTime: "20 min",
          type: "video",
        },
      ],
    },
    {
      id: "analytics",
      title: "Analytics & Reporting",
      description: "Data analysis and custom reports",
      icon: BarChart3,
      articles: [
        {
          title: "Understanding Analytics",
          description: "Interpret charts and metrics",
          readTime: "18 min",
          type: "guide",
        },
        {
          title: "Custom Reports",
          description: "Create and schedule reports",
          readTime: "12 min",
          type: "article",
        },
        {
          title: "Data Export Options",
          description: "Export data in various formats",
          readTime: "6 min",
          type: "article",
        },
      ],
    },
  ];

  const recentTickets: SupportTicket[] = [
    {
      id: "TKT-001",
      subject: "Device connectivity issues with Machine A1",
      status: "in-progress",
      priority: "high",
      createdAt: new Date("2024-01-21T10:30:00"),
      lastUpdated: new Date("2024-01-21T14:15:00"),
    },
    {
      id: "TKT-002",
      subject: "Request for custom alert threshold configuration",
      status: "resolved",
      priority: "medium",
      createdAt: new Date("2024-01-20T09:15:00"),
      lastUpdated: new Date("2024-01-21T11:30:00"),
    },
  ];

  const toggleFAQ = (faqId: string) => {
    const newExpanded = new Set(expandedFAQs);
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId);
    } else {
      newExpanded.add(faqId);
    }
    setExpandedFAQs(newExpanded);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    console.log("Submitting ticket:", newTicket);
    setShowTicketForm(false);
    setNewTicket({
      subject: "",
      description: "",
      priority: "medium",
      category: "",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "text-iot-blue-500 bg-iot-blue-500/10";
      case "in-progress":
        return "text-iot-warning bg-iot-warning/10";
      case "resolved":
        return "text-iot-success bg-iot-success/10";
      case "closed":
        return "text-iot-gray-500 bg-iot-gray-500/10";
      default:
        return "text-iot-gray-500 bg-iot-gray-500/10";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-iot-error";
      case "high":
        return "text-iot-orange-500";
      case "medium":
        return "text-iot-warning";
      case "low":
        return "text-iot-blue-500";
      default:
        return "text-iot-gray-500";
    }
  };

  const filteredFAQs = faqItems.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Help & Support
            </h1>
            <p className="text-muted-foreground">
              Get help with your IoT manufacturing dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setShowTicketForm(true)}
          className="metric-card hover:scale-105 transition-transform text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Submit Ticket</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized support
              </p>
            </div>
          </div>
        </button>

        <button className="metric-card hover:scale-105 transition-transform text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-iot-success/20 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6 text-iot-success" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Call Support</h3>
              <p className="text-sm text-muted-foreground">+1 (555) 123-HELP</p>
            </div>
          </div>
        </button>

        <button className="metric-card hover:scale-105 transition-transform text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-iot-blue-500/20 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-iot-blue-500" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Email Support</h3>
              <p className="text-sm text-muted-foreground">
                support@manufacturiot.com
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Search */}
      <div className="metric-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search help articles, FAQs, and documentation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Documentation Sections */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Documentation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documentationSections.map((section) => {
                const Icon = section.icon;
                return (
                  <div key={section.id} className="metric-card">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="font-medium text-foreground">
                          {section.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {section.articles.map((article, index) => (
                        <button
                          key={index}
                          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors text-left"
                        >
                          <div className="flex items-center gap-3">
                            {article.type === "video" ? (
                              <Video className="w-4 h-4 text-iot-orange-500" />
                            ) : article.type === "guide" ? (
                              <Book className="w-4 h-4 text-iot-blue-500" />
                            ) : (
                              <FileText className="w-4 h-4 text-iot-success" />
                            )}
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {article.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {article.readTime}
                              </p>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Frequently Asked Questions
              </h2>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {faqCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="metric-card">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h3 className="font-medium text-foreground">
                      {faq.question}
                    </h3>
                    {expandedFAQs.has(faq.id) ? (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>

                  {expandedFAQs.has(faq.id) && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-muted-foreground mb-4">{faq.answer}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground">
                            Was this helpful?
                          </span>
                          <div className="flex items-center gap-2">
                            <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-accent transition-colors">
                              <ThumbsUp className="w-3 h-3 text-iot-success" />
                              <span className="text-xs text-iot-success">
                                {faq.helpful}
                              </span>
                            </button>
                            <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-accent transition-colors">
                              <ThumbsDown className="w-3 h-3 text-iot-error" />
                              <span className="text-xs text-iot-error">
                                {faq.notHelpful}
                              </span>
                            </button>
                          </div>
                        </div>
                        <button className="text-xs text-primary hover:text-primary/80 transition-colors">
                          Improve this answer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Support Status */}
          <div className="metric-card">
            <h3 className="font-medium text-foreground mb-4">Support Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Current Status
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-iot-success rounded-full"></div>
                  <span className="text-sm text-iot-success">
                    All Systems Operational
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Response Time
                </span>
                <span className="text-sm text-foreground">&lt; 2 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Uptime</span>
                <span className="text-sm text-foreground">99.9%</span>
              </div>
            </div>
          </div>

          {/* Recent Tickets */}
          <div className="metric-card">
            <h3 className="font-medium text-foreground mb-4">
              Your Recent Tickets
            </h3>
            <div className="space-y-3">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="p-3 bg-accent/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      {ticket.id}
                    </span>
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(ticket.status)}`}
                    >
                      {ticket.status.replace("-", " ")}
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    {ticket.subject}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className={getPriorityColor(ticket.priority)}>
                      {ticket.priority} priority
                    </span>
                    <span>{ticket.lastUpdated.toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
              <button className="w-full text-sm text-primary hover:text-primary/80 transition-colors">
                View all tickets
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="metric-card">
            <h3 className="font-medium text-foreground mb-4">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-iot-success" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    24/7 Support
                  </p>
                  <p className="text-xs text-muted-foreground">
                    +1 (555) 123-HELP
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-iot-blue-500" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Email Support
                  </p>
                  <p className="text-xs text-muted-foreground">
                    support@manufacturiot.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-iot-warning" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Business Hours
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Mon-Fri 8AM-6PM EST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="metric-card">
            <h3 className="font-medium text-foreground mb-4">
              Additional Resources
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Download className="w-4 h-4 text-iot-blue-500" />
                  <span className="text-sm text-foreground">
                    User Manual (PDF)
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Video className="w-4 h-4 text-iot-orange-500" />
                  <span className="text-sm text-foreground">
                    Video Tutorials
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-iot-success" />
                  <span className="text-sm text-foreground">
                    Community Forum
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Support Ticket Modal */}
      {showTicketForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">
                Submit Support Ticket
              </h2>
              <button
                onClick={() => setShowTicketForm(false)}
                className="p-1 hover:bg-accent rounded transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleTicketSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Subject
                </label>
                <input
                  type="text"
                  value={newTicket.subject}
                  onChange={(e) =>
                    setNewTicket((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  placeholder="Brief description of your issue"
                  className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Priority
                  </label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) =>
                      setNewTicket((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Category
                  </label>
                  <select
                    value={newTicket.category}
                    onChange={(e) =>
                      setNewTicket((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="devices">Device Issues</option>
                    <option value="alerts">Alerts & Monitoring</option>
                    <option value="analytics">Analytics & Reports</option>
                    <option value="account">Account & Billing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Description
                </label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) =>
                    setNewTicket((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Please provide detailed information about your issue..."
                  rows={4}
                  className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowTicketForm(false)}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
