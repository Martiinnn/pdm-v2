const Footer = () => {
    return (
        <footer className="border-t border-white/20 py-8 bg-black/70 backdrop-blur-md relative z-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h5 className="text-white font-roboto-slab text-lg font-bold">PDM</h5>
                        <p className="text-white/50">Tu concesionario de confianza desde 1995</p>
                    </div>
                    <div className="text-right">
                        <p className="text-white/50 mb-0">&copy; 2025 PDM. Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
