import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state || {};

    const { nombre, correo, comunaNombre, fechaRetiro, total, items } = state;

    const goHome = () => navigate('/');

    if (!items || !Array.isArray(items) || items.length === 0) {
        return (
            <div className="container mx-auto py-16">
                <div className="bg-white rounded-xl shadow p-8 text-center">
                    <h2 className="text-2xl font-semibold mb-4">Compra confirmada</h2>
                    <p className="text-gray-600 mb-6">Tu orden ha sido procesada.</p>
                    <button onClick={goHome} className="px-6 py-3 bg-blue-600 text-white rounded-lg">Volver al inicio</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-16">
            <div className="bg-white rounded-xl shadow p-8">
                <h2 className="text-3xl font-light mb-6">Resumen de tu compra</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                        <div><span className="text-gray-500">Nombre:</span> <span className="font-medium">{nombre}</span></div>
                        <div><span className="text-gray-500">Correo:</span> <span className="font-medium">{correo}</span></div>
                        <div><span className="text-gray-500">Comuna:</span> <span className="font-medium">{comunaNombre}</span></div>
                        <div><span className="text-gray-500">Fecha de retiro:</span> <span className="font-medium">{fechaRetiro}</span></div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Total</span>
                            <span className="text-xl font-semibold">${(total || 0).toLocaleString('es-CL')}</span>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-medium mb-4">Vehículos</h3>
                <ul className="space-y-3 mb-8">
                    {items.map((item, idx) => (
                        <li key={`${item.id}-${idx}`} className="flex justify-between">
                            <span>{item.model}</span>
                            <span>{item.price}</span>
                        </li>
                    ))}
                </ul>

                <div className="text-center">
                    <button onClick={goHome} className="px-6 py-3 bg-blue-600 text-white rounded-lg">Volver al inicio</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
