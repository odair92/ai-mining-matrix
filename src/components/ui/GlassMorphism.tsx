
import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

// Use HTMLMotionProps directly as it already handles the correct types for motion.div
interface GlassMorphismProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'heavy';
  animateOnHover?: boolean;
  dark?: boolean;
}

const GlassMorphism = ({
  children,
  className,
  intensity = 'medium',
  animateOnHover = false,
  dark = false,
  ...props
}: GlassMorphismProps) => {
  // Define blur intensity
  const blurMap = {
    light: 'backdrop-blur-sm',
    medium: 'backdrop-blur-md',
    heavy: 'backdrop-blur-xl',
  };

  // Define background opacity based on intensity
  const bgOpacityMap = {
    light: dark ? 'bg-black/10' : 'bg-white/20',
    medium: dark ? 'bg-black/20' : 'bg-white/30',
    heavy: dark ? 'bg-black/30' : 'bg-white/40',
  };

  // Define border opacity based on intensity
  const borderMap = {
    light: dark ? 'border-white/5' : 'border-white/10',
    medium: dark ? 'border-white/10' : 'border-white/20',
    heavy: dark ? 'border-white/15' : 'border-white/30',
  };

  const shadowMap = {
    light: 'shadow-sm',
    medium: 'shadow-glass',
    heavy: 'shadow-glass-lg',
  };

  return (
    <motion.div
      className={cn(
        'rounded-2xl border transition-all duration-300',
        blurMap[intensity],
        bgOpacityMap[intensity],
        borderMap[intensity],
        shadowMap[intensity],
        animateOnHover && 'hover:shadow-glass-lg hover:scale-[1.02]',
        className
      )}
      whileHover={animateOnHover ? { scale: 1.02 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassMorphism;
