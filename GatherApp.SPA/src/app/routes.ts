import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { ValueComponent } from './value/value.component';
import { AuthGuard } from './_guards/auth.guard';
import { MeetingsComponent } from './meetings/meetings-component/meetings.component';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'meetings', component: MeetingsComponent},
    {path: 'values', component: ValueComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];