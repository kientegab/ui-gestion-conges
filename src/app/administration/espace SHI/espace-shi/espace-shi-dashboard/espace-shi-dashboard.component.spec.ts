import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceShiDashboardComponent } from './espace-shi-dashboard.component';

describe('EspaceShiDashboardComponent', () => {
  let component: EspaceShiDashboardComponent;
  let fixture: ComponentFixture<EspaceShiDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceShiDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceShiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
