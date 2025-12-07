import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wind, Activity, Sun, MapPin } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import Link from "next/link";
import { Facility } from "@/lib/db";

interface FacilityCardProps {
    facility: Facility;
}

export function FacilityCard({ facility }: FacilityCardProps) {
    const getHealthStatus = (score: number) => {
        if (score >= 80) return "healthy";
        if (score >= 50) return "warning";
        if (score >= 30) return "critical";
        return "failure";
    };

    const status = getHealthStatus(facility.health_score);

    return (
        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                    {facility.type === "solar" ? <Sun className="h-5 w-5 text-yellow-500" /> :
                        facility.type === "wind" ? <Wind className="h-5 w-5 text-blue-500" /> :
                            <Activity className="h-5 w-5 text-cyan-500" />}
                    <div>
                        <CardTitle className="text-base font-medium">{facility.name}</CardTitle>
                        <p className="text-xs text-muted-foreground flex items-center mt-0.5">
                            <MapPin className="h-3 w-3 mr-1" />
                            {facility.city}, {facility.region}
                        </p>
                    </div>
                </div>
                <StatusBadge status={status} />
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-xs text-muted-foreground">Health Score</p>
                        <p className="text-2xl font-bold">{facility.health_score}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Efficiency</p>
                        <p className="text-2xl font-bold">{facility.efficiency}%</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    <div className="bg-muted/20 p-2 rounded">
                        <span className="text-muted-foreground block">Capacity</span>
                        <span className="font-semibold">{facility.capacity.mw} MW</span>
                    </div>
                    <div className="bg-muted/20 p-2 rounded">
                        <span className="text-muted-foreground block">Potential</span>
                        <span className="font-semibold">{facility.solar_potential || facility.wind_potential} kWh/m²</span>
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span>Last scan: {facility.lastScan ? new Date(facility.lastScan).toLocaleTimeString() : 'N/A'}</span>
                </div>
                <div className="flex gap-2">
                    <Button asChild size="sm" className="w-full" variant="outline">
                        <Link href={`/dashboard/facility/${facility.id}`}>View Details</Link>
                    </Button>
                    <Button size="sm" className="w-full" variant="secondary">
                        Take Action
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
