import { Component, Injector } from '@angular/core';
import { setAppInjector } from './utils/permissions/permissions.injector';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [],
  imports: [ RouterOutlet ],
  standalone: true,
})
export class AppComponent {
  constructor(injector: Injector){
    setAppInjector(injector);
  }
}
