import { TodoInputComponent } from './todo-input.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PermissionsPipe } from '../../utils/permissions/permissions.pipe';
import { AsyncPipe } from '@angular/common';
import { TodoFilterPipe } from '../../custom-pipes/filterPipe';

describe('TodoInputComponent', () => {
  let component: TodoInputComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TodoFilterPipe, PermissionsPipe, AsyncPipe
      ],
    });
    component = new TodoInputComponent();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
