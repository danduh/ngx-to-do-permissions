import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userPermissionsSelector, userPermissionsState } from '../../store';
import { take } from 'rxjs/operators';
import { checkPermissions } from './permissions.func';

@Injectable({
    providedIn: 'root'
})
export class PermissionsGuardService implements CanActivate {
    constructor(
        private store: Store<any>) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const userPerms = this.getPermissions();
        const required = route.data.permission;

        const isPermitted = checkPermissions(required, userPerms);

        if (!isPermitted) {
            alert('ROUTE GUARD SAYS: \n You don\'t have permissions to see this page');
        }

        return isPermitted;
    }

    getPermissions() {
        let perms;
        this.store
            .pipe(
                select(userPermissionsState),
                take(1))
            .subscribe((_p) => perms = _p);
        return perms;
    }
}
