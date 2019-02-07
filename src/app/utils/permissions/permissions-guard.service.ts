import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { checkPermissions, getPermissions } from './permissions.func';

@Injectable({
    providedIn: 'root'
})
export class PermissionsGuardService implements CanActivate {
    constructor() {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const userPerms = getPermissions();
        const required = route.data.permission;

        const isPermitted = checkPermissions(required, userPerms);

        if (!isPermitted) {
            alert('ROUTE GUARD SAYS: \n You don\'t have permissions to see this page');
        }

        return isPermitted;
    }
}
