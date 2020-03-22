import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import {Subject} from 'rxjs';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor( private storage: Storage,
    private projectService: ProjectService,
    public router: Router) { }

  createMeeting(date,location,projectId){
    var self=this;
    var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
    var db = firebase.firestore();
    //Add To Meeting
          db.collection("meetings").add({
            'id':id,
            'time': date,
            'location':location,
            'projectId':projectId
          })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          
          //update meetings
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });


      db.collection("meetings").where("id","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
        var meeting = doc.data();
         
        this.projectService.addMeeting(projectId,meeting);

      })
    });
      
}

deleteMeeting(id,projectId){
  var self=this;
  var db = firebase.firestore();
  var meetingId;

      db.collection("meetings").where("id","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
        var meeting = doc.data();
        console.log(meeting)
        meetingId = doc.id
        this.projectService.removeMeeting(projectId,meeting);

          //Delete Task
  db.collection("meetings").doc(meetingId).delete().then(function() {
    console.log("Document successfully deleted!");
    console.log("Meeting deleted")
  }).catch(function(error) {
      console.error("Error removing document: ", error);
    });

      })
    });


}



updateMeeting(newValues){
  console.log(newValues.id);

  //Update Meeting
  firebase.database().ref('meetings/'+newValues.id).update(newValues);

}

}
