import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaTypeDemandeComponent } from './visa-type-demande.component';

describe('VisaTypeDemandeComponent', () => {
  let component: VisaTypeDemandeComponent;
  let fixture: ComponentFixture<VisaTypeDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaTypeDemandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaTypeDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
