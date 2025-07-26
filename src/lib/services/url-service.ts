import { createClient } from '@/lib/supabase/client';
import { generateShortCode, generateQRCode, isValidUrl, isMaliciousUrl } from '@/lib/utils/shortener';
import { CreateUrlInput } from '@/lib/validations/url';

export class UrlService {
  private supabase = createClient();

  async createUrl(data: CreateUrlInput, userId?: string) {
    // Validate URL
    if (!isValidUrl(data.originalUrl)) {
      throw new Error('Invalid URL format');
    }

    // Check for malicious URLs
    if (isMaliciousUrl(data.originalUrl)) {
      throw new Error('URL appears to be malicious');
    }

    // Generate short code
    const shortCode = data.customCode || generateShortCode();

    // Check if short code already exists
    const { data: existingUrl } = await this.supabase
      .from('urls')
      .select('id')
      .eq('short_code', shortCode)
      .single();

    if (existingUrl) {
      throw new Error('Short code already exists');
    }

    // Generate QR code
    const qrCode = await generateQRCode(`${process.env.NEXT_PUBLIC_APP_URL}/${shortCode}`);

    // Create URL record
    const { data: url, error } = await this.supabase
      .from('urls')
      .insert({
        original_url: data.originalUrl,
        short_code: shortCode,
        custom_code: data.customCode,
        title: data.title,
        description: data.description,
        user_id: userId,
        qr_code: qrCode,
        expires_at: data.expiresAt ? new Date(data.expiresAt).toISOString() : null,
      })
      .select()
      .single();

    if (error) {
      throw new Error('Failed to create URL');
    }

    return url;
  }

  async getUserUrls(userId: string) {
    const { data, error } = await this.supabase
      .from('urls')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error('Failed to fetch URLs');
    }

    return data;
  }

  async getUrlByShortCode(shortCode: string) {
    const { data, error } = await this.supabase
      .from('urls')
      .select('*')
      .eq('short_code', shortCode)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      throw new Error('URL not found');
    }

    // Check if URL is expired
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      throw new Error('URL has expired');
    }

    return data;
  }

  async incrementClicks(urlId: string) {
    const { error } = await this.supabase.rpc('increment_clicks', {
      url_id: urlId
    });

    if (error) {
      throw new Error('Failed to increment clicks');
    }
  }

  async deleteUrl(urlId: string, userId: string) {
    const { error } = await this.supabase
      .from('urls')
      .delete()
      .eq('id', urlId)
      .eq('user_id', userId);

    if (error) {
      throw new Error('Failed to delete URL');
    }
  }

  async updateUrl(urlId: string, userId: string, updates: Partial<CreateUrlInput>) {
    const { data, error } = await this.supabase
      .from('urls')
      .update(updates)
      .eq('id', urlId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw new Error('Failed to update URL');
    }

    return data;
  }
}