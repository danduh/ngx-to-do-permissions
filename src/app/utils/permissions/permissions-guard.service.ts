import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { isPermitted } from './permissions.func';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { isPermittedState } from '../../store';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuardService implements CanActivate {
  private store = inject(Store);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    const required: string = route.data.permission;
    return this.store.select(isPermittedState(required))
      .pipe(
        tap((canDo) => {
          if (!canDo) {
            alert('ROUTE GUARD SAYS: \n You don\'t have permissions to see this page');
          }
        })
      );
  }
}
