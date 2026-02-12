import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, ChartOptions, ChartType, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// 1️⃣ enregistrer les controllers nécessaires
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

@Component({
  selector: 'app-taux-revenu',
  imports: [BaseChartDirective],
  templateUrl: './taux-revenu.component.html',
  styleUrl: './taux-revenu.component.css',
})
export class TauxRevenuComponent {
//  public barChartType: ChartType = 'bar';
  public barChartType: 'bar' = 'bar';
  private colors2025 = 'rgba(54, 162, 235, 0.8)';
  private colors2024 = 'rgba(255, 99, 132, 0.8)';
  public barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      { 
        data: [65, 59, 80, 81, 56], 
        label: 'Revenus 2025', 
        backgroundColor: this.colors2025, 
        borderRadius: 10, // coins arrondis
        barPercentage: 0.6, // largeur des barres
      },
      { 
        data: [28, 48, 40, 19, 86], 
        label: 'Revenus 2024', 
        backgroundColor: this.colors2024, 
        borderRadius: 10,
        barPercentage: 0.6,
      }
    ]
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true
  };

  // toggle pour comparer les datasets
  toggleDataset(active: boolean) {
    this.barChartData.datasets[1].hidden = !active;
  }
}
