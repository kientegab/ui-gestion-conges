import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorisationdComponent } from './autorisationd.component';

describe('AutorisationdComponent', () => {
  let component: AutorisationdComponent;
  let fixture: ComponentFixture<AutorisationdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorisationdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorisationdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
