import { TestBed } from '@angular/core/testing';

import { UploadService } from './photos-page/upload.service';

describe('PaginationService', () => {
  let service: UploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
