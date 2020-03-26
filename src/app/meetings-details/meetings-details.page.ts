import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import * as firebase from 'firebase';
import { MeetingService } from '../services/meeting.service';

@Component({
  selector: 'app-meetings-details',
  templateUrl: './meetings-details.page.html',
  styleUrls: ['./meetings-details.page.scss'],
})
export class MeetingsDetailsPage implements OnInit {

  currentProject:any
  public meetings;
  constructor(    private route: ActivatedRoute,
    private projectService: ProjectService,
    private meetingService: MeetingService,
    private router: Router) { }

  ngOnInit() {
    var db = firebase.firestore();
    var self = this;
    console.log("Loading Project")
    var today = new Date()
    console.log(today)
    //Get Meeting Details
    this.route.params.subscribe(
        param => {
          //Get Current Project
          this.currentProject = param;
          console.log(param);

          this.meetings = [];

          //Get Meetings for Current Project
          db.collection("meetings").where("projectId","==",this.currentProject.id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
            var detail = doc.data();
            var time = self.formatDate(detail.time);
            var place = String(detail.location + " on " + time);
            var id = detail.id
            var date = new Date(detail.time)
            var passed = (date.getTime() > today.getTime())
            self.meetings.push({place,id,passed});
            console.log("Meetings Retrieved")
          })
          });
        })
    }

  formatDate(date){
    var newDate = date.split("T")
    //Format Date
    var day = newDate[0].split("-");
    day = day[1] + "/" + day[2] + "/" + day[0];

    //Format Time
    var time = newDate[1].split(":");
    
    //Change from military time
    if(time[0] == "00"){
      time[0] = "12";
      time[1] = time[1] + " am"
    }

    if(Number(time[0]) > 12){
      time[0] = String(Number(time[0])-12)
      time[1] = time[1] + " pm"
    }
    else{
      time[1] = time[1] + " am"
    }
    time = time[0] + ":" + time[1];
    var finalDate = day + " at " + time;
    return finalDate;
  }

  deleteMeeting(meeting){
    var id = meeting.id
    var projectId = this.currentProject.id
    console.log("Deleting Meeting: " + id)
    
    //Delete Meeting in Meeting Service
    this.meetingService.deleteMeeting(id,projectId)
    alert("Meeting Deleted")
    this.goBack()
  }

  goBack(){
    this.router.navigate(["project-detail",this.currentProject])
  }
}
