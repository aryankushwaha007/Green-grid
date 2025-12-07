"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Calendar } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { useAlerts } from "@/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";

export default function AlertsPage() {
    const { alerts, isLoading, updateAlert } = useAlerts();
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterSeverity, setFilterSeverity] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    if (isLoading) {
        return <AlertsSkeleton />;
    }

    const filteredAlerts = alerts?.filter((alert) => {
        const matchesStatus = filterStatus === "all" || alert.status === filterStatus;
        const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity;
        const matchesSearch =
            alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
            alert.facility_name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSeverity && matchesSearch;
    }) || [];

    const handleExport = async () => {
        if (!filteredAlerts.length) return;

        // Dynamically import jspdf to avoid server-side issues
        const jsPDF = (await import('jspdf')).default;
        const autoTable = (await import('jspdf-autotable')).default;

        const doc = new jsPDF();

        // Add title
        doc.setFontSize(18);
        doc.text("Alerts Report", 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

        // Define columns and rows
        const tableColumn = ["Facility", "Severity", "Message", "Status", "Confidence", "Time"];
        const tableRows = filteredAlerts.map(alert => [
            alert.facility_name,
            alert.severity.toUpperCase(),
            alert.message,
            alert.status.replace('_', ' '),
            `${alert.confidence}%`,
            new Date(alert.createdAt).toLocaleString()
        ]);

        // Generate table
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 40,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [22, 163, 74] }, // Emerald color
        });

        // Save PDF
        doc.save(`alerts_report_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Alerts Management</h1>
                    <p className="text-muted-foreground">Monitor and respond to predictive maintenance alerts.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Last 7 Days
                    </Button>
                    <Button variant="outline" onClick={handleExport} disabled={filteredAlerts.length === 0}>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search alerts..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger className="w-[150px]">
                                    <Filter className="mr-2 h-4 w-4" />
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="open">Open</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                                <SelectTrigger className="w-[150px]">
                                    <Filter className="mr-2 h-4 w-4" />
                                    <SelectValue placeholder="Severity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Severity</SelectItem>
                                    <SelectItem value="critical">Critical</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Severity</TableHead>
                                <TableHead>Facility</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>Confidence</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAlerts.map((alert) => (
                                <TableRow key={alert.id}>
                                    <TableCell>
                                        <StatusBadge status={alert.severity === 'critical' ? 'failure' : alert.severity === 'high' ? 'warning' : 'neutral'} label={alert.severity} />
                                    </TableCell>
                                    <TableCell className="font-medium">{alert.facility_name}</TableCell>
                                    <TableCell className="max-w-[300px] truncate" title={alert.message}>
                                        {alert.message}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={alert.confidence > 90 ? "border-emerald-500 text-emerald-500" : ""}>
                                            {alert.confidence}%
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="capitalize">{alert.status.replace('_', ' ')}</Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {new Date(alert.createdAt).toLocaleTimeString()}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="sm" asChild>
                                            <a href={`/dashboard/facility/${alert.facility_id}`}>View</a>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                            onClick={() => updateAlert(alert.id, { status: 'dismissed' })}
                                        >
                                            Dismiss
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredAlerts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                        No alerts found matching your filters.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

function AlertsSkeleton() {
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
            <Skeleton className="h-[500px] w-full" />
        </div>
    );
}
