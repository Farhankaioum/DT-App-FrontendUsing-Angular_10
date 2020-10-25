import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';

import {AuthService} from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import {ErrorInterceptor} from './_services/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
      HeaderComponent,
      HomeComponent,
      RegisterComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS, multi: true, useClass: ErrorInterceptor},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
