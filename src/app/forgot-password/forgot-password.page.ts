import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Router,Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import * as firebase from 'firebase';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})


export class ForgotPasswordPage implements OnInit {

  user={
    email:""};

  constructor(
  	private router: Router,
 	  public formBuilder: FormBuilder,
 	     ) { 
  }

  ngOnInit() {
  }

  resetPassword(){
    console.log("Sending Reset link for");
    console.log(this.user.email);

    var auth = firebase.auth();
    var emailAddress = this.user.email;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
    }).catch(function(error) {
    // An error happened.
    console.log(error);
    });
    console.log("Link has been sent")
    this.router.navigate(["/login"])
  }

  goBack(){
    this.router.navigate(["/login"])
  }
}
