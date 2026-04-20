import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Compass, Shield, Map, Star, Play, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { destinations, tours, testimonials, Destination } from '../data/dataStore';
import DestinationCard from '../components/DestinationCard';
import DestinationModal from '../components/DestinationModal';
import TourCard from '../components/TourCard';

export default function Home() {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  const [searchCheckIn, setSearchCheckIn] = useState('');
  const [searchGuests, setSearchGuests] = useState('');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const navigate = useNavigate();

  const featuredDestinations = destinations.slice(0, 3);
  const featuredTours = tours.slice(0, 2);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      // Store subscriber email
      const subscribers = JSON.parse(localStorage.getItem('warmheart_subscribers') || '[]');
      if (!subscribers.includes(newsletterEmail)) {
        subscribers.push(newsletterEmail);
        localStorage.setItem('warmheart_subscribers', JSON.stringify(subscribers));
        alert('Thank you for subscribing to WarmHeart Travel Club!');
        setNewsletterEmail('');
      } else {
        alert('You are already subscribed!');
      }
    } else {
      alert('Please enter a valid email address');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to destinations with search params
    const params = new URLSearchParams();
    if (searchDestination) params.set('search', searchDestination);
    if (searchCheckIn) params.set('checkin', searchCheckIn);
    if (searchGuests) params.set('guests', searchGuests);
    navigate(`/destinations?${params.toString()}`);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://source.unsplash.com/JE01L3hB0GQ/1920x1080"
            onError={(e) => {
              e.currentTarget.src = 'https://commons.wikimedia.org/wiki/Special:FilePath/Richly_colored_sky_over_calm_sea_water_%28Unsplash%29.jpg';
            }}
            alt="Malawi travel hero"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-navy/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold font-bold tracking-[0.4em] uppercase text-sm mb-6 block drop-shadow-lg">
              Warm Heart of Africa
            </span>
            <h1 className="text-5xl md:text-8xl font-display font-bold leading-none mb-8 drop-shadow-2xl">
              Discover Malawi <br />
              <span className="italic font-normal">with WarmHeart</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/80 text-lg md:text-xl mb-12 font-light leading-relaxed">
              Curating unforgettable Malawi escapes, from Lake Malawi beaches to wildlife safaris and mountain adventures.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/destinations" className="w-full sm:w-auto btn-primary text-center text-lg px-10 py-4 flex items-center justify-center gap-2">
                Explore Destinations
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                type="button" 
                onClick={() => setShowVideoModal(true)}
                className="flex items-center gap-3 group"
              >
                <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-navy transition-all duration-300">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span className="font-bold tracking-widest text-sm">WATCH VIDEO</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Search Widget */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-white p-6 rounded-2xl shadow-2xl flex items-center gap-8"
          >
            <form onSubmit={handleSearch} className="flex items-center gap-8 w-full">
              <div className="flex-1 border-r border-gray-100 pr-8">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Destination</label>
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-gold" />
                  <input 
                    type="text" 
                    placeholder="Where to go?" 
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                    className="w-full focus:outline-none font-medium" 
                  />
                </div>
              </div>
              <div className="flex-1 border-r border-gray-100 pr-8">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Check In</label>
                <input 
                  type="date" 
                  value={searchCheckIn}
                  onChange={(e) => setSearchCheckIn(e.target.value)}
                  className="w-full focus:outline-none font-medium" 
                />
              </div>
              <div className="flex-1 border-r border-gray-100 pr-8">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Guests</label>
                <input 
                  type="number" 
                  placeholder="2 Guests" 
                  value={searchGuests}
                  onChange={(e) => setSearchGuests(e.target.value)}
                  min={1}
                  className="w-full focus:outline-none font-medium" 
                />
              </div>
              <button type="submit" className="bg-navy text-white p-4 rounded-xl hover:bg-gold transition-colors">
                <Search className="w-6 h-6" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-gold font-bold uppercase tracking-widest text-xs mb-3 block">Top Picks</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold">Featured Malawi Escapes</h2>
            </div>
            <Link to="/destinations" className="text-gold font-bold text-sm tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform mt-4 md:mt-0">
              VIEW ALL DESTINATIONS <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map(dest => (
              <DestinationCard 
                key={dest.id} 
                destination={dest} 
                onViewDetails={setSelectedDest}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 bg-soft-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold font-bold uppercase tracking-widest text-xs mb-3 block">Trusted Local Service</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Why Journey with Us?</h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Shield, title: 'Safe Travel Planning', desc: 'On-ground support teams and vetted partners across Malawi.' },
              { icon: Compass, title: 'Local Expert Guides', desc: 'Guides who understand Malawi’s culture, wildlife, and routes.' },
              { icon: Star, title: 'Transparent MWK Pricing', desc: 'Clear, local-currency pricing for stays, tours, and transport.' },
              { icon: Map, title: 'Custom Itineraries', desc: 'Personalized Malawi journeys built around your travel style.' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 rounded-3xl bg-white shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:bg-navy group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
                  <feature.icon className="w-8 h-8 text-gold" />
                </div>
                <h4 className="text-xl font-display font-bold mb-4">{feature.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tours Portfolio */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-gold font-bold uppercase tracking-widest text-xs mb-3 block">Handpicked</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold">Curated Malawi Tour Packages</h2>
            </div>
            <Link to="/tours" className="text-gold font-bold text-sm tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform mt-4 md:mt-0">
              EXPLORE ALL TOURS <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-12">
            {featuredTours.map(tour => (
              <TourCard key={tour.id} tour={tour} onBook={() => navigate('/tours')} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-navy text-white relative">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(#F5A623_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-gold font-bold uppercase tracking-widest text-xs mb-3 block">Voices of WarmHeart</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Guest Testimonials</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-gold fill-current" />)}
                </div>
                <p className="text-lg italic text-white/80 mb-8 leading-relaxed">"{t.text}"</p>
                <h5 className="font-bold tracking-widest uppercase text-xs text-gold">— {t.name}</h5>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-soft-gray rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Join the WarmHeart Travel Club</h2>
              <p className="text-gray-500 mb-10 text-lg">Receive Malawi travel inspiration and member-only pricing delivered to your inbox.</p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1 bg-white px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                />
                <button type="submit" className="btn-primary whitespace-nowrap px-8">SUBSCRIBE NOW</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <DestinationModal destination={selectedDest} onClose={() => setSelectedDest(null)} />
      
      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-[100] bg-navy/90 backdrop-blur flex items-center justify-center p-4" onClick={() => setShowVideoModal(false)}>
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-20 h-20 mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-bold mb-2">WarmHeart Malawi Travel</h3>
                <p className="text-white/70">Video coming soon - Experience the beauty of Malawi</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
