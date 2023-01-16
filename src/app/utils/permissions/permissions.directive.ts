import { Directive, EmbeddedViewRef, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { isPermitted } from './permissions.func';
import { Store } from '@ngrx/store';
import { isPermittedState } from '../../store';

/**
 * Structural Directive
 */
@Directive({
  selector: '[appPermissions]',
  standalone: true,
})
export class PermissionsDirective {
  private required: string;
  private viewRef: EmbeddedViewRef<any> | null = null;

  @Input()
  set appPermissions(permission: string){
    this.required = permission;
    this.viewRef = null;
    this.init();
  }

  constructor(private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef,
              private store: Store){
  }

  init(){
    this.store.select(isPermittedState(this.required))
      .subscribe((canDo) => {
        if (canDo) {
          this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          console.log('PERMISSIONS DIRECTIVE says \n You don\'t have permissions to see it');
        }
      });
  }
}
