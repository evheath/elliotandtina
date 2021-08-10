import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { LodgingPageComponent } from './lodging-page/lodging-page.component';
import { RsvpPageComponent } from './rsvp-page/rsvp-page.component';
import { VenuePageComponent } from './venue-page/venue-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/faq', pathMatch: 'full' },
  { path: 'faq', component: FaqPageComponent },
  { path: 'lodging', component: LodgingPageComponent },
  { path: 'venue', component: VenuePageComponent },
  { path: 'rsvp', component: RsvpPageComponent },
];

const routerOptions: ExtraOptions = {
  // scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
