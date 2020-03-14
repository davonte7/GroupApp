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
   public team: string[] = [];
   public owner: any;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) { }
  
  ngOnInit() {
    console.log("Loading Clicked Project")
    this.route.params.subscribe(
        param => {
          this.currentProject = param;
          console.log(param);
          this.team = this.currentProject.team.split(',');
          console.log(this.team);
          this.getOwner(this.currentProject.owner);
        }
    )
  } // End of Init

  getOwner(id:string){
    var db = firebase.firestore();
    var self = this;

    //Find user with id of owner
  db.collection("users").where("id", "==",id).onSnapshot(function(querySnapshot) {
    console.log("Getting Name for Owner......");
    querySnapshot.forEach(function(doc) {
    var user = doc.data();
    //Set Owner variable to owner name
    self.owner = String(user.firstName + " " + user.lastName);
    console.log("Name Retrieved")
  });
})
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
