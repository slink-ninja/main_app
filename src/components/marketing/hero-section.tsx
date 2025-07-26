'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/ui/glass-card';
import { UrlShortenerForm } from '@/components/forms/url-shortener-form';
import { ArrowRight, Zap, Users } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      {/* Retro Grid Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20"></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 -z-5">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="space-y-8"
        >
          <Badge 
            variant="outline" 
            className="px-6 py-3 text-sm font-medium border-purple-500/40 bg-purple-950/30 text-purple-300 backdrop-blur-sm"
          >
            <Users className="w-4 h-4 mr-2 text-purple-400" />
            Trusted by 100,000+ businesses worldwide
          </Badge>
          
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
              <span className="block text-white">Short</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Links
              </span>
              <span className="block text-white text-5xl md:text-6xl lg:text-7xl font-light">
                That Convert
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
              Create powerful short links with detailed analytics. 
              <br className="hidden md:block" />
              <span className="font-medium text-white">Track every click.</span> 
              <span className="font-medium text-white">Boost your results.</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button 
              size="lg" 
              className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="#create">
                Start Free Today
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-12 py-6 text-lg font-semibold border-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500 rounded-full transition-all duration-300"
              asChild
            >
              <Link href="#features">See Features</Link>
            </Button>
          </div>
        </motion.div>

        {/* URL Shortener Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
          id="create"
        >
          <GlassCard className="p-8 max-w-4xl mx-auto">
            <UrlShortenerForm />
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}