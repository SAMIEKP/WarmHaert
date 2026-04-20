import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, User, Calendar, MapPin, Phone, CreditCard, CheckCircle, X } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatMWK } from '../lib/currency';
import { Car, Tour, Destination } from '../data/dataStore';

type BookableItem = Car | Tour | Destination;

interface DestinationCartItem {
  id: string;
  type: 'destination';
  item: Destination;
  bookingDetails: {
    date: string;
    travelers: number;
  };
  price: number;
}

interface Props {
  item: BookableItem;
  itemType: 'car' | 'tour' | 'destination';
  isOpen: boolean;
  onClose: () => void;
}

export default function UniversalBookingModal({ item, itemType, isOpen, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState({
    date: '',
    travelers: 2,
    pickup: 'Lilongwe Airport',
    days: 3,
    name: '',
    email: '',
    phone: ''
  });
  const { addToCart } = useBooking();

  const getItemPrice = () => {
    if ('pricePerDay' in item) return (item as Car).pricePerDay * details.days;
    return (item as Tour | Destination).price * details.travelers;
  };

  const getItemName = () => {
    if ('make' in item) return `${(item as Car).make} ${(item as Car).model}`;
    if ('title' in item) return (item as Tour).title;
    return (item as Destination).name;
  };

  const handleSubmit = () => {
    // Mock payment success
    addToCart({
      type: itemType,
      item,
      bookingDetails: details,
      price: getItemPrice()
    });
    setStep(4);
  };

  const reset = () => {
    setStep(1);
    setDetails({ date: '', travelers: 2, pickup: 'Lilongwe Airport', days: 3, name: '', email: '', phone: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/80 backdrop-blur"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="w-full max-w-lg bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                {itemType === 'car' ? '🚗' : itemType === 'tour' ? '✈️' : '🏖️'}
              </div>
              <div>
                <h2 className="font-display font-bold text-xl">{getItemName()}</h2>
                <p className="text-sm text-gray-500">{formatMWK(getItemPrice())}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Steps */}
          <div className="p-6">
            {step === 1 && (
              <div>
                <h3 className="font-bold text-lg mb-6">Trip Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      {itemType === 'car' ? 'Pickup Date' : 'Start Date'}
                    </label>
                    <input
                      type="date"
                      value={details.date}
                      onChange={(e) => setDetails({...details, date: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                        Guests/Days
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={itemType === 'car' ? details.days : details.travelers}
                        onChange={(e) => {
                          if (itemType === 'car') setDetails({...details, days: Number(e.target.value)});
                          else setDetails({...details, travelers: Number(e.target.value)});
                        }}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold"
                      />
                    </div>
                    {itemType === 'car' && (
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Pickup Location</label>
                        <select
                          value={details.pickup}
                          onChange={(e) => setDetails({...details, pickup: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold"
                        >
                          <option>Lilongwe Airport</option>
                          <option>Blantyre City</option>
                          <option>Lake Malawi</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-6 p-4 bg-soft-gray rounded-xl">
                  <div className="flex justify-between text-sm">
                    <span>Total:</span>
                    <span className="font-bold text-navy">{formatMWK(getItemPrice())}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full mt-6 bg-navy text-white py-4 rounded-xl font-bold hover:bg-gold transition-colors flex items-center justify-center gap-2"
                >
                  Next: Contact Info <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-bold text-lg mb-6">Your Contact</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={details.name}
                    onChange={(e) => setDetails({...details, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={details.email}
                    onChange={(e) => setDetails({...details, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold"
                  />
                  <div className="flex gap-4">
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={details.phone}
                      onChange={(e) => setDetails({...details, phone: e.target.value})}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(1)} className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl hover:bg-gray-50">
                    Back
                  </button>
                  <button onClick={() => setStep(3)} className="flex-1 bg-navy text-white py-3 rounded-xl font-bold hover:bg-gold">
                    Confirm & Pay
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center">
                <h3 className="font-bold text-lg mb-6">Confirm Booking</h3>
                <div className="bg-soft-gray p-6 rounded-xl mb-6">
                  <div className="space-y-2 text-sm">
                    <div>{item.name || `${item.make} ${item.model}`}</div>
                    <div className="text-gray-500">{details.date} • {details.travelers || details.days} {(itemType === 'car' ? 'days' : 'guests')}</div>
                    <div className="font-bold text-navy">{formatMWK(getItemPrice())}</div>
                  </div>
                </div>
                <button 
                  onClick={handleSubmit}
                  className="w-full bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 mb-4 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Pay Now with MPESA
                </button>
                <button onClick={() => setStep(2)} className="text-sm text-gray-500 underline">
                  Edit Details
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-display font-bold mb-4">Booking Confirmed!</h2>
                <p className="text-gray-500 mb-8">Reference: <span className="font-mono font-bold text-gold">WH-{Math.floor(1000 + Math.random() * 9000)}</span></p>
                <button onClick={reset} className="btn-primary w-full">
                  View My Bookings
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

