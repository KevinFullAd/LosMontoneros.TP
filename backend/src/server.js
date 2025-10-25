import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Importar rutas (cuando existan)
import productsRoutes from './routes/productsRoutes.js';
app.use('/api/products', productsRoutes);

// Ruta raíz para servir el frontend
// Servir frontend (archivos estáticos)
const frontendPath = path.join(__dirname, '../../frontend/src');
app.use(express.static(frontendPath));

// Redirigir al index SOLO rutas que no sean de API ni archivos estáticos
app.get('*', (req, res) => {
    // Si la ruta pide un archivo (tiene punto .), no devolver index.html
    if (req.path.includes('.')) {
        return res.status(404).send('Archivo no encontrado');
    }
    res.sendFile(path.join(frontendPath, 'index.html'));
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
