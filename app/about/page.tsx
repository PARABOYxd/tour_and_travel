'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, Users, MapPin, Calendar, Award, Star } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  { label: 'Happy Travelers', value: '10,000+', icon: Users },
  { label: 'Destinations', value: '50+', icon: MapPin },
  { label: 'Years Experience', value: '12+', icon: Calendar },
  { label: 'Tour Packages', value: '100+', icon: Award },
];

const values = [
  {
    title: 'Customer Satisfaction',
    description: 'We prioritize our customers needs and strive to exceed their expectations in every journey.',
    icon: Star,
  },
  {
    title: 'Expert Guidance',
    description: 'Our experienced travel consultants provide personalized advice to help you plan the perfect trip.',
    icon: Award,
  },
  {
    title: 'Best Value',
    description: 'We offer competitive pricing and high-quality services to ensure you get the best value for your money.',
    icon: CheckCircle2,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg"
          alt="Travel landscape"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            About {siteConfig.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto"
          >
            Crafting unforgettable memories since 2012
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  Founded in 2012, <strong>{siteConfig.name}</strong> started with a simple mission: to make world-class travel accessible and enjoyable for everyone. What began as a small family project has grown into one of Indias most trusted travel partners.
                </p>
                <p>
                  We believe that travel is not just about visiting new places, but about the experiences that transform us. Our team of passionate travel enthusiasts works tirelessly to curate unique tour packages that blend comfort, adventure, and cultural immersion.
                </p>
                <p>
                  Headquartered in {siteConfig.contact.address}, we have expanded our services to cover breathtaking destinations across India and the globe, focusing on delivery quality service and personalized attention to every traveler.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg"
                alt="Our team"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <Icon className="h-8 w-8 mx-auto mb-4 opacity-80" />
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-100 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at {siteConfig.name}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
                    <CardContent className="p-8 text-center">
                      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Next Adventure?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of happy travelers and discover the world with us.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/packages" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-colors">
                  View Our Packages
                </a>
                <a href="/contact" className="px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-full font-bold transition-colors">
                  Contact Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
