import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService} from '../services/user.service'

import * as firebase from 'firebase';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  users = [

  ];
  

  constructor(
    private router: Router,
    public userService: UserService,
  ) { 
    var db = firebase.firestore();
    var self = this;
  db.collection("users").where("uid", "==",firebase.auth().currentUser.uid).onSnapshot(function(querySnapshot) {
    console.log("User Profile Loading...........");
    self.users= [];
    querySnapshot.forEach(function(doc) {
    var user = doc.data();
    
    self.users.push({firstName:user.firstName, 
      lastName:user.lastName,
      company:user.company,
      bio:user.bio,
      email:user.email,
      profilePic: user.profilePicURL
    })
    console.log(self.users);
  });
    console.log("User Loaded");
} )
  }


  ngOnInit() {
  }

  goBack(){
    this.router.navigate(["/home"])
  }
 
}
