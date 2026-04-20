import { AnimatePresence, motion } from 'motion/react';
import { Car } from '../data/dataStore';
import { X, Users, Fuel, Settings2, ShieldCheck, Gauge } from 'lucide-react';
import { formatMWK } from '../lib/currency';

const CAR_FALLBACK_IMAGE =
  'https://commons.wikimedia.org/wiki/Special:FilePath/TOYOTA%20LAND%20CRUISER.JPG';

interface Props {
  car: Car | null;
  onClose: () => void;
  onRentNow: (car: Car) => void;
}

export default function CarDetailsModal({ car, onClose, onRentNow }: Props) {
  if (!car) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[65] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh]"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = CAR_FALLBACK_IMAGE;
              }}
            />
            <div className="absolute top-4 left-4">
              <span
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-sm ${
                  car.available ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
                }`}
              >
                {car.available ? 'Available' : 'Booked'}
              </span>
            </div>
          </div>

          <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
            <span className="text-gold font-bold text-xs uppercase tracking-widest mb-2 block">{car.category}</span>
            <h2 className="text-4xl font-display font-bold mb-2">{car.make} {car.model}</h2>
            <p className="text-gray-500 mb-8">Built for Malawi roads, city routes, and long-distance comfort.</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-soft-gray rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <Users className="w-4 h-4 text-navy/50" />
                  Seats
                </div>
                <p className="font-bold text-navy">{car.seats}</p>
              </div>
              <div className="bg-soft-gray rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <Fuel className="w-4 h-4 text-navy/50" />
                  Fuel
                </div>
                <p className="font-bold text-navy">{car.fuelType}</p>
              </div>
              <div className="bg-soft-gray rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <Settings2 className="w-4 h-4 text-navy/50" />
                  Transmission
                </div>
                <p className="font-bold text-navy">{car.transmission}</p>
              </div>
              <div className="bg-soft-gray rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <ShieldCheck className="w-4 h-4 text-navy/50" />
                  Coverage
                </div>
                <p className="font-bold text-navy">Fully Insured</p>
              </div>
            </div>

            <div className="bg-navy rounded-2xl p-5 mb-8 text-white flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Gauge className="w-4 h-4 text-gold" />
                Daily Rate
              </div>
              <p className="text-2xl font-display font-bold text-gold">{formatMWK(car.pricePerDay)}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button type="button" className="flex-1 btn-outline" onClick={onClose}>
                Close
              </button>
              <button
                type="button"
                disabled={!car.available}
                onClick={() => onRentNow(car)}
                className={`flex-1 ${car.available ? 'btn-primary' : 'bg-gray-100 text-gray-400 cursor-not-allowed rounded px-6 py-3 font-medium'}`}
              >
                {car.available ? 'Rent This Car' : 'Not Available'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
