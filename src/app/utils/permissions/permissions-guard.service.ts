import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {isPermitted} from './permissions.func';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuardService implements CanActivate {
  constructor() {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const required: string = route.data.permission;

    return isPermitted(required)
      .pipe(
        tap((canDo) => {
          if (!canDo) {
            alert('ROUTE GUARD SAYS: \n You don\'t have permissions to see this page');
          }
        })
      );
  }
}
