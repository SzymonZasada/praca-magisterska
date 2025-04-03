import { cn } from "@/lib/utils";
import {
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Settings,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  mobile?: boolean;
  closeSidebar?: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile = false, closeSidebar }) => {
  const location = useLocation();

  const navigation: NavItem[] = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Projekty", href: "/projects", icon: FolderKanban },
    { name: "Ustawienia", href: "/settings", icon: Settings },
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-700">
        <Link to="/" className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-indigo-600 mr-3 flex items-center justify-center">
            <span className="text-white font-bold">SZ</span>
          </div>
          <span className="text-lg font-semibold dark:text-white">SZ</span>
        </Link>

        {mobile && closeSidebar && (
          <button
            onClick={closeSidebar}
            className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col py-4 overflow-y-auto">
        <nav className="flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const IconComponent = item.icon;

            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-3 text-sm font-medium rounded-md",
                  isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
                )}
              >
                <IconComponent
                  className={cn(
                    "mr-3 h-5 w-5",
                    isActive
                      ? "text-indigo-500 dark:text-indigo-400"
                      : "text-slate-500 dark:text-slate-400"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50 rounded-md">
          <LogOut className="mr-3 h-5 w-5 text-slate-500 dark:text-slate-400" />
          Wyloguj
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
