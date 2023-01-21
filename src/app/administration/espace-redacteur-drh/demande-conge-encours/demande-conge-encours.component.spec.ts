import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeCongeEncoursComponent } from './demande-conge-encours.component';

describe('DemandeCongeEncoursComponent', () => {
  let component: DemandeCongeEncoursComponent;
  let fixture: ComponentFixture<DemandeCongeEncoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeCongeEncoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeCongeEncoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
