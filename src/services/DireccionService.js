const BASE_URL = import.meta.env.VITE_API_URL || 'https://pdm-back-1.onrender.com/api';
const jsonHeaders = { 'Content-Type': 'application/json' };

const DireccionService = {
    async create(direccion) {
        const res = await fetch(`${BASE_URL}/direcciones`, {
            method: 'POST',
            headers: jsonHeaders,
            body: JSON.stringify(direccion)
        });
        if (!res.ok) throw new Error('Error creando dirección');
        return res.json();
    }
};

export default DireccionService;
