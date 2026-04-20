import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Destination, Tour, Car } from '../data/dataStore';

type CartItem =
  | {
      id: string;
      type: 'tour';
      item: Tour;
      bookingDetails: {
        date: string;
        travelers: number;
      };
      price: number;
    }
  | {
      id: string;
      type: 'car';
      item: Car;
      bookingDetails: {
        days: number;
        pickup: string;
      };
      price: number;
    }
  | {
      id: string;
      type: 'destination';
      item: Destination;
      bookingDetails: {
        date: string;
        travelers: number;
      };
      price: number;
    };

type NewCartItem =
  | {
      type: 'tour';
      item: Tour;
      bookingDetails: {
        date: string;
        travelers: number;
      };
      price: number;
    }
  | {
      type: 'car';
      item: Car;
      bookingDetails: {
        days: number;
        pickup: string;
      };
      price: number;
    }
  | {
      type: 'destination';
      item: Destination;
      bookingDetails: {
        date: string;
        travelers: number;
      };
      price: number;
    };

interface WishlistItem {
  id: string;
  destination: Destination;
}

interface BookingContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (item: NewCartItem) => void;
  removeFromCart: (id: string) => void;
  addToWishlist: (dest: Destination) => void;
  removeFromWishlist: (id: string) => void;
  clearCart: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const cartStorageKey = 'warmheart_malawi_cart';
  const wishlistStorageKey = 'warmheart_malawi_wishlist';

  // Load from localStorage on init
  useEffect(() => {
    const savedCart =
      localStorage.getItem(cartStorageKey) ??
      localStorage.getItem('warmheart_cart');
    const savedWishlist =
      localStorage.getItem(wishlistStorageKey) ??
      localStorage.getItem('warmheart_wishlist');
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        setCart([]);
      }
    }
    
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
        setWishlist([]);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(cartStorageKey, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(wishlistStorageKey, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (item: NewCartItem) => {
    setCart((prev) => [...prev, { ...item, id: `${item.type}-${item.item.id}-${Date.now()}` }]);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const addToWishlist = (dest: Destination) => {
    if (!wishlist.find(w => w.destination.id === dest.id)) {
      setWishlist((prev) => [...prev, { id: dest.id, destination: dest }]);
    }
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <BookingContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, addToWishlist, removeFromWishlist, clearCart }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
