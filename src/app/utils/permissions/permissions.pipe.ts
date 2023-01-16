import { Pipe, PipeTransform } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { isPermittedState } from '../../store';

@Pipe({
  name: 'permissions',
  standalone: true,
})
export class PermissionsPipe implements PipeTransform {
  constructor(private store: Store){
  }

  transform(required: string, args?: any): Observable<boolean>{
    return this.store.select(isPermittedState(required))
      .pipe(
        tap((canDo) => {
          if (!canDo) {
            console.log('[PERMISSIONS PIPE] You don\'t have permissions');
          }
        })
      );
  }
}
