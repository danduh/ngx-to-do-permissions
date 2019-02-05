import {Component, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';
import {Todo} from '../todo';
import {Store} from '@ngrx/store';
import {AppState, metadataSelector} from '../store';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-todo-statistics',
    templateUrl: './todo-statistics.component.html',
    styleUrls: ['./todo-statistics.component.css']
})
export class TodoStatisticsComponent implements OnInit {

    metadata;

    constructor(private todoService: TodoService,
                private store: Store<AppState>) {

    }

    ngOnInit() {
        this.metadata = this.store.select(metadataSelector);
    }

}
