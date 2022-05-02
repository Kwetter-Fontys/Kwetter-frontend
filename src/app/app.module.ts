import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { ModerationComponent } from './moderation/moderation.component';
import { AdministrationComponent } from './administration/administration.component';
import { HeaderComponent } from './header/header.component';
import {AuthModule} from "./auth/auth.module";
import { HighlightDirective } from './filter/highlight.directive';
import {AppFilterPipe} from "./filter/app-filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    ProfilePageComponent,
    RegistrationComponent,
    ModerationComponent,
    AdministrationComponent,
    HeaderComponent,
    AppFilterPipe,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
