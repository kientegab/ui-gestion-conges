import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActeAutorisationsComponent } from './acte-autorisations.component';

describe('ActeAutorisationsComponent', () => {
  let component: ActeAutorisationsComponent;
  let fixture: ComponentFixture<ActeAutorisationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActeAutorisationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActeAutorisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
