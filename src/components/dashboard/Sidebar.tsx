"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    MapPin,
    AlertCircle,
    CheckSquare,
    BarChart3,
    Settings,
    LogOut,
    Zap
} from "lucide-react";

const navigationItems = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        label: 'Facilities',
        href: '/dashboard/facilities',
        icon: MapPin,
    },
    {
        label: 'Alerts',
        href: '/dashboard/alerts',
        icon: AlertCircle,
    },
    {
        label: 'Tasks',
        href: '/dashboard/tasks',
        icon: CheckSquare,
    },
    {
        label: 'Analytics',
        href: '/dashboard/analytics',
        icon: BarChart3,
    }
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full w-64 bg-card border-r border-border">
            <div className="p-6 flex items-center gap-2 border-b border-border/50">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h1 className="font-bold text-xl tracking-tight">GreenGrid</h1>
                    <p className="text-xs text-muted-foreground">Enterprise Edition</p>
                </div>
            </div>

            <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Main Menu
                </div>
                {navigationItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-sm"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                            {item.label}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-border/50 space-y-1">
                <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                    <Settings className="h-4 w-4" />
                    Settings
                </Link>
                <button
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors text-left"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </div>
    );
}
