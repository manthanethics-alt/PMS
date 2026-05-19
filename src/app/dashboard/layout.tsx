"use client";
import { LayoutDashboard, Users, Settings, LogOut, Search, Bell, Building2, History, Users2, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Assessments", href: "/dashboard/assessments", icon: Users },
    { name: "Master Settings", href: "/dashboard/masters", icon: Settings },
    { name: "User Management", href: "#", icon: Users2, isParent: true },
    { name: "User Master", href: "/dashboard/user-master", icon: Users2, isChild: true },
    { name: "Roles & Rights", href: "/dashboard/roles-rights", icon: Shield, isChild: true },
    { name: "Audit Log", href: "/dashboard/audit-log", icon: History },
  ];

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r bg-card sm:flex">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2.5 font-semibold">
            <div className="h-7 w-7 bg-primary rounded-md flex items-center justify-center text-primary-foreground shadow-sm">
              <Building2 size={16} />
            </div>
            <span className="text-foreground tracking-tight">PMS Portal</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-3 text-sm font-medium gap-1">
            {navItems.map((item) => {
              if (item.isParent) {
                return (
                  <div key={item.name} className="flex items-center gap-3 px-3 py-2.5 mt-1 text-foreground font-semibold opacity-80 pointer-events-none">
                    <item.icon className="h-[18px] w-[18px]" />
                    {item.name}
                  </div>
                );
              }

              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md py-2.5 transition-all ${
                    item.isChild ? "ml-6 px-3" : "px-3"
                  } ${
                    isActive 
                      ? "bg-muted text-foreground font-semibold" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <item.icon className={`h-[18px] w-[18px] ${item.isChild ? "opacity-70" : ""}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          <button 
            onClick={() => router.push("/")}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
          >
            <LogOut className="h-[18px] w-[18px]" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 w-full">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-card px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 shadow-sm sm:shadow-none">
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search globally..."
                  className="input-field pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-card"
                />
              </div>
            </div>
            <button className="btn-ghost size-8 p-0 rounded-full relative">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-destructive rounded-full"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold cursor-pointer shadow-sm">
              HR
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 items-start p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
