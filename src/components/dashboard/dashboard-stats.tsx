'use client';

import { useEffect, useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Link2, Eye, Calendar, TrendingUp } from 'lucide-react';
import { AnalyticsController } from '@/lib/controllers/analytics-controller';
import { useAuth } from '@/hooks/use-auth';

export function DashboardStats() {
  const [stats, setStats] = useState({
    totalUrls: 0,
    totalClicks: 0,
    clicksToday: 0,
    clicksThisWeek: 0,
  });
  const { user } = useAuth();
  const analyticsController = new AnalyticsController();

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    if (!user) return;
    
    const result = await analyticsController.getUserAnalytics(user.id);
    if (result.success && result.data) {
      setStats(result.data);
    }
  };

  const statCards = [
    {
      title: 'Total URLs',
      value: stats.totalUrls,
      icon: Link2,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Total Clicks',
      value: stats.totalClicks,
      icon: Eye,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Today',
      value: stats.clicksToday,
      icon: Calendar,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'This Week',
      value: stats.clicksThisWeek,
      icon: TrendingUp,
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <GlassCard key={stat.title} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">{stat.title}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full bg-gradient-to-r ${stat.gradient}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}