import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'app-single-todo',
    templateUrl: './single-todo.component.html',
    styleUrls: ['./single-todo.component.css']
})
export class SingleTodoComponent implements OnInit {
    @ViewChild('editInput') editInput: ElementRef;

    @Input() singleTodo;


    @Output('onComplete') onComplete = new EventEmitter();
    @Output('onEdit') onEdit = new EventEmitter();
    @Output('onRemove') onRemove = new EventEmitter();

    public isEdit: false;
    public isHovered;

    constructor() {
        this.isHovered = true;
    }

    ngOnInit() {

    }

    completeToggle() {
        this.onComplete.emit(this.singleTodo);
    }

    editName() {
        this.isEdit = false;
        this.onEdit.emit(this.singleTodo);
    }

    removeSingleTodo() {
        this.onRemove.emit(this.singleTodo.id);
        console.log(this.singleTodo.id);
    }

    setFocus() {
        setTimeout(() => {   //kostyl veka
            this.editInput.nativeElement.focus();
        }, 0);
    }

}
