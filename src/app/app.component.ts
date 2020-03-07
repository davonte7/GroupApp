import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDVHOPU9DXnefz_Wk2ZvTvAwbHfoyL7f3o",
  authDomain: "group-project-app-19ef5.firebaseapp.com",
  databaseURL: "https://group-project-app-19ef5.firebaseio.com",
  projectId: "group-project-app-19ef5",
  storageBucket: "group-project-app-19ef5.appspot.com",
  messagingSenderId: "389195690199",
  appId: "1:389195690199:web:6d83901fc042fbf8070092",
  measurementId: "G-J4WM1HKZ5Q"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      firebase.initializeApp(firebaseConfig);
    });
  }
}
