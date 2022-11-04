const path = require('path');
const fs = require('fs');
import moment from "moment";
import { Documento } from 'src/entities/documentos.entity';

export function filesHandler(idProspecto: number, documentos: Array<Express.Multer.File>): Promise<Documento[]> {
    return new Promise((resolve, reject) => {
        const folder = `${idProspecto}`;
        const pathToSave = path.join(__dirname, '../uploads', folder);
        if (!fs.existsSync(pathToSave)) {
            fs.mkdirSync(pathToSave, { recursive: true });
        }
        try {
            const documentosToBD: Documento[] = documentos.map(file => {
                const fileName = file.originalname.replace(/ /g,"_");
                const pathFile = path.resolve(pathToSave, fileName);
                fs.writeFileSync(pathFile, file.buffer, null);
                file.destination = `uploads/${idProspecto}/`;
                file.path = `${file.destination}${fileName}`;
                return { nombre: fileName, fileUrl: file.path, idProspecto };
            });
            resolve(documentosToBD);
        } catch (err) {
            eliminarCarpeta(pathToSave);
            reject();
        }
    });
}


export function eliminarCarpeta(path: string) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            var curPath = path + '/' + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                eliminarCarpeta(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

export function eliminarFile(filename: string) {
    try {
        const pathToDelete = path.join(__dirname, '../', filename);
        fs.unlinkSync(pathToDelete);
    } catch (err) {
        console.log(err);
    }
}

export function getPathFile(id: number, filename: string) {
    return new Promise<string>((resolve, reject) => {
        const filePath = path.resolve(__dirname, `../uploads/${id}/${filename}`);
        if (!fs.existsSync(filePath)) return reject('El archivo no existe');
        resolve(filePath);
    });
}