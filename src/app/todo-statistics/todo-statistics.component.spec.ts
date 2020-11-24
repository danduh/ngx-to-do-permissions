import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TodoStatisticsComponent } from './todo-statistics.component';

describe('TodoStatisticsComponent', () => {
  let component: TodoStatisticsComponent;
  let fixture: ComponentFixture<TodoStatisticsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
