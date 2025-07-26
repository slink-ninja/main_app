'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Link2, 
  Eye, 
  Calendar, 
  TrendingUp, 
  Plus, 
  Copy, 
  ExternalLink,
  BarChart3,
  Users,
  Globe,
  MousePointer,
  Zap,
  Target,
  Activity,
  Bell
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

// Mock data for demonstration
const mockStats = {
  totalUrls: 24,
  totalClicks: 1247,
  clicksToday: 89,
  clicksThisWeek: 456,
};

const mockChartData = [
  { date: '2024-01-20', clicks: 45, views: 67 },
  { date: '2024-01-21', clicks: 67, views: 89 },
  { date: '2024-01-22', clicks: 89, views: 123 },
  { date: '2024-01-23', clicks: 123, views: 156 },
  { date: '2024-01-24', clicks: 156, views: 189 },
  { date: '2024-01-25', clicks: 134, views: 167 },
  { date: '2024-01-26', clicks: 89, views: 134 },
];

const mockDeviceData = [
  { name: 'Desktop', value: 65, color: '#ff6b35' },
  { name: 'Mobile', value: 30, color: '#f7931e' },
  { name: 'Tablet', value: 5, color: '#10b981' },
];

const mockRecentLinks = [
  {
    id: '1',
    title: 'Product Launch Campaign',
    originalUrl: 'https://example.com/product-launch-2024',
    shortCode: 'launch24',
    clicks: 234,
    createdAt: '2024-01-25',
    trend: '+12%',
  },
  {
    id: '2',
    title: 'Q1 Marketing Campaign',
    originalUrl: 'https://example.com/marketing-campaign-q1',
    shortCode: 'mktg-q1',
    clicks: 189,
    createdAt: '2024-01-24',
    trend: '+8%',
  },
  {
    id: '3',
    title: 'Social Media Content',
    originalUrl: 'https://example.com/social-media-content',
    shortCode: 'social24',
    clicks: 156,
    createdAt: '2024-01-23',
    trend: '+15%',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function DashboardPage() {
  const { user } = useAuth();

  const copyLink = async (shortCode: string) => {
    const url = `https://slink.ninja/${shortCode}`;
    await navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight lynx-gradient-text">Link Dashboard</h1>
          <p className="text-muted-foreground text-lg mt-2">
            Manage your short links, <span className="font-semibold text-foreground">{user?.user_metadata?.name || user?.email}</span>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary">
            <Activity className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button className="lynx-gradient hover:opacity-90 text-white" asChild>
            <Link href="/dashboard/create">
              <Plus className="w-4 h-4 mr-2" />
              New Short Link
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {[
          {
            title: 'Total Links',
            value: mockStats.totalUrls,
            icon: Link2,
            description: 'Links created',
            trend: 'up',
            color: 'text-primary',
            bgColor: 'bg-primary/10',
          },
          {
            title: 'Link Clicks',
            value: mockStats.totalClicks.toLocaleString(),
            icon: MousePointer,
            description: 'Total clicks tracked',
            trend: 'up',
            color: 'text-orange-500',
            bgColor: 'bg-orange-500/10',
          },
          {
            title: 'Today',
            value: mockStats.clicksToday,
            icon: Calendar,
            description: 'Clicks today',
            trend: 'neutral',
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
          },
          {
            title: 'This Week',
            value: mockStats.clicksThisWeek,
            icon: TrendingUp,
            description: 'Weekly clicks',
            trend: 'up',
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
          },
        ].map((stat, index) => (
          <motion.div key={stat.title} variants={fadeInUp}>
            <Card className="hover:shadow-xl transition-all duration-300 border-0 lynx-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Analytics Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="col-span-4"
        >
          <Card className="border-0 lynx-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">Link Performance</CardTitle>
                  <CardDescription className="text-base">
                    Track clicks and views for your short links over time
                  </CardDescription>
                </div>
                <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  Real-time
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#ff6b35" 
                    strokeWidth={3}
                    dot={{ fill: '#ff6b35', strokeWidth: 2, r: 4 }}
                    name="Clicks"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#f7931e" 
                    strokeWidth={2}
                    dot={{ fill: '#f7931e', strokeWidth: 2, r: 3 }}
                    name="Views"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Device Analytics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="col-span-3"
        >
          <Card className="border-0 lynx-card h-full">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center">
                <Globe className="mr-2 h-5 w-5 text-primary" />
                Click Sources
              </CardTitle>
              <CardDescription>
                Device breakdown of your link clicks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={mockDeviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mockDeviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="space-y-3">
                  {mockDeviceData.map((device, index) => (
                    <div key={device.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: device.color }}
                        />
                        <span className="text-sm font-medium text-foreground">{device.name}</span>
                      </div>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground">
                        {device.value}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="border-0 lynx-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center">
                  <Target className="mr-2 h-5 w-5 text-primary" />
                  Top Performing Links
                </CardTitle>
                <CardDescription>
                  Your highest-performing short links
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/links">
                  View All Links
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentLinks.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-semibold text-foreground text-sm">
                          {link.title}
                        </p>
                        <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                          {link.trend}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        slink.ninja/{link.shortCode}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {link.createdAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="font-bold text-foreground">{link.clicks}</p>
                      <p className="text-xs text-muted-foreground">clicks</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyLink(link.shortCode)}
                        className="h-8 w-8 p-0 hover:bg-primary/10"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="h-8 w-8 p-0 hover:bg-primary/10"
                      >
                        <a href={link.originalUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}