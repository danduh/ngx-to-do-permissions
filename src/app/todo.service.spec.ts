import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TodoState } from './store/todos/todo.reducer';
import { BaseTodo, Todo } from './todo';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ TodoService ]
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return the todo list with all todos', () => {
    service.getTodoList().subscribe((data: TodoState) => {
      expect(data.todos.length).toBe(2);
      expect(data.metadata.total).toBe(2);
    });

    const req = httpMock.expectOne(`${ service.baseUrl }`);
    expect(req.request.method).toBe('GET');
    req.flush({
      results: [
        {id: 1, name: 'Todo 1', completed: false},
        {id: 2, name: 'Todo 2', completed: true}
      ],
      metadata: {total: 2}
    });
  });

  it('should return the todo list with only active todos', () => {
    service.getTodoList('ACTIVE').subscribe((data: TodoState) => {
      expect(data.todos.length).toBe(1);
      expect(data.metadata.total).toBe(1);
    });

    const req = httpMock.expectOne(`${ service.baseUrl }?completed=false`);
    expect(req.request.method).toBe('GET');
    req.flush({
      results: [
        {id: 1, name: 'Todo 1', completed: false}
      ],
      metadata: {total: 1}
    });
  });

  it('should return the todo list with only completed todos', () => {
    service.getTodoList('COMPLETED').subscribe((data: TodoState) => {
      expect(data.todos.length).toBe(1);
      expect(data.metadata.total).toBe(1);
    });

    const req = httpMock.expectOne(`${ service.baseUrl }?completed=true`);
    expect(req.request.method).toBe('GET');
    req.flush({
      results: [
        {id: 2, name: 'Todo 2', completed: true}
      ],
      metadata: {total: 1}
    });
  });

  it('should save a new todo', () => {
    const newTodo: BaseTodo = {name: 'Todo 3', completed: false};
    service.saveTodo(newTodo).subscribe((data: Todo) => {
      expect(data.id).toBe(3);
      expect(data.name).toBe('Todo 3');
      expect(data.completed).toBe(false);
    });

    const req = httpMock.expectOne(`${ service.baseUrl }`);
    expect(req.request.method).toBe('POST');
    req.flush({
      id: 3,
      name: 'Todo 3',
      completed: false
    });
  });

  it('should delete a todo by id', () => {
    service.deleteTodo(1).subscribe(() => {
    });

    const req = httpMock.expectOne(`${ service.baseUrl }/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update a todo by id', () => {
    const partialTodo = {completed: true};
    service.updateTodo(1, partialTodo).subscribe((data: number) => {
      expect(data).toBe(1);
    });

    const req = httpMock.expectOne(`${ service.baseUrl }/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush({id: 1});
  });

  it('should remove all completed todos', () => {
    service.removeAllCompleted().subscribe((data: Todo[]) => {
      expect(data.length).toBe(1);
    });

    const req = httpMock.expectOne(`${ service.baseUrl }/deleteCompleted`);
    expect(req.request.method).toBe('DELETE');
    req.flush([ {id: 2, name: 'Todo 2', completed: true} ]);
  });

  it('should handle errors', () => {
    service.getTodoList().subscribe(
      () => {
      },
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
        expect(error.error).toBe('Server Error');
      }
    );

    const req = httpMock.expectOne(`${ service.baseUrl }`);
    req.flush('Server Error', {status: 500, statusText: 'Server Error'});
  });
});

