import React, { useState, useEffect } from 'react';
import { Radio, AlertTriangle, Shield, Video, Crosshair, Sparkles, Eye, X, Search, Filter, MapPin, CheckCircle2, Navigation } from 'lucide-react';
import vajraCyberMap from '../../assets/images/vajra_india_cyber_map_1788188888561.jpg';
import { CompassRose, TacticalGlobe, DroneIcon, CctvIcon, TankIcon } from './TacticalIcons';

interface TacticalItem {
  id: string;
  type: 'ENEMY' | 'FRIENDLY' | 'DRONE' | 'CCTV' | 'MISSION' | 'THREAT_ZONE' | 'TANK';
  label: string;
  coords: { x: number; y: number }; // Percentage inside map container
  sector: string;
  status: string;
  coordinates?: string;
  priority?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

export const LiveOperationalMap: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState<TacticalItem | null>(null);
  const [radarAngle, setRadarAngle] = useState<number>(0);
  const [viewAllModalOpen, setViewAllModalOpen] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Rotate the mini surveillance radar needle
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarAngle(prev => (prev + 4) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Tactical markers positioned accurately within the geography of India on the cyber map
  const tacticalMarkers: TacticalItem[] = [
    // Drones with pulse rings
    { id: 'drone-1', type: 'DRONE', label: 'Drone Alpha-7 (Patrol)', coords: { x: 34, y: 41 }, sector: 'Rajasthan (Western Desert)', status: 'Active Patrol 120km/h', coordinates: '26.9124° N, 70.9022° E', priority: 'MEDIUM' },
    { id: 'drone-2', type: 'DRONE', label: 'Drone Falcon-2 (Surveillance)', coords: { x: 42, y: 62 }, sector: 'Deccan Plateau', status: 'Thermal Sweep', coordinates: '17.3850° N, 78.4867° E', priority: 'LOW' },
    { id: 'drone-3', type: 'DRONE', label: 'Drone Garuda-9 (Recon)', coords: { x: 43, y: 27 }, sector: 'Jammu & Kashmir', status: 'High-Altitude Recon', coordinates: '33.7782° N, 76.5762° E', priority: 'HIGH' },
    { id: 'drone-4', type: 'DRONE', label: 'Drone Coastal-1 (Maritime)', coords: { x: 40, y: 76 }, sector: 'Peninsular Command', status: 'Signal Intercept', coordinates: '9.9312° N, 76.2673° E', priority: 'LOW' },

    // Enemy Activity Red Triangles
    { id: 'enemy-1', type: 'ENEMY', label: 'Unidentified Ingress Attempt', coords: { x: 41, y: 22 }, sector: 'Sector 7 (J&K LoC)', status: 'HIGH ALERT', coordinates: '34.0837° N, 74.7973° E', priority: 'CRITICAL' },
    { id: 'enemy-2', type: 'ENEMY', label: 'Suspicious Transmission Source', coords: { x: 38, y: 36 }, sector: 'Western Border (Punjab)', status: 'Tracking Frequency', coordinates: '31.6340° N, 74.8723° E', priority: 'HIGH' },
    { id: 'enemy-3', type: 'ENEMY', label: 'Anomalous Radar Contact', coords: { x: 46, y: 35 }, sector: 'Northern Outpost (NCR)', status: 'Verifying Signature', coordinates: '28.7041° N, 77.1025° E', priority: 'MEDIUM' },
    { id: 'enemy-4', type: 'ENEMY', label: 'Perimeter Breaching Attempt', coords: { x: 67, y: 46 }, sector: 'Eastern Corridor (Assam)', status: 'QRT Dispatched', coordinates: '26.2006° N, 92.9376° E', priority: 'CRITICAL' },

    // Friendly Units
    { id: 'friendly-1', type: 'FRIENDLY', label: 'HQ Strike Force (Unit 12)', coords: { x: 47, y: 49 }, sector: 'Central Command (MP)', status: 'Operational Ready', coordinates: '23.2599° N, 77.4126° E', priority: 'LOW' },
    { id: 'friendly-2', type: 'FRIENDLY', label: 'Northern Air Wing (Squadron 10)', coords: { x: 48, y: 24 }, sector: 'Ladakh Air Station', status: 'Combat Air Patrol', coordinates: '34.1526° N, 77.5771° E', priority: 'HIGH' },

    // Tanks
    { id: 'tank-1', type: 'TANK', label: 'T-90 Bhishma Armored Unit', coords: { x: 34, y: 48 }, sector: 'Western Desert Command (Rajasthan)', status: 'Position Secured', coordinates: '25.7500° N, 71.4000° E', priority: 'MEDIUM' },
    { id: 'tank-2', type: 'TANK', label: 'Arjun MBT Patrol Unit', coords: { x: 45, y: 57 }, sector: 'Central Depot (Maharashtra)', status: 'Standby', coordinates: '19.0760° N, 74.7749° E', priority: 'LOW' },

    // CCTV Cameras
    { id: 'cctv-1', type: 'CCTV', label: 'LOC Border Post High-Res IR', coords: { x: 47, y: 21 }, sector: 'Ladakh High Pass', status: 'Optical Feed Online', coordinates: '34.5000° N, 78.0000° E', priority: 'HIGH' },
    { id: 'cctv-2', type: 'CCTV', label: 'Coastal Surveillance Array', coords: { x: 57, y: 59 }, sector: 'Eastern Coastline (Odisha)', status: 'Night-Vision Active', coordinates: '20.2961° N, 85.8245° E', priority: 'LOW' }
  ];

  // Filtered list for the modal
  const filteredModalMarkers = tacticalMarkers.filter(m => {
    const matchesType = filterType === 'ALL' || m.type === filterType;
    const matchesSearch = !searchQuery || 
      m.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.status.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div
      className="relative rounded-2xl bg-slate-950/80 border border-cyan-500/25 p-4 sm:p-5 flex flex-col justify-between overflow-hidden backdrop-blur-xl shadow-2xl h-[420px] lg:h-[470px] xl:h-[510px]"
      id="vajra-live-operational-map"
    >
      {/* Top Header */}
      <div className="relative z-20 flex items-center justify-between pb-2 border-b border-cyan-500/20">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <Radio className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs sm:text-sm font-tech font-bold text-white tracking-widest uppercase">
            LIVE OPERATIONAL MAP
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Selected Marker Quick Intel Banner */}
          {selectedMarker && (
            <div className="hidden md:flex items-center gap-2 px-2.5 py-0.5 bg-cyan-950/90 border border-cyan-400/50 rounded-lg text-xs font-mono-code text-cyan-300 shadow-lg animate-fade-in">
              <span className="text-amber-400 font-bold">{selectedMarker.sector}:</span>
              <span className="truncate max-w-[150px]">{selectedMarker.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                {selectedMarker.status}
              </span>
              <button
                onClick={() => setSelectedMarker(null)}
                className="ml-1 text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>
          )}

          {/* VIEW ALL BUTTON */}
          <button
            onClick={() => setViewAllModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950/90 border border-cyan-500/50 text-[10.5px] font-mono-code font-bold text-cyan-300 hover:bg-cyan-900 hover:text-white transition shadow-sm group"
            title="View All Operational Units, Threats & Feeds"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>View All</span>
            <span className="px-1.5 py-0.2 rounded bg-cyan-900 text-[9px] text-cyan-200 border border-cyan-500/30">
              {tacticalMarkers.length}
            </span>
          </button>
        </div>
      </div>

      {/* Main Map Visual Canvas with Overlays */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden my-1">
        {/* Background Cybernetic India Map with Glowing Borders */}
        <img
          src={vajraCyberMap}
          alt="Operational Geospatial Map of India"
          className="absolute inset-0 w-full h-full object-contain object-center filter brightness-110 contrast-125 select-none pointer-events-none"
        />

        {/* Tactical Sector Labels on the Map - Accurately Placed Inside Borders */}
        <div className="absolute top-[18%] left-[30%] text-[10px] sm:text-[11px] font-tech font-bold text-cyan-300/80 tracking-widest pointer-events-none select-none">
          JAMMU & KASHMIR
        </div>
        <div className="absolute top-[18%] left-[51%] text-[10px] sm:text-[11px] font-tech font-bold text-cyan-300/80 tracking-widest pointer-events-none select-none">
          LADAKH
        </div>
        <div className="absolute top-[41%] left-[28%] text-[10px] sm:text-[11px] font-tech font-bold text-cyan-300/80 tracking-widest pointer-events-none select-none">
          RAJASTHAN
        </div>
        <div className="absolute top-[51%] left-[45%] text-xs sm:text-sm font-tech font-bold text-cyan-400/90 tracking-widest pointer-events-none select-none">
          INDIA
        </div>

        {/* Mission Area Green Glowing Circle Overlay (Contained inside western border) */}
        <div className="absolute top-[36%] left-[32%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-26 sm:h-26 rounded-full border border-emerald-500/40 bg-emerald-500/5 pointer-events-none animate-pulse" />
        
        {/* Threat Zone Red Glowing Perimeter Overlay (Contained on J&K LoC) */}
        <div className="absolute top-[22%] left-[41%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-22 sm:h-22 rounded-full border border-red-500/50 bg-red-500/5 pointer-events-none animate-pulse" />

        {/* Tactical Markers Dynamic Overlay */}
        {tacticalMarkers.map(marker => {
          const isSelected = selectedMarker?.id === marker.id;

          return (
            <div
              key={marker.id}
              onClick={() => setSelectedMarker(marker)}
              style={{ left: `${marker.coords.x}%`, top: `${marker.coords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            >
              {/* Drone with Concentric Radar Wave Rings */}
              {marker.type === 'DRONE' && (
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-7 h-7 rounded-full border border-cyan-400/40 animate-ping pointer-events-none" />
                  <div className="absolute w-11 h-11 rounded-full border border-cyan-400/20 pointer-events-none" />
                  <div className={`p-1 rounded-full bg-cyan-950/90 border border-cyan-400 text-cyan-300 group-hover:scale-125 transition-transform shadow-lg shadow-cyan-500/30 ${
                    isSelected ? 'ring-2 ring-cyan-300 scale-125 bg-cyan-900' : ''
                  }`}>
                    <DroneIcon className="w-4 h-4 text-cyan-300" />
                  </div>
                </div>
              )}

              {/* Enemy Threat Triangle */}
              {marker.type === 'ENEMY' && (
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-6 h-6 rounded-full bg-red-500/30 animate-ping pointer-events-none" />
                  <div className={`p-1 rounded bg-red-950/90 border border-red-500 text-red-400 group-hover:scale-125 transition-transform shadow-lg shadow-red-500/40 ${
                    isSelected ? 'ring-2 ring-red-400 scale-125 bg-red-900' : ''
                  }`}>
                    <AlertTriangle className="w-3.5 h-3.5 fill-red-500/40 text-red-400" />
                  </div>
                </div>
              )}

              {/* Friendly Unit Shield */}
              {marker.type === 'FRIENDLY' && (
                <div className={`p-1 rounded-full bg-amber-950/90 border border-amber-400 text-amber-300 group-hover:scale-125 transition-transform shadow-lg shadow-amber-500/30 ${
                  isSelected ? 'ring-2 ring-amber-300 scale-125 bg-amber-900' : ''
                }`}>
                  <Shield className="w-3.5 h-3.5 fill-amber-400/30 text-amber-300" />
                </div>
              )}

              {/* Tank Icon */}
              {marker.type === 'TANK' && (
                <div className={`p-1 rounded bg-emerald-950/90 border border-emerald-400 text-emerald-300 group-hover:scale-125 transition-transform shadow-lg shadow-emerald-500/30 ${
                  isSelected ? 'ring-2 ring-emerald-300 scale-125 bg-emerald-900' : ''
                }`}>
                  <TankIcon className="w-4 h-4 text-emerald-300" />
                </div>
              )}

              {/* CCTV Icon */}
              {marker.type === 'CCTV' && (
                <div className={`p-1 rounded bg-cyan-950/90 border border-cyan-400 text-cyan-300 group-hover:scale-125 transition-transform shadow-lg shadow-cyan-500/30 ${
                  isSelected ? 'ring-2 ring-cyan-300 scale-125 bg-cyan-900' : ''
                }`}>
                  <CctvIcon className="w-3.5 h-3.5 text-cyan-300" />
                </div>
              )}

              {/* Hover Tooltip - Smart Centered Clamped */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block px-2 py-1 bg-slate-900/95 border border-cyan-500/50 rounded text-[10px] font-mono-code text-white whitespace-nowrap z-30 shadow-xl pointer-events-none">
                <span className="text-cyan-300 font-bold">{marker.sector}: </span>
                {marker.label}
              </div>
            </div>
          );
        })}

        {/* Top-Left Tactical HUD: Telemetry Bars & Rotating Globe */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-2 pointer-events-none select-none">
          {/* Diagnostic telemetry bars */}
          <div className="px-2.5 py-2 rounded-lg bg-slate-950/80 border border-cyan-500/20 backdrop-blur-sm hidden sm:block">
            <div className="text-[9px] font-mono-code text-cyan-400 mb-1">TELEMETRY GRID</div>
            <div className="space-y-1 w-20">
              <div className="h-1 bg-cyan-500/20 rounded overflow-hidden">
                <div className="h-full bg-cyan-400 w-3/4 animate-pulse" />
              </div>
              <div className="h-1 bg-cyan-500/20 rounded overflow-hidden">
                <div className="h-full bg-amber-400 w-1/2" />
              </div>
              <div className="h-1 bg-cyan-500/20 rounded overflow-hidden">
                <div className="h-full bg-emerald-400 w-5/6" />
              </div>
            </div>
          </div>

          {/* 3D Wireframe Globe */}
          <div className="hidden md:block">
            <TacticalGlobe className="w-14 h-14" />
          </div>
        </div>

        {/* Top-Right Tactical HUD: Compass Rose & Map Legend */}
        <div className="absolute top-2 right-2 z-10 flex flex-col items-end gap-2 pointer-events-none select-none">
          {/* Compass Rose */}
          <CompassRose className="w-10 h-10 sm:w-12 sm:h-12" />

          {/* Map Legend (matches uploaded picture legend exactly) */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/85 border border-cyan-500/30 backdrop-blur-md text-[9px] sm:text-[10px] font-mono-code space-y-1.5 shadow-xl">
            <div className="flex items-center gap-2 text-slate-300">
              <AlertTriangle className="w-3 h-3 text-red-500 fill-red-500/30" />
              <span>Enemy Activity</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-300" />
              <span>Friendly Unit</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <DroneIcon className="w-3 h-3 text-cyan-400" />
              <span>Drone</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CctvIcon className="w-3 h-3 text-cyan-400" />
              <span>CCTV</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <div className="w-2.5 h-2.5 rounded-full border border-emerald-400 bg-emerald-400/30" />
              <span>Mission Area</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <div className="w-2.5 h-2.5 rounded-full border border-red-500 bg-red-500/30" />
              <span>Threat Zone</span>
            </div>
          </div>
        </div>

        {/* Bottom-Right Tactical HUD: Real-Time Surveillance Radar Scanner */}
        <div className="absolute bottom-2 right-2 z-10 flex items-center gap-3 p-2 sm:p-2.5 rounded-xl bg-slate-950/85 border border-emerald-500/40 backdrop-blur-md shadow-xl select-none">
          {/* Animated Mini Radar Sweep Needle */}
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-emerald-500/60 bg-emerald-950/30 flex items-center justify-center overflow-hidden">
            {/* Concentric Grid Rings */}
            <div className="absolute w-3/4 h-3/4 rounded-full border border-emerald-500/30" />
            <div className="absolute w-1/2 h-1/2 rounded-full border border-emerald-500/30" />
            <div className="absolute w-full h-[1px] bg-emerald-500/30" />
            <div className="absolute h-full w-[1px] bg-emerald-500/30" />

            {/* Rotating Radar Needle */}
            <div
              className="absolute inset-0 origin-center pointer-events-none"
              style={{ transform: `rotate(${radarAngle}deg)` }}
            >
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-emerald-400/40" />
              <div className="w-1/2 h-[2px] bg-emerald-300 shadow-[0_0_8px_#34d399]" />
            </div>

            {/* Radar Blip */}
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Surveillance Text & Waveform */}
          <div>
            <div className="text-[10px] sm:text-[11px] font-tech font-bold text-emerald-400 tracking-wider">
              REAL-TIME SURVEILLANCE
            </div>
            {/* Waveform graphic bars */}
            <div className="flex items-center gap-0.5 h-3 my-1">
              {[8, 14, 6, 12, 18, 10, 16, 7, 13, 9, 15, 11].map((h, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-cyan-400/80 rounded-full"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
            <div className="text-[9px] font-mono-code text-emerald-300 font-semibold tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              SCANNING...
            </div>
          </div>
        </div>
      </div>

      {/* VIEW ALL MODAL - COMPREHENSIVE ASSET & THREAT LOG */}
      {viewAllModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl rounded-2xl bg-slate-950 border border-cyan-500/60 p-5 sm:p-6 shadow-[0_0_50px_rgba(6,182,212,0.3)] max-h-[88vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <div className="flex items-center gap-2.5">
                <Radio className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="font-tech font-bold text-white text-base tracking-wide flex items-center gap-2">
                    <span>LIVE OPERATIONAL ASSETS & THREAT LOG</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                      {tacticalMarkers.length} ACTIVE NODES
                    </span>
                  </h3>
                  <p className="text-[11px] font-mono-code text-slate-400 mt-0.5">
                    Real-time geospatial intelligence, telemetry and sensor feeds across all sectors
                  </p>
                </div>
              </div>

              <button
                onClick={() => setViewAllModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-red-500/50 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Bar & Search */}
            <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-slate-800">
              {/* Type Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono-code">
                {[
                  { id: 'ALL', label: 'All Units', count: tacticalMarkers.length },
                  { id: 'ENEMY', label: 'Threats', count: tacticalMarkers.filter(m => m.type === 'ENEMY').length },
                  { id: 'DRONE', label: 'Drones', count: tacticalMarkers.filter(m => m.type === 'DRONE').length },
                  { id: 'FRIENDLY', label: 'Friendly', count: tacticalMarkers.filter(m => m.type === 'FRIENDLY').length },
                  { id: 'TANK', label: 'Armor/Tanks', count: tacticalMarkers.filter(m => m.type === 'TANK').length },
                  { id: 'CCTV', label: 'CCTV Posts', count: tacticalMarkers.filter(m => m.type === 'CCTV').length },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterType(tab.id)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition ${
                      filterType === tab.id
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[200px] flex-1 sm:flex-initial">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search sector, unit or status..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 text-xs font-mono-code bg-slate-900/90 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Assets & Threats List Table / Cards */}
            <div className="flex-1 overflow-y-auto my-3 pr-1 space-y-2">
              <table className="w-full text-left text-xs font-mono-code border-collapse">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800 text-[10px] tracking-wider uppercase">
                    <th className="pb-2 pl-2">TYPE</th>
                    <th className="pb-2">ASSET / INCIDENT</th>
                    <th className="pb-2">SECTOR</th>
                    <th className="pb-2">COORDINATES</th>
                    <th className="pb-2">STATUS</th>
                    <th className="pb-2">ALERT</th>
                    <th className="pb-2 pr-2 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {filteredModalMarkers.map(m => {
                    const isEnemy = m.type === 'ENEMY';
                    const isDrone = m.type === 'DRONE';
                    const isFriendly = m.type === 'FRIENDLY';
                    const isTank = m.type === 'TANK';
                    const isCctv = m.type === 'CCTV';

                    return (
                      <tr
                        key={m.id}
                        className="hover:bg-cyan-950/30 transition-colors group cursor-pointer"
                        onClick={() => {
                          setSelectedMarker(m);
                          setViewAllModalOpen(false);
                        }}
                      >
                        {/* Type Icon */}
                        <td className="py-2.5 pl-2">
                          <div className="flex items-center gap-1.5">
                            {isEnemy && <AlertTriangle className="w-4 h-4 text-red-400 fill-red-500/20" />}
                            {isDrone && <DroneIcon className="w-4 h-4 text-cyan-400" />}
                            {isFriendly && <Shield className="w-4 h-4 text-amber-400 fill-amber-500/20" />}
                            {isTank && <TankIcon className="w-4 h-4 text-emerald-400" />}
                            {isCctv && <CctvIcon className="w-4 h-4 text-cyan-400" />}
                            <span className="text-[10px] text-slate-400 font-bold uppercase">{m.type}</span>
                          </div>
                        </td>

                        {/* Label */}
                        <td className="py-2.5 font-bold text-white group-hover:text-cyan-300 transition">
                          {m.label}
                        </td>

                        {/* Sector */}
                        <td className="py-2.5 text-cyan-300/90 font-medium">
                          {m.sector}
                        </td>

                        {/* Coordinates */}
                        <td className="py-2.5 text-slate-400 text-[10.5px]">
                          {m.coordinates || `${m.coords.x}% X, ${m.coords.y}% Y`}
                        </td>

                        {/* Status */}
                        <td className="py-2.5">
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 text-[10px]">
                            {m.status}
                          </span>
                        </td>

                        {/* Priority / Alert */}
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            m.priority === 'CRITICAL'
                              ? 'bg-red-950 text-red-300 border border-red-500/60'
                              : m.priority === 'HIGH'
                              ? 'bg-orange-950 text-orange-300 border border-orange-500/60'
                              : m.priority === 'MEDIUM'
                              ? 'bg-amber-950 text-amber-300 border border-amber-500/60'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-500/60'
                          }`}>
                            {m.priority || 'NORMAL'}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="py-2.5 pr-2 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMarker(m);
                              setViewAllModalOpen(false);
                            }}
                            className="px-2 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] hover:bg-cyan-900 hover:text-white transition flex items-center gap-1 ml-auto"
                          >
                            <Navigation className="w-3 h-3" />
                            <span>Locate</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredModalMarkers.length === 0 && (
                <div className="py-10 text-center text-slate-400 font-mono-code text-xs">
                  No matching operational assets or threats found.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono-code text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Geospatial Mesh Synced (100% Signal Integrity)</span>
              </div>
              <button
                onClick={() => setViewAllModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
