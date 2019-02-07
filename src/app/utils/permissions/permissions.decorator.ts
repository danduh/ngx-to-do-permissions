import { checkPermissions, getPermissions } from './permissions.func';


export function Permissions(required) {
    return (classProto, propertyKey, descriptor) => {

        const originalFunction = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const userPerms = getPermissions();
            const isPermitted = checkPermissions(required, userPerms);
            if (isPermitted) {
                originalFunction.apply(this, args);
            } else {
                // Should throw/log error, but for better visibility will use alert()
                alert('PERMISSIONS DECORATOR says \n you have no permissions');
            }
        };

        return descriptor;
    };
}
