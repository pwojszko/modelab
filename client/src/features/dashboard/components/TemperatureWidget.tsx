import { useState, useEffect } from "react";

export function TemperatureWidget() {
  const [temperature, setTemperature] = useState(52.5); // Start at middle (35 + 70) / 2
  const minTemp = 0;
  const maxTemp = 100;
  const minDisplayTemp = 35;
  const maxDisplayTemp = 70;
  
  // Gauge configuration
  const size = 160;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = 60;
  const startAngle = -135; // Start angle in degrees (semicircle from -135 to 135)
  const endAngle = 135;
  const angleRange = endAngle - startAngle;
  
  // Calculate needle angle based on temperature
  const normalizedTemp = Math.max(minTemp, Math.min(maxTemp, temperature));
  const needleAngle = startAngle + (normalizedTemp / maxTemp) * angleRange;
  
  // Convert angle to radians
  const angleToRad = (angle: number) => ((angle - 90) * Math.PI) / 180;
  
  // Calculate needle end point
  const needleLength = radius - 10;
  const needleEndX = centerX + needleLength * Math.cos(angleToRad(needleAngle));
  const needleEndY = centerY + needleLength * Math.sin(angleToRad(needleAngle));
  
  // Determine color based on temperature
  const getGaugeColor = (temp: number) => {
    if (temp < 30) return "#60a5fa"; // blue-400
    if (temp < 50) return "#22d3ee"; // cyan-400
    if (temp < 70) return "#fbbf24"; // yellow-400
    return "#f87171"; // red-400
  };
  
  const getStatusText = (temp: number) => {
    if (temp < 30) return "Cool";
    if (temp < 50) return "Normal";
    if (temp < 70) return "Warm";
    return "Hot";
  };
  
  const gaugeColor = getGaugeColor(temperature);
  
  // Animate temperature with chaotic variations between 35 and 70 degrees
  useEffect(() => {
    let animationFrame: number;
    let startTime = Date.now();
    let lastRandomChange = 0;
    let randomDirection = Math.random() > 0.5 ? 1 : -1;
    let currentTarget = 52.5;
    let currentTemp = 52.5; // Track current temperature for smoothing
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const time = elapsed / 1000; // Convert to seconds
      
      // Slower sine waves with different frequencies for chaotic behavior
      const wave1 = Math.sin(time * 0.08) * 10; // Very slow wave
      const wave2 = Math.sin(time * 0.15 + Math.PI / 3) * 6; // Slow wave
      const wave3 = Math.sin(time * 0.25 + Math.PI / 6) * 3; // Medium wave
      const wave4 = Math.sin(time * 0.4 + Math.PI / 4) * 1.5; // Medium-fast wave
      
      // Reduced random noise component
      const noise = (Math.random() - 0.5) * 1.5;
      
      // Random direction changes every 8-15 seconds (slower)
      if (elapsed - lastRandomChange > 8000 + Math.random() * 7000) {
        randomDirection = Math.random() > 0.5 ? 1 : -1;
        currentTarget = minDisplayTemp + Math.random() * (maxDisplayTemp - minDisplayTemp);
        lastRandomChange = elapsed;
      }
      
      // Combine all components
      const chaoticValue = wave1 + wave2 + wave3 + wave4 + noise;
      
      // Base temperature with chaotic variations
      const baseTemp = 52.5; // Middle of range
      let targetTemp = baseTemp + chaoticValue + (currentTarget - baseTemp) * 0.2;
      
      // Add occasional random spikes (less frequent)
      if (Math.random() > 0.98) {
        targetTemp += (Math.random() - 0.5) * 6;
      }
      
      // Clamp to range
      targetTemp = Math.max(minDisplayTemp, Math.min(maxDisplayTemp, targetTemp));
      
      // Smooth interpolation to target (slower transitions)
      currentTemp += (targetTemp - currentTemp) * 0.02; // Slower smoothing factor
      
      setTemperature(currentTemp);
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);
  
  // Generate tick marks
  const ticks = [];
  const tickCount = 5;
  for (let i = 0; i <= tickCount; i++) {
    const tickValue = (i / tickCount) * maxTemp;
    const tickAngle = startAngle + (tickValue / maxTemp) * angleRange;
    const tickRad = angleToRad(tickAngle);
    const tickStartX = centerX + (radius - 15) * Math.cos(tickRad);
    const tickStartY = centerY + (radius - 15) * Math.sin(tickRad);
    const tickEndX = centerX + (radius - 5) * Math.cos(tickRad);
    const tickEndY = centerY + (radius - 5) * Math.sin(tickRad);
    
    ticks.push({
      startX: tickStartX,
      startY: tickStartY,
      endX: tickEndX,
      endY: tickEndY,
      angle: tickAngle,
      value: tickValue,
    });
  }
  
  // Generate arc path for gauge background
  const createArcPath = (start: number, end: number, r: number) => {
    const startRad = angleToRad(start);
    const endRad = angleToRad(end);
    const startX = centerX + r * Math.cos(startRad);
    const startY = centerY + r * Math.sin(startRad);
    const endX = centerX + r * Math.cos(endRad);
    const endY = centerY + r * Math.sin(endRad);
    const largeArc = end - start > 180 ? 1 : 0;
    return `M ${startX} ${startY} A ${r} ${r} 0 ${largeArc} 1 ${endX} ${endY}`;
  };
  
  return (
    <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-2 border-slate-700/50 rounded-xl shadow-2xl p-4 min-w-[180px] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-2xl" />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Temperature
          </span>
        </div>

        {/* Gauge */}
        <div className="flex items-center justify-center mb-3">
          <svg width={size} height={size} className="drop-shadow-lg">
            <defs>
              {/* Gradient for gauge arc */}
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="33%" stopColor="#22d3ee" />
                <stop offset="66%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f87171" />
              </linearGradient>
              
              {/* Shadow filter for needle */}
              <filter id="needleShadow">
                <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="rgba(0,0,0,0.5)" />
              </filter>
            </defs>
            
            {/* Background arc */}
            <path
              d={createArcPath(startAngle, endAngle, radius)}
              fill="none"
              stroke="#1e293b"
              strokeWidth="12"
              strokeLinecap="round"
            />
            
            {/* Colored gauge arc */}
            <path
              d={createArcPath(startAngle, endAngle, radius)}
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.8"
            />
            
            {/* Tick marks */}
            {ticks.map((tick, index) => (
              <g key={index}>
                <line
                  x1={tick.startX}
                  y1={tick.startY}
                  x2={tick.endX}
                  y2={tick.endY}
                  stroke="#64748b"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Tick labels */}
                {index % 2 === 0 && (
                  <text
                    x={centerX + (radius + 12) * Math.cos(angleToRad(tick.angle))}
                    y={centerY + (radius + 12) * Math.sin(angleToRad(tick.angle))}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[10px] fill-slate-400 font-semibold"
                  >
                    {Math.round(tick.value)}
                  </text>
                )}
              </g>
            ))}
            
            {/* Needle */}
            <g filter="url(#needleShadow)">
              <line
                x1={centerX}
                y1={centerY}
                x2={needleEndX}
                y2={needleEndY}
                stroke={gaugeColor}
                strokeWidth="3"
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
              {/* Needle center dot */}
              <circle
                cx={centerX}
                cy={centerY}
                r="6"
                fill={gaugeColor}
                className="drop-shadow-lg"
              />
              <circle
                cx={centerX}
                cy={centerY}
                r="3"
                fill="#1e293b"
              />
            </g>
          </svg>
        </div>

        {/* Temperature Display */}
        <div className="text-center">
          <div className="flex items-baseline justify-center gap-1 mb-1">
            <span 
              className="text-3xl font-bold drop-shadow-lg transition-colors duration-500"
              style={{ color: gaugeColor }}
            >
              {Math.round(temperature)}
            </span>
            <span 
              className="text-lg font-semibold opacity-80 transition-colors duration-500"
              style={{ color: gaugeColor }}
            >
              °C
            </span>
          </div>
          <span 
            className="text-xs font-medium transition-colors duration-500"
            style={{ color: gaugeColor }}
          >
            {getStatusText(temperature)}
          </span>
        </div>
      </div>
    </div>
  );
}

