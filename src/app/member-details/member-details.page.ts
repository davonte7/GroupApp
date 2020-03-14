import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.page.html',
  styleUrls: ['./member-details.page.scss'],
})
export class MemberDetailsPage implements OnInit {

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
