import { Module } from '@nestjs/common';
import { ProspectosService } from './prospectos.service';
import { ProspectosController } from './prospectos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prospecto } from 'src/entities/prospectos.entity';
import { Documento } from 'src/entities/documentos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prospecto, Documento])],
  providers: [ProspectosService],
  controllers: [ProspectosController]
})
export class ProspectosModule {}
