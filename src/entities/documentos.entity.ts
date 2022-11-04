import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Prospecto } from './prospectos.entity';

@Entity({ name: 'documentos' })
export class Documento {
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column()
    nombre: string;
    
    @Column({ name: 'file_url' })
    fileUrl: string;
    
    @Column({ name: 'id_prospecto' })
    idProspecto: number;
}
