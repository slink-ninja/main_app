import { AnalyticsService } from '@/lib/services/analytics-service';

export class AnalyticsController {
  private analyticsService: AnalyticsService;

  constructor() {
    this.analyticsService = new AnalyticsService();
  }

  async getUserAnalytics(userId: string, timeRange: '7d' | '30d' | '90d' = '7d') {
    try {
      const analytics = await this.analyticsService.getUserAnalytics(userId, timeRange);
      return { success: true, data: analytics };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch analytics' 
      };
    }
  }

  async getUrlAnalytics(urlId: string, timeRange: '7d' | '30d' | '90d' = '7d') {
    try {
      const analytics = await this.analyticsService.getUrlAnalytics(urlId, timeRange);
      return { success: true, data: analytics };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch URL analytics' 
      };
    }
  }

  async getClicksByDay(userId: string, days: number = 7) {
    try {
      const data = await this.analyticsService.getClicksByDay(userId, days);
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch clicks data' 
      };
    }
  }

  async getDeviceStats(userId: string) {
    try {
      const data = await this.analyticsService.getDeviceStats(userId);
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch device stats' 
      };
    }
  }

  async getCountryStats(userId: string) {
    try {
      const data = await this.analyticsService.getCountryStats(userId);
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch country stats' 
      };
    }
  }
}