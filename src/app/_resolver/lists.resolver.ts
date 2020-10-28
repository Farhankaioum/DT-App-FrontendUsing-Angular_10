import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class ListResolver implements Resolve<User[]>{
    pageNumber = 1;
    pageSize = 10;
    likesParam = 'Likers';

    constructor(private userService: UserService, private router: Router,
                private alertify: AlertifyService){ }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User[] | Observable<User[]> | Promise<User[]> {
        return this.userService.getUsersAsync(this.pageNumber, this.pageSize, null, this.likesParam).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
