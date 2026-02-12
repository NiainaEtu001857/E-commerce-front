import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartData, ChartOptions, LineController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


@Component({
  selector: 'app-boutiques',
  imports: [RouterLink , BaseChartDirective],
  templateUrl: './boutiques.component.html',
  styleUrl: './boutiques.component.css',
})
export class BoutiquesComponent {
  public lineChartLabels: string[] = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    public lineChartData: ChartData<'line'> = {
    labels: this.lineChartLabels,
    datasets: [
      {
        data: [1200, 1500, 1000, 1800, 1700, 2000, 2100, 1900, 2200, 2300, 2500, 2700],
        label: 'Revenu Mensuel (€)',
        fill: false,              // pas de remplissage sous la ligne
        borderColor: '#42A5F5',   // couleur de la ligne
        backgroundColor: '#42A5F5', // couleur des points
        tension: 0.3,             // courbure de la ligne
        pointRadius: 5,           // taille des points
        pointHoverRadius: 7,
      }
    ]
  };

  // Options du graphique
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true }
    }
  };

  // Type de graphique
  public lineChartType: 'line' = 'line';
}
