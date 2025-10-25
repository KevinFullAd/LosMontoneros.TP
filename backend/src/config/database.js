import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database/database.sqlite'),
    logging: false
});

// Sincroniza modelos al iniciar
(async () => {
    try {
        await sequelize.sync();
        console.log('Base de datos sincronizada');
    } catch (err) {
        console.error('Error al sincronizar DB:', err);
    }
})();
