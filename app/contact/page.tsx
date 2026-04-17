'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/lib/site-config';
import { Card, CardContent } from '@/components/ui/card';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Use Formspree for silent background submission
      // To activate: Replace 'YOUR_FORM_ID' in lib/site-config.ts with your actual Formspree ID
      const response = await fetch(`https://formspree.io/f/${siteConfig.contact.formspreeId}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        // Fallback or error handling
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: siteConfig.contact.phone,
      action: `tel:${siteConfig.contact.phone}`,
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: siteConfig.contact.email,
      action: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: siteConfig.contact.address,
      action: '#',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: `Mon-Sat: ${siteConfig.contact.openingHours.monSat}`,
      action: '#',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="bg-gray-50 py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Have questions about our packages or need help planning your next trip? Our team is here to help you.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            
            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.action}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="bg-blue-50 p-3 rounded-xl group-hover:bg-blue-600 transition-colors mr-4">
                    <info.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{info.title}</h3>
                    <p className="text-gray-600">{info.details}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="p-8 bg-blue-600 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <p className="mb-6 text-blue-100 italic">Stay connected with us for the latest travel updates and offers.</p>
              <div className="flex gap-4">
                <a href={siteConfig.social.facebook} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href={siteConfig.social.instagram} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href={siteConfig.social.twitter} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href={siteConfig.social.youtube} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
                
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600 mb-8">Thank you for reaching out. Our team will get back to you shortly.</p>
                    <Button onClick={() => setSubmitted(false)} variant="outline">
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <Input
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="rounded-xl border-gray-200 h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="rounded-xl border-gray-200 h-12"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <Input
                          placeholder="Your Phone Number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="rounded-xl border-gray-200 h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Subject</label>
                        <Input
                          placeholder="What is this about?"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                          className="rounded-xl border-gray-200 h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Message</label>
                      <Textarea
                        placeholder="How can we help you?"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        className="rounded-xl border-gray-200 resize-none p-4"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-200"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Placeholder */}
        <section className="mt-20">
          <div className="rounded-3xl overflow-hidden h-[400px] relative shadow-lg">
            {/* Using a placeholder image for map */}
            <Image
              src="https://images.pexels.com/photos/2859169/pexels-photo-2859169.jpeg"
              alt="Our Location Map"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100 max-w-xs text-center">
                <MapPin className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Visit Our Office</h3>
                <p className="text-gray-600 text-sm">{siteConfig.contact.address}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center gap-4">
                  <a href="#" className="text-blue-600 text-sm font-bold hover:underline">Get Directions</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
