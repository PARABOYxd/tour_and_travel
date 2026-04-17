'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PackageCard from '@/components/PackageCard';
import packagesData from '@/data/packages.json';
import { siteConfig } from '@/lib/site-config';

function PackagesList() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const dest = searchParams.get('destination');
    
    if (search) setSearchTerm(search);
    if (dest) setSearchTerm(dest);
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  const categories = ['All', ...Array.from(new Set(packagesData.map(pkg => pkg.category)))];

  const filteredPackages = packagesData.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pkg.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
          <Input
            type="text"
            placeholder="Search destinations or packages..."
            className="pl-10 h-12 rounded-xl border-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full px-6"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Packages Grid */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <PackageCard package={pkg} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No packages found</h3>
          <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
          <Button 
            variant="link" 
            onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
            className="mt-4 text-blue-600"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}

export default function PackagesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header Section */}
      <section className="bg-blue-600 py-16 text-white mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Explore Our Tour Packages
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Discover carefully curated journeys designed to provide you with the most memorable experiences.
          </motion.p>
        </div>
      </section>

      <Suspense fallback={<div className="text-center py-20">Loading packages...</div>}>
        <PackagesList />
      </Suspense>
    </div>
  );
}
