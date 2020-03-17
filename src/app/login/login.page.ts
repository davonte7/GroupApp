import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Router,Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  login_form: FormGroup;
  database = firebase.firestore();

  constructor(
  	private router: Router,
 	  public formBuilder: FormBuilder,
 	     ) { 

  }

  ngOnInit() {

  	  	this.login_form = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

  }

  signup(){
  	this.router.navigate(["/signup"]);
  }

  login(item){
    //Print & Store User's email and password
  	console.log( "Logging in: " + item.email + "...")
  	var self=this;
	  var email=item.email;
    var password=item.password;
    var noErr = true;

	  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode);
    
    //If wrong password
		if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
            noErr = false;
          } else if (errorCode === 'auth/user-not-found'){
            alert("User does not exist");
            noErr = false;
          }
          console.log(error);
    
		}
	).then(function(result){
    if(noErr === true){
      //Log User In
      var user= firebase.auth().currentUser;
      console.log("Login Successful");
      console.log(user.uid);

      //Navigate to Homepage
       self.router.navigate(["home"]);
    }
	});
  }

  forgotPassword(){
    this.router.navigate(["/forgot-password"])
  }

  //Google Login
  loginGoogle(){
    var self=this;
    console.log("Logging in with Google...")
    // Using a popup.
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithPopup(provider).then(function(result) {
   // This gives you a Google Access Token.
   var token = result.credential.providerId;
   // The signed-in user info.
   var user = result.user;
   console.log("User:" + user.email);
   console.log("Login Successful")
   self.router.navigate(["home"]);
  });
}

}
 
