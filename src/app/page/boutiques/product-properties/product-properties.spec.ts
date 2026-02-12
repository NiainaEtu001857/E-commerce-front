import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductProperties } from './product-properties';

describe('ProductProperties', () => {
  let component: ProductProperties;
  let fixture: ComponentFixture<ProductProperties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductProperties]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductProperties);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
