import {isPermitted} from './permissions.func';


/**
 * Decorator
 * @param required permission we're looking for: <todos_read>
 * @constructor
 */
export const Permissions: (required: string) => MethodDecorator = (required: string) => {
  return (classProto, propertyKey, descriptor: TypedPropertyDescriptor<any>) => {
    const originalFunction = descriptor.value;

    descriptor.value = (...args: any[]) => {
      isPermitted(required)
        .subscribe((canDo) => {
          if (canDo) {
            originalFunction.apply(this, args);
          } else {
            // Should throw/log error, but for better visibility will use alert()
            alert('PERMISSIONS DECORATOR says \n you have no permissions');
          }
        });
    };
    return descriptor;
  };
};
