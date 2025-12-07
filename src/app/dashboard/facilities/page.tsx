'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { facilityDatabase, Facility } from '@/lib/db';
import { MapPin, TrendingUp, AlertCircle, Power } from 'lucide-react';

export default function FacilitiesPage() {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [selectedRegion, setSelectedRegion] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load facilities from database
        const allFacilities = facilityDatabase.getFacilities();
        setFacilities(allFacilities);
        setLoading(false);
    }, []);

    // Filter facilities based on region, type, and search
    const filteredFacilities = facilities.filter(facility => {
        const matchesRegion = selectedRegion === 'all' || facility.region === selectedRegion;
        const matchesType = selectedType === 'all' || facility.type === selectedType;
        const matchesSearch =
            facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            facility.city.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRegion && matchesType && matchesSearch;
    });

    // Extract unique regions
    const regions = ['all', ...Array.from(new Set(facilities.map(f => f.region)))];
    const types = ['all', 'solar', 'wind', 'hybrid'];

    // Calculate totals
    const totalCapacity = facilities.reduce((sum, f) => sum + f.capacity.mw, 0);
    const avgHealth = (facilities.reduce((sum, f) => sum + f.health_score, 0) / facilities.length).toFixed(1);
    const operationalCount = facilities.filter(f => f.status === 'operational').length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Renewable Energy Facilities</h1>
                <p className="text-slate-400">Real-time monitoring of Saudi Arabia's renewable energy infrastructure</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-slate-700/40 border border-cyan-500/20 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">Total Capacity</p>
                            <p className="text-3xl font-bold text-cyan-400">{totalCapacity} MW</p>
                        </div>
                        <Power className="w-10 h-10 text-cyan-400/50" />
                    </div>
                </div>

                <div className="bg-slate-700/40 border border-cyan-500/20 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">Operational</p>
                            <p className="text-3xl font-bold text-green-400">{operationalCount}/{facilities.length}</p>
                        </div>
                        <TrendingUp className="w-10 h-10 text-green-400/50" />
                    </div>
                </div>

                <div className="bg-slate-700/40 border border-cyan-500/20 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">Avg Health Score</p>
                            <p className="text-3xl font-bold text-yellow-400">{avgHealth}%</p>
                        </div>
                        <AlertCircle className="w-10 h-10 text-yellow-400/50" />
                    </div>
                </div>

                <div className="bg-slate-700/40 border border-cyan-500/20 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">Facilities</p>
                            <p className="text-3xl font-bold text-purple-400">{facilities.length}</p>
                        </div>
                        <MapPin className="w-10 h-10 text-purple-400/50" />
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-slate-700/40 border border-slate-600 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Search</label>
                        <input
                            type="text"
                            placeholder="Search by name or city..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                        />
                    </div>

                    {/* Region Filter */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Region</label>
                        <select
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        >
                            {regions.map(region => (
                                <option key={region} value={region}>
                                    {region === 'all' ? 'All Regions' : region}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Type Filter */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        >
                            {types.map(type => (
                                <option key={type} value={type}>
                                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Facilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
                    </div>
                ) : filteredFacilities.length > 0 ? (
                    filteredFacilities.map(facility => (
                        <Link
                            key={facility.id}
                            href={`/dashboard/facility/${facility.id}`}
                            className="block h-full"
                        >
                            <div className="bg-slate-700/40 border border-slate-600 rounded-lg p-6 hover:border-cyan-500/50 hover:bg-slate-700/60 transition-all cursor-pointer h-full">
                                {/* Location Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{facility.name}</h3>
                                        <p className="text-sm text-slate-400 flex items-center mt-1">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            {facility.city}, {facility.region}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${facility.type === 'solar' ? 'bg-yellow-500/20 text-yellow-300' :
                                            facility.type === 'wind' ? 'bg-blue-500/20 text-blue-300' :
                                                'bg-purple-500/20 text-purple-300'
                                        }`}>
                                        {facility.type.toUpperCase()}
                                    </span>
                                </div>

                                {/* Key Metrics */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-xs text-slate-400">Capacity</p>
                                        <p className="text-xl font-bold text-cyan-400">{facility.capacity.mw} MW</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">Health</p>
                                        <p className={`text-xl font-bold ${facility.health_score >= 90 ? 'text-green-400' :
                                                facility.health_score >= 75 ? 'text-yellow-400' :
                                                    'text-red-400'
                                            }`}>
                                            {facility.health_score}%
                                        </p>
                                    </div>
                                </div>

                                {/* Efficiency Bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between mb-1">
                                        <p className="text-xs text-slate-400">Efficiency</p>
                                        <p className="text-xs text-cyan-400 font-semibold">{facility.efficiency}%</p>
                                    </div>
                                    <div className="w-full bg-slate-600 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                                            style={{ width: `${facility.efficiency}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Solar Potential Info */}
                                <div className="bg-slate-600/40 rounded p-3 mb-4">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-400">Solar Potential:</span>
                                        <span className="text-cyan-300 font-semibold">{facility.solar_potential} kWh/m²/day</span>
                                    </div>
                                    {facility.wind_potential && (
                                        <div className="flex justify-between text-xs mt-2">
                                            <span className="text-slate-400">Wind Potential:</span>
                                            <span className="text-blue-300 font-semibold">{facility.wind_potential} m/s</span>
                                        </div>
                                    )}
                                </div>

                                {/* Status Badge */}
                                <div className="flex items-center justify-between pt-4 border-t border-slate-600">
                                    <span className={`text-xs font-semibold ${facility.status === 'operational' ? 'text-green-400' : 'text-yellow-400'
                                        }`}>
                                        {facility.status.toUpperCase()}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        Since {new Date(facility.operational_since).getFullYear()}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-slate-400">No facilities found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Map Integration Placeholder */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">Geographic Distribution</h2>
                <div className="bg-slate-700/40 border border-slate-600 rounded-lg p-8 h-96 flex items-center justify-center">
                    <p className="text-slate-400">Interactive Map Coming Soon - Showing all {facilities.length} facilities across Saudi Arabia</p>
                </div>
            </div>
        </div>
    );
}
