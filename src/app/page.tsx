/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion } from "framer-motion";
import { UrlShortenerForm } from "@/components/url-shortener-form";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Link2,
  BarChart3,
  QrCode,
  Shield,
  Zap,
  Users,
  ArrowRight,
  Star,
  CheckCircle,
  Globe,
  Target,
  TrendingUp,
  Sparkles,
  Rocket,
  Eye,
  MousePointer,
} from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Badge
              variant="secondary"
              className="px-6 py-3 text-sm font-medium bg-primary/10 text-primary border-primary/20 animate-glow"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Ship Native for More
            </Badge>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight">
                <span className="block text-white">Transform Long URLs</span>
                <span className="block lynx-gradient-text">
                  Into Smart Links
                </span>
                <span className="block text-white text-4xl md:text-5xl lg:text-6xl font-light">
                  Shorten • Track • Optimize
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
                Create branded short links that drive results. Get real-time
                analytics, QR codes, and custom domains.
                <br className="hidden md:block" />
                <span className="font-medium text-white">
                  Perfect for marketers, businesses, and creators.
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Button
                size="lg"
                className="px-12 py-6 text-lg font-semibold lynx-gradient hover:opacity-90 transition-opacity shadow-2xl text-white"
                asChild
              >
                <Link href="#create">
                  Create Short Link
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-12 py-6 text-lg font-semibold border-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500 rounded-full transition-all duration-300"
                asChild
              >
                <Link href="#features">See How It Works</Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-12 text-sm text-slate-300">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-orange-400" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-orange-400" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-orange-400" />
                <span>Instant short links</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* URL Shortener Section */}
      <section id="create" className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 border-orange-500/40 bg-orange-950/30 text-orange-300"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Link Shortener
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Paste Your Long URL{" "}
              <span className="lynx-gradient-text">Get Short Link</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Transform any long URL into a short, branded link with click
              tracking and analytics
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <UrlShortenerForm />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 border-orange-500/40 bg-orange-950/30 text-orange-300"
            >
              <Zap className="w-4 h-4 mr-2" />
              Why Choose slink.ninja
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              More Than Just{" "}
              <span className="lynx-gradient-text">URL Shortening</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Get detailed insights, custom branding, and enterprise-grade
              security for all your short links
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Link2,
                title: "Lightning Fast Shortening",
                description:
                  "Convert any long URL into a short, memorable link instantly. No registration required for basic links.",
                gradient: "lynx-gradient",
              },
              {
                icon: BarChart3,
                title: "Real-Time Click Analytics",
                description:
                  "See exactly who clicks your links, when, and from where. Get detailed reports and insights.",
                gradient: "bg-gradient-to-r from-cyan-500 to-blue-600",
              },
              {
                icon: QrCode,
                title: "Instant QR Codes",
                description:
                  "Every short link comes with a QR code. Perfect for print materials, business cards, and offline marketing.",
                gradient: "bg-gradient-to-r from-green-500 to-emerald-600",
              },
              {
                icon: Shield,
                title: "Safe & Secure Links",
                description:
                  "All links are scanned for malware and phishing. Your audience can click with confidence.",
                gradient: "bg-gradient-to-r from-red-500 to-orange-600",
              },
              {
                icon: Globe,
                title: "Global Fast Redirects",
                description:
                  "Links redirect instantly worldwide. Our global network ensures your links work everywhere.",
                gradient: "bg-gradient-to-r from-indigo-500 to-purple-600",
              },
              {
                icon: Target,
                title: "Custom Branded Links",
                description:
                  "Use your own domain for branded short links. Build trust and recognition with every click.",
                gradient: "bg-gradient-to-r from-pink-500 to-rose-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="group"
              >
                <Card className="h-full p-8 hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-0 lynx-card">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-6">
                      <div
                        className={`p-4 rounded-2xl ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="font-bold text-2xl text-foreground mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join <span className="lynx-gradient-text">50,000+</span> Users
            </h2>
            <p className="text-lg text-slate-300">
              Marketers, businesses, and creators trust slink.ninja for
              professional URL shortening.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              {
                number: "10M+",
                label: "Links Created",
                icon: Link2,
                color: "text-orange-500",
              },
              {
                number: "500M+",
                label: "Clicks Tracked",
                icon: MousePointer,
                color: "text-orange-400",
              },
              {
                number: "50K+",
                label: "Happy Users",
                icon: Users,
                color: "text-green-500",
              },
              {
                number: "99.9%",
                label: "Uptime",
                icon: TrendingUp,
                color: "text-blue-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center group"
              >
                <Card className="p-8 hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-0 lynx-card">
                  <CardContent className="p-0">
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-orange-500/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <div className="text-4xl md:text-5xl font-black lynx-gradient-text mb-2">
                      {stat.number}
                    </div>
                    <div className="text-lg font-medium text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to create your{" "}
              <span className="lynx-gradient-text">first short link?</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Join thousands of marketers and businesses who use slink.ninja to
              create better short links. Start free - no signup required for
              basic links.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="px-12 py-6 text-lg font-semibold lynx-gradient hover:opacity-90 transition-opacity shadow-2xl text-white"
                asChild
              >
                <Link href="/register">
                  Create Free Account
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 lynx-gradient rounded-lg flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-lg lynx-gradient-text">
                    slink
                  </span>
                  <span className="font-bold text-lg text-foreground">
                    .ninja
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Professional URL shortening with click tracking, QR codes, and
                custom domains for modern marketers.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Link Shortener
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Click Analytics
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    QR Codes
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Custom Domains
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    API Docs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Link Status
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-6 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2024 slink.ninja. All rights reserved. Built with ❤️ for
              smarter URL shortening.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
