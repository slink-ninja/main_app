'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="relative py-32 px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/20 via-transparent to-black/20"></div>
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Join thousands of businesses using ShortLink to create powerful short links. 
            Start free today, no credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button 
              size="lg" 
              className="px-12 py-6 text-lg font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/register">
                Start Free Today
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-12 py-6 text-lg font-semibold border-2 border-white text-white hover:bg-white/20 rounded-full transition-all duration-300"
              asChild
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-purple-100">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Setup in 30 seconds</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}