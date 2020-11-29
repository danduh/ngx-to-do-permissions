import {Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {isPermitted} from './permissions.func';

@Directive({
    selector: '[appPermissions]'
})
export class PermissionsDirective {
    private _required: string;
    private _viewRef: EmbeddedViewRef<any> | null = null;
    private _templateRef: TemplateRef<any> | null = null;

    @Input()
    set appPermissions(permission: string) {
        this._required = permission;
        this._viewRef = null;
        this.init();
    }

    constructor(private templateRef: TemplateRef<any>,
                private viewContainerRef: ViewContainerRef) {
        this._templateRef = templateRef;
    }

    init() {
        isPermitted(this._required)
            .subscribe((canDo) => {
                if (canDo) {
                    this._viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
                } else {
                    console.log('PERMISSIONS DIRECTIVE says \n You don\'t have permissions to see it');
                }
            });
    }
}
