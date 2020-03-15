import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import * as firebase from 'firebase';

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
    private router: Router) { }

  ngOnInit() {
    var db = firebase.firestore();
    var self = this;
    console.log("Loading Project")
    this.route.params.subscribe(
        param => {
          this.currentProject = param;
          console.log(param);

          this.meetings = [];
          db.collection("meetings").where("projectId","==",this.currentProject.id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
            var detail = doc.data();
            var time = self.formatDate(detail.time);
            var meeting = String(detail.location + " on " + time);
            self.meetings.push(meeting);
            console.log("Meetings Retrieved")
        })
      });
        }
    )
  }

  formatDate(date){
    var newDate = date.split("T")
    //Format Date
    var day = newDate[0].split("-");
    day = day[1] + "/" + day[2] + "/" + day[0];

    //Format Time
    var time = newDate[1].split(":");
    time = time[0] + ":" + time[1];
    var finalDate = day + " at " + time;
    return finalDate;
  }

  goBack(){
    this.router.navigate(["project-detail",this.currentProject])
  }
}
