import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import {AuthGuard} from "./auth/auth.guard";
import { StartPageComponent } from './start-page/start-page.component';


const routes: Routes =
[
  {
  path: '',
  canActivate: [AuthGuard],
  children: [
  { path: '', redirectTo: 'start-page', pathMatch: 'full' },
  { path: 'profile/:id', component: ProfilePageComponent },
  { path: 'start-page', component: StartPageComponent },
  { path: 'admin', component: AdministrationComponent }
  ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
