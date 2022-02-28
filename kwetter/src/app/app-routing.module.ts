import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes =
[
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', component: ProfilePageComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
