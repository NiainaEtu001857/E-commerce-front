import { Component } from '@angular/core';
import { TauxRevenuComponent } from "./taux-revenu/taux-revenu.component";
import { CommonModule } from '@angular/common';
import { TauxRevenuMensuelComponent } from "./taux-revenu-mensuel/taux-revenu-mensuel.component";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TauxRevenuComponent, TauxRevenuMensuelComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

}
