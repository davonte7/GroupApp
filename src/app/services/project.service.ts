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
export class ProjectService {

  constructor( private storage: Storage,
    public router: Router) {

     }

     createProject(name,description,dueDate){
      var self=this;
      var user = firebase.auth().currentUser;
      var now = new Date();
      var db = firebase.firestore();
            db.collection("projects").add({
               'name':name,
               'description':description,
               'dueDate': dueDate,
               'owner': user.uid,
               'dateCreated': (now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear(),
               'tasks': [],
               'meetings': [],
               'team': [],
               'complete': false,
               'percentComplete': 0
            })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            
            //update this products arrays
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}

    deleteItem(id){
      var self=this;
      var db = firebase.firestore();

      //Delete Project
      db.collection("projects").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
        console.log("Project deleted")
        self.router.navigate(["home"]);
      }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
}

updateUser(newValues){
  console.log(newValues.id);

  //Update Project
  firebase.database().ref('projects/'+newValues.id).update(newValues);

}
    }
 