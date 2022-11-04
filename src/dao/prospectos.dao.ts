import { IsNotEmpty } from "class-validator";

export interface SaveProspecto {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno?: string;
    calle: string;
    numero: string;
    colonia: string;
    codigoPostal: string;
    rfc: string;
    telefono: string;
}

export class ResultadoDao {
    @IsNotEmpty()
    estatus: string;

    comentarios: string;
}

export class ProspectoDao {

    @IsNotEmpty()
    nombre: string;
    
    @IsNotEmpty()
    apellidoPaterno: string;

    apellidoMaterno?: string;

    @IsNotEmpty()
    calle: string;

    @IsNotEmpty()
    numero: string;

    @IsNotEmpty()
    colonia: string;

    @IsNotEmpty()
    codigoPostal: string;

    @IsNotEmpty()
    rfc: string;

    @IsNotEmpty()
    telefono: string;
}