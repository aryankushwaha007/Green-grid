"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

interface TimelineEvent {
    id: string;
    title: string;
    date: string;
    type: "prediction" | "scheduled" | "completed";
    probability?: number; // For predictions
    impact?: "high" | "medium" | "low";
}

const mockTimeline: TimelineEvent[] = [
    {
        id: "1",
        title: "Inverter B Maintenance",
        date: "2025-12-01",
        type: "scheduled",
        impact: "medium",
    },
    {
        id: "2",
        title: "Gearbox Failure Risk",
        date: "2025-12-05",
        type: "prediction",
        probability: 87,
        impact: "high",
    },
    {
        id: "3",
        title: "Panel Cleaning Cycle",
        date: "2025-12-10",
        type: "scheduled",
        impact: "low",
    },
    {
        id: "4",
        title: "Grid Sync Check",
        date: "2025-12-15",
        type: "prediction",
        probability: 65,
        impact: "medium",
    },
];

export function PredictiveTimeline() {
    return (
        <div className="space-y-8">
            {mockTimeline.map((event, index) => (
                <div key={event.id} className="relative flex gap-6 pb-8 last:pb-0">
                    {/* Line */}
                    {index !== mockTimeline.length - 1 && (
                        <div className="absolute left-[19px] top-8 bottom-0 w-0.5 bg-border" />
                    )}

                    {/* Icon */}
                    <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${event.type === 'prediction' ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500' :
                            event.type === 'scheduled' ? 'bg-blue-500/10 border-blue-500 text-blue-500' :
                                'bg-emerald-500/10 border-emerald-500 text-emerald-500'
                        }`}>
                        {event.type === 'prediction' ? <AlertTriangle className="h-5 w-5" /> :
                            event.type === 'scheduled' ? <Calendar className="h-5 w-5" /> :
                                <CheckCircle2 className="h-5 w-5" />}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 gap-2 pt-1">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold leading-none">{event.title}</h4>
                            <span className="text-sm text-muted-foreground">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="capitalize">{event.type}</Badge>
                            {event.probability && (
                                <Badge variant="secondary" className={event.probability > 80 ? "text-red-500" : "text-yellow-500"}>
                                    {event.probability}% Probability
                                </Badge>
                            )}
                            {event.impact && (
                                <Badge variant="secondary" className="capitalize">
                                    {event.impact} Impact
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
