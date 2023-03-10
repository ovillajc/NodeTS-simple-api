import multer from 'multer';
import { v4 as uuid } from 'uuid';
import path from 'path';


//! Guardar imagenes en el servidor
// Indicar en donde se guardaran las imagenes y subir los archivos
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => { 
        // renombrar internamete los archivos en caso de subir otro igual
        cb(null, uuid() + path.extname(file.originalname));
    }
});

export default multer({storage});