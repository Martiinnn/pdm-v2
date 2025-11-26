import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/context/AuthContext';
import UserService from '../../services/UserService';
import ComunaService from '../../services/ComunaService';
import DireccionService from '../../services/DireccionService';
import SaleService from '../../services/SaleService';
import VehicleService from '../../services/VehicleService';

const Checkout = () => {
    const { cartItems, clearCart } = useAuth();
    const navigate = useNavigate();
    const [comunas, setComunas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        nombre: '',
        correo: '',
        contrasena: '',
        direccionNombre: '',
        direccionNumero: '',
        comunaId: '',
        fechaRetiro: ''
    });

    useEffect(() => {
        const load = async () => {
            try {
                const data = await ComunaService.getAll();
                const valid = Array.isArray(data) ? data.filter(c => c && typeof c.nombre === 'string' && c.nombre.toLowerCase() !== 'string') : [];
                setComunas(valid);
            } catch {}
        };
        load();
    }, []);

    const total = cartItems.reduce((sum, item) => {
        const price = parseInt(item.price.replace(/[^0-9]/g, ''));
        return sum + price;
    }, 0);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const purchasedItems = [...cartItems];
            const usuario = await UserService.createUser({
                nombre: form.nombre,
                correo: form.correo,
                contrasena: form.contrasena
            }).then(r => r.data || r);

            await DireccionService.create({
                nombre: form.direccionNombre,
                numero: form.direccionNumero,
                usuario: { id: usuario.id },
                comuna: { id: parseInt(form.comunaId) }
            });

            const venta = await SaleService.create({
                estadoVenta: { id: 1 },
                metodoPago: { id: 1 },
                metodoEnvio: { id: 1 },
                fechaRetiro: form.fechaRetiro || null
            });

            for (const item of cartItems) {
                await VehicleService.patch(item.id, { venta: { id: venta.id } });
            }

            const comunaNombre = comunas.find(c => String(c.id) === String(form.comunaId))?.nombre || '';
            const totalValor = total;
            navigate('/checkout/success', { state: { nombre: form.nombre, correo: form.correo, comunaNombre, fechaRetiro: form.fechaRetiro, total: totalValor, items: purchasedItems } });
            clearCart();
        } catch (err) {
            console.error('Checkout error', err);
            alert('Error procesando el checkout: verifica datos de comuna y fecha de retiro');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-light mb-6">Agendar Retiro</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow p-6">
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm mb-1">Nombre</label>
                            <input type="text" required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="w-full border rounded p-2" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1">Correo</label>
                                <input type="email" required value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Contraseña</label>
                                <input type="password" required value={form.contrasena} onChange={(e) => setForm({ ...form, contrasena: e.target.value })} className="w-full border rounded p-2" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1">Dirección</label>
                                <input type="text" required value={form.direccionNombre} onChange={(e) => setForm({ ...form, direccionNombre: e.target.value })} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Número</label>
                                <input type="text" required value={form.direccionNumero} onChange={(e) => setForm({ ...form, direccionNumero: e.target.value })} className="w-full border rounded p-2" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1">Comuna</label>
                                <select required value={form.comunaId} onChange={(e) => setForm({ ...form, comunaId: e.target.value })} className="w-full border rounded p-2">
                                    <option value="">Seleccionar...</option>
                                    {comunas.map(c => (
                                        <option key={c.id} value={c.id}>{c.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Fecha de retiro</label>
                                <input type="date" value={form.fechaRetiro} onChange={(e) => setForm({ ...form, fechaRetiro: e.target.value })} className="w-full border rounded p-2" />
                            </div>
                        </div>
                        <button type="submit" disabled={loading || cartItems.length === 0} className="w-full py-3 bg-blue-600 text-white rounded-lg">{loading ? 'Procesando...' : 'Confirmar'}</button>
                    </form>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-xl font-medium mb-4">Resumen</h3>
                    <ul className="space-y-3">
                        {cartItems.map((item, idx) => (
                            <li key={`${item.id}-${idx}`} className="flex justify-between">
                                <span>{item.model}</span>
                                <span>{item.price}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 flex justify-between border-t pt-4">
                        <span>Total</span>
                        <span>${total.toLocaleString('es-CL')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
