import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoogleMapPageRoutingModule } from './google-map-routing.module';

import { GoogleMapPage } from './google-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleMapPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GoogleMapPage]
})
export class GoogleMapPageModule {}
