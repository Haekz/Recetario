export class Usuario {
    id?: string;
    nombre: string;
    email: string;
    password: string;
  
    constructor(obj: any) {
      this.id = obj && obj.id || ''; 
      this.nombre = obj && obj.nombre || '';
      this.email = obj && obj.email || '';
      this.password = obj && obj.password || '';
    }
  }