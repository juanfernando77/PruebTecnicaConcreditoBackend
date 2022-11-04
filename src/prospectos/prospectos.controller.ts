import { Body, Controller, Get, Param, Post, Query, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { AUTORIZADO, ENVIADO, Prospecto, RECHAZADO } from 'src/entities/prospectos.entity';
import { ProspectosService } from './prospectos.service';

@Controller('prospectos')
export class ProspectosController {
    constructor(private prospectosService: ProspectosService) { }

    @Get('')
    async findAllProspectos(
        @Query('estatus') estatus = [AUTORIZADO, ENVIADO, RECHAZADO]
    ) {
        if (typeof estatus === 'string') {
            estatus = (estatus as string).split(',');
        }
        console.log(estatus);
        return this.prospectosService.findAll(estatus);
    }

    @Get('/:id')
    async findById(
        @Param('id') idProspecto: number
    ) {
        return this.prospectosService.findById(idProspecto);
    }

    @Post('')
    @UseInterceptors(AnyFilesInterceptor())
    async saveOneProspecto(
        @UploadedFiles() documentos: Array<Express.Multer.File>,
        @Body() prospecto: Prospecto
    ) {
        console.log(prospecto);
        return this.prospectosService.saveOne(prospecto, documentos);
    }

    @Post('/:id')
    async updateById(
        @Param('id') idProspecto: number,
        @Body() body: { estatus: string, comentarios: string }
    ) {
        return this.prospectosService.updateOne(idProspecto, body.estatus, body.comentarios);
    }
}
