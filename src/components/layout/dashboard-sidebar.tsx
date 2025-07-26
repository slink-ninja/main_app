'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Link2, 
  BarChart3, 
  Settings, 
  Plus 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Links', href: '/dashboard/links', icon: Link2 },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 backdrop-blur-xl bg-slate-950/50 border-r border-white/10 min-h-screen p-6">
      <div className="space-y-6">
        <Link
          href="/dashboard/create"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Link
        </Link>

        <nav className="space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200',
                pathname === item.href
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              )}
            >
              <item.icon className="h-4 w-4 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}