import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.page.html',
  styleUrls: ['./create-member.page.scss'],
})
export class CreateMemberPage implements OnInit {

  public currentProject: any;

  constructor(    
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router) { }

    ngOnInit() {
      this.route.params.subscribe(
          param => {
            this.currentProject = param;
          }
      )
    }

  goBack(){
    this.router.navigate(["/project-detail",this.currentProject])
  }

}
