import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCompComponent } from './todo-comp.component';

describe('TodoCompComponent', () => {
  let component: TodoCompComponent;
  let fixture: ComponentFixture<TodoCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
