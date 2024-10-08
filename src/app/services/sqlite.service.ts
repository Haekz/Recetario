import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';


//initializeDatabase(): Este método inicializa la base de datos y crea la tabla usuarios si no existe.
//addUser(): Este método inserta un usuario en la tabla usuarios.
//getUsers(): Este método obtiene todos los usuarios de la tabla usuarios.

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private dbInstance!: SQLiteObject; // Instancia de la base de datos "dbInstance!" no necesita inicialización inmediata, pero que se asignará eventualmente

  constructor(private sqlite: SQLite) {}

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

  async initializeDatabase() {
    try {
      this.dbInstance = await this.sqlite.create({
        name: 'myapp.db',
        location: 'default'
      });

      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS usuarios (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           nombre VARCHAR(32),
           email VARCHAR(32),
           password VARCHAR(32)
        )`,
        []
      );

      console.log('Base de datos y tabla creadas correctamente');
    } catch (error) {
      console.error('Error al crear la base de datos:', error);
    }
  }

  async addUser(nombre: string, email: string, password: string) {
    try {
      const query = `INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)`;
      await this.dbInstance.executeSql(query, [nombre, email, password]);
      console.log('Usuario agregado correctamente');
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  }

  async getUsers() {
    try {
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
}
