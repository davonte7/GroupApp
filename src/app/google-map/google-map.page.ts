<<<<<<< HEAD
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Geolocation} from '@ionic-native/geolocation/ngx';
declare var google;
=======
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingsDetailsPage } from '../meetings-details/meetings-details.page';

declare var google: any;

>>>>>>> ec9f847320c6192e940faccb146485244b365a69
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.page.html',
  styleUrls: ['./google-map.page.scss'],
})

<<<<<<< HEAD
export class GoogleMapPage implements OnInit, AfterViewInit {
  @ViewChild('nativeElement', {static: false}) mapNativeElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionForm: FormGroup;
  currentLocation: any = {
    lat: 0,
    lng: 0
  };
  constructor(private fb: FormBuilder, private geolocation: Geolocation) {
    this.createDirectionForm();
=======
export class GoogleMapPage implements OnInit{
  map:any;
  currentProject: any;
  constructor(
    private geo: Geolocation,
    private route: ActivatedRoute,
    private router: Router
  ) {
>>>>>>> ec9f847320c6192e940faccb146485244b365a69
  }

  ngOnInit() {
  }

  createDirectionForm() {
    this.directionForm = this.fb.group({
      destination: ['', Validators.required]
    });
  }

<<<<<<< HEAD
  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;
    });
     /*const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    }); */
    //this.directionsDisplay.setMap(map);
  }

  calculateAndDisplayRoute(formValues) {
    const that = this;
    this.directionsService.route({
      origin: this.currentLocation,
      destination: formValues.destination,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
=======
      var marker = new google.maps.Marker({
        position: {
          lat: res.coords.latitude, lng: res.coords.longitude
        },
        map: this.map
      });
    }).catch( e => {
      console.log(e);
    })

    this.route.params.subscribe(
      param => {
        this.currentProject = param;
  })
    
  }
  
  goBack(){
    this.router.navigate(["project-detail",this.currentProject]);
  }
>>>>>>> ec9f847320c6192e940faccb146485244b365a69

}