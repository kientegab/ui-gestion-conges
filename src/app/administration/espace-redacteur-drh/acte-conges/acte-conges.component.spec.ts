import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActeCongesComponent } from './acte-conges.component';

describe('ActeCongesComponent', () => {
  let component: ActeCongesComponent;
  let fixture: ComponentFixture<ActeCongesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActeCongesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActeCongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
