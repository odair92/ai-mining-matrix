
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Wallet, BarChart3, Settings, UserCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GlassMorphism from '@/components/ui/GlassMorphism';
import Stat from '@/components/ui/Stat';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cryptocurrencies } from '@/lib/crypto';
import AdminLogin from '@/components/admin/AdminLogin';
import { useNavigate } from 'react-router-dom';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', balance: '$1,250.00', planType: 'Professional', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', balance: '$3,840.00', planType: 'Enterprise', status: 'Active' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', balance: '$750.00', planType: 'Basic', status: 'Inactive' },
  { id: 4, name: 'Emily Williams', email: 'emily@example.com', balance: '$2,100.00', planType: 'Professional', status: 'Active' },
  { id: 5, name: 'Michael Brown', email: 'michael@example.com', balance: '$1,925.00', planType: 'Enterprise', status: 'Suspended' },
];

const mockTransactions = [
  { id: 1, user: 'John Doe', type: 'Deposit', amount: '$500.00', currency: 'BTC', status: 'Completed', date: '2023-06-10' },
  { id: 2, user: 'Jane Smith', type: 'Withdrawal', amount: '$1,200.00', currency: 'ETH', status: 'Pending', date: '2023-06-11' },
  { id: 3, user: 'Robert Johnson', type: 'Mining Reward', amount: '$75.00', currency: 'USDT', status: 'Completed', date: '2023-06-11' },
  { id: 4, user: 'Emily Williams', type: 'Deposit', amount: '$2,000.00', currency: 'BTC', status: 'Completed', date: '2023-06-12' },
  { id: 5, user: 'Michael Brown', type: 'Withdrawal', amount: '$650.00', currency: 'TRX', status: 'Rejected', date: '2023-06-12' },
];

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Add missing handlers for user actions
  const handleUserAction = (userId: number, action: string) => {
    toast({
      title: `User Action: ${action}`,
      description: `User ID ${userId} has been ${action.toLowerCase()}.`,
    });
  };
  
  // Add missing handlers for transaction actions
  const handleApproveTransaction = (transactionId: number) => {
    toast({
      title: "Transaction Approved",
      description: `Transaction ID ${transactionId} has been approved.`,
    });
  };
  
  const handleRejectTransaction = (transactionId: number) => {
    toast({
      title: "Transaction Rejected",
      description: `Transaction ID ${transactionId} has been rejected.`,
    });
  };
  
  useEffect(() => {
    const checkAuthentication = () => {
      const adminAuth = localStorage.getItem('adminAuthenticated');
      const adminAuthTime = localStorage.getItem('adminAuthTime');
      
      if (adminAuth === 'true' && adminAuthTime) {
        const authTimeMs = parseInt(adminAuthTime, 10);
        const currentTime = Date.now();
        const oneDayMs = 24 * 60 * 60 * 1000;
        
        if (!isNaN(authTimeMs) && (currentTime - authTimeMs) < oneDayMs) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('adminAuthenticated');
          localStorage.removeItem('adminAuthTime');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    };
    
    checkAuthentication();
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminAuthenticated' || e.key === 'adminAuthTime') {
        checkAuthentication();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminAuthTime');
    setIsAuthenticated(false);
    toast({
      title: "Desconectado",
      description: "Você foi desconectado do painel de administração.",
    });
    navigate('/');
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/20">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-xl">Carregando...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/20">
        <Header />
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/20">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <motion.div 
          className="flex flex-col md:flex-row gap-6 mb-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="md:w-64 shrink-0">
            <GlassMorphism className="p-4">
              <div className="flex items-center space-x-3 p-2 mb-6">
                <div className="bg-primary/10 p-2 rounded-full">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-bold">Admin Panel</h2>
                  <p className="text-xs text-muted-foreground">Management Console</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <Button 
                  variant={activeTab === 'dashboard' ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('dashboard')}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button 
                  variant={activeTab === 'users' ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('users')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </Button>
                <Button 
                  variant={activeTab === 'transactions' ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('transactions')}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Transactions
                </Button>
                <Button 
                  variant={activeTab === 'settings' ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                
                <Button 
                  variant="destructive"
                  className="w-full justify-start mt-6" 
                  onClick={handleLogout}
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </nav>
            </GlassMorphism>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Stat 
                    title="Total Users" 
                    value="1,245" 
                    icon={<Users className="h-5 w-5 text-primary" />}
                    change="12"
                    isPositive={true}
                  />
                  <Stat 
                    title="Active Miners" 
                    value="876" 
                    icon={<UserCheck className="h-5 w-5 text-primary" />}
                    change="8"
                    isPositive={true}
                  />
                  <Stat 
                    title="Today's Transactions" 
                    value="$12,450" 
                    icon={<Wallet className="h-5 w-5 text-primary" />}
                    change="5"
                    isPositive={true}
                  />
                </div>
                
                <GlassMorphism className="p-6">
                  <h2 className="text-lg font-medium mb-4">Recent Transactions</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-3 text-left">User</th>
                          <th className="pb-3 text-left">Type</th>
                          <th className="pb-3 text-left">Amount</th>
                          <th className="pb-3 text-left">Status</th>
                          <th className="pb-3 text-left">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockTransactions.slice(0, 3).map(transaction => (
                          <tr key={transaction.id} className="border-b last:border-0">
                            <td className="py-3">{transaction.user}</td>
                            <td className="py-3">{transaction.type}</td>
                            <td className="py-3">
                              {transaction.amount} 
                              <span className="text-xs ml-1">({transaction.currency})</span>
                            </td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {transaction.status}
                              </span>
                            </td>
                            <td className="py-3">{transaction.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </GlassMorphism>
              </div>
            )}
            
            {activeTab === 'users' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold mb-6">User Management</h1>
                
                <GlassMorphism className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">All Users</h2>
                    <Input type="search" placeholder="Search users..." className="max-w-xs" />
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-3 text-left">Name</th>
                          <th className="pb-3 text-left">Email</th>
                          <th className="pb-3 text-left">Balance</th>
                          <th className="pb-3 text-left">Plan</th>
                          <th className="pb-3 text-left">Status</th>
                          <th className="pb-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockUsers.map(user => (
                          <tr key={user.id} className="border-b last:border-0">
                            <td className="py-3">{user.name}</td>
                            <td className="py-3">{user.email}</td>
                            <td className="py-3">{user.balance}</td>
                            <td className="py-3">{user.planType}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                user.status === 'Active' ? 'bg-green-100 text-green-800' :
                                user.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="py-3">
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleUserAction(user.id, 'Edited')}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleUserAction(user.id, 'Suspended')}
                                >
                                  Suspend
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </GlassMorphism>
              </div>
            )}
            
            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold mb-6">Transaction Management</h1>
                
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all">
                    <GlassMorphism className="p-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="pb-3 text-left">User</th>
                              <th className="pb-3 text-left">Type</th>
                              <th className="pb-3 text-left">Amount</th>
                              <th className="pb-3 text-left">Status</th>
                              <th className="pb-3 text-left">Date</th>
                              <th className="pb-3 text-left">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockTransactions.map(transaction => (
                              <tr key={transaction.id} className="border-b last:border-0">
                                <td className="py-3">{transaction.user}</td>
                                <td className="py-3">{transaction.type}</td>
                                <td className="py-3">
                                  {transaction.amount} 
                                  <span className="text-xs ml-1">({transaction.currency})</span>
                                </td>
                                <td className="py-3">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                    transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {transaction.status}
                                  </span>
                                </td>
                                <td className="py-3">{transaction.date}</td>
                                <td className="py-3">
                                  <div className="flex space-x-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleApproveTransaction(transaction.id)}
                                      disabled={transaction.status !== 'Pending'}
                                    >
                                      Approve
                                    </Button>
                                    <Button 
                                      variant="destructive" 
                                      size="sm"
                                      onClick={() => handleRejectTransaction(transaction.id)}
                                      disabled={transaction.status !== 'Pending'}
                                    >
                                      Reject
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </GlassMorphism>
                  </TabsContent>
                  
                  <TabsContent value="pending">
                    <GlassMorphism className="p-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="pb-3 text-left">User</th>
                              <th className="pb-3 text-left">Type</th>
                              <th className="pb-3 text-left">Amount</th>
                              <th className="pb-3 text-left">Date</th>
                              <th className="pb-3 text-left">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockTransactions
                              .filter(t => t.status === 'Pending')
                              .map(transaction => (
                                <tr key={transaction.id} className="border-b last:border-0">
                                  <td className="py-3">{transaction.user}</td>
                                  <td className="py-3">{transaction.type}</td>
                                  <td className="py-3">
                                    {transaction.amount} 
                                    <span className="text-xs ml-1">({transaction.currency})</span>
                                  </td>
                                  <td className="py-3">{transaction.date}</td>
                                  <td className="py-3">
                                    <div className="flex space-x-2">
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => handleApproveTransaction(transaction.id)}
                                      >
                                        Approve
                                      </Button>
                                      <Button 
                                        variant="destructive" 
                                        size="sm"
                                        onClick={() => handleRejectTransaction(transaction.id)}
                                      >
                                        Reject
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </GlassMorphism>
                  </TabsContent>
                  
                  <TabsContent value="completed">
                    <GlassMorphism className="p-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="pb-3 text-left">User</th>
                              <th className="pb-3 text-left">Type</th>
                              <th className="pb-3 text-left">Amount</th>
                              <th className="pb-3 text-left">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockTransactions
                              .filter(t => t.status === 'Completed')
                              .map(transaction => (
                                <tr key={transaction.id} className="border-b last:border-0">
                                  <td className="py-3">{transaction.user}</td>
                                  <td className="py-3">{transaction.type}</td>
                                  <td className="py-3">
                                    {transaction.amount} 
                                    <span className="text-xs ml-1">({transaction.currency})</span>
                                  </td>
                                  <td className="py-3">{transaction.date}</td>
                                </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </GlassMorphism>
                  </TabsContent>
                  
                  <TabsContent value="rejected">
                    <GlassMorphism className="p-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="pb-3 text-left">User</th>
                              <th className="pb-3 text-left">Type</th>
                              <th className="pb-3 text-left">Amount</th>
                              <th className="pb-3 text-left">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockTransactions
                              .filter(t => t.status === 'Rejected')
                              .map(transaction => (
                                <tr key={transaction.id} className="border-b last:border-0">
                                  <td className="py-3">{transaction.user}</td>
                                  <td className="py-3">{transaction.type}</td>
                                  <td className="py-3">
                                    {transaction.amount} 
                                    <span className="text-xs ml-1">({transaction.currency})</span>
                                  </td>
                                  <td className="py-3">{transaction.date}</td>
                                </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </GlassMorphism>
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold mb-6">System Settings</h1>
                
                <GlassMorphism className="p-6">
                  <h2 className="text-lg font-medium mb-4">General Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input id="siteName" defaultValue="AI Mining Platform" />
                    </div>
                    
                    <div>
                      <Label htmlFor="siteDescription">Site Description</Label>
                      <Input id="siteDescription" defaultValue="Advanced AI-powered cryptocurrency mining platform" />
                    </div>
                    
                    <h3 className="text-md font-medium mt-6 mb-2">Supported Cryptocurrencies</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {cryptocurrencies.map(crypto => (
                        <div 
                          key={crypto.id}
                          className="flex items-center p-3 border rounded-md"
                        >
                          <div className={`mr-2 ${crypto.color}`}>
                            {crypto.icon}
                          </div>
                          <div>
                            <p className="font-medium">{crypto.name}</p>
                            <p className="text-xs text-muted-foreground">{crypto.symbol}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4">
                      <Button>Save Settings</Button>
                    </div>
                  </div>
                </GlassMorphism>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
