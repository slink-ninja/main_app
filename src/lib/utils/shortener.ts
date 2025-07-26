import QRCode from 'qrcode';

// Generate a random short code
export function generateShortCode(length: number = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Validate URL format
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

// Check for malicious URLs (basic implementation)
export function isMaliciousUrl(url: string): boolean {
  const maliciousPatterns = [
    /malware/i,
    /phishing/i,
    /scam/i,
    /spam/i,
    /virus/i,
    /trojan/i,
  ];
  
  return maliciousPatterns.some(pattern => pattern.test(url));
}

// Generate QR Code
export async function generateQRCode(url: string): Promise<string> {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(url, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      width: 256,
    });
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

// Extract device, browser, and OS from user agent
export function parseUserAgent(userAgent: string) {
  const device = /Mobile|Android|iPhone|iPad/i.test(userAgent) ? 'Mobile' : 'Desktop';
  
  let browser = 'Unknown';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  
  let os = 'Unknown';
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iOS')) os = 'iOS';
  
  return { device, browser, os };
}

// Rate limiting utilities
const rateLimitMap = new Map();

export function rateLimit(identifier: string, windowMs: number = 60000, maxRequests: number = 10): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimitMap.has(identifier)) {
    rateLimitMap.set(identifier, []);
  }
  
  const requests = rateLimitMap.get(identifier);
  const validRequests = requests.filter((timestamp: number) => timestamp > windowStart);
  
  if (validRequests.length >= maxRequests) {
    return false;
  }
  
  validRequests.push(now);
  rateLimitMap.set(identifier, validRequests);
  
  return true;
}