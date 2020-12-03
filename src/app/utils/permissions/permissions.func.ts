import {select, Store} from '@ngrx/store';
import {AppInjector} from './permissions.injector';
import {userPermissionsState} from '../../store';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';

/**
 *
 * @param required - permission required for view/action
 */
export function isPermitted(required: string): Observable<boolean> {
  const store: Store<any> = AppInjector.get(Store);

  return store
    .pipe(
      select(userPermissionsState),
      take(1),
      map((userPerms) => {
        const [feature, action] = required.split('_');

        if (!userPerms.hasOwnProperty(feature)) {
          return false;
        }

        if (!userPerms[feature].hasOwnProperty(action)) {
          return false;
        }

        // TODO<Daniel> implementation of property based required
        if (userPerms[feature][action] !== '*') {
          return false;
        }

        return true;
      })
    );
}
