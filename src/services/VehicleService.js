const BASE_URL = import.meta.env.VITE_API_URL || 'https://pdm-back-1.onrender.com/api';

const jsonHeaders = { 'Content-Type': 'application/json' };

const VehicleService = {
    async getAll() {
        const res = await fetch(`${BASE_URL}/autos`);
        if (!res.ok) {
            if (res.status === 204) return [];
            throw new Error('Error fetching vehicles');
        }
        return res.json();
    },

    async getById(id) {
        const res = await fetch(`${BASE_URL}/autos/${id}`);
        if (!res.ok) throw new Error('Error fetching vehicle');
        return res.json();
    },

    async create(vehicle) {
        const res = await fetch(`${BASE_URL}/autos`, {
            method: 'POST',
            headers: jsonHeaders,
            body: JSON.stringify(vehicle)
        });
        if (!res.ok) throw new Error('Error creating vehicle');
        return res.json();
    },

    async update(id, vehicle) {
        const res = await fetch(`${BASE_URL}/autos/${id}`, {
            method: 'PUT',
            headers: jsonHeaders,
            body: JSON.stringify(vehicle)
        });
        if (!res.ok) throw new Error('Error updating vehicle');
        return res.json();
    },

    async delete(id) {
        const res = await fetch(`${BASE_URL}/autos/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Error deleting vehicle');
        return true;
    },

    async getTypes() {
        const res = await fetch(`${BASE_URL}/tipos-auto`);
        if (!res.ok) {
            if (res.status === 204) return [];
            throw new Error('Error fetching vehicle types');
        }
        return res.json();
    }
};

export default VehicleService;
