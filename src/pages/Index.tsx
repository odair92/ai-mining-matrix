
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Cpu, BarChart2, Shield, Gift, RefreshCw } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import GlassMorphism from '@/components/ui/GlassMorphism';
import MiningVisualizer from '@/components/ui/MiningVisualizer';
import PlanCard from '@/components/ui/PlanCard';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const [currentHash, setCurrentHash] = useState(0);

  // Simulate hashrate growing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHash((prevHash) => {
        if (prevHash < 45) {
          return prevHash + 0.5;
        } else {
          clearInterval(interval);
          return prevHash;
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.7,
        ease: "easeOut"
      }
    })
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const investmentPlans = [
    {
      title: "Starter",
      price: "$250",
      description: "Perfect for beginners to test the mining waters",
      ghsRange: "15-25 GH/s",
      returnPerDay: "0.5-1.2%",
      contractDuration: "30 days",
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
      price: "$1,000",
      description: "Our most popular plan for serious investors",
      ghsRange: "60-100 GH/s",
      returnPerDay: "1.2-1.8%",
      contractDuration: "90 days",
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
      price: "$5,000",
      description: "Maximum performance for professional miners",
      ghsRange: "350-500 GH/s",
      returnPerDay: "1.5-2.5%",
      contractDuration: "180 days",
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-pattern"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
              custom={0}
            >
              <motion.div variants={fadeInUpVariants} custom={0.2}>
                <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full inline-block mb-4">
                  Revolutionizing Crypto Mining
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-display-sm md:text-display font-bold leading-tight"
                variants={fadeInUpVariants}
                custom={0.4}
              >
                AI-Powered <br />
                <span className="text-primary">Crypto Mining</span> <br />
                For Everyone
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground max-w-lg"
                variants={fadeInUpVariants}
                custom={0.6}
              >
                Leverage artificial intelligence to maximize your cryptocurrency mining returns. 
                No technical experience required.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                variants={fadeInUpVariants}
                custom={0.8}
              >
                <Link to="/auth?mode=register">
                  <AnimatedButton size="lg" gradientBorder rippleEffect>
                    Start Mining Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </Link>
                <Link to="/plans">
                  <Button size="lg" variant="outline">
                    View Investment Plans
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              <MiningVisualizer hashRate={currentHash} />
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          style={{ opacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section className="section">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Intelligent Mining, Incredible Returns
          </motion.h2>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Our AI-powered platform optimizes mining strategies in real-time, 
            maximizing your profits while minimizing risks.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Cpu className="h-10 w-10 text-primary" />,
              title: "AI-Optimized Mining",
              description: "Our advanced algorithms continuously analyze market conditions to maximize mining efficiency and returns."
            },
            {
              icon: <BarChart2 className="h-10 w-10 text-primary" />,
              title: "Real-Time Analytics",
              description: "Monitor your mining operations with detailed dashboards showing performance, earnings, and projections."
            },
            {
              icon: <Shield className="h-10 w-10 text-primary" />,
              title: "Secure & Transparent",
              description: "Your investments are protected with bank-grade security, with full transparency of all operations."
            },
            {
              icon: <Gift className="h-10 w-10 text-primary" />,
              title: "Referral Program",
              description: "Earn additional income by inviting friends to join our platform through our multi-tiered referral system."
            },
            {
              icon: <RefreshCw className="h-10 w-10 text-primary" />,
              title: "Automatic Reinvestment",
              description: "Compound your earnings with smart reinvestment options that grow your mining power over time."
            },
            {
              icon: <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>,
              title: "Flexible Payouts",
              description: "Choose when and how you receive your earnings with multiple payout options and cryptocurrencies."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-secondary/50 border border-border hover:shadow-xl transition-shadow"
            >
              <div className="mb-4 p-3 rounded-full bg-primary/10">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="section bg-secondary/30">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Start your AI-powered mining journey in just a few simple steps
          </motion.p>
        </div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0"></div>
          
          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {[
              {
                step: "01",
                title: "Create Account",
                description: "Sign up in minutes with just your email and basic information"
              },
              {
                step: "02",
                title: "Choose a Plan",
                description: "Select an investment plan that matches your goals and budget"
              },
              {
                step: "03",
                title: "Make Deposit",
                description: "Fund your account using any of our supported cryptocurrencies"
              },
              {
                step: "04",
                title: "Start Earning",
                description: "Watch your investment grow as our AI optimizes your mining operations"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className="relative"
              >
                <GlassMorphism 
                  className="p-6 h-full flex flex-col items-center text-center"
                  animateOnHover
                >
                  <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center mb-4">
                    <span className="text-sm font-medium">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </GlassMorphism>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-16">
          <Link to="/auth?mode=register">
            <AnimatedButton gradientBorder size="lg">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </AnimatedButton>
          </Link>
        </div>
      </section>
      
      {/* Investment Plans Section */}
      <section className="section">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Investment Plans
          </motion.h2>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Choose the plan that best fits your investment goals
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {investmentPlans.map((plan, index) => (
            <PlanCard
              key={index}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isMostPopular={plan.isMostPopular}
              ghsRange={plan.ghsRange}
              returnPerDay={plan.returnPerDay}
              contractDuration={plan.contractDuration}
              ctaText="Select Plan"
              onClick={() => {/* Handle plan selection */}}
            />
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-gradient-radial from-primary/10 to-background/0 border-y border-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Ready to start your AI mining journey?
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Join thousands of investors already using our platform to generate passive income through AI-optimized cryptocurrency mining.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link to="/auth?mode=register">
              <AnimatedButton size="lg" gradientBorder rippleEffect>
                Create Your Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </AnimatedButton>
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
