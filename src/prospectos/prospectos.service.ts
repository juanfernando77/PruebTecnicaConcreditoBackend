const mime = require('mime');
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Documento } from 'src/entities/documentos.entity';
import { filesHandler, getPathFile } from 'src/handlers/file.handler';
import { FindOperator, In, Repository } from 'typeorm';
import { ENVIADO, Prospecto, RECHAZADO } from '../entities/prospectos.entity';

@Injectable()
export class ProspectosService {
    constructor(
        @InjectRepository(Prospecto) private prospectosRepository: Repository<Prospecto>,
        @InjectRepository(Documento) private documentosRepository: Repository<Documento>
    ) { }

    async findAll(estatus: Array<string>) {
        return await this.prospectosRepository.find({ order: { nombre: { direction: "DESC" } }, where: { estatus: In(estatus) } });
    }

    async findById(id: number) {
        try {
            const prospectoBD = await this.prospectosRepository.findOneBy({ id });
            const documentosBD = await this.documentosRepository.find({ where: { idProspecto: prospectoBD.id }, select: { idProspecto: false } });
            return { ...prospectoBD, documentos: documentosBD };
        } catch (error) {
            return { error: error.message };
        }
    }

    async saveOne(prospecto: Prospecto, documentos: Array<Express.Multer.File>) {
        try {
            prospecto.estatus = ENVIADO;
            const prospectoBD = await this.prospectosRepository.save(prospecto);
            const documentosToSave = await filesHandler(prospectoBD.id, documentos);
            const documentosBD = await this.documentosRepository.save(documentosToSave);
            return { ...prospectoBD, documentos: documentosBD };
        } catch (error) {
            return { error: error.message };
        }
    }

    async updateOne(id: number, status: string, comentarios: string) {
        try {
            if (status === RECHAZADO && !comentarios) {
                throw new Error("Si es rechazo, los comentarios son necesarios");
            }
            let prospectoBD = await this.prospectosRepository.findOneBy({ id });
            prospectoBD.estatus = status;
            prospectoBD.comentarios = comentarios;
            prospectoBD = await this.prospectosRepository.save(prospectoBD);
            return prospectoBD;
        } catch (error) {
            return { error: error.message };
        }
    }

}
