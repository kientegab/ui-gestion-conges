import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongedComponent } from './conged.component';

describe('CongedComponent', () => {
  let component: CongedComponent;
  let fixture: ComponentFixture<CongedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
