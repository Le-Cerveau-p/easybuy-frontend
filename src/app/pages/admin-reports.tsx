import { useState } from "react";
import { FileText, Download, Calendar, Filter } from "lucide-react";

export function AdminReportsPage() {
  const [reportType, setReportType] = useState("sales");
  const [dateRange, setDateRange] = useState("30days");
  const [format, setFormat] = useState("pdf");

  const reportTypes = [
    { id: "sales", label: "Sales Report", description: "Detailed sales and revenue analytics" },
    { id: "inventory", label: "Inventory Report", description: "Stock levels and product performance" },
    { id: "customer", label: "Customer Report", description: "Customer behavior and demographics" },
    { id: "payment", label: "Payment Report", description: "Transaction history and payment analytics" },
  ];

  const generateReport = () => {
    console.log("Generating report:", { reportType, dateRange, format });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Reports</h1>
        <p className="text-muted-foreground">Generate and export business reports</p>
      </div>

      {/* Report Type Selection */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Select Report Type</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {reportTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setReportType(type.id)}
              className={`p-5 rounded-xl border-2 text-left transition-all ${
                reportType === type.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <FileText className={`h-6 w-6 flex-shrink-0 ${reportType === type.id ? "text-primary" : "text-muted-foreground"}`} />
                <div>
                  <div className="font-semibold mb-1">{type.label}</div>
                  <div className="text-sm text-muted-foreground">{type.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Report Configuration */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Report Configuration</h2>
        <div className="space-y-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Export Format */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Export Format
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["pdf", "excel", "csv"].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`px-4 py-2.5 rounded-xl border font-semibold transition-all ${
                    format === fmt
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateReport}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition-all shadow-lg"
      >
        <Download className="h-6 w-6" />
        Generate & Download Report
      </button>

      {/* Recent Reports */}
      <div className="mt-8 bg-card border border-border rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Recent Reports</h2>
        <div className="space-y-3">
          {[
            { name: "Sales Report - May 2026", date: "2026-05-23", format: "PDF", size: "2.4 MB" },
            { name: "Inventory Report - Q1 2026", date: "2026-04-01", format: "Excel", size: "1.8 MB" },
            { name: "Customer Analytics - April", date: "2026-04-30", format: "CSV", size: "856 KB" },
          ].map((report, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{report.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {report.date} • {report.format} • {report.size}
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-card rounded-lg transition-all">
                <Download className="h-5 w-5 text-primary" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
