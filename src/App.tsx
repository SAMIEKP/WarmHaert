import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Tours from './pages/Tours';
import CarRental from './pages/CarRental';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Receipt from './pages/Receipt';
import { BookingProvider } from './context/BookingContext';

export default function App() {
  return (
    <BookingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="destinations" element={<Destinations />} />
            <Route path="tours" element={<Tours />} />
            <Route path="car-rental" element={<CarRental />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="receipt/:refId" element={<Receipt />} />
        </Route>
      </Routes>
      </Router>
    </BookingProvider>
  );
}
