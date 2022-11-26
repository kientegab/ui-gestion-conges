import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeMaterniteFinserviceComponent } from './conge-maternite-finservice.component';

describe('CongeMaterniteFinserviceComponent', () => {
  let component: CongeMaterniteFinserviceComponent;
  let fixture: ComponentFixture<CongeMaterniteFinserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeMaterniteFinserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeMaterniteFinserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
