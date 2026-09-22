import React, { useState } from 'react';
import { 
  CloudSun, Sun, CloudRain, CloudLightning, Snowflake, 
  Wind, Droplets, Thermometer, Gauge, ShieldCheck, 
  Clock, CheckCircle2, ChevronDown, ChevronUp, X, 
  Layers, Radio, Send, Download
} from 'lucide-react';

export interface SectorWeatherDetail {
  id: string;
  name: string;
  code: string;
  region: string;
  temp: number;
  feelsLike: number;
  condition: string;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  precipitation: number;
  pressure: number;
  visibility: number;
  flightReadiness: number;
  statusText: string;
  badgeStyle: string;
  category: 'Optimal' | 'Monitored' | 'Precipitation' | 'Extreme';
  uavStatus: 'CLEAR' | 'ADVISORY' | 'NO_FLY';
  uavEnvelope: string;
  opticsStatus: string;
  ballisticsCorrection: string;
  groundTrafficability: string;
  phases: {
    time: string;
    name: string;
    completed: boolean;
  }[];
}

export const TACTICAL_SECTORS_DATA: SectorWeatherDetail[] = [
  {
    id: 'sec-live',
    name: 'Hyderabad, Telangana (Live GPS Hub)',
    code: 'SEC-LIVE-00',
    region: 'Telangana',
    temp: 27,
    feelsLike: 28,
    condition: 'Optimal Flight Corridor',
    weatherCode: 0,
    windSpeed: 6,
    windDirection: 338,
    humidity: 84,
    precipitation: 0,
    pressure: 950,
    visibility: 9.5,
    flightReadiness: 94,
    statusText: 'OPTIMAL FLIGHT ENVELOPE',
    badgeStyle: 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300',
    category: 'Optimal',
    uavStatus: 'CLEAR',
    uavEnvelope: 'CLEAR FOR DEPLOYMENT (Low Turbulence)',
    opticsStatus: 'FULL OPTICAL SPECTRUM',
    ballisticsCorrection: 'Air density computed: 1.19 kg/m³',
    groundTrafficability: 'FIRM / HIGH MOBILITY',
    phases: [
      { time: '06:00', name: 'Sunrise optical calibration (100% illumination)', completed: true },
      { time: '12:00', name: 'Thermal high-noon infrared peak', completed: true },
      { time: '18:00', name: 'Dusk acoustic sensor adjustment', completed: false },
      { time: '22:00', name: 'Night vision FLIR active cycle', completed: false }
    ]
  },
  {
    id: 'sec-jk',
    name: 'Sector 7 (J&K) - Poonch Ridge (Drone Threat Sector)',
    code: 'SEC-JK-07',
    region: 'Jammu & Kashmir (LoC Fence B-4)',
    temp: 14,
    feelsLike: 12,
    condition: 'Scattered Clouds & Micro-UAV Alerts',
    weatherCode: 2,
    windSpeed: 18,
    windDirection: 275,
    humidity: 62,
    precipitation: 0.2,
    pressure: 880,
    visibility: 8.0,
    flightReadiness: 88,
    statusText: 'HIGH THREAT ENVELOPE',
    badgeStyle: 'bg-red-950/80 border-red-500/80 text-red-300',
    category: 'Extreme',
    uavStatus: 'ADVISORY',
    uavEnvelope: 'JAMMING ACTIVE • RF SPECTRUM DISRUPTED',
    opticsStatus: 'THERMAL FLIR TARGET LOCK ACQUIRED',
    ballisticsCorrection: 'High altitude crosswind compensation: +1.4 Mil',
    groundTrafficability: 'RUGGED ROCKY • QRT CORDON ENGAGED',
    phases: [
      { time: '14:00', name: 'Radar acoustic barrier engaged', completed: true },
      { time: '16:30', name: 'D4 Counter-Drone Soft-Kill grid armed', completed: true },
      { time: '17:32', name: 'Active drone target intercepted & tracked', completed: true },
      { time: '21:00', name: 'Perimeter night thermal sweep', completed: false }
    ]
  },
  {
    id: 'sec-kupwara',
    name: 'Kupwara Forward Perimeter - Tangdhar Sector',
    code: 'SEC-KUP-03',
    region: 'Kupwara LoC Nullah-3',
    temp: 11,
    feelsLike: 9,
    condition: 'Valley Mist & Thermal Priority',
    weatherCode: 45,
    windSpeed: 12,
    windDirection: 310,
    humidity: 78,
    precipitation: 0.1,
    pressure: 865,
    visibility: 5.5,
    flightReadiness: 76,
    statusText: 'MONITORED / THERMAL PRIORITY',
    badgeStyle: 'bg-cyan-950/80 border-cyan-500/80 text-cyan-300',
    category: 'Monitored',
    uavStatus: 'ADVISORY',
    uavEnvelope: 'CAUTION: Dense valley mist at ground altitude',
    opticsStatus: 'SWITCH TO INFRARED / MWIR SENSOR BAND',
    ballisticsCorrection: 'Mountain updraft correction: -0.8 Mil',
    groundTrafficability: 'WET SLOPES / CAUTION FOOT MOVEMENT',
    phases: [
      { time: '08:00', name: 'Seismic ground sensor line active', completed: true },
      { time: '13:00', name: 'Handheld thermal sweep at LoC barrier', completed: true },
      { time: '16:48', name: 'Movement detected at Nullah-3; cordon deployed', completed: true },
      { time: '20:00', name: 'Illumination mortar flares on standby', completed: false }
    ]
  },
  {
    id: 'sec-suratgarh',
    name: 'Sector 4 Depot - Suratgarh Combat Staging',
    code: 'SEC-RAJ-04',
    region: 'Rajasthan Desert Sector',
    temp: 34,
    feelsLike: 37,
    condition: 'Dry Thermal Gradient & Industrial Watch',
    weatherCode: 1,
    windSpeed: 14,
    windDirection: 210,
    humidity: 24,
    precipitation: 0,
    pressure: 1008,
    visibility: 10.0,
    flightReadiness: 96,
    statusText: 'OPTIMAL DESERT CORRIDOR',
    badgeStyle: 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300',
    category: 'Optimal',
    uavStatus: 'CLEAR',
    uavEnvelope: 'CLEAR FOR DRONE / SATELLITE UPLINK',
    opticsStatus: 'CLEAR UNRESTRICTED HORIZON (>10 KM)',
    ballisticsCorrection: 'Standard desert air density correction',
    groundTrafficability: 'HARD DESERT CRUST / TANK READY',
    phases: [
      { time: '11:00', name: 'Combat workshop thermal inspection', completed: true },
      { time: '15:22', name: 'Battery fire contained; automated suppression ok', completed: true },
      { time: '18:00', name: 'T-90 tank fleet systems integrity recheck', completed: false },
      { time: '23:00', name: 'Depot perimeter infrared sweep', completed: false }
    ]
  },
  {
    id: 'sec-ladakh',
    name: 'Siachen Glacier Forward Base - Northern Sub-Sector',
    code: 'SEC-SIA-01',
    region: 'Eastern Ladakh Glacier',
    temp: -18,
    feelsLike: -28,
    condition: 'Sub-Zero Cryo Blizzard Hold',
    weatherCode: 71,
    windSpeed: 42,
    windDirection: 355,
    humidity: 91,
    precipitation: 4.8,
    pressure: 680,
    visibility: 1.2,
    flightReadiness: 32,
    statusText: 'EXTREME BLIZZARD HOLD',
    badgeStyle: 'bg-red-950/80 border-red-500/80 text-red-300',
    category: 'Extreme',
    uavStatus: 'NO_FLY',
    uavEnvelope: 'NO FLY: Rotor icing hazard & severe downdraft',
    opticsStatus: 'HEATED OPTICAL SENSOR LENS DE-ICING ACTIVE',
    ballisticsCorrection: 'Cryo-air high-density calculation: +3.2 Mil',
    groundTrafficability: 'CREVASSE HAZARD • CRAMPONS ONLY',
    phases: [
      { time: '04:00', name: 'Heated fuel line recirculation run', completed: true },
      { time: '10:00', name: 'SATCOM dish snow clearing cycle', completed: true },
      { time: '16:00', name: 'Avalanche early-warning radar check', completed: false },
      { time: '21:00', name: 'Habitation dome oxygen pressure check', completed: false }
    ]
  },
  {
    id: 'sec-tawang',
    name: 'Tawang Eastern Border Sector - High Altitude Post',
    code: 'SEC-TAW-05',
    region: 'Arunachal Pradesh',
    temp: 8,
    feelsLike: 6,
    condition: 'Heavy Precipitation & Ridge Fog',
    weatherCode: 61,
    windSpeed: 22,
    windDirection: 140,
    humidity: 94,
    precipitation: 12.4,
    pressure: 790,
    visibility: 3.0,
    flightReadiness: 62,
    statusText: 'PRECIPITATION ADVISORY',
    badgeStyle: 'bg-amber-950/80 border-amber-500/80 text-amber-300',
    category: 'Precipitation',
    uavStatus: 'ADVISORY',
    uavEnvelope: 'WET ROTOR ENVELOPE • LOW VISIBILITY',
    opticsStatus: 'RAIN WIPERS ACTIVE / INFRARED PENETRATION',
    ballisticsCorrection: 'Precipitation drag compensation applied',
    groundTrafficability: 'MUD ADVISORY • 4X4 ALL-WHEEL REQUIRED',
    phases: [
      { time: '05:30', name: 'Monsoon drainage channel inspection', completed: true },
      { time: '12:00', name: 'Ridge observation camera wash sequence', completed: true },
      { time: '17:00', name: 'High-power fog illumination beam armed', completed: false },
      { time: '22:00', name: 'Border line tripwire diagnostic ping', completed: false }
    ]
  },
  {
    id: 'sec-kutch',
    name: 'Sir Creek Coastal Patrol Grid - Marine Border',
    code: 'SEC-KUT-09',
    region: 'Gujarat Creek Sector',
    temp: 29,
    feelsLike: 33,
    condition: 'Coastal Thermal Clear',
    weatherCode: 0,
    windSpeed: 10,
    windDirection: 190,
    humidity: 76,
    precipitation: 0,
    pressure: 1012,
    visibility: 9.8,
    flightReadiness: 95,
    statusText: 'OPTIMAL NAVAL ENVELOPE',
    badgeStyle: 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300',
    category: 'Optimal',
    uavStatus: 'CLEAR',
    uavEnvelope: 'CLEAR FOR AMPHIBIOUS / HOVERCRAFT PATROL',
    opticsStatus: 'LONG-RANGE COASTAL RADAR SYNCHRONIZED',
    ballisticsCorrection: 'Sea-level baseline: zero correction',
    groundTrafficability: 'TIDAL MUD • HOVERCRAFT CLEAR',
    phases: [
      { time: '07:00', name: 'Tide chart synchronization complete', completed: true },
      { time: '13:00', name: 'High-speed interceptor craft readiness ok', completed: true },
      { time: '18:30', name: 'Sonar buoy acoustic hydrophone check', completed: false },
      { time: '23:00', name: 'Night creek thermal patrol launch', completed: false }
    ]
  }
];

interface RecentIncidentsWeatherFormatModalProps {
  isOpen: boolean;
  initialSelectedId?: string | null;
  onClose: () => void;
  onSelectIncident?: (incident: any) => void;
}

export const RecentIncidentsWeatherFormatModal: React.FC<RecentIncidentsWeatherFormatModalProps> = ({
  isOpen,
  initialSelectedId,
  onClose,
  onSelectIncident
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'ALL' | 'Optimal' | 'Monitored' | 'Precipitation' | 'Extreme'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSectorId, setExpandedSectorId] = useState<string>('sec-live');
  const [advisorySentToast, setAdvisorySentToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const optimalCount = TACTICAL_SECTORS_DATA.filter(s => s.category === 'Optimal').length;
  const monitoredCount = TACTICAL_SECTORS_DATA.filter(s => s.category === 'Monitored').length;
  const precipitationCount = TACTICAL_SECTORS_DATA.filter(s => s.category === 'Precipitation').length;
  const extremeCount = TACTICAL_SECTORS_DATA.filter(s => s.category === 'Extreme').length;

  const filteredSectors = TACTICAL_SECTORS_DATA.filter(sec => {
    const matchesCategory = activeCategoryFilter === 'ALL' || sec.category === activeCategoryFilter;
    const matchesSearch = 
      sec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.condition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleSectorExpansion = (id: string) => {
    setExpandedSectorId(prev => prev === id ? '' : id);
  };

  const handleSendAdvisory = (sectorName: string) => {
    setAdvisorySentToast(`Tactical Advisory & Drone Telemetry broadcast dispatched for ${sectorName}.`);
    setTimeout(() => setAdvisorySentToast(null), 3500);
  };

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="w-5 h-5 text-amber-400" />;
    if (code === 1 || code === 2) return <CloudSun className="w-5 h-5 text-cyan-400" />;
    if (code >= 51 && code <= 67) return <CloudRain className="w-5 h-5 text-blue-400" />;
    if (code >= 71) return <Snowflake className="w-5 h-5 text-cyan-200" />;
    if (code >= 95) return <CloudLightning className="w-5 h-5 text-purple-400" />;
    return <CloudSun className="w-5 h-5 text-cyan-400" />;
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      id="recent-incidents-modal-overlay"
      onClick={onClose}
    >
      <div 
        className="max-w-3xl w-full bg-[#020b1c] border border-cyan-500/50 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4 animate-fade-in max-h-[92vh] overflow-y-auto"
        id="recent-incidents-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shrink-0">
              <CloudSun className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-tech font-bold text-white uppercase tracking-wider">
                TACTICAL METEOROLOGICAL INTELLIGENCE & SENSOR STATUS
              </h3>
              <p className="text-[10px] sm:text-xs font-mono-code text-cyan-400">
                REAL-TIME THEATER WEATHER GRID • 6 STRATEGIC BORDER SECTORS • ENCRYPTED SATELLITE TELEMETRY
              </p>
            </div>
          </div>
          <button 
            type="button"
            id="close-recent-incidents-modal-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xs font-mono-code px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition cursor-pointer flex items-center gap-1 shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close</span>
          </button>
        </div>

        {/* Quick Toast Notification if Advisory Dispatched */}
        {advisorySentToast && (
          <div className="p-2.5 rounded-xl bg-cyan-950/90 border border-cyan-400 text-xs font-mono-code text-cyan-200 flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{advisorySentToast}</span>
          </div>
        )}

        {/* Top 4 KPI Cards - Clicking Filters Immediately with Active Glow */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Card 1: Optimal Skies */}
          <div 
            onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'Optimal' ? 'ALL' : 'Optimal')}
            className={`p-2.5 rounded-xl border text-center cursor-pointer transition relative ${
              activeCategoryFilter === 'Optimal' 
                ? 'bg-emerald-950/70 border-emerald-400 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-950/50' 
                : 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900'
            }`}
          >
            <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center justify-center gap-1">
              <span>Optimal Skies</span>
              {activeCategoryFilter === 'Optimal' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
            </div>
            <div className="text-xl font-tech font-bold text-emerald-400 mt-0.5">84%</div>
            <div className="text-[9.5px] font-mono-code text-emerald-300">{optimalCount} Sectors Clear</div>
          </div>

          {/* Card 2: Monitored / Fog */}
          <div 
            onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'Monitored' ? 'ALL' : 'Monitored')}
            className={`p-2.5 rounded-xl border text-center cursor-pointer transition relative ${
              activeCategoryFilter === 'Monitored' 
                ? 'bg-cyan-950/70 border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-950/50' 
                : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900'
            }`}
          >
            <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center justify-center gap-1">
              <span>Monitored / Fog</span>
              {activeCategoryFilter === 'Monitored' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
            </div>
            <div className="text-xl font-tech font-bold text-cyan-400 mt-0.5">12%</div>
            <div className="text-[9.5px] font-mono-code text-cyan-300">{monitoredCount} Thermal Priority</div>
          </div>

          {/* Card 3: Precipitation */}
          <div 
            onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'Precipitation' ? 'ALL' : 'Precipitation')}
            className={`p-2.5 rounded-xl border text-center cursor-pointer transition relative ${
              activeCategoryFilter === 'Precipitation' 
                ? 'bg-amber-950/70 border-amber-400 ring-2 ring-amber-500/40 shadow-lg shadow-amber-950/50' 
                : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40 hover:bg-slate-900'
            }`}
          >
            <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center justify-center gap-1">
              <span>Precipitation</span>
              {activeCategoryFilter === 'Precipitation' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
            </div>
            <div className="text-xl font-tech font-bold text-amber-400 mt-0.5">3%</div>
            <div className="text-[9.5px] font-mono-code text-amber-300">{precipitationCount} Rain Advisory</div>
          </div>

          {/* Card 4: Extreme / Cryo */}
          <div 
            onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'Extreme' ? 'ALL' : 'Extreme')}
            className={`p-2.5 rounded-xl border text-center cursor-pointer transition relative ${
              activeCategoryFilter === 'Extreme' 
                ? 'bg-red-950/70 border-red-400 ring-2 ring-red-500/40 shadow-lg shadow-red-950/50' 
                : 'bg-slate-900/80 border-slate-800 hover:border-red-500/40 hover:bg-slate-900'
            }`}
          >
            <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center justify-center gap-1">
              <span>Extreme / Cryo</span>
              {activeCategoryFilter === 'Extreme' && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />}
            </div>
            <div className="text-xl font-tech font-bold text-red-400 mt-0.5">1%</div>
            <div className="text-[9.5px] font-mono-code text-red-300">{extremeCount} Blizzard Hold</div>
          </div>
        </div>

        {/* Filter Pills / Tabs for High-Clarity Filtering */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono-code text-slate-400 mr-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>FILTER SECTOR STATUS:</span>
            </span>
            
            <button
              type="button"
              onClick={() => setActiveCategoryFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                activeCategoryFilter === 'ALL'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              ALL SECTORS ({TACTICAL_SECTORS_DATA.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveCategoryFilter('Optimal')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                activeCategoryFilter === 'Optimal'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 text-emerald-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              OPTIMAL ({optimalCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveCategoryFilter('Monitored')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                activeCategoryFilter === 'Monitored'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-cyan-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              MONITORED ({monitoredCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveCategoryFilter('Precipitation')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                activeCategoryFilter === 'Precipitation'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-amber-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              PRECIPITATION ({precipitationCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveCategoryFilter('Extreme')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                activeCategoryFilter === 'Extreme'
                  ? 'bg-red-500 text-slate-950 shadow-md shadow-red-500/20'
                  : 'bg-slate-900 text-red-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              EXTREME ({extremeCount})
            </button>
          </div>

          {/* Search Box */}
          <div className="w-full sm:w-56">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sector, border..."
              className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-lg px-2.5 py-1 text-xs font-mono-code text-slate-200 placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>

        {/* List of Tactical Sector Cards Formatted EXACTLY like the Uploaded Screenshot */}
        <div className="space-y-2.5">
          {filteredSectors.map((sec) => {
            const isExpanded = expandedSectorId === sec.id;
            const isCurrentActive = sec.id === 'sec-live';

            return (
              <div
                key={sec.id}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isExpanded
                    ? 'bg-slate-900/90 border-cyan-500/60 shadow-lg shadow-cyan-950/40'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Header Row (Clickable to Expand / Collapse) */}
                <div 
                  onClick={() => toggleSectorExpansion(sec.id)}
                  className="p-3 sm:p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-900/50 transition select-none"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Status Icon Indicator */}
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                      {getWeatherIcon(sec.weatherCode)}
                    </div>

                    {/* Title & Metadata */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs sm:text-sm font-tech font-bold text-white tracking-wide truncate">
                          {sec.name}
                        </span>
                        <span className={`text-[9.5px] font-mono-code font-bold px-2 py-0.5 rounded-full border ${sec.badgeStyle}`}>
                          {sec.statusText}
                        </span>
                        {isCurrentActive && (
                          <span className="text-[9px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-400 text-cyan-300 flex items-center gap-1">
                            <Radio className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
                            ACTIVE SECTOR
                          </span>
                        )}
                      </div>
                      <div className="text-[10.5px] font-mono-code text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="text-cyan-400">{sec.code}</span>
                        <span>•</span>
                        <span className="text-slate-300">{sec.region}</span>
                        <span>•</span>
                        <span className="text-amber-300 font-bold">{sec.temp}°C</span>
                      </div>
                    </div>
                  </div>

                  {/* Flight Envelope Readiness Bar & Toggle Chevron */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden md:flex flex-col items-end text-right">
                      <div className="text-[10px] font-mono-code text-slate-400">Flight Envelope Readiness</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="w-20 sm:w-24 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              sec.flightReadiness > 80 ? 'bg-emerald-400' : sec.flightReadiness > 50 ? 'bg-cyan-400' : 'bg-red-400'
                            }`} 
                            style={{ width: `${sec.flightReadiness}%` }}
                          />
                        </div>
                        <span className="text-xs font-tech font-bold text-white">{sec.flightReadiness}%</span>
                      </div>
                    </div>

                    <div className="p-1 rounded-lg bg-slate-800/80 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Detail Panel (Matching Uploaded Screenshot Exactly) */}
                {isExpanded && (
                  <div className="px-3.5 pb-4 pt-2 border-t border-slate-800/80 bg-slate-950/40 space-y-3.5 text-xs font-mono-code animate-fade-in">
                    
                    {/* 4 Core Meteorological Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                          <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Temperature</span>
                        </div>
                        <div className="text-lg font-tech font-bold text-white mt-0.5">
                          {sec.temp}°C
                        </div>
                        <div className="text-[9.5px] text-cyan-300">Feels like {sec.feelsLike}°C</div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                          <Wind className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Wind Velocity</span>
                        </div>
                        <div className="text-lg font-tech font-bold text-white mt-0.5">
                          {sec.windSpeed} km/h
                        </div>
                        <div className="text-[9.5px] text-slate-400">Azimuth: {sec.windDirection}°</div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                          <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Humidity & Precip</span>
                        </div>
                        <div className="text-lg font-tech font-bold text-white mt-0.5">
                          {sec.humidity}%
                        </div>
                        <div className="text-[9.5px] text-slate-400">Precip: {sec.precipitation} mm</div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                          <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Pressure & Optics</span>
                        </div>
                        <div className="text-lg font-tech font-bold text-white mt-0.5">
                          {sec.pressure} hPa
                        </div>
                        <div className="text-[9.5px] text-emerald-300">Vis: {sec.visibility} km</div>
                      </div>
                    </div>

                    {/* Tactical Operational Impact Matrix */}
                    <div className="p-3 rounded-xl bg-[#02132d] border border-cyan-500/40 space-y-2">
                      <div className="text-xs font-tech font-bold text-cyan-300 uppercase flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Operational Impact Assessment & Drone Envelope</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 rounded bg-slate-900/70 border border-slate-800">
                          <span className="text-slate-400">UAV Flight Envelope: </span>
                          <strong className={sec.uavStatus === 'CLEAR' ? 'text-emerald-400' : sec.uavStatus === 'ADVISORY' ? 'text-amber-400' : 'text-red-400'}>
                            {sec.uavEnvelope}
                          </strong>
                        </div>
                        <div className="p-2 rounded bg-slate-900/70 border border-slate-800">
                          <span className="text-slate-400">Optoelectronics / FLIR: </span>
                          <strong className="text-cyan-300">{sec.opticsStatus}</strong>
                        </div>
                        <div className="p-2 rounded bg-slate-900/70 border border-slate-800">
                          <span className="text-slate-400">Artillery Ballistics: </span>
                          <strong className="text-slate-200">{sec.ballisticsCorrection}</strong>
                        </div>
                        <div className="p-2 rounded bg-slate-900/70 border border-slate-800">
                          <span className="text-slate-400">Soil Trafficability: </span>
                          <strong className="text-emerald-300">{sec.groundTrafficability}</strong>
                        </div>
                      </div>
                    </div>

                    {/* 24-Hour Micro-Forecast Phases Checklist */}
                    <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                      <div className="text-[11px] font-tech font-bold text-slate-300 uppercase flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Tactical Sensor & Horizon Trajectory</span>
                      </div>

                      <div className="space-y-1.5">
                        {sec.phases.map((ph, idx) => (
                          <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-950/60 border border-slate-800/80 text-[10.5px]">
                            <div className="flex items-center gap-2">
                              {ph.completed ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              ) : (
                                <div className="w-3.5 h-3.5 rounded-full border border-slate-600 flex items-center justify-center shrink-0">
                                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                </div>
                              )}
                              <span className={ph.completed ? 'text-slate-300' : 'text-cyan-300 font-bold'}>{ph.name}</span>
                            </div>
                            <span className="font-mono-code text-slate-400 text-[10px]">{ph.time} IST</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-800">
                      <div className="text-[10px] font-mono-code text-slate-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Telemetry verified via GSAT-7A Military Transponder</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSendAdvisory(sec.name)}
                          className="px-2.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-tech font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                        >
                          <Send className="w-3 h-3" />
                          <span>Dispatch Tactical Advisory</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
