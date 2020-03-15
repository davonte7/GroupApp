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
  user: any;
  constructor(    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router) { }

   ngOnInit() {
    console.log("Loading Project")
   this.route.params.subscribe(
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
    db.collection("users").where("id","==",this.currentMember).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      self.user = doc.data();

  })
});
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
