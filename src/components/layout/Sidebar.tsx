"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Factory,
    AlertTriangle,
    ClipboardList,
    BarChart3,
    Settings,
    LogOut,
    Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Facilities",
        href: "/dashboard/facilities", // Assuming a list page or just a placeholder for now
        icon: Factory,
    },
    {
        title: "Alerts",
        href: "/dashboard/alerts",
        icon: AlertTriangle,
    },
    {
        title: "Tasks",
        href: "/dashboard/tasks",
        icon: ClipboardList,
    },
    {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div
            className={cn(
                "flex flex-col h-screen bg-card border-r border-border transition-all duration-300",
                collapsed ? "w-16" : "w-64"
            )}
        >
            <div className="flex items-center justify-between p-4 h-16 border-b border-border">
                {!collapsed && (
                    <div className="flex items-center gap-2 font-bold text-xl text-primary">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                            G
                        </div>
                        GreenGrid
                    </div>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className={cn("ml-auto", collapsed && "mx-auto")}
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            <nav className="flex-1 py-4 gap-1 flex flex-col px-2">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                collapsed && "justify-center px-2"
                            )}
                        >
                            <item.icon className="h-5 w-5 shrink-0" />
                            {!collapsed && <span>{item.title}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border mt-auto">
                <Link
                    href="/settings"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
                        collapsed && "justify-center px-2"
                    )}
                >
                    <Settings className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>Settings</span>}
                </Link>
                <button
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-destructive hover:bg-destructive/10 transition-colors w-full mt-1",
                        collapsed && "justify-center px-2"
                    )}
                >
                    <LogOut className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
}
