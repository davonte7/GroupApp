import { Component } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
   projects = [];

  constructor(
    private router: Router,
    public projectService: ProjectService,
    public userService: UserService
  ) {
    var db = firebase.firestore();
    var self = this;
    var user = firebase.auth().currentUser;
    //Loop Through Projects with Current User in team array
  db.collection("projects").where("team", "array-contains",user.uid).onSnapshot(function(querySnapshot) {
    console.log("Projects for " + user.email + " Loading......");
    querySnapshot.forEach(function(doc) {
    var projectI = doc.data();
    var projectId = doc.id;
      for(var i = 0; i < self.projects.length; i++){
        if(projectId === self.projects[i].projectId )
        {
          console.log("Already Here")
        }
      }
    
    //Add Projects to Array
    self.projects.push({Name:projectI.name,percentComplete: projectI.percentComplete,id:projectId});
  });
    console.log(self.projects);
    console.log("Projects Loaded");
} )
  }


ngOnInit(){
  console.log("Current User: " + firebase.auth().currentUser.email)
}
 
  goToSettings(){
    this.router.navigate(["/settings"])
  }

  goToProfile(){
    this.router.navigate(["/user-profile"])
  }

  goToCreateProject(){
    this.router.navigate(["/create-project"])
  }
}
