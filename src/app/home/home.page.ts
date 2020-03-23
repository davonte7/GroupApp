import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute,
    public userService: UserService
  ) {

  }


ngOnInit(){
  var self = this;
  //Get Current Project
  console.log("Current User: " + firebase.auth().currentUser.email)
  this.route.params.subscribe(param => { 
    console.log("Reseting Projects");
    var db = firebase.firestore();
    
    var user = firebase.auth().currentUser;
    this.projects = [];

    // Get Projects Containing User
    db.collection("projects").where("team", "array-contains",user.uid).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      console.log("Projects for " + user.email + " Loading......");
      var projectI = doc.data();
     
      //Add Projects to Array
      self.projects.push({    
      id:projectI.id,           
      name:projectI.name,
      description:projectI.description,
      dueDate: projectI.dueDate,
      owner: projectI.owner,
      dateCreated: projectI.dateCreated,
      tasks: projectI.tasks,
      meetings: projectI.meetings,
      team: projectI.team,
      complete: projectI.complete,
      percentComplete: projectI.percentComplete
      });

  console.log(self.projects);
  console.log("Projects Loaded");
  })
  })

  })
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

goToProject(project){
  console.log("Getting Details for: " + project.Name);
  this.router.navigate(["project-detail",project])
}

}
