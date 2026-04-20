import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, Heart, Compass } from 'lucide-react';
import { cn } from '../lib/utils';
import { useBooking } from '../context/BookingContext';
import UniversalBookingModal from './UniversalBookingModal';
import type { Car, Tour, Destination } from '../data/dataStore';
import { tours } from '../data/dataStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const { cart, wishlist, removeFromWishlist } = useBooking();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Tours', path: '/tours' },
    { name: 'Car Rental', path: '/car-rental' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleBookNow = () => {
    navigate('/destinations');
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 outline-none',
        isTransparent ? 'bg-transparent' : 'bg-white shadow-md'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Compass className={cn("w-8 h-8 transition-transform group-hover:rotate-45", isTransparent ? "text-white" : "text-gold")} />
          <span className={cn("text-2xl font-display font-bold tracking-tight", isTransparent ? "text-white" : "text-navy")}>
            WarmHeart
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-base font-medium tracking-wide transition-colors hover:text-gold",
                isTransparent ? "text-white" : "text-navy",
                location.pathname === link.path && "text-gold"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons & Book Now */}
        <div className="flex items-center gap-5">
          <div 
            className="relative group cursor-pointer hidden sm:block"
            onClick={() => setShowWishlist(true)}
          >
            <Heart className={cn("w-5 h-5 transition-colors group-hover:text-gold", isTransparent ? "text-white" : "text-navy")} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <Link to="/cart" className="relative group">
            <ShoppingCart className={cn("w-5 h-5 transition-colors group-hover:text-gold", isTransparent ? "text-white" : "text-navy")} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-navy text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className={isTransparent ? "text-white" : "text-navy"} /> : <Menu className={isTransparent ? "text-white" : "text-navy"} />}
          </button>
          <button
            className="hidden lg:block btn-primary text-base py-2 px-6"
            onClick={handleBookNow}
          >
            BOOK NOW
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-navy text-lg font-medium border-b border-gray-100 pb-2"
              >
                {link.name}
              </Link>
            ))}
            <button onClick={handleBookNow} className="btn-primary w-full mt-2">
              BOOK NOW
            </button>
          </div>
        </div>
      )}

      {/* Wishlist Modal */}
      {showWishlist && (
        <div className="fixed inset-0 z-[100] bg-navy/80 backdrop-blur flex items-center justify-center p-4" onClick={() => setShowWishlist(false)}>
          <div 
            className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl max-h-[80vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Wishlist</h2>
              <button onClick={() => setShowWishlist(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {wishlist.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your wishlist is empty</p>
                  <button 
                    onClick={() => {
                      setShowWishlist(false);
                      navigate('/destinations');
                    }}
                    className="mt-4 btn-primary"
                  >
                    Browse Destinations
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlist.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <img 
                        src={item.destination.image} 
                        alt={item.destination.name}
                        className="w-24 h-24 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Malawi%20%286524740085%29.jpg';
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{item.destination.name}</h3>
                        <p className="text-sm text-gray-500">{item.destination.region}</p>
                        <p className="text-gold font-bold mt-1">MWK {item.destination.price.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setShowWishlist(false);
                            navigate('/destinations');
                          }}
                          className="px-4 py-2 bg-navy text-white rounded-lg text-sm hover:bg-gold transition-colors"
                        >
                          Book
                        </button>
                        <button 
                          onClick={() => removeFromWishlist(item.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
