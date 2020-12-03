import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Permissions} from '../../utils/permissions/permissions.decorator';

@Component({
    selector: 'app-todofooter',
    templateUrl: './todofooter.component.html',
    styleUrls: ['./todofooter.component.css']
})
export class TodofooterComponent implements OnInit {

    @Input() metadata;
    @Input() filterOptions;
    @Input() curFilter;


    @Output() delCompleted = new EventEmitter();
    @Output() filterSelected = new EventEmitter();

    constructor() {
    }


    public deleteCompleted() {
        this.delCompleted.emit();
    }

    setFilter(filter: string) {
        this.filterSelected.emit(filter);
    }

    ngOnInit() {
    }

}
