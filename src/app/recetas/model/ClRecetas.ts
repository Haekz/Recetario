export class ClRecetas {
    id: string;
    titulo: string;
    descripcion: string;
    ingredientes: string;
  
    constructor(obj: any) {
      this.id = obj && obj.id !== undefined ? obj.id : '';  // Ahora es string
      this.titulo = obj && obj.titulo || '';
      this.descripcion = obj && obj.descripcion || '';
      this.ingredientes = obj && obj.ingredientes || '';
    }
  }