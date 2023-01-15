import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState, metadataSelector, todosListSelector } from '../store';
import * as FilterActions from '../store/filter/actions';
import * as TodoActions from '../store/todos/todo.actions';
import { Permissions } from '../utils/permissions/permissions.decorator';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-comp',
  templateUrl: './todo-comp.component.html',
  styleUrls: [ './todo-comp.component.css' ]
})
export class TodoCompComponent {
  todoList;
  curFilter;
  metadata;

  constructor(private store: Store<AppState>,
              private todoService: TodoService){

    this.store.dispatch(TodoActions.loadTodos({}));

    this.curFilter = this.store
      .pipe(
        select('filter')
      );

    this.todoList = this.store
      .pipe(
        select(todosListSelector),
        // tap((_) => console.log(_))
      );
    this.store
      .pipe(
        select(metadataSelector),
        // tap((_) => console.log(_))
      ).subscribe(metadata => this.metadata = metadata);


  }

  // issues:
  // 1. Because of saving in Store only todos that match current filter ...:
  // 1.1 Counter always shows 0 if curFilter=="COMPLETED";
  // 1.2 Clear completed button doesn't delete anything if curFilter=="ACTIVE";
  // 1.3 Statistics component receives only the data which matches current filter though should receive ALL;
  //
  // 2. Need to store Error and Success flags in state to show content accordingly (error message or todolist);
  // 3. Add nice css;
  // 4. Add loading animation

  updateCurFilter(filter){
    this.store.dispatch(FilterActions.updateFilter({payload: filter}));
  }

  addTodo(newTodoVal: string): void{
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
      this.store.dispatch(TodoActions.updateTodo(todo));
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
