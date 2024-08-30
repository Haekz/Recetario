import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './pages/login/login.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),  // Asegúrate de que IonicModule esté aquí
    AppRoutingModule,
    FormsModule  // Asegúrate de incluir FormsModule aquí
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
