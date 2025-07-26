import { UrlService } from '@/lib/services/url-service';
import { AnalyticsService } from '@/lib/services/analytics-service';
import { CreateUrlInput } from '@/lib/validations/url';

export class UrlController {
  private urlService: UrlService;
  private analyticsService: AnalyticsService;

  constructor() {
    this.urlService = new UrlService();
    this.analyticsService = new AnalyticsService();
  }

  async createUrl(data: CreateUrlInput, userId?: string) {
    try {
      const url = await this.urlService.createUrl(data, userId);
      return { success: true, data: url };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create URL' 
      };
    }
  }

  async getUserUrls(userId: string) {
    try {
      const urls = await this.urlService.getUserUrls(userId);
      return { success: true, data: urls };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch URLs' 
      };
    }
  }

  async getUrlByShortCode(shortCode: string) {
    try {
      const url = await this.urlService.getUrlByShortCode(shortCode);
      return { success: true, data: url };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'URL not found' 
      };
    }
  }

  async trackClick(urlId: string, analyticsData: any) {
    try {
      await this.analyticsService.trackClick(urlId, analyticsData);
      await this.urlService.incrementClicks(urlId);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to track click' 
      };
    }
  }

  async deleteUrl(urlId: string, userId: string) {
    try {
      await this.urlService.deleteUrl(urlId, userId);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete URL' 
      };
    }
  }
}