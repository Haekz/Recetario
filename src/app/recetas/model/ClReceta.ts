export class CLRecetas {
    id: string;
    titulo: string;
    descripcion: string;
    ingredientes: string;
  
    constructor(obj: any) {
      this.id = obj && obj.id || '';  // ID ya no estará vacío porque se genera con UUID
      this.titulo = obj && obj.titulo || '';
      this.descripcion = obj && obj.descripcion || '';
      this.ingredientes = obj && obj.ingredientes || '';
    }
  }