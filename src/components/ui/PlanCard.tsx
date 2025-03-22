
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedButton from './AnimatedButton';

interface Feature {
  text: string;
  available: boolean;
}

interface PlanCardProps {
  title: string;
  price: string;
  description: string;
  features: Feature[];
  isMostPopular?: boolean;
  ctaText?: string;
  onClick?: () => void;
  className?: string;
  ghsRange?: string;
  returnPerDay?: string;
  contractDuration?: string;
}

const PlanCard = ({
  title,
  price,
  description,
  features,
  isMostPopular = false,
  ctaText = "Select Plan",
  onClick,
  className,
  ghsRange,
  returnPerDay,
  contractDuration,
}: PlanCardProps) => {
  return (
    <motion.div
      className={cn(
        'relative rounded-xl overflow-hidden border border-border transition-all duration-300',
        isMostPopular ? 'bg-primary/5 shadow-xl scale-[1.02] z-10' : 'bg-background shadow-lg',
        className
      )}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {isMostPopular && (
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            Most Popular
          </div>
        </div>
      )}

      <div className="p-6 md:p-8">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-6">{description}</p>
        
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">{price}</span>
            {contractDuration && (
              <span className="ml-1 text-muted-foreground text-sm">/{contractDuration}</span>
            )}
          </div>
          
          {ghsRange && (
            <div className="mt-2 text-sm">
              <span className="font-medium">Mining Power:</span> <span className="text-muted-foreground">{ghsRange}</span>
            </div>
          )}
          
          {returnPerDay && (
            <div className="mt-1 text-sm">
              <span className="font-medium">Daily Returns:</span> <span className="text-muted-foreground">{returnPerDay}</span>
            </div>
          )}
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className={cn(
                "mr-2 h-5 w-5 rounded-full flex items-center justify-center mt-0.5",
                feature.available ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              )}>
                {feature.available ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <span className={cn(
                "text-sm",
                feature.available ? "text-foreground" : "text-muted-foreground line-through"
              )}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        
        <AnimatedButton 
          className="w-full"
          variant={isMostPopular ? "default" : "outline"}
          gradientBorder={isMostPopular}
          onClick={onClick}
        >
          {ctaText}
        </AnimatedButton>
      </div>
    </motion.div>
  );
};

export default PlanCard;
