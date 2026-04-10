import { type InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  isTextarea?: boolean;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, error, isTextarea = false, className = '', id, required, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${inputId}-error`;
    
    const baseStyles = 'w-full px-5 py-3.5 glass-premium rounded-lg text-brand-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-transparent hover:border-brand-gray-700';
    const errorStyles = error ? 'ring-2 ring-red-500 focus:ring-red-500' : '';
    const combinedClassName = `${baseStyles} ${errorStyles} ${className}`;
    
    const InputElement = isTextarea ? 'textarea' : 'input';
    
    return (
      <div className="w-full">
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-brand-white mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>
        <InputElement
          ref={ref as any}
          id={inputId}
          className={combinedClassName}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          aria-required={required}
          {...(isTextarea ? { rows: 4 } : {})}
          {...props}
        />
        {error && (
          <p 
            id={errorId}
            className="mt-2 text-sm text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
