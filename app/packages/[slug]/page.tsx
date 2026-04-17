'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, MapPin, Users, Star, CheckCircle2, XCircle, 
  ChevronRight, Calendar, Info, Phone, Mail, ArrowLeft,
  Share2, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { cn } from '@/lib/utils';
import packagesData from '@/data/packages.json';
import { siteConfig } from '@/lib/site-config';
import StarRating from '@/components/StarRating';
import PackageCard from '@/components/PackageCard';

export default function PackageDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const foundPkg = packagesData.find(p => p.slug === slug);
    if (foundPkg) {
      setPkg(foundPkg);
      // Check if saved in localStorage
      const savedPackages = JSON.parse(localStorage.getItem('saved_packages') || '[]');
      setIsSaved(savedPackages.includes(foundPkg.id));
    }
    setLoading(false);
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: pkg.title,
          text: pkg.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSave = () => {
    const savedPackages = JSON.parse(localStorage.getItem('saved_packages') || '[]');
    let updated;
    if (isSaved) {
      updated = savedPackages.filter((id: string) => id !== pkg.id);
      setIsSaved(false);
    } else {
      updated = [...savedPackages, pkg.id];
      setIsSaved(true);
      alert('Package saved to your wishlist!');
    }
    localStorage.setItem('saved_packages', JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Package Not Found</h2>
        <p className="text-gray-600 mb-8">The package you are looking for does not exist or has been removed.</p>
        <Link href="/packages">
          <Button>Explore All Packages</Button>
        </Link>
      </div>
    );
  }

  const relatedPackages = packagesData
    .filter(p => p.category === pkg.category && p.id !== pkg.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      {/* Breadcrumbs & Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/packages" className="hover:text-blue-600 transition-colors">Packages</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium line-clamp-1">{pkg.title}</span>
          </nav>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full hover:bg-blue-50 transition-colors"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-2 text-blue-600" />
              Share
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "rounded-full transition-colors",
                isSaved ? "bg-red-50 border-red-200" : "hover:bg-red-50"
              )}
              onClick={handleSave}
            >
              <Heart className={cn("h-4 w-4 mr-2", isSaved ? "fill-red-500 text-red-500" : "text-gray-500")} />
              {isSaved ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Gallery Section */}
            <section className="rounded-3xl overflow-hidden shadow-lg bg-white">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                className="h-[400px] md:h-[500px]"
              >
                {pkg.images.map((image: string, index: number) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-full w-full">
                      <Image
                        src={image}
                        alt={`${pkg.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>

            {/* Title & Basics */}
            <section className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="bg-blue-600">{pkg.category}</Badge>
                {pkg.featured && <Badge className="bg-orange-500">Featured</Badge>}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{pkg.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  <span>{pkg.destination}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-900">{pkg.rating}</span>
                  <span className="ml-1">({pkg.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
                <p className="text-lg">{pkg.description}</p>
              </div>
            </section>

            {/* Tabs Section */}
            <Tabs defaultValue="itinerary" className="w-full">
              <TabsList className="w-full flex justify-start border-b rounded-none bg-transparent h-auto p-0 mb-8 overflow-x-auto">
                <TabsTrigger value="itinerary" className="px-8 py-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent">
                  Itinerary
                </TabsTrigger>
                <TabsTrigger value="highlights" className="px-8 py-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent">
                  Highlights
                </TabsTrigger>
                <TabsTrigger value="inclusions" className="px-8 py-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent">
                  Inclusions
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="itinerary" className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="space-y-8">
                  {pkg.itinerary.map((day: any, index: number) => (
                    <div key={index} className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 z-10">
                          {day.day}
                        </div>
                        {index !== pkg.itinerary.length - 1 && (
                          <div className="w-0.5 h-full bg-blue-100 mt-2" />
                        )}
                      </div>
                      <div className="pb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{day.title}</h3>
                        <p className="text-gray-600 mb-4">{day.description}</p>
                        
                        {day.activities && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {day.activities.map((activity: string, aIndex: number) => (
                              <Badge key={aIndex} variant="secondary" className="text-xs font-normal">
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        {day.meals && (
                          <div className="flex items-center gap-2 text-sm text-gray-500 italic">
                            <Info className="h-4 w-4" />
                            <span>Meals: {day.meals.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="highlights" className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pkg.highlights.map((highlight: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl">
                      <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-900 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="inclusions" className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center text-green-600">
                      <CheckCircle2 className="h-6 w-6 mr-2" />
                      Inclusions
                    </h3>
                    <ul className="space-y-4">
                      {pkg.inclusions.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-3 text-gray-600">
                          <div className="mt-1 bg-green-100 rounded-full p-1">
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center text-red-600">
                      <XCircle className="h-6 w-6 mr-2" />
                      Exclusions
                    </h3>
                    <ul className="space-y-4">
                      {pkg.exclusions.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-3 text-gray-600">
                          <div className="mt-1 bg-red-100 rounded-full p-1">
                            <XCircle className="h-3 w-3 text-red-600" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

          </div>

          {/* Sidebar (Right Column) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              
              {/* Booking Card */}
              <Card className="rounded-3xl shadow-xl overflow-hidden border-none">
                {siteConfig.showPrices && (
                  <div className="bg-blue-600 p-6 text-white text-center">
                    <p className="text-sm opacity-90 mb-1">Starting from</p>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-4xl font-bold">₹{pkg.price.toLocaleString()}</span>
                      <span className="text-sm opacity-90">/ person</span>
                    </div>
                  </div>
                )}
                {!siteConfig.showPrices && (
                  <div className="bg-blue-600 p-6 text-white text-center">
                    <h3 className="text-xl font-bold">Enquire for Best Price</h3>
                    <p className="text-sm opacity-90">Customized packages available</p>
                  </div>
                )}
                <CardContent className="p-8 space-y-6 bg-white">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Duration</p>
                      <p className="font-bold text-gray-900">{pkg.duration}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Group Size</p>
                      <p className="font-bold text-gray-900">Customized</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <a 
                      href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in the ${pkg.title} package. Please provide more details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full h-14 text-lg font-bold rounded-xl shadow-lg hover:shadow-blue-200 transition-all bg-green-600 hover:bg-green-700">
                        Enquire on WhatsApp
                      </Button>
                    </a>
                    <Button variant="outline" className="w-full h-14 text-lg font-bold rounded-xl">
                      Download Itinerary
                    </Button>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-sm text-center text-gray-500 mb-4 italic">Need help with your booking?</p>
                    <div className="flex flex-col gap-3">
                      <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center justify-center gap-2 text-blue-600 font-bold hover:underline">
                        <Phone className="h-4 w-4" />
                        {siteConfig.contact.phone}
                      </a>
                      <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center justify-center gap-2 text-blue-600 font-bold hover:underline">
                        <Mail className="h-4 w-4" />
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info Card */}
              <Card className="rounded-3xl shadow-sm overflow-hidden border-none bg-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Why Book With Us?</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-sm text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <span>Best Price Guarantee</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <span>Verified Accommodations</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <span>24/7 Ground Assistance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>

        {/* Related Packages Section */}
        {relatedPackages.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">
              Similar Packages You Might Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedPackages.map((p: any) => (
                <PackageCard key={p.id} package={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
