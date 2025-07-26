'use client';

import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Eye, Link2, Calendar, TrendingUp, Globe, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { AnalyticsController } from '@/lib/controllers/analytics-controller';

const COLORS = ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444'];

export function AnalyticsDashboard() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const { user } = useAuth();
  const analyticsController = new AnalyticsController();

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [timeRange, user]);

  const fetchAnalytics = async () => {
    if (!user) return;

    try {
      const [analytics, clicksByDay, deviceStats, countryStats] = await Promise.all([
        analyticsController.getUserAnalytics(user.id, timeRange),
        analyticsController.getClicksByDay(user.id, timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90),
        analyticsController.getDeviceStats(user.id),
        analyticsController.getCountryStats(user.id),
      ]);

      setData({
        ...analytics.data,
        clicksByDay: clicksByDay.data || [],
        deviceStats: deviceStats.data || [],
        countryStats: countryStats.data || [],
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <GlassCard key={i} className="p-6 animate-pulse">
              <div className="h-4 bg-white/10 rounded w-20 mb-2"></div>
              <div className="h-8 bg-white/10 rounded w-16"></div>
            </GlassCard>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <GlassCard className="p-6 text-center">
        <p className="text-slate-400">No analytics data available</p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Total URLs</p>
                <p className="text-2xl font-bold text-white">{data.totalUrls}</p>
              </div>
              <Link2 className="h-8 w-8 text-purple-400" />
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Total Clicks</p>
                <p className="text-2xl font-bold text-white">{data.totalClicks}</p>
              </div>
              <Eye className="h-8 w-8 text-pink-400" />
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Today</p>
                <p className="text-2xl font-bold text-white">{data.clicksToday}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-400" />
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">This Week</p>
                <p className="text-2xl font-bold text-white">{data.clicksThisWeek}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center space-x-2">
        <Button
          variant={timeRange === '7d' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTimeRange('7d')}
          className={timeRange === '7d' ? 'bg-purple-500 hover:bg-purple-600' : 'border-white/20 text-slate-300'}
        >
          7 Days
        </Button>
        <Button
          variant={timeRange === '30d' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTimeRange('30d')}
          className={timeRange === '30d' ? 'bg-purple-500 hover:bg-purple-600' : 'border-white/20 text-slate-300'}
        >
          30 Days
        </Button>
        <Button
          variant={timeRange === '90d' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTimeRange('90d')}
          className={timeRange === '90d' ? 'bg-purple-500 hover:bg-purple-600' : 'border-white/20 text-slate-300'}
        >
          90 Days
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500">Overview</TabsTrigger>
          <TabsTrigger value="demographics" className="data-[state=active]:bg-purple-500">Demographics</TabsTrigger>
          <TabsTrigger value="top-links" className="data-[state=active]:bg-purple-500">Top Links</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Click Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.clicksByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="clicks" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Monitor className="mr-2 h-5 w-5" />
                Device Types
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data.deviceStats}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ device, percent }) => `${device} ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.deviceStats.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Top Countries
              </h3>
              <div className="space-y-3">
                {data.countryStats.slice(0, 5).map((country: any, index: number) => (
                  <div key={country.country} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm font-medium text-white">{country.country}</span>
                    </div>
                    <Badge variant="secondary" className="bg-white/10 text-slate-300">
                      {country.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </TabsContent>

        <TabsContent value="top-links" className="space-y-4">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Most Popular Links</h3>
            <div className="space-y-4">
              {data.topUrls?.map((url: any, index: number) => (
                <motion.div
                  key={url.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-slate-400">
                        #{index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        {url.title && (
                          <p className="font-medium text-sm text-white">{url.title}</p>
                        )}
                        <p className="text-xs text-slate-400 truncate">
                          {url.original_url}
                        </p>
                        <p className="text-xs font-mono text-purple-400">
                          /{url.short_code}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-4 bg-white/10 text-slate-300">
                    {url.clicks} clicks
                  </Badge>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}