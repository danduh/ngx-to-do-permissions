import { TestBed } from '@angular/core/testing';
import { PermissionsDirective } from './permissions.directive';
import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { TodoInputComponent } from '../../components/todo-input/todo-input.component';
import { TodoFilterPipe } from '../../custom-pipes/filterPipe';
import { PermissionsPipe } from './permissions.pipe';
import { AsyncPipe } from '@angular/common';

describe('PermissionsDirective', () => {
  let directive: PermissionsDirective;
  let viewContainerRef: ViewContainerRef;
  let templateRef: TemplateRef<any>;
  let store: Store;
  let mockIsPermittedState;

  beforeEach(() => {
    mockIsPermittedState = jest.fn();
    store = new Store(of({}), null, null);
    store.select = jest.fn().mockReturnValue(of(false));
    viewContainerRef = {
      createEmbeddedView: jest.fn()
    } as any;
    templateRef = {} as any;
    directive = new PermissionsDirective(templateRef, viewContainerRef, store);
  });

  it('should call createEmbeddedView if user has permission', () => {
    store.select = jest.fn().mockReturnValue(of(true));
    directive.appPermissions = 'view';
    expect(viewContainerRef.createEmbeddedView).toHaveBeenCalledWith(templateRef);
  });

  it('should not call createEmbeddedView if user does not have permission', () => {
    directive.appPermissions = 'view';
    expect(viewContainerRef.createEmbeddedView).not.toHaveBeenCalled();
  });
});

@Component({
  template: '<ng-template appPermissions="view"></ng-template>'
})
class TestComponent {
}
