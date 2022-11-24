import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JouissanceSNDComponent } from './jouissance-snd.component';

describe('JouissanceSNDComponent', () => {
  let component: JouissanceSNDComponent;
  let fixture: ComponentFixture<JouissanceSNDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JouissanceSNDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JouissanceSNDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
