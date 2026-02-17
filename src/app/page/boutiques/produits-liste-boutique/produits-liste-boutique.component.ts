import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

type ServiceAttribute = {
  key?: string;
  value?: string;
};

type ServiceItem = {
  _id?: string;
  name?: string;
  ref?: string;
  type?: string;
  brand?: string;
  description?: string;
  price?: number;
  min_quantity?: number;
  base_unity?: string;
  attributes?: ServiceAttribute[];
};

@Component({
  selector: 'app-produits-liste-boutique',
  imports: [CommonModule],
  templateUrl: './produits-liste-boutique.component.html',
  styleUrl: './produits-liste-boutique.component.css',
})
export class ProduitsListeBoutiqueComponent implements OnInit {
  services: ServiceItem[] = [];
  isLoading = false;
  errorMessage = '';
  searchTerm = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadServices();
  }

  async loadServices() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Vous devez vous connecter.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      this.services = await firstValueFrom(
        this.http.get<ServiceItem[]>(`${environment.api}/shop/service/services`, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        })
      );
    } catch (error: any) {
      this.errorMessage = error?.error?.message || error?.error?.error || 'Erreur chargement services';
      this.services = [];
    } finally {
      this.isLoading = false;
    }
  }

  get filteredServices(): ServiceItem[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.services;
    }

    return this.services.filter((service) => {
      const values = [
        service.name,
        service.ref,
        service.type,
        service.brand,
        service.description,
      ];
      return values.some((value) => String(value ?? '').toLowerCase().includes(term));
    });
  }

  onSearch(value: string) {
    this.searchTerm = value;
  }

  trackByService(index: number, service: ServiceItem): string | number {
    return service._id || service.ref || service.name || index;
  }

  formatAttributes(attributes: ServiceAttribute[] | undefined): string {
    if (!Array.isArray(attributes) || attributes.length === 0) {
      return '-';
    }

    return attributes
      .map((attr) => `${attr?.key || '-'}: ${attr?.value || '-'}`)
      .join(', ');
  }
}
