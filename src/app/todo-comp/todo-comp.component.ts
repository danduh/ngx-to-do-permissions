import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState, metadataSelector, todosListSelector } from '../store';
import * as FilterActions from '../store/filter/actions';
import * as TodoActions from '../store/todos/todo.actions';
import { Permissions } from '../utils/permissions/permissions.decorator';
import { TodoService } from '../todo.service';
import { TodoInputComponent } from '../components/todo-input/todo-input.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SingleTodoComponent } from '../components/single-todo/single-todo.component';
import { TodofooterComponent } from '../components/todofooter/todofooter.component';
import { Observable } from 'rxjs';
import { TodoState } from '../store/todos/todo.reducer';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-comp',
  templateUrl: './todo-comp.component.html',
  styleUrls: [ './todo-comp.component.css' ],
  providers: [ TodoService ],
  imports: [ TodoInputComponent, AsyncPipe, SingleTodoComponent, CommonModule, TodofooterComponent ],
  standalone: true,
})
export class TodoCompComponent implements OnInit {
  public todoList: Observable<Todo[]>;
  public curFilter: Observable<unknown>;
  public metadata;

  constructor(private store: Store<AppState>,
              private todoService: TodoService){
  }

  ngOnInit(){
    this.store.dispatch(TodoActions.loadTodos({}));

    this.curFilter = this.store
      .pipe(
        select('filter')
      );

    this.todoList = this.store
      .pipe(
        select(todosListSelector),
      );

    this.metadata = this.store
      .pipe(
        select(metadataSelector),
      );
  }

  updateCurFilter(filter){
    this.store.dispatch(FilterActions.updateFilter({payload: filter}));
  }

  addTodo(newTodoVal: string){
    const todo = {
      name: newTodoVal,
      completed: false
    };
    this.store.dispatch(TodoActions.addTodo({payload: todo}));
  }

  removeTodo(id: number): void{
    this.store.dispatch(TodoActions.removeTodo({payload: id}));
  }


  editTodo(todo): void{
    if (!!todo.name) {
      this.store.dispatch(TodoActions.updateTodo({payload: todo}));
    } else {
      this.removeTodo(todo.id);
    }
  }


  completeToggle(todo): void{
    todo.completed = !todo.completed;
    this.store.dispatch(TodoActions.updateTodo({payload: todo}));
  }

  @Permissions('todos_delete')
  clearCompleted(): void{
    this.store.dispatch(TodoActions.removeCompletedTodos());
  }

}
