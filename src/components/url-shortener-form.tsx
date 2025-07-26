'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link2, Copy, QrCode, BarChart3, CheckCircle, Loader2, Lock, User, Plus, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { toast } from 'sonner';

export function UrlShortenerForm() {
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCustomCode, setShowCustomCode] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const code = customCode || Math.random().toString(36).substring(2, 8);
      setShortUrl(`https://slink.ninja/${code}`);
      setIsLoading(false);
      toast.success('Smart link created successfully!');
    }, 1500);
  };

  const copyToClipboard = async () => {
    if (shortUrl) {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const reset = () => {
    setUrl('');
    setCustomCode('');
    setShortUrl('');
    setCopied(false);
    setShowCustomCode(false);
  };

  const handleCustomCodeToggle = () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    setShowCustomCode(!showCustomCode);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-0 lynx-card shadow-2xl">
      <CardContent className="p-8">
        {!shortUrl ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="url" className="block text-sm font-semibold text-foreground mb-3">
                  Enter your long URL to shorten
                </label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/your-very-long-url-that-needs-shortening"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="h-14 text-base border-2 focus:border-primary transition-colors"
                  required
                />
              </div>
              
              {/* Custom Code Toggle */}
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCustomCodeToggle}
                  className="text-sm border-primary/20 hover:border-primary hover:bg-primary/10"
                >
                  {user ? (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      {showCustomCode ? 'Remove Custom Code' : 'Customize Short Link'}
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Custom Links (Sign Up Required)
                    </>
                  )}
                </Button>
                
                {!user && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <User className="w-3 h-3 mr-1" />
                    Sign up for branded links
                  </div>
                )}
              </div>

              {/* Custom Code Input */}
              {showCustomCode && user && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <label htmlFor="customCode" className="block text-sm font-semibold text-foreground">
                    Custom short code
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground text-sm font-mono bg-muted px-3 py-2 rounded-lg">slink.ninja/</span>
                    <Input
                      id="customCode"
                      type="text"
                      placeholder="my-campaign"
                      value={customCode}
                      onChange={(e) => setCustomCode(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      className="h-12 border-2 focus:border-primary transition-colors"
                      maxLength={20}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use letters, numbers, and hyphens (3-20 characters)
                  </p>
                </motion.div>
              )}
            </div>

            <Button
              type="submit"
              disabled={!url || isLoading}
              className="w-full h-14 text-base font-semibold lynx-gradient hover:opacity-90 transition-opacity shadow-lg text-white"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Smart Link...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Create Short Link
                </>
              )}
            </Button>

            {/* Login CTA for logged out users */}
            {!user && (
              <Card className="bg-gradient-to-r from-primary/10 to-orange-500/10 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5 text-primary mr-2" />
                    <p className="text-sm font-semibold text-foreground">
                      Unlock Premium Features
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Custom domains, detailed analytics, bulk shortening, and more
                  </p>
                  <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
                    <Link href="/login">
                      <User className="w-4 h-4 mr-2" />
                      Create Free Account
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 lynx-gradient rounded-full flex items-center justify-center animate-glow">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
                Short Link Created!
              </h3>
              <p className="text-muted-foreground">
                Your link is ready to share. Track clicks and get insights in real-time.
              </p>
            </div>

            <Card className="bg-gradient-to-r from-primary/5 to-orange-500/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-left">
                    <p className="text-xs text-muted-foreground mb-2 font-semibold">Your slink.ninja URL:</p>
                    <p className="text-lg font-mono lynx-gradient-text break-all font-bold">
                      {shortUrl}
                    </p>
                  </div>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="ml-4 border-primary/20 hover:border-primary hover:bg-primary hover:text-white"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-primary/5 to-orange-500/5 border-primary/20">
                <CardContent className="p-0">
                  <QrCode className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-sm font-semibold text-foreground">QR Code Ready</p>
                  <p className="text-xs text-muted-foreground">Download & share</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-orange-500/5 to-red-500/5 border-orange-500/20">
                <CardContent className="p-0">
                  <BarChart3 className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-foreground">Click Tracking</p>
                  <p className="text-xs text-muted-foreground">Live analytics</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20">
                <CardContent className="p-0">
                  <Link2 className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-foreground">Branded Link</p>
                  <p className="text-xs text-muted-foreground">Professional URL</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={reset}
                variant="outline"
                className="flex-1 border-2 hover:bg-accent"
              >
                Create Another Link
              </Button>
              <Button
                className="flex-1 lynx-gradient hover:opacity-90 text-white"
                asChild
              >
                <Link href={user ? "/dashboard" : "/login"}>
                  {user ? "View Dashboard" : "Get More Features"}
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}