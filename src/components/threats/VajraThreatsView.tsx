import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  Calendar,
  ChevronDown,
  Search,
  Crosshair,
  CheckCircle2,
  Maximize2,
  Radio,
  FileText,
  Cpu,
  Share2,
  Map as MapIcon,
  Shield,
  Plane,
  Eye,
  Anchor,
  Zap,
  Target,
  Clock,
  Compass,
  Layers,
  Flame,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// Using existing image assets strictly unchanged
import droneJkImg from '../../assets/images/drone_surveillance_jk_1788709366761.jpg';
import heatmapImg from '../../assets/images/geospatial_heatmap_intel_1788709946423.jpg';
import indiaNeuralMap from '../../assets/images/india_neural_cyber_map_1788703459745.jpg';

import {
  IncidentReportModal,
  DroneSupportModal,
  ShareIntelModal,
  ThreatItem
} from './ThreatModals';

interface VajraThreatsViewProps {
  onNavigate?: (navId: 'DASHBOARD' | 'FEEDS' | 'THREATS' | 'AI' | 'REPORTS' | 'RESOURCES' | 'SETTINGS') => void;
}

// Tactical Threat Symbol components matching the legend
export const DroneThreatIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L4 18L12 14.5L20 18L12 2Z" />
  </svg>
);

export const MissileThreatIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C12 2 8.5 7.5 8.5 13C8.5 15.5 7 18 5 20.5L7.5 21L12 18.5L16.5 21L19 20.5C17 18 15.5 15.5 15.5 13C15.5 7.5 12 2 12 2Z" />
  </svg>
);

export const CyberThreatIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="3" x2="12" y2="21" />
    <line x1="3" y1="12" x2="21" y2="12" />
  </svg>
);

export const IedThreatIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
    <line x1="18.4" y1="5.6" x2="5.6" y2="18.4" />
  </svg>
);

export const NavalThreatIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="5" r="2.5" />
    <line x1="12" y1="7.5" x2="12" y2="21" />
    <line x1="7.5" y1="11" x2="16.5" y2="11" />
    <path d="M5 14C5 18 8 21 12 21C16 21 19 18 19 14" />
  </svg>
);

export const SurveillanceThreatIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9.5" />
    <circle cx="12" cy="12" r="4.2" fill="currentColor" />
  </svg>
);

// Helper to render the marked tactical symbol matching the legend
export const renderThreatSymbol = (category: string, className = 'w-3 h-3') => {
  switch (category) {
    case 'Drone':
      return <DroneThreatIcon className={className} />;
    case 'Missile':
      return <MissileThreatIcon className={className} />;
    case 'Cyber':
      return <CyberThreatIcon className={className} />;
    case 'IED':
      return <IedThreatIcon className={className} />;
    case 'Naval':
      return <NavalThreatIcon className={className} />;
    case 'Surveillance':
      return <SurveillanceThreatIcon className={className} />;
    default:
      return <span className="font-bold text-[9px]">▲</span>;
  }
};

export interface ThreatGeoData {
  topPct: number;
  leftPct: number;
  label: string;
  category: 'Drone' | 'Missile' | 'Cyber' | 'IED' | 'Naval' | 'Surveillance';
  symbolChar: string;
  labelPlacement: 'top' | 'left' | 'right' | 'bottom';
  themeColor: string;
  pinBg: string;
  glowColor: string;
}

// Coordinate mapping for threat hotspots on the uploaded Bharat Neural Cyber Map with dedicated non-overlapping label placement
const threatGeoPositions: Record<string, ThreatGeoData> = {
  'TI-2026-0918-001': {
    topPct: 22,
    leftPct: 41,
    label: 'J&K (LoC)',
    category: 'Drone',
    symbolChar: '▲',
    labelPlacement: 'left',
    themeColor: 'text-red-400',
    pinBg: 'bg-red-950/95 border-red-500 text-red-100',
    glowColor: '#ef4444'
  },
  'TI-2026-0918-002': {
    topPct: 31,
    leftPct: 39,
    label: 'Punjab',
    category: 'Missile',
    symbolChar: '▲',
    labelPlacement: 'left',
    themeColor: 'text-amber-400',
    pinBg: 'bg-amber-950/95 border-amber-500 text-amber-100',
    glowColor: '#f59e0b'
  },
  'TI-2026-0918-003': {
    topPct: 35,
    leftPct: 46,
    label: 'Delhi',
    category: 'Cyber',
    symbolChar: '⊕',
    labelPlacement: 'right',
    themeColor: 'text-cyan-300',
    pinBg: 'bg-cyan-950/95 border-cyan-400 text-cyan-100',
    glowColor: '#06b6d4'
  },
  'TI-2026-0918-004': {
    topPct: 26,
    leftPct: 42,
    label: 'Jammu',
    category: 'IED',
    symbolChar: '⊗',
    labelPlacement: 'right',
    themeColor: 'text-purple-300',
    pinBg: 'bg-purple-950/95 border-purple-500 text-purple-100',
    glowColor: '#a855f7'
  },
  'TI-2026-0918-005': {
    topPct: 62,
    leftPct: 26,
    label: 'Arabian Sea',
    category: 'Naval',
    symbolChar: '⚓',
    labelPlacement: 'right',
    themeColor: 'text-sky-300',
    pinBg: 'bg-sky-950/95 border-sky-400 text-sky-100',
    glowColor: '#0ea5e9'
  },
  'TI-2026-0918-006': {
    topPct: 40,
    leftPct: 34,
    label: 'Rajasthan',
    category: 'Surveillance',
    symbolChar: '◎',
    labelPlacement: 'left',
    themeColor: 'text-emerald-300',
    pinBg: 'bg-emerald-950/95 border-emerald-400 text-emerald-100',
    glowColor: '#10b981'
  },
  'TI-2026-0918-007': {
    topPct: 51,
    leftPct: 32,
    label: 'Gujarat',
    category: 'Drone',
    symbolChar: '▲',
    labelPlacement: 'left',
    themeColor: 'text-red-400',
    pinBg: 'bg-red-950/95 border-red-500 text-red-100',
    glowColor: '#ef4444'
  },
  'TI-2026-0918-008': {
    topPct: 60,
    leftPct: 42,
    label: 'Maharashtra',
    category: 'Cyber',
    symbolChar: '⊕',
    labelPlacement: 'right',
    themeColor: 'text-cyan-300',
    pinBg: 'bg-cyan-950/95 border-cyan-400 text-cyan-100',
    glowColor: '#06b6d4'
  },
  'TI-2026-0918-009': {
    topPct: 20,
    leftPct: 50,
    label: 'Ladakh',
    category: 'Missile',
    symbolChar: '▲',
    labelPlacement: 'right',
    themeColor: 'text-amber-400',
    pinBg: 'bg-amber-950/95 border-amber-500 text-amber-100',
    glowColor: '#f59e0b'
  },
  'TI-2026-0918-010': {
    topPct: 53,
    leftPct: 60,
    label: 'Odisha',
    category: 'IED',
    symbolChar: '⊗',
    labelPlacement: 'right',
    themeColor: 'text-purple-300',
    pinBg: 'bg-purple-950/95 border-purple-500 text-purple-100',
    glowColor: '#a855f7'
  }
};

export const VajraThreatsView: React.FC<VajraThreatsViewProps> = ({ onNavigate }) => {
  // Filter states
  const [timeRange, setTimeRange] = useState<string>('Last 24 Hours');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All Severities');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Tactical Map Legend Controls
  const [legendMode, setLegendMode] = useState<'BOTH' | 'DOCKED' | 'OVERLAY'>('BOTH');
  const [isOverlayMinimized, setIsOverlayMinimized] = useState(false);
  const [legendTypeFilter, setLegendTypeFilter] = useState<string | null>(null);
  const [legendSeverityFilter, setLegendSeverityFilter] = useState<string | null>(null);

  // Dropdown toggles
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showSeverityDropdown, setShowSeverityDropdown] = useState(false);

  // Heatmap layer toggle: Live, Terrain, Hybrid
  const [heatmapLayer, setHeatmapLayer] = useState<'LIVE' | 'TERRAIN' | 'HYBRID'>('LIVE');

  // Analytics timeframe tab: 24H, 7D, 30D
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'24H' | '7D' | '30D'>('24H');

  // Modals state
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [droneModalOpen, setDroneModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [expandedFeedOpen, setExpandedFeedOpen] = useState(false);
  const [allThreatsModalOpen, setAllThreatsModalOpen] = useState(false);

  // Full dataset of 10 items matching the screenshot
  const threatItems: ThreatItem[] = useMemo(() => [
    {
      id: 'TI-2026-0918-001',
      time: '21:42:17',
      type: 'Drone Intrusion',
      location: 'J&K (LoC)',
      severity: 'HIGH',
      status: 'Active',
      source: 'Unmanned Aerial Vehicle',
      altitude: '2,400 ft (est.)',
      speed: '120 km/h (est.)',
      lat: 34.1246,
      lng: 74.8567,
      coordsText: '34.1246° N  74.8567° E',
      alertText: 'Multiple drones detected near LoC.',
      details: 'Hostile quadcopter signature observed cross-corridor at Sector 4 LoC with low-altitude evasive maneuvering.'
    },
    {
      id: 'TI-2026-0918-002',
      time: '21:37:50',
      type: 'Missile Launch',
      location: 'Punjab',
      severity: 'CRITICAL',
      status: 'Investigating',
      source: 'Surface-to-Air / Ballistic Trajectory',
      altitude: '18,500 ft (est.)',
      speed: 'Mach 2.8 (est.)',
      lat: 31.1471,
      lng: 75.3412,
      coordsText: '31.1471° N  75.3412° E',
      alertText: 'High-velocity thermal launch flash detected across western perimeter.',
      details: 'Short-range missile telemetry flagged by radar tracking station Alpha. Interceptor batteries on standby.'
    },
    {
      id: 'TI-2026-0918-003',
      time: '21:28:16',
      type: 'Cyber Attack',
      location: 'Delhi',
      severity: 'MEDIUM',
      status: 'Contained',
      source: 'State-sponsored APT Cluster 41',
      altitude: 'N/A (Virtual Domain)',
      speed: '14.2 Gbps DDoS Spike',
      lat: 28.6139,
      lng: 77.2090,
      coordsText: '28.6139° N  77.2090° E',
      alertText: 'Distributed denial-of-service against Northern Command gateway.',
      details: 'Air-gapped firewall rerouted all malicious packet streams into blackhole scrubbing honeypot.'
    },
    {
      id: 'TI-2026-0918-004',
      time: '21:19:03',
      type: 'IED Detected',
      location: 'Jammu',
      severity: 'HIGH',
      status: 'Active',
      source: 'Remote Radio-Detonated Device',
      altitude: 'Ground Level (0 ft)',
      speed: 'Stationary Device',
      lat: 32.7266,
      lng: 74.8570,
      coordsText: '32.7266° N  74.8570° E',
      alertText: 'Sub-surface RF anomaly detected along Highway 44.',
      details: 'Army Bomb Disposal Squad (BDS) and canine team deployed on cordon-and-neutralize mission.'
    },
    {
      id: 'TI-2026-0918-005',
      time: '21:12:44',
      type: 'Naval Movement',
      location: 'Arabian Sea',
      severity: 'MEDIUM',
      status: 'Tracking',
      source: 'Subsurface & Surface Combatant',
      altitude: 'Sea Level / Sub-surface',
      speed: '18 knots',
      lat: 18.9220,
      lng: 69.5000,
      coordsText: '18.9220° N  69.5000° E',
      alertText: 'Unflagged corvette class warship shadow detected 140nm off Mumbai EEZ.',
      details: 'P-8I Neptune maritime patrol aircraft dispatched for sonar buoy seeding and visual telemetry.'
    },
    {
      id: 'TI-2026-0918-006',
      time: '20:58:32',
      type: 'Surveillance Activity',
      location: 'Rajasthan',
      severity: 'LOW',
      status: 'Monitoring',
      source: 'Optical & RF Mast Transmitter',
      altitude: 'Mast Height (45m)',
      speed: 'Stationary Sensor',
      lat: 26.9124,
      lng: 70.9000,
      coordsText: '26.9124° N  70.9000° E',
      alertText: 'Border outpost radar flagged synchronized frequency sweeps.',
      details: 'Electronic Warfare Corps deployed directional jamming jamming sweep on frequency 433.8 MHz.'
    },
    {
      id: 'TI-2026-0918-007',
      time: '20:44:17',
      type: 'Drone Intrusion',
      location: 'Gujarat',
      severity: 'HIGH',
      status: 'Active',
      source: 'Commercial Hexacopter with Payload',
      altitude: '800 ft (est.)',
      speed: '75 km/h',
      lat: 23.2420,
      lng: 69.6669,
      coordsText: '23.2420° N  69.6669° E',
      alertText: 'Kutch marshland radar flagged low-RCS intruder crossing border.',
      details: 'BSF anti-drone gun engaged kinetic and soft-kill counter-drone microwave pulse.'
    },
    {
      id: 'TI-2026-0918-008',
      time: '20:21:09',
      type: 'Cyber Attack',
      location: 'Maharashtra',
      severity: 'MEDIUM',
      status: 'Contained',
      source: 'SCADA Infiltration Attempt',
      altitude: 'Power Grid Telemetry',
      speed: 'Lateral Vector',
      lat: 19.0760,
      lng: 72.8777,
      coordsText: '19.0760° N  72.8777° E',
      alertText: 'Substation automated switches signaled unauthorized firmware reload.',
      details: 'Grid operations isolated infected node; zero power disruption recorded.'
    },
    {
      id: 'TI-2026-0918-009',
      time: '19:56:33',
      type: 'Missile Launch',
      location: 'Ladakh',
      severity: 'HIGH',
      status: 'Investigating',
      source: 'Artillery Rocket / Guided MLRS',
      altitude: '14,200 ft (est.)',
      speed: 'Mach 1.9',
      lat: 34.1526,
      lng: 77.5771,
      coordsText: '34.1526° N  77.5771° E',
      alertText: 'Infrared satellite flagged plume signature in Eastern Sector.',
      details: 'High-altitude radar arrays confirming trajectory vectors. Mountain corps alerted.'
    },
    {
      id: 'TI-2026-0918-010',
      time: '19:32:11',
      type: 'IED Detected',
      location: 'Odisha',
      severity: 'LOW',
      status: 'Resolved',
      source: 'Improvised Pressure Plate',
      altitude: 'Ground Level',
      speed: 'Neutralized',
      lat: 20.9517,
      lng: 85.0985,
      coordsText: '20.9517° N  85.0985° E',
      alertText: 'Suspected roadside charge safely detonated in forest sector.',
      details: 'Controlled counter-charge executed by Central Reserve Police Force (CRPF).'
    }
  ], []);

  // Currently selected incident (default is item #1: Drone Intrusion J&K)
  const [selectedIncident, setSelectedIncident] = useState<ThreatItem>(threatItems[0]);

  // Filtered threat items for the table
  const filteredThreats = useMemo(() => {
    return threatItems.filter((item) => {
      // Region filter
      if (selectedRegion !== 'All Regions') {
        if (selectedRegion === 'Northern' && !['J&K (LoC)', 'Punjab', 'Jammu', 'Delhi', 'Ladakh'].includes(item.location)) {
          return false;
        }
        if (selectedRegion === 'Western' && !['Rajasthan', 'Gujarat', 'Arabian Sea'].includes(item.location)) {
          return false;
        }
        if (selectedRegion === 'Eastern' && !['Odisha', 'Bihar', 'West Bengal'].includes(item.location)) {
          return false;
        }
      }
      // Severity filter
      if (selectedSeverity !== 'All Severities' && item.severity !== selectedSeverity) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.type.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          item.status.toLowerCase().includes(q) ||
          item.source.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [threatItems, selectedRegion, selectedSeverity, searchQuery]);

  // Helper icons for threat types
  const getThreatTypeIcon = (type: string) => {
    switch (type) {
      case 'Drone Intrusion':
        return <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />;
      case 'Missile Launch':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case 'Cyber Attack':
        return <Crosshair className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
      case 'IED Detected':
        return <Target className="w-3.5 h-3.5 text-purple-400 shrink-0" />;
      case 'Naval Movement':
        return <Anchor className="w-3.5 h-3.5 text-cyan-300 shrink-0" />;
      case 'Surveillance Activity':
        return <Eye className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      default:
        return <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />;
    }
  };

  // Severity pill style
  const getSeverityPill = (sev: ThreatItem['severity']) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-red-600/30 text-red-300 border border-red-500 font-bold';
      case 'HIGH':
        return 'bg-red-950/80 text-red-400 border border-red-500/60 font-medium';
      case 'MEDIUM':
        return 'bg-amber-950/60 text-amber-300 border border-amber-500/50 font-medium';
      case 'LOW':
        return 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/50 font-medium';
    }
  };

  // Status pill style
  const getStatusPill = (status: ThreatItem['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-red-900/60 text-red-300 border border-red-500/50';
      case 'Investigating':
        return 'bg-amber-950/70 text-amber-300 border border-amber-500/50';
      case 'Contained':
        return 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/50';
      case 'Tracking':
        return 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/50';
      case 'Monitoring':
        return 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/50';
      case 'Resolved':
        return 'bg-emerald-900/50 text-emerald-300 border border-emerald-500/50';
    }
  };

  return (
    <div className="w-full space-y-4 font-sans text-white pb-6">
      {/* ============================================================ */}
      {/* 1. TOP HEADER & FILTER TOOLBAR                               */}
      {/* ============================================================ */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/90 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
        {/* Left Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-950/90 to-slate-950 border border-red-500/80 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h1 className="text-xl font-tech font-bold text-white tracking-wider flex items-center gap-2">
              THREATS & INCIDENTS
            </h1>
            <p className="text-[11px] font-mono-code text-cyan-400 tracking-wider">
              REAL-TIME THREAT INTELLIGENCE & INCIDENT MANAGEMENT
            </p>
          </div>
        </div>

        {/* Right Controls / Filters */}
        <div className="flex flex-wrap items-center gap-2 font-mono-code text-xs">
          {/* Time Range Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowTimeDropdown(!showTimeDropdown);
                setShowRegionDropdown(false);
                setShowSeverityDropdown(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/90 border border-cyan-500/40 text-slate-200 hover:border-cyan-400 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>{timeRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {showTimeDropdown && (
              <div className="absolute right-0 top-full mt-1.5 w-40 z-30 rounded-lg bg-slate-950 border border-cyan-500/40 shadow-xl py-1">
                {['Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'All Time'].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTimeRange(t);
                      setShowTimeDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-cyan-950/60 ${
                      timeRange === t ? 'text-cyan-300 font-bold bg-cyan-950/40' : 'text-slate-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Region Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowRegionDropdown(!showRegionDropdown);
                setShowTimeDropdown(false);
                setShowSeverityDropdown(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/90 border border-cyan-500/40 text-slate-200 hover:border-cyan-400 transition-colors"
            >
              <span>{selectedRegion}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {showRegionDropdown && (
              <div className="absolute right-0 top-full mt-1.5 w-44 z-30 rounded-lg bg-slate-950 border border-cyan-500/40 shadow-xl py-1">
                {['All Regions', 'Northern', 'Western', 'Eastern'].map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setSelectedRegion(r);
                      setShowRegionDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-cyan-950/60 ${
                      selectedRegion === r ? 'text-cyan-300 font-bold bg-cyan-950/40' : 'text-slate-300'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Severity Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowSeverityDropdown(!showSeverityDropdown);
                setShowTimeDropdown(false);
                setShowRegionDropdown(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/90 border border-cyan-500/40 text-slate-200 hover:border-cyan-400 transition-colors"
            >
              <span>{selectedSeverity}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {showSeverityDropdown && (
              <div className="absolute right-0 top-full mt-1.5 w-40 z-30 rounded-lg bg-slate-950 border border-cyan-500/40 shadow-xl py-1">
                {['All Severities', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSelectedSeverity(s);
                      setShowSeverityDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-cyan-950/60 ${
                      selectedSeverity === s ? 'text-cyan-300 font-bold bg-cyan-950/40' : 'text-slate-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by location, type, keyword..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900/90 border border-cyan-500/30 text-xs font-mono-code text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. TOP 4 METRIC CARDS                                        */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Threats */}
        <div className="relative overflow-hidden p-4 rounded-xl bg-gradient-to-br from-red-950/40 via-slate-950/90 to-slate-950 border border-red-500/70 shadow-[0_0_15px_rgba(239,68,68,0.2)] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-500/60 flex items-center justify-center text-red-500">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono-code text-slate-300 uppercase tracking-wider">
                Total Threats
              </div>
              <div className="text-3xl font-tech font-bold text-red-500 leading-tight">
                23
              </div>
              <div className="text-[11px] font-mono-code text-red-400 flex items-center gap-1">
                <span>↑ 12%</span>
                <span className="text-slate-400">vs. previous 24h</span>
              </div>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-red-500/5 blur-xl pointer-events-none" />
        </div>

        {/* Card 2: Incidents */}
        <div className="relative overflow-hidden p-4 rounded-xl bg-gradient-to-br from-amber-950/30 via-slate-950/90 to-slate-950 border border-amber-500/70 shadow-[0_0_15px_rgba(245,158,11,0.2)] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-500/60 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono-code text-slate-300 uppercase tracking-wider">
                Incidents
              </div>
              <div className="text-3xl font-tech font-bold text-amber-400 leading-tight">
                12
              </div>
              <div className="text-[11px] font-mono-code text-amber-400 flex items-center gap-1">
                <span>↑ 8%</span>
                <span className="text-slate-400">vs. previous 24h</span>
              </div>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-amber-500/5 blur-xl pointer-events-none" />
        </div>

        {/* Card 3: Under Investigation */}
        <div className="relative overflow-hidden p-4 rounded-xl bg-gradient-to-br from-cyan-950/30 via-slate-950/90 to-slate-950 border border-cyan-500/70 shadow-[0_0_15px_rgba(6,182,212,0.2)] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/60 flex items-center justify-center text-cyan-400">
              <Crosshair className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono-code text-slate-300 uppercase tracking-wider">
                Under Investigation
              </div>
              <div className="text-3xl font-tech font-bold text-cyan-400 leading-tight">
                7
              </div>
              <div className="text-[11px] font-mono-code text-cyan-400 flex items-center gap-1">
                <span>↓ 22%</span>
                <span className="text-slate-400">vs. previous 24h</span>
              </div>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-cyan-500/5 blur-xl pointer-events-none" />
        </div>

        {/* Card 4: Resolved */}
        <div className="relative overflow-hidden p-4 rounded-xl bg-gradient-to-br from-emerald-950/30 via-slate-950/90 to-slate-950 border border-emerald-500/70 shadow-[0_0_15px_rgba(16,185,129,0.2)] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono-code text-slate-300 uppercase tracking-wider">
                Resolved
              </div>
              <div className="text-3xl font-tech font-bold text-emerald-400 leading-tight">
                4
              </div>
              <div className="text-[11px] font-mono-code text-emerald-400 flex items-center gap-1">
                <span>↑ 33%</span>
                <span className="text-slate-400">vs. previous 24h</span>
              </div>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. MIDDLE THREE PANELS: MAP | INCIDENT LIST | INCIDENT DETAILS */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* PANE 1: THREAT DISTRIBUTION (INDIA) MAP (Col span: 4) */}
        <div className="lg:col-span-4 rounded-xl bg-slate-950/90 border border-cyan-500/30 p-3 shadow-lg flex flex-col min-h-[580px] lg:h-[580px] relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 shrink-0">
            <div className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-tech font-bold text-cyan-300 tracking-wider">
                THREAT DISTRIBUTION (INDIA)
              </h2>
            </div>
            <div className="flex items-center gap-1.5">
              {(legendTypeFilter || legendSeverityFilter) && (
                <button
                  onClick={() => {
                    setLegendTypeFilter(null);
                    setLegendSeverityFilter(null);
                  }}
                  className="px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-500/40 text-[9px] font-mono-code text-amber-300 hover:bg-amber-900/80 transition"
                  title="Clear map filter"
                >
                  Clear Filter
                </button>
              )}
              {/* Legend Toggle Mode */}
              <div className="flex items-center rounded bg-slate-900 border border-cyan-500/30 p-0.5 text-[9px] font-mono-code">
                <button
                  onClick={() => setLegendMode(m => m === 'BOTH' ? 'DOCKED' : m === 'DOCKED' ? 'OVERLAY' : 'BOTH')}
                  className="px-1.5 py-0.5 text-cyan-300 hover:text-white transition flex items-center gap-1"
                  title="Toggle Legend Placement (Docked / Overlay / Both)"
                >
                  <Layers className="w-2.5 h-2.5 text-cyan-400" />
                  <span className="hidden sm:inline">Legend:</span>
                  <span className="font-bold text-cyan-200 uppercase">{legendMode}</span>
                </button>
              </div>
              {/* View All Button */}
              <button
                onClick={() => setAllThreatsModalOpen(true)}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950/90 border border-cyan-500/50 text-[9px] font-mono-code font-bold text-cyan-300 hover:bg-cyan-900 hover:text-white transition shadow-sm"
                title="View Master Threat Log of all active threats and locations"
              >
                <Eye className="w-2.5 h-2.5 text-cyan-400" />
                <span>View All</span>
              </button>

              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-900 border border-emerald-500/40 text-[9px] font-mono-code text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
          </div>

          {/* Interactive Tactical Map Canvas */}
          <div className="relative flex-1 w-full min-h-[340px] mt-2 rounded-lg bg-slate-950 overflow-hidden border border-cyan-500/20 flex items-center justify-center p-2">
            {/* Tactical Grid Background */}
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.18) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Tactical Coordinate Radar Circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-[320px] h-[320px] rounded-full border border-cyan-400/40 animate-spin duration-[20s]" />
              <div className="w-[200px] h-[200px] rounded-full border border-cyan-500/30 border-dashed" />
            </div>

            {/* Glowing Tactical Cyber Map of India (Uploaded Indian Map) */}
            <div className="relative w-full h-full max-w-[440px] max-h-[460px] flex items-center justify-center">
              <img
                src={indiaNeuralMap}
                alt="Bharat Tactical Cyber Defense Map"
                className="w-full h-full object-contain filter drop-shadow-[0_0_24px_rgba(6,182,212,0.45)] select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />

              {/* Geo Markers for Active Threats */}
              {threatItems.map((threat) => {
                const geo = threatGeoPositions[threat.id];
                if (!geo) return null;

                const isSelected = selectedIncident.id === threat.id;
                const isCritical = threat.severity === 'CRITICAL';
                const isHigh = threat.severity === 'HIGH';
                const isMedium = threat.severity === 'MEDIUM';

                // Check filter match
                const matchesType = !legendTypeFilter || geo.category === legendTypeFilter;
                const matchesSeverity = !legendSeverityFilter || threat.severity === legendSeverityFilter;
                const isFilteredOut = (legendTypeFilter || legendSeverityFilter) && (!matchesType || !matchesSeverity);
                const isHighlighted = (legendTypeFilter || legendSeverityFilter) && matchesType && matchesSeverity;

                // Non-overlapping label placement class
                const getLabelPlacementClass = (placement: 'top' | 'left' | 'right' | 'bottom') => {
                  switch (placement) {
                    case 'top':
                      return 'bottom-full mb-2 left-1/2 -translate-x-1/2';
                    case 'bottom':
                      return 'top-full mt-2 left-1/2 -translate-x-1/2';
                    case 'left':
                      return 'right-full mr-2.5 top-1/2 -translate-y-1/2';
                    case 'right':
                      return 'left-full ml-2.5 top-1/2 -translate-y-1/2';
                    default:
                      return 'left-full ml-2.5 top-1/2 -translate-y-1/2';
                  }
                };

                const severityDotBg = isCritical
                  ? 'bg-red-500 shadow-[0_0_6px_#ef4444]'
                  : isHigh
                  ? 'bg-orange-500 shadow-[0_0_6px_#f97316]'
                  : isMedium
                  ? 'bg-yellow-400 shadow-[0_0_6px_#eab308]'
                  : 'bg-emerald-400 shadow-[0_0_6px_#10b981]';

                return (
                  <button
                    key={threat.id}
                    onClick={() => setSelectedIncident(threat)}
                    style={{ top: `${geo.topPct}%`, left: `${geo.leftPct}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer p-1.5 focus:outline-none transition-all duration-300 ${
                      isSelected ? 'z-30 scale-110' : isHighlighted ? 'z-25 scale-110' : isFilteredOut ? 'opacity-25 z-0' : 'z-10'
                    }`}
                    title={`${geo.category} [${threat.severity}]: ${threat.location}`}
                  >
                    {/* Non-destructive tactical radar ripple ring */}
                    {(isCritical || isHigh) && !isFilteredOut && (
                      <span
                        className={`w-7 h-7 rounded-full absolute -top-0.5 -left-0.5 border pointer-events-none animate-ping opacity-60 ${
                          isCritical ? 'border-red-500' : 'border-orange-500'
                        }`}
                      />
                    )}

                    {/* Core node pin with MARKED TACTICAL SYMBOL */}
                    <div
                      className={`relative w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border flex items-center justify-center transition-all duration-200 shadow-md ${
                        isSelected
                          ? 'ring-4 ring-cyan-400 scale-125 shadow-[0_0_15px_#22d3ee]'
                          : isHighlighted
                          ? 'ring-2 ring-amber-400 scale-120'
                          : 'group-hover:scale-115'
                      } ${geo.pinBg}`}
                      style={{
                        boxShadow: isSelected
                          ? `0 0 16px ${geo.glowColor}`
                          : `0 0 8px ${geo.glowColor}80`
                      }}
                    >
                      {/* Crisp Marked Tactical Symbol inside the Pin */}
                      {renderThreatSymbol(geo.category, 'w-3 h-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]')}

                      {/* Small Severity pip dot on top-right of pin */}
                      <span
                        className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full border border-slate-950 ${
                          isCritical
                            ? 'bg-red-500 animate-pulse'
                            : isHigh
                            ? 'bg-orange-500'
                            : isMedium
                            ? 'bg-yellow-400'
                            : 'bg-emerald-400'
                        }`}
                      />
                    </div>

                    {/* Location & Tactical Tooltip Label (Clear, Non-overlapping) */}
                    <div
                      className={`absolute whitespace-nowrap px-1.5 py-0.5 rounded border text-[9px] font-mono-code font-bold transition-all pointer-events-none ${getLabelPlacementClass(
                        geo.labelPlacement
                      )} ${
                        isSelected
                          ? 'bg-slate-950/95 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.6)] scale-105 z-30'
                          : isHighlighted
                          ? 'bg-slate-950/95 border-amber-500/80 text-white shadow-[0_0_8px_rgba(245,158,11,0.4)] z-25'
                          : 'bg-slate-950/85 border-slate-700/80 text-slate-300 group-hover:border-cyan-500/60 group-hover:text-white group-hover:bg-slate-950 z-20'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${severityDotBg}`} />
                        <span className={`${geo.themeColor} shrink-0`}>
                          {renderThreatSymbol(geo.category, 'w-2.5 h-2.5')}
                        </span>
                        <span className="tracking-tight">{geo.label}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Left Scale Bar & Compass Rose */}
            <div className="absolute left-2.5 bottom-2.5 flex items-center gap-3 text-[9px] font-mono-code text-cyan-300/80 pointer-events-none">
              <div className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>N</span>
              </div>
              <div className="flex flex-col">
                <div className="h-1 w-16 sm:w-20 border-b border-l border-r border-cyan-400/70" />
                <span className="text-[7.5px] text-slate-400 mt-0.5">0 250 500 1,000 km</span>
              </div>
            </div>

            {/* ON-MAP FLOATING HUD OVERLAY: PROPERLY LOCATED & COMPACT (Stops well above Odisha) */}
            {(legendMode === 'OVERLAY' || legendMode === 'BOTH') && (
              <div className="absolute right-2 top-2 rounded-lg bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 p-2 text-[10px] font-mono-code text-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.7)] z-20 pointer-events-auto transition-all">
                {isOverlayMinimized ? (
                  <button
                    onClick={() => setIsOverlayMinimized(false)}
                    className="flex items-center gap-1 text-[9px] text-cyan-300 hover:text-white"
                    title="Expand HUD Legend"
                  >
                    <Layers className="w-3 h-3 text-cyan-400" />
                    <span className="font-bold">LEGEND</span>
                    <span className="text-cyan-400 font-bold ml-1">[+]</span>
                  </button>
                ) : (
                  <div className="space-y-1.5">
                    {/* Overlay Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-cyan-500/20 pb-1">
                      <div className="text-[8.5px] text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1">
                        <Crosshair className="w-2.5 h-2.5 text-cyan-400" />
                        MAP LEGEND
                      </div>
                      <button
                        onClick={() => setIsOverlayMinimized(true)}
                        className="text-[9px] text-slate-400 hover:text-cyan-300 px-1 font-mono-code"
                        title="Minimize floating legend"
                      >
                        [-]
                      </button>
                    </div>

                    {/* 2-Column Side-by-Side Compact Layout */}
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[9px]">
                      {/* Left Column: Threat Types with Marked Symbols */}
                      <div className="space-y-0.5">
                        <div className="text-[7.5px] text-cyan-400/80 font-bold uppercase">THREAT TYPE</div>
                        <div className="flex items-center gap-1 text-slate-200">
                          <DroneThreatIcon className="w-2.5 h-2.5 text-red-500 shrink-0" />
                          <span>Drone</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-200">
                          <MissileThreatIcon className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                          <span>Missile</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-200">
                          <CyberThreatIcon className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                          <span>Cyber</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-200">
                          <IedThreatIcon className="w-2.5 h-2.5 text-purple-400 shrink-0" />
                          <span>IED</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-200">
                          <NavalThreatIcon className="w-2.5 h-2.5 text-sky-400 shrink-0" />
                          <span>Naval</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-200">
                          <SurveillanceThreatIcon className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                          <span>Surveillance</span>
                        </div>
                      </div>

                      {/* Right Column: Severity */}
                      <div className="space-y-0.5 border-l border-slate-800/80 pl-2">
                        <div className="text-[7.5px] text-cyan-400/80 font-bold uppercase">SEVERITY</div>
                        <div className="flex items-center gap-1 text-slate-200">
                          <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_4px_#ef4444] shrink-0" />
                          <span>Critical</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-200">
                          <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_4px_#f97316] shrink-0" />
                          <span>High</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-200">
                          <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_4px_#eab308] shrink-0" />
                          <span>Medium</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-200">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_4px_#10b981] shrink-0" />
                          <span>Low</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* DOCKED TACTICAL HUD LEGEND TRAY (Below Map Canvas - 100% Unobstructed Map View) */}
          {(legendMode === 'DOCKED' || legendMode === 'BOTH') && (
            <div className="mt-2 pt-2 border-t border-cyan-500/20 bg-slate-950/95 rounded-lg p-2 text-[10px] font-mono-code shrink-0">
              <div className="flex flex-col gap-1.5">
                {/* Threat Type Row with Marked Symbols */}
                <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1">
                  <span className="text-[8.5px] text-cyan-400 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
                    <Target className="w-3 h-3 text-cyan-400" />
                    THREAT TYPE:
                  </span>
                  {[
                    { name: 'Drone', color: 'text-red-500', symbol: <DroneThreatIcon className="w-3 h-3 text-red-500 shrink-0" /> },
                    { name: 'Missile', color: 'text-amber-500', symbol: <MissileThreatIcon className="w-3 h-3 text-amber-500 shrink-0" /> },
                    { name: 'Cyber', color: 'text-cyan-400', symbol: <CyberThreatIcon className="w-3 h-3 text-cyan-400 shrink-0" /> },
                    { name: 'IED', color: 'text-purple-400', symbol: <IedThreatIcon className="w-3 h-3 text-purple-400 shrink-0" /> },
                    { name: 'Naval', color: 'text-sky-400', symbol: <NavalThreatIcon className="w-3 h-3 text-sky-400 shrink-0" /> },
                    { name: 'Surveillance', color: 'text-emerald-400', symbol: <SurveillanceThreatIcon className="w-3 h-3 text-emerald-400 shrink-0" /> }
                  ].map((t) => {
                    const isActive = legendTypeFilter === t.name;
                    return (
                      <button
                        key={t.name}
                        onClick={() => setLegendTypeFilter(isActive ? null : t.name)}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition border text-[9.5px] ${
                          isActive
                            ? 'bg-cyan-500/25 border-cyan-400 text-white font-bold shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                            : 'border-slate-800/80 bg-slate-900/60 text-slate-300 hover:border-cyan-500/40 hover:text-white'
                        }`}
                        title={`Click to filter: ${t.name}`}
                      >
                        {t.symbol}
                        <span>{t.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Severity Row with Color Indicators */}
                <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1 pt-1 border-t border-slate-900">
                  <span className="text-[8.5px] text-cyan-400 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
                    <Shield className="w-3 h-3 text-cyan-400" />
                    SEVERITY:
                  </span>
                  {[
                    { level: 'Critical', dot: 'bg-red-500 shadow-[0_0_5px_#ef4444]', filterKey: 'CRITICAL' },
                    { level: 'High', dot: 'bg-orange-500 shadow-[0_0_5px_#f97316]', filterKey: 'HIGH' },
                    { level: 'Medium', dot: 'bg-yellow-400 shadow-[0_0_5px_#eab308]', filterKey: 'MEDIUM' },
                    { level: 'Low', dot: 'bg-emerald-500 shadow-[0_0_5px_#10b981]', filterKey: 'LOW' }
                  ].map((s) => {
                    const isActive = legendSeverityFilter === s.filterKey;
                    return (
                      <button
                        key={s.level}
                        onClick={() => setLegendSeverityFilter(isActive ? null : s.filterKey)}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition border text-[9.5px] ${
                          isActive
                            ? 'bg-cyan-500/25 border-cyan-400 text-white font-bold shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                            : 'border-slate-800/80 bg-slate-900/60 text-slate-300 hover:border-cyan-500/40 hover:text-white'
                        }`}
                        title={`Click to filter: ${s.level}`}
                      >
                        <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
                        <span>{s.level}</span>
                      </button>
                    );
                  })}
                  <span className="ml-auto text-[8.5px] text-slate-400 font-mono-code">
                    10 Active Hotspots
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PANE 2: THREAT & INCIDENT LIST (Col span: 5) */}
        <div className="lg:col-span-5 rounded-xl bg-slate-950/90 border border-cyan-500/30 p-3 shadow-lg flex flex-col min-h-[580px] lg:h-[580px]">
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-cyan-500/20">
            <h2 className="text-xs font-tech font-bold text-cyan-300 tracking-wider">
              THREAT & INCIDENT LIST
            </h2>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-emerald-500/40 text-[10px] font-mono-code text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-y-auto mt-2 pr-1 space-y-1">
            <table className="w-full text-left border-collapse text-[11px] font-mono-code">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800/80 text-[10px] uppercase">
                  <th className="py-1.5 px-2 w-7">#</th>
                  <th className="py-1.5 px-2">TIME (IST)</th>
                  <th className="py-1.5 px-2">TYPE</th>
                  <th className="py-1.5 px-2">LOCATION</th>
                  <th className="py-1.5 px-2 text-center">SEVERITY</th>
                  <th className="py-1.5 px-2 text-center">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/60">
                {filteredThreats.map((item, idx) => {
                  const isSelected = selectedIncident.id === item.id;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedIncident(item)}
                      className={`cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-cyan-950/50 border-l-2 border-cyan-400 text-white'
                          : 'hover:bg-slate-900/60 text-slate-300'
                      }`}
                    >
                      <td className="py-2 px-2 text-slate-500 font-bold">{idx + 1}</td>
                      <td className="py-2 px-2 text-slate-300">{item.time}</td>
                      <td className="py-2 px-2">
                        <div className="flex items-center gap-1.5">
                          {getThreatTypeIcon(item.type)}
                          <span className="truncate">{item.type}</span>
                        </div>
                      </td>
                      <td className="py-2 px-2 text-cyan-300">{item.location}</td>
                      <td className="py-2 px-2 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${getSeverityPill(
                            item.severity
                          )}`}
                        >
                          {item.severity}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] ${getStatusPill(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* PANE 3: INCIDENT DETAILS (Col span: 3) */}
        <div className="lg:col-span-3 rounded-xl bg-slate-950/90 border border-cyan-500/30 p-3 shadow-lg flex flex-col min-h-[580px] lg:h-[580px] justify-between">
          <div>
            {/* Top header */}
            <div className="flex items-center gap-2 pb-2 border-b border-cyan-500/20">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <h2 className="text-xs font-tech font-bold text-white tracking-wider">
                INCIDENT DETAILS
              </h2>
            </div>

            {/* Title & Severity Badge */}
            <div className="flex items-center justify-between mt-2.5">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="font-tech font-bold text-red-400 text-sm">
                  {selectedIncident.type}
                </span>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${getSeverityPill(
                  selectedIncident.severity
                )}`}
              >
                {selectedIncident.severity}
              </span>
            </div>

            {/* Key-Value Specifications */}
            <div className="my-2.5 space-y-1 text-xs font-mono-code text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">ID</span>
                <span className="text-slate-200">: {selectedIncident.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time</span>
                <span className="text-slate-200">: {selectedIncident.time} IST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location</span>
                <span className="text-cyan-300">: {selectedIncident.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Type</span>
                <span className="text-slate-200">: {selectedIncident.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className="text-red-400 font-bold">: {selectedIncident.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Source</span>
                <span className="text-slate-200 truncate max-w-[150px]">: {selectedIncident.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Altitude</span>
                <span className="text-slate-200">: {selectedIncident.altitude || 'Surface level'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Speed</span>
                <span className="text-slate-200">: {selectedIncident.speed || 'N/A'}</span>
              </div>
            </div>

            {/* Tactical Camera Feed Viewport */}
            <div className="relative rounded-lg overflow-hidden border border-cyan-500/40 bg-black h-36 mt-1">
              <img
                src={droneJkImg}
                alt="Tactical Drone Surveillance"
                className="w-full h-full object-cover opacity-90"
              />
              {/* HUD corner lines */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

              {/* Target Crosshair Reticle */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-10 h-10 border border-red-500/80 rounded-sm flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <div className="absolute -top-1 w-2 h-0.5 bg-red-500" />
                  <div className="absolute -bottom-1 w-2 h-0.5 bg-red-500" />
                  <div className="absolute -left-1 h-2 w-0.5 bg-red-500" />
                  <div className="absolute -right-1 h-2 w-0.5 bg-red-500" />
                </div>
              </div>

              {/* Top right expand button */}
              <button
                onClick={() => setExpandedFeedOpen(true)}
                className="absolute top-1.5 right-1.5 p-1 rounded bg-black/60 hover:bg-black text-cyan-300 border border-cyan-500/40"
                title="Expand Feed"
              >
                <Maximize2 className="w-3 h-3" />
              </button>

              {/* Coordinates stamp */}
              <div className="absolute bottom-1.5 left-2 bg-black/70 px-1.5 py-0.5 rounded text-[9px] font-mono-code text-cyan-300">
                {selectedIncident.coordsText}
              </div>
            </div>

            {/* Alert Notification banner */}
            <div className="mt-2.5 p-2 rounded-lg bg-red-950/60 border border-red-500/50 flex items-center gap-2 text-xs font-mono-code text-red-300">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <span className="truncate">{selectedIncident.alertText}</span>
            </div>
          </div>

          {/* Full Report Action Button */}
          <button
            onClick={() => setReportModalOpen(true)}
            className="w-full mt-3 py-2 bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 hover:from-cyan-900 hover:to-slate-800 border border-cyan-500/60 rounded-lg text-xs font-tech font-bold text-cyan-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all"
          >
            <span>View Full Report</span>
            <span className="text-cyan-400">→</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. BOTTOM ROW: ANALYTICS | HEATMAP | RECENT ALERTS | ACTIONS */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* PANEL 1: INCIDENT ANALYTICS */}
        <div className="p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 shadow-lg flex flex-col justify-between h-[230px]">
          {/* Header with 24H, 7D, 30D toggles */}
          <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
            <h3 className="text-xs font-tech font-bold text-cyan-300 tracking-wider">
              INCIDENT ANALYTICS
            </h3>
            <div className="flex rounded-md overflow-hidden border border-cyan-500/40 text-[10px] font-mono-code">
              {(['24H', '7D', '30D'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setAnalyticsTimeframe(tab)}
                  className={`px-2 py-0.5 transition-colors ${
                    analyticsTimeframe === tab
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Donut Chart & Legend */}
          <div className="flex items-center justify-between gap-2 my-auto">
            {/* SVG Donut */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                {/* Background Ring */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="4"
                />
                {/* Drone 41.7% (Red) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeDasharray="36.7 88"
                  strokeDashoffset="0"
                />
                {/* Missile 16.7% (Amber) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="4"
                  strokeDasharray="14.7 88"
                  strokeDashoffset="-36.7"
                />
                {/* Cyber 16.7% (Blue) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="4"
                  strokeDasharray="14.7 88"
                  strokeDashoffset="-51.4"
                />
                {/* IED 16.7% (Purple) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="4"
                  strokeDasharray="14.7 88"
                  strokeDashoffset="-66.1"
                />
                {/* Naval 8.3% (Cyan) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  strokeDasharray="7.3 88"
                  strokeDashoffset="-80.8"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-tech font-bold text-white leading-tight">12</span>
                <span className="text-[8px] font-mono-code text-slate-400">Total Incidents</span>
              </div>
            </div>

            {/* Legend breakdown */}
            <div className="flex-1 space-y-1 text-[10px] font-mono-code">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Drone
                </span>
                <span className="text-slate-400">5</span>
                <span className="text-slate-200 font-bold">41.7%</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Missile
                </span>
                <span className="text-slate-400">2</span>
                <span className="text-slate-200 font-bold">16.7%</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  Cyber
                </span>
                <span className="text-slate-400">2</span>
                <span className="text-slate-200 font-bold">16.7%</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  IED
                </span>
                <span className="text-slate-400">2</span>
                <span className="text-slate-200 font-bold">16.7%</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Naval
                </span>
                <span className="text-slate-400">1</span>
                <span className="text-slate-200 font-bold">8.3%</span>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 2: THREAT HEATMAP */}
        <div className="p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 shadow-lg flex flex-col justify-between h-[230px]">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
            <h3 className="text-xs font-tech font-bold text-cyan-300 tracking-wider">
              THREAT HEATMAP
            </h3>
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-900 border border-emerald-500/40 text-[9px] font-mono-code text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>

          {/* Graphic and Controls */}
          <div className="flex items-center justify-between gap-3 my-auto">
            {/* Miniature India Heatmap */}
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-cyan-500/30 bg-slate-900 flex items-center justify-center">
              <img
                src={heatmapImg}
                alt="Geospatial Threat Heatmap"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Gradient scale and mode buttons */}
            <div className="flex items-center gap-2.5">
              {/* Color Bar */}
              <div className="flex flex-col items-center justify-between h-28 text-[8px] font-mono-code text-slate-400">
                <span className="text-red-400 font-bold">High</span>
                <div className="w-2 flex-1 my-1 rounded-full bg-gradient-to-b from-red-500 via-amber-400 via-emerald-400 to-blue-600" />
                <span className="text-blue-400 font-bold">Low</span>
              </div>

              {/* 4 Mode Buttons */}
              <div className="flex flex-col gap-1 text-[10px] font-mono-code">
                {(['LIVE', 'TERRAIN', 'HYBRID'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setHeatmapLayer(mode)}
                    className={`px-2 py-1 rounded text-left transition-colors border ${
                      heatmapLayer === mode
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode === 'LIVE' && <span className="text-emerald-400 mr-1">●</span>}
                    {mode.charAt(0) + mode.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 3: RECENT ALERTS */}
        <div className="p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 shadow-lg flex flex-col justify-between h-[230px]">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
            <h3 className="text-xs font-tech font-bold text-cyan-300 tracking-wider">
              RECENT ALERTS
            </h3>
            <button
              onClick={() => setAllThreatsModalOpen(true)}
              className="text-[10px] font-mono-code text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View All
            </button>
          </div>

          {/* Alert list items (6 items) */}
          <div className="space-y-1.5 overflow-hidden my-auto text-[11px] font-mono-code">
            {[
              {
                icon: <AlertTriangle className="w-3.5 h-3.5 text-red-500" />,
                text: 'Drone activity in J&K sector',
                time: '21:42'
              },
              {
                icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />,
                text: 'Missile launch detected (Punjab)',
                time: '21:37'
              },
              {
                icon: <Crosshair className="w-3.5 h-3.5 text-cyan-400" />,
                text: 'Cyber intrusion attempt (Delhi)',
                time: '21:28'
              },
              {
                icon: <Target className="w-3.5 h-3.5 text-purple-400" />,
                text: 'IED suspected (Jammu)',
                time: '21:19'
              },
              {
                icon: <Anchor className="w-3.5 h-3.5 text-cyan-300" />,
                text: 'Naval vessel movement (Arabian Sea)',
                time: '21:12'
              },
              {
                icon: <Eye className="w-3.5 h-3.5 text-emerald-400" />,
                text: 'Unusual surveillance (Rajasthan)',
                time: '20:58'
              }
            ].map((alert, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-1 rounded hover:bg-slate-900/60 transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  {alert.icon}
                  <span className="text-slate-300 truncate">{alert.text}</span>
                </div>
                <span className="text-slate-500 shrink-0 ml-2">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL 4: QUICK ACTIONS (3x2 Grid) */}
        <div className="p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 shadow-lg flex flex-col justify-between h-[230px]">
          {/* Header */}
          <div className="pb-2 border-b border-cyan-500/20">
            <h3 className="text-xs font-tech font-bold text-cyan-300 tracking-wider">
              QUICK ACTIONS
            </h3>
          </div>

          {/* 3x2 Grid */}
          <div className="grid grid-cols-3 gap-2 my-auto">
            {/* 1. View All Threats */}
            <button
              onClick={() => setAllThreatsModalOpen(true)}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900/90 hover:bg-cyan-950/60 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-all h-[70px] group"
            >
              <Target className="w-5 h-5 text-red-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono-code text-center leading-tight">
                View All Threats
              </span>
            </button>

            {/* 2. Request Drone Support */}
            <button
              onClick={() => setDroneModalOpen(true)}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900/90 hover:bg-cyan-950/60 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-all h-[70px] group"
            >
              <Plane className="w-5 h-5 text-cyan-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono-code text-center leading-tight">
                Request Drone Support
              </span>
            </button>

            {/* 3. Generate Report */}
            <button
              onClick={() => setReportModalOpen(true)}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900/90 hover:bg-cyan-950/60 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-all h-[70px] group"
            >
              <FileText className="w-5 h-5 text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono-code text-center leading-tight">
                Generate Report
              </span>
            </button>

            {/* 4. Run AI Analysis */}
            <button
              onClick={() => onNavigate && onNavigate('AI')}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900/90 hover:bg-cyan-950/60 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-all h-[70px] group"
            >
              <Cpu className="w-5 h-5 text-cyan-300 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono-code text-center leading-tight">
                Run AI Analysis
              </span>
            </button>

            {/* 5. Share Intel */}
            <button
              onClick={() => setShareModalOpen(true)}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900/90 hover:bg-cyan-950/60 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-all h-[70px] group"
            >
              <Share2 className="w-5 h-5 text-purple-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono-code text-center leading-tight">
                Share Intel
              </span>
            </button>

            {/* 6. Open Map */}
            <button
              onClick={() => onNavigate && onNavigate('DASHBOARD')}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900/90 hover:bg-cyan-950/60 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-all h-[70px] group"
            >
              <MapIcon className="w-5 h-5 text-cyan-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono-code text-center leading-tight">
                Open Map
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. FUNCTIONAL MODALS                                         */}
      {/* ============================================================ */}
      {/* Incident Dossier Full Modal */}
      <IncidentReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        incident={selectedIncident}
      />

      {/* Request Tactical Drone Support Modal */}
      <DroneSupportModal
        isOpen={droneModalOpen}
        onClose={() => setDroneModalOpen(false)}
        location={selectedIncident.location}
      />

      {/* Share Encrypted Intel Modal */}
      <ShareIntelModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        incidentTitle={`${selectedIncident.id} - ${selectedIncident.type} (${selectedIncident.location})`}
      />

      {/* Expanded Camera / UAV Feed Modal */}
      {expandedFeedOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl rounded-2xl bg-slate-950 border border-cyan-500/60 p-4 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30 mb-3">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-cyan-400" />
                <h3 className="font-tech font-bold text-white text-base">
                  LIVE OPTICAL FEED // SECTOR: {selectedIncident.location}
                </h3>
              </div>
              <button
                onClick={() => setExpandedFeedOpen(false)}
                className="p-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-cyan-500/40 bg-black aspect-video max-h-[70vh]">
              <img
                src={droneJkImg}
                alt="Expanded Feed"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/80 px-3 py-1 rounded border border-cyan-500/40 text-xs font-mono-code text-cyan-300">
                LAT/LONG: {selectedIncident.coordsText} • ALT: {selectedIncident.altitude || '2,400 ft'}
              </div>
              <div className="absolute bottom-3 right-3 bg-red-950/80 px-3 py-1 rounded border border-red-500/60 text-xs font-mono-code text-red-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                RECORDING ACTIVE // FEED ENCRYPTED
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View All Threats Modal */}
      {allThreatsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl rounded-2xl bg-slate-950 border border-cyan-500/60 p-6 shadow-[0_0_50px_rgba(6,182,212,0.3)] max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-red-400" />
                <h3 className="font-tech font-bold text-white text-base">
                  MASTER THREAT LOG // 23 ACTIVE ANOMALIES
                </h3>
              </div>
              <button
                onClick={() => setAllThreatsModalOpen(false)}
                className="p-1 rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto my-4 pr-1">
              <table className="w-full text-left text-xs font-mono-code">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800 pb-2">
                    <th className="py-2">ID</th>
                    <th className="py-2">TIME</th>
                    <th className="py-2">TYPE</th>
                    <th className="py-2">SECTOR</th>
                    <th className="py-2">SEVERITY</th>
                    <th className="py-2">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {threatItems.map((t) => (
                    <tr
                      key={t.id}
                      onClick={() => {
                        setSelectedIncident(t);
                        setAllThreatsModalOpen(false);
                      }}
                      className="hover:bg-cyan-950/40 cursor-pointer text-slate-300"
                    >
                      <td className="py-2.5 font-bold text-cyan-400">{t.id}</td>
                      <td className="py-2.5">{t.time}</td>
                      <td className="py-2.5">{t.type}</td>
                      <td className="py-2.5 text-slate-200">{t.location}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${getSeverityPill(t.severity)}`}>
                          {t.severity}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${getStatusPill(t.status)}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end pt-3 border-t border-cyan-500/20">
              <button
                onClick={() => setAllThreatsModalOpen(false)}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono-code text-white"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
