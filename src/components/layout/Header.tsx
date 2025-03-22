
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  ChevronRight, 
  BarChart2,
  Cpu,
  Package
} from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard", icon: <BarChart2 className="h-4 w-4 mr-1" /> },
    { name: "Mining", path: "/mining", icon: <Cpu className="h-4 w-4 mr-1" /> },
    { name: "Plans", path: "/plans", icon: <Package className="h-4 w-4 mr-1" /> }
  ];

  const headerClasses = `fixed w-full top-0 z-50 transition-all duration-300 py-4 px-6 ${
    isScrolled
      ? 'bg-background/80 backdrop-blur-md shadow-sm'
      : 'bg-transparent'
  }`;

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <span className="font-bold text-2xl tracking-tight">AI Mining Matrix</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`relative font-medium text-sm flex items-center transition-colors hover:text-primary ${
                      isActive ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {item.icon && item.icon}
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="navigation-underline"
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          <div className="flex items-center space-x-3">
            <Link to="/auth?mode=login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/auth?mode=register">
              <Button size="sm" className="relative overflow-hidden group">
                <span className="relative z-10">Start Mining</span>
                <span className="absolute inset-0 bg-primary opacity-90 group-hover:opacity-100 transition-opacity"></span>
                <ChevronRight className="w-4 h-4 ml-1 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-md"
        >
          <nav className="pt-8 px-8 h-full flex flex-col">
            <ul className="space-y-6">
              {navigation.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`text-lg font-medium flex items-center ${
                        isActive ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {item.icon && <span className="mr-3">{item.icon}</span>}
                      {item.name}
                      {isActive && <ChevronRight className="ml-auto h-5 w-5" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            <div className="mt-auto mb-12 flex flex-col space-y-4">
              <Link to="/auth?mode=login" className="w-full">
                <Button variant="outline" size="lg" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth?mode=register" className="w-full">
                <Button size="lg" className="w-full">
                  Register Now
                </Button>
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
