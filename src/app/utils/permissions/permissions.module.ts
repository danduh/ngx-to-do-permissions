import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsDirective } from './permissions.directive';
import { PermissionsPipe } from './permissions.pipe';
import { PermissionsGuardService } from './permissions-guard.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PermissionsDirective,
        PermissionsPipe
    ],
    providers: [
        PermissionsGuardService,
    ],
    exports: [
        PermissionsDirective,
        PermissionsPipe
    ]
})
export class PermissionsModule {

}
