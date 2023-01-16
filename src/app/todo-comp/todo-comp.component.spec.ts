import { TodoCompComponent } from './todo-comp.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from '../store';
import * as TodoActions from '../store/todos/todo.actions';
import { TodoService } from '../todo.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { setAppInjector } from '../utils/permissions/permissions.injector';
import { Injector } from '@angular/core';

describe('TodoCompComponent', () => {
  let component: TodoCompComponent;
  let store: Store<AppState>;
  let todoService: TodoService;
  let http: HttpClient;

  beforeEach(() => {
    // @ts-ignore
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}, {todoState: {}, filter: {}} as any),
      ],
      providers: [
        TodoService,
        {provide: HttpClient, useValue: http},
      ],
    });
    store = TestBed.inject(Store);
    todoService = TestBed.inject(TodoService);
    component = new TodoCompComponent(store, todoService);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to add a todo when addTodo is called', () => {
    const spy = jest.spyOn(store, 'dispatch');
    const newTodoVal = 'Test Todo';
    component.addTodo(newTodoVal);
    expect(spy).toHaveBeenCalledWith(TodoActions.addTodo({payload: {name: newTodoVal, completed: false}}));
  });

  it('should dispatch an action to remove a todo when removeTodo is called', () => {
    const spy = jest.spyOn(store, 'dispatch');
    const id = 1;
    component.removeTodo(id);
    expect(spy).toHaveBeenCalledWith(TodoActions.removeTodo({payload: id}));
  });

  it('should dispatch an action to update a todo when editTodo is called', () => {
    const spy = jest.spyOn(store, 'dispatch');
    const todo = {id: 1, name: 'Test Todo', completed: false};
    component.editTodo(todo);
    expect(spy).toHaveBeenCalledWith(TodoActions.updateTodo({payload: todo}));
  });

  it('should dispatch an action to toggle the completion of a todo when completeToggle is called', () => {
    const spy = jest.spyOn(store, 'dispatch');
    const todo = {id: 1, name: 'Test Todo', completed: false};
    component.completeToggle(todo);
    expect(spy).toHaveBeenCalledWith(TodoActions.updateTodo({payload: todo}));
  });

  it('should dispatch an action to remove completed todos when clearCompleted is called', () => {
    const spy = jest.spyOn(store, 'dispatch');
    const injector = Injector.create({
      providers: [
        {provide: Store, useValue: new Store(of({userPermissions: {todos: {delete: '*'}}}), null, null)}
      ]
    });
    setAppInjector(injector);
    component.clearCompleted();
    expect(spy).toHaveBeenCalledWith(TodoActions.removeCompletedTodos());
  });
});
