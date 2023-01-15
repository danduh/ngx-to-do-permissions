import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SingleTodoComponent } from './single-todo.component';
import { Store, StoreModule } from '@ngrx/store';
import { TodoService } from '../../todo.service';
import { AppState } from '../../store';

describe('SingleTodoComponent', () => {
  let component: SingleTodoComponent;
  let store: Store<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}, {todoState: {}, filter: {}} as any),
      ],
      providers: [
        TodoService,
        {provide: Store, useValue: store},
      ],
    });
    store = TestBed.inject(Store);
    component = new SingleTodoComponent();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
