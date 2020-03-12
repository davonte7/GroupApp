import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import {Subject} from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';

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
      var team :string[] = [];
      var meetings =[];
      var tasks =[];
      var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      team.push(user.uid);
      
            db.collection("projects").add({
               'id': id,
               'name':name,
               'description':description,
               'dueDate': dueDate,
               'owner': user.uid,
               'dateCreated': (now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear(),
               'tasks': tasks,
               'meetings': meetings,
               'team': team,
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

    deleteProject(id){
      var self=this;
      var db = firebase.firestore();
      var projectId;
      console.log(id);

      //Get Project
    db.collection("projects").where("id", "==",id).onSnapshot(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
      projectId = doc.id; 
      console.log(projectId);

      //Delete Project
      db.collection("projects").doc(projectId).delete().then(function() {
        console.log("Document successfully deleted");
        console.log("Project deleted");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
        });

      })
    } )
        
}

updateProject(newValues){

  console.log(newValues.id);
  /*
  var db = firebase.firestore()
  var projectRef = db.collection("projects").doc(newValues.id);
 
  // Update Values
  return projectRef.update({
    name: newValues.name,
    description: newValues.description,
    dueDate: newValues.dueDate,
    complete: newValues.complete,
  })
  .then(function() {
      console.log("Document successfully updated!");
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });
*/
    //Update Project
    firebase.database().ref('projects/'+newValues.id).update(newValues);

}
    }
 