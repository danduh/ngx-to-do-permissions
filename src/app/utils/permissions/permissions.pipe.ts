import { Pipe, PipeTransform } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { userPermissionsState } from '../../store';
import { take } from 'rxjs/operators';
import { checkPermissions } from './permissions.func';

@Pipe({
    name: 'permissions'
})
export class PermissionsPipe implements PipeTransform {
    constructor(private store: Store<any>) {

    }

    transform(required: any, args?: any): any {
        const isPermitted = checkPermissions(required, this.getPermissions());

        if (isPermitted) {
            return true;
        } else {
            console.log('[PERMISSIONS PIPE] You don\'t have permissions');
            return false;
        }
    }

    getPermissions() {
        let perms;
        this.store
            .pipe(select(userPermissionsState),
                take(1))
            .subscribe((_p) => perms = _p);
        return perms;
    }

}
