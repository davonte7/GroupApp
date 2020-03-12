import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { MeetingService } from '../services/meeting.service';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.page.html',
  styleUrls: ['./create-meeting.page.scss'],
})
export class CreateMeetingPage implements OnInit {

  public currentProject: any;

  constructor(    
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private meetingService: MeetingService,
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
