import { NgModule } from '@angular/core'; // Importa NgModule
import { BrowserModule } from '@angular/platform-browser'; // Importa BrowserModule
import { RouteReuseStrategy, RouterModule } from '@angular/router'; // Importa RouteReuseStrategy

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'; // Importa IonicModule e IonicRouteStrategy
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa FormsModule

import { AppComponent } from './app.component'; // Importa AppComponent
import { AppRoutingModule } from './app-routing.module'; // Importa AppRoutingModule

import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Importa SQLite plugin para Ionic
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { IonicStorageModule } from '@ionic/storage-angular'; // Importa IonicStorageModule
import { SqliteService } from './services/sqlite.service';  // Importamos el servicio de SQLite


import { RecetaService } from '../app/recetas/receta-list.service'; // Importa RecetaService



@NgModule({
  declarations: [
    AppComponent // Declaración de AppComponent
  ],
  imports: [
    BrowserModule, // Importación de BrowserModule
    IonicModule.forRoot(), // Importación de IonicModule
    AppRoutingModule, // Importación de AppRoutingModule
    FormsModule,  // Importación de FormsModule
    ReactiveFormsModule, // Importación de ReactiveFormsModule
    HttpClientModule, // Importación de HttpClientModule
    IonicStorageModule.forRoot(), // Inicialización de IonicStorageModule
    RouterModule, // Importación de RouterModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // Provisión de la estrategia de reutilización de rutas
    SQLite, // Provisión de SQLite
    RecetaService, // Provisión de RecetaService en providers, no en imports
    SqliteService
  ],
  bootstrap: [AppComponent] // Bootstrap de AppComponent
})

export class AppModule {} // Exportación de AppModule

