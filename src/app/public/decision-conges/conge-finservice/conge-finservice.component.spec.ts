import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeFinserviceComponent } from './conge-finservice.component';

describe('CongeFinserviceComponent', () => {
  let component: CongeFinserviceComponent;
  let fixture: ComponentFixture<CongeFinserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeFinserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeFinserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
