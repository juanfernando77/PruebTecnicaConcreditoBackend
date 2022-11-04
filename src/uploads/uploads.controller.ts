import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { AUTORIZADO, ENVIADO, RECHAZADO } from 'src/entities/prospectos.entity';
import { UploadsService } from './uploads.service';
const mime = require('mime');

@Controller('uploads')
export class UploadsController {

    constructor(private uploadsService: UploadsService) { }

    @Get('/:id/:filename')
    async findById(
        @Param('id') idProspecto: number,
        @Param('filename') filename: string,
        @Res() response
    ) {
        const pathFile = await this.uploadsService.getDocument(idProspecto, filename);
        const type = mime.lookup(pathFile);
        if (!response.getHeader('content-type')) response.setHeader('Content-Type', type);
        response.sendFile(pathFile);
    }
}
