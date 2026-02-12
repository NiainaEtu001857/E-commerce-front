import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesAjoutComponent } from './commandes-ajout.component';

describe('CommandesAjoutComponent', () => {
  let component: CommandesAjoutComponent;
  let fixture: ComponentFixture<CommandesAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandesAjoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandesAjoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
