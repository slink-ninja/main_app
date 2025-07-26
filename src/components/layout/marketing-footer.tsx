import Link from 'next/link';
import { Zap } from 'lucide-react';

export function MarketingFooter() {
  return (
    <footer className="relative py-16 px-6 bg-gradient-to-b from-slate-950 to-black border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-black text-xl text-white">
                Short<span className="text-purple-400">Link</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              The most powerful URL shortener with advanced analytics and security features.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Features</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="#features" className="hover:text-purple-400 transition-colors">Link Shortener</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Analytics</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">QR Codes</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">API</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="#" className="hover:text-purple-400 transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Status</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
          <p>&copy; 2024 ShortLink. All rights reserved. Built with ❤️ for better links.</p>
        </div>
      </div>
    </footer>
  );
}