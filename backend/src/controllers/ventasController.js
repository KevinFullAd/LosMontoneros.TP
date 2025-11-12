import { Venta, VentaProducto, Producto, UsuarioAdmin } from "../associations.js";

/**
 * Crear una nueva venta
 * POST /api/ventas
 */
export async function crearVenta(req, res) {
    try {
        const { clienteNombre, productos } = req.body;
        // productos = [{ productoId, cantidad, precioUnitario }]

        if (!clienteNombre || !productos?.length) {
            return res.status(400).json({ error: "Faltan datos de la venta o productos." });
        }

        const total = productos.reduce(
            (sum, p) => sum + p.precioUnitario * p.cantidad,
            0
        );

        const venta = await Venta.create({
            clienteNombre,
            fecha: new Date(),
            total,
            usuarioAdminId: req.session?.adminId || null, // opcional
        });

        // Relacionar productos vendidos
        for (const p of productos) {
            await VentaProducto.create({
                ventaId: venta.id,
                productoId: p.productoId,
                cantidad: p.cantidad,
                precioUnitario: p.precioUnitario,
            });
        }

        res.status(201).json({ message: "Venta registrada correctamente", venta });
    } catch (err) {
        console.error("Error al crear venta:", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

/**
 * Listar todas las ventas
 * GET /api/ventas
 */
export async function listarVentas(req, res) {
    try {
        const ventas = await Venta.findAll({
            include: [
                {
                    model: VentaProducto,
                    as: "ventaProductos",
                    include: [{ model: Producto, as: "producto" }],
                },
                {
                    model: UsuarioAdmin,
                    as: "admin",
                    attributes: ["email"],
                },
            ],
            order: [["fecha", "DESC"]],
        });

        res.json({ ventas });
    } catch (err) {
        console.error("Error al listar ventas:", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
