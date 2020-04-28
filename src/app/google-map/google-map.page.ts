import { Component, OnInit } from '@angular/core';

declare var google: any;
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.page.html',
  styleUrls: ['./google-map.page.scss'],
})
export class GoogleMapPage implements OnInit {
  map:any;
  constructor() { }

  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: -34.397, lng: 150.644},
        zoom:8
    });
  }
  

}
