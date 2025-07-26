'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "ShortLink transformed our marketing campaigns. The analytics are incredibly detailed and help us make better decisions.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    rating: 5,
  },
  {
    quote: "The fastest link shortener I've ever used. Custom codes help maintain our brand identity across all campaigns.",
    author: "Mike Chen",
    role: "Digital Marketer",
    company: "GrowthLab",
    rating: 5,
  },
  {
    quote: "QR codes and targeting features are game-changers. Our conversion rates increased by 40% in just two months.",
    author: "Lisa Rodriguez",
    role: "Growth Manager",
    company: "StartupXYZ",
    rating: 5,
  },
];

export function TestimonialsSection() {
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
            What Our Users Say
          </h2>
          <p className="text-xl text-slate-300">
            Trusted by businesses and marketers worldwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <GlassCard className="h-full p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-slate-300 mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div>
                  <div className="font-bold text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-slate-400">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}