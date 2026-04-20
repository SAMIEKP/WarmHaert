import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import { ShoppingBag, Trash2, ArrowRight, Compass, Shield, CreditCard } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Link } from 'react-router-dom';
import PaymentModal from '../components/PaymentModal';
import { formatMWK } from '../lib/currency';
import type { Tour, Car } from '../data/dataStore';

const FALLBACK_ITEM_IMAGE =
  'https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Malawi%20%286524740085%29.jpg';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useBooking();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;




  const handlePaymentSuccess = (refId: string) => {
    clearCart();
    navigate(`/receipt/${refId}`);
  };

  // DEBUG: Log cart state
  useEffect(() => {
    console.log('🛒 Cart state:', cart);
    console.log('🛒 Cart length:', cart.length);
    if (cart.length > 0) {
      console.log('🛒 First item:', cart[0]);
    }
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center text-center">
        <div>
          <div className="w-24 h-24 bg-soft-gray rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-4xl font-display font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-400 mb-10 max-w-sm mx-auto tracking-wide">It looks like your cart is empty. Explore Malawi stays, tours, and transport options.</p>
          <Link to="/destinations" className="w-full btn-primary py-4 px-8 flex items-center justify-center gap-2">
            START EXPLORING <Compass className="w-5 h-5" />
          </Link>

        </div>
      </div>
    );
  }


  return (
    <div className="pt-32 pb-24 px-6 bg-soft-gray min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-display font-bold mb-12">Booking Cart</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main List */}
          <div className="lg:w-2/3 space-y-6">
            <AnimatePresence>
              {cart.map((item) => {
                const title = 'title' in item.item ? item.item.title : 'make' in item.item ? `${item.item.make} ${item.item.model}` : item.item.name;

                const details =
                  item.type === 'tour'
                    ? `Duration: ${(item.item as Tour).duration} • Guests: ${(item.bookingDetails as {travelers: number}).travelers}`
                    : item.type === 'destination'
                    ? `Stay • Guests: ${(item.bookingDetails as {travelers: number}).travelers}`
                    : `Duration: ${(item.bookingDetails as {days: number}).days} Days • ${(item.item as Car).transmission} Transmission`;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row gap-8 relative group"
                  >
                  <div className="w-full sm:w-40 h-40 rounded-2xl overflow-hidden shrink-0">
                    <img 
                      src={item.item.image} 
                      alt={title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_ITEM_IMAGE;
                      }}
                    />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between py-2">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-gold font-bold text-[10px] uppercase tracking-widest block mb-1">
                            {item.type === 'tour' ? 'Tour Package' : 'Car Rental'}
                          </span>
                          <h3 className="text-2xl font-display font-bold">{title}</h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>{details}</span>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between items-end">
                       <span className="font-bold text-2xl text-navy">{formatMWK(item.price)}</span>
                    </div>
                  </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 sticky top-32">
              <h3 className="text-xl font-bold mb-8 tracking-widest uppercase">Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-navy font-bold">{formatMWK(Math.round(subtotal))}</span>
                </div>
                <div className="flex justify-between text-gray-500 pb-4 border-b border-gray-100">
                  <span>Service Fee (10%)</span>
                  <span className="text-navy font-bold">{formatMWK(Math.round(tax))}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-navy pt-2">
                  <span>Grand Total</span>
                  <span className="text-gold font-display">{formatMWK(Math.round(total))}</span>
                </div>
              </div>

              <div className="space-y-3">
                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-wider text-sm"
                  onClick={() => setShowPaymentModal(true)}
                >
                  <CreditCard className="w-5 h-5" /> Proceed Payment With...
                </motion.button>
              </div>

              <PaymentModal 
                total={total} 
                isOpen={showPaymentModal} 
                onClose={() => setShowPaymentModal(false)}
                onPaymentSuccess={handlePaymentSuccess}
              />

              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-300 text-xs font-bold tracking-widest">
                <Shield className="w-4 h-4" />
                SECURE LOCAL PAYMENTS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
