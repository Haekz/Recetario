export class CLRecetas {
    id: number;
    titulo: string;
    descripcion: string;
    ingredientes: string;

    constructor(obj: any) {
        this.id = obj && obj.id || null;
        this.titulo = obj && obj.titulo || '';
        this.descripcion = obj && obj.descripcion || '';
        this.ingredientes = obj && obj.ingredientes || '';
    }
}