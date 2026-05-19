"use client";
import { Users, FileText, CheckCircle2, AlertCircle, TrendingUp, History } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { label: "Total Employees", value: "2,450", change: "+12% from last month", icon: Users },
    { label: "Active Assessments", value: "128", change: "+4 pending", icon: FileText },
    { label: "Completion Rate", value: "85%", change: "+2% from Q4", icon: CheckCircle2 },
    { label: "Pending Reviews", value: "14", change: "Requires attention", icon: AlertCircle },
  ];

  return (
    <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <div className="flex gap-2">
          <button className="btn-outline">View All Assessments</button>
          <button className="btn-primary">Start New Assessment</button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="card p-6 flex flex-col justify-between hover:border-foreground/20 transition-colors">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{stat.label}</h3>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Assessment Progress Chart Placeholder */}
        <div className="card col-span-4 flex flex-col">
          <div className="p-6 pb-2 border-b">
            <h3 className="font-semibold leading-none tracking-tight">Assessment Progress</h3>
            <p className="text-sm text-muted-foreground mt-1.5">Overview of evaluations across departments for Q1 2026.</p>
          </div>
          <div className="flex-1 p-6 flex items-center justify-center min-h-[300px]">
            <div className="w-full h-full border border-dashed rounded-lg bg-muted/20 flex flex-col items-center justify-center text-muted-foreground">
              <FileText className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm font-medium">Progress Chart</p>
              <p className="text-xs">Data visualisation placeholder</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="card col-span-3 flex flex-col">
          <div className="p-6 pb-2 border-b">
            <h3 className="font-semibold leading-none tracking-tight">Recent Activity</h3>
            <p className="text-sm text-muted-foreground mt-1.5">Latest system audit log entries.</p>
          </div>
          <div className="p-0">
            <div className="divide-y">
              {[
                { user: "Jane Doe", initial: "JD", action: "submitted assessment for", target: "Alex T.", time: "2 hours ago" },
                { user: "Mike R.", initial: "MR", action: "changed level to L3 for", target: "Sarah W.", time: "4 hours ago" },
                { user: "System", initial: "SY", action: "synced Odoo employees", target: "success", time: "5 hours ago" },
                { user: "Admin", initial: "AD", action: "created new parameter", target: "Leadership", time: "1 day ago" },
                { user: "Jane Doe", initial: "JD", action: "saved draft for", target: "Tom B.", time: "1 day ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-foreground shrink-0 border">
                    {activity.initial}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.user} <span className="font-normal text-muted-foreground">{activity.action}</span> <span className="font-semibold">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <History className="h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t text-center mt-auto">
            <Link href="/dashboard/audit-log" className="text-sm font-medium text-foreground hover:underline">
              View full audit log
            </Link>
          </div>
        </div>

      </div>
      
    </div>
  );
}
