import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  const faqs = [
    { q: "How do I modify my booking?", a: "Contact our support team directly and we will assist with date changes and itinerary updates based on availability." },
    { q: "What insurance do you offer for car rentals?", a: "All car rentals include standard cover options, with comprehensive upgrades available on request." },
    { q: "Can I request a custom Malawi itinerary?", a: "Yes. We design bespoke trips across Malawi, including lakeside, safari, and mountain experiences." }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Info Side */}
          <div className="lg:w-1/2">
            <span className="text-gold font-bold uppercase tracking-widest text-xs mb-3 block">Connect with Us</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">Plan Your <br />Malawi Journey</h1>
            <p className="text-gray-500 text-lg mb-12">
              Whether you have a specific request or need help building a custom route, the WarmHeart team is ready to support you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-soft-gray rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Email Us</h4>
                  <p className="text-gray-400">hello@warmheartmw.com</p>
                  <p className="text-gray-400">bookings@warmheartmw.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-soft-gray rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Call Us</h4>
                  <p className="text-gray-400">+265 999 123 456</p>
                  <p className="text-gray-400">+265 888 654 321</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-soft-gray rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Visit Us</h4>
                  <p className="text-gray-400">Area 47, Lilongwe</p>
                  <p className="text-gray-400">Malawi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-1/2">
            <div className="bg-soft-gray p-8 md:p-12 rounded-[3rem] shadow-sm">
              {formState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4">Message Sent</h3>
                  <p className="text-gray-500 mb-8">Our concierge team has received your inquiry and will respond within 2 hours.</p>
                  <button type="button" onClick={() => setFormState('idle')} className="btn-primary">Send Another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="First Name" required className="w-full px-6 py-4 rounded-xl bg-white focus:ring-2 focus:ring-gold outline-none transition-all" />
                    <input type="text" placeholder="Last Name" required className="w-full px-6 py-4 rounded-xl bg-white focus:ring-2 focus:ring-gold outline-none transition-all" />
                  </div>
                  <input type="email" placeholder="Email Address" required className="w-full px-6 py-4 rounded-xl bg-white focus:ring-2 focus:ring-gold outline-none transition-all" />
                  <select className="w-full px-6 py-4 rounded-xl bg-white focus:ring-2 focus:ring-gold outline-none transition-all">
                    <option>Interested in: Generic Inquiry</option>
                    <option>Interested in: Tour Package</option>
                    <option>Interested in: Car Rental</option>
                    <option>Interested in: Custom Destination</option>
                  </select>
                  <textarea placeholder="Tell us about your trip..." rows={5} required className="w-full px-6 py-4 rounded-xl bg-white focus:ring-2 focus:ring-gold outline-none transition-all resize-none"></textarea>
                  <button 
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="btn-primary w-full py-5 font-bold tracking-widest flex items-center justify-center gap-2"
                  >
                    {formState === 'submitting' ? 'TRANSMITTING...' : 'SEND INQUIRY'}
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-gold mx-auto" />
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-soft-gray p-8 rounded-2xl">
                <h4 className="text-lg font-bold mb-3 flex items-start gap-4">
                  <MessageSquare className="w-5 h-5 text-gold shrink-0 mt-1" />
                  {faq.q}
                </h4>
                <p className="text-gray-500 pl-9">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
