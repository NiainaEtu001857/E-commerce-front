import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsBoutiqueComponent } from './produits-boutique.component';

describe('ProduitsBoutiqueComponent', () => {
  let component: ProduitsBoutiqueComponent;
  let fixture: ComponentFixture<ProduitsBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitsBoutiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitsBoutiqueComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
