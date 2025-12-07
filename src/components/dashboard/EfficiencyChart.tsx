"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
    { date: "Mon", efficiency: 92 },
    { date: "Tue", efficiency: 94 },
    { date: "Wed", efficiency: 91 },
    { date: "Thu", efficiency: 95 },
    { date: "Fri", efficiency: 93 },
    { date: "Sat", efficiency: 96 },
    { date: "Sun", efficiency: 94 },
];

export function EfficiencyChart() {
    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-1 bg-card border-border">
            <CardHeader>
                <CardTitle>Efficiency Trend (7 Days)</CardTitle>
            </CardHeader>
            <CardContent className="pl-0">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis
                                dataKey="date"
                                stroke="#94a3b8"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#94a3b8"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}%`}
                                domain={[80, 100]}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                                itemStyle={{ color: "#f1f5f9" }}
                            />
                            <Line
                                type="monotone"
                                dataKey="efficiency"
                                stroke="#38bdf8"
                                strokeWidth={2}
                                dot={{ fill: "#38bdf8", strokeWidth: 2 }}
                                activeDot={{ r: 6, fill: "#38bdf8" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
