import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeMaladieComponent } from './conge-maladie.component';

describe('CongeMaladieComponent', () => {
  let component: CongeMaladieComponent;
  let fixture: ComponentFixture<CongeMaladieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeMaladieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeMaladieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
