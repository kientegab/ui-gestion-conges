import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JouissanceExamenComponent } from './jouissance-examen.component';

describe('JouissanceExamenComponent', () => {
  let component: JouissanceExamenComponent;
  let fixture: ComponentFixture<JouissanceExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JouissanceExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JouissanceExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
