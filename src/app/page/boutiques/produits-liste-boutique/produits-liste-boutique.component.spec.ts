import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsListeBoutiqueComponent } from './produits-liste-boutique.component';

describe('ProduitsListeBoutiqueComponent', () => {
  let component: ProduitsListeBoutiqueComponent;
  let fixture: ComponentFixture<ProduitsListeBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitsListeBoutiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitsListeBoutiqueComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
