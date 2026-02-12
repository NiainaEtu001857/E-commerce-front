import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksBoutiqueComponent } from './stocks-boutique.component';

describe('StocksBoutiqueComponent', () => {
  let component: StocksBoutiqueComponent;
  let fixture: ComponentFixture<StocksBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StocksBoutiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StocksBoutiqueComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
