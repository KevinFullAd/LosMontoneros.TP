import { Producto } from "../associations.js";

// Crear producto
export async function crearProducto(req, res) {
  try {
    const { nombre, descripcion, precio, imagen, categoria } = req.body;
    if (!nombre || !precio)
      return res.status(400).json({ error: "Nombre y precio son obligatorios" });

    const producto = await Producto.create({
      nombre,
      descripcion,
      precio: parseFloat(precio),
      imagen,
      categoria,
      activo: true,
    });

    res.json({ message: "Producto creado correctamente", producto });
  } catch (err) {
    console.error("Error al crear producto:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Actualizar producto
export async function actualizarProducto(req, res) {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, imagen, categoria } = req.body;

    const producto = await Producto.findByPk(id);
    if (!producto)
      return res.status(404).json({ error: "Producto no encontrado" });

    await producto.update({
      nombre,
      descripcion,
      precio: parseFloat(precio),
      imagen,
      categoria,
    });

    res.json({ message: "Producto actualizado", producto });
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Activar / desactivar
export async function toggleProductoActivo(req, res) {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto)
      return res.status(404).json({ error: "Producto no encontrado" });

    producto.activo = !producto.activo;
    await producto.save();

    res.json({
      message: "Estado actualizado",
      activo: producto.activo,
    });
  } catch (err) {
    console.error("Error al cambiar estado:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Eliminar producto
export async function eliminarProducto(req, res) {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto)
      return res.status(404).json({ error: "Producto no encontrado" });

    await producto.destroy();
    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
