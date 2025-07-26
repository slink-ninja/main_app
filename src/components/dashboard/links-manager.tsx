'use client';

import { useEffect, useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink, Trash2, Edit } from 'lucide-react';
import { UrlController } from '@/lib/controllers/url-controller';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

export function LinksManager() {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const urlController = new UrlController();

  useEffect(() => {
    if (user) {
      fetchLinks();
    }
  }, [user]);

  const fetchLinks = async () => {
    if (!user) return;
    
    setIsLoading(true);
    const result = await urlController.getUserUrls(user.id);
    if (result.success && result.data) {
      setLinks(result.data);
    }
    setIsLoading(false);
  };

  const copyLink = async (shortCode: string) => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/${shortCode}`;
    await navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  const deleteLink = async (linkId: string) => {
    if (!user) return;
    
    const result = await urlController.deleteUrl(linkId, user.id);
    if (result.success) {
      toast.success('Link deleted successfully!');
      fetchLinks(); // Refresh the list
    } else {
      toast.error(result.error || 'Failed to delete link');
    }
  };

  if (isLoading) {
    return (
      <GlassCard className="p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-white/10 rounded-lg"></div>
          ))}
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Your Links</h3>
      <div className="space-y-4">
        {links.length === 0 ? (
          <p className="text-slate-400 text-center py-8">
            No links created yet. Create your first link!
          </p>
        ) : (
          links.map((link: any) => (
            <div key={link.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-white truncate">
                      {link.title || 'Untitled Link'}
                    </h4>
                    <Badge variant="secondary" className="bg-white/10 text-slate-300">
                      {link.clicks} clicks
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400 truncate mb-1">
                    {link.original_url}
                  </p>
                  <p className="text-sm font-mono text-purple-400">
                    {process.env.NEXT_PUBLIC_APP_URL}/{link.short_code}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Created {new Date(link.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyLink(link.short_code)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-slate-400 hover:text-white"
                  >
                    <a href={link.original_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteLink(link.id)}
                    className="text-slate-400 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </GlassCard>
  );
}