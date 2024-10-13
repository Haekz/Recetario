import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetaAddPageRoutingModule } from './receta-add-routing.module';
import { RecetaAddPage } from './receta-add.page'




@NgModule({
  

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RecetaAddPageRoutingModule
  ],
  declarations: [RecetaAddPage],

})
export class RecetaAddPageModule {}
