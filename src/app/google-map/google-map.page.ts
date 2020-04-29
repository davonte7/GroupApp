import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { ActivatedRoute, Router } from '@angular/router';
declare var google;
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.page.html',
  styleUrls: ['./google-map.page.scss'],
})

export class GoogleMapPage implements OnInit, AfterViewInit {
  map:any;
  location: any;
  currentProject: any;
  @ViewChild('map', {static :false}) mapNativeElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionForm: FormGroup;
  currentLocation: any = {
    lat: 0,
    lng: 0
  };
  constructor(private fb: FormBuilder, 
    private geolocation: Geolocation, 
    private route: ActivatedRoute,
    private router: Router
    ) {
  }

  ngOnInit() {
    var self = this;
    this.route.params.subscribe(
      param => {
        console.log(param)
        this.currentProject = param;
        self.location = this.currentProject.location;
        console.log(this.currentProject.location);
      })
      
  }
 
  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;
    });
     const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      center: {lat: 41.85, lng: -87.65},
      zoom: 7,
    }); 
    this.directionsDisplay.setMap(map);
    this.calculateAndDisplayRoute(this.location)
    
  }

  calculateAndDisplayRoute(formValues) {


    const that = this;
    this.directionsService.route({
      origin: this.currentLocation,
      destination: String(formValues),
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  goBack(){
    this.router.navigate(["project-detail",this.currentProject])
  }

}