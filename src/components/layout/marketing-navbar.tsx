'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, Menu, X, BarChart3, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function MarketingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-black text-xl text-white">
              Short<span className="text-purple-400">Link</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="#features" 
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Features
            </Link>
            <Link 
              href="#pricing" 
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Pricing
            </Link>
            <Link 
              href="/dashboard" 
              className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center"
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Analytics
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-slate-300 hover:text-white hover:bg-slate-800"
              asChild
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors duration-200"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden backdrop-blur-xl bg-slate-950/95 border-t border-white/10"
          >
            <div className="px-6 py-4 space-y-4">
              <Link 
                href="#features" 
                className="block text-slate-300 hover:text-white transition-colors duration-200 py-2"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#pricing" 
                className="block text-slate-300 hover:text-white transition-colors duration-200 py-2"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/dashboard" 
                className="block text-slate-300 hover:text-white transition-colors duration-200 py-2 flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Link>
              
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <Button 
                  variant="ghost" 
                  className="w-full text-slate-300 hover:text-white hover:bg-slate-800 justify-start"
                  asChild
                >
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full shadow-lg"
                  asChild
                >
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}