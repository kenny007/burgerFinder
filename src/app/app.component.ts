import { KeysPipe } from './transformobject.pipe';
import { Observable } from 'rxjs/Observable';
import { VenuesService } from './venues.service';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AgmCoreModule, AgmMap, AgmCircle, MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { debug } from 'util';
import 'rxjs/add/observable/forkJoin';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private venuesService: VenuesService) { }
  @ViewChild(AgmMap) myMap: any;

  @HostListener('window:resize')
  onWindowResize() {
    this.myMap.triggerResize()
    .then(() =>  (this.myMap as any)._mapsWrapper.setCenter({lat: this.lat, lng: this.lng}));
  }


  title = 'Burger Finder';
  zoom = 13;
  showLoader = true;
  lat: number = 58.372706;
  lng: number = 26.723753;
  radius:number = 1000;
  center = "58.372706, 26.723753";
  venues:any = []
  photo: any = [];
  imageObserv: any = [];
  images:any = [];


  ngOnInit(){
    this.getVenues();
  }


  getVenues(){
     this.venuesService.getVenues()
     .subscribe((result) => {
     this.venues = result.response.groups[0].items;
     this.venues =  this.venues.filter((item) => {   
        var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(item.venue.location.lat, item.venue.location.lng), new google.maps.LatLng(this.lat, this.lng)); 
        if(distance > 1000.0){
            return true;
        }
      })
     // console.log(this.venues);
      this.venues.forEach((x, index) => {
        this.getVenuesPhotos(this.venues[index].venue.id)
      })

      Observable.forkJoin(this.imageObserv).subscribe(data => {
        //console.log(data);
          data.forEach((datum) => {
            if(datum.response.photos.count > 0){
                var image = datum.response.photos.items[0].prefix + 285 + "x" 
             + 285 + datum.response.photos.items[0].suffix;
             this.images.push(image);
            }
         
        })   
        this.showLoader = false;   
      })
      console.log(this.images);
      //console.log(this.images);
      // result2.response.photos.items[0].prefix + result2.response.photos.items[0].width + "x" 
      //  + result2.response.photos.items[0].height + result2.response.photos.items[0].suffix;
   
      //this.venues = result.response.groups[0].items as Observable<any>;
        // this.venues.map((x, index) => {
        //   console.log(x.venue.id);
        //   this.venuesService.getVenuesPhotos(x.venue.id);
        // })
      //this.getVenuesPhotos(result.response.groups[0].items.venue.id);
      //result.response.groups[0].items;
    })

  }

  getVenuesPhotos(id: string) {
    this.imageObserv.push(this.venuesService.getVenuesPhotos(id));
  }
}

interface IVenue {
  response: Object;
}