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

  database = firebase.firestore();
  public users:Array<any>=[  ];



  constructor( private storage: Storage,
    public router: Router) {

     } //End of Constructor

     createUser(email,firstName,lastName){
      var self=this;
     
      var db = firebase.firestore();
            db.collection("users").add({
              'uid':firebase.auth().currentUser.uid,
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
}
