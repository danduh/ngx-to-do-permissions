import { select, Store } from '@ngrx/store';
import { AppInjector } from './permissions.injector';
import { userPermissionsState } from '../../store';
import { take } from 'rxjs/operators';

export function checkPermissions(required: string, userPerms) {
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

}

export function getPermissions() {
    let userPerms;
    const store: Store<any> = AppInjector.get(Store);
    store
        .pipe(
            select(userPermissionsState),
            take(1)
        )
        .subscribe((_p) => {
            userPerms = _p ? _p : {};
        });
    return userPerms;
}
