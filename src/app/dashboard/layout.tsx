"use client";
import { useState, useEffect } from "react";
import { LayoutDashboard, Users, Settings, LogOut, Search, Bell, Building2, History, Users2, Shield, Sun, Moon, Menu, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isUserManagementExpanded, setIsUserManagementExpanded] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (pathname === "/dashboard/user-master" || pathname === "/dashboard/roles-rights") {
      setIsUserManagementExpanded(true);
    }
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

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
      <aside className={`fixed inset-y-0 left-0 z-20 hidden flex-col border-r bg-card sm:flex transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className={`flex h-14 items-center border-b lg:h-[60px] transition-all duration-300 ${isSidebarCollapsed ? 'justify-center px-4' : 'justify-start px-6'}`}>
          <Link href="/" className="flex items-center gap-2.5 font-semibold">
            <div className="h-7 w-7 bg-primary rounded-md flex items-center justify-center text-primary-foreground shadow-sm shrink-0">
              <Building2 size={16} />
            </div>
            {!isSidebarCollapsed && (
              <span className="text-foreground tracking-tight whitespace-nowrap animate-in fade-in duration-300">PMS Portal</span>
            )}
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-3 text-sm font-medium gap-1">
            {navItems.map((item) => {
              if (item.isParent) {
                if (isSidebarCollapsed) {
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setIsSidebarCollapsed(false);
                        setIsUserManagementExpanded(true);
                      }}
                      title={item.name}
                      className="flex items-center justify-center rounded-md py-2.5 px-0 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all w-full cursor-pointer"
                    >
                      <item.icon className="h-[18px] w-[18px]" />
                    </button>
                  );
                }

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setIsUserManagementExpanded(!isUserManagementExpanded)}
                    className="flex w-full items-center justify-between gap-3 px-3 py-2.5 mt-1 rounded-md text-foreground font-semibold hover:bg-muted/30 cursor-pointer text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-[18px] w-[18px] text-primary" />
                      <span className="text-sm font-semibold">{item.name}</span>
                    </div>
                    {isUserManagementExpanded ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                );
              }

              if (item.isChild) {
                if (!isUserManagementExpanded || isSidebarCollapsed) return null;
              }

              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  title={isSidebarCollapsed ? item.name : undefined}
                  className={`flex items-center gap-3 rounded-md py-2.5 transition-all ${
                    item.isChild ? "ml-6 px-3" : "px-3"
                  } ${
                    isActive 
                      ? "bg-muted text-foreground font-semibold" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  } ${isSidebarCollapsed ? "justify-center px-0 ml-0 animate-in zoom-in-95 duration-200" : ""}`}
                >
                  <item.icon className={`h-[18px] w-[18px] ${item.isChild ? "opacity-70" : ""}`} />
                  {!isSidebarCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          <button 
            onClick={() => router.push("/")}
            title={isSidebarCollapsed ? "Sign Out" : undefined}
            className={`flex items-center gap-3 rounded-md py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors ${
              isSidebarCollapsed ? "justify-center px-0 w-full" : "w-full px-3"
            }`}
          >
            <LogOut className="h-[18px] w-[18px]" />
            {!isSidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex flex-col sm:gap-4 sm:py-4 w-full transition-all duration-300 ${isSidebarCollapsed ? 'sm:pl-16' : 'sm:pl-64'}`}>
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-card px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 shadow-sm sm:shadow-none">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground mr-2 cursor-pointer hidden sm:flex shrink-0"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <Menu className="h-5 w-5" />
          </button>
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
            <button 
              onClick={toggleTheme} 
              className="btn-ghost size-8 p-0 rounded-full flex items-center justify-center relative hover:bg-muted transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="h-4.5 w-4.5 text-muted-foreground hover:text-foreground transition-colors" />
              ) : (
                <Sun className="h-4.5 w-4.5 text-muted-foreground hover:text-foreground transition-colors" />
              )}
            </button>
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
