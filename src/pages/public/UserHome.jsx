import React, { useState, useEffect } from 'react';
import VehicleService from '../../services/VehicleService';

const VehiclesList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = await VehicleService.getAll();
                const mappedVehicles = data.map(v => ({
                    id: v.id,
                    model: v.modelo,
                    range: v.rango,
                    speed: v.velocidad,
                    price: v.precio ? `$${v.precio.toLocaleString()}` : 'Consultar'
                }));
                setItems(mappedVehicles);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, []);

    if (loading) return <div className="container mx-auto py-10">Cargando...</div>;

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-light mb-6">Vehículos Disponibles</h2>
            <table className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left p-3">Modelo</th>
                        <th className="text-left p-3">Autonomía</th>
                        <th className="text-left p-3">Velocidad</th>
                        <th className="text-left p-3">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(v => (
                        <tr key={v.id} className="border-t">
                            <td className="p-3">{v.model}</td>
                            <td className="p-3">{v.range}</td>
                            <td className="p-3">{v.speed}</td>
                            <td className="p-3">{v.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default VehiclesList;
