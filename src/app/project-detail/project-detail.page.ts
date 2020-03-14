import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
})
export class ProjectDetailPage implements OnInit {
  public currentProject: any;
   public team ;
   public names;
   public owner: any;
   public meetings: [];
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) { 
    
  }
  
  ngOnInit() {
    console.log("Loading Clicked Project")
    this.route.params.subscribe(
        param => {
          this.names = [];
          this.team = [];
          this.currentProject = param;
          console.log(param);
          this.team = this.currentProject.team.split(',');
          this.getNames();
        }
    )
  } // End of Init

  getNames(){
    var db = firebase.firestore();
    var self = this;

    for(var i = 0; i < this.team.length; i++){
      db.collection("users").where("id","==",self.team[i]).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      var user = doc.data();
      var name = String(user.firstName + " " + user.lastName);
      self.names.push(name);
      console.log("Name Retrieved")
  })
});
}

  }

  goBack(){
    this.router.navigate(["home"])
  }

  goToEdit(){
    this.router.navigate(["edit-project",this.currentProject]);
  }

  goToCreateMeeting(){
    this.router.navigate(["create-meeting",this.currentProject]);
  }

  goToAddMember(){
    this.router.navigate(["create-member",this.currentProject]);
  }

  goToCreateTask(){
    this.router.navigate(["create-task",this.currentProject]);
  }

  goToTasks(){
    this.router.navigate(["tasks-details", this.currentProject]);
  }
 
  goToMeetings(){
    this.router.navigate(["meetings-details", this.currentProject]);
  }
  goToMember(member){
    this.router.navigate(["member-details",this.currentProject]);
  }
}
