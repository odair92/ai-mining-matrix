
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
import GlassMorphism from './GlassMorphism';

interface MiningVisualizerProps {
  hashRate: number;
  className?: string;
  variant?: 'default' | 'detailed';
}

const MiningVisualizer = ({
  hashRate,
  className,
  variant = 'default',
}: MiningVisualizerProps) => {
  const [data, setData] = useState<{ time: string; hashrate: number; reward: number }[]>([]);
  
  useEffect(() => {
    // Generate sample data for the past 24 hours
    const generateData = () => {
      const newData = [];
      const now = new Date();
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now);
        time.setHours(now.getHours() - i);
        
        // Add some randomness to the hashrate to simulate variations
        const randomFactor = Math.random() * 0.2 + 0.9; // Between 0.9 and 1.1
        const currentHashrate = hashRate * randomFactor;
        
        // Calculate a simulated reward based on hashrate
        const reward = currentHashrate * 0.000012; 
        
        newData.push({
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hashrate: Math.round(currentHashrate * 100) / 100,
          reward: Math.round(reward * 10000) / 10000
        });
      }
      
      setData(newData);
    };
    
    generateData();
    
    // Update data periodically to simulate real-time updates
    if (variant === 'detailed') {
      const interval = setInterval(() => {
        // Shift all data points one position earlier
        const newData = [...data.slice(1)];
        
        // Add new data point
        const now = new Date();
        const randomFactor = Math.random() * 0.2 + 0.9;
        const currentHashrate = hashRate * randomFactor;
        const reward = currentHashrate * 0.000012;
        
        newData.push({
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hashrate: Math.round(currentHashrate * 100) / 100,
          reward: Math.round(reward * 10000) / 10000
        });
        
        setData(newData);
      }, 60000); // Update every minute
      
      return () => clearInterval(interval);
    }
  }, [hashRate, variant]);
  
  // Animations for the mining machine
  const pulseVariants = {
    pulse: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };
  
  const rippleVariants = {
    animate: {
      scale: [1, 2],
      opacity: [0.8, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 0.2
      }
    }
  };
  
  const lightVariants = {
    blink: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 0.5,
        repeat: Infinity
      }
    }
  };
  
  return (
    <div className={cn('grid gap-6', variant === 'detailed' ? 'grid-cols-1 lg:grid-cols-2' : '', className)}>
      {/* Mining Machine Visualization */}
      <GlassMorphism className="p-6 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full filter blur-xl"></div>
        <div className="absolute top-10 -left-10 w-32 h-32 bg-blue-400/10 rounded-full filter blur-xl"></div>
        
        <motion.div
          className="relative"
          variants={pulseVariants}
          animate="pulse"
        >
          {/* Mining Ripple Effect */}
          <motion.div
            className="absolute -inset-4 rounded-lg bg-primary/5 z-0"
            variants={rippleVariants}
            animate="animate"
          />
          
          {/* Mining Server Rack */}
          <div className="relative z-10 w-48 h-64 bg-secondary rounded-lg border border-border flex flex-col overflow-hidden shadow-lg">
            {/* Server Lights */}
            <div className="absolute top-3 right-3 flex space-x-1">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                variants={lightVariants}
                animate="blink"
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-blue-400"
                variants={lightVariants}
                animate="blink"
                transition={{ delay: 0.3 }}
              />
            </div>
            
            {/* Server Units */}
            <div className="flex-1 flex flex-col justify-center space-y-2 p-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 bg-background/80 rounded-md border border-border flex items-center px-2"
                >
                  <div className="w-1/4 h-3 bg-muted rounded"></div>
                  <motion.div
                    className="ml-2 w-2 h-2 rounded-full bg-primary"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                </div>
              ))}
            </div>
            
            {/* Bottom Vent */}
            <div className="h-6 bg-muted border-t border-border flex items-center justify-center space-x-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-[2px] h-2 bg-border rounded-full"></div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Hashrate Display */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">Current Hashrate</p>
          <div className="text-2xl font-bold">
            {hashRate} <span className="text-base font-normal">GH/s</span>
          </div>
          
          <div className="mt-3 flex items-center justify-center space-x-2">
            <div className="flex h-2 w-2">
              <motion.span
                className="absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Mining active</span>
          </div>
        </div>
      </GlassMorphism>
      
      {/* Detailed Chart (only shown in detailed variant) */}
      {variant === 'detailed' && (
        <GlassMorphism className="p-6">
          <h3 className="text-lg font-medium mb-4">Mining Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  yAxisId="left" 
                  orientation="left" 
                  tickFormatter={(value) => `${value}`}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'GH/s', angle: -90, position: 'insideLeft', offset: -5, fontSize: 12, fill: 'rgba(0,0,0,0.6)' }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  tickFormatter={(value) => `${value}`}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'BTC', angle: 90, position: 'insideRight', offset: 10, fontSize: 12, fill: 'rgba(0,0,0,0.6)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }} 
                  labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                  formatter={(value, name) => {
                    if (name === 'hashrate') return [`${value} GH/s`, 'Hashrate'];
                    if (name === 'reward') return [`${value} BTC`, 'Reward'];
                    return [value, name];
                  }}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="hashrate" 
                  stroke="hsl(var(--primary))" 
                  activeDot={{ r: 6 }} 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="reward" 
                  stroke="#2563eb" 
                  activeDot={{ r: 6 }} 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Today's Earnings</p>
              <p className="text-xl font-bold">
                {(data.reduce((sum, point) => sum + point.reward, 0) / 24).toFixed(6)} BTC
              </p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Avg Hashrate</p>
              <p className="text-xl font-bold">
                {(data.reduce((sum, point) => sum + point.hashrate, 0) / data.length).toFixed(2)} GH/s
              </p>
            </div>
          </div>
        </GlassMorphism>
      )}
    </div>
  );
};

export default MiningVisualizer;
