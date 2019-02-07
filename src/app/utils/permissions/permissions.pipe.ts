import { Pipe, PipeTransform } from '@angular/core';
import { checkPermissions, getPermissions } from './permissions.func';

@Pipe({
    name: 'permissions'
})
export class PermissionsPipe implements PipeTransform {
    constructor() {
    }

    transform(required: any, args?: any): any {
        const userPerms = getPermissions();
        const isPermitted = checkPermissions(required, userPerms);

        if (isPermitted) {
            return true;
        } else {
            console.log('[PERMISSIONS PIPE] You don\'t have permissions');
            return false;
        }
    }
}
