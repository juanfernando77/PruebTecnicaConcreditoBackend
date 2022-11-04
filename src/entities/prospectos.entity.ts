import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
export const ENVIADO = "ENVIADO";
export const AUTORIZADO = "AUTORIZADO";
export const RECHAZADO = "RECHAZADO";

@Entity({ name: 'prospectos' })
export class Prospecto {

    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column()
    @IsNotEmpty()
    nombre: string;
    
    @Column({ name: 'apellido_paterno' })
    @IsNotEmpty()
    apellidoPaterno: string;
    
    @Column({ name: 'apellido_materno', nullable: true })
    apellidoMaterno?: string;
    
    @Column()
    @IsNotEmpty()
    calle: string;
    
    @Column()
    @IsNotEmpty()
    numero: string;
    
    @Column()
    @IsNotEmpty()
    colonia: string;
    
    @Column({ name: 'codigo_postal' })
    @IsNotEmpty()
    codigoPostal: string;
    
    @Column()
    @IsNotEmpty()
    rfc: string;
    
    @Column()
    @IsNotEmpty()
    telefono: string;

    @Column()
    estatus: string;

    @Column()
    comentarios: string;
}
