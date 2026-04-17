'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/site-config';

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Information We Collect',
      content: `We collect personal information that you provide to us when you make a booking or inquiry. This includes:
      • Name and contact details (email, phone number)
      • Identification documents for travel permits
      • Payment information
      • Travel preferences and special requirements`
    },
    {
      title: '2. How We Use Your Information',
      content: `Your information is used to:
      • Process and confirm your travel bookings
      • Communicate regarding your itinerary or changes
      • Provide personalized travel recommendations
      • Improve our customer service and website experience`
    },
    {
      title: '3. Data Sharing',
      content: `We share your information only with necessary third parties involved in your travel, such as:
      • Hotels and accommodation providers
      • Transportation services
      • Local tour operators and guides
      • Government authorities for mandatory permits`
    },
    {
      title: '4. Data Security',
      content: `We implement a variety of security measures to maintain the safety of your personal information. Your sensitive data is transmitted via Secure Socket Layer (SSL) technology and is only accessible by authorized personnel.`
    },
    {
      title: '5. Cookies',
      content: `Our website uses cookies to enhance your browsing experience and analyze site traffic. You can choose to disable cookies through your browser settings, though some site features may function differently.`
    },
    {
      title: '6. Your Rights',
      content: `You have the right to access, correct, or request deletion of your personal data. To exercise these rights, please contact us at our official email address.`
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
            Privacy Policy
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
            <p>For any privacy concerns, please email us at {siteConfig.contact.email}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
