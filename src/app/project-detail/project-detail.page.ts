import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
 
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
})
export class ProjectDetailPage implements OnInit {
  public currentProject: any;
   public team ;
   public names;
   public owner: any;
   public meetings;
   public tasks;
   public dueDate

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit() {
    var db = firebase.firestore();
    var self = this;
    var today = new Date()
    console.log("Loading Clicked Project")
    this.route.params.subscribe(
        param => {
          //Get Team Member Names
          this.names = [];
          this.team = [];
          this.currentProject = param;
          console.log(param);
          this.team = this.currentProject.team.split(',');
          this.getNames();
          console.log("Names Retrieved")
          //Get Owner
          this.getOwner(this.currentProject.owner)
          console.log("Owner Retrieved")
          //Get Meeting Time and Dates
          this.meetings = [];
          db.collection("meetings").where("projectId","==",this.currentProject.id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
            var detail = doc.data();
            var time = self.formatDate(detail.time);
            var date = new Date(detail.time)
            var passed = (date.getTime() < today.getTime())
            var meeting = String(detail.location + " on " + time);
            self.meetings.push({meeting,passed});
            console.log("Meetings Retrieved")
          })
          });
          //Get Tasks
          this.tasks = [];
          //Find Task
          db.collection("tasks").where("projectId","==",this.currentProject.id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
            var task = doc.data();

            //Push to Arrays
            var title = task.title
            var complete = task.complete
            self.tasks.push({title,complete});
          })
          });
          console.log("Tasks Retrieved")
          //Get Date
          var date = this.currentProject.dueDate
          var newDate = date.split("T")
          //Format Date
          var day = newDate[0].split("-");
          day = day[1] + "/" + day[2] + "/" + day[0];
          self.dueDate = day;
    })
  } // End of Init


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
      }
  
      if(Number(time[0]) > 12){
        time[0] = String(Number(time[0])-12)
      }
    time = time[0] + ":" + time[1];
    var finalDate = day + " at " + time;
    return finalDate;
  }

  getOwner(id){
    var db = firebase.firestore();
    var self = this;

    db.collection("users").where("id","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      var user = doc.data();
      var name = String(user.firstName + " " + user.lastName);
      self.owner = name;
    })
    })
  }

  getNames(){
    var db = firebase.firestore();
    var self = this;

    for(var i = 0; i < this.team.length; i++){
      db.collection("users").where("id","==",self.team[i]).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
        var user = doc.data();
        var name = String(user.firstName + " " + user.lastName);
        self.names.push(name);
      })
      });
    }

  }

  goBack(){
    this.router.navigate(["home"])
  }

  goToEdit(){
    this.router.navigate(["edit-project",this.currentProject]);
  }

  goToCreateMeeting(){
    this.router.navigate(["create-meeting",this.currentProject]);
  }

  goToAddMember(){
    this.router.navigate(["create-member",this.currentProject]);
  }

  goToCreateTask(){
    this.router.navigate(["create-task",this.currentProject]);
  }

  goToTasks(){
    this.router.navigate(["tasks-details", this.currentProject]);
  }
 
  goToMeetings(){
    this.router.navigate(["meetings-details", this.currentProject]);
  }
  goToMember(member){
    var index = this.names.indexOf(member)
    
    //Navigate to Member Details with User and Current Project
    var user = [this.currentProject.id,this.team[index]]
    this.router.navigate(["member-details",user]);
  }

  goToMessages(){
    this.router.navigate(["messages", this.currentProject])
  }

  goToGooglePage() {
    this.router.navigate(["google-map",this.currentProject]);
  }
}
