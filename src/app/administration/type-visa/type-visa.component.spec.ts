import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeVisaComponent } from './type-visa.component';

describe('TypeVisaComponent', () => {
  let component: TypeVisaComponent;
  let fixture: ComponentFixture<TypeVisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeVisaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
