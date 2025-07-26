/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Link2, Copy, QrCode, BarChart3, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { createUrlSchema, CreateUrlInput } from '@/lib/validations/url';
import { UrlController } from '@/lib/controllers/url-controller';
import { toast } from 'sonner';
import Link from 'next/link';

export function UrlShortenerForm() {
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const urlController = new UrlController();

  const form = useForm<CreateUrlInput>({
    resolver: zodResolver(createUrlSchema),
    defaultValues: {
      originalUrl: '',
      customCode: '',
      title: '',
      description: '',
    },
  });

  const onSubmit = async (data: CreateUrlInput) => {
    setIsLoading(true);
    
    try {
      const result = await urlController.createUrl(data);
      
      if (result.success && result.data) {
        setShortUrl(`${process.env.NEXT_PUBLIC_APP_URL}/${result.data.short_code}`);
        toast.success('Short link created successfully!');
      } else {
        toast.error(result.error || 'Failed to create short link');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
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
    form.reset();
    setShortUrl('');
    setCopied(false);
  };

  if (shortUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-400" />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Your Short Link is Ready!
          </h3>
          <p className="text-slate-300">
            Share it anywhere and track every click
          </p>
        </div>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 text-left">
              <p className="text-sm text-slate-400 mb-1">Short URL:</p>
              <p className="text-lg font-mono text-purple-400 break-all">
                {shortUrl}
              </p>
            </div>
            <Button
              onClick={copyToClipboard}
              variant="outline"
              size="sm"
              className="ml-4 border-white/20 text-slate-300 hover:bg-white/10"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
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
        </GlassCard>

        <div className="grid md:grid-cols-3 gap-4">
          <GlassCard className="p-4 text-center">
            <QrCode className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">QR Code</p>
            <p className="text-xs text-slate-400">Auto-generated</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <BarChart3 className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">Analytics</p>
            <p className="text-xs text-slate-400">Real-time tracking</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <Link2 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">Custom Link</p>
            <p className="text-xs text-slate-400">Branded domain</p>
          </GlassCard>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={reset}
            variant="outline"
            className="flex-1 border-white/20 text-slate-300 hover:bg-white/10"
          >
            Create Another Link
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
            asChild
          >
            <Link href="/dashboard">
              View Analytics
            </Link>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="originalUrl" className="text-slate-300 mb-2 block">
            Enter your long URL
          </Label>
          <Input
            id="originalUrl"
            type="url"
            placeholder="https://example.com/very-long-url-that-needs-shortening"
            className="h-14 text-lg bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
            {...form.register('originalUrl')}
          />
          {form.formState.errors.originalUrl && (
            <p className="text-red-400 text-sm mt-1">
              {form.formState.errors.originalUrl.message}
            </p>
          )}
        </div>
        
        <div>
          <Label htmlFor="customCode" className="text-slate-300 mb-2 block">
            Custom code (optional)
          </Label>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-sm">shortlink.com/</span>
            <Input
              id="customCode"
              type="text"
              placeholder="my-link"
              className="h-12 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
              {...form.register('customCode')}
            />
          </div>
          {form.formState.errors.customCode && (
            <p className="text-red-400 text-sm mt-1">
              {form.formState.errors.customCode.message}
            </p>
          )}
          <p className="text-xs text-slate-500 mt-1">
            Leave empty for auto-generated code
          </p>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Creating Short Link...
          </>
        ) : (
          <>
            <Link2 className="w-5 h-5 mr-2" />
            Create Short Link
          </>
        )}
      </Button>
    </form>
  );
}