import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingService } from '../services/meeting.service';


@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.page.html',
  styleUrls: ['./create-meeting.page.scss'],
})
export class CreateMeetingPage implements OnInit {

  public currentProject: any;
  public date: any;
  public location: any
  meeting={
    date: this.date,
    location: this.location
  }
  constructor(    
    private route: ActivatedRoute,
    private meetingService: MeetingService,
    private router: Router) { }
 
    ngOnInit() {
      //Get Current Project
      this.route.params.subscribe(
          param => {
            this.currentProject = param;
          }
      )
    }

    createMeeting(){

        console.log("Creating Meeting For Project")
        console.log(this.currentProject.name)
        var date=this.meeting.date;
        var location=this.meeting.location;
        var self=this;
        var projectId = this.currentProject.id

        //Call Create Meeting in Meeting Service
        self.meetingService.createMeeting(date,location,projectId);

        self.goBack()
          
    }

  goBack(){
    this.router.navigate(["/project-detail",this.currentProject])
  }

}
