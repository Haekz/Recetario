import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetaListPageRoutingModule } from './receta-list-routing.module';

import { RecetaListPage } from './receta-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetaListPageRoutingModule
  ],
  declarations: [RecetaListPage]
})
export class RecetaListPageModule {}
