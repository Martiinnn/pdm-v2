const Hero = () => {
    return (
        <section id="home" className="relative min-h-[70vh] flex items-center justify-center text-center text-white py-20">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <h1 className="font-roboto-slab font-bold text-5xl md:text-7xl mb-8">Encuentra tu Auto Perfecto</h1>
                    <p className="text-xl md:text-2xl mb-8 font-light">Descubre nuestra amplia selección de vehículos de calidad premium</p>
                    <button className="border border-white text-white px-8 py-3 rounded hover:bg-white hover:text-black transition-colors duration-300">
                        Ver Catálogo
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
