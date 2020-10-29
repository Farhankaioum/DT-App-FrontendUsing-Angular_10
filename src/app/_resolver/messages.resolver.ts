import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Message } from '../_models/Message';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]>{
    pageNumber = 1;
    pageSize = 10;
    messageContainer = 'Unread';

    constructor(private userService: UserService, private router: Router,
                private alertify: AlertifyService,
                private authService: AuthService){ }

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]>{
        return this.userService.getMessages(this.authService.decodeToken.nameid,
             this.pageNumber, this.pageSize, this.messageContainer).pipe(
            catchError( () => {
                this.alertify.error('Problem retrieving messages');
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
