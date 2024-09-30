import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestarContraPageRoutingModule } from './restar-contra-routing.module';

import { RestarContraPage } from './restar-contra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestarContraPageRoutingModule
  ],
  declarations: [RestarContraPage]
})
export class RestarContraPageModule {}
