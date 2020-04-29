import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';

import { Camera } from '@ionic-native/camera/ngx';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx'
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
    IonicStorageModule.forRoot(),
    BrowserModule, 
      FormsModule, ReactiveFormsModule,IonicModule,CommonModule
  ],
  
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ], 
  bootstrap: [AppComponent]
})
export class AppModule {}

export class GoogleMapPageModule {}
