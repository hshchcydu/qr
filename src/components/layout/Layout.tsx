import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Breadcrumb } from './Breadcrumb';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16 md:pt-20 flex-grow">
        <Breadcrumb />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};
