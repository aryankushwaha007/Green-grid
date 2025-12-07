"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Download, Share2 } from "lucide-react";
import {
    PredictiveAccuracyChart,
    CostSavingsChart,
    ROIDistributionChart
} from "@/components/dashboard/AnalyticsCharts";
import { EfficiencyChart } from "@/components/dashboard/EfficiencyChart";

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
                    <p className="text-muted-foreground">Deep dive into facility performance and ROI.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Last 30 Days
                    </Button>
                    <Button variant="outline">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Export PDF
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Uptime</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">99.8%</div>
                        <p className="text-xs text-muted-foreground mt-1">+0.2% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Failures Prevented</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">14</div>
                        <p className="text-xs text-muted-foreground mt-1">Estimated savings: $45k</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Maintenance ROI</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">320%</div>
                        <p className="text-xs text-muted-foreground mt-1">For every $1 spent</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">94.2%</div>
                        <p className="text-xs text-muted-foreground mt-1">Model confidence</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-2 lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Cost Savings Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CostSavingsChart />
                    </CardContent>
                </Card>
                <Card className="col-span-2 lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Predictive Model Accuracy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PredictiveAccuracyChart />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="col-span-2">
                    <EfficiencyChart />
                </div>
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>ROI by Facility</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ROIDistributionChart />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
