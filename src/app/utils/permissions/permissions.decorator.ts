import { Store } from '@ngrx/store';
import { AppInjector } from './permissions.injector';
import { isPermittedState } from '../../store';

/**
 * A decorator that checks if the user has the required permissions before
 * executing the original method.
 *
 * @param required - The required permission to check for
 */
export function Permissions(required: string){
  return function (classProto, propertyKey, descriptor: TypedPropertyDescriptor<any>){
    const originalFunction = descriptor.value;
    descriptor.value = function (...args: any[]){
      let allowed = false;
      AppInjector.get(Store).select(isPermittedState(required))
        .subscribe((canDo) => {
          allowed = canDo;
        });
      if (allowed) {
        console.log('PERMISSIONS DECORATOR says \n You have permissions to see it');
        return originalFunction.apply(this, args);
      } else {
        console.log('You are not permitted to do this');
      }
    };
    return descriptor;
  };
};
