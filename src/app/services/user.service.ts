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
export class UserService {

  private eventSubject = new Subject<any>();
  database = firebase.firestore();
  public users:Array<any>=[  ];



  constructor( private storage: Storage,
    public router: Router) {

     } //End of Constructor

     createUser(email,firstName,lastName){
      var self=this;
     
      var db = firebase.firestore();
            db.collection("users").add({
              'id':firebase.auth().currentUser.uid,
              'email': email,
              'firstName':firstName,
              'lastName':lastName,
              'bio': "",
              'company':"",
              'phone':"",
              'numOfProjects':0,
              'profilePicUrl': "assets/imgs/defaultUser.jpg"
            })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            
            //update this products arrays
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}

getUsers():any {
  var usersObservable = new Observable(observer => {
         setTimeout(() => {
             observer.next(this.users);
         }, 1000);
  });

  return usersObservable;

}

publishEvent(data: any) {
  this.eventSubject.next(data);
}
getObservable(): Subject<any> {
  return this.eventSubject;
}
  
updateUser(newValues){
  console.log(newValues.id);
  var db = firebase.firestore()
  var userRef = db.collection("users").doc(newValues.id);
 
  // Update Values
  return userRef.update({
    firstName: newValues.firstName,
    lastName: newValues.lastName,
    bio: newValues.bio,
    phone: newValues.phone,
    company: newValues.company,
    profilePicUrl: newValues.URL
  })
  .then(function() {
      console.log("Document successfully updated!");
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });

}

  countProject(id){

    console.log(id);
    var db = firebase.firestore()

    var number = 0 ;
    var docID;
 

    db.collection("users").where("id","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      var user = doc.data();
      docID = doc.id;
      number = user.numOfProjects +1;
      var userRef = db.collection("users").doc(docID);

      userRef.update({
        numOfProjects:number
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

  minusProject(id){

    console.log(id);
    var db = firebase.firestore()

    var number = 0 ;
    var docID;
 

    db.collection("users").where("id","==",id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      var user = doc.data();
      docID = doc.id;
      number = user.numOfProjects -1;
      var userRef = db.collection("users").doc(docID);

      userRef.update({
        numOfProjects:number
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

deleteUser(id){
  var self=this;
  var db = firebase.firestore();
  var user = firebase.auth().currentUser;

  //Delete Object

  //Get Object
  db.collection("users").where("id", "==",firebase.auth().currentUser.uid).onSnapshot(function(querySnapshot) {
    console.log("User Profile Loading...........");
    querySnapshot.forEach(function(doc) {
    var userI = doc.id
    console.log("User Loaded");

    //Delete Object
    console.log("Removing user object...");
    db.collection("users").doc(userI).delete().then(function(){
      console.log("Object Successfully Deleted")
    }).catch(function(error) {
      console.error("Error removing Object: ", error);
      });
     
    });
  } );

  //Delete User
  user.delete().then(function() {
    // User deleted.
    console.log("Account Successfully Removed")
  }, function(error) {
    // An error happened.
    console.log(error)
  });
}

}
