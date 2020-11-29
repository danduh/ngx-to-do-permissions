import {Pipe, PipeTransform} from '@angular/core';
import {isPermitted, getPermissions} from './permissions.func';
import {tap} from 'rxjs/operators';

@Pipe({
    name: 'permissions'
})
export class PermissionsPipe implements PipeTransform {
    constructor() {
    }

    transform(required: any, args?: any): any {

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
