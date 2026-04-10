import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, type MotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, disabled, ...props }, ref) => {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:ring-offset-2 focus:ring-offset-brand-black disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
    
    const variantStyles = {
      primary: 'bg-brand-blue text-brand-white hover:bg-opacity-90 shadow-lg hover:shadow-xl',
      secondary: 'bg-brand-gold text-brand-black hover:bg-opacity-90 shadow-lg hover:shadow-xl',
      outline: 'bg-transparent text-brand-blue border-2 border-brand-blue hover:bg-brand-blue hover:text-brand-white',
    };
    
    const sizeStyles = {
      sm: 'px-5 py-2.5 text-sm',
      md: 'px-7 py-3.5 text-base',
      lg: 'px-9 py-4 text-lg',
    };
    
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
    
    return (
      <motion.button
        ref={ref}
        className={combinedClassName}
        disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        {...(props as any)}
      >
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
