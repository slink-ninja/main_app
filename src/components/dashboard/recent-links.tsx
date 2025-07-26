/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { UrlController } from "@/lib/controllers/url-controller";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export function RecentLinks() {
  const [links, setLinks] = useState<any[]>([]);
  const { user } = useAuth();
  const urlController = new UrlController();

  useEffect(() => {
    if (user) {
      fetchLinks();
    }
  }, [user]);

  const fetchLinks = async () => {
    if (!user) return;

    const result = await urlController.getUserUrls(user.id);
    if (result.success && result.data) {
      setLinks(result.data.slice(0, 5)); // Show only 5 recent links
    }
  };

  const copyLink = async (shortCode: string) => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/${shortCode}`;
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Links</h3>
      <div className="space-y-4">
        {links.length === 0 ? (
          <p className="text-slate-400 text-center py-8">
            No links created yet. Create your first link!
          </p>
        ) : (
          links.map((link: any) => (
            <div
              key={link.id}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">
                  {link.title || link.original_url}
                </p>
                <p className="text-sm text-slate-400 truncate">
                  /{link.short_code}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {link.clicks} clicks
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyLink(link.short_code)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href={link.original_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </GlassCard>
  );
}
