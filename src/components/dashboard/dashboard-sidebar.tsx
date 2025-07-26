'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  LayoutDashboard, 
  Link2, 
  BarChart3, 
  Settings, 
  Plus,
  LogOut,
  User,
  Search,
  Zap,
  TrendingUp,
  Eye,
  Target,
  Sparkles
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Links', href: '/dashboard/links', icon: Link2 },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <aside className="w-72 border-r bg-card/30 backdrop-blur-sm min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <Link href="/dashboard" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="w-10 h-10 lynx-gradient rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-bold text-xl lynx-gradient-text">slink</span>
            <span className="font-bold text-xl text-foreground">.ninja</span>
          </div>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="p-4 space-y-3">
        <Button className="w-full lynx-gradient hover:opacity-90 shadow-lg text-white" asChild>
          <Link href="/dashboard/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Short Link
          </Link>
        </Button>
        
        <Button variant="outline" size="sm" className="w-full justify-start border-border/50 hover:bg-accent/50">
          <Search className="h-4 w-4 mr-2" />
          Search links...
        </Button>
      </div>

      <Separator className="mx-4" />

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200',
                pathname === item.href
                  ? 'lynx-gradient text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              )}
            >
              <item.icon className="h-4 w-4 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
        
        <Separator className="my-6" />
        
        {/* Quick Stats */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Quick Stats
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
              <div className="flex items-center space-x-2">
                <Link2 className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-foreground">Links Created</span>
              </div>
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">24</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-orange-500/5 to-orange-500/10 border border-orange-500/20">
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-orange-500" />
                <span className="text-xs font-medium text-foreground">Link Clicks</span>
              </div>
              <Badge variant="secondary" className="text-xs bg-orange-500/10 text-orange-600 border-orange-500/20">1.2K</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-500/5 to-green-500/10 border border-green-500/20">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-xs font-medium text-foreground">This Week</span>
              </div>
              <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">+15%</Badge>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Upgrade Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-orange-500/10 border border-primary/20">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Upgrade Plan</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Get custom domains, bulk shortening, and detailed analytics
          </p>
          <Button size="sm" className="w-full lynx-gradient hover:opacity-90 text-xs text-white">
            View Plans
          </Button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border/50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start p-3 h-auto hover:bg-accent/50">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="lynx-gradient text-white text-sm font-semibold">
                    {user?.user_metadata?.name?.[0] || user?.email?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold leading-none text-foreground">
                    {user?.user_metadata?.name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {user?.email}
                  </p>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none">
                  {user?.user_metadata?.name || 'User'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                <User className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/analytics">
                <Target className="mr-2 h-4 w-4" />
                <span>Link Analytics</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}