import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tasks-details',
  templateUrl: './tasks-details.page.html',
  styleUrls: ['./tasks-details.page.scss'],
})
export class TasksDetailsPage implements OnInit {

  currentProject:any
  public tasks;
  constructor(    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router) { }

  ngOnInit() {
    var db = firebase.firestore();
    var self = this;
    console.log("Loading Project")
    this.route.params.subscribe(
        param => {
          this.currentProject = param;
          console.log(param);

          this.tasks = [];
          db.collection("tasks").where("projectId","==",this.currentProject.id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
            var task = doc.data();
    
            self.tasks.push(task.title);
            console.log("Tasks Retrieved")
        })
      });
        }
    )
  }

  goBack(){
    this.router.navigate(["project-detail",this.currentProject])
  }

}
