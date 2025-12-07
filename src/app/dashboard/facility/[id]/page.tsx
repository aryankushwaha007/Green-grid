"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { use, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { EfficiencyChart } from "@/components/dashboard/EfficiencyChart";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { PredictiveTimeline } from "@/components/dashboard/PredictiveTimeline";
import { getFacilityROI } from "@/lib/costAnalysis";
import {
    Thermometer,
    Activity,
    Zap,
    Wind,
    Sun,
    Battery,
    AlertTriangle,
    CheckCircle2,
    Wrench
} from "lucide-react";
import { useFacility, useAlerts } from "@/hooks/useData";
import { useRealtimeData } from "@/hooks/useRealtimeData";
import { Skeleton } from "@/components/ui/skeleton";

export default function FacilityDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { facility, isLoading: facilityLoading } = useFacility(id);
    const { alerts, isLoading: alertsLoading } = useAlerts();
    const { realtimeData, connectionStatus } = useRealtimeData(id);

    if (facilityLoading || alertsLoading) {
        return <FacilitySkeleton />;
    }

    if (!facility) {
        return <div>Facility not found</div>;
    }

    const facilityAlerts = alerts?.filter(a => a.facility_id === id) || [];
    const roiData = getFacilityROI(id);

    // Use real-time data if available, otherwise fallback to static facility data
    const currentTemp = realtimeData?.temperature ?? 42;
    const currentPower = realtimeData?.power_output ?? 48.5;
    const currentEfficiency = realtimeData?.efficiency ?? facility.efficiency;
    const currentVibration = realtimeData?.vibration ?? 0.4;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold tracking-tight">{facility.name}</h1>
                        <StatusBadge status={realtimeData?.status === 'warning' ? 'warning' : facility.status === 'operational' ? 'success' : 'warning'} />
                        {connectionStatus === 'connected' && (
                            <Badge variant="outline" className="text-emerald-500 border-emerald-500/50 animate-pulse">
                                Live
                            </Badge>
                        )}
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Sun className="h-4 w-4" />
                            <span>{facility.type.toUpperCase()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Zap className="h-4 w-4" />
                            <span>{facility.capacity.mw} MW Capacity</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => alert('Report downloaded')}>Download Report</Button>
                    <Button onClick={() => alert('Maintenance scheduled')}>Schedule Maintenance</Button>
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="alerts">Alerts ({facilityAlerts.length})</TabsTrigger>
                    <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {/* Health Score Gauge */}
                        <Card className="col-span-2 row-span-2">
                            <CardHeader>
                                <CardTitle>Overall Health Score</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center h-[300px]">
                                <div className="relative flex items-center justify-center">
                                    <svg className="h-48 w-48 transform -rotate-90">
                                        <circle
                                            className="text-muted/20"
                                            strokeWidth="12"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="90"
                                            cx="96"
                                            cy="96"
                                        />
                                        <circle
                                            className="text-primary transition-all duration-1000 ease-out"
                                            strokeWidth="12"
                                            strokeDasharray={565.48}
                                            strokeDashoffset={565.48 - (565.48 * facility.health_score) / 100}
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="90"
                                            cx="96"
                                            cy="96"
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-5xl font-bold">{facility.health_score}</span>
                                        <span className="text-sm text-muted-foreground">EXCELLENT</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-8 mt-8 w-full px-8">
                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">Predicted (7d)</p>
                                        <p className="text-xl font-semibold text-emerald-500">91</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">Trend</p>
                                        <p className="text-xl font-semibold text-emerald-500">+2.4%</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Real-time Metrics */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Real-time Efficiency</CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{currentEfficiency}%</div>
                                <Progress value={currentEfficiency} className="mt-2" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Power Output</CardTitle>
                                <Zap className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{currentPower} MW</div>
                                <p className="text-xs text-muted-foreground mt-1">97% of capacity</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                                <Thermometer className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{currentTemp}°C</div>
                                <p className="text-xs text-muted-foreground mt-1">Optimal range</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Vibration</CardTitle>
                                <Wind className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{currentVibration} mm/s</div>
                                <p className="text-xs text-muted-foreground mt-1">Normal levels</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Equipment Status & ROI */}
                    <div className="grid gap-6 md:grid-cols-3">
                        <Card className="col-span-2">
                            <CardHeader>
                                <CardTitle>Equipment Specifications</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(facility.equipment).map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 rounded-full bg-primary/10 text-primary">
                                                    <Wrench className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium capitalize">{key.replace(/_/g, ' ')}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>ROI Analysis</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Failures Prevented</p>
                                    <p className="text-3xl font-bold text-emerald-500">{roiData.preventedFailures}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Cost Savings</p>
                                    <p className="text-3xl font-bold text-emerald-500">${(roiData.totalSavings / 1000).toFixed(1)}k</p>
                                </div>
                                <div className="pt-4 border-t">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>Maintenance ROI</span>
                                        <span className="font-medium">{roiData.roi}%</span>
                                    </div>
                                    <Progress value={Math.min(roiData.roi / 10, 100)} className="h-2" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Efficiency Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Efficiency Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <EfficiencyChart />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Alerts Tab */}
                <TabsContent value="alerts">
                    <div className="space-y-4">
                        {facilityAlerts.map((alert) => (
                            <AlertCard key={alert.id} alert={alert} />
                        ))}
                        {facilityAlerts.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
                                No active alerts for this facility.
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="maintenance">
                    <Card>
                        <CardHeader>
                            <CardTitle>Predictive Maintenance Schedule</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PredictiveTimeline />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analytics">
                    <Card>
                        <CardHeader>
                            <CardTitle>Detailed Analytics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12 text-muted-foreground">
                                Advanced analytics module loading...
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function FacilitySkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>
            <Skeleton className="h-10 w-full" />
            <div className="grid gap-6 md:grid-cols-4">
                <Skeleton className="col-span-2 row-span-2 h-[300px]" />
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-32" />
                ))}
            </div>
        </div>
    );
}
