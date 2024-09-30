import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarResultPageRoutingModule } from './buscar-result-routing.module';

import { BuscarResultPage } from './buscar-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarResultPageRoutingModule
  ],
  declarations: [BuscarResultPage]
})
export class BuscarResultPageModule {}
