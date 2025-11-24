import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onContactClick, onCartClick, cartCount }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled
            ? 'bg-white/98 border-black/10 shadow-lg'
            : 'bg-transparent border-white/35'
            }`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link className={`font-roboto-slab text-2xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`} to="/">
                        PDM
                    </Link>

                    <button
                        className="lg:hidden focus:outline-none"
                        onClick={toggleMenu}
                        type="button"
                    >
                        <span className={`block w-6 h-0.5 mb-1 transition-colors ${scrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
                        <span className={`block w-6 h-0.5 mb-1 transition-colors ${scrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
                        <span className={`block w-6 h-0.5 transition-colors ${scrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
                    </button>

                    <div className={`lg:flex ${isOpen ? 'block absolute top-16 left-0 w-full bg-white p-4 shadow-lg' : 'hidden'} lg:static lg:bg-transparent lg:p-0 lg:shadow-none`}>
                        <ul className="flex flex-col lg:flex-row lg:ml-auto gap-4 lg:gap-8 items-center">
                            <li>
                                <Link className={`font-roboto-slab hover:opacity-80 ${scrolled || isOpen ? 'text-gray-900' : 'text-white'}`} to="/">INICIO</Link>
                            </li>
                            <li>
                                <Link className={`font-roboto-slab hover:opacity-80 ${scrolled || isOpen ? 'text-gray-900' : 'text-white'}`} to="/catalog">VEHÍCULOS</Link>
                            </li>
                            <li>
                                <button
                                    className={`font-roboto-slab hover:opacity-80 ${scrolled || isOpen ? 'text-gray-900' : 'text-white'}`}
                                    onClick={onContactClick}
                                >
                                    CONTACTO
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`relative font-roboto-slab hover:opacity-80 ${scrolled || isOpen ? 'text-gray-900' : 'text-white'}`}
                                    onClick={onCartClick}
                                >
                                    <i className="fas fa-shopping-cart text-xl"></i>
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
