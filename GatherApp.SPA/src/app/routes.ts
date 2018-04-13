import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { ValueComponent } from './value/value.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'values', component: ValueComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];