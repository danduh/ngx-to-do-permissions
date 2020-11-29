import {Pipe, PipeTransform} from '@angular/core';
import {isPermitted} from './permissions.func';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Pipe({
  name: 'permissions'
})
export class PermissionsPipe implements PipeTransform {
  constructor() {
  }

  transform(required: string, args?: any): Observable<boolean> {

    return isPermitted(required)
      .pipe(
        tap((canDo) => {
          if (!canDo) {
            console.log('[PERMISSIONS PIPE] You don\'t have permissions');
          }
        })
      );
  }
}
