import { Producto } from '../models/Producto.js';

// Controlador básico
export async function getAllProducts(req, res) {
    try {
        const products = await Producto.findAll({ where: { activo: true } });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener productos', details: err.message });
    }
}
