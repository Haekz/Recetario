import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetaEditPageRoutingModule } from './receta-edit-routing.module';

import { RecetaEditPage } from './receta-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetaEditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RecetaEditPage]
})
export class RecetaEditPageModule {}
