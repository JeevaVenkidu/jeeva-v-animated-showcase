
import React from 'react';
import { motion } from 'framer-motion';
import { useInteractionLimiter } from '../../hooks/useInteractionLimiter';
import { useOptimizedAnimations } from '../../hooks/useOptimizedAnimations';

interface OptimizedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const OptimizedButton: React.FC<OptimizedButtonProps> = ({
  children,
  onClick,
  className = "",
  disabled = false
}) => {
  const { handleClick, canInteract } = useInteractionLimiter();
  const { shouldAnimate, getAnimationConfig } = useOptimizedAnimations();

  const handleOptimizedClick = () => {
    if (!onClick || disabled) return;
    
    handleClick(() => {
      onClick();
    });
  };

  const animationConfig = getAnimationConfig();
  const isInteractive = canInteract && !disabled;

  return (
    <motion.button
      onClick={handleOptimizedClick}
      disabled={!isInteractive}
      className={`${className} ${!isInteractive ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={shouldAnimate ? { scale: 1.02 } : {}}
      whileTap={shouldAnimate ? { scale: 0.98 } : {}}
      transition={animationConfig}
    >
      {children}
    </motion.button>
  );
};

export default OptimizedButton;
