'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/ui/glass-card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for personal use',
    features: [
      '1,000 links per month',
      'Basic analytics',
      'QR code generation',
      'Email support',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per month',
    description: 'For growing businesses',
    features: [
      'Unlimited links',
      'Advanced analytics',
      'Custom domains',
      'Team collaboration',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$39',
    period: 'per month',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'White-label solution',
      'API access',
      'SSO integration',
      'Dedicated support',
    ],
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Simple Pricing
          </h2>
          <p className="text-xl text-slate-300">
            Choose the plan that fits your needs. Start free, upgrade anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              <GlassCard className={`h-full p-8 ${plan.popular ? 'border-purple-500/50 shadow-2xl scale-105' : ''}`}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-slate-300 mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-5xl font-black text-white">
                      {plan.price}
                    </span>
                    <span className="text-slate-400 ml-2">
                      {plan.period}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-slate-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-6 text-lg font-semibold rounded-full transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg' 
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                  asChild
                >
                  <Link href="/register">
                    Get Started
                  </Link>
                </Button>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}