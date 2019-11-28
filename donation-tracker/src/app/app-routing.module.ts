import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonatePageComponent } from './donatePage/donatePage.component';
import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'donate', component: DonatePageComponent },
  { path: '', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
