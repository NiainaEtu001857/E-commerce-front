import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-stocks-boutique',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './stocks-boutique.component.html',
  styleUrl: './stocks-boutique.component.css',
})
export class StocksBoutiqueComponent implements OnInit {
  searchText = '';
  stocks: any[] = [];
  isLoading = false;
  errorMessage = '';
  selectedType = '';

  filteredStocks: any[] = [];
  typeOptions: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Vous devez vous connecter.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.http
      .get<any[]>(`${environment.api}/shop/stock/list`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .subscribe({
        next: (data) => {
          this.stocks = data || [];
          this.typeOptions = Array.from(
            new Set(
              this.stocks
                .map((stock) => stock?.service?.type)
                .filter((type) => typeof type === 'string' && type.trim() !== '')
                .map((type) => type.trim())
            )
          ).sort((a, b) => a.localeCompare(b, 'fr'));
          this.applyFilter();
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error?.error?.message || error?.error?.error || 'Erreur lors du chargement.';
          this.isLoading = false;
        },
      });
  }

  applyFilter() {
    const term = this.searchText.trim().toLowerCase();
    this.filteredStocks = this.stocks.filter((stock) => {
      const matchesType = !this.selectedType || stock?.service?.type === this.selectedType;
      if (!matchesType) return false;

      if (!term) return true;
      const values = [
        stock?.service?.ref,
        stock?.service?.name,
        stock?.service?.type,
        stock?.service?.brand,
      ];
      return values.some((value) => String(value ?? '').toLowerCase().includes(term));
    });
  }

  getStatusLabel(quantity: number): string {
    return Number(quantity) > 0 ? 'En stock' : 'Rupture';
  }
}
