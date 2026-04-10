import { type ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-brand-black text-brand-white">
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
