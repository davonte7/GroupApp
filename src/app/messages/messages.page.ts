import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  messages = [];
  constructor(
    
    ) {}

  ngOnInit() {
    var email = firebase.auth().currentUser.email;
    var db = firebase.firestore();
    db.collection("messages").where("recipient",'==',email).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      var item = doc.data();
      
      //Add Task to Project in Project Service
      this.messages.push(item);

    })
    });

    
  }

  upload(message, recipient) {
    var db = firebase.firestore();
    var user = firebase.auth().currentUser.email;
    db.collection("messages").add({
      'recipient':recipient,
      'sender':user,
      "message":message,
    })
    .then(function(docRef) {
       console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }



}
