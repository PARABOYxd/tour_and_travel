import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about#team' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
  ],
  quickLinks: [
    { name: 'All Packages', href: '/packages' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ],
  destinations: [
    { name: 'Manali', href: '/packages?destination=manali' },
    { name: 'Goa', href: '/packages?destination=goa' },
    { name: 'Kerala', href: '/packages?destination=kerala' },
    { name: 'Rajasthan', href: '/packages?destination=rajasthan' },
    { name: 'Kashmir', href: '/packages?destination=kashmir' },
    { name: 'Andaman', href: '/packages?destination=andaman' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: siteConfig.social.facebook },
  { name: 'Twitter', icon: Twitter, href: siteConfig.social.twitter },
  { name: 'Instagram', icon: Instagram, href: siteConfig.social.instagram },
  { name: 'YouTube', icon: Youtube, href: siteConfig.social.youtube },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative h-20 w-20 mr-2">
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{siteConfig.name}</h3>
                <p className="text-sm text-gray-400">Explore • Connect • Discover</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted travel partner for unforgettable journeys across India and beyond. 
              We create memories that last a lifetime.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Popular Destinations</h4>
            <ul className="space-y-2">
              {footerLinks.destinations.map((destination) => (
                <li key={destination.name}>
                  <Link
                    href={destination.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {destination.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-400">
                  <p>{siteConfig.contact.address}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-sm text-gray-400">{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-sm text-gray-400">{siteConfig.contact.email}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-sm font-medium text-blue-400">Office Hours</p>
              <p className="text-xs text-gray-400">Mon - Sat: {siteConfig.contact.openingHours.monSat}</p>
              <p className="text-xs text-gray-400">Sunday: {siteConfig.contact.openingHours.sun}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}