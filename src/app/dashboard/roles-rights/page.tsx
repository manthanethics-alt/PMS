"use client";
import React, { useState } from "react";
import { Save, ShieldCheck, Check, Info, ChevronDown, ChevronRight } from "lucide-react";

const roles = ["Super Admin", "HR Admin", "Manager", "Reviewer", "Employee"];
const actions = ["view", "add", "edit", "export"];

const modules = [
  {
    id: "master_settings",
    name: "Master Settings",
    subModules: [
      { id: "ms_levels", name: "Levels" },
      { id: "ms_parameters", name: "Parameters" },
      { id: "ms_roles", name: "Roles & Responsibilities" },
      { id: "ms_matrix", name: "Matrix Mapping" },
      { id: "ms_status", name: "Status Mapping" },
    ]
  },
  {
    id: "user_management",
    name: "User Management",
    subModules: [
      { id: "um_users", name: "Users Directory" },
      { id: "um_roles", name: "Roles & Rights" },
    ]
  },
  {
    id: "assessments",
    name: "Assessments",
    subModules: [
      { id: "as_evaluations", name: "Evaluations" },
    ]
  },
  {
    id: "audit_log",
    name: "Audit Log",
    subModules: [
      { id: "al_logs", name: "System Logs" },
    ]
  }
];

type PermissionsState = {
  [role: string]: {
    [subModuleId: string]: {
      [action: string]: boolean;
    };
  };
};

// Generate default permissions dynamically based on the modules structure
const defaultPermissions: PermissionsState = {};
roles.forEach(role => {
  defaultPermissions[role] = {};
  modules.forEach(mod => {
    mod.subModules.forEach(sub => {
      // Basic mock logic: Super/HR Admin get all, others get limited
      const isSuperOrHr = role === "Super Admin" || role === "HR Admin";
      defaultPermissions[role][sub.id] = {
        view: isSuperOrHr || role === "Manager" || role === "Reviewer",
        add: isSuperOrHr,
        edit: isSuperOrHr,
        export: isSuperOrHr,
      };
      
      // Specifically for Roles & Rights, only Super/HR Admin can view
      if (sub.id === "um_roles" && !isSuperOrHr) {
        defaultPermissions[role][sub.id].view = false;
      }
    });
  });
});

export default function RolesRightsPage() {
  const [permissions, setPermissions] = useState<PermissionsState>(defaultPermissions);
  const [selectedRole, setSelectedRole] = useState("HR Admin");
  const [isSaving, setIsSaving] = useState(false);
  
  // State for expanded modules
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "master_settings": true,
    "user_management": true,
  });

  const isSuperAdmin = selectedRole === "Super Admin";

  const toggleModuleExpand = (modId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const toggleAction = (subId: string, action: string) => {
    if (isSuperAdmin) return;
    setPermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [subId]: {
          ...prev[selectedRole][subId],
          [action]: !prev[selectedRole][subId][action]
        }
      }
    }));
  };

  const toggleRowAll = (subId: string) => {
    if (isSuperAdmin) return;
    const isAll = actions.every(a => permissions[selectedRole][subId][a]);
    const nextState = !isAll;
    
    setPermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [subId]: {
          view: nextState,
          add: nextState,
          edit: nextState,
          export: nextState
        }
      }
    }));
  };

  const toggleModuleColumn = (modId: string, action: string) => {
    if (isSuperAdmin) return;
    const subModules = modules.find(m => m.id === modId)?.subModules || [];
    const isAllGranted = subModules.every(sub => permissions[selectedRole][sub.id][action]);
    const nextState = !isAllGranted;

    setPermissions(prev => {
      const newState = { ...prev };
      subModules.forEach(sub => {
        newState[selectedRole][sub.id][action] = nextState;
      });
      return newState;
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Roles & Rights Matrix
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Select a role below to configure its granular system permissions.</p>
        </div>
        <button 
          onClick={handleSave}
          className="btn-primary flex items-center gap-2"
          disabled={isSaving || isSuperAdmin}
        >
          {isSaving ? (
            <>
              <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {isSuperAdmin && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-primary flex items-start gap-3 shadow-sm">
          <Info className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="text-sm leading-relaxed">
            <strong>System Lock:</strong> The <em>Super Admin</em> role inherits full system access. These permissions are locked and cannot be modified to prevent system lockout.
          </div>
        </div>
      )}

      {/* Role Selector & Matrix */}
      <div className="card overflow-hidden bg-background">
        
        {/* Top bar with Role dropdown */}
        <div className="p-4 border-b bg-muted/20 flex items-center gap-4">
          <label className="text-sm font-semibold text-muted-foreground">Editing Role:</label>
          <select 
            className="input-field w-64 bg-card font-medium"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="h-12 px-6 font-semibold text-muted-foreground min-w-[250px]">Module / Sub-Module</th>
                <th className="h-12 px-4 font-semibold text-center w-24">All</th>
                <th className="h-12 px-4 font-semibold text-center w-24">View</th>
                <th className="h-12 px-4 font-semibold text-center w-24">Add</th>
                <th className="h-12 px-4 font-semibold text-center w-24">Edit</th>
                <th className="h-12 px-4 font-semibold text-center w-24">Export</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {modules.map((mod) => {
                const isExpanded = expandedModules[mod.id];
                
                // Calculate if all actions for all submodules are granted (for the parent "All" column)
                // We'll skip the complex parent toggles for simplicity and just let them toggle individual columns
                
                return (
                  <React.Fragment key={mod.id}>
                    {/* Parent Module Row */}
                    <tr 
                      className="bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer"
                      onClick={() => toggleModuleExpand(mod.id)}
                    >
                      <td className="px-6 py-3 font-semibold text-primary dark:text-primary-foreground flex items-center gap-2">
                        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        {mod.name}
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-background border ml-2 text-muted-foreground">
                          {mod.subModules.length}
                        </span>
                      </td>
                      <td colSpan={5} className="px-4 py-3 text-right text-xs text-muted-foreground">
                        {isExpanded ? "Click to collapse" : "Click to expand options"}
                      </td>
                    </tr>
                    
                    {/* Sub Modules Rows */}
                    {isExpanded && mod.subModules.map(sub => {
                      const subPerms = permissions[selectedRole][sub.id];
                      const isAllGranted = actions.every(a => subPerms[a]);

                      return (
                        <tr key={sub.id} className="hover:bg-muted/30 transition-colors bg-background">
                          <td className="px-6 py-4 pl-12 font-medium text-foreground">
                            {sub.name}
                          </td>
                          
                          {/* ALL Checkbox */}
                          <td className="px-4 py-4 text-center border-r bg-muted/10">
                            <label className={`inline-flex items-center justify-center p-1 rounded-md cursor-pointer transition-colors ${
                              isSuperAdmin ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted/50'
                            }`}>
                              <div 
                                onClick={() => toggleRowAll(sub.id)}
                                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                  isAllGranted 
                                    ? 'bg-foreground border-foreground text-background' 
                                    : 'bg-background border-input'
                                }`}
                              >
                                {isAllGranted && <Check className="h-3.5 w-3.5" />}
                              </div>
                            </label>
                          </td>

                          {/* Individual Actions */}
                          {actions.map((action) => {
                            const isGranted = subPerms[action];
                            
                            return (
                              <td key={action} className="px-4 py-4 text-center">
                                <label className={`inline-flex items-center justify-center p-1 rounded-md cursor-pointer transition-colors ${
                                  isSuperAdmin ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted'
                                }`}>
                                  <div 
                                    onClick={() => toggleAction(sub.id, action)}
                                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                      isGranted 
                                        ? 'bg-primary border-primary text-primary-foreground' 
                                        : 'bg-background border-input'
                                    }`}
                                  >
                                    {isGranted && <Check className="h-3.5 w-3.5" />}
                                  </div>
                                </label>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
