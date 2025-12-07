export interface Facility {
    id: string;
    name: string;
    region: string;
    city: string;
    type: "solar" | "wind" | "hybrid";
    coordinates: {
        latitude: number;
        longitude: number;
    };
    capacity: {
        mw: number;
        rating: string;
        solar_mw?: number;
        wind_mw?: number;
        currency?: string;
    };
    solar_potential?: number;
    wind_potential?: number;
    operational_since: string;
    owner: string;
    status: "operational" | "degraded" | "offline" | "maintenance";
    health_score: number;
    efficiency: number;
    equipment: {
        panels?: number;
        solar_panels?: number;
        wind_turbines?: number;
        inverters: number;
        transformers: number;
        type?: string;
        capacity_per_turbine?: number;
        battery_storage?: string;
        grid_storage?: string;
        rooftop_installations?: number;
        desalination_capacity?: string;
        cooling_systems?: number;
        tracking_systems?: boolean;
    };
    environment: {
        temperature_avg: number;
        temperature_max: number;
        humidity: number;
        dust_factor: string;
        sandstorm_frequency: string;
        salt_spray: string;
        coastal_corrosion?: string;
        corrosion_rating?: string;
        elevation?: number;
    };
    // Legacy fields for compatibility or calculated fields
    alerts?: {
        critical: number;
        high: number;
        medium: number;
        low: number;
        total: number;
    };
    maintenance?: {
        scheduled: number;
        lastCompleted: string;
        nextScheduled: string;
        totalCost: number;
        savedByPrevention: number;
    };
    roi?: {
        lastMonth: number;
        lastQuarter: number;
        annually: number;
    };
    lastScan?: string;
}

export interface Alert {
    id: string;
    facility_id: string;
    facility_name: string;
    type: string;
    severity: "critical" | "high" | "medium" | "low";
    confidence: number;
    message: string;
    description: string;
    affectedEquipment: string;
    predictedImpact: any;
    analysis: any;
    recommendation: any;
    createdAt: string;
    status: "open" | "in_progress" | "resolved" | "dismissed";
    assigned_to: string;
    priority: string;
    estimated_fix_time_hours: number;
    next_review: string;
}

export interface Task {
    id: string;
    facility_id: string;
    type: string;
    title: string;
    description: string;
    status: "to_do" | "in_progress" | "completed" | "cancelled";
    priority: "low" | "medium" | "high" | "critical";
    created_at: string;
    deadline: string;
    estimated_duration_hours: number;
    assigned_to: any;
    cost: any;
    linked_alert: string;
    expected_roi: number;
    dependencies: string[];
    checklist: string[];
    progress: number;
}

export const SAUDI_FACILITIES: Facility[] = [
    {
        id: "facility-sakaka-001",
        name: "Sakaka Solar Complex",
        region: "Al Jouf Province",
        city: "Sakaka",
        type: "solar",
        coordinates: {
            latitude: 29.9650,
            longitude: 40.2000
        },
        capacity: {
            mw: 300,
            rating: "Large-scale utility"
        },
        solar_potential: 8.0,
        wind_potential: 5.5,
        operational_since: "2021-04-15",
        owner: "Saudi Power Utility",
        status: "operational",
        health_score: 89,
        efficiency: 95.2,
        equipment: {
            panels: 900000,
            inverters: 150,
            transformers: 12,
            type: "Bifacial monocrystalline + tracking system"
        },
        environment: {
            temperature_avg: 38.5,
            temperature_max: 52,
            humidity: 15,
            dust_factor: "high",
            sandstorm_frequency: "monthly",
            salt_spray: "low"
        },
        // Legacy/Mock data for dashboard compatibility
        alerts: { critical: 0, high: 2, medium: 4, low: 8, total: 14 },
        maintenance: { scheduled: 1, lastCompleted: "2025-11-20T08:30:00Z", nextScheduled: "2025-12-15T09:00:00Z", totalCost: 125000, savedByPrevention: 450000 },
        roi: { lastMonth: 24.5, lastQuarter: 18.3, annually: 22.1 },
        lastScan: new Date().toISOString()
    },
    {
        id: "facility-dumat-001",
        name: "Dumat Al-Jandal Solar Farm",
        region: "Al Jouf Province",
        city: "Dumat Al-Jandal",
        type: "solar",
        coordinates: {
            latitude: 29.7833,
            longitude: 40.4667
        },
        capacity: {
            mw: 100,
            rating: "Medium-scale utility"
        },
        solar_potential: 7.9,
        wind_potential: 7.2,
        operational_since: "2022-06-10",
        owner: "Saudi Renewable Energy Authority",
        status: "operational",
        health_score: 92,
        efficiency: 94.8,
        equipment: {
            panels: 300000,
            inverters: 50,
            transformers: 4,
            type: "Standard monocrystalline + fixed tilt"
        },
        environment: {
            temperature_avg: 36.2,
            temperature_max: 50,
            humidity: 12,
            dust_factor: "moderate-high",
            sandstorm_frequency: "bi-weekly",
            salt_spray: "low"
        },
        alerts: { critical: 0, high: 1, medium: 2, low: 5, total: 8 },
        maintenance: { scheduled: 2, lastCompleted: "2025-11-15T14:00:00Z", nextScheduled: "2025-11-30T10:00:00Z", totalCost: 85000, savedByPrevention: 320000 },
        roi: { lastMonth: 18.2, lastQuarter: 21.5, annually: 19.8 },
        lastScan: new Date().toISOString()
    },
    {
        id: "facility-eastern-001",
        name: "Eastern Province Solar & Wind Hybrid",
        region: "Eastern Province",
        city: "Khobar",
        type: "hybrid",
        coordinates: {
            latitude: 26.1540,
            longitude: 50.1957
        },
        capacity: {
            mw: 150,
            solar_mw: 100,
            wind_mw: 50,
            rating: "Medium-scale hybrid"
        },
        solar_potential: 7.5,
        wind_potential: 7.8,
        operational_since: "2023-03-20",
        owner: "Saudi Aramco Energy",
        status: "operational",
        health_score: 85,
        efficiency: 91.3,
        equipment: {
            solar_panels: 300000,
            wind_turbines: 30,
            capacity_per_turbine: 1.67,
            inverters: 75,
            transformers: 6,
            battery_storage: "50 MWh"
        },
        environment: {
            temperature_avg: 32.4,
            temperature_max: 48,
            humidity: 65,
            salt_spray: "high",
            dust_factor: "moderate",
            sandstorm_frequency: "monthly",
            coastal_corrosion: "significant"
        },
        alerts: { critical: 1, high: 3, medium: 5, low: 12, total: 21 },
        maintenance: { scheduled: 3, lastCompleted: "2025-10-25T11:00:00Z", nextScheduled: "2025-11-28T09:00:00Z", totalCost: 220000, savedByPrevention: 680000 },
        roi: { lastMonth: 12.3, lastQuarter: 14.2, annually: 16.5 },
        lastScan: new Date().toISOString()
    },
    {
        id: "facility-riyadh-001",
        name: "Riyadh Metropolitan Solar",
        region: "Riyadh Region",
        city: "Riyadh",
        type: "solar",
        coordinates: {
            latitude: 24.7136,
            longitude: 46.6753
        },
        capacity: {
            mw: 200,
            rating: "Large utility + distributed"
        },
        solar_potential: 8.0,
        wind_potential: 5.2,
        operational_since: "2024-01-10",
        owner: "Riyadh Energy Commission",
        status: "operational",
        health_score: 88,
        efficiency: 93.7,
        equipment: {
            solar_panels: 600000,
            rooftop_installations: 2500,
            inverters: 100,
            transformers: 8,
            grid_storage: "30 MWh"
        },
        environment: {
            temperature_avg: 35.8,
            temperature_max: 51,
            humidity: 20,
            dust_factor: "moderate",
            sandstorm_frequency: "bi-monthly",
            salt_spray: "none"
        },
        alerts: { critical: 0, high: 1, medium: 3, low: 2, total: 6 },
        maintenance: { scheduled: 1, lastCompleted: "2025-11-01T10:00:00Z", nextScheduled: "2025-12-10T09:00:00Z", totalCost: 50000, savedByPrevention: 150000 },
        roi: { lastMonth: 20.1, lastQuarter: 19.5, annually: 21.0 },
        lastScan: new Date().toISOString()
    },
    {
        id: "facility-yanbu-001",
        name: "Yanbu Solar-Desalination Complex",
        region: "Medina Region",
        city: "Yanbu",
        type: "hybrid",
        coordinates: {
            latitude: 24.0854,
            longitude: 37.9569
        },
        capacity: {
            mw: 180,
            solar_mw: 150,
            wind_mw: 30,
            rating: "Medium industrial + desalination"
        },
        solar_potential: 7.6,
        wind_potential: 8.1,
        operational_since: "2023-08-05",
        owner: "Saudi Water Authority",
        status: "operational",
        health_score: 84,
        efficiency: 90.5,
        equipment: {
            solar_panels: 450000,
            wind_turbines: 18,
            desalination_capacity: "50,000 m³/day",
            inverters: 90,
            transformers: 7,
            cooling_systems: 20
        },
        environment: {
            temperature_avg: 31.2,
            temperature_max: 47,
            humidity: 75,
            salt_spray: "very_high",
            dust_factor: "moderate",
            sandstorm_frequency: "monthly",
            corrosion_rating: "extreme"
        },
        alerts: { critical: 2, high: 4, medium: 6, low: 10, total: 22 },
        maintenance: { scheduled: 4, lastCompleted: "2025-11-10T11:00:00Z", nextScheduled: "2025-11-25T08:00:00Z", totalCost: 180000, savedByPrevention: 550000 },
        roi: { lastMonth: 15.5, lastQuarter: 16.2, annually: 17.8 },
        lastScan: new Date().toISOString()
    },
    {
        id: "facility-tabuk-001",
        name: "Tabuk Solar Farm",
        region: "Tabuk Province",
        city: "Tabuk",
        type: "solar",
        coordinates: {
            latitude: 28.3896,
            longitude: 36.5624
        },
        capacity: {
            mw: 300,
            rating: "Large-scale utility"
        },
        solar_potential: 8.1,
        wind_potential: 6.5,
        operational_since: "2024-06-01",
        owner: "Saudi Renewable Authority",
        status: "operational",
        health_score: 91,
        efficiency: 96.1,
        equipment: {
            solar_panels: 900000,
            tracking_systems: true,
            inverters: 150,
            transformers: 12,
            type: "Advanced bifacial with dual-axis tracking"
        },
        environment: {
            temperature_avg: 33.6,
            temperature_max: 49,
            humidity: 18,
            dust_factor: "low-moderate",
            sandstorm_frequency: "quarterly",
            salt_spray: "low",
            elevation: 800
        },
        alerts: { critical: 0, high: 0, medium: 2, low: 4, total: 6 },
        maintenance: { scheduled: 1, lastCompleted: "2025-10-15T09:00:00Z", nextScheduled: "2026-01-15T09:00:00Z", totalCost: 40000, savedByPrevention: 120000 },
        roi: { lastMonth: 26.2, lastQuarter: 25.1, annually: 25.5 },
        lastScan: new Date().toISOString()
    }
];

const alerts: Alert[] = [
    {
        id: "alert-001",
        facility_id: "facility-sakaka-001",
        facility_name: "Sakaka Solar Complex",
        type: "solar_soiling",
        severity: "high",
        confidence: 93.15,
        message: "Dust soiling detected on 25% of panel array reducing generation by 3.2%",
        description: "YOLOv8 model detected significant dust accumulation on southern panel sections.",
        affectedEquipment: "Solar Panels - Section A (Rows 5-8)",
        predictedImpact: { efficiency_loss: 3.2, power_loss_mw: 1.6, revenue_loss_daily: 8500 },
        analysis: { root_cause: "Dust accumulation", historical_pattern: "Similar issue 45 days ago" },
        recommendation: { action: "Schedule panel cleaning", prevention_cost: 2000, failure_cost_if_ignored: 255000, roi: 127.5, urgency: "within_48_hours" },
        createdAt: "2025-11-26T22:30:00Z",
        status: "open",
        assigned_to: "Maintenance Team Alpha",
        priority: "high",
        estimated_fix_time_hours: 4,
        next_review: "2025-11-27T22:30:00Z"
    },
    {
        id: "alert-002",
        facility_id: "facility-yanbu-001",
        facility_name: "Yanbu Solar-Desalination Complex",
        type: "corrosion_risk",
        severity: "high",
        confidence: 88.5,
        message: "Accelerated salt corrosion detected on Inverter Bank B cooling intakes.",
        description: "Computer vision analysis of drone footage shows rust formation.",
        affectedEquipment: "Inverter Bank B",
        predictedImpact: { failure_probability: 75.0, days_until_failure: 14, downtime_if_failed_hours: 48 },
        analysis: { root_cause: "High salinity humidity", corrosion_rate: "High" },
        recommendation: { action: "Apply anti-corrosion coating", prevention_cost: 5000, failure_cost_if_ignored: 150000, roi: 30.0, urgency: "within_72_hours" },
        createdAt: "2025-11-26T20:45:00Z",
        status: "open",
        assigned_to: "Specialized Coating Team",
        priority: "high",
        estimated_fix_time_hours: 8,
        next_review: "2025-11-27T20:45:00Z"
    },
    {
        id: "alert-003",
        facility_id: "facility-eastern-001",
        facility_name: "Eastern Province Solar & Wind Hybrid",
        type: "grid_frequency_deviation",
        severity: "medium",
        confidence: 87.5,
        message: "Grid frequency drifting below 50Hz. Synchronization issues detected.",
        description: "Grid frequency has drifted to 49.97Hz (target: 50Hz).",
        affectedEquipment: "Grid Connection Point, Battery Storage",
        predictedImpact: { frequency_deviation: -0.03, grid_instability_risk: "medium" },
        analysis: { root_cause: "Upstream grid instability", frequency_trend: "Gradual decline" },
        recommendation: { action: "Adjust battery discharge rate", prevention_cost: 1000, failure_cost_if_ignored: 50000, roi: 50, urgency: "within_2_hours" },
        createdAt: "2025-11-26T23:15:00Z",
        status: "open",
        assigned_to: "Grid Operations Team",
        priority: "medium",
        estimated_fix_time_hours: 1,
        next_review: "2025-11-27T01:15:00Z"
    }
];

const tasks: Task[] = [
    {
        id: "task-001",
        facility_id: "facility-sakaka-001",
        type: "cleaning",
        title: "Solar Panel Cleaning - Section A",
        description: "Clean dust and debris from panels in Section A (Rows 5-8).",
        status: "to_do",
        priority: "high",
        created_at: "2025-11-26T22:30:00Z",
        deadline: "2025-11-27T18:00:00Z",
        estimated_duration_hours: 4,
        assigned_to: { name: "Ahmed Hassan" },
        cost: { total: 1000 },
        linked_alert: "alert-001",
        expected_roi: 127.5,
        dependencies: [],
        checklist: ["Safety inspection complete", "Equipment prepared"],
        progress: 0
    }
];

export const facilityDatabase = {
    facilities: SAUDI_FACILITIES,

    getFacilities: () => facilityDatabase.facilities,

    getFacility: (id: string) =>
        facilityDatabase.facilities.find(f => f.id === id),

    getFacilitiesByRegion: (region: string) =>
        facilityDatabase.facilities.filter(f => f.region === region),

    getFacilitiesByType: (type: string) =>
        facilityDatabase.facilities.filter(f => f.type === type),

    updateFacilityHealth: (id: string, health: number) => {
        const facility = facilityDatabase.getFacility(id);
        if (facility) facility.health_score = health;
    },

    updateFacilityEfficiency: (id: string, efficiency: number) => {
        const facility = facilityDatabase.getFacility(id);
        if (facility) facility.efficiency = efficiency;
    }
};

// Legacy db object for compatibility
export const db = {
    facilities: {
        getAll: () => SAUDI_FACILITIES,
        getById: (id: string) => SAUDI_FACILITIES.find(f => f.id === id),
    },
    alerts: {
        getAll: () => alerts,
        getByFacilityId: (id: string) => alerts.filter(a => a.facility_id === id),
    },
    tasks: {
        getAll: () => tasks,
        create: (task: Task) => {
            tasks.push(task);
            return task;
        }
    }
};
