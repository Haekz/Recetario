import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetaAllPageRoutingModule } from './receta-all-routing.module';

import { RecetaAllPage } from './receta-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetaAllPageRoutingModule
  ],
  declarations: [RecetaAllPage]
})
export class RecetaAllPageModule {}
