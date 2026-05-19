"use client";
import { useState } from "react";
import { Plus, Search, MoreHorizontal, Edit, Trash2, X, ChevronDown, ShieldCheck, FileText, SlidersHorizontal, ListChecks, Info, Check } from "lucide-react";

export default function MastersPage() {
  const [activeTab, setActiveTab] = useState("levels");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Matrix Mapping State
  const [selectedParameters, setSelectedParameters] = useState<string[]>(['approvals', 'invoice']);
  const [selectedResponsibilities, setSelectedResponsibilities] = useState<string[]>(['app_1', 'app_2', 'inv_1']);

  const availableParameters = [
    { id: 'approvals', label: 'Approvals', icon: ShieldCheck },
    { id: 'invoice', label: 'Invoice Management', icon: FileText },
    { id: 'inventory', label: 'Inventory Adjustment', icon: SlidersHorizontal },
    { id: 'scheme', label: 'Scheme Activation', icon: ListChecks },
    { id: 'payment', label: 'Payment Reconciliation', icon: Info },
  ];

  const parameterResponsibilities: Record<string, { id: string, label: string }[]> = {
    approvals: [
      { id: 'app_1', label: 'Approve Invoices' },
      { id: 'app_2', label: 'Approve Credits' },
      { id: 'app_3', label: 'Override Limits' },
      { id: 'app_4', label: 'Process Refunds' },
    ],
    invoice: [
      { id: 'inv_1', label: 'Create Invoices' },
      { id: 'inv_2', label: 'Edit Unpaid Invoices' },
      { id: 'inv_3', label: 'Delete Drafts' },
      { id: 'inv_4', label: 'Export Data' },
    ],
    inventory: [
      { id: 'adj_1', label: 'Adjust Stock' },
      { id: 'adj_2', label: 'Approve Adjustments' },
      { id: 'adj_3', label: 'View Audit Logs' },
    ],
    scheme: [
      { id: 'sch_1', label: 'Create Schemes' },
      { id: 'sch_2', label: 'Activate/Deactivate' },
    ],
    payment: [
      { id: 'pay_1', label: 'Reconcile Payments' },
      { id: 'pay_2', label: 'View Reports' },
    ],
  };

  const toggleResponsibility = (resId: string) => {
    setSelectedResponsibilities(prev => 
      prev.includes(resId) ? prev.filter(id => id !== resId) : [...prev, resId]
    );
  };

  const toggleParameterAll = (paramId: string, resList: {id: string}[]) => {
    const allResIds = resList.map(r => r.id);
    const allSelected = allResIds.length > 0 && allResIds.every(id => selectedResponsibilities.includes(id));
    
    if (allSelected) {
      setSelectedResponsibilities(prev => prev.filter(id => !allResIds.includes(id)));
    } else {
      setSelectedResponsibilities(prev => {
        const newSet = new Set(prev);
        allResIds.forEach(id => newSet.add(id));
        return Array.from(newSet);
      });
    }
  };
  
  const selectAllAcrossParameters = () => {
    const allAvailableResIds = selectedParameters.flatMap(pId => 
      (parameterResponsibilities[pId] || []).map(r => r.id)
    );
    const allSelected = allAvailableResIds.length > 0 && allAvailableResIds.every(id => selectedResponsibilities.includes(id));
    
    if (allSelected) {
      setSelectedResponsibilities(prev => prev.filter(id => !allAvailableResIds.includes(id)));
    } else {
      setSelectedResponsibilities(prev => {
        const newSet = new Set(prev);
        allAvailableResIds.forEach(id => newSet.add(id));
        return Array.from(newSet);
      });
    }
  };

  const tabs = [
    { id: "levels", label: "Levels" },
    { id: "parameters", label: "Parameters" },
    { id: "roles", label: "Roles & Responsibilities" },
    { id: "mapping", label: "Matrix Mapping" },
    { id: "status", label: "Status Mapping" },
  ];

  const levels = [
    { id: 1, code: "L1", name: "Junior Associate", employees: 45, status: "Active" },
    { id: 2, code: "L2", name: "Associate", employees: 112, status: "Active" },
    { id: 3, code: "L3", name: "Senior Associate", employees: 89, status: "Active" },
    { id: 4, code: "L4", name: "Lead", employees: 34, status: "Active" },
    { id: 5, code: "L5", name: "Principal", employees: 12, status: "Inactive" },
  ];

  const parametersList = [
    { id: 1, code: "P1", name: "Technical Skills & Delivery", description: "Core engineering output", order: 1, status: "Active" },
    { id: 2, code: "P2", name: "Leadership & Mentoring", description: "Team building and guidance", order: 2, status: "Active" },
    { id: 3, code: "P3", name: "Communication", description: "Internal and external comms", order: 3, status: "Active" },
  ];

  const rolesList = [
    { id: 1, code: "RR-001", parameter: "Technical Skills", description: "Delivers high-quality code adhering to project standards.", order: 1, status: "Active" },
    { id: 2, code: "RR-002", parameter: "Leadership", description: "Provides technical guidance to junior team members.", order: 2, status: "Active" },
    { id: 3, code: "RR-003", parameter: "Technical Skills", description: "Architects scalable solutions for new feature requests.", order: 1, status: "Active" },
  ];

  const mappingList = [
    { id: 1, level: "L2 - Associate", parameter: "Technical Skills", assignedRoles: 4, status: "Active" },
    { id: 2, level: "L2 - Associate", parameter: "Leadership", assignedRoles: 2, status: "Active" },
    { id: 3, level: "L3 - Senior Associate", parameter: "Technical Skills", assignedRoles: 5, status: "Active" },
  ];

  const statusMappingList = [
    { id: 1, code: "S1", name: "Met", description: "Consistently meets expectations", value: 3, order: 1, status: "Active" },
    { id: 2, code: "S2", name: "Partially Met", description: "Meets some but not all expectations", value: 2, order: 2, status: "Active" },
    { id: 3, code: "S3", name: "Not Met", description: "Fails to meet basic expectations", value: 1, order: 3, status: "Active" },
  ];

  const getAddButtonText = () => {
    switch (activeTab) {
      case "levels": return "Add Level";
      case "parameters": return "Add Parameter";
      case "roles": return "Add Role";
      case "mapping": return "Add Mapping";
      case "status": return "Add Status";
      default: return "Add New";
    }
  };

  return (
    <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Master Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure evaluation parameters and organisational levels.</p>
        </div>
      </div>

      <div className="card">
        {/* Tabs Navigation */}
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                h-11 px-6 text-sm font-medium transition-colors border-b-2 -mb-px
                ${activeTab === tab.id 
                  ? "border-primary text-foreground" 
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="p-4 flex items-center gap-4 border-b bg-muted/20">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder={`Filter ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`} 
              className="input-field pl-9 bg-background"
            />
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button className="btn-outline">Export CSV</button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary flex items-center gap-2 shadow-sm"
            >
              <Plus className="h-4 w-4" />
              {getAddButtonText()}
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="relative w-full overflow-auto min-h-[400px]">
          {activeTab === 'levels' && (
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Code</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Name</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Employees</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground text-right w-[100px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {levels.map((level) => (
                  <tr key={level.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="p-4 font-medium">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-muted border">
                        {level.code}
                      </span>
                    </td>
                    <td className="p-4">{level.name}</td>
                    <td className="p-4 text-muted-foreground">{level.employees}</td>
                    <td className="p-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${level.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-muted text-muted-foreground'}`}>
                        {level.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                        {level.status}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-muted-foreground hover:text-primary rounded hover:bg-muted transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-destructive rounded hover:bg-destructive/10 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'parameters' && (
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Code</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Name</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Description</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Display Order</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground text-right w-[100px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {parametersList.map((param) => (
                  <tr key={param.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="p-4 font-medium">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-muted border">
                        {param.code}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-primary">{param.name}</td>
                    <td className="p-4 text-muted-foreground max-w-[200px] truncate" title={param.description}>{param.description}</td>
                    <td className="p-4 text-muted-foreground">{param.order}</td>
                    <td className="p-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${param.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-muted text-muted-foreground'}`}>
                        {param.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                        {param.status}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-muted-foreground hover:text-primary rounded hover:bg-muted transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-destructive rounded hover:bg-destructive/10 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'roles' && (
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Code</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Parameter</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Description</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Order</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground text-right w-[100px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rolesList.map((role) => (
                  <tr key={role.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="p-4 font-medium">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-muted border">
                        {role.code}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{role.parameter}</td>
                    <td className="p-4 text-muted-foreground max-w-[300px] truncate" title={role.description}>{role.description}</td>
                    <td className="p-4 text-muted-foreground">{role.order}</td>
                    <td className="p-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${role.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-muted text-muted-foreground'}`}>
                        {role.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                        {role.status}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-muted-foreground hover:text-primary rounded hover:bg-muted transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-destructive rounded hover:bg-destructive/10 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'mapping' && (
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Level</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Parameter</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Assigned Roles</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground text-right w-[150px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mappingList.map((mapping) => (
                  <tr key={mapping.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="p-4 font-medium">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                        {mapping.level}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{mapping.parameter}</td>
                    <td className="p-4 text-muted-foreground">{mapping.assignedRoles} mapped R&Rs</td>
                    <td className="p-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${mapping.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-muted text-muted-foreground'}`}>
                        {mapping.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                        {mapping.status}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-xs font-medium text-primary hover:underline" onClick={() => setIsPreviewModalOpen(true)}>
                          Preview Form
                        </button>
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 text-muted-foreground hover:text-primary rounded hover:bg-muted transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 text-muted-foreground hover:text-destructive rounded hover:bg-destructive/10 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'status' && (
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Code</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Name</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Description</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Value / Weight</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Order</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="h-10 px-4 font-medium text-muted-foreground text-right w-[100px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {statusMappingList.map((mapping) => (
                  <tr key={mapping.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="p-4 font-medium">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-muted border">
                        {mapping.code}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-primary">{mapping.name}</td>
                    <td className="p-4 text-muted-foreground">{mapping.description}</td>
                    <td className="p-4 font-mono font-medium">{mapping.value}</td>
                    <td className="p-4 text-muted-foreground">{mapping.order}</td>
                    <td className="p-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${mapping.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-muted text-muted-foreground'}`}>
                        {mapping.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                        {mapping.status}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-muted-foreground hover:text-primary rounded hover:bg-muted transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-destructive rounded hover:bg-destructive/10 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {/* Pagination Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-xs text-muted-foreground">Showing 1 to 5 of 5 entries</p>
            <div className="flex items-center gap-2">
              <button className="btn-outline h-7 px-2 text-xs" disabled>Previous</button>
              <button className="btn-outline h-7 px-2 text-xs" disabled>Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className={`bg-card w-full ${activeTab === 'mapping' ? 'max-w-4xl flex flex-col max-h-[90vh]' : 'max-w-md'} rounded-xl shadow-xl border overflow-hidden animate-in zoom-in-95 duration-200`}>
            {activeTab !== 'mapping' && (
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold text-lg text-foreground">
                  Add New {activeTab === 'levels' ? 'Level' : activeTab === 'parameters' ? 'Parameter' : 'Item'}
                </h3>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            
            {activeTab === 'levels' && (
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Level Code</label>
                  <input type="text" placeholder="e.g. L6" className="input-field" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Level Name</label>
                  <input type="text" placeholder="e.g. Director" className="input-field" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Description</label>
                  <textarea className="input-field min-h-[80px] py-2" placeholder="Brief description of the level..."></textarea>
                </div>
                <div className="flex gap-4">
                  <div className="space-y-1.5 flex-1">
                    <label className="text-sm font-medium">Sort Order</label>
                    <input type="number" defaultValue="6" className="input-field" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <label className="text-sm font-medium">Status</label>
                    <select className="input-field bg-background">
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'parameters' && (
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Parameter Code</label>
                  <input type="text" placeholder="e.g. P1" className="input-field" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Parameter Name</label>
                  <input type="text" placeholder="e.g. Technical Skills" className="input-field" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Description</label>
                  <textarea className="input-field min-h-[80px] py-2" placeholder="Brief description of the parameter..."></textarea>
                </div>
                <div className="flex gap-4">
                  <div className="space-y-1.5 flex-1">
                    <label className="text-sm font-medium">Display Order</label>
                    <input type="number" defaultValue="1" className="input-field" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <label className="text-sm font-medium">Status</label>
                    <select className="input-field bg-background">
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'roles' && (
              <div className="p-6 space-y-4">
                <div className="flex gap-4">
                  <div className="space-y-1.5 flex-1">
                    <label className="text-sm font-medium">R&R Code / ID</label>
                    <input type="text" placeholder="e.g. RR-042" className="input-field" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <label className="text-sm font-medium">Parameter</label>
                    <select className="input-field bg-background">
                      <option value="">Select Parameter...</option>
                      <option value="P1">Technical Skills & Delivery</option>
                      <option value="P2">Leadership & Mentoring</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Responsibility Description</label>
                  <textarea className="input-field min-h-[100px] py-2" placeholder="Describe the expected responsibility..."></textarea>
                </div>
                <div className="flex gap-4">
                  <div className="space-y-1.5 flex-1">
                    <label className="text-sm font-medium">Display Order</label>
                    <input type="number" defaultValue="1" className="input-field" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <label className="text-sm font-medium">Status</label>
                    <select className="input-field bg-background">
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mapping' && (
              <div className="p-8 space-y-8 bg-muted/5 overflow-y-auto">
                {/* Custom Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-[26px] font-bold text-foreground tracking-tight">Add Matrix Mapping</h2>
                    <p className="text-muted-foreground mt-1.5 text-[15px]">Define role levels, select parameters, and assign specific operational permissions.</p>
                  </div>
                  <button onClick={() => setIsAddModalOpen(false)} className="p-2 rounded-md text-muted-foreground hover:bg-muted transition-colors">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Box 1 */}
                <div className="bg-card border rounded-2xl p-6 space-y-6 shadow-sm">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Role Level <span className="text-destructive">*</span></label>
                    <div className="relative max-w-md">
                      <select className="w-full appearance-none bg-background border border-input rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground">
                        <option value="">Search or select role level...</option>
                        <option value="L1">L1 - Junior Associate</option>
                        <option value="L2">L2 - Associate</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    <label className="text-sm font-medium text-foreground">Parameters Selection</label>
                    <div className="flex flex-wrap gap-3">
                      {availableParameters.map((param) => {
                        const isSelected = selectedParameters.includes(param.id);
                        const Icon = param.icon;
                        return (
                          <button 
                            key={param.id}
                            onClick={() => {
                              setSelectedParameters(prev => 
                                prev.includes(param.id) 
                                  ? prev.filter(p => p !== param.id)
                                  : [...prev, param.id]
                              );
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-colors ${
                              isSelected 
                                ? "border-primary/30 bg-primary/10 text-foreground" 
                                : "border-border bg-background text-muted-foreground hover:bg-muted/50"
                            }`}
                          >
                            <Icon className={`h-4 w-4 ${isSelected ? "text-primary" : ""}`} />
                            {param.label}
                            {isSelected && <Check className="h-4 w-4 ml-1 text-foreground" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Section 2 Header */}
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-bold text-foreground tracking-tight">Assign Responsibilities</h3>
                  </div>
                  <button 
                    onClick={selectAllAcrossParameters}
                    className="flex items-center gap-2 text-primary hover:opacity-80 text-sm font-semibold transition-opacity"
                  >
                    <ListChecks className="h-4 w-4" />
                    Select All Responsibilities
                  </button>
                </div>

                <div className="space-y-6">
                  {selectedParameters.map(paramId => {
                    const param = availableParameters.find(p => p.id === paramId);
                    if (!param) return null;
                    const resList = parameterResponsibilities[paramId] || [];
                    const Icon = param.icon;
                    const allSelected = resList.length > 0 && resList.every(r => selectedResponsibilities.includes(r.id));
                    
                    return (
                      <div key={param.id} className="bg-card border rounded-xl overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between p-4 border-b bg-muted/20">
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-foreground">{param.label}</span>
                          </div>
                          <button 
                            onClick={() => toggleParameterAll(param.id, resList)}
                            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            <span className="text-xs font-bold text-muted-foreground tracking-wider">SELECT ALL</span>
                            <div className={`flex items-center justify-center w-5 h-5 rounded border ${allSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-background'}`}>
                              {allSelected && <Check className="h-3.5 w-3.5" />}
                            </div>
                          </button>
                        </div>
                        <div className="p-2">
                          {resList.map(res => {
                            const isResSelected = selectedResponsibilities.includes(res.id);
                            return (
                              <label key={res.id} className="flex items-center gap-4 p-2.5 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors">
                                <div className={`relative flex items-center justify-center w-5 h-5 rounded border ${isResSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-background'}`}>
                                  {isResSelected && <Check className="h-3.5 w-3.5" />}
                                </div>
                                <span className="text-foreground">{res.label}</span>
                                <input 
                                  type="checkbox" 
                                  className="hidden" 
                                  checked={isResSelected}
                                  onChange={() => toggleResponsibility(res.id)}
                                />
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  
                  {selectedParameters.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground border border-dashed rounded-xl">
                      Select parameters above to assign responsibilities.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'status' && (
              <div className="p-6 space-y-4">
                <div className="flex gap-4">
                  <div className="space-y-1.5 flex-1">
                    <label className="text-sm font-medium">Status Code</label>
                    <input type="text" placeholder="e.g. S1" className="input-field" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <label className="text-sm font-medium">Status Name</label>
                    <input type="text" placeholder="e.g. Met" className="input-field" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Description</label>
                  <textarea className="input-field min-h-[60px] py-2" placeholder="Brief description of this status..."></textarea>
                </div>
                <div className="flex gap-4">
                  <div className="space-y-1.5 flex-1">
                    <label className="text-sm font-medium">Weight / Value</label>
                    <input type="number" placeholder="e.g. 3" className="input-field" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <label className="text-sm font-medium">Display Order</label>
                    <input type="number" defaultValue="1" className="input-field" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Status</label>
                  <select className="input-field bg-background">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
            )}
            
            {activeTab === 'mapping' ? (
              <div className="flex items-center justify-end gap-3 p-6 border-t bg-card shrink-0">
                <button onClick={() => setIsAddModalOpen(false)} className="btn-outline">
                  Cancel
                </button>
                <button onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-md bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors text-sm">
                  Save Draft
                </button>
                <button onClick={() => setIsAddModalOpen(false)} className="btn-primary">
                  Save & Assign
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-2 p-4 border-t bg-muted/20">
                <button onClick={() => setIsAddModalOpen(false)} className="btn-ghost">Cancel</button>
                <button onClick={() => setIsAddModalOpen(false)} className="btn-primary">
                  Save {activeTab === 'levels' ? 'Level' : activeTab === 'parameters' ? 'Parameter' : activeTab === 'roles' ? 'Role/Responsibility' : 'Status'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-5xl rounded-xl shadow-xl border overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-lg text-foreground">Form Preview</h3>
              <button 
                onClick={() => setIsPreviewModalOpen(false)}
                className="p-1 rounded-md text-muted-foreground hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 bg-muted/10 max-h-[75vh] overflow-y-auto">
              <p className="text-sm text-muted-foreground mb-4">
                This is how the mapped parameter and its assigned responsibilities will appear in the final Assessment Form.
              </p>
              
              {/* Replicated Assessment Form UI */}
              <div className="card overflow-hidden bg-background">
                <div className="w-full text-left bg-muted/30 border-b">
                  <div className="flex font-semibold text-sm text-muted-foreground px-4 py-3">
                    <div className="w-8 shrink-0"></div>
                    <div className="w-20 text-center">Level</div>
                    <div className="flex-1">Parameter / Responsibility</div>
                    <div className="w-40 px-2">Status</div>
                    <div className="w-[300px] px-2">Manager Notes</div>
                  </div>
                </div>

                <div className="flex flex-col">
                  {/* Parameter Header */}
                  <div className="flex items-center w-full text-left px-4 py-3 bg-secondary/30 transition-colors">
                    <div className="w-8 shrink-0 text-muted-foreground">
                      <ChevronDown className="h-5 w-5" />
                    </div>
                    <h3 className="flex-1 font-semibold text-primary dark:text-primary-foreground">
                      Technical Skills & Delivery
                    </h3>
                    <div className="w-40"></div>
                    <div className="w-[300px] text-right">
                      <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded-md border shadow-sm">
                        2 items
                      </span>
                    </div>
                  </div>
                  
                  {/* R&R Table Rows */}
                  <div className="divide-y divide-border/50 bg-background border-t">
                    <div className="flex items-start px-4 py-3 hover:bg-muted/30 transition-colors">
                      <div className="w-8 shrink-0"></div>
                      <div className="w-20 pt-1 pr-2 flex justify-center">
                        <span className="inline-flex items-center justify-center h-5 px-2 rounded text-[11px] font-bold border shadow-sm bg-muted text-muted-foreground border-border">
                          L2
                        </span>
                      </div>
                      <div className="flex-1 pl-2 pr-6 pt-1">
                        <p className="text-sm text-foreground leading-relaxed">
                          <span className="font-semibold text-muted-foreground mr-2">RR-001:</span>
                          Delivers high-quality code adhering to project standards.
                        </p>
                      </div>
                      <div className="w-40 px-2 pt-1">
                        <select className="input-field py-1.5 h-8 text-xs bg-background text-muted-foreground">
                          <option>Select status...</option>
                        </select>
                      </div>
                      <div className="w-[300px] px-2 pt-1">
                        <input type="text" className="input-field text-xs h-8 bg-background focus:bg-background" placeholder="Add notes..." />
                      </div>
                    </div>
                    
                    <div className="flex items-start px-4 py-3 hover:bg-muted/30 transition-colors">
                      <div className="w-8 shrink-0"></div>
                      <div className="w-20 pt-1 pr-2 flex justify-center">
                        <span className="inline-flex items-center justify-center h-5 px-2 rounded text-[11px] font-bold border shadow-sm bg-muted text-muted-foreground border-border">
                          L2
                        </span>
                      </div>
                      <div className="flex-1 pl-2 pr-6 pt-1">
                        <p className="text-sm text-foreground leading-relaxed">
                          <span className="font-semibold text-muted-foreground mr-2">RR-003:</span>
                          Architects scalable solutions for new feature requests.
                        </p>
                      </div>
                      <div className="w-40 px-2 pt-1">
                        <select className="input-field py-1.5 h-8 text-xs bg-background text-muted-foreground">
                          <option>Select status...</option>
                        </select>
                      </div>
                      <div className="w-[300px] px-2 pt-1">
                        <input type="text" className="input-field text-xs h-8 bg-background focus:bg-background" placeholder="Add notes..." />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            
            <div className="flex items-center justify-end p-4 border-t bg-muted/20">
              <button onClick={() => setIsPreviewModalOpen(false)} className="btn-ghost">Close Preview</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
