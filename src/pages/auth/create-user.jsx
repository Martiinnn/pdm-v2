import React, { useState } from "react";
import { Link } from "react-router-dom";
import { generarMensaje } from '../../utils/GenerarMensaje';
import UserService from '../../services/UserService';

const CreateUser = () => {
    const [form, setForm] = useState({ nombre:"" ,correo: "", contrasena: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.correo || !form.contrasena) {
            generarMensaje('Completa todos los campos', 'warning');
            return;
        }

        setLoading(true);

        try {
            const usuario = {
                "nombre": form.nombre,
                "correo": form.correo,
                "contrasena": form.contrasena,
                rol: {
                    "id": 3
                }
            }
            await UserService.createUser(usuario);

            generarMensaje('usuario creado!', 'success');

            // Redirigir al dashboard
            /*setTimeout(() => {
                navigate('/dashboard');
            }, 800);*/

        } catch (error) {
            // ERRORES
            const msg = error.response?.data?.message || 'Error al crear usuario';
            generarMensaje(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-orange-800 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8 rounded-2xl bg-white/10 p-10 backdrop-blur-xl shadow-2xl">
                <h1 className="text-center text-4xl font-medium mb-2 text-white">Crear usuario</h1>
                <div className="space-y-6">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre usuario"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        className="w-full border-b-2 bg-transparent text-lg text-white placeholder-white/70 duration-300 focus-within:border-indigo-400"
                    />
                    <input
                        type="email"
                        name="correo"
                        placeholder="Correo Electrónico"
                        value={form.correo}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        className="w-full border-b-2 bg-transparent text-lg text-white placeholder-white/70 duration-300 focus-within:border-indigo-400"
                    />
                    <input
                        type="password"
                        name="contrasena"
                        placeholder="Contraseña"
                        value={form.contrasena}
                        onChange={handleChange}
                        required
                        autoComplete="current-password"
                        className="w-full border-b-2 bg-transparent text-lg text-white placeholder-white/70 duration-300 focus-within:border-indigo-400"
                    />
                </div>
                <button type="submit" disabled={loading} className="transform w-full mt-4 mb-2 rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">{loading ? 'Creando...' : 'Crear usuario'}</button>
                <p className="text-center text-lg">
                    <Link to="/login" className="text-indigo-300 hover:text-indigo-200 underline transition">Ya tengo un usuario</Link>
                </p>
            </form>
        </main>
    );
}

export default CreateUser;   
