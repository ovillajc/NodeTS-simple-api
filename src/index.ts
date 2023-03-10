// utilizamos express
import app  from './app';
import startConnection from './database/config';



// Llamado del servidor
async function main() {
    // Llamado de la base de datos
    startConnection();

    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

main();



