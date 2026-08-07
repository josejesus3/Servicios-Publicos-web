import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesRecientesComponent } from './actividades-recientes.component';

describe('ActividadesRecientesComponent', () => {
  let component: ActividadesRecientesComponent;
  let fixture: ComponentFixture<ActividadesRecientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadesRecientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadesRecientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
