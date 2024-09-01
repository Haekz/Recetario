import { NgModule } from '@angular/core'; // Importa NgModule
import { BrowserModule } from '@angular/platform-browser'; // Importa BrowserModule
import { RouteReuseStrategy } from '@angular/router'; // Importa RouteReuseStrategy

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'; // Importa IonicModule e IonicRouteStrategy
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { AppComponent } from './app.component'; // Importa AppComponent
import { AppRoutingModule } from './app-routing.module'; // Importa AppRoutingModule

import { LoginComponent } from './pages/login/login.component'; // Importa LoginComponent
import { SearchResultsComponent } from './pages/search-results/search-results.component'; // Importa SearchResultsComponent
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component'; // Importa ResetPasswordComponent
import { RegisterComponent } from './pages/register/register.component'; // Importa RegisterComponent


@NgModule({ // Define el módulo
  declarations: [
    AppComponent, 
    LoginComponent,
    SearchResultsComponent,
    ResetPasswordComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule, // Inicializa BrowserModule
    IonicModule.forRoot(), // Inicializa IonicModule
    AppRoutingModule, // Inicializa AppRoutingModule
    FormsModule  // Inicializa FormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }], // Provee la estrategia de reutilización de rutas
  bootstrap: [AppComponent] // Inicializa AppComponent
})
export class AppModule {} // Exporta AppModule
