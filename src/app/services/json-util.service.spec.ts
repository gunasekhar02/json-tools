import { TestBed } from '@angular/core/testing';

import { JsonUtilService } from './json-util.service';

describe('JsonUtilService', () => {
  let service: JsonUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
