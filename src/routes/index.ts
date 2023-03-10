import { Router } from "express";
const router = Router();

import { createPhoto, getPhotos, getPhoto, updatePhoto, deletePhoto } from "../controllers/photo.controller";
import multer from '../libs/multer';

// Rutas de la app
router.route('/photos')
        .get(getPhotos)
        // Indicar que el api ya acepta imagenes
        .post(multer.single('image'), createPhoto);

router.route('/photos/:id')
        .get(getPhoto)
        .put(updatePhoto)
        .delete(deletePhoto);

export default router;
