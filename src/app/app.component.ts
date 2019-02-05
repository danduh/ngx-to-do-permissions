import { Component, Injector } from '@angular/core';
import { setAppInjector } from './utils/permissions/permissions.injector';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(injector: Injector) {
        setAppInjector(injector);
    }
}
