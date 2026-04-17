'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/site-config';

interface Package {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  destination: string;
  rating: number;
  reviewCount: number;
  images: string[];
  featured?: boolean;
}

interface PackageCardProps {
  package: Package;
  className?: string;
}

export default function PackageCard({ package: pkg, className }: PackageCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={cn(
        "bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group",
        className
      )}
    >
      <div className="relative">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={pkg.images[0]}
            alt={pkg.title}
            fill
            className={cn(
              "object-cover group-hover:scale-105 transition-transform duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Featured badge */}
          {pkg.featured && (
            <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600">
              Featured
            </Badge>
          )}
          

          
          {/* Price */}
          {siteConfig.showPrices && (
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-sm opacity-90">From</p>
              <p className="text-xl font-bold">₹{pkg.price.toLocaleString()}</p>
              <p className="text-xs opacity-75">per person</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {pkg.category}
          </Badge>
          <div className="flex items-center text-sm text-gray-600">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="font-medium">{pkg.rating}</span>
            <span className="text-gray-400 ml-1">({pkg.reviewCount})</span>
          </div>
        </div>

        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {pkg.title}
        </h3>

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{pkg.destination}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {pkg.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{pkg.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span>Group Tour</span>
          </div>
        </div>

        <Link href={`/packages/${pkg.slug}`}>
          <Button className="w-full group-hover:bg-blue-700 transition-colors">
            View Details
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}