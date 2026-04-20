import { motion } from 'motion/react';
import { Users, Fuel, Settings2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Car } from '../data/dataStore';
import { formatMWK } from '../lib/currency';

const CAR_FALLBACK_IMAGE =
  'https://commons.wikimedia.org/wiki/Special:FilePath/TOYOTA%20LAND%20CRUISER.JPG';

interface Props {
  car: Car;
  onRent: (car: Car) => void;
  onViewDetails: (car: Car) => void;
}

const CarCard = ({ car, onRent, onViewDetails }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = CAR_FALLBACK_IMAGE;
          }}
        />
        <div className="absolute top-4 left-4">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-sm ${
            car.available ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
          }`}>
            {car.available ? 'Available' : 'Booked'}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 bg-navy/80 backdrop-blur px-3 py-1 rounded-lg">
          <span className="text-gold font-bold">{formatMWK(car.pricePerDay)}</span>
          <span className="text-white/70 text-xs">/ day</span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-6">
          <span className="text-gold font-bold text-xs uppercase tracking-widest mb-1 block">{car.category}</span>
          <h3 className="text-2xl font-display font-bold leading-tight">{car.make} {car.model}</h3>
        </div>

        <div className="grid grid-cols-2 gap-y-4 mb-8">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Users className="w-4 h-4 text-navy/40" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Fuel className="w-4 h-4 text-navy/40" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Settings2 className="w-4 h-4 text-navy/40" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <ShieldCheck className="w-4 h-4 text-navy/40" />
            <span>Fully Insured</span>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onViewDetails(car)}
            className="btn-outline py-3.5 rounded-xl font-bold text-sm tracking-widest"
          >
            DETAILS
          </button>
          <button
            type="button"
            onClick={() => onRent(car)}
            disabled={!car.available}
            className={`py-3.5 rounded-xl font-bold text-sm tracking-widest flex items-center justify-center gap-2 transition-all group ${
              car.available ? 'btn-primary' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {car.available ? 'RENT' : 'N/A'}
            {car.available && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
