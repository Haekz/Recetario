import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private dbInstance!: SQLiteObject;

  constructor(
    private sqlite: SQLite,
    private platform: Platform
  ) {}

  async testDatabase() {
    try {
      // Inicializa la base de datos
      await this.initializeDatabase();
      console.log('Base de datos inicializada correctamente.');

      // Inserta un usuario de prueba
      await this.addUser('Prueba', 'prueba@correo.com', 'passwordPrueba');
      console.log('Usuario de prueba agregado correctamente.');

      // Obtén los usuarios de la base de datos
      const usuarios = await this.getUsers();
      console.log('Usuarios obtenidos:', usuarios);
    } catch (error) {
      console.error('Error al probar la base de datos:', error);
    }
  }

  private async ensureDatabaseInitialized(): Promise<boolean> {
    if (!this.dbInstance) {
      console.log('La instancia de la base de datos no está inicializada. Inicializando...');
      await this.initializeDatabase();
    }
    // Si dbInstance sigue sin estar inicializada, retorna false
    if (!this.dbInstance) {
      console.error('La base de datos no se pudo inicializar.');
      return false;
    }
    return true;
  }

  async addUser(nombre: string, email: string, password: string) {
    try {
      // Asegura que la base de datos esté inicializada antes de intentar agregar un usuario
      const initialized = await this.ensureDatabaseInitialized();
      if (!initialized) throw new Error('No se pudo inicializar la base de datos');

      const query = `INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)`;
      await this.dbInstance.executeSql(query, [nombre, email, password]);
      console.log('Usuario agregado correctamente');
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  }

  async getUsers() {
    try {
      // Asegura que la base de datos esté inicializada antes de intentar obtener usuarios
      const initialized = await this.ensureDatabaseInitialized();
      if (!initialized) throw new Error('No se pudo inicializar la base de datos');

      const result = await this.dbInstance.executeSql(`SELECT * FROM usuarios`, []);
      let users = [];
      for (let i = 0; i < result.rows.length; i++) {
        users.push(result.rows.item(i));
      }
      return users;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return [];
    }
  }

  async updateUser(id: number, nombre: string, email: string, password: string) {
    try {
        const initialized = await this.ensureDatabaseInitialized();
        if (!initialized) throw new Error('No se pudo inicializar la base de datos');

        const query = `UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?`;
        await this.dbInstance.executeSql(query, [nombre, email, password, id]);
        console.log('Usuario actualizado correctamente');
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
    }
  }

  async deleteUser(id: number) {
    try {
        const initialized = await this.ensureDatabaseInitialized();
        if (!initialized) throw new Error('No se pudo inicializar la base de datos');

        const query = `DELETE FROM usuarios WHERE id = ?`;
        await this.dbInstance.executeSql(query, [id]);
        console.log('Usuario eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
    }
  }

  //////////////////////////////////////////////////////////

  // Inicialización de la base de datos
  async initializeDatabase(): Promise<void> {
    try {
      await this.platform.ready();  // Asegúrate de que la plataforma está lista
  
      if (this.platform.is('cordova') || this.platform.is('capacitor')) {
        console.log('Plataforma lista. Inicializando la base de datos...');
  
        // Crear la instancia de la base de datos
        this.dbInstance = await this.sqlite.create({
          name: 'recetas.db',
          location: 'default'
        });
  
        console.log('Instancia de base de datos creada:', this.dbInstance);
  
        // Crear la tabla si no existe
        await this.dbInstance.executeSql(
          `CREATE TABLE IF NOT EXISTS recetas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descripcion TEXT NOT NULL,
            ingredientes TEXT NOT NULL
          );`,
          []
        );
        console.log('Tabla "recetas" creada/ya existe.');
      } else {
        console.error('SQLite no está disponible en esta plataforma.');
      }
    } catch (error) {
      console.error('Error al crear la base de datos:', error);
    }
  }

  // Método para agregar una receta
  async addReceta(titulo: string, descripcion: string, ingredientes: string): Promise<number> {
    try {
      // Asegurarse de que dbInstance está inicializada
      if (!this.dbInstance) {
        throw new Error('La base de datos no está inicializada.');
      }

      const result = await this.dbInstance.executeSql(
        `INSERT INTO recetas (titulo, descripcion, ingredientes) VALUES (?, ?, ?)`,
        [titulo, descripcion, ingredientes]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error al agregar receta:', error);
      throw error;
    }
  }

  // Obtener todas las recetas
  async getRecetas() {
    try {
      if (!this.dbInstance) {
        throw new Error('La base de datos no está inicializada.');
      }
      const res = await this.dbInstance.executeSql('SELECT * FROM recetas', []);
      const recetas = [];
      for (let i = 0; i < res.rows.length; i++) {
        recetas.push(res.rows.item(i));
      }
      return recetas;
    } catch (error) {
      console.error('Error al obtener recetas:', error);
      return [];
    }
  }
}