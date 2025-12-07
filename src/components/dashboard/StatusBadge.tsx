import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "healthy" | "warning" | "critical" | "failure" | "success" | "neutral";

interface StatusBadgeProps {
    status: StatusType;
    label?: string;
    className?: string;
}

const statusStyles: Record<StatusType, string> = {
    healthy: "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 border-emerald-500/20",
    success: "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 border-emerald-500/20",
    warning: "bg-amber-500/15 text-amber-500 hover:bg-amber-500/25 border-amber-500/20",
    critical: "bg-orange-500/15 text-orange-500 hover:bg-orange-500/25 border-orange-500/20",
    failure: "bg-red-500/15 text-red-500 hover:bg-red-500/25 border-red-500/20",
    neutral: "bg-slate-500/15 text-slate-500 hover:bg-slate-500/25 border-slate-500/20",
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
    return (
        <Badge
            variant="outline"
            className={cn("capitalize font-medium border", statusStyles[status], className)}
        >
            {label || status}
        </Badge>
    );
}
