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
export class TaskService {

  constructor( private storage: Storage,
    public router: Router) { }

  createTask(){
    
}

deleteTask(id){
  var self=this;
  var db = firebase.firestore();

  //Delete Task
  db.collection("tasks").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
    console.log("Task deleted")
    self.router.navigate(["project-detail"]);
  }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
}

updateTask(newValues){
  console.log(newValues.id);

  //Update Task
  firebase.database().ref('tasks/'+newValues.id).update(newValues);

}
}
