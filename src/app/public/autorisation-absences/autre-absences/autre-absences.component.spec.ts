import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutreAbsencesComponent } from './autre-absences.component';

describe('AutreAbsencesComponent', () => {
  let component: AutreAbsencesComponent;
  let fixture: ComponentFixture<AutreAbsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutreAbsencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutreAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
