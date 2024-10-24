import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { CLRecetas } from '../recetas/model/ClReceta';  // Asegúrate de que esta ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private dbInstance!: SQLiteObject;

  constructor(
    private sqlite: SQLite,
    private platform: Platform
  ) {
    this.initializeDatabase();  // Inicializar la base de datos al cargar el servicio
  }

  // Agregar receta
  async insertarReceta(titulo: string, descripcion: string, ingredientes: string): Promise<void> {
    try {
      const initialized = await this.ensureDatabaseInitialized();
      if (!initialized) throw new Error('No se pudo inicializar la base de datos');

      const query = `INSERT INTO recetas (titulo, descripcion, ingredientes) VALUES (?, ?, ?)`;
      await this.dbInstance.executeSql(query, [titulo, descripcion, ingredientes]);
      console.log('Receta agregada correctamente');
    } catch (error) {
      console.error('Error al agregar la receta:', error);
    }
  }

  // Obtener todas las recetas
  async getRecetas(): Promise<CLRecetas[]> {
    try {
      const initialized = await this.ensureDatabaseInitialized();
      if (!initialized) throw new Error('No se pudo inicializar la base de datos');

      const result = await this.dbInstance.executeSql(`SELECT * FROM recetas`, []);
      let recetas: CLRecetas[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        recetas.push(result.rows.item(i));
      }
      return recetas;
    } catch (error) {
      console.error('Error al obtener recetas:', error);
      return [];
    }
  }

  // Obtener una receta por ID
  async getRecetaById(id: number): Promise<CLRecetas | undefined> {  
    try {
      const res = await this.dbInstance.executeSql('SELECT * FROM recetas WHERE id = ?', [id]);
      if (res.rows.length > 0) {
        const receta = res.rows.item(0);
        return {
          id: receta.id,
          titulo: receta.titulo,
          descripcion: receta.descripcion,
          ingredientes: receta.ingredientes
        };
      }
      return undefined;
    } catch (error) {
      console.error('Error al obtener receta por ID desde SQLite:', error);
      throw error;
    }
  }

  // Actualizar receta por ID
  async updateReceta(id: number, titulo: string, descripcion: string, ingredientes: string): Promise<void> {
    try {
      const initialized = await this.ensureDatabaseInitialized();
      if (!initialized) throw new Error('No se pudo inicializar la base de datos');

      const query = `UPDATE recetas SET titulo = ?, descripcion = ?, ingredientes = ? WHERE id = ?`;
      await this.dbInstance.executeSql(query, [titulo, descripcion, ingredientes, id]);
      console.log('Receta actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar la receta:', error);
    }
  }

  // Eliminar receta por ID
  async eliminarReceta(id: number): Promise<void> {  
    try {
      const initialized = await this.ensureDatabaseInitialized();
      if (!initialized) throw new Error('No se pudo inicializar la base de datos');

      await this.dbInstance.executeSql('DELETE FROM recetas WHERE id = ?', [id]);
      console.log('Receta eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la receta:', error);
    }
  }

  // Inicialización de la base de datos
  private async initializeDatabase(): Promise<void> {
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

  // Asegurarse de que la base de datos esté inicializada
  private async ensureDatabaseInitialized(): Promise<boolean> {
    if (!this.dbInstance) {
      console.log('La instancia de la base de datos no está inicializada. Inicializando...');
      await this.initializeDatabase();
    }
    if (!this.dbInstance) {
      console.error('La base de datos no se pudo inicializar.');
      return false;
    }
    return true;
  }

  // Limpiar todas las recetas de la tabla
  async limpiarRecetas(): Promise<void> {
    try {
      const initialized = await this.ensureDatabaseInitialized();
      if (!initialized) throw new Error('No se pudo inicializar la base de datos');

      await this.dbInstance.executeSql('DELETE FROM recetas', []);
      console.log('Recetas locales eliminadas.');
    } catch (error) {
      console.error('Error al limpiar recetas locales:', error);
    }
  }
}