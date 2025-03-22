
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, RefreshCw, Clock, ArrowUp, Zap, ChevronRight, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlassMorphism from '@/components/ui/GlassMorphism';
import AnimatedButton from '@/components/ui/AnimatedButton';
import MiningVisualizer from '@/components/ui/MiningVisualizer';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Mining = () => {
  const [hashPower, setHashPower] = useState(80);
  const [animatedHashPower, setAnimatedHashPower] = useState(0);
  const [purchaseAmount, setPurchaseAmount] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulated user mining data
  const [miningData, setMiningData] = useState({
    hashrate: 85.5,
    dailyEarnings: 0.00125,
    weeklyEarnings: 0.00875,
    monthlyEarnings: 0.0375,
    totalMined: 0.12451,
    efficiency: 92,
    nextMaintenance: "2023-06-25T10:30:00",
    miningPower: [
      { id: 1, name: "Basic Miner", hashrate: 25, status: "active", expiresAt: "2023-07-15" },
      { id: 2, name: "Advanced Miner", hashrate: 60, status: "active", expiresAt: "2023-08-10" },
    ],
    hashRateConversion: 0.02, // GH/s per $1
  });

  // Animate hashpower counter on load
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    const interval = setInterval(() => {
      setAnimatedHashPower(prev => {
        if (prev < miningData.hashrate) {
          return prev + (miningData.hashrate / 50);
        } else {
          clearInterval(interval);
          return miningData.hashrate;
        }
      });
    }, 30);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [miningData.hashrate]);

  // Calculate purchase details
  const calculatePurchase = (amount: number) => {
    const hashrate = amount * miningData.hashRateConversion;
    const dailyEarnings = hashrate * 0.00005;
    const monthlyEarnings = dailyEarnings * 30;
    
    return {
      hashrate: parseFloat(hashrate.toFixed(2)),
      dailyEarnings: parseFloat(dailyEarnings.toFixed(8)),
      monthlyEarnings: parseFloat(monthlyEarnings.toFixed(8)),
    };
  };

  const purchaseDetails = calculatePurchase(purchaseAmount);

  // Format BTC value
  const formatBTC = (value: number) => {
    return value.toFixed(6);
  };

  // Calculate time remaining until next maintenance
  const getTimeUntilMaintenance = () => {
    const now = new Date();
    const maintenance = new Date(miningData.nextMaintenance);
    
    if (maintenance <= now) {
      return "Due now";
    }
    
    const diff = maintenance.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h`;
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
              Mining Center
            </motion.h1>
            <motion.p variants={itemVariants} className="text-muted-foreground">
              Manage your mining equipment and purchase additional hashrate.
            </motion.p>
          </motion.div>
          
          {/* Mining Visualizer */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          >
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <GlassMorphism className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Mining Performance</h2>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refresh
                  </Button>
                </div>
                
                <MiningVisualizer hashRate={miningData.hashrate} variant="detailed" />
              </GlassMorphism>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <GlassMorphism className="p-6">
                <h2 className="text-xl font-semibold mb-4">Mining Stats</h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Total Hashrate</span>
                      <span className="font-medium">{miningData.hashrate.toFixed(1)} GH/s</span>
                    </div>
                    <Progress value={animatedHashPower / miningData.hashrate * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Efficiency</span>
                      <span className="font-medium">{miningData.efficiency}%</span>
                    </div>
                    <Progress value={miningData.efficiency} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">Daily Earnings</p>
                      <p className="font-medium">{formatBTC(miningData.dailyEarnings)} BTC</p>
                    </div>
                    
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">Monthly Earnings</p>
                      <p className="font-medium">{formatBTC(miningData.monthlyEarnings)} BTC</p>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm font-medium">Next Maintenance</p>
                        <p className="text-xs text-muted-foreground">{getTimeUntilMaintenance()}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </div>
                </div>
              </GlassMorphism>
            </motion.div>
          </motion.div>
          
          {/* Mining Equipment */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <motion.div variants={itemVariants}>
              <GlassMorphism className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Your Mining Equipment</h2>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Plus className="h-4 w-4 mr-1" />
                    Add New Equipment
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="pb-3 font-medium text-muted-foreground">Equipment</th>
                        <th className="pb-3 font-medium text-muted-foreground">Hashrate</th>
                        <th className="pb-3 font-medium text-muted-foreground">Status</th>
                        <th className="pb-3 font-medium text-muted-foreground">Expires</th>
                        <th className="pb-3 font-medium text-muted-foreground text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {miningData.miningPower.map((equipment) => (
                        <tr key={equipment.id} className="text-sm">
                          <td className="py-4 font-medium">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                <Cpu className="h-4 w-4 text-primary" />
                              </div>
                              {equipment.name}
                            </div>
                          </td>
                          <td className="py-4">{equipment.hashrate} GH/s</td>
                          <td className="py-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              equipment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {equipment.status === 'active' ? 'Active' : 'Maintenance'}
                            </span>
                          </td>
                          <td className="py-4">{new Date(equipment.expiresAt).toLocaleDateString()}</td>
                          <td className="py-4 text-right">
                            <Button variant="ghost" size="sm">
                              Manage
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassMorphism>
            </motion.div>
          </motion.div>
          
          {/* Purchase Hashrate */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <GlassMorphism className="p-6">
                <h2 className="text-xl font-semibold mb-6">Purchase Additional Hashrate</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">
                        Investment Amount: ${purchaseAmount}
                      </label>
                      <Slider
                        defaultValue={[100]}
                        max={5000}
                        min={50}
                        step={50}
                        onValueChange={(value) => setPurchaseAmount(value[0])}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>$50</span>
                        <span>$5,000</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 mb-6">
                      {[100, 250, 1000, 5000].map((amount) => (
                        <Button
                          key={amount}
                          variant={purchaseAmount === amount ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPurchaseAmount(amount)}
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Mining Power</span>
                        <span className="font-medium">{purchaseDetails.hashrate} GH/s</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Daily Earnings</span>
                        <span className="font-medium">{formatBTC(purchaseDetails.dailyEarnings)} BTC</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Monthly Earnings</span>
                        <span className="font-medium">{formatBTC(purchaseDetails.monthlyEarnings)} BTC</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Contract Duration</span>
                        <span className="font-medium">1 Year</span>
                      </div>
                    </div>
                    
                    <AnimatedButton className="w-full" gradientBorder>
                      <Zap className="mr-2 h-5 w-5" />
                      Purchase Mining Power
                    </AnimatedButton>
                  </div>
                  
                  <div className="bg-secondary/30 rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4">About Mining Power</h3>
                    
                    <div className="space-y-4 text-sm">
                      <p className="text-muted-foreground">
                        Mining power determines how much cryptocurrency you can mine. The more mining power (hashrate) you have, the more you can earn.
                      </p>
                      
                      <div className="flex items-start space-x-2">
                        <ArrowUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p>
                          <span className="font-medium">Higher hashrate means higher earnings</span>
                          <span className="block text-muted-foreground">
                            Our AI algorithms optimize your mining operations to ensure maximum efficiency and profitability.
                          </span>
                        </p>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <RefreshCw className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p>
                          <span className="font-medium">Continuous mining operations</span>
                          <span className="block text-muted-foreground">
                            Your mining equipment works 24/7 to generate cryptocurrency, providing you with a steady stream of passive income.
                          </span>
                        </p>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p>
                          <span className="font-medium">Long-term investment</span>
                          <span className="block text-muted-foreground">
                            Mining contracts last for 1 year, during which you'll earn daily rewards based on your mining power.
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-background/70 rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">Recommended Strategy</p>
                      <p className="text-sm text-muted-foreground">
                        Start with a small investment to test the platform, then reinvest your earnings to gradually increase your mining power over time.
                      </p>
                    </div>
                  </div>
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

export default Mining;
