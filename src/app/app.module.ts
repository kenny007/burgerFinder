import { VenuesService } from './venues.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule, AgmCircle } from '@agm/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAcgDMuKLAtHr5Oo6ja2f8AnIQguv_2_Xo',
      libraries: ['geometry']
    })
  ],
  providers: [
    VenuesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
