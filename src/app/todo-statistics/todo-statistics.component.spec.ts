import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoStatisticsComponent } from './todo-statistics.component';

describe('TodoStatisticsComponent', () => {
  let component: TodoStatisticsComponent;
  let fixture: ComponentFixture<TodoStatisticsComponent>;

  beforeEach(async(() => {
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
