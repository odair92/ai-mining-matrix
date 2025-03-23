
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Wallet, BarChart3, Settings, UserCheck } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import InfoBanner from '@/components/ui/InfoBanner';

// Import mock data utility
const generateMockUsers = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: Math.random() > 0.3 ? 'active' : 'pending',
    joinDate: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
    balance: +(Math.random() * 1000).toFixed(2),
  }));
};

const generateMockTransactions = (count: number) => {
  const types = ['deposit', 'withdrawal', 'mining'];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    userId: Math.floor(Math.random() * 100) + 1,
    userName: `User ${Math.floor(Math.random() * 100) + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    amount: +(Math.random() * 1000).toFixed(2),
    status: Math.random() > 0.3 ? 'pending' : (Math.random() > 0.5 ? 'completed' : 'rejected'),
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
  }));
};

const Admin = () => {
  const { toast } = useToast();
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
          // Clear expired auth
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
  }, []);
  
  // Simulate logout
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminAuthTime');
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin panel."
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  const usersList = generateMockUsers(100);
  const transactionsList = generateMockTransactions(200);
  const pendingUsers = usersList.filter(user => user.status === 'pending');
  const pendingTransactions = transactionsList.filter(tx => tx.status === 'pending');
  
  // Get admin email from localStorage
  const adminEmail = localStorage.getItem('adminEmail') || 'admin@example.com';
  
  // Get system settings
  const systemSettingsStr = localStorage.getItem('systemSettings');
  const systemSettings = systemSettingsStr ? JSON.parse(systemSettingsStr) : {
    siteName: 'AI Mining Matrix',
    cryptoSupport: true,
    debugMode: false
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">{systemSettings.siteName} - Admin</h1>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin</p>
                  <p className="text-xs leading-none text-muted-foreground">{adminEmail}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      
      {/* Admin Content */}
      <div className="container py-6">
        <InfoBanner />
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside className="md:w-64">
            <nav className="grid gap-2">
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                className="justify-start"
                onClick={() => setActiveTab('dashboard')}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === 'users' ? 'default' : 'ghost'}
                className="justify-start"
                onClick={() => setActiveTab('users')}
              >
                <Users className="mr-2 h-4 w-4" />
                Users
                {pendingUsers.length > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {pendingUsers.length}
                  </Badge>
                )}
              </Button>
              <Button
                variant={activeTab === 'transactions' ? 'default' : 'ghost'}
                className="justify-start"
                onClick={() => setActiveTab('transactions')}
              >
                <Wallet className="mr-2 h-4 w-4" />
                Transactions
                {pendingTransactions.length > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {pendingTransactions.length}
                  </Badge>
                )}
              </Button>
              <Button
                variant={activeTab === 'settings' ? 'default' : 'ghost'}
                className="justify-start"
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </nav>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1">
            {/* Dashboard Content */}
            {activeTab === 'dashboard' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold">Dashboard</h2>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{usersList.length}</div>
                      <p className="text-xs text-muted-foreground">
                        +{Math.floor(Math.random() * 20)} new today
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Miners</CardTitle>
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{Math.floor(usersList.length * 0.7)}</div>
                      <p className="text-xs text-muted-foreground">
                        {Math.floor(usersList.length * 0.7 / usersList.length * 100)}% of total users
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                      <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{transactionsList.length}</div>
                      <p className="text-xs text-muted-foreground">
                        +{Math.floor(Math.random() * 30)} in last 24h
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                      <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {pendingUsers.length + pendingTransactions.length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {pendingUsers.length} users, {pendingTransactions.length} transactions
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Recent Registrations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {usersList.slice(0, 5).map((user) => (
                          <div key={user.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`/placeholder.svg`} />
                                <AvatarFallback>
                                  {user.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                            <Badge variant={user.status === 'active' ? 'default' : 'outline'}>
                              {user.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Pending Approvals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pendingUsers.slice(0, 5).map((user) => (
                          <div key={user.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`/placeholder.svg`} />
                                <AvatarFallback>
                                  {user.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, 'Approved')}>
                                Approve
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleUserAction(user.id, 'Rejected')}>
                                Reject
                              </Button>
                            </div>
                          </div>
                        ))}
                        {pendingUsers.length === 0 && (
                          <p className="text-center text-sm text-muted-foreground py-4">
                            No pending user approvals
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
            
            {/* Users Content */}
            {activeTab === 'users' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold">User Management</h2>
                
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">All Users</TabsTrigger>
                    <TabsTrigger value="pending">
                      Pending Approval
                      {pendingUsers.length > 0 && (
                        <Badge variant="destructive" className="ml-2">
                          {pendingUsers.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="rounded-md border">
                          <table className="w-full">
                            <thead className="bg-muted/50">
                              <tr className="text-left">
                                <th className="p-2 font-medium">User</th>
                                <th className="p-2 font-medium">Status</th>
                                <th className="p-2 font-medium">Joined</th>
                                <th className="p-2 font-medium">Balance</th>
                                <th className="p-2 font-medium text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {usersList.slice(0, 10).map((user) => (
                                <tr key={user.id} className="border-t">
                                  <td className="p-2">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src={`/placeholder.svg`} />
                                        <AvatarFallback>
                                          {user.name.substring(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-2">
                                    <Badge variant={user.status === 'active' ? 'default' : 'outline'}>
                                      {user.status}
                                    </Badge>
                                  </td>
                                  <td className="p-2 text-muted-foreground">{user.joinDate}</td>
                                  <td className="p-2 font-medium">${user.balance}</td>
                                  <td className="p-2 text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                          Actions
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive">
                                          Suspend User
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="pending" className="space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        {pendingUsers.length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">No pending user approvals</p>
                          </div>
                        ) : (
                          <div className="rounded-md border">
                            <table className="w-full">
                              <thead className="bg-muted/50">
                                <tr className="text-left">
                                  <th className="p-2 font-medium">User</th>
                                  <th className="p-2 font-medium">Joined</th>
                                  <th className="p-2 font-medium text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {pendingUsers.map((user) => (
                                  <tr key={user.id} className="border-t">
                                    <td className="p-2">
                                      <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                          <AvatarImage src={`/placeholder.svg`} />
                                          <AvatarFallback>
                                            {user.name.substring(0, 2).toUpperCase()}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <p className="font-medium">{user.name}</p>
                                          <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-2 text-muted-foreground">{user.joinDate}</td>
                                    <td className="p-2 text-right">
                                      <div className="flex gap-2 justify-end">
                                        <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, 'Approved')}>
                                          Approve
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleUserAction(user.id, 'Rejected')}>
                                          Reject
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="active" className="space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="rounded-md border">
                          <table className="w-full">
                            <thead className="bg-muted/50">
                              <tr className="text-left">
                                <th className="p-2 font-medium">User</th>
                                <th className="p-2 font-medium">Joined</th>
                                <th className="p-2 font-medium">Balance</th>
                                <th className="p-2 font-medium text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {usersList
                                .filter((user) => user.status === 'active')
                                .slice(0, 10)
                                .map((user) => (
                                  <tr key={user.id} className="border-t">
                                    <td className="p-2">
                                      <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                          <AvatarImage src={`/placeholder.svg`} />
                                          <AvatarFallback>
                                            {user.name.substring(0, 2).toUpperCase()}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <p className="font-medium">{user.name}</p>
                                          <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-2 text-muted-foreground">{user.joinDate}</td>
                                    <td className="p-2 font-medium">${user.balance}</td>
                                    <td className="p-2 text-right">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="sm">
                                            Actions
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem>View Details</DropdownMenuItem>
                                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem className="text-destructive">
                                            Suspend User
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </td>
                                  </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
            
            {/* Transactions Content */}
            {activeTab === 'transactions' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold">Transaction Management</h2>
                
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">All Transactions</TabsTrigger>
                    <TabsTrigger value="pending">
                      Pending Approval
                      {pendingTransactions.length > 0 && (
                        <Badge variant="destructive" className="ml-2">
                          {pendingTransactions.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="deposits">Deposits</TabsTrigger>
                    <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="rounded-md border">
                          <table className="w-full">
                            <thead className="bg-muted/50">
                              <tr className="text-left">
                                <th className="p-2 font-medium">ID</th>
                                <th className="p-2 font-medium">User</th>
                                <th className="p-2 font-medium">Type</th>
                                <th className="p-2 font-medium">Amount</th>
                                <th className="p-2 font-medium">Status</th>
                                <th className="p-2 font-medium">Date</th>
                                <th className="p-2 font-medium text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {transactionsList.slice(0, 10).map((tx) => (
                                <tr key={tx.id} className="border-t">
                                  <td className="p-2 text-muted-foreground">#{tx.id}</td>
                                  <td className="p-2">{tx.userName}</td>
                                  <td className="p-2">
                                    <Badge variant="outline">{tx.type}</Badge>
                                  </td>
                                  <td className="p-2 font-medium">${tx.amount}</td>
                                  <td className="p-2">
                                    <Badge 
                                      variant={
                                        tx.status === 'completed' ? 'default' : 
                                        tx.status === 'pending' ? 'outline' : 'destructive'
                                      }
                                    >
                                      {tx.status}
                                    </Badge>
                                  </td>
                                  <td className="p-2 text-muted-foreground">{tx.date}</td>
                                  <td className="p-2 text-right">
                                    {tx.status === 'pending' ? (
                                      <div className="flex gap-2 justify-end">
                                        <Button size="sm" variant="outline" onClick={() => handleApproveTransaction(tx.id)}>
                                          Approve
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleRejectTransaction(tx.id)}>
                                          Reject
                                        </Button>
                                      </div>
                                    ) : (
                                      <Button variant="ghost" size="sm">
                                        View
                                      </Button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="pending" className="space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        {pendingTransactions.length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">No pending transactions</p>
                          </div>
                        ) : (
                          <div className="rounded-md border">
                            <table className="w-full">
                              <thead className="bg-muted/50">
                                <tr className="text-left">
                                  <th className="p-2 font-medium">ID</th>
                                  <th className="p-2 font-medium">User</th>
                                  <th className="p-2 font-medium">Type</th>
                                  <th className="p-2 font-medium">Amount</th>
                                  <th className="p-2 font-medium">Date</th>
                                  <th className="p-2 font-medium text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {pendingTransactions.map((tx) => (
                                  <tr key={tx.id} className="border-t">
                                    <td className="p-2 text-muted-foreground">#{tx.id}</td>
                                    <td className="p-2">{tx.userName}</td>
                                    <td className="p-2">
                                      <Badge variant="outline">{tx.type}</Badge>
                                    </td>
                                    <td className="p-2 font-medium">${tx.amount}</td>
                                    <td className="p-2 text-muted-foreground">{tx.date}</td>
                                    <td className="p-2 text-right">
                                      <div className="flex gap-2 justify-end">
                                        <Button size="sm" variant="outline" onClick={() => handleApproveTransaction(tx.id)}>
                                          Approve
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleRejectTransaction(tx.id)}>
                                          Reject
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="deposits" className="space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="rounded-md border">
                          <table className="w-full">
                            <thead className="bg-muted/50">
                              <tr className="text-left">
                                <th className="p-2 font-medium">ID</th>
                                <th className="p-2 font-medium">User</th>
                                <th className="p-2 font-medium">Amount</th>
                                <th className="p-2 font-medium">Status</th>
                                <th className="p-2 font-medium">Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {transactionsList
                                .filter((tx) => tx.type === 'deposit')
                                .slice(0, 10)
                                .map((tx) => (
                                  <tr key={tx.id} className="border-t">
                                    <td className="p-2 text-muted-foreground">#{tx.id}</td>
                                    <td className="p-2">{tx.userName}</td>
                                    <td className="p-2 font-medium">${tx.amount}</td>
                                    <td className="p-2">
                                      <Badge 
                                        variant={
                                          tx.status === 'completed' ? 'default' : 
                                          tx.status === 'pending' ? 'outline' : 'destructive'
                                        }
                                      >
                                        {tx.status}
                                      </Badge>
                                    </td>
                                    <td className="p-2 text-muted-foreground">{tx.date}</td>
                                  </tr>
                              ))}
                              {transactionsList.filter(tx => tx.type === 'deposit').length === 0 && (
                                <tr>
                                  <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                    No deposit transactions found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="withdrawals" className="space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="rounded-md border">
                          <table className="w-full">
                            <thead className="bg-muted/50">
                              <tr className="text-left">
                                <th className="p-2 font-medium">ID</th>
                                <th className="p-2 font-medium">User</th>
                                <th className="p-2 font-medium">Amount</th>
                                <th className="p-2 font-medium">Status</th>
                                <th className="p-2 font-medium">Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {transactionsList
                                .filter((tx) => tx.type === 'withdrawal')
                                .slice(0, 10)
                                .map((tx) => (
                                  <tr key={tx.id} className="border-t">
                                    <td className="p-2 text-muted-foreground">#{tx.id}</td>
                                    <td className="p-2">{tx.userName}</td>
                                    <td className="p-2 font-medium">${tx.amount}</td>
                                    <td className="p-2">
                                      <Badge 
                                        variant={
                                          tx.status === 'completed' ? 'default' : 
                                          tx.status === 'pending' ? 'outline' : 'destructive'
                                        }
                                      >
                                        {tx.status}
                                      </Badge>
                                    </td>
                                    <td className="p-2 text-muted-foreground">{tx.date}</td>
                                  </tr>
                              ))}
                              {transactionsList.filter(tx => tx.type === 'withdrawal').length === 0 && (
                                <tr>
                                  <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                    No withdrawal transactions found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
            
            {/* Settings Content */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold">System Settings</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle>General Configuration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-1">
                        <label className="text-sm font-medium">Site Name</label>
                        <input
                          type="text"
                          defaultValue={systemSettings.siteName}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="cryptoSupport"
                          defaultChecked={systemSettings.cryptoSupport}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor="cryptoSupport" className="text-sm font-medium">
                          Enable Cryptocurrency Support
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="debugMode"
                          defaultChecked={systemSettings.debugMode}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor="debugMode" className="text-sm font-medium">
                          Enable Debug Mode
                        </label>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <Button 
                        onClick={() => 
                          toast({
                            title: "Settings Saved",
                            description: "Your system settings have been updated successfully."
                          })
                        }
                      >
                        Save Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Administrator Account</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-1">
                        <label className="text-sm font-medium">Admin Email</label>
                        <input
                          type="email"
                          defaultValue={adminEmail}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>
                      
                      <div className="grid gap-1">
                        <label className="text-sm font-medium">New Password</label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>
                      
                      <div className="grid gap-1">
                        <label className="text-sm font-medium">Confirm New Password</label>
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>
                      
                      <Button 
                        onClick={() => 
                          toast({
                            title: "Admin Account Updated",
                            description: "Your administrator account has been updated successfully."
                          })
                        }
                      >
                        Update Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
