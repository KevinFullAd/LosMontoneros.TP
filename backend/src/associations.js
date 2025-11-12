// backend/src/associations.js
import Producto from './models/Producto.js';
import Venta from './models/Venta.js';
import VentaProducto from './models/VentaProducto.js';
import UsuarioAdmin from './models/UsuarioAdmin.js';

// Venta ↔ VentaProducto ↔ Producto
Venta.hasMany(VentaProducto, { foreignKey: 'ventaId', as: 'ventaProductos' });
VentaProducto.belongsTo(Venta, { foreignKey: 'ventaId', as: 'venta' });

Producto.hasMany(VentaProducto, { foreignKey: 'productoId', as: 'ventaProductos' });
VentaProducto.belongsTo(Producto, { foreignKey: 'productoId', as: 'producto' });

// UsuarioAdmin ↔ Venta
UsuarioAdmin.hasMany(Venta, { foreignKey: 'usuarioAdminId', as: 'ventas' });
Venta.belongsTo(UsuarioAdmin, { foreignKey: 'usuarioAdminId', as: 'admin' });

export { Producto, Venta, VentaProducto, UsuarioAdmin };
