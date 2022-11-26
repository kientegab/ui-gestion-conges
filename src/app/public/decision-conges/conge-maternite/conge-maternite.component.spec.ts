import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeMaterniteComponent } from './conge-maternite.component';

describe('CongeMaterniteComponent', () => {
  let component: CongeMaterniteComponent;
  let fixture: ComponentFixture<CongeMaterniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeMaterniteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeMaterniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
