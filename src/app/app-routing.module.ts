import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { LodgingPageComponent } from './lodging-page/lodging-page.component';


const routes: Routes = [
  { path: '', component: FaqPageComponent },
  { path: 'lodging', component: LodgingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
