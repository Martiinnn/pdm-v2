import { useState } from 'react';

const ContactModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        privacy: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [validated, setValidated] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }
        setValidated(true);

        // Simulate submission
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
        }, 2000);
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
        onClose();
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            privacy: false
        });
        setValidated(false);
    };

    if (showSuccess) {
        return (
            <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center m-4">
                    <div className="mb-6">
                        <i className="fas fa-check-circle text-green-500 text-6xl"></i>
                    </div>
                    <h4 className="text-2xl font-light mb-3">¡Mensaje Enviado!</h4>
                    <p className="text-gray-500 mb-6">Gracias por contactarnos. Nos pondremos en contacto contigo pronto.</p>
                    <button onClick={handleCloseSuccess} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Cerrar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-10">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl m-4 relative">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-4 rounded-t-xl flex justify-between items-center">
                    <h5 className="text-xl font-light flex items-center">
                        <i className="fas fa-paper-plane mr-3"></i>Formulario de Contacto
                    </h5>
                    <button onClick={onClose} className="text-white hover:text-gray-200 focus:outline-none">
                        <i className="fas fa-times text-xl"></i>
                    </button>
                </div>

                <div className="p-6">
                    <form id="contactForm" noValidate className={validated ? 'was-validated' : ''} onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="firstName" className="block font-medium text-gray-700 mb-2"><i className="fas fa-user mr-2 text-blue-600"></i>Nombre</label>
                                <input type="text" id="firstName" required className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all invalid:border-red-500" value={formData.firstName} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block font-medium text-gray-700 mb-2"><i className="fas fa-user mr-2 text-blue-600"></i>Apellido</label>
                                <input type="text" id="lastName" required className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all invalid:border-red-500" value={formData.lastName} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="email" className="block font-medium text-gray-700 mb-2"><i className="fas fa-envelope mr-2 text-blue-600"></i>Correo Electrónico</label>
                                <input type="email" id="email" required className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all invalid:border-red-500" value={formData.email} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block font-medium text-gray-700 mb-2"><i className="fas fa-phone mr-2 text-blue-600"></i>Teléfono</label>
                                <input type="tel" id="phone" required className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all invalid:border-red-500" value={formData.phone} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="subject" className="block font-medium text-gray-700 mb-2"><i className="fas fa-tag mr-2 text-blue-600"></i>Motivo de Consulta</label>
                            <select id="subject" required className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all invalid:border-red-500" value={formData.subject} onChange={handleChange}>
                                <option value="">Selecciona un motivo</option>
                                <option value="compra">Compra de Vehículo</option>
                                <option value="financiamiento">Financiamiento</option>
                                <option value="servicio">Servicio Técnico</option>
                                <option value="garantia">Garantía</option>
                                <option value="cotizacion">Cotización</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="message" className="block font-medium text-gray-700 mb-2"><i className="fas fa-comment mr-2 text-blue-600"></i>Mensaje</label>
                            <textarea id="message" rows="4" required className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all invalid:border-red-500" placeholder="Describe tu consulta en detalle..." value={formData.message} onChange={handleChange}></textarea>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-center">
                                <input type="checkbox" id="privacy" required className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 invalid:border-red-500" checked={formData.privacy} onChange={handleChange} />
                                <label htmlFor="privacy" className="ml-2 text-gray-700">
                                    Acepto los <a href="#" className="text-blue-600 hover:underline">términos y condiciones</a> y la <a href="#" className="text-blue-600 hover:underline">política de privacidad</a>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button type="button" onClick={onClose} className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors">
                                <i className="fas fa-times mr-2"></i>Cancelar
                            </button>
                            <button type="submit" disabled={isSubmitting} className="px-6 py-3 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70">
                                {isSubmitting ? <><i className="fas fa-spinner fa-spin mr-2"></i>Enviando...</> : <><i className="fas fa-paper-plane mr-2"></i>Enviar Mensaje</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
