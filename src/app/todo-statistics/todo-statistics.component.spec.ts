import { TodoService } from '../todo.service';
import { Store, StoreModule } from '@ngrx/store';
import { AppState, metadataSelector } from '../store';
import { TodoStatisticsComponent } from './todo-statistics.component';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('TodoStatisticsComponent', () => {
  let component: TodoStatisticsComponent;
  let todoService: TodoService;
  let store: Store<AppState>;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}, {todoState: {}, filter: {}} as any),
      ],
      providers: [
        TodoService,
        {provide: HttpClient, useValue: http},
      ],
    });
    store = TestBed.inject(Store);
    todoService = TestBed.inject(TodoService);
    component = new TodoStatisticsComponent(todoService, store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select metadata from the store', () => {
    jest.spyOn(store, 'select').mockImplementation(() => {
      return of({total: 1, completed: 1, incomplete: 0});
    });
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(metadataSelector);
  });

});
