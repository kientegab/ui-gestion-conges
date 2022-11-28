import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercherActeComponent } from './rechercher-acte.component';

describe('RechercherActeComponent', () => {
  let component: RechercherActeComponent;
  let fixture: ComponentFixture<RechercherActeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercherActeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercherActeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
