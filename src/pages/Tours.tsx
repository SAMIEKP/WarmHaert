import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle, CreditCard, User, Calendar } from 'lucide-react';
import { tours, Tour } from '../data/dataStore';
import TourCard from '../components/TourCard';
import { useBooking } from '../context/BookingContext';
import { formatMWK } from '../lib/currency';

export default function Tours() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [tourType, setTourType] = useState<'Group Tour' | 'Private Luxury'>('Group Tour');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const { addToCart } = useBooking();

  const handleBookingSubmit = () => {
    if (selectedTour && guestName && guestEmail && guestPhone && cardNumber && cardExpiry && cardCVV) {
      addToCart({
        type: 'tour',
        item: selectedTour,
        bookingDetails: { date: travelDate || new Date().toISOString(), travelers },
        price: selectedTour.price * travelers
      });
      setBookingStep(4);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleSelectTour = (tour: Tour) => {
    setSelectedTour(tour);
    setBookingStep(1);
    setTravelDate('');
    setTravelers(2);
    setTourType('Group Tour');
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setSpecialRequests('');
    setCardNumber('');
    setCardExpiry('');
    setCardCVV('');
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold font-bold uppercase tracking-widest text-xs mb-3 block">Expertly Crafted</span>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">Malawi Tour Packages</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Explore Malawi through guided safaris, mountain escapes, and lakeside cultural experiences.</p>
        </div>

        <div className="space-y-12">
          {tours.map(tour => (
            <TourCard key={tour.id} tour={tour} onBook={handleSelectTour} />
          ))}
        </div>
      </div>

      {/* Multi-step Booking Modal */}
      <AnimatePresence>
        {selectedTour && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {setSelectedTour(null); setBookingStep(1);}}
              className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              {/* Progress Bar */}
              {bookingStep < 4 && (
                <div className="h-1.5 w-full bg-gray-100 flex">
                  {[1, 2, 3].map(step => (
                    <div 
                      key={step} 
                      className={`flex-1 transition-all duration-500 ${step <= bookingStep ? 'bg-gold' : 'bg-transparent'}`}
                    />
                  ))}
                </div>
              )}

              <div className="p-8 md:p-12">
                {bookingStep === 1 && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-3xl font-display font-bold mb-2">Step 1: Your Journey</h2>
                    <p className="text-gray-500 mb-8 border-b border-gray-100 pb-4">{selectedTour.title}</p>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Preferred Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                          <input
                            type="date"
                            value={travelDate}
                            onChange={(e) => setTravelDate(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 rounded-xl bg-soft-gray border-none focus:ring-2 focus:ring-gold outline-none"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Travelers</label>
                          <input
                            type="number"
                            min={1}
                            value={travelers}
                            onChange={(e) => setTravelers(Math.max(1, Number(e.target.value) || 1))}
                            className="w-full px-6 py-4 rounded-xl bg-soft-gray border-none focus:ring-2 focus:ring-gold outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Tour Type</label>
                          <select
                            value={tourType}
                            onChange={(e) => setTourType(e.target.value as 'Group Tour' | 'Private Luxury')}
                            className="w-full px-6 py-4 rounded-xl bg-soft-gray border-none focus:ring-2 focus:ring-gold outline-none"
                          >
                            <option>Group Tour</option>
                            <option>Private Luxury</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <button type="button" onClick={() => setBookingStep(2)} className="btn-primary w-full mt-10 py-4 flex items-center justify-center gap-2">
                      Next Step <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h2 className="text-3xl font-display font-bold mb-2">Step 2: Guest Details</h2>
                    <p className="text-gray-500 mb-8 border-b border-gray-100 pb-4">Personal Information</p>
                    
                    <div className="space-y-4">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                        <input 
                          type="text" 
                          placeholder="Full Name" 
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          className="w-full pl-12 pr-6 py-4 rounded-xl bg-soft-gray border-none outline-none" 
                        />
                      </div>
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full px-6 py-4 rounded-xl bg-soft-gray border-none outline-none" 
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full px-6 py-4 rounded-xl bg-soft-gray border-none outline-none" 
                      />
                      <textarea 
                        placeholder="Special Requests" 
                        rows={3} 
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full px-6 py-4 rounded-xl bg-soft-gray border-none outline-none resize-none"
                      ></textarea>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <button type="button" onClick={() => setBookingStep(1)} className="btn-outline flex-1">Back</button>
                      <button 
                        type="button" 
                        onClick={() => {
                          if (guestName && guestEmail && guestPhone) {
                            setBookingStep(3);
                          } else {
                            alert('Please fill in all required fields');
                          }
                        }} 
                        className="btn-primary flex-[2]"
                      >
                        Proceed to Payment
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h2 className="text-3xl font-display font-bold mb-2">Step 3: Secure Payment</h2>
                    <p className="text-gray-500 mb-2">Tour Type: <span className="text-navy font-semibold">{tourType}</span></p>
                    <p className="text-gray-500 mb-8 border-b border-gray-100 pb-4">Order Total: <span className="text-navy font-bold">{formatMWK(selectedTour.price * travelers)}</span></p>
                    
                    <div className="space-y-4">
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                        <input 
                          type="text" 
                          placeholder="Card Number" 
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, '').slice(0, 16))}
                          maxLength={16}
                          className="w-full pl-12 pr-6 py-4 rounded-xl bg-soft-gray border-none outline-none" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          placeholder="MM/YY" 
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value.slice(0, 5))}
                          maxLength={5}
                          className="w-full px-6 py-4 rounded-xl bg-soft-gray border-none outline-none" 
                        />
                        <input 
                          type="text" 
                          placeholder="CVV" 
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value.replace(/\s/g, '').slice(0, 4))}
                          maxLength={4}
                          className="w-full px-6 py-4 rounded-xl bg-soft-gray border-none outline-none" 
                        />
                      </div>
                    </div>

                    <button 
                      type="button" 
                      onClick={handleBookingSubmit} 
                      className="btn-primary w-full mt-10 py-4 font-bold tracking-widest"
                      disabled={!cardNumber || !cardExpiry || !cardCVV}
                    >
                      CONFIRM BOOKING
                    </button>
                  </div>
                )}

                {bookingStep === 4 && (
                  <div className="text-center py-8 animate-in zoom-in-95 duration-500">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    <h2 className="text-4xl font-display font-bold mb-4">Booking Confirmed!</h2>
                    <p className="text-gray-500 mb-8">
                      Your adventure reference is <span className="text-gold font-mono font-bold uppercase tracking-widest">WH-{Math.floor(100000 + Math.random() * 900000)}</span>. 
                      A confirmation email has been sent.
                    </p>
                    <button
                      type="button"
                      onClick={() => {setSelectedTour(null); setBookingStep(1);}}
                      className="btn-primary px-12"
                    >
                      Close Window
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
