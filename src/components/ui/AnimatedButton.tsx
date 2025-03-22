
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, MotionProps } from 'framer-motion';

interface AnimatedButtonProps extends ButtonProps, MotionProps {
  children: React.ReactNode;
  className?: string;
  gradientBorder?: boolean;
  rippleEffect?: boolean;
  animateScale?: boolean;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    children, 
    className, 
    gradientBorder = false, 
    rippleEffect = false,
    animateScale = true,
    whileHover,
    ...props 
  }, ref) => {
    return (
      <motion.div
        className={cn(
          'relative',
          gradientBorder && 'p-[1px] bg-gradient-to-tr from-primary/80 to-blue-400/80 rounded-md',
        )}
        whileHover={animateScale ? { scale: 1.03, ...whileHover } : whileHover}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          ref={ref}
          className={cn(
            'relative overflow-hidden z-10',
            gradientBorder && 'bg-background border-none',
            rippleEffect && 'transition-all duration-300',
            className
          )}
          {...props}
        >
          {children}
          {rippleEffect && (
            <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity rounded-md"></span>
          )}
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;
