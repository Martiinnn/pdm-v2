import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { generarMensaje } from '../../utils/GenerarMensaje';
import UserService from '../../services/UserService';
import { useAuth } from '../../components/context/AuthContext';

const Login = () => {
    const [form, setForm] = useState({ correo: "", contrasena: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

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
            const response = await UserService.login(form);
            const usuario = response.data; // YA ES EL USUARIO COMPLETO

            // GUARDA SOLO user (SIN token)
            localStorage.setItem('user', JSON.stringify({
                id: usuario.id,
                nombre: usuario.nombre,
                rol: usuario.rol
            }));

            // USA EL CONTEXTO
            login({
                id: usuario.id,
                nombre: usuario.nombre,
                rol: usuario.rol
            });

            generarMensaje(`¡Bienvenido ${usuario.nombre}!`, 'success');

            setTimeout(() => {
                if (usuario.rol.id === 1 || usuario.rol.id === 2) {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/');
                }
            }, 1500);

        } catch (error) {
            const msg = error.response?.data || 'Credenciales inválidas';
            generarMensaje(msg, 'error');
        } finally {
            setLoading(false);
            setForm({ correo: "", contrasena: "" });
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-orange-800 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8 rounded-2xl bg-white/10 p-10 backdrop-blur-xl shadow-2xl">
                <h1 className="text-center text-4xl font-medium mb-2 text-white">Inicio de Sesión</h1>
                <div className="space-y-6">
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
                <button
                    type="submit"
                    disabled={loading}
                    className="transform w-full mt-4 mb-2 rounded-sm py-2 font-bold duration-300 bg-indigo-600 hover:bg-indigo-400"
                >
                    {loading ? "Iniciando..." : "Iniciar Sesión"}
                </button>
                <p className="text-center text-lg">
                    <Link to="/create-user" className="text-indigo-300 hover:text-indigo-200 underline transition">Crear usuario</Link>
                </p>
            </form>
        </main>
    );
}

export default Login;
