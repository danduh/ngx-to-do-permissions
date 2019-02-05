import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-todo-input',
    templateUrl: './todo-input.component.html',
    styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {

    @Output('onAdd') onAdd = new EventEmitter();

    constructor() {
    }

    addNewTodo(name: string) {
        if (name) {
            this.onAdd.emit(name);
        }

    }

    ngOnInit() {
    }

}
