import { motion } from 'motion/react';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { Destination } from '../data/dataStore';
import { useBooking } from '../context/BookingContext';
import { formatMWK } from '../lib/currency';

const DESTINATION_FALLBACK_IMAGE =
  'https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Malawi%20%286524740085%29.jpg';

interface Props {
  destination: Destination;
  onViewDetails: (dest: Destination) => void;
  onBookNow?: (dest: Destination) => void;
}

const DestinationCard = ({ destination, onViewDetails, onBookNow }: Props) => {
  const { addToWishlist, wishlist } = useBooking();
  const isWishlisted = wishlist.some(w => w.destination.id === destination.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = DESTINATION_FALLBACK_IMAGE;
          }}
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <span>{destination.flag}</span>
          <span>{destination.country}</span>
        </div>
        <button 
          type="button"
          onClick={() => addToWishlist(destination)}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur transition-colors ${isWishlisted ? 'bg-gold text-white' : 'bg-white/90 text-navy hover:text-gold'}`}
        >
          <Star className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-display font-bold leading-tight group-hover:text-gold transition-colors">{destination.name}</h3>
            <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
              <MapPin className="w-3 h-3" />
              <span>{destination.region}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-gold font-bold text-lg">{formatMWK(destination.price)}</span>
            <span className="text-xs text-gray-400 block">/ night</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.floor(destination.rating) ? 'text-gold fill-current' : 'text-gray-200'}`} />
          ))}
          <span className="text-xs font-semibold ml-1">{destination.rating}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onViewDetails(destination)}
            className="btn-outline py-2.5 rounded-xl text-sm"
          >
            DETAILS
          </button>
          <button
            type="button"
            onClick={() => onBookNow?.(destination)}
            className="btn-primary py-2.5 rounded-xl text-sm font-bold"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
