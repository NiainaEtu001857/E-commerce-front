import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesBoutiqueComponent } from './commandes-boutique.component';

describe('CommandesBoutiqueComponent', () => {
  let component: CommandesBoutiqueComponent;
  let fixture: ComponentFixture<CommandesBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandesBoutiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandesBoutiqueComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
