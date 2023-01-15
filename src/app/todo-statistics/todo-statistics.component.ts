import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Store } from '@ngrx/store';
import { AppState, metadataSelector } from '../store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-statistics',
  templateUrl: './todo-statistics.component.html',
  styleUrls: [ './todo-statistics.component.css' ],
  imports: [ CommonModule ],
  standalone: true,
})
export class TodoStatisticsComponent implements OnInit {
  metadata;

  constructor(private todoService: TodoService,
              private store: Store<AppState>){
  }

  ngOnInit(){
    this.metadata = this.store.select(metadataSelector);
  }

}
