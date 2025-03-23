
import { Server, ShieldCheck, Database, Globe, Cpu, Check } from 'lucide-react';
import { Step } from './StepNavigation';

export const installationSteps: Step[] = [
  {
    id: 'welcome',
    title: 'Welcome',
    description: 'Install and configure AI Mining Matrix on your server.',
    icon: <Server className="h-6 w-6" />,
  },
  {
    id: 'admin',
    title: 'Admin Setup',
    description: 'Create your administrator account.',
    icon: <ShieldCheck className="h-6 w-6" />,
  },
  {
    id: 'database',
    title: 'Database',
    description: 'Configure your system database.',
    icon: <Database className="h-6 w-6" />,
  },
  {
    id: 'hosting',
    title: 'Hosting',
    description: 'Configure hosting environment settings.',
    icon: <Globe className="h-6 w-6" />,
  },
  {
    id: 'system',
    title: 'System Settings',
    description: 'Configure mining capabilities and performance.',
    icon: <Cpu className="h-6 w-6" />,
  },
  {
    id: 'complete',
    title: 'Installation Complete',
    description: 'Your system is ready to use.',
    icon: <Check className="h-6 w-6" />,
  },
];
