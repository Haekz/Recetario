export class CLRecetas {
  id: number;
  titulo: string;
  descripcion: string;
  ingredientes: string;

  constructor(obj: any) {
    this.id = obj && obj.id !== undefined ? obj.id : 0;  // id será numérico y por defecto 0 si no existe
    this.titulo = obj && obj.titulo || '';
    this.descripcion = obj && obj.descripcion || '';
    this.ingredientes = obj && obj.ingredientes || '';
  }
}