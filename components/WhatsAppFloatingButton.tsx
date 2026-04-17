'use client';

import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { motion } from 'framer-motion';

export default function WhatsAppFloatingButton() {
  const whatsappNumber = siteConfig.contact.whatsapp.replace(/\D/g, '');
  const message = encodeURIComponent(`Hi ${siteConfig.name}, I have an inquiry about a tour package.`);
  
  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all flex items-center justify-center group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle className="h-8 w-8" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-bold whitespace-nowrap">
        Chat with us
      </span>
    </motion.a>
  );
}
