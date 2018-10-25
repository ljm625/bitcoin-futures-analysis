import { TestBed, inject } from '@angular/core/testing';

import { DataparserService } from './dataparser.service';

describe('DataparserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataparserService]
    });
  });

  it('should be created', inject([DataparserService], (service: DataparserService) => {
    expect(service).toBeTruthy();
  }));
});
