import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorisationSComponent } from './autorisation-s.component';

describe('AutorisationSComponent', () => {
  let component: AutorisationSComponent;
  let fixture: ComponentFixture<AutorisationSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorisationSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorisationSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
