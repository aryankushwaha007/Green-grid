"use client";

import { KPICard } from "@/components/dashboard/KPICard";
import { FacilityCard } from "@/components/dashboard/FacilityCard";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { EfficiencyChart } from "@/components/dashboard/EfficiencyChart";
import { UploadComponent } from "@/components/dashboard/UploadComponent";
import { Factory, AlertTriangle, Zap, ShieldCheck } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useFacilities, useAlerts, useTasks } from "@/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
    const { facilities, isLoading: facilitiesLoading } = useFacilities();
    const { alerts, isLoading: alertsLoading, updateAlert } = useAlerts();
    const { createTask } = useTasks(); // Import useTasks to create tasks from alerts

    const handleDismissAlert = (id: string) => {
        updateAlert(id, { status: 'dismissed' });
    };

    const handleApproveAction = (id: string) => {
        const alert = alerts?.find(a => a.id === id);
        if (alert) {
            createTask({
                facility_id: alert.facility_id,
                linked_alert: alert.id,
                type: 'repair',
                title: `Fix: ${alert.message}`,
                priority: alert.severity === 'critical' ? 'critical' : 'high',
                status: 'to_do',
                created_at: new Date().toISOString(),
                deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h deadline
                estimated_duration_hours: alert.estimated_fix_time_hours || 4
            });
            updateAlert(id, { status: 'in_progress' });
        }
    };

    if (facilitiesLoading || alertsLoading) {
        return <DashboardSkeleton />;
    }

    const activeAlerts = alerts?.filter(a => a.status === 'open' || a.status === 'in_progress') || [];
    const criticalAlerts = activeAlerts.filter(a => a.severity === 'critical' || a.severity === 'high');

    // Calculate aggregate metrics
    const totalCapacity = facilities?.reduce((acc, f) => acc + f.capacity.mw, 0) || 0;
    const avgEfficiency = facilities && facilities.length > 0
        ? facilities.reduce((acc, f) => acc + f.efficiency, 0) / facilities.length
        : 0;
    const operationalFacilities = facilities?.filter(f => f.status === 'operational').length || 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-sm py-1">
                        Last updated: {new Date().toLocaleTimeString()}
                    </Badge>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KPICard
                    title="Total Capacity"
                    value={`${totalCapacity} MW`}
                    icon={Zap}
                    trend={{ value: 12, label: "vs last month", positive: true }}
                />
                <KPICard
                    title="Avg Efficiency"
                    value={`${avgEfficiency.toFixed(1)}%`}
                    icon={Factory}
                    trend={{ value: 2.1, label: "vs last month", positive: true }}
                />
                <KPICard
                    title="Active Alerts"
                    value={activeAlerts.length.toString()}
                    icon={AlertTriangle}
                    trend={{ value: 5, label: "new today", positive: false }}
                />
                <KPICard
                    title="Operational Status"
                    value={`${operationalFacilities}/${facilities?.length || 0}`}
                    icon={ShieldCheck}
                    trend={{ value: 100, label: "uptime", positive: true }}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Upload Section */}
                <div className="col-span-7">
                    <UploadComponent />
                </div>

                {/* Efficiency Chart */}
                <div className="col-span-4">
                    <div className="rounded-xl border bg-card text-card-foreground shadow">
                        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="tracking-tight text-sm font-medium">Efficiency Trends</h3>
                        </div>
                        <div className="p-6 pt-0">
                            <EfficiencyChart />
                        </div>
                    </div>
                </div>

                {/* Recent Alerts */}
                <div className="col-span-3 space-y-4">
                    <h3 className="font-semibold text-lg">Critical Alerts</h3>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {criticalAlerts.slice(0, 5).map((alert) => (
                            <AlertCard
                                key={alert.id}
                                alert={alert}
                                compact
                                onDismiss={handleDismissAlert}
                                onAction={handleApproveAction}
                            />
                        ))}
                        {criticalAlerts.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground border rounded-lg bg-muted/10">
                                No critical alerts at this time.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Facility Status Grid */}
            <div>
                <h3 className="font-semibold text-lg mb-4">Facility Status</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {facilities?.map((facility) => (
                        <FacilityCard key={facility.id} facility={facility} />
                    ))}
                </div>
            </div>

            {/* Recent Maintenance Events */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Event</TableHead>
                            <TableHead>Facility</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Quarterly Inspection</TableCell>
                            <TableCell>Saudi Solar Farm A</TableCell>
                            <TableCell><Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Completed</Badge></TableCell>
                            <TableCell>2025-11-20</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Turbine Blade Repair</TableCell>
                            <TableCell>UAE Wind Park B</TableCell>
                            <TableCell><Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Scheduled</Badge></TableCell>
                            <TableCell>2025-11-30</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Inverter Replacement</TableCell>
                            <TableCell>Egypt Hybrid Power</TableCell>
                            <TableCell><Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge></TableCell>
                            <TableCell>2025-12-05</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-6 w-32" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-32" />
                ))}
            </div>
            <div className="grid gap-6 md:grid-cols-7">
                <Skeleton className="col-span-4 h-[400px]" />
                <div className="col-span-3 space-y-4">
                    <Skeleton className="h-6 w-32" />
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-24" />
                    ))}
                </div>
            </div>
        </div>
    );
}
