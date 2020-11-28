import { TestBed } from '@angular/core/testing';

import { MyGuardService } from './my-guard-service-service.service';

describe('MyGuardServiceServiceService', () => {
  let service: MyGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
