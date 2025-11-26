const BASE_URL = import.meta.env.VITE_API_URL || 'https://pdm-back-1.onrender.com/api';

const jsonHeaders = { 'Content-Type': 'application/json' };

const UserService = {
  async login({ correo, contrasena }) {
    const res = await fetch(`${BASE_URL}/usuarios/login`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify({ correo, contrasena })
    }).catch(() => null);
    if (!res || !res.ok) throw { response: { data: 'Credenciales inválidas' } };
    const data = await res.json().catch(() => null);
    return { data };
  },

  async createUser(usuario) {
    const res = await fetch(`${BASE_URL}/usuarios`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify(usuario)
    }).catch(() => null);
    if (!res || !res.ok) throw { response: { data: 'Error al crear usuario' } };
    const data = await res.json().catch(() => null);
    return { data };
  }
};

export default UserService;
