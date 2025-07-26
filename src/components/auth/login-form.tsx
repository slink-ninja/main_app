'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginInput = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      toast.success('Welcome back!');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-slate-300">Email</Label>
          <div className="relative mt-2">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10 h-11 bg-white/5 border-white/20 text-white placeholder:text-slate-400"
              {...form.register('email')}
            />
          </div>
          {form.formState.errors.email && (
            <p className="text-red-400 text-sm mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="text-slate-300">Password</Label>
          <div className="relative mt-2">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="pl-10 h-11 bg-white/5 border-white/20 text-white placeholder:text-slate-400"
              {...form.register('password')}
            />
          </div>
          {form.formState.errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </Button>

      <p className="text-center text-sm text-slate-400">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-medium text-purple-400 hover:text-purple-300"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}