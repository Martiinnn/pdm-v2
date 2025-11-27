import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/public/Landing';
import Catalog from './pages/public/Catalog';
import UserHome from './pages/public/UserHome';
import Checkout from './pages/public/Checkout';
import CheckoutSuccess from './pages/public/CheckoutSuccess';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import { useAuth } from './components/context/AuthContext.jsx';

function AppContent() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartItems, addToCart, removeFromCart } = useAuth();
    const location = useLocation();

    const openContact = () => setIsContactOpen(true);
    const closeContact = () => setIsContactOpen(false);

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const handleAddToCart = (item) => {
        addToCart(item);
        setIsCartOpen(true);
    };

    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <div className="relative min-h-screen font-sans flex flex-col">
            {!isAdminRoute && (
                <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-[url('/img/fondo.avif')] bg-cover bg-fixed opacity-95"></div>
            )}

            {!isAdminRoute && (
                <Navbar
                    onContactClick={openContact}
                    onCartClick={toggleCart}
                    cartCount={cartItems.length}
                />
            )}

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Landing onAddToCart={handleAddToCart} onContactClick={openContact} />} />
                    <Route path="/catalog" element={<Catalog onAddToCart={handleAddToCart} />} />
                    <Route path="/user" element={<UserHome />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/checkout/success" element={<CheckoutSuccess />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>

            {!isAdminRoute && <Footer />}

            <ContactModal isOpen={isContactOpen} onClose={closeContact} />
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                removeFromCart={removeFromCart}
            />
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
