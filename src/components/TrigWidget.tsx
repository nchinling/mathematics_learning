/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';

export function TrigWidget() {
  const [angle, setAngle] = useState(30);
  const size = 300;
  const center = size / 2;
  const radius = 100;

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    const x = clientX - rect.left - center;
    const y = clientY - rect.top - center;
    
    let newAngle = Math.atan2(y, x) * (180 / Math.PI);
    if (newAngle < 0) newAngle += 360;
    setAngle(Math.round(newAngle));
  };

  const x = center + radius * Math.cos(angle * Math.PI / 180);
  const y = center + radius * Math.sin(angle * Math.PI / 180);

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-2xl border border-slate-200 my-8 shadow-sm">
      <div className="flex items-center justify-between w-full mb-6">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Unit Circle Interactive</h4>
        <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold border border-blue-100">Live Simulation</div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div 
          className="relative cursor-crosshair touch-none select-none"
          onMouseMove={(e) => e.buttons === 1 && handleMouseMove(e)}
          onMouseDown={handleMouseMove}
          onTouchMove={handleMouseMove}
        >
          <svg width={size} height={size} className="bg-slate-50 rounded-full shadow-inner border border-slate-100">
            {/* Axis */}
            <line x1={0} y1={center} x2={size} y2={center} stroke="#cbd5e1" strokeWidth="1" />
            <line x1={center} y1={0} x2={center} y2={size} stroke="#cbd5e1" strokeWidth="1" />
            
            {/* Circle */}
            <circle cx={center} cy={center} r={radius} fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 4" />
            
            {/* Angle sector */}
            <path 
              d={`M ${center} ${center} L ${center + radius} ${center} A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 1 ${x} ${y} Z`}
              fill="#2563eb"
              fillOpacity="0.05"
            />

            {/* Lines */}
            <line x1={center} y1={center} x2={x} y2={y} stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
            <line x1={x} y1={y} x2={x} y2={center} stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" /> {/* Opp */}
            <line x1={center} y1={center} x2={x} y2={center} stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" /> {/* Adj */}

            {/* Point */}
            <circle cx={x} cy={y} r={6} fill="#2563eb" className="shadow-md" />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full md:w-48">
          <div className="col-span-2 bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800">
             <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Theta (θ)</div>
             <div className="text-2xl font-bold font-mono">{angle}°</div>
          </div>
          <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl">
             <div className="text-rose-600 text-[10px] font-bold uppercase mb-1">Sine</div>
             <div className="text-xl font-bold text-rose-900 font-mono">{(Math.sin(angle * Math.PI / 180)).toFixed(3)}</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
             <div className="text-emerald-600 text-[10px] font-bold uppercase mb-1">Cosine</div>
             <div className="text-xl font-bold text-emerald-900 font-mono">{(Math.cos(angle * Math.PI / 180)).toFixed(3)}</div>
          </div>
        </div>
      </div>
      <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Interaction Instructions: Drag pointer to modify angle</p>
    </div>
  );
}
