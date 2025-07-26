'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { Link2, Target, Users, Activity } from 'lucide-react';

const stats = [
  { number: '5M+', label: 'Links Created', icon: Link2 },
  { number: '500M+', label: 'Clicks Tracked', icon: Target },
  { number: '100K+', label: 'Active Users', icon: Users },
  { number: '99.99%', label: 'Uptime', icon: Activity },
];

export function StatsSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Trusted Worldwide
          </h2>
          <p className="text-xl text-slate-300">
            Join thousands of businesses using ShortLink to grow their reach
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <GlassCard className="p-8">
                <div className="relative mb-6">
                  <div className="inline-flex p-6 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-purple-400" />
                  </div>
                </div>
                <div className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-medium text-slate-300">
                  {stat.label}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}