import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceShiMenuComponent } from './espace-shi-menu.component';

describe('EspaceShiMenuComponent', () => {
  let component: EspaceShiMenuComponent;
  let fixture: ComponentFixture<EspaceShiMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceShiMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceShiMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
