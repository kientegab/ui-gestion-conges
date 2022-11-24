import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JouissanceAnnuelleComponent } from './jouissance-annuelle.component';

describe('JouissanceAnnuelleComponent', () => {
  let component: JouissanceAnnuelleComponent;
  let fixture: ComponentFixture<JouissanceAnnuelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JouissanceAnnuelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JouissanceAnnuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
