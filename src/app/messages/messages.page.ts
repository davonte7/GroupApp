import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Subscriber, Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  currentProject:any;
  messages = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public toastController: ToastController
    ) {}

  ngOnInit() {
    this.messages = [];
    this.route.params.subscribe(
      //Get Current Project and Current Member
      param => {
        this.currentProject = param;
      }
      
  )
    var email = firebase.auth().currentUser.email;
    var db = firebase.firestore();
    db.collection("messages").where("meeting",'==',this.currentProject.id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      var item = doc.data();
      
      //Add Task to Project in Project Service
      this.messages.push(item);

    })
    });

    this.route.params.subscribe(
      param => {
        this.currentProject = param;
  })
    
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Message Sent',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }


  upload(message) {
    var db = firebase.firestore();
    var sender = firebase.auth().currentUser.email;
    db.collection("messages").add({
      'sender':sender,
      "message":message,
      'meeting':this.currentProject.id,
    })
    .then(function(docRef) {
       console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
    var id = this.currentProject.id;
    var data = {sender,message,id}
    this.messages.push(data);

    this.presentToast();
  }

  goBack(){
    this.router.navigate(["project-detail",this.currentProject]);
  }


}
