import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingsDetailsPage } from './meetings-details.page';

const routes: Routes = [
  {
    path: '',
    component: MeetingsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingsDetailsPageRoutingModule {}
