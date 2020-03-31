import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Subscriber, Subscription } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.page.html',
  styleUrls: ['./member-details.page.scss'],
})
export class MemberDetailsPage implements OnInit {
 
  currentProject:any
  currentMember:any
  currentUser:any
  user: any;
  public clicked = false;
  constructor(    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router) { }

  ngOnInit() {
   console.log("Loading Project")
   this.currentUser = firebase.auth().currentUser.uid
   this.route.params.subscribe(
        //Get Current Project and Current Member
        param => {
          this.currentProject = param[0];
          this.currentMember = param[1];
          console.log(this.currentProject);
          console.log(this.currentMember)
          this.getUser();
        }
    )
  }

  getUser(){
    var db = firebase.firestore();
    var self = this;
    //Get User
    db.collection("users").where("id","==",this.currentMember).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      self.user = doc.data();

    })
    });
  }

  removeUser(){
    var id =this.currentProject;
    var memberId = this.currentMember;
    this.projectService.removeMember(id,memberId)
    alert("User Successfully Removed")
    this.goBack()
  }

  toggleClick(){
    if(this.clicked == false){
      this.clicked = true
    }
    else{
      this.clicked = false;
    }
  }

  transferOwnership(){
    this.projectService.transferOwnership(this.currentProject,this.currentMember)
    alert("ownership successfully transferred")
  }

  goBack(){
    var db = firebase.firestore();
    var project;
    var self = this;
    db.collection("projects").where("id","==",this.currentProject).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      project = doc.data();

      self.router.navigate(["project-detail",project])
    })
    });
  
  }

}
