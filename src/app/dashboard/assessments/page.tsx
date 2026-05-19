"use client";
import { useState, useRef, useEffect } from "react";
import { Save, Send, AlertTriangle, Info, ChevronDown, ChevronRight, Check, Search, History, X } from "lucide-react";
import Link from "next/link";

// Mock Employee Data
const employees = [
  { id: "e1", name: "John Smith", department: "Engineering", role: "Frontend Developer", initialLevel: "L2" },
  { id: "e2", name: "Sarah Williams", department: "Product", role: "Product Manager", initialLevel: "L3" },
  { id: "e3", name: "Alex Turner", department: "Design", role: "UI/UX Designer", initialLevel: "L2" },
];

export default function AssessmentFormPage() {
  // Employee Selection State
  const [selectedEmp, setSelectedEmp] = useState(employees[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [level, setLevel] = useState(employees[0].initialLevel);
  const [levelHistory, setLevelHistory] = useState<string[]>([employees[0].initialLevel]);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [showUnionAlert, setShowUnionAlert] = useState(false);
  const [statusValues, setStatusValues] = useState<Record<string, string>>({
    "r1": "met",
    "r2": "partial"
  });
  
  // Collapsible sections state
  const [expandedParams, setExpandedParams] = useState<Record<string, boolean>>({
    "p1": true,
    "p2": true
  });

  const statuses = [
    { id: "met", label: "Met", color: "text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20" },
    { id: "partial", label: "Partially Met", color: "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/20" },
    { id: "not_met", label: "Not Met", color: "text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-500/10 dark:border-red-500/20" },
  ];

  // Mock Union Logic Data
  const parameters = [
    {
      id: "p1",
      name: "Technical Skills & Delivery",
      responsibilities: [
        { id: "r1", desc: "Delivers high-quality code adhering to project standards and best practices.", level: "L2" },
        { id: "r2", desc: "Resolves complex technical issues and bugs within agreed SLAs.", level: "L2" },
        ...((level === "L3" || level === "L4") ? [{ id: "r3", desc: "Architects scalable solutions for new feature requests.", level: "L3", isNew: selectedEmp.initialLevel === "L2" }] : []),
        ...(level === "L4" ? [{ id: "r6", desc: "Sets enterprise architectural standards and organizational roadmap.", level: "L4", isNew: true }] : [])
      ]
    },
    {
      id: "p2",
      name: "Leadership & Mentoring",
      responsibilities: [
        { id: "r4", desc: "Provides technical guidance to junior team members.", level: "L2" },
        ...((level === "L3" || level === "L4") ? [{ id: "r5", desc: "Leads technical discussions and cross-team architecture reviews.", level: "L3", isNew: selectedEmp.initialLevel === "L2" }] : []),
        ...(level === "L4" ? [{ id: "r7", desc: "Defines cross-organizational mentorship frameworks and engineering culture.", level: "L4", isNew: true }] : [])
      ]
    }
  ];

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLevel = e.target.value;
    setLevel(nextLevel);
    setLevelHistory(prev => {
      if (prev[prev.length - 1] === nextLevel) return prev;
      return [...prev, nextLevel];
    });
    if (nextLevel !== selectedEmp.initialLevel) {
      setShowUnionAlert(true);
    } else {
      setShowUnionAlert(false);
    }
  };

  const toggleParam = (id: string) => {
    setExpandedParams(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Sticky Header / Actions */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b pb-4 pt-4 sm:pt-0 sm:bg-transparent sm:backdrop-blur-none sm:border-0 sm:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Assessment: {selectedEmp.name}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3 text-primary dark:text-primary-foreground">
            Q1 2026 Evaluation
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-muted border border-border text-muted-foreground font-sans">
              Draft
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Save className="h-4 w-4" /> Save Draft
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Send className="h-4 w-4" /> Submit
          </button>
        </div>
      </div>

      {/* Header Info Card */}
      <div className="card p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 bg-white dark:bg-card">
        {/* Searchable Dropdown */}
        <div className="space-y-1 relative">
          <label className="text-xs font-semibold text-primary/70 dark:text-primary/90 uppercase tracking-wider">Employee</label>
          
          <div 
            className="input-field cursor-pointer flex items-center justify-between bg-muted/30"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="font-medium">{selectedEmp.name}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-card border rounded-md shadow-lg z-50 overflow-hidden">
              <div className="p-2 border-b bg-muted/20 flex items-center px-3">
                <Search className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
                <input 
                  type="text"
                  autoFocus
                  placeholder="Search employee..." 
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground h-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="max-h-48 overflow-y-auto py-1">
                {filteredEmployees.length > 0 ? filteredEmployees.map(emp => (
                  <div 
                    key={emp.id}
                    className="px-3 py-2 text-sm hover:bg-muted cursor-pointer flex items-center justify-between"
                    onClick={() => {
                      setSelectedEmp(emp);
                      setLevel(emp.initialLevel);
                      setLevelHistory([emp.initialLevel]);
                      setShowUnionAlert(false);
                      setIsDropdownOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    {emp.name}
                    {selectedEmp.id === emp.id && <Check className="h-4 w-4 text-primary" />}
                  </div>
                )) : (
                  <div className="px-3 py-3 text-sm text-muted-foreground text-center">No employees found</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-primary/70 dark:text-primary/90 uppercase tracking-wider">Department</label>
          <div className="input-field bg-muted/20 text-muted-foreground items-center flex pointer-events-none">
            {selectedEmp.department}
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-primary/70 dark:text-primary/90 uppercase tracking-wider">Role</label>
          <div className="input-field bg-muted/20 text-muted-foreground items-center flex pointer-events-none">
            {selectedEmp.role}
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-primary/70 dark:text-primary/90 uppercase tracking-wider flex items-center justify-between">
            <span>Level</span>
            <button
              type="button"
              onClick={() => setIsHistoryModalOpen(true)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50 hover:dark:bg-amber-950/50 uppercase tracking-wider transition-colors cursor-pointer"
            >
              <History className="h-2.5 w-2.5" /> Level History
            </button>
          </label>
          <select 
            value={level} 
            onChange={handleLevelChange}
            className="input-field bg-primary/5 border-primary/20 focus:border-primary font-medium text-primary dark:text-primary-foreground"
          >
            <option value="L2">L2 - Associate</option>
            <option value="L3">L3 - Senior Associate</option>
            <option value="L4">L4 - Principal</option>
          </select>
          {level !== selectedEmp.initialLevel && (
            <div className="flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-semibold animate-in fade-in slide-in-from-top-1 duration-200">
              <span className="text-[10px] text-muted-foreground font-normal">Evaluating change: {selectedEmp.initialLevel} ➔ {level}</span>
            </div>
          )}
        </div>
      </div>

      {/* Union Logic Alert */}
      {showUnionAlert && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900 dark:border-amber-500/30 dark:bg-amber-900/20 dark:text-amber-400 flex items-start gap-3 shadow-sm">
          <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0 text-amber-600 dark:text-amber-500" />
          <div>
            <h4 className="font-semibold text-sm">Level Change Detected (Union Mode Active)</h4>
            <p className="text-sm mt-1 opacity-90">
              You are now evaluating {selectedEmp.name} across merged criteria from their previous level ({selectedEmp.initialLevel}) and the new level ({level}). Previously saved values for {selectedEmp.initialLevel} responsibilities have been retained.
            </p>
          </div>
        </div>
      )}

      {/* Collapsible Table UI */}
      <div className="card overflow-hidden">
        <div className="w-full text-left bg-muted/30 border-b">
          <div className="flex font-semibold text-sm text-muted-foreground px-4 py-3">
            <div className="w-8 shrink-0"></div>
            <div className="w-20 text-center">Level</div>
            <div className="flex-1">Parameter / Responsibility</div>
            <div className="w-40 px-2">Status</div>
            <div className="w-[300px] px-2">Manager Notes</div>
          </div>
        </div>

        <div className="divide-y divide-border">
          {parameters.map((param) => (
            <div key={param.id} className="flex flex-col">
              
              {/* Parameter Collapsible Header */}
              <button 
                onClick={() => toggleParam(param.id)}
                className="flex items-center w-full text-left px-4 py-3 bg-secondary/30 hover:bg-secondary/50 transition-colors group"
              >
                <div className="w-8 shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                  {expandedParams[param.id] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </div>
                <h3 className="flex-1 font-semibold text-primary dark:text-primary-foreground">
                  {param.name}
                </h3>
                <div className="w-40"></div>
                <div className="w-[300px] text-right">
                  <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded-md border shadow-sm">
                    {param.responsibilities.length} items
                  </span>
                </div>
              </button>
              
              {/* R&R Table Rows */}
              {expandedParams[param.id] && (
                <div className="divide-y divide-border/50 bg-background">
                  {param.responsibilities.map((rr) => {
                    const currentStatus = statusValues[rr.id] || "";
                    const statusConfig = statuses.find(s => s.id === currentStatus);

                    return (
                      <div key={rr.id} className={`flex items-start px-4 py-3 transition-colors ${rr.isNew ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-muted/30'}`}>
                        <div className="w-8 shrink-0"></div>
                        
                        {/* Level Indicator */}
                        <div className="w-20 pt-1 pr-2 flex justify-center">
                          <span className={`inline-flex items-center justify-center h-5 px-2 rounded text-[11px] font-bold border shadow-sm ${rr.isNew ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-muted-foreground border-border'}`}>
                            {rr.level}
                          </span>
                        </div>

                        {/* Description */}
                        <div className="flex-1 pl-2 pr-6 pt-1">
                          <p className="text-sm text-foreground leading-relaxed">
                            {rr.desc}
                          </p>
                          {rr.isNew && (
                            <span className="mt-2 text-[10px] font-semibold text-primary uppercase tracking-wider flex items-center gap-1">
                              <Info className="h-3 w-3" /> New Requirement
                            </span>
                          )}
                        </div>

                        {/* Status Dropdown */}
                        <div className="w-40 px-2 pt-1">
                          <select 
                            className={`input-field font-medium text-xs h-8 ${statusConfig ? statusConfig.color : 'text-muted-foreground bg-background'}`}
                            value={currentStatus}
                            onChange={(e) => setStatusValues({...statusValues, [rr.id]: e.target.value})}
                          >
                            <option value="" disabled>Select status...</option>
                            {statuses.map(s => (
                              <option key={s.id} value={s.id}>{s.label}</option>
                            ))}
                          </select>
                        </div>

                        {/* Notes Input */}
                        <div className="w-[300px] px-2 pt-1">
                          <input 
                            type="text"
                            className="input-field text-xs h-8 bg-background focus:bg-background"
                            placeholder="Add notes..."
                            defaultValue={currentStatus ? "Employee has consistently met expectations..." : ""}
                          />
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Level History Modal */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-md rounded-xl shadow-xl border overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                <History className="h-5 w-5 text-amber-500" />
                Level Change History
              </h3>
              <button 
                onClick={() => setIsHistoryModalOpen(false)}
                className="p-1 rounded-md text-muted-foreground hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="text-center pb-4 border-b">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Active Evaluation</p>
                <h4 className="text-base font-bold mt-1">{selectedEmp.name}</h4>
                <p className="text-xs text-muted-foreground">{selectedEmp.role} • {selectedEmp.department}</p>
              </div>

              {/* Timeline Flow */}
              <div className="relative pl-6 space-y-6 border-l border-border/85 ml-2 py-1">
                {/* Older / Initial Level */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-muted border-2 border-border"></span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Older Level (Initial)</span>
                    <span className="text-sm font-semibold text-foreground mt-0.5">{selectedEmp.initialLevel}</span>
                  </div>
                </div>

                {/* Previous Level */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-100 border-2 border-amber-500"></span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">Previous Level</span>
                    <span className="text-sm font-semibold text-foreground mt-0.5">
                      {levelHistory.length > 1 ? levelHistory[levelHistory.length - 2] : selectedEmp.initialLevel}
                    </span>
                  </div>
                </div>

                {/* Current Level */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary border-2 border-primary-foreground"></span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wide">Current Level</span>
                    <span className="text-sm font-bold text-primary dark:text-primary-foreground mt-0.5">
                      {level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeline Sequence */}
              <div className="bg-muted/30 p-3 rounded-lg border text-xs flex flex-wrap items-center gap-1.5">
                <span className="font-semibold text-muted-foreground shrink-0">Sequence:</span>
                {levelHistory.map((lvl, index) => (
                  <span key={index} className="flex items-center gap-1.5">
                    {index > 0 && <span className="text-muted-foreground/60">➔</span>}
                    <span className={`px-1.5 py-0.5 rounded font-bold ${index === levelHistory.length - 1 ? 'bg-primary text-primary-foreground' : 'bg-background border'}`}>
                      {lvl}
                    </span>
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-end p-4 border-t bg-muted/20">
              <button onClick={() => setIsHistoryModalOpen(false)} className="btn-primary">Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
