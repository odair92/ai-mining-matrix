
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Cpu, 
  BarChart2, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Clock, 
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Stat from '@/components/ui/Stat';
import GlassMorphism from '@/components/ui/GlassMorphism';
import AnimatedButton from '@/components/ui/AnimatedButton';
import MiningVisualizer from '@/components/ui/MiningVisualizer';

// Sample data for charts
const generateDailyData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    
    // Random mining value between 0.0005 and 0.0015 BTC
    const mining = 0.0005 + Math.random() * 0.001;
    
    // Random referral value between 0 and 0.0005 BTC
    const referral = Math.random() * 0.0005;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mining: parseFloat(mining.toFixed(6)),
      referral: parseFloat(referral.toFixed(6)),
      total: parseFloat((mining + referral).toFixed(6))
    });
  }
  
  return data;
};

const generateHourlyData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 24; i >= 0; i--) {
    const date = new Date();
    date.setHours(now.getHours() - i);
    
    // Random hashrate value between 80 and 120 GH/s
    const hashrate = 80 + Math.random() * 40;
    
    data.push({
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      hashrate: Math.round(hashrate)
    });
  }
  
  return data;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [dailyData, setDailyData] = useState(generateDailyData());
  const [hourlyData, setHourlyData] = useState(generateHourlyData());
  
  // Simulated user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    miningPower: 85.5,
    balance: 0.05942,
    totalEarned: 0.12451,
    activeReferrals: 3,
    referralEarnings: 0.00842,
    miningStatus: "active",
    lastPayout: "2023-06-15T10:30:00",
    nextPayout: "2023-06-16T10:30:00",
  });

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Format currency
  const formatBTC = (value: number) => {
    return `${value.toFixed(6)} BTC`;
  };
  
  // Format hashrate
  const formatHashrate = (value: number) => {
    return `${value.toFixed(1)} GH/s`;
  };

  // Calculate time remaining until next payout
  const getTimeRemaining = () => {
    const now = new Date();
    const nextPayout = new Date(userData.nextPayout);
    
    if (nextPayout <= now) {
      return "Processing...";
    }
    
    const diff = nextPayout.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-1 bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-2">
              Dashboard
            </motion.h1>
            <motion.p variants={itemVariants} className="text-muted-foreground">
              Welcome back, {userData.name}. Here's your mining overview.
            </motion.p>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <motion.div variants={itemVariants}>
              <Stat
                title="Mining Power"
                value={userData.miningPower}
                icon={<Cpu className="h-5 w-5 text-primary" />}
                change="3.2"
                isPositive={true}
                isLoading={isLoading}
                formatter={formatHashrate}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Stat
                title="Available Balance"
                value={userData.balance}
                icon={<DollarSign className="h-5 w-5 text-primary" />}
                isLoading={isLoading}
                formatter={formatBTC}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Stat
                title="Total Earned"
                value={userData.totalEarned}
                icon={<TrendingUp className="h-5 w-5 text-primary" />}
                change="8.5"
                isPositive={true}
                isLoading={isLoading}
                formatter={formatBTC}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Stat
                title="Active Referrals"
                value={userData.activeReferrals}
                icon={<Users className="h-5 w-5 text-primary" />}
                isLoading={isLoading}
              />
            </motion.div>
          </motion.div>
          
          {/* Mining Status and Visualizer */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          >
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <GlassMorphism className="p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Mining Activity</h2>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex h-2 w-2 rounded-full ${userData.miningStatus === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    <span className="text-sm font-medium">
                      {userData.miningStatus === 'active' ? 'Active' : 'Maintenance'}
                    </span>
                  </div>
                </div>
                
                <div className="mb-6 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={hourlyData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorHashrate" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                      <XAxis 
                        dataKey="time" 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        domain={['dataMin - 10', 'dataMax + 10']}
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value} GH/s`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          border: '1px solid rgba(0, 0, 0, 0.05)',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        }}
                        formatter={(value: number) => [`${value} GH/s`, 'Hashrate']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="hashrate" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        fill="url(#colorHashrate)" 
                        activeDot={{ r: 6 }} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Next Payout</p>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-primary" />
                      <p className="font-medium">{getTimeRemaining()}</p>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Daily Estimate</p>
                    <p className="font-medium">
                      {formatBTC(userData.miningPower * 0.000012)}
                    </p>
                  </div>
                </div>
              </GlassMorphism>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <GlassMorphism className="p-6 h-full flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Your Mining Hardware</h2>
                
                <div className="flex-1 flex items-center justify-center">
                  <MiningVisualizer hashRate={userData.miningPower} />
                </div>
                
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center"
                    onClick={() => navigate('/mining')}
                  >
                    <Cpu className="mr-2 h-4 w-4" />
                    Manage Mining
                  </Button>
                </div>
              </GlassMorphism>
            </motion.div>
          </motion.div>
          
          {/* Earnings & Analytics */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 mb-8"
          >
            <motion.div variants={itemVariants}>
              <GlassMorphism className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Earnings History</h2>
                  
                  <Tabs defaultValue="30days" className="w-[250px]">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="7days">7D</TabsTrigger>
                      <TabsTrigger value="30days">30D</TabsTrigger>
                      <TabsTrigger value="all">All</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={dailyData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorMining" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorReferral" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value.toFixed(5)}`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          border: '1px solid rgba(0, 0, 0, 0.05)',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        }}
                        formatter={(value: number) => [`${value.toFixed(6)} BTC`, '']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="mining" 
                        stackId="1"
                        name="Mining"
                        stroke="hsl(var(--primary))" 
                        fill="url(#colorMining)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="referral" 
                        stackId="1"
                        name="Referral"
                        stroke="#3b82f6" 
                        fill="url(#colorReferral)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Total Mining Earnings</p>
                    <p className="text-lg font-semibold">{formatBTC(userData.totalEarned - userData.referralEarnings)}</p>
                  </div>
                  
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Total Referral Earnings</p>
                    <p className="text-lg font-semibold">{formatBTC(userData.referralEarnings)}</p>
                  </div>
                  
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Total Combined Earnings</p>
                    <p className="text-lg font-semibold">{formatBTC(userData.totalEarned)}</p>
                  </div>
                </div>
              </GlassMorphism>
            </motion.div>
          </motion.div>
          
          {/* Quick Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div variants={itemVariants}>
              <GlassMorphism className="p-6 h-full" intensity="light">
                <div className="flex flex-col items-center text-center h-full justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <RefreshCw className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Reinvest Earnings</h3>
                    <p className="text-muted-foreground mb-6">
                      Compound your returns by reinvesting your mining earnings to increase your hashrate.
                    </p>
                  </div>
                  
                  <AnimatedButton rippleEffect>Reinvest Now</AnimatedButton>
                </div>
              </GlassMorphism>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <GlassMorphism className="p-6 h-full" intensity="light">
                <div className="flex flex-col items-center text-center h-full justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <ArrowUpRight className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Deposit Funds</h3>
                    <p className="text-muted-foreground mb-6">
                      Add more investment to your account to increase your mining power and earnings.
                    </p>
                  </div>
                  
                  <AnimatedButton rippleEffect>Deposit</AnimatedButton>
                </div>
              </GlassMorphism>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <GlassMorphism className="p-6 h-full" intensity="light">
                <div className="flex flex-col items-center text-center h-full justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <ArrowDownRight className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Withdraw Earnings</h3>
                    <p className="text-muted-foreground mb-6">
                      Transfer your available balance to your personal cryptocurrency wallet.
                    </p>
                  </div>
                  
                  <AnimatedButton rippleEffect>Withdraw</AnimatedButton>
                </div>
              </GlassMorphism>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
