"use client";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const accuracyData = [
    { name: "Solar A", accuracy: 92 },
    { name: "Wind B", accuracy: 88 },
    { name: "Hydro C", accuracy: 95 },
    { name: "Solar D", accuracy: 85 },
];

const costData = [
    { month: "Jan", maintenance: 4000, prevention: 2400 },
    { month: "Feb", maintenance: 3000, prevention: 1398 },
    { month: "Mar", maintenance: 2000, prevention: 9800 },
    { month: "Apr", maintenance: 2780, prevention: 3908 },
    { month: "May", maintenance: 1890, prevention: 4800 },
    { month: "Jun", maintenance: 2390, prevention: 3800 },
];

const roiData = [
    { name: "Solar A", value: 400 },
    { name: "Wind B", value: 300 },
    { name: "Hydro C", value: 300 },
    { name: "Solar D", value: 200 },
];

const COLORS = ["#38bdf8", "#10b981", "#f59e0b", "#ef4444"];

export function PredictiveAccuracyChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                    itemStyle={{ color: "#f1f5f9" }}
                    cursor={{ fill: "#334155", opacity: 0.4 }}
                />
                <Bar dataKey="accuracy" fill="#38bdf8" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}

export function CostSavingsChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                    itemStyle={{ color: "#f1f5f9" }}
                />
                <Legend />
                <Area type="monotone" dataKey="maintenance" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                <Area type="monotone" dataKey="prevention" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export function ROIDistributionChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={roiData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {roiData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                    itemStyle={{ color: "#f1f5f9" }}
                />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}
