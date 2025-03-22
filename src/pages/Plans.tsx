
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Shield, Clock, Zap, RefreshCw, ArrowRight } from 'lucide-react';
import GlassMorphism from '@/components/ui/GlassMorphism';
import PlanCard from '@/components/ui/PlanCard';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Plans = () => {
  const [activeDuration, setActiveDuration] = useState('monthly');
  
  // Investment plans data
  const investmentPlans = [
    {
      title: "Starter",
      price: activeDuration === 'monthly' ? "$250" : "$2,400",
      description: "Perfect for beginners to test the mining waters",
      ghsRange: "15-25 GH/s",
      returnPerDay: "0.5-1.2%",
      contractDuration: activeDuration === 'monthly' ? "30 days" : "1 year",
      features: [
        { text: "Basic mining algorithm", available: true },
        { text: "Real-time monitoring", available: true },
        { text: "Manual withdrawal", available: true },
        { text: "Email notifications", available: true },
        { text: "Priority support", available: false },
        { text: "Reinvestment options", available: false },
      ],
    },
    {
      title: "Advanced",
      price: activeDuration === 'monthly' ? "$1,000" : "$9,600",
      description: "Our most popular plan for serious investors",
      ghsRange: "60-100 GH/s",
      returnPerDay: "1.2-1.8%",
      contractDuration: activeDuration === 'monthly' ? "30 days" : "1 year",
      features: [
        { text: "Advanced mining algorithm", available: true },
        { text: "Real-time monitoring", available: true },
        { text: "Daily automatic withdrawals", available: true },
        { text: "Email & SMS notifications", available: true },
        { text: "Priority support", available: true },
        { text: "Reinvestment options", available: false },
      ],
      isMostPopular: true,
    },
    {
      title: "Professional",
      price: activeDuration === 'monthly' ? "$5,000" : "$48,000",
      description: "Maximum performance for professional miners",
      ghsRange: "350-500 GH/s",
      returnPerDay: "1.5-2.5%",
      contractDuration: activeDuration === 'monthly' ? "30 days" : "1 year",
      features: [
        { text: "Premium mining algorithm", available: true },
        { text: "Advanced analytics dashboard", available: true },
        { text: "Instant automatic withdrawals", available: true },
        { text: "All notification methods", available: true },
        { text: "24/7 priority support", available: true },
        { text: "Smart reinvestment options", available: true },
      ],
    },
  ];

  // Enterprise custom plan
  const enterprisePlan = {
    title: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for institutional investors",
    ghsRange: "1,000+ GH/s",
    returnPerDay: "Negotiable",
    contractDuration: "Flexible",
    features: [
      { text: "Customized mining infrastructure", available: true },
      { text: "Dedicated account manager", available: true },
      { text: "API integration", available: true },
      { text: "White-label options", available: true },
      { text: "Custom reporting", available: true },
      { text: "Hardware ownership options", available: true },
    ],
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
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <motion.h1 variants={itemVariants} className="text-4xl font-bold mb-4">
              Investment Plans
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground">
              Choose the perfect mining plan that aligns with your investment goals and strategy.
              All plans include our AI-optimized mining algorithms and real-time dashboard.
            </motion.p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center mb-10"
          >
            <motion.div variants={itemVariants}>
              <Tabs 
                defaultValue="monthly" 
                value={activeDuration}
                onValueChange={setActiveDuration}
                className="w-[400px]"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">
                    Yearly
                    <span className="ml-2 bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                      Save 20%
                    </span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>
          </motion.div>
          
          {/* Plans Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {investmentPlans.map((plan, index) => (
              <motion.div key={index} variants={itemVariants} custom={index}>
                <PlanCard
                  title={plan.title}
                  price={plan.price}
                  description={plan.description}
                  features={plan.features}
                  isMostPopular={plan.isMostPopular}
                  ghsRange={plan.ghsRange}
                  returnPerDay={plan.returnPerDay}
                  contractDuration={plan.contractDuration}
                  ctaText="Get Started"
                  onClick={() => {/* Handle plan selection */}}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Enterprise Plan */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <motion.div variants={itemVariants}>
              <GlassMorphism 
                className="p-8 bg-gradient-to-br from-background to-primary/5 border-primary/10"
                intensity="light"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
                      Enterprise Solution
                    </div>
                    <h2 className="text-2xl font-bold mb-3">{enterprisePlan.title} Mining Package</h2>
                    <p className="text-muted-foreground mb-6">
                      Customized mining solutions designed for institutional investors and large-scale operations.
                      Our enterprise packages offer unparalleled flexibility and performance.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Key Features</h3>
                        <ul className="space-y-2">
                          {enterprisePlan.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <div className="mr-3 h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3" />
                              </div>
                              <span>{feature.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Enterprise Benefits</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <Shield className="h-5 w-5 text-primary mr-3 shrink-0" />
                            <div>
                              <p className="font-medium">Enhanced Security</p>
                              <p className="text-sm text-muted-foreground">Dedicated infrastructure with advanced security protocols</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Clock className="h-5 w-5 text-primary mr-3 shrink-0" />
                            <div>
                              <p className="font-medium">Flexible Contract Terms</p>
                              <p className="text-sm text-muted-foreground">Customize contract duration and payment terms</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Zap className="h-5 w-5 text-primary mr-3 shrink-0" />
                            <div>
                              <p className="font-medium">Performance Optimization</p>
                              <p className="text-sm text-muted-foreground">Dedicated team constantly optimizing your mining operations</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <AnimatedButton gradientBorder>
                      Contact Sales Team
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </AnimatedButton>
                  </div>
                  
                  <div className="bg-secondary/50 rounded-xl p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-6 text-center">Enterprise Specifications</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Mining Power</span>
                        <span className="font-medium">{enterprisePlan.ghsRange}</span>
                      </div>
                      
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Daily ROI</span>
                        <span className="font-medium">{enterprisePlan.returnPerDay}</span>
                      </div>
                      
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Contract Duration</span>
                        <span className="font-medium">{enterprisePlan.contractDuration}</span>
                      </div>
                      
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Investment</span>
                        <span className="font-medium">{enterprisePlan.price}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-background/70 rounded-lg p-4">
                      <p className="text-sm text-center">
                        Contact our sales team for a personalized quote tailored to your specific requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </GlassMorphism>
            </motion.div>
          </motion.div>
          
          {/* Features & Benefits */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-2xl font-bold mb-8 text-center"
            >
              All Plans Include
            </motion.h2>
            
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-secondary/30 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">AI-Optimized Mining</h3>
                <p className="text-muted-foreground">
                  Our proprietary algorithms continuously adjust your mining strategy to maximize returns based on market conditions.
                </p>
              </div>
              
              <div className="bg-secondary/30 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Secure Operations</h3>
                <p className="text-muted-foreground">
                  Bank-grade security protects your investment and earnings with multi-factor authentication and encryption.
                </p>
              </div>
              
              <div className="bg-secondary/30 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Instant Dashboard</h3>
                <p className="text-muted-foreground">
                  Real-time statistics and analytics give you complete visibility into your mining operations and earnings.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Plans;
