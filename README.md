# slink.ninja - Smart URL Shortener

A modern, production-ready URL shortener application built with Next.js 14, featuring real-time analytics, custom short links, and advanced tracking capabilities.

## 🚀 Features

### Core Functionality
- **Instant URL Shortening**: Transform long URLs into memorable short links
- **Custom Short Codes**: Create branded links with personalized aliases
- **QR Code Generation**: Automatic QR code creation for every short link
- **Link Management**: Comprehensive dashboard for organizing all your links

### Analytics & Insights
- **Real-time Click Tracking**: Monitor link performance as it happens
- **Detailed Analytics**: Track clicks, analyze traffic sources, and understand your audience
- **Geographic Data**: See where your clicks are coming from worldwide
- **Device Analytics**: Monitor desktop vs mobile usage patterns
- **Browser & OS Tracking**: Understand your audience's technical preferences

### Security & Performance
- **Link Security**: Automatic scanning for malicious URLs
- **Rate Limiting**: Intelligent protection against abuse
- **Global CDN**: Lightning-fast redirects worldwide
- **HTTPS Redirects**: Secure redirects for all shortened URLs

### User Experience
- **Lynx-Inspired Design**: Modern dark theme with coral orange accents
- **Responsive Design**: Mobile-first design that works on all devices
- **Smooth Animations**: Delightful micro-interactions and transitions
- **Real-time Feedback**: Instant notifications and status updates

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with email/password
- **UI Components**: Shadcn/ui + Radix UI
- **Styling**: Tailwind CSS with custom Lynx-inspired theme
- **Validation**: Zod for type-safe validation
- **Charts**: Recharts for analytics visualization
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: Sonner (React Hot Toast)

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- Supabase account and project

### 1. Clone and Install
```bash
git clone <repository-url>
cd slink-ninja
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
# In production: https://slink.ninja
```

### 3. Database Setup
The application uses Supabase with the following tables:
- `urls` - Stores original URLs, short codes, and metadata
- `analytics` - Tracks click data and user interactions

Migration files are located in `/supabase/migrations/`:
- `20250726144240_humble_flame.sql` - Creates URLs table
- `20250726144248_foggy_oasis.sql` - Creates Analytics table

### 4. Run the Application
```bash
# Development
npm run dev

# Production Build
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Deploy to Vercel**:
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Set Environment Variables** in Vercel Dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `NEXT_PUBLIC_APP_URL`: Your production domain (https://slink.ninja)

3. **Supabase Configuration**:
   - Ensure your Supabase project is properly configured
   - Add your Vercel domain to Supabase Auth settings
   - Configure RLS policies for security

## 📊 Database Schema

### URLs Table
```sql
CREATE TABLE urls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  original_url text NOT NULL,
  short_code text UNIQUE NOT NULL,
  custom_code text UNIQUE,
  title text,
  description text,
  user_id uuid REFERENCES auth.users(id),
  clicks integer DEFAULT 0,
  is_active boolean DEFAULT true,
  expires_at timestamptz,
  qr_code text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### Analytics Table
```sql
CREATE TABLE analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url_id uuid REFERENCES urls(id) ON DELETE CASCADE NOT NULL,
  ip_address text NOT NULL,
  user_agent text NOT NULL,
  country text DEFAULT 'Unknown',
  city text DEFAULT 'Unknown',
  referrer text DEFAULT 'Direct',
  device text NOT NULL,
  browser text NOT NULL,
  os text NOT NULL,
  clicked_at timestamptz DEFAULT now()
);
```

## 🔧 API Endpoints

### URL Management
- `POST /api/urls/create` - Create short URL
- `GET /api/urls` - Get user's URLs (authenticated)
- `PUT /api/urls/[id]` - Update URL (authenticated)
- `DELETE /api/urls/[id]` - Delete URL (authenticated)

### Analytics
- `GET /api/analytics` - Get analytics data (authenticated)
- `GET /api/analytics/[id]` - Get URL-specific analytics

### Redirects
- `GET /[shortCode]` - Redirect to original URL (tracks analytics)

## 🛡 Security Features

### Input Validation
- URL format validation with Zod schemas
- Custom code format restrictions
- XSS prevention through input sanitization
- SQL injection prevention

### Rate Limiting
- IP-based rate limiting for URL creation
- Configurable limits per time window
- Abuse prevention mechanisms

### Authentication Security
- Supabase Auth with secure session management
- Row Level Security (RLS) policies
- Secure cookie settings in production

### Link Security
- Basic malicious URL detection
- Extensible security rule system
- Safe redirect mechanisms

## 📈 Analytics Features

### Click Tracking
- Real-time click counting
- Detailed click history
- Time-based analytics (daily, weekly, monthly)

### Geographic Analytics
- Country-level tracking
- City-level tracking (with IP geolocation)
- Regional traffic analysis

### Technology Analytics
- Device type detection (Mobile/Desktop)
- Browser identification
- Operating system tracking
- User agent analysis

### Traffic Sources
- Referrer tracking
- Direct vs referred traffic
- Social media source identification

## 🎨 Design System

### Color Theme (Lynx-Inspired)
- **Primary**: Coral Orange (#ff6b35)
- **Secondary**: Orange Accent (#f7931e)
- **Background**: Dark theme with glass morphism
- **Text**: High contrast white on dark

### Components
- Glass morphism cards with backdrop blur
- Smooth animations and transitions
- Responsive grid layouts
- Accessible design patterns

## 🧪 Development

### Project Structure
```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   └── [shortCode]/       # Dynamic redirect route
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── dashboard/        # Dashboard-specific components
│   └── forms/            # Form components
├── lib/                  # Utilities and services
│   ├── supabase/         # Supabase client configuration
│   ├── services/         # Business logic services
│   └── utils/            # Helper functions
├── hooks/                # Custom React hooks
└── supabase/            # Database migrations
```

### Key Services
- `UrlService` - URL creation and management
- `AnalyticsService` - Click tracking and analytics
- `UrlController` - Business logic coordination

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the excellent React framework
- [Supabase](https://supabase.com/) for the backend-as-a-service platform
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lynx](https://lynxjs.org/) for design inspiration
- [Vercel](https://vercel.com/) for seamless deployment

## 📞 Support

For support, email support@slink.ninja or create an issue in this repository.

---

Built with ❤️ for smarter URL shortening • **slink.ninja**