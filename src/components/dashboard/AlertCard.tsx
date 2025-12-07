import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import { Alert } from "@/lib/db";

interface AlertCardProps {
    alert: Alert;
    onDismiss?: (id: string) => void;
    onAction?: (id: string) => void;
    compact?: boolean;
}

export function AlertCard({ alert, onDismiss, onAction, compact = false }: AlertCardProps) {
    return (
        <Card className="bg-card border-border hover:bg-accent/5 transition-colors">
            <CardContent className={cn("p-4", compact ? "py-3" : "p-4")}>
                <div className="flex items-start gap-4">
                    <div className={cn(
                        "p-2 rounded-full shrink-0",
                        alert.severity === "high" || alert.severity === "critical" ? "bg-red-500/10 text-red-500" :
                            alert.severity === "medium" ? "bg-amber-500/10 text-amber-500" :
                                "bg-blue-500/10 text-blue-500"
                    )}>
                        <AlertTriangle className="h-5 w-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-sm truncate">{alert.facility_name || alert.facility_id}</h4>
                            <span className="text-xs text-muted-foreground">{new Date(alert.createdAt).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-sm text-foreground mb-2 line-clamp-2">{alert.message}</p>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                            <StatusBadge
                                status={alert.severity === "high" || alert.severity === "critical" ? "failure" : alert.severity === "medium" ? "warning" : "neutral"}
                                label={`${alert.severity.toUpperCase()} Severity`}
                                className="text-[10px] px-1.5 py-0 h-5"
                            />
                            <span>•</span>
                            <span>Confidence: {alert.confidence}%</span>
                        </div>

                        {!compact && (
                            <div className="flex items-center gap-2 mt-2">
                                <Button
                                    size="sm"
                                    variant="default"
                                    className="h-8 text-xs"
                                    onClick={() => onAction?.(alert.id)}
                                >
                                    Take Action
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 text-xs"
                                    onClick={() => onDismiss?.(alert.id)}
                                >
                                    Dismiss
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
