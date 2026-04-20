import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, Shield, ArrowRight, Phone } from 'lucide-react';
import { formatMWK } from '../lib/currency';

interface PaymentModalProps {
  total: number;
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (ref: string) => void;
}

export default function PaymentModal({ total, isOpen, onClose, onPaymentSuccess }: PaymentModalProps) {
  const [step, setStep] = useState<'method' | 'visa' | 'airtel' | 'tnm'>('method');
  const [method, setMethod] = useState<'visa' | 'airtel' | 'tnm'>( 'visa');
    const [formData, setFormData] = useState({
      cardNumber: '',
      expiry: '',
      cvv: '',
      name: '',
      phone: '',
      amount: total.toString()
    });

  const generateReceipt = () => {
    const ref = `WH-PAY-${Date.now()}`;
    const receiptData = {
      method: method === 'visa' ? 'VISA Card' : method === 'airtel' ? 'Airtel Money *151#' : 'TNM Mpamba *405#',
      total,
      date: new Date().toISOString(),
      details: formData,
      items: JSON.parse(localStorage.getItem('warmheart_malawi_cart') || '[]')
    };
    console.log('📄 Receipt generated:', ref, receiptData);
    console.log('📄 Cart items saved:', receiptData.items);
    console.log('📄 localStorage receipt key:', 'receipt_' + ref);
    localStorage.setItem('receipt_' + ref, JSON.stringify(receiptData));
    return ref;
  };

  const handleVisaPayment = () => {
    if (formData.cardNumber && formData.expiry && formData.cvv && formData.name) {
      const ref = generateReceipt();
      onPaymentSuccess(ref);
      onClose();
    } else {
      alert('Please fill all VISA card fields');
    }
  };

  const handleMobilePayment = () => {
    if (formData.phone && formData.amount) {
      const ref = generateReceipt();
      onPaymentSuccess(ref);
      onClose();
    } else {
      alert('Please fill phone and amount');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-navy/80 backdrop-blur flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white p-6 border-b flex items-center justify-between">
            <h2 className="text-2xl font-bold">Secure Payment</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {step === 'method' && (
              <div>
                <h3 className="font-bold text-lg mb-6 text-center">Choose Payment Method</h3>
                <div className="grid grid-cols-1 gap-4 mb-8">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full border-2 border-blue-200 bg-blue-50 hover:border-blue-300 p-6 rounded-2xl font-bold text-blue-800 hover:bg-blue-100 transition-all flex items-center justify-center gap-3 uppercase tracking-wider text-sm shadow-md"
                    onClick={() => setStep('visa')}
                  >
                    <CreditCard className="w-8 h-8" />
                    VISA / Mastercard
                  </motion.button>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full border-2 border-orange-200 bg-orange-50 hover:border-orange-300 p-6 rounded-2xl font-bold text-orange-800 hover:bg-orange-100 transition-all flex items-center justify-center gap-3 uppercase tracking-wider text-sm shadow-md"
                    onClick={() => setStep('airtel')}
                  >
                    <Phone className="w-8 h-8" />
                    Airtel Money *151#
                  </motion.button>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full border-2 border-purple-200 bg-purple-50 hover:border-purple-300 p-6 rounded-2xl font-bold text-purple-800 hover:bg-purple-100 transition-all flex items-center justify-center gap-3 uppercase tracking-wider text-sm shadow-md"
                    onClick={() => setStep('tnm')}
                  >
                    <Phone className="w-8 h-8" />
                    TNM Mpamba *405#
                  </motion.button>
                </div>
                <div className="text-center text-sm text-gray-500">
                  Total: <span className="font-bold text-navy">{formatMWK(total)}</span>
                </div>
              </div>
            )}

            {step === 'visa' && (
              <div>
                <h3 className="font-bold text-lg mb-6">VISA Card Details</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number (16 digits)"
                    value={formData.cardNumber}
                  onChange={(e) => setFormData({...formData, cardNumber: e.target.value.replace(/\s/g, '').slice(0,16)})}
                    maxLength={19}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => setFormData({...formData, expiry: e.target.value.replace(/\\s/g, '').slice(0,5)})}
                      maxLength={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={(e) => setFormData({...formData, cvv: e.target.value.replace(/\\s/g, '').slice(0,4)})}
                      maxLength={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Name on Card"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep('method')} className="flex-1 btn-outline">Change Method</button>
                  <button onClick={handleVisaPayment} className="flex-1 btn-primary" disabled={!formData.cardNumber || !formData.expiry || !formData.cvv || !formData.name}>
                    Pay {formatMWK(total)}
                  </button>
                </div>
              </div>
            )}

            {step === 'airtel' && (
              <div>
                <h3 className="font-bold text-lg mb-6">Airtel Money Payment</h3>
                <div className="space-y-4">
                  <input
                    type="tel"
                    placeholder="Airtel Money Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    value={formData.amount.replace(/[^\d]/g, '')}
                    onChange={(e) => setFormData({...formData, amount: formatMWK(Number(e.target.value))})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                    <p className="font-bold text-orange-800 mb-2">Instructions:</p>
                    <p className="text-sm text-orange-700">1. Dial <span className="font-black text-xl">*151#</span></p>
                    <p className="text-sm text-orange-700">2. Pay to WarmHeart</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep('method')} className="flex-1 btn-outline">Change Method</button>
                  <button onClick={handleMobilePayment} className="flex-1 btn-primary" disabled={!formData.phone}>
                    Confirm & Pay
                  </button>
                </div>
              </div>
            )}

            {step === 'tnm' && (
              <div>
                <h3 className="font-bold text-lg mb-6">TNM Mpamba Payment</h3>
                <div className="space-y-4">
                  <input
                    type="tel"
                    placeholder="TNM Mpamba Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    value={formData.amount.replace(/[^\d]/g, '')}
                    onChange={(e) => setFormData({...formData, amount: formatMWK(Number(e.target.value))})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                    <p className="font-bold text-purple-800 mb-2">Instructions:</p>
                    <p className="text-sm text-purple-700">1. Dial <span className="font-black text-xl">*405#</span></p>
                    <p className="text-sm text-purple-700">2. Pay to WarmHeart</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep('method')} className="flex-1 btn-outline">Change Method</button>
                  <button onClick={handleMobilePayment} className="flex-1 btn-primary" disabled={!formData.phone}>
                    Confirm & Pay
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-gray-50 border-t flex items-center justify-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            SECURE PAYMENTS - NO CHARGE UNTIL CONFIRMED
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

