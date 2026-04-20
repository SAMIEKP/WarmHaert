import { motion } from 'motion/react';
import { Calendar, Users, Star, ArrowRight } from 'lucide-react';
import { Tour } from '../data/dataStore';
import { formatMWK } from '../lib/currency';

const TOUR_FALLBACK_IMAGE =
  'https://commons.wikimedia.org/wiki/Special:FilePath/Nyika%20typical.jpg';

interface Props {
  tour: Tour;
  onBook: (tour: Tour) => void;
}

const TourCard = ({ tour, onBook }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col md:flex-row"
    >
      <div className="md:w-1/3 h-64 md:h-auto overflow-hidden relative">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = TOUR_FALLBACK_IMAGE;
          }}
        />
        <div className="absolute top-4 left-4 bg-gold text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          POPULAR
        </div>
      </div>

      <div className="md:w-2/3 p-8 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-2xl font-display font-bold group-hover:text-gold transition-colors">{tour.title}</h3>
            <div className="flex items-center gap-1 text-gold">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-bold">4.9</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Users className="w-4 h-4" />
              <span>{tour.groupSize}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-6 line-clamp-2">
            {tour.description}
          </p>

          <div className="flex items-center gap-3 mb-8">
            {tour.includes.map((inc, i) => (
              <span key={i} className="bg-soft-gray text-navy/70 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                {inc}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-6">
          <div>
            <span className="text-xs text-gray-400 block uppercase font-bold tracking-widest">Starting from</span>
            <span className="text-2xl font-bold text-navy">{formatMWK(tour.price)}</span>
          </div>
          <button
            type="button"
            onClick={() => onBook(tour)}
            className="btn-primary py-2 px-8 flex items-center gap-2 group/btn"
          >
            Book Tour
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;
