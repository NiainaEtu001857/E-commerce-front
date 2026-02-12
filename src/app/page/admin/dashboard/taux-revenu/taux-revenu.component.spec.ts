import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TauxRevenuComponent } from './taux-revenu.component';

describe('TauxRevenuComponent', () => {
  let component: TauxRevenuComponent;
  let fixture: ComponentFixture<TauxRevenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TauxRevenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TauxRevenuComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
