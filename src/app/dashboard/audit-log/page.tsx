"use client";
import { useState } from "react";
import { Search, Download, History, User, FileText, Clock, Settings, ArrowRight, ShieldAlert } from "lucide-react";

export default function AuditLogPage() {
  const [selectedEmployee, setSelectedEmployee] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("ratings");

  const employees = [
    { id: 1, name: "Sarah Williams", role: "Product Manager", department: "Product", initials: "SW" },
    { id: 2, name: "Alex Turner", role: "UI/UX Designer", department: "Design", initials: "AT" },
    { id: 3, name: "Tom Baker", role: "Backend Developer", department: "Engineering", initials: "TB" },
  ];

  const auditData: Record<number, any> = {
    1: {
      ratings: [
        { id: "R-5", time: "Today, 02:15 PM", actor: "Jane D. (Reviewer)", item: "RR-003: Architects scalable solutions", old: "Partially Met", new: "Met", type: "overwrite" },
        { id: "R-4", time: "Today, 11:15 AM", actor: "Mike R. (Manager)", item: "RR-003: Architects scalable solutions", old: "Pending", new: "Partially Met", type: "rating" },
        { id: "R-3", time: "Today, 10:45 AM", actor: "Mike R. (Manager)", item: "RR-001: Delivers high-quality code", old: "Pending", new: "Met", type: "rating" },
        { id: "R-2", time: "Yesterday, 05:45 PM", actor: "Sarah W. (Self)", item: "RR-003: Architects scalable solutions", old: "Pending", new: "Met", type: "self" },
        { id: "R-1", time: "Yesterday, 05:30 PM", actor: "Sarah W. (Self)", item: "RR-001: Delivers high-quality code", old: "Pending", new: "Met", type: "self" },
      ],
      workflow: [
        { id: "W-3", time: "Today, 02:15 PM", actor: "Jane D. (Reviewer)", event: "Assessment Finalized", status: "Completed" },
        { id: "W-2", time: "Today, 11:30 AM", actor: "Mike R. (Manager)", event: "Manager Evaluation Submitted", status: "Awaiting Review" },
        { id: "W-1", time: "Yesterday, 06:00 PM", actor: "Sarah W. (Self)", event: "Self-Assessment Submitted", status: "Under Manager Review" },
      ],
      system: [
        { id: "S-3", time: "2 Days Ago, 09:15 AM", actor: "Jane D. (HR Admin)", detail: "Added Responsibility [RR-003] to Parameter [P1]" },
        { id: "S-2", time: "2 Days Ago, 09:10 AM", actor: "Jane D. (HR Admin)", detail: "Updated Weight for Parameter [P1]: Technical Skills" },
        { id: "S-1", time: "2 Days Ago, 09:00 AM", actor: "Jane D. (HR Admin)", detail: "Changed Employee Level from L2 to L3" },
      ]
    },
    2: { ratings: [], workflow: [], system: [] },
    3: { ratings: [], workflow: [], system: [] }
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentData = auditData[selectedEmployee] || { ratings: [], workflow: [], system: [] };
  const selectedEmpDetails = employees.find(e => e.id === selectedEmployee);

  return (
    <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-6rem)]">
      
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Audit Log & History</h1>
          <p className="text-sm text-muted-foreground mt-1">Easily track rating changes, workflow stages, and system modifications.</p>
        </div>
        <button className="btn-outline flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 min-h-0 overflow-hidden">
        
        {/* Left Pane: Employee Selector */}
        <div className="card w-full lg:w-[320px] flex flex-col min-h-0 shrink-0">
          <div className="p-4 border-b bg-muted/20 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Find employee..." 
                className="input-field pl-9 bg-background w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredEmployees.map(emp => (
              <button
                key={emp.id}
                onClick={() => setSelectedEmployee(emp.id)}
                className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${
                  selectedEmployee === emp.id 
                    ? "bg-primary/10 border border-primary/20" 
                    : "hover:bg-muted border border-transparent"
                }`}
              >
                <div className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  selectedEmployee === emp.id ? "bg-primary text-primary-foreground" : "bg-muted-foreground/20 text-foreground"
                }`}>
                  {emp.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-semibold text-sm truncate ${selectedEmployee === emp.id ? "text-primary dark:text-primary-foreground" : "text-foreground"}`}>
                    {emp.name}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">{emp.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Pane: Categorized History */}
        <div className="card flex-1 flex flex-col min-h-0 overflow-hidden bg-background">
          
          {/* Employee Header Info */}
          <div className="p-5 border-b shrink-0 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg border border-primary/20 shrink-0">
                {selectedEmpDetails?.initials}
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">{selectedEmpDetails?.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedEmpDetails?.department} • {selectedEmpDetails?.role}</p>
              </div>
            </div>
          </div>

          {/* Sub-Tabs */}
          <div className="flex border-b shrink-0 bg-muted/10">
            <button
              onClick={() => setActiveTab("ratings")}
              className={`h-11 px-6 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === "ratings" ? "border-primary text-foreground bg-background" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="h-4 w-4" /> Rating Changes
              <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{currentData.ratings.length}</span>
            </button>
            <button
              onClick={() => setActiveTab("workflow")}
              className={`h-11 px-6 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === "workflow" ? "border-primary text-foreground bg-background" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <History className="h-4 w-4" /> Workflow Events
              <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{currentData.workflow.length}</span>
            </button>
            <button
              onClick={() => setActiveTab("system")}
              className={`h-11 px-6 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === "system" ? "border-primary text-foreground bg-background" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Settings className="h-4 w-4" /> System Config
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 overflow-y-auto p-0">
            
            {/* RATINGS TAB */}
            {activeTab === "ratings" && (
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/30 sticky top-0 border-b z-10">
                  <tr>
                    <th className="h-10 px-6 font-semibold text-muted-foreground">Responsibility</th>
                    <th className="h-10 px-4 font-semibold text-muted-foreground">Change</th>
                    <th className="h-10 px-4 font-semibold text-muted-foreground">Actor</th>
                    <th className="h-10 px-4 font-semibold text-muted-foreground text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {currentData.ratings.length > 0 ? currentData.ratings.map((log: any) => (
                    <tr key={log.id} className="hover:bg-muted/10 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="font-medium text-foreground block">{log.item.split(':')[0]}</span>
                        <span className="text-muted-foreground text-xs">{log.item.split(':')[1]}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${log.old === 'Pending' ? 'bg-muted text-muted-foreground' : 'bg-red-50 text-red-600 line-through dark:bg-red-500/10 dark:text-red-400'}`}>
                            {log.old}
                          </span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${
                            log.type === 'overwrite' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400' : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400'
                          }`}>
                            {log.new}
                          </span>
                          {log.type === 'overwrite' && (
                            <span title="Reviewer Overwrite">
                              <ShieldAlert className="h-3 w-3 text-amber-600 ml-1" />
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 font-medium text-muted-foreground">
                        {log.actor}
                      </td>
                      <td className="px-4 py-4 text-right text-xs text-muted-foreground whitespace-nowrap">
                        {log.time}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="text-center py-10 text-muted-foreground">No rating changes found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {/* WORKFLOW TAB */}
            {activeTab === "workflow" && (
              <div className="p-6">
                <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                  {currentData.workflow.length > 0 ? currentData.workflow.map((log: any) => (
                    <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary/10 text-primary shadow-sm z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card shadow-sm group-hover:border-primary/30 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground">
                            {log.status}
                          </span>
                          <time className="text-xs font-medium text-muted-foreground">{log.time}</time>
                        </div>
                        <h4 className="text-sm font-bold text-foreground mb-1">{log.event}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="h-3 w-3" /> Triggered by {log.actor}
                        </div>
                      </div>
                    </div>
                  )) : (
                    <p className="text-center text-muted-foreground mt-10">No workflow events found.</p>
                  )}
                </div>
              </div>
            )}

            {/* SYSTEM TAB */}
            {activeTab === "system" && (
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/30 sticky top-0 border-b z-10">
                  <tr>
                    <th className="h-10 px-6 font-semibold text-muted-foreground">Configuration Change</th>
                    <th className="h-10 px-4 font-semibold text-muted-foreground">Changed By</th>
                    <th className="h-10 px-4 font-semibold text-muted-foreground text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {currentData.system.length > 0 ? currentData.system.map((log: any) => (
                    <tr key={log.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">
                        {log.detail}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {log.actor}
                      </td>
                      <td className="px-4 py-4 text-right text-xs text-muted-foreground whitespace-nowrap">
                        {log.time}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={3} className="text-center py-10 text-muted-foreground">No system changes found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

          </div>
        </div>
        
      </div>
    </div>
  );
}
