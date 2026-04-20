import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Compass, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Compass className="w-8 h-8 text-gold" />
              <span className="text-2xl font-display font-bold tracking-tight">WarmHeart</span>
            </Link>
            <p className="text-white/60 leading-relaxed mb-8">
              Malawi-focused travel planning and trusted transport services crafted with the spirit of the Warm Heart of Africa.
            </p>
            <div className="flex gap-4">
              <motion.button 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => window.open('https://facebook.com', '_blank')}
                className="w-12 h-12 rounded-2xl bg-white shadow-xl border-2 border-gray-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 text-blue-600"
                aria-label="Facebook"
              >
<Facebook className="w-5 h-5" />
              </motion.button>
              <motion.button 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => window.open('https://twitter.com', '_blank')}
                className="w-12 h-12 rounded-2xl bg-white shadow-xl border-2 border-gray-200 flex items-center justify-center hover:bg-sky-500 hover:text-white hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 text-sky-500"
                aria-label="Twitter"
              >
<Twitter className="w-5 h-5" />
              </motion.button>
              <motion.button 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => window.open('https://instagram.com', '_blank')}
                className="w-12 h-12 rounded-2xl bg-white shadow-xl border-2 border-gray-200 flex items-center justify-center hover:bg-gradient-to-r from-pink-500 to-purple-500 hover:text-white hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 text-pink-500"
                aria-label="Instagram"
              >
<Instagram className="w-5 h-5" />
              </motion.button>
                <motion.button 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => window.open('https://youtube.com', '_blank')}
                className="w-12 h-12 rounded-2xl bg-white shadow-xl border-2 border-gray-200 flex items-center justify-center hover:bg-red-500 hover:text-white hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 text-red-500"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8 tracking-wider">QUICK LINKS</h4>
            <ul className="space-y-2">
              <li><Link to="/destinations" className="block py-2 text-white/70 hover:text-white hover:underline decoration-gold/50 transition-all duration-300 text-sm font-medium">Destinations</Link></li>
              <li><Link to="/tours" className="block py-2 text-white/70 hover:text-white hover:underline decoration-gold/50 transition-all duration-300 text-sm font-medium">Tour Packages</Link></li>
              <li><Link to="/car-rental" className="block py-2 text-white/70 hover:text-white hover:underline decoration-gold/50 transition-all duration-300 text-sm font-medium">Car Rental</Link></li>
              <li><Link to="/about" className="block py-2 text-white/70 hover:text-white hover:underline decoration-gold/50 transition-all duration-300 text-sm font-medium">Our Story</Link></li>
              <li><Link to="/contact" className="block py-2 text-white/70 hover:text-white hover:underline decoration-gold/50 transition-all duration-300 text-sm font-medium">Legal Mentions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-8 tracking-wider">GET IN TOUCH</h4>
            <div className="flex flex-col gap-5 text-white/50 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold" />
                <span>Area 47, Lilongwe, Malawi</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" />
                <span>+265 999 123 456</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" />
                <span>hello@warmheartmw.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-8 tracking-wider">NEWSLETTER</h4>
            <p className="text-white/60 text-sm mb-6">Subscribe for Malawi travel stories, offers, and seasonal updates.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                id="newsletter-email"
                placeholder="Your Email Address" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
              />
                <motion.button 
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.25 }}
                type="button" 
                onClick={() => {
                  const email = (document.getElementById('newsletter-email') as HTMLInputElement)?.value;
                  if (email) {
                    alert(`Thank you for subscribing with ${email}! Check your inbox for Malawi travel updates.`);
                    (document.getElementById('newsletter-email') as HTMLInputElement).value = '';
                  }
                }}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition-all duration-300 text-lg tracking-wide uppercase"
              >
                Subscribe Now
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-[10px] uppercase font-bold tracking-[0.2em]">
            © 2026 WARMHEART INTERACTIVE. ALL RIGHTS RESERVED.
          </p>
            <div className="flex gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-white/30">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
