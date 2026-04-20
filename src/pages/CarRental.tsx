import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle, Car as CarIcon, MapPin, Gauge } from 'lucide-react';
import { carFleet, Car } from '../data/dataStore';
import CarCard from '../components/CarCard';
import CarDetailsModal from '../components/CarDetailsModal';
import { useBooking } from '../context/BookingContext';
import { formatMWK } from '../lib/currency';

export default function CarRental() {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [detailsCar, setDetailsCar] = useState<Car | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [rentalPickup, setRentalPickup] = useState('Lilongwe City Office');
  const [rentalDays, setRentalDays] = useState(3);
  const [driverName, setDriverName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const { addToCart } = useBooking();

  const filteredCars = useMemo(() => {
    return carFleet.filter(car => categoryFilter === 'All' || car.category === categoryFilter);
  }, [categoryFilter]);

  const handleRentalSubmit = () => {
    if (selectedCar && driverName && licenseNumber && mobileNumber) {
      addToCart({
        type: 'car',
        item: selectedCar,
        bookingDetails: { days: rentalDays, pickup: rentalPickup },
        price: selectedCar.pricePerDay * rentalDays
      });
      setBookingStep(3);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleOpenRental = (car: Car) => {
    setSelectedCar(car);
    setRentalPickup('Lilongwe City Office');
    setRentalDays(3);
    setBookingStep(1);
    setDriverName('');
    setLicenseNumber('');
    setDateOfBirth('');
    setMobileNumber('');
  };

  const handleRentFromDetails = (car: Car) => {
    setDetailsCar(null);
    setSelectedCar(car);
    setRentalPickup('Lilongwe City Office');
    setRentalDays(3);
    setBookingStep(1);
    setDriverName('');
    setLicenseNumber('');
    setDateOfBirth('');
    setMobileNumber('');
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-soft-gray min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-gold font-bold uppercase tracking-widest text-xs mb-3 block">Luxury Mobility</span>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">Malawi Car Fleet</h1>
            <p className="text-gray-500 max-w-xl">Reliable premium vehicles for city transfer, safari road trips, and cross-country Malawi journeys.</p>
          </div>

          <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm overflow-x-auto whitespace-nowrap">
            {['All', 'Luxury', 'SUV', 'Van', 'Economy'].map(cat => (
              <button
                type="button"
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
                  categoryFilter === cat ? 'bg-navy text-white shadow-lg' : 'text-gray-400 hover:text-navy'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCars.map(car => (
            <CarCard key={car.id} car={car} onRent={handleOpenRental} onViewDetails={setDetailsCar} />
          ))}
        </div>

        {/* My Rentals Section */}
        <section className="mt-24">
          <div className="bg-white rounded-3xl p-10 shadow-sm">
            <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
              <CarIcon className="w-8 h-8 text-gold" />
              Your Active Rentals
            </h2>
            <div className="border-2 border-dashed border-gray-100 rounded-2xl p-12 text-center">
              <p className="text-gray-400 font-medium">No active rentals found. Start exploring our Malawi-ready fleet above.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Car Rental Booking Modal */}
      <AnimatePresence>
        {selectedCar && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {setSelectedCar(null); setBookingStep(1);}}
              className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="p-8 md:p-12">
                {bookingStep === 1 && (
                  <div className="animate-in fade-in duration-500">
                    <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest mb-2">
                       <Gauge className="w-4 h-4" /> 
                       Rental Config
                    </div>
                    <h2 className="text-3xl font-display font-bold mb-8">Rent {selectedCar.make} {selectedCar.model}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Pick-up Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                          <select
                            value={rentalPickup}
                            onChange={(e) => setRentalPickup(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 rounded-xl bg-soft-gray border-none outline-none appearance-none font-medium"
                          >
                            <option>Lilongwe City Office</option>
                            <option>Lilongwe International Airport</option>
                            <option>Blantyre City Center</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Rental Duration</label>
                        <select
                          value={String(rentalDays)}
                          onChange={(e) => setRentalDays(Number(e.target.value))}
                          className="w-full px-6 py-4 rounded-xl bg-soft-gray border-none outline-none font-medium"
                        >
                          <option value="1">1 Day</option>
                          <option value="3">3 Days</option>
                          <option value="7">7 Days</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-soft-gray p-6 rounded-2xl mb-10 flex justify-between items-center">
                      <span className="font-bold text-navy/60">Estimated Total:</span>
                      <span className="text-3xl font-display font-bold text-gold">{formatMWK(selectedCar.pricePerDay * rentalDays)}</span>
                    </div>

                    <button type="button" onClick={() => setBookingStep(2)} className="btn-primary w-full py-4 flex items-center justify-center gap-2">
                      Enter Driver Details <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="animate-in fade-in duration-500">
                    <h2 className="text-3xl font-display font-bold mb-8">Driver Information</h2>
                    <div className="space-y-4 mb-10">
                      <input 
                        type="text" 
                        placeholder="Full Name as per License" 
                        value={driverName}
                        onChange={(e) => setDriverName(e.target.value)}
                        className="w-full px-6 py-4 rounded-xl bg-soft-gray border-none outline-none" 
                      />
                      <input 
                        type="text" 
                        placeholder="Driver License Number" 
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        className="w-full px-6 py-4 rounded-xl bg-soft-gray border-none outline-none" 
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="date" 
                          placeholder="Date of Birth" 
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className="w-full px-6 py-4 rounded-xl bg-soft-gray border-none outline-none" 
                        />
                        <input 
                          type="tel" 
                          placeholder="Mobile Number" 
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          className="w-full px-6 py-4 rounded-xl bg-soft-gray border-none outline-none" 
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button type="button" onClick={() => setBookingStep(1)} className="btn-outline flex-1">Back</button>
                      <button 
                        type="button" 
                        onClick={handleRentalSubmit} 
                        className="btn-primary flex-[2]"
                        disabled={!driverName || !licenseNumber || !mobileNumber}
                      >
                        Confirm Rental
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="text-center py-8">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    <h2 className="text-4xl font-display font-bold mb-4">Rental Secured</h2>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                      Your high-performance experience is ready. 
                      Rental ID: <span className="text-gold font-mono font-bold uppercase">RENT-{Math.floor(1000 + Math.random() * 9000)}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => {setSelectedCar(null); setBookingStep(1);}}
                      className="btn-primary px-12"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CarDetailsModal car={detailsCar} onClose={() => setDetailsCar(null)} onRentNow={handleRentFromDetails} />
    </div>
  );
}
