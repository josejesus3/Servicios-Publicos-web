import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaCardComponent } from './ayuda-card.component';

describe('AyudaCardComponent', () => {
  let component: AyudaCardComponent;
  let fixture: ComponentFixture<AyudaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AyudaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AyudaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
