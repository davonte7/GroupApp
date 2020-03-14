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
export class TaskService {

  constructor( private storage: Storage,
    private projectService: ProjectService,
    public router: Router) { }
 
  createTask(title,description,emails,percentage,projectId){
    var self=this;
    var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
    var db = firebase.firestore();
          db.collection("tasks").add({
            'id':id,
            'title': title,
            'description':description,
            'emails':emails,
            'percentage': percentage,
            'projectId':projectId,
            'complete': false
          })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          
          //update this products arrays
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });

      db.collection("tasks").where("id","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
        var task = doc.data();
         
        this.projectService.addTask(projectId,task);

      })
    });
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
