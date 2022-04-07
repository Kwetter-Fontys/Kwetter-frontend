import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes =
[
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile/:id', component: ProfilePageComponent },
  { path: 'admin', component: AdministrationComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
