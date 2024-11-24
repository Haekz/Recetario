import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnsaladasPageRoutingModule } from './ensaladas-routing.module';

import { EnsaladasPage } from './ensaladas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnsaladasPageRoutingModule
  ],
  declarations: [EnsaladasPage]
})
export class EnsaladasPageModule {}
