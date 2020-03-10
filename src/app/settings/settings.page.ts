import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout(){
    var self=this;
    console.log("Loggging User out...")
    firebase.auth().signOut().then(function() {
    }).catch(function(error) {
// An error happened.
});
  // Sign-out successful.
console.log("Logout Successful")
  this.router.navigate(["/login"])
}
 
  goBack(){
    this.router.navigate(["/home"])
  }

  goToEditUser(){
    this.router.navigate(["/edit-user"])
  }
}
