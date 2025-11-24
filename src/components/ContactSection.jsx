const ContactSection = ({ onContactClick }) => {
    return (
        <section id="contacto" className="contact-section bg-white py-20 relative z-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="contact-item p-8 rounded-2xl bg-white/80 shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={onContactClick}>
                            <i className="fas fa-mobile-alt text-5xl text-blue-600 mb-4 block"></i>
                            <h3 className="text-xl font-light mb-2">Celular</h3>
                            <p className="text-gray-500">+569 (555) 123-4567</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="contact-item p-8 rounded-2xl bg-white/80 shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={onContactClick}>
                            <i className="fas fa-envelope text-5xl text-blue-600 mb-4 block"></i>
                            <h3 className="text-xl font-light mb-2">Correo</h3>
                            <p className="text-gray-500">info@pdm.com</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="contact-item p-8 rounded-2xl bg-white/80 shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={onContactClick}>
                            <i className="fas fa-building text-5xl text-blue-600 mb-4 block"></i>
                            <h3 className="text-xl font-light mb-2">Oficina Central</h3>
                            <p className="text-gray-500">Av. Principal 123<br />Ciudad, Duoc UC Plaza Oeste</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
