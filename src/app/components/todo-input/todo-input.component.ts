import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoFilterPipe } from '../../custom-pipes/filterPipe';
import { PermissionsPipe } from '../../utils/permissions/permissions.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: [ './todo-input.component.css' ],
  imports: [ TodoFilterPipe, PermissionsPipe, AsyncPipe ],
  standalone: true,
})
export class TodoInputComponent {

  @Output('onAdd') onAdd = new EventEmitter();

  addNewTodo(name: string){
    if (name) {
      this.onAdd.emit(name);
    }

  }
}
