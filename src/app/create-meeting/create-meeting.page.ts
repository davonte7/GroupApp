import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { MeetingService } from '../services/meeting.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import * as firebase from 'firebase';

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

    createMeeting(){

        console.log("Creating Meeting For Project")
        console.log(this.currentProject.name)
        var db = firebase.firestore();
        var date=this.meeting.date;
        var location=this.meeting.location;
        var self=this;
        var projectId = this.currentProject.id
        self.meetingService.createMeeting(date,location,projectId);

        self.goBack()
          
    }

  goBack(){
    this.router.navigate(["/project-detail",this.currentProject])
  }

}
