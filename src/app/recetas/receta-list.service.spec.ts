import { TestBed } from '@angular/core/testing';

import { RecetaListService } from './receta-list.service';

describe('RecetaListService', () => {
  let service: RecetaListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecetaListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
