import { Injectable } from '@nestjs/common';
import { getPathFile } from 'src/handlers/file.handler';

@Injectable()
export class UploadsService {
    async getDocument(id: number, filename: string) {
        return await getPathFile(id, filename);
    }
}
