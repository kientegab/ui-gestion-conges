import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeActeComponent } from './type-acte.component';

describe('TypeActeComponent', () => {
  let component: TypeActeComponent;
  let fixture: ComponentFixture<TypeActeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeActeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeActeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
