import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage implements OnInit {

  public currentProject: any;
  task ={
    title:"",
    description:"",
    emails: "",
    percent: 0
  }

  constructor(    
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService,
    private router: Router) { }

    ngOnInit() {
      //Get Current Project
      this.route.params.subscribe(
          param => {
            this.currentProject = param;
          }
      )
    }

  createTask(){
    console.log("Creating Task For: ");

    //initialize variables
    var title = this.task.title;
    var description = this.task.description;
    var emails = this.task.emails.split(" ");
    var percent = this.task.percent;

    // create task in task service
    this.taskService.createTask(title,description,emails,percent, this.currentProject.id);
    this.goBack();
  }

  goBack(){
    this.router.navigate(["/project-detail",this.currentProject])
  }
}
