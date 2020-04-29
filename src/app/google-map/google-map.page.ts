import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router,ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import * as firebase from 'firebase';

declare var google;
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.page.html',
  styleUrls: ['./google-map.page.scss'],
})

export class GoogleMapPage implements OnInit, AfterViewInit {
  map:any;
  currentProject:any
  public googlemap;
  x:any;
  place:any;
  @ViewChild('map', {static :false}) mapNativeElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionForm: FormGroup;
  currentLocation: any = {
    lat: 0,
    lng: 0
  };

  constructor(private fb: FormBuilder, private geolocation: Geolocation, private route: ActivatedRoute,
    private router: Router) {
    
    this.createDirectionForm();
    
  }

  ngOnInit() {
  /*  this.map = new google.maps.Map(document.getElementById("map"), {
      center: {lat: -34.397, lng: 150.644},
      zoom:8
  }); */
  }

  createDirectionForm() {
    this.directionForm = this.fb.group({
      destination: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    var db = firebase.firestore();
   // console.log("hiii " + this.currentProject.location);
    //this.place = String(location);
    
    this.route.params.subscribe(
      param => {
        //Get Current Project
        this.currentProject = param;
        console.log(param);

        this.googlemap = [];

        //Get Meetings for Current Project
        
        db.collection("meetings").where("projectId","==",this.currentProject.id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
          var detail = doc.data();
       //   var time = self.formatDate(detail.time);
          this.place = String(detail.location);
          var id = detail.id
     //     var date = new Date(detail.time)
      //    var passed = (date.getTime() > today.getTime())
      //    self.meetings.push({place,id,passed});
          console.log("Meetings Retrieved " + this.place)
        })
        });
      }) 

   /* firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
    db.collection("meetings").doc(firebase.auth().currentUser.uid).get().then((snapshot) =>  {
      /*snapshot.docs.forEach(doc => {
          console.log(doc.data())
    }) 
    console.log(snapshot.docs);
  
  })
}
    }) */

    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;
    });
     const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      center: {lat: 41.85, lng: -87.65},
      zoom: 7,
    }); 
    this.directionsDisplay.setMap(map);
  }

  calculateAndDisplayRoute(formValues) {
    var db = firebase.firestore();
 //   this.place = String(location);
   /* this.route.params.subscribe(
      param => {
        //Get Current Project
        this.currentProject = param;
        console.log(param);

        this.googlemap = [];

    db.collection("meetings").where("projectId","==", this.currentProject.id).get().then((snapshot) =>{snapshot.docs.forEach(doc => {
      var detail = doc.data();
   //   var time = self.formatDate(detail.time);
      
      this.place = String(detail.location);
      var id = detail.id
 //     var date = new Date(detail.time)
  //    var passed = (date.getTime() > today.getTime())
  //    self.meetings.push({place,id,passed});
      console.log("Meetings Retrieved " + this.place)
      
    })
  })
}) 
*/
    const that = this;
    this.directionsService.route({
      origin: this.currentLocation,
      destination: this.place,
      
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}