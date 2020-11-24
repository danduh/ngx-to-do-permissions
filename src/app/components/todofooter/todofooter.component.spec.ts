import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TodofooterComponent } from './todofooter.component';

describe('TodofooterComponent', () => {
  let component: TodofooterComponent;
  let fixture: ComponentFixture<TodofooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TodofooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodofooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
