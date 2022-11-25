import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmpliationComponent } from './ampliation.component';

describe('AmpliationComponent', () => {
  let component: AmpliationComponent;
  let fixture: ComponentFixture<AmpliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmpliationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmpliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
