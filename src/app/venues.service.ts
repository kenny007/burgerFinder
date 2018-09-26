import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VenuesService {
  private readonly _endPoint = "https://api.foursquare.com/v2/venues/explore?"
  private readonly _venuesEndPoint = "https://api.foursquare.com/v2/venues/"
  private readonly client_id = "5AE1JMIO20Z5UAXGOYMTKSCGR5VGKPUBZ0NX0DJSVQO5DPKW"
  private readonly client_secret = "JXX5PUHGUSX5WHCA2ATMHSODS2R4U4IMU1QNUKNTPYOH2MWC"

  query:string = 'burgers';
  lat: number = 58.372706;
  lng: number = 26.723753;
  //ULAV22H2HDVC1XOWS2KJUJQ0T1DUZZZIUEI1QNYJBG3HPCWU
  //XPY5EADIWXTQDDYYWEHOIQDZKDPDUFPYY1WDTMFPK4R4ZQZF
  params: any = {
    ll: this.lat + ',' + this.lng,
    venuePhotos:"1",
    client_id:this.client_id,
    client_secret:this.client_secret,
    query: this.query,
    v: "20170106"
  }

  params2: any = {
    client_id:this.client_id,
    client_secret:this.client_secret,
    v: "20180106"
  }

  constructor(private httpClient: HttpClient) { }

  getVenues(){
      return this.httpClient.get(this._endPoint + new URLSearchParams(this.params));
  }

  //new URLSearchParams(this.params)
  getVenuesPhotos(id: string){
    return this.httpClient.get(this._venuesEndPoint + id + "/photos?" + 
           new URLSearchParams(this.params2))
  }

}
