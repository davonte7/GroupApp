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

  constructor(    
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService,
    private router: Router) { }

    ngOnInit() {
      this.route.params.subscribe(
          param => {
            this.currentProject = param;
          }
      )
    }

  createTask(){


    this.goBack();
  }

  goBack(){
    this.router.navigate(["/project-detail",this.currentProject])
  }
}
