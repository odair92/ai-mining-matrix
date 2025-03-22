
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import GlassMorphism from './GlassMorphism';

interface StatProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: string | number;
  isPositive?: boolean;
  className?: string;
  isLoading?: boolean;
  animated?: boolean;
  formatter?: (value: string | number) => string;
  subtitle?: string;
}

const Stat = ({
  title,
  value,
  icon,
  change,
  isPositive = true,
  className,
  isLoading = false,
  animated = true,
  formatter = (val) => String(val),
  subtitle,
}: StatProps) => {
  // Format the value
  const formattedValue = formatter(value);

  return (
    <GlassMorphism
      className={cn('p-6', className)}
      whileHover={animated ? { y: -5, transition: { duration: 0.2 } } : undefined}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          
          {isLoading ? (
            <div className="h-8 w-24 bg-muted animate-pulse rounded" />
          ) : (
            <motion.p 
              className="text-2xl font-bold"
              initial={animated ? { opacity: 0, y: 10 } : false}
              animate={animated ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.5 }}
            >
              {formattedValue}
            </motion.p>
          )}
          
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          
          {change && (
            <div className="flex items-center">
              <span
                className={cn(
                  'text-xs font-medium flex items-center',
                  isPositive ? 'text-green-500' : 'text-red-500'
                )}
              >
                {isPositive ? (
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
                {change}%
              </span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="bg-primary/10 p-3 rounded-full">
            {icon}
          </div>
        )}
      </div>
    </GlassMorphism>
  );
};

export default Stat;
