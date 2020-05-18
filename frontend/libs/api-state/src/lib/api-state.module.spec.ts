import { async, TestBed } from '@angular/core/testing';
import { ApiStateModule } from './api-state.module';

describe('ApiStateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ApiStateModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ApiStateModule).toBeDefined();
  });
});
