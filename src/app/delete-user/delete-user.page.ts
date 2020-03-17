import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.page.html',
  styleUrls: ['./delete-user.page.scss'],
})
export class DeleteUserPage implements OnInit {

  constructor(
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit() {
  }
 
  deleteAccount(){
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;
    var self = this;
    //TODO: Add Check to see if ownerships have been transferred
    //Delete User
    console.log("Deleting account for: " +user.email);
    self.userService.deleteUser(user.uid);

    this.router.navigate(["/login"]);
  }

  goBack(){
    this.router.navigate(["/settings"])
  }

 
}
