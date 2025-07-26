'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { 
  Link2, 
  BarChart3, 
  QrCode, 
  Shield, 
  Globe, 
  Target,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: Link2,
    title: 'Instant Short Links',
    description: 'Create short links in seconds with custom codes and branded domains for maximum impact.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description: 'Track clicks, locations, devices, and traffic sources with comprehensive reporting.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: QrCode,
    title: 'QR Code Generator',
    description: 'Automatically generate QR codes for every link to bridge offline and online marketing.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Security Protection',
    description: 'Advanced malware detection and link scanning to protect your users from threats.',
    gradient: 'from-red-500 to-orange-500',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Lightning-fast redirects powered by our worldwide content delivery network.',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Target,
    title: 'Smart Targeting',
    description: 'Route users based on location, device, or custom parameters for better conversions.',
    gradient: 'from-pink-500 to-rose-500',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Badge variant="outline" className="mb-6 px-4 py-2 border-purple-500/40 bg-purple-950/30 text-purple-300">
            <Zap className="w-4 h-4 mr-2" />
            Powerful Features
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Everything You Need
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Professional tools to create, manage, and track your short links
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <GlassCard className="h-full p-8">
                <div className="flex items-center mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-2xl text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}