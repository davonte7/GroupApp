import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetingsDetailsPageRoutingModule } from './meetings-details-routing.module';

import { MeetingsDetailsPage } from './meetings-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetingsDetailsPageRoutingModule
  ],
  declarations: [MeetingsDetailsPage]
})
export class MeetingsDetailsPageModule {}
