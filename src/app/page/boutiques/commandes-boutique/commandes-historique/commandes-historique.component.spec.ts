import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesHistoriqueComponent } from './commandes-historique.component';

describe('CommandesHistoriqueComponent', () => {
  let component: CommandesHistoriqueComponent;
  let fixture: ComponentFixture<CommandesHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandesHistoriqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandesHistoriqueComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
