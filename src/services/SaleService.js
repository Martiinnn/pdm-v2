const BASE_URL = import.meta.env.VITE_API_URL || 'https://pdm-back-1.onrender.com/api';
const jsonHeaders = { 'Content-Type': 'application/json' };

const SaleService = {
    async create(venta) {
        const res = await fetch(`${BASE_URL}/ventas`, {
            method: 'POST',
            headers: jsonHeaders,
            body: JSON.stringify(venta)
        });
        if (!res.ok) throw new Error('Error creando venta');
        return res.json();
    }
};

export default SaleService;
