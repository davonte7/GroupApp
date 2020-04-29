import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingsDetailsPage } from '../meetings-details/meetings-details.page';

declare var google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.page.html',
  styleUrls: ['./google-map.page.scss'],
})

export class GoogleMapPage implements OnInit{
  map:any;
  currentProject: any;
  constructor(
    private geo: Geolocation,
    private route: ActivatedRoute,
    private router: Router
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

    this.route.params.subscribe(
      param => {
        this.currentProject = param;
  })
    
  }
  
  goBack(){
    this.router.navigate(["project-detail",this.currentProject]);
  }

}