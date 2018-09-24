import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UpcomingplanComponent } from './upcomingplan/upcomingplan.component';
import { GenerateplanComponent } from './generateplan/generateplan.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import {RegisterComponent} from './register/register.component';
import { OverviewComponent } from './overview/overview.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserprofileComponent,
    UpcomingplanComponent,
    GenerateplanComponent,
    DetailComponent,
    HomeComponent,
    RegisterComponent,
    OverviewComponent,
    CalendarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
