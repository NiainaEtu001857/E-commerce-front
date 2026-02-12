import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TauxRevenuMensuelComponent } from './taux-revenu-mensuel.component';

describe('TauxRevenuMensuelComponent', () => {
  let component: TauxRevenuMensuelComponent;
  let fixture: ComponentFixture<TauxRevenuMensuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TauxRevenuMensuelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TauxRevenuMensuelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
