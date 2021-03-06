import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FileUploadModule } from 'ng2-file-upload';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { HeaderComponent } from './header/header.component';

import {AuthService} from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {ErrorInterceptor} from './_services/error.interceptor';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';

import { appRoutes } from './routes';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { ListResolver } from './_resolver/lists.resolver';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { MessagesResolver } from './_resolver/messages.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved.guard';
import { TimeAgoExtendsPipe } from './_utility/timeagoextendspipe';

export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    TimeAgoExtendsPipe,
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    MemberMessagesComponent,
    PhotoEditorComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    FileUploadModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS, multi: true, useClass: ErrorInterceptor},
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    ListResolver,
    MessagesResolver,
    AuthGuard,
    PreventUnsavedChanges
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
