import { Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { checkPermissions } from './permissions.func';
import { userPermissionsState } from '../../store';
import { take } from 'rxjs/operators';

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

    constructor(private store: Store<any>,
                private templateRef: TemplateRef<any>,
                private viewContainerRef: ViewContainerRef) {
        this._templateRef = templateRef;
    }

    init() {
        const isPermitted = checkPermissions(this._required, this.getPermissions());

        if (isPermitted) {
            this._viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
            console.log('PERMISSIONS DIRECTIVE says \n You don\'t have permissions to see it');
        }
    }

    getPermissions() {
        let perms;
        this.store
            .pipe(select(userPermissionsState),
                take(1))
            .subscribe((_p) => perms = _p);
        return perms;
    }
}
