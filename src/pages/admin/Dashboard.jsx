import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/context/AuthContext';
import VehicleService from '../../services/VehicleService';

const AdminDashboard = () => {
    const { isAdmin, logout } = useAuth();
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formData, setFormData] = useState({
        modelo: '',
        marca: 'Tesla',
        descripcion: '',
        rango: '',
        velocidad: '',
        precio: '',
        combustible: 'Eléctrico',
        origen: 'USA',
        color: 'Blanco',
        tipoAutoId: '',
        url: '/img/model_3.png'
    });

    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin/login');
        } else {
            loadData();
        }
    }, [isAdmin, navigate]);

    const loadData = async () => {
        try {
            const [vehiclesData, typesData] = await Promise.all([
                VehicleService.getAll(),
                VehicleService.getTypes()
            ]);
            setVehicles(vehiclesData);
            setVehicleTypes(typesData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const openCreateModal = () => {
        setEditingVehicle(null);
        setFormData({
            modelo: '',
            marca: 'Tesla',
            descripcion: '',
            rango: '',
            velocidad: '',
            precio: '',
            combustible: 'Eléctrico',
            origen: 'USA',
            color: 'Blanco',
            tipoAutoId: vehicleTypes[0]?.id || '',
            url: '/img/model_3.png'
        });
        setIsModalOpen(true);
    };

    const openEditModal = (vehicle) => {
        setEditingVehicle(vehicle);
        setFormData({
            modelo: vehicle.modelo,
            marca: vehicle.marca,
            descripcion: vehicle.descripcion,
            rango: vehicle.rango,
            velocidad: vehicle.velocidad,
            precio: vehicle.precio,
            combustible: vehicle.combustible,
            origen: vehicle.origen,
            color: vehicle.color,
            tipoAutoId: vehicle.tipoAuto?.id || '',
            url: vehicle.url
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        try {
            const payload = {
                modelo: formData.modelo,
                marca: formData.marca,
                descripcion: formData.descripcion,
                rango: formData.rango,
                velocidad: formData.velocidad,
                precio: parseInt(formData.precio),
                combustible: formData.combustible,
                origen: formData.origen,
                color: formData.color,
                url: formData.url,
                tipoAuto: { id: parseInt(formData.tipoAutoId) }
            };

            if (editingVehicle) {
                await VehicleService.update(editingVehicle.id, payload);
            } else {
                await VehicleService.create(payload);
            }

            setIsModalOpen(false);
            loadData();
        } catch (error) {
            console.error('Error saving vehicle:', error);
            alert('Error al guardar el vehículo');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este vehículo?')) return;
        try {
            await VehicleService.delete(id);
            loadData();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            alert('Error al eliminar el vehículo');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="text-xl text-white">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-2xl">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1">Panel de Administración</h1>
                            <p className="text-blue-100">Gestión de Vehículos</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg transition-all flex items-center gap-2 border border-white/30"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">Catálogo de Vehículos</h2>
                        <p className="text-gray-400">{vehicles.length} vehículos registrados</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium shadow-lg transition-all flex items-center gap-2 transform hover:scale-105"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Crear Vehículo
                    </button>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="text-left p-4 font-semibold text-gray-200">ID</th>
                                    <th className="text-left p-4 font-semibold text-gray-200">Imagen</th>
                                    <th className="text-left p-4 font-semibold text-gray-200">Modelo</th>
                                    <th className="text-left p-4 font-semibold text-gray-200">Marca</th>
                                    <th className="text-left p-4 font-semibold text-gray-200">Precio</th>
                                    <th className="text-left p-4 font-semibold text-gray-200">Tipo</th>
                                    <th className="text-left p-4 font-semibold text-gray-200">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicles.map((vehicle) => (
                                    <tr key={vehicle.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                                        <td className="p-4 text-gray-300">{vehicle.id}</td>
                                        <td className="p-4">
                                            <img src={vehicle.url} alt={vehicle.modelo} className="h-14 w-auto rounded-lg shadow-md" />
                                        </td>
                                        <td className="p-4 font-medium text-white">{vehicle.modelo}</td>
                                        <td className="p-4 text-gray-300">{vehicle.marca}</td>
                                        <td className="p-4 text-green-400 font-semibold">${vehicle.precio?.toLocaleString()}</td>
                                        <td className="p-4 text-gray-300">{vehicle.tipoAuto?.tipo}</td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEditModal(vehicle)}
                                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(vehicle.id)}
                                                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {vehicles.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="p-8 text-center text-gray-400">
                                            No hay vehículos registrados. ¡Crea el primero!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
                        <div className="p-6 border-b border-white/10">
                            <h3 className="text-2xl font-bold text-white">
                                {editingVehicle ? 'Editar Vehículo' : 'Crear Vehículo'}
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Modelo *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.modelo}
                                        onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Ej: Model S"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Marca *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.marca}
                                        onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Ej: Tesla"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Precio *</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.precio}
                                        onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Ej: 94990"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Auto *</label>
                                    <select
                                        required
                                        value={formData.tipoAutoId}
                                        onChange={(e) => setFormData({ ...formData, tipoAutoId: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    >
                                        <option value="" className="bg-gray-800">Seleccionar...</option>
                                        {vehicleTypes.map((type) => (
                                            <option key={type.id} value={type.id} className="bg-gray-800">{type.tipo}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Velocidad</label>
                                    <input
                                        type="text"
                                        value={formData.velocidad}
                                        onChange={(e) => setFormData({ ...formData, velocidad: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Ej: 322 km/h"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Autonomía</label>
                                    <input
                                        type="text"
                                        value={formData.rango}
                                        onChange={(e) => setFormData({ ...formData, rango: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Ej: 652 km"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Combustible</label>
                                    <input
                                        type="text"
                                        value={formData.combustible}
                                        onChange={(e) => setFormData({ ...formData, combustible: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Origen</label>
                                    <input
                                        type="text"
                                        value={formData.origen}
                                        onChange={(e) => setFormData({ ...formData, origen: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Color</label>
                                    <input
                                        type="text"
                                        value={formData.color}
                                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Imagen</label>
                                    <select
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    >
                                        <option value="/img/model_s.png" className="bg-gray-800">Model S</option>
                                        <option value="/img/model_3.png" className="bg-gray-800">Model 3</option>
                                        <option value="/img/model_x.webp" className="bg-gray-800">Model X</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
                                <textarea
                                    value={formData.descripcion}
                                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Descripción del vehículo..."
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitLoading}
                                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitLoading ? 'Guardando...' : (editingVehicle ? 'Actualizar' : 'Crear')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
