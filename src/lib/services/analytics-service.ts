import { createClient } from '@/lib/supabase/client';
import { parseUserAgent } from '@/lib/utils/shortener';

export class AnalyticsService {
  private supabase = createClient();

  async trackClick(urlId: string, analyticsData: {
    ipAddress: string;
    userAgent: string;
    referrer?: string;
    country?: string;
    city?: string;
  }) {
    const { device, browser, os } = parseUserAgent(analyticsData.userAgent);

    const { error } = await this.supabase
      .from('analytics')
      .insert({
        url_id: urlId,
        ip_address: analyticsData.ipAddress,
        user_agent: analyticsData.userAgent,
        referrer: analyticsData.referrer || 'Direct',
        country: analyticsData.country || 'Unknown',
        city: analyticsData.city || 'Unknown',
        device,
        browser,
        os,
      });

    if (error) {
      throw new Error('Failed to track click');
    }
  }

  async getUserAnalytics(userId: string, timeRange: '7d' | '30d' | '90d') {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get user's URLs
    const { data: urls } = await this.supabase
      .from('urls')
      .select('id, clicks, original_url, short_code, title')
      .eq('user_id', userId);

    if (!urls) return null;

    const urlIds = urls.map(url => url.id);

    // Get analytics data
    const { data: analytics } = await this.supabase
      .from('analytics')
      .select('*')
      .in('url_id', urlIds)
      .gte('clicked_at', startDate.toISOString());

    const totalUrls = urls.length;
    const totalClicks = urls.reduce((sum, url) => sum + (url.clicks || 0), 0);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const clicksToday = analytics?.filter(a => new Date(a.clicked_at) >= today).length || 0;
    
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const clicksThisWeek = analytics?.filter(a => new Date(a.clicked_at) >= weekAgo).length || 0;

    return {
      totalUrls,
      totalClicks,
      clicksToday,
      clicksThisWeek,
      topUrls: urls.sort((a, b) => (b.clicks || 0) - (a.clicks || 0)).slice(0, 10),
    };
  }

  async getUrlAnalytics(urlId: string, timeRange: '7d' | '30d' | '90d') {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data: analytics } = await this.supabase
      .from('analytics')
      .select('*')
      .eq('url_id', urlId)
      .gte('clicked_at', startDate.toISOString());

    return analytics;
  }

  async getClicksByDay(userId: string, days: number) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data: urls } = await this.supabase
      .from('urls')
      .select('id')
      .eq('user_id', userId);

    if (!urls) return [];

    const urlIds = urls.map(url => url.id);

    const { data: analytics } = await this.supabase
      .from('analytics')
      .select('clicked_at')
      .in('url_id', urlIds)
      .gte('clicked_at', startDate.toISOString())
      .order('clicked_at');

    // Group by day
    const clicksByDay: { [key: string]: number } = {};
    analytics?.forEach(click => {
      const date = new Date(click.clicked_at).toISOString().split('T')[0];
      clicksByDay[date] = (clicksByDay[date] || 0) + 1;
    });

    return Object.entries(clicksByDay).map(([date, clicks]) => ({
      date,
      clicks,
    }));
  }

  async getDeviceStats(userId: string) {
    const { data: urls } = await this.supabase
      .from('urls')
      .select('id')
      .eq('user_id', userId);

    if (!urls) return [];

    const urlIds = urls.map(url => url.id);

    const { data: analytics } = await this.supabase
      .from('analytics')
      .select('device')
      .in('url_id', urlIds);

    const deviceStats: { [key: string]: number } = {};
    analytics?.forEach(click => {
      deviceStats[click.device] = (deviceStats[click.device] || 0) + 1;
    });

    return Object.entries(deviceStats).map(([device, count]) => ({
      device,
      count,
    }));
  }

  async getCountryStats(userId: string) {
    const { data: urls } = await this.supabase
      .from('urls')
      .select('id')
      .eq('user_id', userId);

    if (!urls) return [];

    const urlIds = urls.map(url => url.id);

    const { data: analytics } = await this.supabase
      .from('analytics')
      .select('country')
      .in('url_id', urlIds);

    const countryStats: { [key: string]: number } = {};
    analytics?.forEach(click => {
      countryStats[click.country] = (countryStats[click.country] || 0) + 1;
    });

    return Object.entries(countryStats)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count);
  }
}