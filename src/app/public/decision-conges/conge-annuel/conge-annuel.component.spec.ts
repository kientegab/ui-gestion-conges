import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeAnnuelComponent } from './conge-annuel.component';

describe('CongeAnnuelComponent', () => {
  let component: CongeAnnuelComponent;
  let fixture: ComponentFixture<CongeAnnuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeAnnuelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeAnnuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
