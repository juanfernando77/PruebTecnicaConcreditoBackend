import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProspectosModule } from './prospectos/prospectos.module';
import { Prospecto } from './entities/prospectos.entity';
import { Documento } from './entities/documentos.entity';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ProspectosModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'concredito',
      ssl: false,
      entities: [Prospecto, Documento],
      // synchronize: true,
    }),
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
