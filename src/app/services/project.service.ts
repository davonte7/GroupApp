import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
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
      var db = firebase.firestore();
      var projectId;
      console.log(id);

      //Get Project
      db.collection("projects").where("id", "==",id).onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        projectId = doc.id; 

        //Delete Task Related to Project
        db.collection("tasks").where("projectId","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
          var taskRef = doc.id;
          db.collection("tasks").doc(taskRef).delete()
        })
        });

        //Delete Meetings Related to Project
        db.collection("meetings").where("projectId","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
          var meetingRef = doc.id;
          db.collection("meetings").doc(meetingRef).delete()
        })
        });  


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
    var db = firebase.firestore()
    //Get Project
    var projectRef = db.collection("projects").doc(newValues.id);
  
    // Update Values
    projectRef.update({
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

  }

    addMeeting(id,meeting){

      console.log(id);
      var db = firebase.firestore();

      //Get Project 
      db.collection("projects").where("id","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
        var projectId = doc.id;
        var projectRef = db.collection("projects").doc(projectId);
        
        //Update Meeting Array in Project
        projectRef.update({
          meetings: firebase.firestore.FieldValue.arrayUnion(meeting)
        })
      .then(function() {
          console.log("Document successfully updated!");
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
  
      })
    });

    }

    addTask(id, task){

      console.log(id);
      var db = firebase.firestore();

      //Get Project
      db.collection("projects").where("id","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
        var projectId = doc.id;
        var projectRef = db.collection("projects").doc(projectId);
        
        //Update Task Array For Project
        projectRef.update({
          tasks: firebase.firestore.FieldValue.arrayUnion(task)
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
  
      })
      });
    }

    addMember(id, email, projectId){
      console.log(id);
      var db = firebase.firestore();
      var member;
      
      //Get User
      db.collection("users").where("email","==",email).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
        var user = doc.data();
        id = doc.id
        member = user.id;
        
        //Get Project
        db.collection("projects").where("id","==",projectId).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
          var projectId = doc.id;
          var projectRef = db.collection("projects").doc(projectId);
          
          //Update Team Array For Project
          projectRef.update({
            team: firebase.firestore.FieldValue.arrayUnion(member)
          })
          .then(function() {
            console.log("Document successfully updated!");
          })
          .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });

          });
     
          });
      });
      });
  }

  removeTask(id,task){
    console.log(id);
    var db = firebase.firestore();
    
    //Get Project
    db.collection("projects").where("id","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      var projectId = doc.id;
      var projectRef = db.collection("projects").doc(projectId);

      //Remove Task From Array in Project
      projectRef.update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task)
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    })
    });
  }

  removeMember(id,memberID){
    var db = firebase.firestore();
    
    //Get Project
    db.collection("projects").where("id","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      var projectId = doc.id;
      var projectRef = db.collection("projects").doc(projectId);

      //Remove Member From Array in Project
      projectRef.update({
        team: firebase.firestore.FieldValue.arrayRemove(memberID)
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    })
    });
  }

  transferOwnership(id,member){
    console.log("transferring ownership to: " + member);
    var db = firebase.firestore()
    //Get Project
    db.collection("projects").where("id","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      var projectId = doc.id;
      var projectRef = db.collection("projects").doc(projectId);

      //Remove Member From Array in Project
      projectRef.update({
        owner: member
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    })
    });
  }

  removeMeeting(id, meeting){
    console.log(id);
    var db = firebase.firestore();
    //Get Project
    db.collection("projects").where("id","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      var projectId = doc.id;
      var projectRef = db.collection("projects").doc(projectId);

      //Remove Meeting From Array in Project
      projectRef.update({
        meetings: firebase.firestore.FieldValue.arrayRemove(meeting)
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    })
    });
  }

  completeTask(id,percent){
    console.log(id);
    var db = firebase.firestore();
    
    //Get Project
    db.collection("projects").where("id","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      var projectId = doc.id;
      var project = doc.data();
      var percentComplete = project.percentComplete
      var projectRef = db.collection("projects").doc(projectId);

      //Remove Add Percent from complete task
      projectRef.update({
        percentComplete: percentComplete + percent 
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    })
    });
  }

  incompleteTask(id,percent){
    console.log(id);
    var db = firebase.firestore();
    
    //Get Project
    db.collection("projects").where("id","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      var projectId = doc.id;
      var project = doc.data();
      var percentComplete = project.percentComplete
      var projectRef = db.collection("projects").doc(projectId);

      //Remove Add Percent from complete task
      projectRef.update({
        percentComplete: percentComplete - percent 
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    })
    });
  }
}