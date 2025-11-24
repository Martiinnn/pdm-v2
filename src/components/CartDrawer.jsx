import { useEffect } from 'react';

const CartDrawer = ({ isOpen, onClose, cartItems, removeFromCart }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const total = cartItems.reduce((sum, item) => {
        const price = parseInt(item.price.replace(/[^0-9]/g, ''));
        return sum + price;
    }, 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex justify-end">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-light flex items-center gap-2">
                        <i className="fas fa-shopping-cart text-blue-600"></i>
                        Tu Carrito
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <i className="fas fa-times text-gray-500"></i>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <i className="fas fa-shopping-basket text-6xl mb-4 opacity-50"></i>
                            <p className="text-lg">Tu carrito está vacío</p>
                            <button onClick={onClose} className="mt-4 text-blue-600 hover:underline">
                                Ver vehículos
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="flex gap-4 p-3 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center p-2">
                                        <img src={item.img} alt={item.model} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-medium text-lg">{item.model}</h3>
                                            <button
                                                onClick={() => removeFromCart(index)}
                                                className="text-red-400 hover:text-red-600 transition-colors"
                                                title="Eliminar"
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2">{item.desc}</p>
                                        <p className="font-bold text-blue-600">{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-6 border-t bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">Total Estimado</span>
                            <span className="text-2xl font-bold text-gray-900">
                                ${total.toLocaleString('es-CL')}
                            </span>
                        </div>
                        <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            Proceder al Pago
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
