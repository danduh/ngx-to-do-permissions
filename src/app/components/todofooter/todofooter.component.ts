import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Permissions } from '../../utils/permissions/permissions.decorator';

@Component({
    selector: 'app-todofooter',
    templateUrl: './todofooter.component.html',
    styleUrls: ['./todofooter.component.css']
})
export class TodofooterComponent implements OnInit {

    @Input() metadata;
    @Input() filterOptions;
    @Input() curFilter;


    @Output('deleteCompleted') onDeleteCompleted = new EventEmitter();
    @Output('onFilterSelected') onFilterSelected = new EventEmitter();

    constructor() {
    }

    @Permissions('todos_delete')
    public deleteCompleted() {
        this.onDeleteCompleted.emit();
    }

    setFilter(filter: string) {
        this.onFilterSelected.emit(filter);
    }

    ngOnInit() {
    }

}
