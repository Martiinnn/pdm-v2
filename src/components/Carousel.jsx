import { useState, useEffect, useRef } from 'react';
import './Carousel.css';
import VehicleService from '../services/VehicleService';

const Carousel = ({ onAddToCart }) => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [animationState, setAnimationState] = useState({});
    const autoPlayRef = useRef(null);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = await VehicleService.getAll();
                const mappedVehicles = data.map(v => ({
                    id: v.id,
                    model: v.modelo,
                    desc: v.descripcion,
                    range: v.rango,
                    speed: v.velocidad,
                    price: v.precio ? `$${v.precio.toLocaleString()}` : 'Consultar',
                    img: v.url,
                    alt: v.modelo
                }));
                // Only take first 4 or so for carousel if needed, or all
                setSlides(mappedVehicles.slice(0, 5));
            } catch (err) {
                console.error("Error loading carousel", err);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, []);

    const startAutoPlay = () => {
        stopAutoPlay();
        if (slides.length > 1) {
            autoPlayRef.current = setInterval(() => {
                nextSlide();
            }, 5000);
        }
    };

    const stopAutoPlay = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }
    };

    useEffect(() => {
        if (!loading && slides.length > 0) {
            startAutoPlay();
        }
        return () => stopAutoPlay();
    }, [currentSlide, loading, slides.length]);

    if (loading) return null;
    if (slides.length === 0) return null;

    const updateCarousel = (nextIndex, direction) => {
        if (isTransitioning) return;
        setIsTransitioning(true);

        const current = currentSlide;

        setAnimationState(prev => ({
            ...prev,
            [current]: direction === 'next' ? 'active accelerating-left' : 'active accelerating-right',
            [nextIndex]: direction === 'next' ? 'entering-right' : 'entering-left'
        }));

        setTimeout(() => {
            setCurrentSlide(nextIndex);

            setAnimationState(prev => ({
                ...prev,
                [current]: '', // Clear old slide
                [nextIndex]: direction === 'next' ? 'active entering-right' : 'active entering-left'
            }));

            setTimeout(() => {
                setAnimationState(prev => ({
                    ...prev,
                    [nextIndex]: 'active'
                }));
                setIsTransitioning(false);
            }, 800);

        }, 400);
    };

    const nextSlide = () => {
        const next = (currentSlide + 1) % slides.length;
        updateCarousel(next, 'next');
    };

    const prevSlide = () => {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel(prev, 'prev');
    };

    const goToSlide = (index) => {
        if (index === currentSlide || isTransitioning) return;
        const direction = index > currentSlide ? 'next' : 'prev';
        updateCarousel(index, direction);
    };

    return (
        <section id="best-sellers" className="bg-white py-20 relative z-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-light mb-3">Nuestros Vehículos</h2>
                    <p className="text-gray-500 text-lg">Descubre la innovación en cada detalle</p>
                </div>

                <div
                    className="tesla-carousel"
                    onMouseEnter={stopAutoPlay}
                    onMouseLeave={startAutoPlay}
                >
                    <div className="carousel-container">
                        <div
                            className="carousel-track"
                            style={{ width: `${slides.length * 100}%`, transform: `translateX(-${currentSlide * (100 / slides.length)}%)` }}
                        >
                            {slides.map((slide, index) => (
                                <div
                                    key={slide.id}
                                    className={`car-slide ${index === currentSlide ? 'active' : ''} ${animationState[index] || ''}`}
                                    style={{ width: `${100 / slides.length}%` }}
                                >
                                    <div className="car-image">
                                        <img src={slide.img} alt={slide.alt} />
                                    </div>
                                    <div className="car-info">
                                        <h3>{slide.model}</h3>
                                        <p>{slide.desc}</p>
                                        <div className="car-specs">
                                            <span>{slide.range}</span>
                                            <span>{slide.speed}</span>
                                        </div>
                                        <div className="car-price mb-4">{slide.price}</div>
                                        <button
                                            onClick={() => onAddToCart(slide)}
                                            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
                                        >
                                            <i className="fas fa-shopping-cart text-sm"></i>
                                            Agregar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="carousel-nav">
                        <button className="nav-btn prev-btn" onClick={prevSlide}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button className="nav-btn next-btn" onClick={nextSlide}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    <div className="carousel-indicators">
                        {slides.map((_, index) => (
                            <span
                                key={index}
                                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Carousel;
