import { Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { checkPermissions, getPermissions } from './permissions.func';

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
        const userPerms = getPermissions();
        const isPermitted = checkPermissions(this._required, userPerms);

        if (isPermitted) {
            this._viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
            console.log('PERMISSIONS DIRECTIVE says \n You don\'t have permissions to see it');
        }
    }
}
