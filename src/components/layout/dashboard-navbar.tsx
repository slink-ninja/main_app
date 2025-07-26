"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { Zap, User, LogOut } from "lucide-react";

export function DashboardNavbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="backdrop-blur-xl bg-slate-950/80 border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="font-black text-xl text-white">
            Short<span className="text-purple-400">Link</span>
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="flex items-center space-x-2 text-slate-300">
            <User className="h-4 w-4" />
            <span>{user?.user_metadata?.name || user?.email}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className="text-slate-300 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
