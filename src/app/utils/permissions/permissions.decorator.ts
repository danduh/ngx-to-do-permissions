import { select, Store } from '@ngrx/store';
import { checkPermissions } from './permissions.func';
import { take } from 'rxjs/operators';
import { userPermissionsState } from '../../store';
import { AppInjector } from './permissions.injector';


export function Permissions(required) {
    let userPerms;

    return (classProto, propertyKey, descriptor) => {
        const originalFunction = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const store: Store<any> = AppInjector.get(Store);
            store
                .pipe(
                    select(userPermissionsState),
                    take(1)
                )
                .subscribe((_p) => {
                    userPerms = _p ? _p : {};
                });

            const isPermitted = checkPermissions(required, userPerms);
            if (isPermitted) {
                originalFunction.apply(this, args);
            } else {
                alert('PERMISSIONS DECORATOR says \n you have no permissions');
            }

        };
        return descriptor;

    };
}
