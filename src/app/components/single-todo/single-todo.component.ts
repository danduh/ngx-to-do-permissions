import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PermissionsPipe } from '../../utils/permissions/permissions.pipe';
import { PermissionsDirective } from '../../utils/permissions/permissions.directive';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrls: [ './single-todo.component.css' ],
  standalone: true,
  imports: [
    FormsModule,
    PermissionsPipe,
    CommonModule,
    PermissionsDirective
  ]
})
export class SingleTodoComponent {
  @ViewChild('editInput') editInput: ElementRef;

  @Input() singleTodo;

  @Output('onComplete') onComplete = new EventEmitter();
  @Output('onEdit') onEdit = new EventEmitter();
  @Output('onRemove') onRemove = new EventEmitter();

  public isEdit = false;
  public isHovered;

  constructor(){
    this.isHovered = true;
  }

  completeToggle(){
    this.onComplete.emit(this.singleTodo);
  }

  editName(){
    this.isEdit = false;
    this.onEdit.emit(this.singleTodo);
  }

  removeSingleTodo(){
    this.onRemove.emit(this.singleTodo.id);
  }

  setFocus(){
    this.editInput.nativeElement.focus();
  }
}
