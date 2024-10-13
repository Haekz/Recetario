import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetaDetailPageRoutingModule } from './receta-detail-routing.module';

import { RecetaDetailPage } from './receta-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetaDetailPageRoutingModule
  ],
  declarations: [RecetaDetailPage]
})
export class RecetaDetailPageModule {}
