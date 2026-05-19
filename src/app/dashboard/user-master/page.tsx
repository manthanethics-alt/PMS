"use client";
import { useState } from "react";
import { UserPlus, Search, Edit, Lock, Mail, Users2, Shield, X } from "lucide-react";

export default function UsersPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const users = [
    { id: 1, name: "Jane Doe", email: "jane.doe@company.com", role: "HR Admin", status: "Active", lastLogin: "2 hours ago" },
    { id: 2, name: "John Smith", email: "john.s@company.com", role: "Manager", status: "Active", lastLogin: "1 day ago" },
    { id: 3, name: "Alice Brown", email: "alice.b@company.com", role: "Reviewer", status: "Suspended", lastLogin: "2 weeks ago" },
    { id: 4, name: "Mark Taylor", email: "mark.t@company.com", role: "Super Admin", status: "Active", lastLogin: "Just now" },
    { id: 5, name: "Sarah Connor", email: "sarah.c@company.com", role: "Manager", status: "Locked", lastLogin: "5 days ago" },
  ];

  return (
    <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage system access, roles, and manager-employee mappings.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Invite Users
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Add User
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">

        {/* Toolbar */}
        <div className="p-4 flex items-center gap-4 border-b bg-muted/20">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search by name or email..." className="input-field pl-9 bg-background" />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <select className="input-field w-[150px] bg-background">
              <option value="">All Roles</option>
              <option value="HR Admin">HR Admin</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="relative w-full overflow-auto min-h-[400px]">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="h-10 px-4 font-medium text-muted-foreground w-8"><input type="checkbox" className="rounded border-input" /></th>
                <th className="h-10 px-4 font-medium text-muted-foreground">Name</th>
                <th className="h-10 px-4 font-medium text-muted-foreground">Email</th>
                <th className="h-10 px-4 font-medium text-muted-foreground">System Role</th>
                <th className="h-10 px-4 font-medium text-muted-foreground">Status</th>
                <th className="h-10 px-4 font-medium text-muted-foreground">Last Login</th>
                <th className="h-10 px-4 font-medium text-muted-foreground text-right w-[120px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="p-4"><input type="checkbox" className="rounded border-input" /></td>
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4 text-muted-foreground">{user.email}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-muted border">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${
                      user.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 
                      user.status === 'Suspended' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20' : 
                      'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'
                    }`}>
                      {user.status}
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground text-xs">{user.lastLogin}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-muted-foreground hover:text-primary rounded hover:bg-muted transition-colors" title="Edit User">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-muted-foreground hover:text-amber-600 rounded hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors" title="Reset Password">
                        <Lock className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-lg rounded-xl shadow-xl border overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-lg text-foreground">Add New User</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-md text-muted-foreground hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex gap-4">
                <div className="space-y-1.5 flex-1">
                  <label className="text-sm font-medium">First Name</label>
                  <input type="text" placeholder="e.g. Jane" className="input-field" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <label className="text-sm font-medium">Last Name</label>
                  <input type="text" placeholder="e.g. Doe" className="input-field" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Email Address</label>
                <input type="email" placeholder="jane.doe@company.com" className="input-field" />
              </div>
              <div className="flex gap-4">
                <div className="space-y-1.5 flex-1">
                  <label className="text-sm font-medium">Department</label>
                  <select className="input-field bg-background">
                    <option value="">Select Department...</option>
                    <option>Engineering</option>
                    <option>Product</option>
                    <option>Design</option>
                    <option>HR</option>
                  </select>
                </div>
                <div className="space-y-1.5 flex-1">
                  <label className="text-sm font-medium">System Role</label>
                  <select className="input-field bg-background">
                    <option>Employee</option>
                    <option>Manager</option>
                    <option>Reviewer</option>
                    <option>HR Admin</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Reporting Manager</label>
                <select className="input-field bg-background">
                  <option value="">Select Manager...</option>
                  <option>John Smith (Engineering)</option>
                  <option>Sarah Connor (Product)</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">Leave blank if the user does not have a manager.</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border-t bg-muted/20">
              <button className="btn-outline text-xs h-8">Sync via Odoo</button>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsAddModalOpen(false)} className="btn-ghost">Cancel</button>
                <button onClick={() => setIsAddModalOpen(false)} className="btn-primary">Create User</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
