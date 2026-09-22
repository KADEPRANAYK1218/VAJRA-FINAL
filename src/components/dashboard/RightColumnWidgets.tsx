import React, { useState } from 'react';
import { 
  AlertTriangle, CloudRain, ArrowRight, CheckCircle2, X
} from 'lucide-react';
import { RecentIncidentsWeatherFormatModal } from './RecentIncidentsModal';

// 1. RECENT INCIDENTS WIDGET
export const RecentIncidentsWidget: React.FC<{ onSelectIncident?: (incident: any) => void }> = ({ onSelectIncident }) => {
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [showAllIncidents, setShowAllIncidents] = useState(false);

  const incidents = [
    {
      id: 'inc-1',
      time: '17:32',
      title: 'Drone detected - Sector 7 (J&K)',
      severity: 'HIGH',
      badgeClass: 'bg-red-950/80 border-red-500/80 text-red-300',
      icon: AlertTriangle,
      iconClass: 'text-red-400 fill-red-500/30'
    },
    {
      id: 'inc-2',
      time: '16:48',
      title: 'Unusual movement near LOC',
      severity: 'MEDIUM',
      badgeClass: 'bg-amber-950/80 border-amber-500/80 text-amber-300',
      icon: AlertTriangle,
      iconClass: 'text-amber-400 fill-amber-500/30'
    },
    {
      id: 'inc-3',
      time: '15:22',
      title: 'Fire in Sector 4 – Tank unit',
      severity: 'MEDIUM',
      badgeClass: 'bg-amber-950/80 border-amber-500/80 text-amber-300',
      icon: AlertTriangle,
      iconClass: 'text-amber-400 fill-amber-500/30'
    },
    {
      id: 'inc-4',
      time: '14:11',
      title: 'Weather alert – Heavy Rain (J&K)',
      severity: 'INFO',
      badgeClass: 'bg-cyan-950/80 border-cyan-500/80 text-cyan-300',
      icon: CloudRain,
      iconClass: 'text-cyan-400'
    },
    {
      id: 'inc-5',
      time: '12:03',
      title: 'Border intrusion attempt (Cancelled)',
      severity: 'RESOLVED',
      badgeClass: 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300',
      icon: CheckCircle2,
      iconClass: 'text-emerald-400'
    }
  ];

  const handleOpenIncidentRosterModal = (incidentId?: string) => {
    setSelectedIncidentId(incidentId || 'inc-1');
    setShowAllIncidents(true);
  };

  return (
    <div className="rounded-2xl bg-slate-950/80 border border-cyan-500/25 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl" id="recent-incidents-widget">
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div 
          onClick={() => handleOpenIncidentRosterModal('inc-1')}
          className="flex items-center gap-2 cursor-pointer group select-none"
          title="Click to view full tactical incident roster and threat log"
        >
          <AlertTriangle className="w-4 h-4 text-red-400 group-hover:scale-110 transition" />
          <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase group-hover:text-cyan-300 transition">
            RECENT INCIDENTS
          </h3>
        </div>

        <button
          type="button"
          onClick={() => handleOpenIncidentRosterModal('inc-1')}
          className="text-xs font-mono-code text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Incident Rows */}
      <div className="space-y-1.5">
        {incidents.map(inc => {
          const Icon = inc.icon;
          return (
            <div
              key={inc.id}
              onClick={() => {
                handleOpenIncidentRosterModal(inc.id);
                onSelectIncident?.(inc);
              }}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-slate-900/40 hover:bg-cyan-950/50 border border-transparent hover:border-cyan-500/30 transition cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[11px] font-mono-code text-slate-400 font-semibold shrink-0">
                  {inc.time}
                </span>
                <Icon className={`w-3.5 h-3.5 shrink-0 ${inc.iconClass}`} />
                <span className="text-[11px] font-tech text-slate-200 truncate group-hover:text-white">
                  {inc.title}
                </span>
              </div>

              {/* Status Badge */}
              <span className={`shrink-0 ml-2 px-2 py-0.5 rounded-full border text-[9px] font-mono-code font-bold ${inc.badgeClass}`}>
                {inc.severity}
              </span>
            </div>
          );
        })}
      </div>

      {/* Incident Intelligence Modal in Dedicated Tactical Roster Format */}
      <RecentIncidentsWeatherFormatModal
        isOpen={showAllIncidents}
        initialSelectedId={selectedIncidentId}
        onClose={() => {
          setShowAllIncidents(false);
          setSelectedIncidentId(null);
        }}
        onSelectIncident={(inc) => {
          onSelectIncident?.(inc);
        }}
      />
    </div>
  );
};

// 2. WEATHER & INTELLIGENCE WIDGET (Modular, Live Location & Accurate Real-Time Feed)
export { WeatherIntelligenceWidget } from './WeatherIntelligenceWidget';

// 3. MISSION STATUS WIDGET (4 Circular Progress Rings & Live Command Dossier Modal)
export { MissionStatusWidget, MissionStatusWidget as MissionStatusGauges } from './MissionStatusWidget';

// 4. SOLDIER HEALTH WIDGET (4 Circular Bio-Telemetry Gauges + Operational ECG Waveform & Personnel Roster)
export { 
  SoldierHealthGauges, 
  SystemHealthGauges,
  INDIVIDUAL_SOLDIERS_ROSTER
} from './SoldierHealthWidget';
export type { SoldierBiometricRecord } from './SoldierHealthWidget';
