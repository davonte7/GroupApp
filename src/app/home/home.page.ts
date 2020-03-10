import { Component } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router
  ) {}


ngOnInit(){
  console.log("Current User: " + firebase.auth().currentUser.email)
}

  goToSettings(){
    this.router.navigate(["/settings"])
  }

  goToProfile(){
    this.router.navigate(["/user-profile"])
  }
}
