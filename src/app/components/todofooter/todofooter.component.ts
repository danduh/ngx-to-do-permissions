import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountPipe } from '../../custom-pipes/countPipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todofooter',
  templateUrl: './todofooter.component.html',
  styleUrls: [ './todofooter.component.css' ],
  imports: [ CommonModule, CountPipe, RouterLink ],
  standalone: true,
})
export class TodofooterComponent {

  @Input() metadata;
  @Input() filterOptions;
  @Input() curFilter;


  @Output() delCompleted = new EventEmitter();
  @Output() filterSelected = new EventEmitter();

  public deleteCompleted(){
    this.delCompleted.emit();
  }

  setFilter(filter: string){
    this.filterSelected.emit(filter);
  }

}
