'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Menu, X, BarChart3, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-8 h-8 lynx-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-glow">
                <Zap className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-bold text-xl lynx-gradient-text">slink</span>
              <span className="font-bold text-xl text-foreground">.ninja</span>
              <Badge variant="secondary" className="ml-2 text-xs bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-3 h-3 mr-1" />
                Beta
              </Badge>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="#features" 
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              How It Works
            </Link>
            <Link 
              href="#pricing" 
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Plans
            </Link>
            {user && (
              <Link 
                href="/dashboard" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center font-medium"
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                My Links
              </Link>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">
                  {user.user_metadata?.name || user.email}
                </span>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button className="lynx-gradient hover:opacity-90 transition-opacity text-white" asChild>
                  <Link href="/register">Start Free</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-accent transition-colors duration-200"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50"
          >
            <div className="px-6 py-4 space-y-4">
              <Link 
                href="#features" 
                className="block text-muted-foreground hover:text-primary transition-colors duration-200 py-2 font-medium"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="#pricing" 
                className="block text-muted-foreground hover:text-primary transition-colors duration-200 py-2 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Plans
              </Link>
              {user && (
                <Link 
                  href="/dashboard" 
                  className="block text-muted-foreground hover:text-primary transition-colors duration-200 py-2 flex items-center font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <BarChart3 className="w-4 h-4 mr-1" />
                  My Links
                </Link>
              )}
              
              <div className="pt-4 border-t border-border space-y-3">
                {user ? (
                  <Button className="w-full" asChild>
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <User className="w-4 h-4 mr-2" />
                        Sign In
                      </Link>
                    </Button>
                    <Button className="w-full lynx-gradient text-white" asChild>
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        Start Free
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}