import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, MapPin, Heart, Share2, ArrowRight } from 'lucide-react';
import { Destination } from '../data/dataStore';
import { useBooking } from '../context/BookingContext';
import { formatMWK } from '../lib/currency';

const DESTINATION_FALLBACK_IMAGE =
  'https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Malawi%20%286524740085%29.jpg';

interface Props {
  destination: Destination | null;
  onClose: () => void;
}

export default function DestinationModal({ destination, onClose }: Props) {
  const { addToWishlist } = useBooking();

  if (!destination) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh] md:h-auto"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Gallery Side */}
          <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = DESTINATION_FALLBACK_IMAGE;
              }}
            />
            <div className="absolute bottom-6 left-6 flex gap-2">
              <button
                type="button"
                aria-label="Share destination"
                className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-all"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button 
                type="button"
                aria-label="Add destination to wishlist"
                onClick={() => addToWishlist(destination)}
                className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-all text-pink-500"
              >
                <Heart className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>

          {/* Content Side */}
          <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{destination.flag}</span>
              <span className="text-gold font-semibold uppercase tracking-widest text-xs">{destination.country}</span>
            </div>
            <h2 className="text-4xl font-display font-bold mb-4">{destination.name}</h2>
            
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{destination.region}</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full" />
              <div className="text-gold font-bold text-xl">{formatMWK(destination.price)} <span className="text-xs font-normal text-gray-400">/ night</span></div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              {destination.description}
            </p>

            <div className="mb-8">
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Highlights</h4>
              <div className="grid grid-cols-2 gap-3">
                {destination.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-navy/80">
                    <CheckCircle className="w-4 h-4 text-gold" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary flex items-center justify-center gap-2"
              onClick={() => window.open(`https://wa.me/265991234567?text=Hi! Need expert consultation for ${destination.name} stay`, '_blank')}
            >
              Consult Expert
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
