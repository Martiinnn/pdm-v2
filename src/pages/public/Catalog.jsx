import { useState, useEffect } from 'react';
import VehicleService from '../../services/VehicleService';

const Catalog = ({ onAddToCart }) => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setVehicles(mappedVehicles);
            } catch (err) {
                console.error(err);
                setError('No se pudieron cargar los vehículos.');
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    if (loading) return <div className="pt-24 text-center">Cargando catálogo...</div>;
    if (error) return <div className="pt-24 text-center text-red-500">{error}</div>;

    return (
        <div className="pt-24 pb-20 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-light mb-4">Catálogo Completo</h1>
                    <p className="text-gray-500 text-lg">Explora nuestra colección de vehículos premium</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                            <div className="relative h-64 bg-gray-100 flex items-center justify-center p-6 overflow-hidden">
                                <img
                                    src={vehicle.img}
                                    alt={vehicle.alt}
                                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-medium mb-1">{vehicle.model}</h3>
                                        <p className="text-gray-500 text-sm">{vehicle.desc}</p>
                                    </div>
                                    <span className="bg-gray-100 text-gray-800 text-xs font-bold px-2 py-1 rounded uppercase">
                                        Electric
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <i className="fas fa-tachometer-alt text-blue-500"></i>
                                        <span>{vehicle.speed}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i className="fas fa-charging-station text-blue-500"></i>
                                        <span>{vehicle.range}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-xl font-bold text-gray-900">{vehicle.price}</span>
                                    <button
                                        onClick={() => onAddToCart(vehicle)}
                                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                                    >
                                        <i className="fas fa-shopping-cart text-sm"></i>
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Catalog;
