import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

type ServiceAttribute = {
  key: string;
  value: string;
}

type ShopRef = {
  _id?: string;
  name?: string;
}

type Service = {
  _id: string;
  ref?: string;
  name: string;
  detail: string;
  sale_price: number;
  min_quantity?: number;
  base_unity?: string;
  attributes?: ServiceAttribute[];
  type?: string;
  shop?: string | ShopRef;
}

@Component({
  selector: 'app-produits',
  imports: [CommonModule, RouterLink],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css',
})
export class ProduitsComponent implements OnInit {
  services: Service[] = [];
  isLoading = false;
  errorMessage = '';

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
      const response = await this.http.get<Service[]>(`${environment.api}/admin/services`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }).toPromise() || [];

      this.services = response;
    } catch (error: any) {
      this.errorMessage = error?.error?.message || error?.error?.error || 'Erreur chargement services';
      this.services = [];
    } finally {
      this.isLoading = false;
    }
  }

  getShopName(service: Service): string {
    if (!service.shop) {
      return '-';
    }

    if (typeof service.shop === 'string') {
      return service.shop;
    }

    return service.shop.name || '-';
  }

  formatAttributes(attributes?: ServiceAttribute[]): string {
    if (!Array.isArray(attributes) || attributes.length === 0) {
      return '-';
    }

    return attributes
      .filter((attr) => (attr?.key || '').trim() && (attr?.value || '').trim())
      .map((attr) => `${attr.key}: ${attr.value}`)
      .join(' | ') || '-';
  }
}
