import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import {Subject} from 'rxjs';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor( 
    private projectService: ProjectService,
    public router: Router) { }

  createMeeting(date,location,projectId){
    //Generate ID For Meeting
    var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
    var db = firebase.firestore();
    //Add To Meetings
    db.collection("meetings").add({
      'id':id,
      'time': date,
      'location':location,
      'projectId':projectId
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
          
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    //Add Meeting to Project
    db.collection("meetings").where("id","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      var meeting = doc.data(); 
      
      //Add Meeting to Project in Project Service
      this.projectService.addMeeting(projectId,meeting);

    })
    });
      
  }

  deleteMeeting(id,projectId){
    var db = firebase.firestore();
    var meetingId;

    //Get Meeting
    db.collection("meetings").where("id","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      var meeting = doc.data();
      console.log(meeting)
      meetingId = doc.id

      //Remove Meeting From Project in Project Service
      this.projectService.removeMeeting(projectId,meeting);

      //Delete Meeting
      db.collection("meetings").doc(meetingId).delete().then(function() {
        console.log("Document successfully deleted!");
        console.log("Meeting deleted")
      })
      .catch(function(error) {
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
