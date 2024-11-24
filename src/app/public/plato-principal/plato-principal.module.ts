import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatoPrincipalPageRoutingModule } from './plato-principal-routing.module';

import { PlatoPrincipalPage } from './plato-principal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlatoPrincipalPageRoutingModule
  ],
  declarations: [PlatoPrincipalPage]
})
export class PlatoPrincipalPageModule {}
