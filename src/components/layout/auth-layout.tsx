'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md"
    >
      <GlassCard className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
          <p className="text-slate-300">{subtitle}</p>
        </div>
        {children}
      </GlassCard>
    </motion.div>
  );
}