import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UpcomingplanComponent } from './upcomingplan/upcomingplan.component';
import { GenerateplanComponent } from './generateplan/generateplan.component';
import { CancelComponent } from './cancel/cancel.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {path : "" ,component : HomeComponent, children:[
    {path : "register", component : RegisterComponent},
    {path: "login", component : LoginComponent}
  ]},
  {path : "/dashboard", component : DashboardComponent, children:[
    {path : "Your Profile", component : UserprofileComponent},
    {path : "upcoming Plan", component : UpcomingplanComponent, children :[
      {path : "cancel", component : CancelComponent},
      {path : "Plan detail", component : DetailComponent}
    ]},
    {path : "Generate Plan", component : GenerateplanComponent}
  ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
