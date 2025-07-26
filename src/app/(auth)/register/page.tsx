'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Mail, Lock, User, Zap, ArrowLeft, Sparkles, Rocket } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { z } from 'zod';
import { motion } from 'framer-motion';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterInput = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      await signUp(data.email, data.password, data.name);
      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Back to Home */}
      <div className="absolute top-6 left-6 z-10">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-center min-h-screen p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="border-0 lynx-card shadow-2xl">
            <CardHeader className="text-center pb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 lynx-gradient rounded-2xl flex items-center justify-center shadow-2xl animate-glow">
                    <Zap className="h-7 w-7 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Badge variant="outline" className="mb-4 px-3 py-1 border-primary/40 bg-primary/10 text-primary">
                  <Rocket className="w-3 h-3 mr-1" />
                  Start Free
                </Badge>
                <CardTitle className="text-3xl font-bold">
                  Create your <span className="lynx-gradient-text">free account</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Get custom short links, analytics, and QR codes
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-foreground">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-12 h-12 border-2 focus:border-primary transition-colors"
                      {...form.register('name')}
                    />
                  </div>
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-12 h-12 border-2 focus:border-primary transition-colors"
                      {...form.register('email')}
                    />
                  </div>
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a secure password"
                      className="pl-12 h-12 border-2 focus:border-primary transition-colors"
                      {...form.register('password')}
                    />
                  </div>
                  {form.formState.errors.password && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 lynx-gradient hover:opacity-90 transition-opacity text-white font-semibold shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Start Free Account
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground pt-4">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Sign in instead
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}