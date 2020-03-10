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

  let newInfo = firebase.database().ref('users/'+newValues.id).update(newValues);

}

}
