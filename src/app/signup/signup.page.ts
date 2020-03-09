import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Router,Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user={
    email:"",
    password:"",
    firstName:"",
    lastName:""};

  constructor(
  	private router: Router,
 	  public formBuilder: FormBuilder,
 	     ) { 
  }

  ngOnInit() {

  }
    signup(){
      console.log("Creating User for")
      console.log(this.user.email)

      var email=this.user.email;
      var password=this.user.password;
      var self=this;
  
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(
        function(error) {
      // Handle Errors here.
      console.log(error);
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.message);
      if(errorCode.length > 0){
        console.log("Failed");
        alert("Signup Failed: " + errorMessage);
      }
      else{
        console.log("Signup successful")
      }
      // ...
    }).then(function(result){
        var user= firebase.auth().currentUser;
         var database = firebase.firestore();
                database.collection("users").add({
                  'uid':user.uid,
                    'email': user.email,
                    'firstName':self.user.firstName,
                    'lastName':self.user.lastName,
                    'bio': "",
                    'company':"",
                    'phone':"",
                    'numOfProjects':0,
                    'profilePicUrl': ""
            })
            .then(function(docRef) {
                console.log("User created with ID: ", docRef.id);
  
                //update this products arrays
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);     
            });

          console.log("Finished Creating Account for")
          console.log(user.email)
          self.router.navigate(["/home"]);
    });
    }
    goBack(){
      this.router.navigate(["login"]);
    }
}
