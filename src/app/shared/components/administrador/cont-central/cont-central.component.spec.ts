import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContCentralComponent } from './cont-central.component';

describe('ContCentralComponent', () => {
  let component: ContCentralComponent;
  let fixture: ComponentFixture<ContCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContCentralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
