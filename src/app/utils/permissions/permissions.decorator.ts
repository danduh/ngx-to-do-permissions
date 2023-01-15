import { isPermitted } from './permissions.func';


/**
 * Decorator
 * @param required permission we're looking for: <todos_read>
 * @constructor
 */
export const Permissions: (required: string) => MethodDecorator = (required: string) => {
  return (classProto, propertyKey, descriptor: TypedPropertyDescriptor<any>) => {
    const originalFunction = descriptor.value;

    Object.defineProperty(classProto, propertyKey, {
      value: function (...args: any[]){
        if (isPermitted(required)) {
          return originalFunction.apply(this, args);
        } else {
          console.log('You are not permitted to do this');
        }
      }
    });
    return descriptor;
  };
};
