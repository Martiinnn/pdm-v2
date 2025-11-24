import Hero from '../../components/Hero';
import Carousel from '../../components/Carousel';
import ContactSection from '../../components/ContactSection';

const Home = ({ onAddToCart, onContactClick }) => {
    return (
        <>
            <Hero />
            <Carousel onAddToCart={onAddToCart} />
            <ContactSection onContactClick={onContactClick} />
        </>
    );
};

export default Home;
