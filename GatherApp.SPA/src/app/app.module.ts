import { AdminComponent } from './admin/admin/admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AuthGuard } from './_guards/auth.guard';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { appRoutes } from './routes';
import { AuthModule } from './auth/auth.module';
import { MeetingService } from './_services/meeting.service';
import { AlertifyService } from './_services/alertify.service';
import { RouterModule } from '@angular/router';


import { ConsultMeetingsComponent } from './meetings/consult-meetings/consult-meetings.component';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { MeetingsComponent } from './meetings/meetings-component/meetings.component';
import { ScheduleMeetingComponent } from './meetings/schedule-meeting/schedule-meeting.component';
import { ValueComponent } from './value/value.component';






@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ValueComponent,
    MeetingsComponent,
    ScheduleMeetingComponent,
    ConsultMeetingsComponent,
    AdminComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    AuthModule
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    MeetingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
