import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Injector } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let injector: Injector;

  beforeEach(waitForAsync(() => {
    injector = TestBed.inject(Injector);
    component = new AppComponent(injector);
  }));
  it('should create the app', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));
});
