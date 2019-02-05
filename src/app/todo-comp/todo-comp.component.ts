import {Component, OnInit} from '@angular/core';
import {Todo} from '../todo';
import {TodoService} from '../todo.service';
import {select, Store} from '@ngrx/store';
import {AppState, metadataSelector, todosListSelector} from '../store';
import * as FilterActions from '../store/filter/actions';

import * as TodoActions from '../store/todos/todo.actions';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-todo-comp',
    templateUrl: './todo-comp.component.html',
    styleUrls: ['./todo-comp.component.css']
})

export class TodoCompComponent implements OnInit {
    todoList;
    curFilter;
    metadata;

    constructor(private todoService: TodoService,
                private store: Store<AppState>) {

        this.store.dispatch(new TodoActions.GetTodos());

        this.curFilter = this.store
            .pipe(
                select('filter')
            );

        this.todoList = this.store
            .pipe(
                select(todosListSelector),
                tap((_) => console.log(_))
            );
        this.store
            .pipe(
                select(metadataSelector),
                tap((_) => console.log(_))
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

    // @Permissions('experts_MAin')
    updateCurFilter(filter) {
        this.store.dispatch(new FilterActions.UpdateFilter(filter));
    }

    addTodo(newTodoVal: string): void {
        const _todo = {
            name: newTodoVal,
            completed: false
        };
        this.store.dispatch(new TodoActions.AddTodo(_todo));
    }

    removeTodo(id: number): void {
        console.log('from parent: ', id);
        this.store.dispatch(new TodoActions.RemoveTodo(id));
    }


    editTodo(todo): void {
        if (!!todo.name) {
            this.store.dispatch(new TodoActions.UpdateTodo(todo));
        } else {
            this.removeTodo(todo.id);
        }
    }


    completeToggle(todo): void {
        todo.completed = !todo.completed;
        this.store.dispatch(new TodoActions.UpdateTodo(todo));
    }

    clearCompleted(): void {
        // const ids = todos.filter(todo => todo.completed)
        //     .map(todo => todo.id);

        this.store.dispatch(new TodoActions.RemoveCompletedTodos());

    }

    ngOnInit() {

    }

}
