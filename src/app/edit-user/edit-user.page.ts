import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';

import * as firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  profilePic;
  edit_user_form:FormGroup;
  image:string

  takePictureOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA
  }

  selectPictureOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }

  constructor(
  	private router: Router,
     public formBuilder: FormBuilder,
     public userService: UserService,
     private camera:Camera
    
 	     ) { 
          //Creates Form to update User
          this.edit_user_form = this.formBuilder.group({
          firstName: new FormControl("", Validators.required),
          lastName: new FormControl("", Validators.required),
          bio: new FormControl("", Validators.required),
          phone: new FormControl("", Validators.required),
          company: new FormControl("", Validators.required),
          URL: new FormControl("", Validators.required)
        });
  }

  ngOnInit() {
    var self = this;
    this.image ="";
    var db = firebase.firestore();
    //Get User Data
    db.collection("users").where("id", "==",firebase.auth().currentUser.uid).onSnapshot(function(querySnapshot) {
      console.log("User Profile Loading...........");

      querySnapshot.forEach(function(doc) {
      var user = doc.data();

      //Get Current Profile Picture URL
      self.profilePic = user.profilePicUrl
      console.log(self.profilePic)
      //Plug In existing values to form
      self.edit_user_form.patchValue({firstName:user.firstName});
      self.edit_user_form.patchValue({lastName:user.lastName});
      self.edit_user_form.patchValue({bio:user.bio});
      self.edit_user_form.patchValue({phone:user.phone});
      self.edit_user_form.patchValue({company:user.company});

      console.log("Profile Loaded");
 
    });

  } )

  }
 
  updateUser(value){
    var db =firebase.firestore()
    var self = this;
    var docId;
    var newValues;

    //Get User information
    db.collection("users").where("id","==",firebase.auth().currentUser.uid).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      var userRef = doc.data()
      docId = doc.id;
      var url = ""
      if(self.image.length > 0){
        url = self.image
      }
      else{
        url = userRef.URL
      }

      newValues = {
        id: docId,
        firstName: value.firstName,
        lastName: value.lastName,
        bio: value.bio,
        phone: value.phone,
        company: value.company,
        URL: url
      }
      //Update Values in User Service
      self.userService.updateUser(newValues);
    })
  });

    this.goBack();
  }

  captureImage() {
    this.camera.getPicture(this.takePictureOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = base64Image;
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }

  selectImage() {
    this.camera.getPicture(this.selectPictureOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = base64Image;
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }
  
  goBack(){
    this.router.navigate(["/settings"])
  }
}
