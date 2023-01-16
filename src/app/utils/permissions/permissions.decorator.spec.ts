import { Permissions } from './permissions.decorator';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppInjector, setAppInjector } from './permissions.injector';
import { Injector } from '@angular/core';

describe('Permissions decorator', () => {
  let store: Store;
  let mockIsPermittedState;

  beforeEach(() => {
    const injector = Injector.create({
      providers: [
        {provide: Store, useValue: new Store(of({}), null, null)}
      ]
    });
    setAppInjector(injector);
    mockIsPermittedState = jest.fn();
    store = new Store(of({}), null, null);
    store.select = jest.fn().mockReturnValue(of(false));
    AppInjector.get = jest.fn().mockReturnValue(store);
  });

  it('should call original function if user has permission', () => {
    store.select = jest.fn().mockReturnValue(of(true));
    const mockFn = jest.fn();

    class TestClass {
      @Permissions('view')
      testFn(){
        mockFn();
      }
    }

    const test = new TestClass();
    test.testFn();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should not call original function if user does not have permission', () => {
    const mockFn = jest.fn();

    class TestClass {
      @Permissions('view')
      testFn(){
        mockFn();
      }
    }

    const test = new TestClass();
    test.testFn();
    expect(mockFn).not.toHaveBeenCalled();
  });
});
