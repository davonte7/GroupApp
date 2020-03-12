import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor( private storage: Storage,
    public router: Router) { }

  createMeeting(date,location,projectId){
    var self=this;
    var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
    var db = firebase.firestore();
          db.collection("meetings").add({
            'id':id,
            'time': date,
            'location':location,
            'projectId':projectId
          })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          
          //update this products arrays
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
}

deleteMeeting(id){
  var self=this;
  var db = firebase.firestore();

  //Delete Meeting
  db.collection("meetings").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
    console.log("Meeting deleted")
    self.router.navigate(["project-detail"]);
  }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
}

updateMeeting(newValues){
  console.log(newValues.id);

  //Update Meeting
  firebase.database().ref('meetings/'+newValues.id).update(newValues);

}

}
