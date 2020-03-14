import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-tasks-details',
  templateUrl: './tasks-details.page.html',
  styleUrls: ['./tasks-details.page.scss'],
})
export class TasksDetailsPage implements OnInit {

  currentProject:any
  constructor(    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router) { }

  ngOnInit() {
    console.log("Loading Project")
    this.route.params.subscribe(
        param => {
          this.currentProject = param;
          console.log(param);
        }
    )
  }

  goBack(){
    this.router.navigate(["project-detail",this.currentProject])
  }

}
