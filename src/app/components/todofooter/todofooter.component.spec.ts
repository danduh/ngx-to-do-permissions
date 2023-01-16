import { TestBed, waitForAsync } from '@angular/core/testing';

import { TodofooterComponent } from './todofooter.component';
import { CommonModule } from '@angular/common';
import { CountPipe } from '../../custom-pipes/countPipe';
import { RouterLink } from '@angular/router';

describe('TodofooterComponent', () => {
  let component: TodofooterComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule, CountPipe, RouterLink
      ],
    });
    component = new TodofooterComponent();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
