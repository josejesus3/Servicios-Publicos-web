import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDialogAreasComponent } from './open-dialog-areas.component';

describe('OpenDialogAreasComponent', () => {
  let component: OpenDialogAreasComponent;
  let fixture: ComponentFixture<OpenDialogAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenDialogAreasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenDialogAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
