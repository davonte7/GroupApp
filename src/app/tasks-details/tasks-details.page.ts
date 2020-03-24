import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks-details',
  templateUrl: './tasks-details.page.html',
  styleUrls: ['./tasks-details.page.scss'],
})
export class TasksDetailsPage implements OnInit {

  currentProject:any
    public title;
    public description;
    public team;
    public percent;
    public id;
    public complete;
    public tasks = [{title:this.title,
      description:this.description,
      team:this.team,
      percent:this.percent,
      id: this.id
    }]
  constructor(    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit() {
    var db = firebase.firestore();
    var self = this;
    console.log("Loading Project")
    this.route.params.subscribe(
      param => {
        //Get Current Project
        this.currentProject = param;
        console.log(param);
        this.tasks = [];

        //Get Tasks
        db.collection("tasks").where("projectId","==",this.currentProject.id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
          var taskRef = doc.data();
          var title = taskRef.title
          var description = taskRef.description
          var team = taskRef.emails
          var percent = taskRef.percentage
          var id = taskRef.id
          var complete = taskRef.complete
          var task = {title, description, team,percent,id,complete}
          self.tasks.push(task);
          console.log("Tasks Retrieved")
        })
        });
      }
    )
  }

  deleteTask(task){
    var id = task.id;
    var projectId = this.currentProject.id
    console.log("Deleting Task: " + id)

    //Delete Task in Task Service
    this.taskService.deleteTask(id,projectId)
    alert("Task Deleted")
    this.goBack()
  }

  completeTask(task){
    var id = task.id;
    var projectId = this.currentProject.id

    //Mark Task as complete in Task Service
    this.taskService.completeTask(id,projectId)
    alert("Task Completed")
    this.goBack()
  }

  goBack(){
    this.router.navigate(["project-detail",this.currentProject])
  }

  incompleteTask(task){
    var id = task.id;
    var projectId = this.currentProject.id

    //Mark Task as complete in Task Service
    this.taskService.incompleteTask(id,projectId)
    alert("Task Marked Incomplete")
    this.goBack()
  }

}
