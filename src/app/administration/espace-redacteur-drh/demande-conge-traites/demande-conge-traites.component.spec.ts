import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeCongeTraitesComponent } from './demande-conge-traites.component';

describe('DemandeCongeTraitesComponent', () => {
  let component: DemandeCongeTraitesComponent;
  let fixture: ComponentFixture<DemandeCongeTraitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeCongeTraitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeCongeTraitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
