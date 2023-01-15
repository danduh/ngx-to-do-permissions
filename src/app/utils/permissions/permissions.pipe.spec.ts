import { PermissionsPipe } from './permissions.pipe';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from '../../store';

describe('PermissionsPipe', () => {
  let store: Store<AppState>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}, {todoState: {}, filter: {}} as any),
      ],
    });
    store = TestBed.inject(Store);
  });
  it('create an instance', () => {
    const pipe = new PermissionsPipe(store);
    expect(pipe).toBeTruthy();
  });
});
