import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'

declare var google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.page.html',
  styleUrls: ['./google-map.page.scss'],
})

export class GoogleMapPage implements OnInit{
  map:any;
  
  constructor(
    private geo: Geolocation
  ) {
  }

  ngOnInit() {
    this.geo.getCurrentPosition().then((res) => {
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: res.coords.latitude, lng: res.coords.longitude },
        zoom:8,
    });

      var marker = new google.maps.Marker({
        position: {
          lat: res.coords.latitude, lng: res.coords.longitude
        },
        map: this.map
      });
    }).catch( e => {
      console.log(e);
    })
    
  }
  

}