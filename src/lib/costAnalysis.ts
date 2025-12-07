export interface CostAnalysisResult {
    totalSavings: number;
    preventedFailures: number;
    maintenanceCosts: number;
    roi: number;
    currency: string;
}

export const calculateROI = (
    preventedFailures: number,
    avgFailureCost: number,
    maintenanceCost: number
): CostAnalysisResult => {
    const totalSavings = preventedFailures * avgFailureCost;
    const roi = maintenanceCost > 0 ? ((totalSavings - maintenanceCost) / maintenanceCost) * 100 : 0;

    return {
        totalSavings,
        preventedFailures,
        maintenanceCosts: maintenanceCost,
        roi: parseFloat(roi.toFixed(2)),
        currency: "USD",
    };
};

export const getFacilityROI = (facilityId: string): CostAnalysisResult => {
    // Mock logic - in a real app this would fetch from historical data
    // Simulating different ROI profiles based on facility ID
    const baseFailures = facilityId === 'facility-001' ? 12 : facilityId === 'facility-002' ? 8 : 5;
    const avgCost = 15000; // Average cost of a failure (downtime + repair)
    const maintenance = 25000; // Annual maintenance spend

    return calculateROI(baseFailures, avgCost, maintenance);
};
