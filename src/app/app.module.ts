import { NgModule } from '@angular/core'; // Importa NgModule
import { BrowserModule } from '@angular/platform-browser'; // Importa BrowserModule
import { RouteReuseStrategy, RouterLink } from '@angular/router'; // Importa RouteReuseStrategy

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'; // Importa IonicModule e IonicRouteStrategy
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa FormsModule

import { AppComponent } from './app.component'; // Importa AppComponent
import { AppRoutingModule } from './app-routing.module'; // Importa AppRoutingModule

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';


@NgModule({ // Define el módulo
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, // Inicializa BrowserModule
    IonicModule.forRoot(), // Inicializa IonicModule
    AppRoutingModule, // Inicializa AppRoutingModule
    FormsModule,  // Inicializa FormsModule
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule 
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync(), SQLite], // Provee la estrategia de reutilización de rutas
  bootstrap: [AppComponent] // Inicializa AppComponent
})
export class AppModule {} // Exporta AppModule

console.log('Inicializando base de datos...');
const sqlite = new SQLite();