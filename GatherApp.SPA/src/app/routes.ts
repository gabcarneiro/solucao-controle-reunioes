import { AdminComponent } from './admin/admin/admin.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { MeetingsComponent } from './meetings/meetings-component/meetings.component';
import { MeetingDetailsComponent } from './meetings/meeting-details/meeting-details.component';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'meetings', component: MeetingsComponent},
    {path: 'meeting/details', component: MeetingDetailsComponent},
    {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
