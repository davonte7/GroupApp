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

  member = {
    email: ""
  }

  constructor(    
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router) { }

    ngOnInit() {
      //Get Current Project
      this.route.params.subscribe(
          param => {
            this.currentProject = param;
          }
      )
    }

  addMember(){
    var email = this.member.email;
    var projectId = this.currentProject.id;

    //Call Add Member in Project Service
    this.projectService.addMember(projectId,email,this.currentProject.id)
    this.goBack();
  }

  goBack(){
    this.router.navigate(["/project-detail",this.currentProject])
  }

}
