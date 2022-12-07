import { TestBed } from '@angular/core/testing';

import { ArticleTypeDemandeService } from './article-type-demande.service';

describe('ArticleTypeDemandeService', () => {
  let service: ArticleTypeDemandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleTypeDemandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
