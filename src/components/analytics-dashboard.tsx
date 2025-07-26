'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Eye, Link2, Calendar, TrendingUp, Globe, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { createClient } from '@/lib/supabase/client';

interface AnalyticsData {
  totalUrls: number;
  totalClicks: number;
  clicksToday: number;
  clicksThisWeek: number;
  topUrls: Array<{
    id: string;
    originalUrl: string;
    shortCode: string;
    clicks: number;
    title?: string;
  }>;
  clicksByDay: Array<{
    date: string;
    clicks: number;
  }>;
  deviceStats: Array<{
    device: string;
    count: number;
  }>;
  countryStats: Array<{
    country: string;
    count: number;
  }>;
}

const COLORS = ['#3B82F6', '#6366F1', '#8B5CF6', '#06B6D4', '#10B981'];

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const { user } = useAuth();
  const supabase = createClient();

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [timeRange, user]);

  const fetchAnalytics = async () => {
    if (!user) return;

    try {
      // Get user's URLs
      const { data: urls, error: urlsError } = await supabase
        .from('urls')
        .select('*')
        .eq('user_id', user.id);

      if (urlsError) throw urlsError;

      // Get analytics data
      const urlIds = urls?.map(url => url.id) || [];
      const { data: analytics, error: analyticsError } = await supabase
        .from('analytics')
        .select('*')
        .in('url_id', urlIds);

      if (analyticsError) throw analyticsError;

      // Process data
      const totalUrls = urls?.length || 0;
      const totalClicks = urls?.reduce((sum, url) => sum + (url.clicks || 0), 0) || 0;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const clicksToday = analytics?.filter(a => new Date(a.clicked_at) >= today).length || 0;
      
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const clicksThisWeek = analytics?.filter(a => new Date(a.clicked_at) >= weekAgo).length || 0;

      setData({
        totalUrls,
        totalClicks,
        clicksToday,
        clicksThisWeek,
        topUrls: urls?.sort((a, b) => (b.clicks || 0) - (a.clicks || 0)).slice(0, 10) || [],
        clicksByDay: [],
        deviceStats: [],
        countryStats: [],
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
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-4 w-4 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-16"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">No analytics data available</p>
        </CardContent>
      </Card>
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
          <Card className="rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Links</CardTitle>
              <Link2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalUrls}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalClicks}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.clicksToday}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.clicksThisWeek}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center space-x-2">
        <Button
          variant={timeRange === '7d' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTimeRange('7d')}
          className={timeRange === '7d' ? 'bg-blue-500 hover:bg-blue-600' : 'border-slate-300 text-slate-600 hover:bg-slate-50'}
        >
          7 Days
        </Button>
        <Button
          variant={timeRange === '30d' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTimeRange('30d')}
          className={timeRange === '30d' ? 'bg-blue-500 hover:bg-blue-600' : 'border-slate-300 text-slate-600 hover:bg-slate-50'}
        >
          30 Days
        </Button>
        <Button
          variant={timeRange === '90d' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTimeRange('90d')}
          className={timeRange === '90d' ? 'bg-blue-500 hover:bg-blue-600' : 'border-slate-300 text-slate-600 hover:bg-slate-50'}
        >
          90 Days
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="top-links">Top Links</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Click Trends</CardTitle>
              <CardDescription>
                Daily clicks over the selected time period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.clicksByDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="clicks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Monitor className="mr-2 h-4 w-4" />
                  Device Types
                </CardTitle>
              </CardHeader>
              <CardContent>
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
                      {data.deviceStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-4 w-4" />
                  Top Countries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.countryStats.slice(0, 5).map((country, index) => (
                    <div key={country.country} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm font-medium">{country.country}</span>
                      </div>
                      <Badge variant="secondary">{country.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="top-links" className="space-y-4">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Most Popular Links</CardTitle>
              <CardDescription>
                Your links ranked by click count
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topUrls.map((url, index) => (
                  <motion.div
                    key={url.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border rounded-md hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-muted-foreground">
                          #{index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          {url.title && (
                            <p className="font-medium text-sm">{url.title}</p>
                          )}
                          <p className="text-xs text-muted-foreground truncate">
                            {url.original_url}
                          </p>
                          <p className="text-xs font-mono text-primary">
                            /{url.short_code}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="ml-4">
                      {url.clicks} clicks
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}