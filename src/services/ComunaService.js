const BASE_URL = import.meta.env.VITE_API_URL || 'https://pdm-back-1.onrender.com/api';

const ComunaService = {
    async getAll() {
        const res = await fetch(`${BASE_URL}/comunas`);
        if (!res.ok) {
            if (res.status === 204) return [];
            throw new Error('Error fetching comunas');
        }
        return res.json();
    }
};

export default ComunaService;
