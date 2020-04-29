import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { GoogleMapPage } from './google-map.page';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: GoogleMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule], 
  exports: [RouterModule],
})
export class GoogleMapPageRoutingModule {}
