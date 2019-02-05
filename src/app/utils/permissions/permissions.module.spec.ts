import { PermissionsModule } from './permissions.module';

describe('PermissionsModule', () => {
  let permissionsModule: PermissionsModule;

  beforeEach(() => {
    permissionsModule = new PermissionsModule();
  });

  it('should create an instance', () => {
    expect(permissionsModule).toBeTruthy();
  });
});
