'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/site-config';

export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using the services of ${siteConfig.name}, you agree to be bound by these Terms and Conditions. Our services include tour packages, hotel bookings, transportation, and custom travel itineraries.`
    },
    {
      title: '2. Booking and Payments',
      content: `All bookings are subject to availability. A booking is considered confirmed only after receipt of the specified advance payment. The remaining balance must be cleared as per the payment schedule provided at the time of booking. We accept various payment methods as mentioned in our secure payment gateway.`
    },
    {
      title: '3. Cancellation and Refunds',
      content: `Cancellations must be intimated in writing. Refund amounts depend on the timing of the cancellation:
      • 30+ days before departure: 90% refund
      • 15-29 days before departure: 50% refund
      • Less than 15 days: No refund
      Please note that certain bookings (like flight tickets or special event permits) may be non-refundable as per third-party policies.`
    },
    {
      title: '4. Traveler Responsibilities',
      content: `Travelers are responsible for carrying valid identification (Aadhar Card, Passport, etc.) and necessary permits. Any loss or damage to personal belongings during the tour is the sole responsibility of the traveler.`
    },
    {
      title: '5. Health and Insurance',
      content: `We strongly recommend all travelers to obtain comprehensive travel and health insurance. Some high-altitude tours (like Kedarnath or Ladakh) require a medical fitness certificate.`
    },
    {
      title: '6. Limitation of Liability',
      content: `${siteConfig.name} acts as an intermediary between travelers and service providers (hotels, transporters, etc.). While we strive for excellence, we are not liable for delays, accidents, or losses caused by third-party service providers or natural calamities.`
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 border-b pb-6">
            Terms and Conditions
          </h1>
          
          <p className="text-gray-500 mb-8 italic">Last Updated: April 2024</p>
          
          <div className="space-y-10">
            {sections.map((section, index) => (
              <motion.section
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </motion.section>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 text-center text-gray-500 text-sm">
            <p>If you have any questions regarding these terms, please contact us at {siteConfig.contact.email}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
