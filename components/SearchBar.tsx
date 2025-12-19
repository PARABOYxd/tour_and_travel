'use client';

import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

const destinations = [
  'Manali, Himachal Pradesh',
  'Goa',
  'Kerala',
  'Rajasthan',
  'Kashmir',
  'Andaman & Nicobar Islands',
  'Delhi, Agra, Jaipur',
];

interface SearchBarProps {
  onSearch?: (searchData: {
    destination: string;
    dateRange: DateRange | undefined;
    travelers: number;
  }) => void;
  className?: string;
}

export default function SearchBar({ onSearch, className }: SearchBarProps) {
  const [destination, setDestination] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [travelers, setTravelers] = useState(1);
  const [showDestinations, setShowDestinations] = useState(false);

  const filteredDestinations = destinations.filter(dest =>
    dest.toLowerCase().includes(destination.toLowerCase())
  );

  const handleSearch = () => {
    console.log('Search triggered:', { destination, dateRange, travelers });
    onSearch?.({ destination, dateRange, travelers });
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setShowDestinations(true);
              }}
              onFocus={() => setShowDestinations(true)}
              className="pl-10"
            />
            {showDestinations && filteredDestinations.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1">
                {filteredDestinations.map((dest) => (
                  <button
                    key={dest}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                    onClick={() => {
                      setDestination(dest);
                      setShowDestinations(false);
                    }}
                  >
                    {dest}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Travel Dates
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Travelers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Travelers
          </label>
          <Select value={travelers.toString()} onValueChange={(value) => setTravelers(parseInt(value))}>
            <SelectTrigger>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? 'Person' : 'People'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button onClick={handleSearch} className="w-full">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}