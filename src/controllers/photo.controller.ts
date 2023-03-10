import {Request, Response} from 'express';
import Photo from '../models/Photo';
import path from 'path';
import fs from 'fs-extra';

// Obtener fotos
export async function getPhotos(req: Request, res: Response): Promise<Response> {
    const photos = await Photo.find();

    return res.status(200).json({
        ok:true,
        photos
    });
}

// Obtener foto por id
export async function getPhoto(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;
    const photo = await Photo.findById(id);
    
    return res.status(200).json({
        ok:true,
        photo
    });
}

// Guardar una foto
export async function createPhoto(req: Request, res: Response): Promise<Response> {
    const {title, description} = req.body;
    // Saber la informacion del archivo que se subio con multer por medio de req.file
    // console.log(req.file?.path);
    const newPhoto = {
        title: title,
        description: description,
        imagePath: req.file?.path
    };
    const photo = new Photo(newPhoto);
    await photo.save();

    return res.status(200).json({
        ok: true,
        photo,
        message: 'Foto guardada exitosamente!!!'
    });
}

// Actualizar una foto
export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;
    const {title, description} = req.body;
    
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
        title,
        description
    }, {new: true});

    return res.status(200).json({
        ok: true,
        message: 'Foto actualizada correctamente',
        updatedPhoto
    });
}

// export async function updatePhoto(req: Request, res: Response): Promise<Response> {
//     const {id} = req.params;
//     const {title, description} = req.body;
    
//     // Buscar foto y eliminar archivo del path
//     const photo = await Photo.findById(id).lean();
//     const filePath = photo?.imagePath.toString();

//     // Eliminar archivo de la foto del servidor
//     if (photo) {
//         // Verificar si existe el path
//         const exist = await fs.pathExists(path.resolve(filePath));
//         if (exist) {
//             // Borrar la imagen si existe el path
//             await fs.unlink(path.resolve(filePath));
//         }
//     } else {
//         return res.json({
//             ok:false,
//             message: 'Foto no enconstrada'
//         });
//     }

//     const updatePhoto = await Photo.findByIdAndUpdate(id, {
//         title: title,
//         description: description,
//         imagePath: req.file?.path
//     });

//     return res.status(200).json({
//         ok:true,
//         updatePhoto,
//         message: 'Foto actualizada exitosamente!!!'
//     })
// }



/* Eliminar foto*/
export async function deletePhoto(req: Request, res: Response): Promise<Response> {
    // Buscar foto por id y elminar el resgistro de la db
    const {id} = req.params;
    const photo = await Photo.findByIdAndRemove(id).lean();
    const filePath = photo?.imagePath.toString();

    // Eliminar archivo de la foto del servidor
    if (photo) {
        // Verificar si existe el path
        const exist = await fs.pathExists(path.resolve(filePath));
        if (exist) {
            // Borrar la imagen si existe el path
            await fs.unlink(path.resolve(filePath));
        }
    } else {
        return res.json({
            ok:false,
            message: 'Foto no enconstrada'
        });
    }

    return res.status(200).json({
        ok: true,
        photo, 
        message: 'Foto eliminada exitosamente!!!'
    });
}

