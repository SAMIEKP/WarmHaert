import { useState, useMemo } from 'react';
import { useBooking } from '../context/BookingContext';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { destinations } from '../data/dataStore';
import DestinationCard from '../components/DestinationCard';
import DestinationModal from '../components/DestinationModal';
import UniversalBookingModal from '../components/UniversalBookingModal';




export default function Destinations() {
  const { addToCart } = useBooking();

  const [searchQuery, setSearchQuery] = useState('');


  const [regionFilter, setRegionFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Popularity');
  const [selectedDest, setSelectedDest] = useState<any>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [minRating, setMinRating] = useState(0);

  const [bookingModal, setBookingModal] = useState<{ open: boolean; item: any | null }>({ open: false, item: null });


  const filteredDestinations = useMemo(() => {
    let result = destinations.filter(dest => 
      (regionFilter === 'All' || dest.region === regionFilter) &&
      (dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       dest.country.toLowerCase().includes(searchQuery.toLowerCase())) &&
      dest.price >= priceRange[0] &&
      dest.price <= priceRange[1] &&
      dest.rating >= minRating
    );

    if (sortBy === 'Price: Low-High') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'Price: High-Low') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'Rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [searchQuery, regionFilter, sortBy, priceRange, minRating]);

  return (
    <div className="pt-32 pb-24 px-6 bg-soft-gray min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="text-gold font-bold uppercase tracking-widest text-xs mb-3 block">Malawi Awaits</span>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-8">Curated Malawi Destinations</h1>
          
          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by city or country..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-gold transition-all outline-none"
              />
            </div>
            
            <div className="flex flex-wrap gap-4 w-full lg:w-auto">
              <select 
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="bg-white px-6 py-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gold text-sm font-medium"
              >
                <option value="All">All Regions</option>
                <option value="Northern Region">Northern Region</option>
                <option value="Central Region">Central Region</option>
                <option value="Southern Region">Southern Region</option>
              </select>

              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white px-6 py-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gold text-sm font-medium"
              >
                <option value="Popularity">Popularity</option>
                <option value="Price: Low-High">Price: Low to High</option>
                <option value="Price: High-Low">Price: High to Low</option>
                <option value="Rating">Top Rated</option>
              </select>

              <button type="button" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)} className="bg-navy text-white px-6 py-4 rounded-xl shadow-sm flex items-center gap-2 text-sm font-medium hover:bg-gold transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
                Advanced Filters
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
          <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Advanced Filters</h3>
              <button 
                onClick={() => {
                  setShowAdvancedFilters(false);
                  setPriceRange([0, 200000]);
                  setMinRating(0);
                }}
                className="text-gray-400 hover:text-navy transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Price Range: MWK {priceRange[0].toLocaleString()} - MWK {priceRange[1].toLocaleString()}
                </label>
                <div className="flex gap-4">
                  <input 
                    type="range" 
                    min={0}
                    max={200000}
                    step={5000}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="flex-1"
                  />
                  <input 
                    type="range" 
                    min={0}
                    max={200000}
                    step={5000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Minimum Rating: {minRating}+ Stars
                </label>
                <input 
                  type="range" 
                  min={0}
                  max={5}
                  step={0.5}
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
            
            <button 
              onClick={() => {
                setPriceRange([0, 200000]);
                setMinRating(0);
              }}
              className="mt-6 text-gold font-bold text-sm underline hover:no-underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Results */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredDestinations.map(dest => (
              <DestinationCard 
                key={dest.id} 
                destination={dest} 
                onViewDetails={setSelectedDest}
                onBookNow={(dest) => {
                  // Add to cart directly with defaults
                  addToCart({
                    type: 'destination',
                    item: dest,
                    bookingDetails: { 
                      date: new Date().toISOString().split('T')[0], 
                      travelers: 2 
                    },
                    price: dest.price * 2 // default 2 travelers
                  });
                }}

              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm">
            <Search className="w-16 h-16 text-gray-200 mx-auto mb-6" />
            <h3 className="text-2xl font-display font-bold mb-2">No destinations found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query.</p>
            <button
              type="button"
              onClick={() => {setSearchQuery(''); setRegionFilter('All');}}
              className="mt-6 text-gold font-bold underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <DestinationModal destination={selectedDest} onClose={() => setSelectedDest(null)} />
      <UniversalBookingModal 
        item={bookingModal.item || destinations[0]} 
        itemType="destination" 
        isOpen={bookingModal.open} 
        onClose={() => setBookingModal({ open: false, item: null })}
      />
    </div>
  );
}
